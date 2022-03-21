import $ from 'jquery'

function sum(...arg) {
  return arg.reduce((pre, cur) => pre + cur, 0)
}



console.log(sum(1, 2, 3, 4, 5))