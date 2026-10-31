import test from 'node:test'
import assert from 'node:assert/strict'
import { getDamageRank } from '../model/rankResponse.js'

test('new API selects damage scores rather than artifact scores', () => {
  const artifact = { retcode: 100, data: { scores: [250] } }
  const damage = { retcode: 100, data: { scores: [170000] } }
  assert.equal(getDamageRank([artifact, damage]), damage)
})
test('legacy response stays compatible', () => {
  const result = { retcode: 100, data: { scores: [170000] } }
  assert.equal(getDamageRank(result), result)
})
test('server errors remain actionable', () => {
  assert.deepEqual(getDamageRank({ retcode: 104 }), { retcode: 104 })
})
for (const response of [false, null, [], [{ retcode: 100 }]]) {
  test(`missing damage response becomes a request error: ${JSON.stringify(response)}`, () => {
    assert.deepEqual(getDamageRank(response), { retcode: 105 })
  })
}
