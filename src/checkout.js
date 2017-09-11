import _ from 'lodash'
import {pricingRules} from './pricing-rules'
/*
*/
export default class Checkout {
  constructor (catalogue = [], basket = []){
    this.basket = basket
    this.catalogue = catalogue
  }
  scan = (sku) => {
    let product = this.catalogue.find(item => {
      return item.sku === sku
    })
    if(product !== undefined) this.basket.push(product)
    // consider passing an error but this should be a soft fail
    return product !== undefined ? true : false  
  }
  total = () => {
    return new Promise((resolve, reject) => {
      if(!_.isEmpty(this.basket)) {
        pricingRules(this.basket).then(result => {
          this.basket=[]
          resolve(result)
        })
      } else {
        this.basket=[]
        resolve(0)
      }
    })
  }
}