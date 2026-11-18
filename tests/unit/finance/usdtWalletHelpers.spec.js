import {
  isValidMemberId, isValidUsdtAmount, isValidEncryptedEnvelope,
  isActiveTrc20Wallet, canonicalUsdtAmount, collectionFingerprint, collectionRequestStorageKey, createRequestId, statusTag, toSafeId
} from '@/views/financemag/usdtWallet/helpers'

describe('USDT wallet admin safety helpers', () => {
  test('keeps snowflake member IDs as exact digit strings', () => {
    expect(isValidMemberId('1234567890123456789')).toBe(true)
    expect(isValidMemberId(1234567890123456789)).toBe(false)
    expect(isValidMemberId('1234567890123456789x')).toBe(false)
    expect(isValidMemberId('')).toBe(false)
  })

  test('rejects unsafe numeric identifiers before they enter URL paths', () => {
    expect(toSafeId('1234567890123456789')).toBe('1234567890123456789')
    expect(toSafeId(12345)).toBe('12345')
    expect(toSafeId(1234567890123456789)).toBe('')
    expect(toSafeId(null)).toBe('')
  })

  test.each(['0.000001', '1', '0001.0', '15.625', '999999999999999999.123456'])('accepts raw USDT amount %s', value => {
    expect(isValidUsdtAmount(value)).toBe(true)
  })

  test.each(['0', '0.000000', '000.000000', '-1', '+1', '1e3', '1.0000001', '.5', '1000000000000000000', 'NaN'])('rejects unsafe USDT amount %s', value => {
    expect(isValidUsdtAmount(value)).toBe(false)
  })

  test('canonicalizes equivalent decimal strings without numeric conversion', () => {
    expect(['1', '1.0', '1.000000', '0001.0'].map(canonicalUsdtAmount)).toEqual(['1', '1', '1', '1'])
    expect(canonicalUsdtAmount('000000000000000001.230000')).toBe('1.23')
  })

  test('accepts an opaque encrypted Base64 envelope and rejects common raw-key forms', () => {
    const envelope = Buffer.alloc(60, 7).toString('base64')
    expect(isValidEncryptedEnvelope(envelope)).toBe(true)
    expect(isValidEncryptedEnvelope('a'.repeat(76))).toBe(false)
    expect(isValidEncryptedEnvelope(Buffer.alloc(32, 7).toString('base64'))).toBe(false)
    expect(isValidEncryptedEnvelope(Buffer.alloc(6145, 7).toString('base64'))).toBe(false)
    expect(isValidEncryptedEnvelope('-----BEGIN PRIVATE KEY-----')).toBe(false)
  })

  test('only active TRC20 wallets are collection targets', () => {
    expect(isActiveTrc20Wallet({ network: 'TRC20', status: 'ACTIVE' })).toBe(true)
    expect(isActiveTrc20Wallet({ network: 'trc20', status: 'enabled' })).toBe(false)
    expect(isActiveTrc20Wallet({ network: 'ERC20', status: 'ACTIVE' })).toBe(false)
    expect(isActiveTrc20Wallet({ network: 'TRC20', status: 'DISABLED' })).toBe(false)
  })

  test('fingerprint is stable for retry and changes with financial inputs', () => {
    const form = { memberId: '1234567890123456789', walletId: 'wallet-1', amount: '15.625' }
    expect(collectionFingerprint(form)).toBe(collectionFingerprint({ ...form }))
    expect(collectionFingerprint(form)).not.toBe(collectionFingerprint({ ...form, amount: '15.626' }))
    expect(collectionFingerprint(form)).not.toBe(collectionFingerprint({ ...form, walletId: 'wallet-2' }))
    expect(collectionRequestStorageKey('merchant/1', collectionFingerprint(form)))
      .toBe(collectionRequestStorageKey('merchant/1', collectionFingerprint({ ...form })))
  })

  test('fingerprint treats equivalent decimal spellings as the same financial input', () => {
    const form = { memberId: '1234567890123456789', walletId: 'wallet-1', amount: '1' }
    const fingerprints = ['1', '1.0', '1.000000', '0001.0'].map(amount => collectionFingerprint({ ...form, amount }))
    expect(new Set(fingerprints).size).toBe(1)
  })

  test('generates bounded non-empty request IDs and maps statuses', () => {
    const first = createRequestId(); const second = createRequestId()
    expect(first).toBeTruthy(); expect(first.length).toBeLessThanOrEqual(64); expect(second).not.toBe(first)
    expect(statusTag('SUCCESS')).toBe('success')
    expect(statusTag('PROCESSING')).toBe('warning')
    expect(statusTag('FAILED')).toBe('danger')
  })
})
