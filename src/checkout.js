import {pricingRules} from './pricing-rules'

const catalogue = [
    { sku: 'ipd', name: 'Super iPad', price: 549.99 },
    { sku: 'mbp', name: 'MacBook Pro', price: 1399.99 },
    { sku: 'atv', name: 'Apple TV', price: 109.50 },
    { sku: 'vga', name: 'VGA adapter', price: 30.00 }
]
var basket = []

export const scan = (sku) => {
  let product = catalogue.find(item => {
    return item.sku === sku
  })
  if(product !== undefined) basket.push(product)
  // consider passing an error but this should be a soft fail
  return product !== undefined ? true : false  
}
export const total = () => {
  return new Promise((resolve, reject) => {
    if(basket !== undefined ) {
      pricingRules(basket).then(result => {
        basket=[]
        resolve(result)
      })
    } else {
      basket=[]
      resolve(0)
    }
  })
}