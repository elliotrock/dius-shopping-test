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
  basket.push(product)
}
export const total = () => {
  return new Promise((accept, reject) => {
    let sumTotal = 0
    accept(sumTotal)
  })
}