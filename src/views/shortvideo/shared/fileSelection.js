const STORAGE_KEY = 'short-video:selected-bucket-file'

export function saveSelectedBucketFile(file) {
  if (!file) {
    clearSelectedBucketFile()
    return
  }

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(file))
}

export function getSelectedBucketFile() {
  const rawValue = sessionStorage.getItem(STORAGE_KEY)

  if (!rawValue) {
    return null
  }

  try {
    return JSON.parse(rawValue)
  } catch (error) {
    clearSelectedBucketFile()
    return null
  }
}

export function clearSelectedBucketFile() {
  sessionStorage.removeItem(STORAGE_KEY)
}
