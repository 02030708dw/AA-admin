export const VIDEO_TYPE_OPTIONS = [
  { value: 0, label: '\u672a\u5206\u7c7b' },
  { value: 1, label: '\u7535\u5b50' },
  { value: 2, label: '\u68cb\u724c' },
  { value: 3, label: '\u5f69\u7968' },
  { value: 4, label: '\u4f53\u80b2' },
  { value: 5, label: '\u771f\u4eba' },
  { value: 6, label: '\u5c0f\u6e38\u620f' },
  { value: 7, label: '\u70ed\u95e8' },
  { value: 8, label: '\u6355\u9c7c' },
  { value: 9, label: '\u6597\u9e21' }
]

export const VIDEO_TYPE_MAP = VIDEO_TYPE_OPTIONS.reduce(function(map, item) {
  map[item.value] = item.label
  return map
}, {})

export function formatVideoType(type) {
  if (type === undefined || type === null || type === '') {
    return '--'
  }

  return VIDEO_TYPE_MAP[type] || '--'
}
