import {scan, total} from './src/checkout.js'

// note: tests uses the examples in the instructions
// atv, atv, atv, vga
scan('atv')
scan('atv')
scan('atv')
scan('vga')
total().then(result => {
  console.log(result)
  console.log(result === 249.00)
  // chain them so they are cleared before adding
  scan('atv')
  scan('ipd')
  scan('ipd')
  scan('atv')
  scan('ipd')
  scan('ipd')
  scan('ipd')
  total().then(result => {
    console.log(result)
    console.log(result === 2718.95)
      
    scan('mbp')
    scan('vga')
    scan('ipd')
    total().then(result => {
      console.log(result)
      console.log(result === 1949.98)
    })
  })
})