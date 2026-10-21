import { shallowMount } from '@vue/test-utils'
import UploadImage from '@/components/Upload/image.vue'
import { uploadGameImage } from '@/api/game/image'
import request from '@/utils/request'

jest.mock('@/utils/request', () => jest.fn())
jest.mock('@/api/game/image', () => ({ uploadGameImage: jest.fn() }))

const oldPictures = [
  { language: 'CN', pictureUrl: 'aia/php/gamer/YellowBat/CN/3008.png' },
  { language: 'EN', pictureUrl: 'aia/php/gamer/YellowBat/EN/3008.png' }
]

function mountUploader(props = {}) {
  return shallowMount(UploadImage, {
    propsData: { storage: 's3', fn: 'gamer', code: 'YellowBat', img: JSON.stringify(oldPictures), ...props },
    stubs: ['el-upload', 'el-progress'],
    mocks: { $message: { success: jest.fn(), error: jest.fn() }}
  })
}

describe('game artwork upload', () => {
  beforeEach(() => jest.clearAllMocks())

  it('previews existing artwork and keeps saved paths unchanged', () => {
    const wrapper = mountUploader()
    expect(wrapper.find('img').attributes('src')).toBe('https://d2st0gfgttj98a.cloudfront.net/' + oldPictures[0].pictureUrl)
    expect(wrapper.emitted().Upload[0][0]).toEqual(oldPictures)
    wrapper.destroy()
  })

  it('uploads only the selected language and emits independent form values', async() => {
    const wrapper = mountUploader({ img: oldPictures })
    const result = { resultSet: 'aia/php/gamer/YellowBat/CN/new.png' }
    uploadGameImage.mockResolvedValueOnce(result)
    const file = new File(['png'], 'art.png', { type: 'image/png' })
    await wrapper.vm.httpRequest({ file }, 'CN', 0)

    expect(uploadGameImage).toHaveBeenCalledWith(file, 'YellowBat/CN', expect.any(Function))
    expect(request).not.toHaveBeenCalled()
    const saved = wrapper.emitted().Upload[0][0]
    const updated = wrapper.emitted().Upload[1][0]
    expect(saved).toEqual(oldPictures)
    expect(updated).toEqual([{ language: 'CN', pictureUrl: result.resultSet }, oldPictures[1]])
    expect(wrapper.vm.imageFlag[0]).toBe(false)
    expect(wrapper.emitted().uploading).toEqual([[true], [false]])
    wrapper.destroy()
  })

  it('preserves existing artwork and clears progress if S3 rejects an upload', async() => {
    const wrapper = mountUploader()
    uploadGameImage.mockRejectedValueOnce(new Error('S3 unavailable'))
    await expect(wrapper.vm.httpRequest({ file: new File(['png'], 'art.png', { type: 'image/png' }) }, 'CN', 0))
      .rejects.toThrow('S3 unavailable')
    expect(wrapper.vm.imageURL[0].pictureUrl).toBe(oldPictures[0].pictureUrl)
    expect(wrapper.emitted().Upload).toHaveLength(1)
    expect(wrapper.vm.imageFlag[0]).toBe(false)
    expect(wrapper.vm.UploadPercent[0]).toBe(0)
    wrapper.destroy()
  })

  it('rejects missing providers, non-images and oversized files before sending', () => {
    const wrapper = mountUploader()
    expect(wrapper.vm.beforeUpload({ size: 10, type: 'text/plain' })).toBe(false)
    expect(wrapper.vm.beforeUpload({ size: 5 * 1024 * 1024 + 1, type: 'image/png' })).toBe(false)
    expect(wrapper.vm.beforeUpload({ size: 10, type: 'image/png' })).toBe(true)
    wrapper.setProps({ code: '' })
    expect(wrapper.vm.beforeUpload({ size: 10, type: 'image/png' })).toBe(false)
    expect(uploadGameImage).not.toHaveBeenCalled()
    wrapper.destroy()
  })

  it('keeps the existing upload endpoint for other image controls', async() => {
    const wrapper = mountUploader({ storage: 'legacy', fn: 'banner', code: '' })
    request.mockResolvedValueOnce({ resultSet: 'aia/php/bannerCN/new.png' })
    await wrapper.vm.httpRequest({ file: new File(['png'], 'art.png', { type: 'image/png' }) }, 'CN', 0)
    expect(request.mock.calls[0][0].url).toBe('/upload/image/single')
    expect(request.mock.calls[0][0].headers.Function).toBe('bannerCN')
    expect(uploadGameImage).not.toHaveBeenCalled()
    wrapper.destroy()
  })
})
