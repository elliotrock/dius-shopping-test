const catalogue = [
    { sku: 'ipd', name: 'Super iPad', price: 549.99 },
    { sku: 'mbp', name: 'MacBook Pro', price: 1399.99 },
    { sku: 'atv', name: 'Apple TV', price: 109.50 },
    { sku: 'vga', name: 'VGA adapter', price: 30.00 }
]
var basket = []

export const scan = (sku) => {
  let product = catalogue.find(item => {
    console.log(item.sku === sku)
    return item.sku === sku
  })
  basket.push(product)
}
export const total = () => {
  return new Promise((accept, reject) => {
    let sumTotal = 0
    // note: add pricingRules engine next
    // - group
    // - compare against pricing rules json for quality, operator (>=, >, ==), price, bundle
    basket.forEach(item => {
      if(item !== undefined ) sumTotal += Number(item.price) 
      console.log(sumTotal)
    })
    accept(sumTotal)
  })
}