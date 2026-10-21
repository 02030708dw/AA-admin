import { shallowMount } from '@vue/test-utils'
import GamePage from '@/views/games/game/index.vue'
import GameEditor from '@/views/games/game/GameEitor.vue'
import { gameEdit, gamePage } from '@/api/game/game'

jest.mock('@/api/game/game', () => ({
  gamePage: jest.fn(), gameEdit: jest.fn(), gameAdd: jest.fn(),
  gameDel: jest.fn(), gameupdateStatus: jest.fn(), gameisHot: jest.fn()
}))
jest.mock('@/api/gamer/gamer', () => ({ gamerPage: jest.fn() }))

const original = {
  id: '1', gamerId: '49', gamerName: 'YellowBat', name: 'Heat Bingo',
  code: '3008', threeId: 'YellowBat_3008', type: 1, status: 1, sort: 1,
  pictureUrl: JSON.stringify([{ language: 'CN', pictureUrl: 'old.png' }])
}
const updated = {
  ...original,
  pictureInfos: [
    { language: 'CN', pictureUrl: 'old.png' },
    { language: 'TH', pictureUrl: 'aia/php/gamer/YellowBat/TH/new.png' }
  ]
}

function deferred() {
  let resolve, reject
  const promise = new Promise((yes, no) => { resolve = yes; reject = no })
  return { promise, resolve, reject }
}

async function flush() {
  await Promise.resolve()
  await Promise.resolve()
}

function mountPage() {
  const wrapper = shallowMount(GamePage, {
    mocks: {
      $store: { state: { user: { gamer: [] } } },
      $message: Object.assign(jest.fn(), { error: jest.fn() })
    },
    stubs: {
      GameEitor: {
        name: 'GameEitor', props: ['gameriddata', 'saving'],
        render: h => h('div'), methods: { close() {} }
      }
    }
  })
  jest.spyOn(wrapper.vm.$refs.GameEitor, 'close')
  return wrapper
}

describe('saving uploaded game artwork', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    gamePage.mockResolvedValue({ resultSet: { total: 1, data: [original] } })
  })

  it('keeps the editor locked until saving and refreshing finish, then reopens with the submitted images', async() => {
    const wrapper = mountPage()
    await flush()
    const edit = deferred()
    const refresh = deferred()
    gameEdit.mockReturnValueOnce(edit.promise)
    gamePage.mockReturnValueOnce(refresh.promise)

    const saving = wrapper.vm.getGameEitor(updated)
    wrapper.vm.getGameEitor(updated)
    expect(gameEdit).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.gameSaving).toBe(true)
    expect(wrapper.vm.$refs.GameEitor.close).not.toHaveBeenCalled()

    edit.resolve({ resCode: '000000' })
    await flush()
    expect(wrapper.vm.gameSaving).toBe(true)
    expect(wrapper.vm.$refs.GameEitor.close).not.toHaveBeenCalled()

    // A delayed list response must not restore the previous picture list.
    refresh.resolve({ resultSet: { total: 1, data: [original] } })
    await saving
    expect(wrapper.vm.gameSaving).toBe(false)
    expect(wrapper.vm.$refs.GameEitor.close).toHaveBeenCalledTimes(1)
    expect(JSON.parse(wrapper.vm.tableData[0].pictureUrl)).toEqual(updated.pictureInfos)
    wrapper.destroy()
  })

  it('keeps the uploaded images in the editor when saving fails', async() => {
    const wrapper = mountPage()
    await flush()
    gameEdit.mockRejectedValueOnce(new Error('save failed'))
    await wrapper.vm.getGameEitor(updated)
    expect(wrapper.vm.gameSaving).toBe(false)
    expect(wrapper.vm.$refs.GameEitor.close).not.toHaveBeenCalled()
    expect(wrapper.vm.$message.error).toHaveBeenCalledWith('编辑失败!')
    expect(wrapper.vm.tableData[0].pictureUrl).toBe(original.pictureUrl)
    wrapper.destroy()
  })

  it('emits a valid edit without closing the dialog before the server confirms it', async() => {
    const wrapper = shallowMount(GameEditor, { mocks: { $t: key => key } })
    wrapper.setData({ dialogVisible: true, ruleForm: updated })
    await wrapper.vm.$nextTick()
    wrapper.vm.$refs.ruleForm.validate = callback => callback(true)
    wrapper.vm.getconfirm()
    expect(wrapper.emitted().confirm[0][0]).toEqual(updated)
    expect(wrapper.vm.dialogVisible).toBe(true)
    wrapper.destroy()
  })
})
