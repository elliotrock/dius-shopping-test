import _ from 'lodash'

// note: define the rules as a js object, can load external as a json
const rules = [
  {sku: 'atv', quanity: 3, operator: '==', unitPrice: 219.00, bundle: false},
  {sku: 'ipd', quanity: 4, operator: '>=', unitPrice: 499.99, bundle: false},
  {sku: 'vga', quanity: 1, operator: '==', unitPrice: 0, bundle: 'mbp'}
]

// note: extend any new possible deals here
const greaterThan = (items, rule) => {
  // bulk discounted on a set of items
  let itemsDiscountPrice = items.length >= rule.quanity ? Number(rule.unitPrice) * Number(items.length) : Number(items[0].price) * Number(items.length)
  return itemsDiscountPrice
}
const equalTo = (items, rule) => {
  // get one free off a quanity
  let itemsDiscountPrice = items[0].price * items.length 
  // apply discount to first quanity, applies for multiples of the items quanity
  if(Math.floor(items.length/rule.quanity) > 0 ){
    if(Math.floor(items.length/rule.quanity) === Math.floor(items.length/rule.quanity)) itemsDiscountPrice = Number(rule.unitPrice) * Math.floor(items.length/rule.quanity)
    // don't apply discount if items quanity is not an exact unit 
    if( items.length/rule.quanity > Math.floor(items.length/rule.quanity) ) itemsDiscountPrice += items[0].price
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
          // note: group basket on sku to test against the rules, 
          // and then use new price or check new bundle sku 
          // not standard to be missing a reject.
          let dealPrice = 0
          let groupedBasket = _.groupBy(basket, item => {
            return item.sku
          })
          if(groupedBasket !== undefined) {
            // deal, consider making the operator readible like 'bulk discount' 
            // currently returns price even if deal doesn't match but this is due to the
            // math of some of the rules
            if(rule.operator === '>=' && groupedBasket[rule.sku]) totalPrice += greaterThan(groupedBasket[rule.sku], rule) 
            if(rule.operator === '==' && groupedBasket[rule.sku] && !rule.bundle) totalPrice += equalTo(groupedBasket[rule.sku], rule) 
            if(rule.operator === '==' && groupedBasket[rule.sku] && rule.bundle ){
              let bundleItems = basket.filter(item => {
                return item.sku === rule.bundle
              }) 
              totalPrice += bundle(groupedBasket[rule.sku], bundleItems, rule) 
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