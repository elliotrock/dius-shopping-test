# dius-shopping-test

node.js example

The main problem is allowing for a client to update the rules without too much code changes. The three current methods can be used against other sku's by editting the js object (which could bve easily changed to an external json file).

This way new rules can be added and have an easy way to edit them for various products.

The rules are defined with three properties;

```
sku - the product sku
quanity - the quanity needed for the deal
operator - if the deal is is for a set or bulk deal
unitPrice - the new price if the deal is triggered
bundle - if this is part of another sku
```

The current rules are:
```
const rules = [
  {sku: 'atv', quanity: 3, operator: '==', unitPrice: 219.00, bundle: false},
  {sku: 'ipd', quanity: 4, operator: '>=', unitPrice: 499.99, bundle: false},
  {sku: 'vga', quanity: 1, operator: '==', unitPrice: 0, bundle: 'mbp'}
]
```

## tools used: ##
Ava - simple, powerful test runner, es6 compatible 
Babel - es6 transpiling
Promise 
