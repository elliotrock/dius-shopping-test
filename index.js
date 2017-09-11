import Checkout from './src/checkout.js'

const catalogue = [
  { sku: 'ipd', name: 'Super iPad', price: 549.99 },
  { sku: 'mbp', name: 'MacBook Pro', price: 1399.99 },
  { sku: 'atv', name: 'Apple TV', price: 109.50 },
  { sku: 'vga', name: 'VGA adapter', price: 30.00 }
]
let checkout = new Checkout(catalogue)
checkout.scan('atv')
checkout.scan('atv')
checkout.scan('atv')
checkout.scan('vga')
checkout.total().then(result => {
  console.log(result)
  console.log(result === 249.00)
})
let checkout2 = new Checkout(catalogue)
checkout2.scan('atv')
checkout2.scan('ipd')
checkout2.scan('ipd')
checkout2.scan('atv')
checkout2.scan('ipd')
checkout2.scan('ipd')
checkout2.scan('ipd')
checkout2.total().then(result => {
  console.log(result)
  console.log(result === 2718.95)
})
let checkout3 = new Checkout(catalogue)    
checkout3.scan('mbp')
checkout3.scan('vga')
checkout3.scan('ipd')
checkout3.total().then(result => {
  console.log(result)
  console.log(result === 1949.98)
})
