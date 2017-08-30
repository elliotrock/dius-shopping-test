import test from 'ava'
import {scan, total} from '../src/checkout'

test('test checkout scan', t => {
  t.pass(scan('abc'))
})
// test the total
test('test checkout scan is 0', t => {
  return total().then(result => {
    t.log(result)
		t.true(result === 0)
	})
})