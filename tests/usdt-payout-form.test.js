const assert = require('assert')
const fs = require('fs')
const path = require('path')
const compiler = require('vue/compiler-sfc')
const parser = require('@babel/parser')
const files = ['memberwithdrawal/PayForAnother.vue', 'memberwithdrawal/Table.vue', 'withdrawalchannel/WithdrawalchannelsAdd.vue', 'withdrawalchannel/WithdrawalchannelsEitor.vue', 'withdrawalchannel/Table.vue']
let form
for (const name of files) {
  const file = path.join(__dirname, '../src/views/financemag', name)
  const parsed = compiler.parseComponent(fs.readFileSync(file, 'utf8'))
  parser.parse(parsed.script.content, { sourceType: 'module', plugins: ['optionalChaining'] })
  const template = compiler.compileTemplate({ source: parsed.template.content, filename: file, id: 'payout-form-test' })
  assert.deepStrictEqual(template.errors, [])
  if (name.endsWith('PayForAnother.vue')) form = new Function(parsed.script.content.replace(/^import.*$/gm, '').replace('export default', 'return'))()
}
async function run() {
  const notices = []; const sent = []
  const vm = { ...form.data(), $message: { warning: text => notices.push(text) }, $confirm: async () => true,
    $emit: (name, value) => sent.push({ name, value }), $refs: { ruleForm: { validate: fn => fn(true) } } }
  for (const [key, fn] of Object.entries(form.methods)) vm[key] = fn.bind(vm)
  for (const [key, fn] of Object.entries(form.computed)) Object.defineProperty(vm, key, { get: fn.bind(vm) })
  vm.threePayList = [{ id: '11', usdt: true, threeName: 'USDT' }, { id: '22', usdt: false, threeName: 'Bank', bankCount: 1 }]
  vm.ruleForm = { channelType: 3, usdtNetwork: 'TRC20', coin: 'TRC20-address', amount: '500.00', orderNo: 'cash-7', threePayId: '11', bankName: 'untrusted', bankCardNo: 'untrusted' }
  assert.deepStrictEqual(vm.ThreePayfiletr.map(x => x.id), ['11'])
  vm.getconfirm(); await Promise.resolve(); await Promise.resolve()
  assert.deepStrictEqual(sent[0].value, { amt: '500.00', orderNo: 'cash-7', threePayId: '11' })
  vm.ruleForm.usdtNetwork = null
  assert.deepStrictEqual(vm.ThreePayfiletr, [])
  vm.getconfirm(); assert.strictEqual(sent.length, 1)
  vm.ruleForm = { channelType: 0, threePayIds: ['11', '22'], threePayId: '22', amount: 100, orderNo: 'cash-8', threePayIdsString: 'invalid' }
  assert.deepStrictEqual(vm.ThreePayfiletr.map(x => x.id), ['22'])
  vm.getconfirm(); assert.strictEqual(sent.length, 1)
  vm.ruleForm.threePayIdsString = '[{"threeId":"22","code":"BANK-CODE"}]'
  vm.ruleForm.bankAccount = 'name'; vm.ruleForm.bankCardNo = 'card'
  vm.getconfirm(); assert.strictEqual(sent[1].value.bankName, 'BANK-CODE'); assert.strictEqual(sent[1].value.ifsc, 'no')
  assert.strictEqual(vm.threePayList[1].threeName, 'Bank')
  assert.ok(notices.length >= 2)
  console.log('USDT payout forms passed: SFC compilation, merchant isolation, trusted USDT request fields, network disabled, malformed mappings and legacy bank payload')
}
run().catch(error => { console.error(error); process.exitCode = 1 })
