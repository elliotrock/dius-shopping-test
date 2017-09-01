import {scan, total} from './src/checkout.js'

// note: tests uses the examples in the instructions
scan('atv')
scan('ipd')
scan('ipd')
scan('atv')
scan('ipd')
scan('ipd')
scan('ipd')
total().then(result => {
  console.log(result)
  console.log(result === (109.50 *2) + (499.99 * 5))
})