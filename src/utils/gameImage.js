const imageBase = process.env.VUE_APP_GAME_IMAGE_BASE_URL || 'https://d2st0gfgttj98a.cloudfront.net/'

export function gameImageUrl(path) {
  if (typeof path !== 'string' || !path.trim()) return ''

  const value = path.trim()
  if (/^https?:\/\//i.test(value)) return value
  if (/^[a-z][a-z\d+.-]*:/i.test(value) || value.startsWith('//')) return ''

  const key = value.replace(/^\/+/, '').replace(/^44dog\.cc\//, '')
  return imageBase.replace(/\/+$/, '') + '/' + key
}
