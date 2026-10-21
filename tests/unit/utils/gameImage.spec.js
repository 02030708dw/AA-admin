import { gameImageUrl } from '@/utils/gameImage'

describe('game artwork URLs', () => {
  it('reads S3 relative keys through the existing CloudFront origin', () => {
    expect(gameImageUrl('aia/php/gamer/YellowBat/CN/3008.png'))
      .toBe('https://d2st0gfgttj98a.cloudfront.net/aia/php/gamer/YellowBat/CN/3008.png')
    expect(gameImageUrl('/44dog.cc/aia/dev/gamer/YellowBat/EN/art.png'))
      .toBe('https://d2st0gfgttj98a.cloudfront.net/aia/dev/gamer/YellowBat/EN/art.png')
  })

  it('does not prepend a CDN to absolute URLs', () => {
    const url = 'https://cdn.example.com/art.png'
    expect(gameImageUrl(url)).toBe(url)
  })

  it('handles absent values and rejects other URL protocols', () => {
    expect(gameImageUrl(null)).toBe('')
    expect(gameImageUrl('  ')).toBe('')
    expect(gameImageUrl('javascript:alert(1)')).toBe('')
    expect(gameImageUrl('//example.com/art.png')).toBe('')
  })
})
