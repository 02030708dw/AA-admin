const assert = require('assert')
const fs = require('fs')
const path = require('path')
const { JSDOM } = require('jsdom')
const compiler = require('vue/compiler-sfc')
const parser = require('@babel/parser')
const dom = new JSDOM('<html><body></body></html>', { url: 'http://localhost/' })
global.window = dom.window; global.document = dom.window.document; global.navigator = dom.window.navigator
global.HTMLElement = dom.window.HTMLElement; global.Element = dom.window.Element; global.Node = dom.window.Node
global.getComputedStyle = dom.window.getComputedStyle.bind(dom.window)
const Vue = require('vue/dist/vue.common.js')
Vue.config.productionTip = false; Vue.config.devtools = false
Vue.use(require('element-ui'))
function component(file, deps) {
  const parsed = compiler.parseComponent(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'))
  parser.parse(parsed.script.content, { sourceType: 'module' })
  const compiled = compiler.compileTemplate({ source: parsed.template.content, filename: file, id: 'rate-test' })
  assert.deepStrictEqual(compiled.errors, [])
  const source = parsed.script.content.replace(/^import .*\r?\n/gm, '').replace('export default', 'return')
  return { ...new Function(...Object.keys(deps), source)(...Object.values(deps)), template: parsed.template.content }
}
const rates = {
  DEPOSIT: { fiatCurrency: 'THB', rateType: 'DEPOSIT', manualRate: '32', enabled: 1, cryptoScale: 6, version: 2 },
  PAYOUT: { fiatCurrency: 'THB', rateType: 'PAYOUT', manualRate: '31', enabled: 1, cryptoScale: 6, version: 7 }
}
const saved = []; const histories = []; const previews = []
const api = {
  listUsdtRates: async type => ({ resultSet: { rules: [{ ...rates[type] }, { fiatCurrency: 'PHP', rateType: type, manualRate: null, enabled: 0, cryptoScale: 6, version: 0 }] } }),
  saveUsdtRate: async payload => { saved.push(payload); return { resultSet: { ...payload, version: payload.version + 1 } } },
  previewUsdtRate: async payload => { previews.push(payload); return { resultSet: { cryptoAmount: payload.rateType === 'PAYOUT' ? '16.129032' : '15.625000', appliedRate: payload.manualRate, fiatCurrency: payload.fiatCurrency, rateSource: 'BACKEND' } } },
  usdtRateHistory: async (currency, type) => { histories.push([currency, type]); return { resultSet: [] } }
}
const deps = Object.keys(api).reduce((result, key) => { result[key] = (...args) => api[key](...args); return result }, {})
const Card = component('src/views/financemag/usdtRate/RateCard.vue', deps)
const Page = component('src/views/financemag/usdtRate/index.vue', { RateCard: Card })
const tick = async () => { await Promise.resolve(); await Vue.nextTick(); await Promise.resolve(); await Vue.nextTick() }
async function run() {
  const page = new Vue({ ...Page, beforeCreate() { this.$store = Vue.observable({ state: { permission: { btnP: ['usdtRate:edit'] } } }) } }).$mount()
  document.body.appendChild(page.$el); await tick()
  const deposit = page.$refs.deposit; const payout = page.$refs.payout
  assert.strictEqual(deposit.form.manualRate, '32'); assert.strictEqual(payout.form.manualRate, '31')
  assert.strictEqual(page.$el.querySelectorAll('.rate-card').length, 2)
  deposit.$confirm = payout.$confirm = async () => true
  deposit.$message = payout.$message = { warning() {}, success() {} }
  payout.form.manualRate = '30'; payout.form.changeReason = '代付独立修改'; payout.form.acknowledgeOrderLock = true
  assert.strictEqual(payout.dirty, true); assert.strictEqual(deposit.dirty, false)
  await payout.save(); await tick()
  assert.strictEqual(saved[0].rateType, 'PAYOUT'); assert.strictEqual(saved[0].version, 7); assert.strictEqual(saved[0].cryptoScale, 6)
  assert.strictEqual(deposit.form.manualRate, '32'); assert.strictEqual(deposit.form.version, 2)
  assert.strictEqual(payout.saved.manualRate, '30'); assert.strictEqual(payout.dirty, false)
  await deposit.preview(); await payout.preview()
  assert.deepStrictEqual(previews.map(p => p.rateType), ['DEPOSIT', 'PAYOUT'])
  await deposit.fetchHistory(); await payout.fetchHistory(); assert.deepStrictEqual(histories, [['THB', 'DEPOSIT'], ['THB', 'PAYOUT']])
  deposit.form.manualRate = '33'; page.$confirm = async () => { throw new Error('cancel') }
  assert.strictEqual(await page.allowLeave(), false); assert.strictEqual(deposit.form.manualRate, '33')
  page.currency = 'PHP'; await tick()
  assert.strictEqual(deposit.effectiveRate(deposit.saved), '1'); assert.strictEqual(payout.effectiveRate(payout.saved), '1')
  assert.strictEqual(payout.quote, null)
  const normalList = api.listUsdtRates; let firstResolve; let secondResolve; let calls = 0
  api.listUsdtRates = () => new Promise(resolve => { if (++calls === 1) firstResolve = resolve; else secondResolve = resolve })
  const first = payout.load(); const second = payout.load()
  secondResolve(await normalList('PAYOUT')); await second
  firstResolve({ resultSet: { rules: [{ ...rates.PAYOUT, fiatCurrency: 'PHP', manualRate: '999' }] } }); await first
  assert.strictEqual(payout.form.manualRate, null)
  api.listUsdtRates = async () => { throw new Error('offline') }; await payout.load()
  assert.strictEqual(payout.form, null); assert.strictEqual(payout.loadError, true)
  api.listUsdtRates = normalList; await payout.load()
  payout.form.changeReason = '冲突保留草稿'; payout.form.acknowledgeOrderLock = true; payout.form.manualRate = '29'; payout.form.enabled = 1
  api.saveUsdtRate = async () => { throw new Error('version conflict') }
  await payout.save(); assert.strictEqual(payout.form.manualRate, '29'); assert.strictEqual(payout.dirty, true)
  page.$store.state.permission.btnP = ['crechargeonfiguration:edit']; await tick()
  assert.strictEqual(page.canEditDeposit, true); assert.strictEqual(page.canEditPayout, false)
  await payout.save(); assert.strictEqual(saved.length, 1)
  page.$destroy(); dom.window.close()
  console.log('USDT rate settings passed: mounted two cards, independent save/preview/history, defaults, stale responses, unsaved drafts, failed reads, conflicts, permissions')
}
run().catch(error => { console.error(error); process.exitCode = 1; dom.window.close() })
