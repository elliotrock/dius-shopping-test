import test from 'ava'
import Checkout from '../src/checkout'

const catalogue = [
  { sku: 'ipd', name: 'Super iPad', price: 549.99 },
  { sku: 'mbp', name: 'MacBook Pro', price: 1399.99 },
  { sku: 'atv', name: 'Apple TV', price: 109.50 },
  { sku: 'vga', name: 'VGA adapter', price: 30.00 }
]

test('test checkout false scan', t => {
  let checkout = new Checkout(catalogue)
  t.is(checkout.scan('abc'), false)
})

test('accept checkout deal ', t => {
  let checkout = new Checkout(catalogue)
  checkout.scan('atv')
  checkout.scan('ipd')
  checkout.scan('ipd')
  checkout.scan('atv')
  checkout.scan('ipd')
  checkout.scan('ipd')
  checkout.scan('ipd')
  return checkout.total().then(result => {
    t.log(result)
		t.true(result === 2718.95)
	})
})
