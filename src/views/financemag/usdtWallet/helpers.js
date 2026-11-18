const MEMBER_ID = /^\d{1,30}$/
const USDT_AMOUNT = /^\d{1,18}(?:\.\d{1,6})?$/
const BASE64_ENVELOPE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/

export function isValidMemberId(value) {
  if (typeof value === 'number') return false
  return MEMBER_ID.test(String(value == null ? '' : value).trim())
}

export function toSafeId(value) {
  if (typeof value === 'string' && value.trim()) return value.trim()
  if (typeof value === 'number' && Number.isSafeInteger(value) && value >= 0) return String(value)
  return ''
}

export function isValidUsdtAmount(value) {
  const text = String(value == null ? '' : value).trim()
  return USDT_AMOUNT.test(text) && canonicalUsdtAmount(text) !== '0'
}

export function canonicalUsdtAmount(value) {
  const text = String(value == null ? '' : value).trim()
  if (!USDT_AMOUNT.test(text)) return text
  const [wholePart, fractionPart = ''] = text.split('.')
  const whole = wholePart.replace(/^0+(?=\d)/, '')
  const fraction = fractionPart.replace(/0+$/, '')
  return fraction ? `${whole}.${fraction}` : whole
}

export function isValidEncryptedEnvelope(value) {
  const text = String(value == null ? '' : value).trim()
  if (text.length < 80 || text.length > 8192 || text.length % 4 !== 0 || !BASE64_ENVELOPE.test(text)) return false
  // Block common raw private-key representations. The server remains authoritative
  // for validating the vendor-specific encrypted envelope.
  if (/^(?:0x)?[0-9a-f]{64}$/i.test(text)) return false
  const padding = text.endsWith('==') ? 2 : text.endsWith('=') ? 1 : 0
  return (text.length / 4) * 3 - padding >= 60
}

export function isActiveTrc20Wallet(wallet) {
  if (!wallet || String(wallet.network).toUpperCase() !== 'TRC20') return false
  return String(wallet.status || '').toUpperCase() === 'ACTIVE'
}

export function collectionFingerprint(form) {
  return [form.memberId, form.walletId, canonicalUsdtAmount(form.amount)].map(value => String(value == null ? '' : value)).join('\n')
}

export function collectionRequestStorageKey(merchantId, fingerprint) {
  return `aia:usdt-collection:v1:${encodeURIComponent(String(merchantId || ''))}:${encodeURIComponent(String(fingerprint || ''))}`
}

export function createRequestId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const bytes = crypto.getRandomValues(new Uint8Array(16))
    bytes[6] = (bytes[6] & 0x0f) | 0x40
    bytes[8] = (bytes[8] & 0x3f) | 0x80
    const hex = Array.from(bytes, value => value.toString(16).padStart(2, '0')).join('')
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
  }
  return `admin-${Date.now()}-${Math.random().toString(36).slice(2, 14)}`
}

export function statusTag(status) {
  const value = String(status || '').toUpperCase()
  if (['ACTIVE', 'ENABLED', 'SUCCESS', 'SUCCEEDED', 'COMPLETED'].includes(value)) return 'success'
  if (['FAILED', 'REJECTED', 'DISABLED', 'DELETED', 'CANCELLED'].includes(value)) return 'danger'
  if (['PROCESSING', 'PENDING', 'QUEUED', 'SUBMITTED', 'DELIVERING'].includes(value)) return 'warning'
  return 'info'
}
