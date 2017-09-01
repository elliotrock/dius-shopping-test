import test from 'ava'
import {scan, total} from '../src/checkout'

test('test checkout false scan', t => {
  t.is(scan('abc'), false)
})
// first test example
test('test checkout scan atv', t => {
  t.is(scan('atv'), true)
})
test('test checkout scan ipd', t => {
  t.is(scan('ipd'), true)
})
test('test checkout scan ipd', t => {
  t.is(scan('ipd'), true)
})
test('test checkout scan atv', t => {
  t.is(scan('atv'), true)
})
test('test checkout scan ipd', t => {
  t.is(scan('ipd'), true)
})
test('test checkout scan ipd', t => {
  t.is(scan('ipd'), true)
})
test('test checkout scan ipd', t => {
  t.is(scan('ipd'), true)
})
// test the total
test('test checkout scan is ', t => {
  return total().then(result => {
    t.log(result)
		t.true(result === (109.50 *2) + (499.99 * 5))
	})
})
