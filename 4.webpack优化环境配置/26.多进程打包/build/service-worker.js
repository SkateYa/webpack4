if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const l=e=>n(e,t),d={module:{uri:t},exports:o,require:l};i[t]=Promise.all(r.map((e=>d[e]||l(e)))).then((e=>(s(...e),o)))}}define(["./workbox-95991972"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"built.32f8b19d70.js",revision:null},{url:"css/built.dd2cc83f2b.css",revision:null},{url:"index.html",revision:"dd1b8cab891ae3805d36bb7bd6d1734d"},{url:"media/1feff74faaf0efc6a044355c92cd15d9.bin",revision:null}],{})}));
