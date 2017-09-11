import _ from 'lodash'

const rules = [
  {sku: 'atv', quanity: 3, operator: 'for', unitPrice: 219.00, bundle: false},
  {sku: 'ipd', quanity: 4, operator: 'bulk', unitPrice: 499.99, bundle: false},
  {sku: 'vga', quanity: 1, operator: 'bundle', unitPrice: 0, bundle: 'mbp'}
]

const bulkDiscount = (items, rule) => {
  return items.length >= rule.quanity ? Number(rule.unitPrice) * Number(items.length) : Number(items[0].price) * Number(items.length)
}
const forQuanityDeal = (items, rule) => {
  let itemsDiscountPrice = items[0].price * items.length 
  if(Math.floor(items.length/rule.quanity) > 0 ){
    if(Math.floor(items.length/rule.quanity) === Math.floor(items.length/rule.quanity) ) itemsDiscountPrice = Number(rule.unitPrice) * Math.floor(items.length/rule.quanity)
    if(items.length/rule.quanity > Math.floor(items.length/rule.quanity) ) itemsDiscountPrice += items[0].price
  }
  return itemsDiscountPrice
}
const bundle = (items, bundleItems, rule) => {
  let bundleDiscountPrice =  items.length <= bundleItems.length  ? items.length * rule.unitPrice : (items.length - bundleItems.length) * items[0].price
  return bundleDiscountPrice
}
// note: just effects the total price
export const pricingRules = (basket) => {
  return new Promise ((resolve, reject) => {
    let totalPrice = 0
    var checkRulesBasket = () =>{
      return new Promise((resolve, reject) =>{
        let len = rules.length
        for(let i=0; i < len; i++){
          let rule = rules[i]
          let dealPrice = 0
          let groupedBasket = _.groupBy(basket, item => {
            return item.sku
          })
          if(groupedBasket !== undefined) {
            if(groupedBasket[rule.sku] !== undefined){
              if(rule.operator === 'bulk') totalPrice += bulkDiscount(groupedBasket[rule.sku], rule) 
              if(rule.operator === 'for') totalPrice += forQuanityDeal(groupedBasket[rule.sku], rule) 
              if(rule.operator === 'bundle' && rule.bundle ){
                let bundleItems = basket.filter(item => {
                  return item.sku === rule.bundle
                }) 
                totalPrice += bundle(groupedBasket[rule.sku], bundleItems, rule) 
              }
            }
          }
          if(i + 1 === len) resolve()
        }
      })
    }
    // test if no rules for that groupedBasket item || rule.bundle === item.sku
    var checkNoRuleBasket = () =>{
      return new Promise((resolve, reject) =>{
        let noRulesBasket = basket.filter(item => {
          let exists = rules.find(rule => rule.sku === item.sku)
          return exists === undefined 
        })
        let len = noRulesBasket.length
        if(len === 0 ) resolve()
        for(let i = 0; i < len; i++) { 
          totalPrice += noRulesBasket[i].price
          if(i + 1 === len) resolve()
        }
      })
    }
    checkRulesBasket().then(checkNoRuleBasket).then(() => {
      resolve(totalPrice)
    })
  })
}