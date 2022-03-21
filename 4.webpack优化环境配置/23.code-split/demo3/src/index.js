

function sum(...arg) {
  return arg.reduce((pre, cur) => pre + cur, 0)
}

import (/* webpackChunkName:'test' */'./test').then(({mul,count})=>{
     console.log(mul(2,2))
}).catch(err=>{
  console.log(err)
})

console.log(sum(1, 2, 3, 4, 5))