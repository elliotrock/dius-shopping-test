import test from 'ava'
import {pricingRules} from '../src/pricing-rules.js'

test('test pricingRules 3x ipd', t => {
  let testBasket = [
    { sku: 'ipd', name: 'Super iPad', price: 549.99 }, 
    { sku: 'ipd', name: 'Super iPad', price: 549.99 }, 
    { sku: 'ipd', name: 'Super iPad', price: 549.99 }
  ]
  return pricingRules(testBasket).then(result => {
    t.log(result)
    t.true(result === (549.99 * 3))
  })
})
test('test pricingRules 2x vga', t => {
  let testBasket = [
    { sku: 'vga', name: 'VGA adapter', price: 30.00 },
    { sku: 'vga', name: 'VGA adapter', price: 30.00 }
  ]
  return pricingRules(testBasket).then(result => {
    t.log(result)
    t.true(result === 60)
  })
})
test('test pricingRules 2x mbp, 1x vga (1x free), 1x atv', t => {
  let testBasket = [
    { sku: 'atv', name: 'Apple TV', price: 109.50 },
    { sku: 'atv', name: 'Apple TV', price: 109.50 },
    { sku: 'atv', name: 'Apple TV', price: 109.50 },
    { sku: 'vga', name: 'VGA adapter', price: 30.00 }
  ]
  return pricingRules(testBasket).then(result => {
    t.log(result)
    t.true(result === 249.00)
  })
})
test('test pricingRules atv, ipd, ipd, atv, ipd, ipd, ipd', t => {
  let testBasket = [
    { sku: 'atv', name: 'Apple TV', price: 109.50 },
    { sku: 'ipd', name: 'Super iPad', price: 549.99 },
    { sku: 'ipd', name: 'Super iPad', price: 549.99 },
    { sku: 'atv', name: 'Apple TV', price: 109.50 },
    { sku: 'ipd', name: 'Super iPad', price: 549.99 },
    { sku: 'ipd', name: 'Super iPad', price: 549.99 },
    { sku: 'ipd', name: 'Super iPad', price: 549.99 }
  ]
  return pricingRules(testBasket).then(result => {
    t.log(result)
    t.true(result === (109.50 *2) + (499.99 * 5))
  })
})
test('test pricingRules mbp, vga, ipd', t => {
  let testBasket = [
    { sku: 'mbp', name: 'MacBook Pro', price: 1399.99 },
    { sku: 'vga', name: 'VGA adapter', price: 30.00 },
    { sku: 'ipd', name: 'Super iPad', price: 549.99 }
  ]
  return pricingRules(testBasket).then(result => {
    t.log(result)
    t.true(result === 1949.98)
  })
})