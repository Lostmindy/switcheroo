var MONOMER;MONOMER=(()=>{var e={477:(e,t,o)=>{function r(e,t,o){return window.fetch?fetch(e,this.fetchOptions(t,o)):new Error("Fetch API not found.")}e=o.nmd(e),r.prototype.fetchOptions=function(e,t){const o={...e};return o.headers={...o.headers,"Content-Type":"application/x-www-form-urlencoded"},o.body=this.bodyData(t),o},r.prototype.toFormData=function(e){var t=new FormData;for(var o in e)t.append(o,e[o]);return t},r.prototype.encodeFormData=function(e){return[...e.entries()].map((e=>`${encodeURIComponent(e[0])}=${encodeURIComponent(e[1])}`)).join("&")},r.prototype.bodyData=function(e){return this.encodeFormData(this.toFormData(e))},e.export={Fetcher:r}},138:(e,t,o)=>{"use strict";function r(e="#switcheroo",t={}){this.selector=e;var o={};this.options=t&&"object"==typeof t?Object.assign({},o,t):o}o.r(t),o.d(t,{default:()=>r}),o(477)}},t={};function o(r){if(t[r])return t[r].exports;var n=t[r]={id:r,loaded:!1,exports:{}};return e[r](n,n.exports,o),n.loaded=!0,n.exports}return o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),o(138)})();