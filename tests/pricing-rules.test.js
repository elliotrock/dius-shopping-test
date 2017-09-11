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
test('test pricingRules 1x atv', t => {
  let testBasket = [
    { sku: 'atv', name: 'Apple TV', price: 109.50 }
  ]
  return pricingRules(testBasket).then(result => {
    t.log(result)
    t.true(result === 109.50)
  })
})