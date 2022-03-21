// import '@babel/polyfill'

const add = (a, b) => a + b;
// eslint-disable-next-line
console.log(add(2, 2));

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('settimeout执行了');
    resolve();
  }, 1000);
});

console.log(promise);
