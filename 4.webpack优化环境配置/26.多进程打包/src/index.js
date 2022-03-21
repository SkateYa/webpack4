import './index.css';
import { mul } from './test';

function sum(...arg) {
  return arg.reduce((pre, cur) => pre + cur, 0);
}

console.log(mul(2, 2));

console.log(sum(1, 2, 3, 4, 5));

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('sw注册成功了');
      })
      .catch(() => {
        console.log('sw注册失败了');
      });
  });
}
