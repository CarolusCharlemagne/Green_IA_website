/*! For license information please see 187.e9209cea78a44217f47b.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkgreen_ia_website=self.webpackChunkgreen_ia_website||[]).push([[187],{187:(e,t,r)=>{r.d(t,{FA:()=>S,Fy:()=>f,Ku:()=>w,T9:()=>u,Uj:()=>i,ZQ:()=>l,bD:()=>A,cY:()=>h,dM:()=>y,eX:()=>g,g:()=>b,nr:()=>p,p9:()=>B,sr:()=>d,yU:()=>c,zW:()=>_});const n=function(e){const t=[];let r=0;for(let n=0;n<e.length;n++){let o=e.charCodeAt(n);o<128?t[r++]=o:o<2048?(t[r++]=o>>6|192,t[r++]=63&o|128):55296==(64512&o)&&n+1<e.length&&56320==(64512&e.charCodeAt(n+1))?(o=65536+((1023&o)<<10)+(1023&e.charCodeAt(++n)),t[r++]=o>>18|240,t[r++]=o>>12&63|128,t[r++]=o>>6&63|128,t[r++]=63&o|128):(t[r++]=o>>12|224,t[r++]=o>>6&63|128,t[r++]=63&o|128)}return t},o={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const r=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let t=0;t<e.length;t+=3){const o=e[t],s=t+1<e.length,i=s?e[t+1]:0,a=t+2<e.length,c=a?e[t+2]:0,u=o>>2,h=(3&o)<<4|i>>4;let f=(15&i)<<2|c>>6,l=63&c;a||(l=64,s||(f=64)),n.push(r[u],r[h],r[f],r[l])}return n.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(n(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let r=0,n=0;for(;r<e.length;){const o=e[r++];if(o<128)t[n++]=String.fromCharCode(o);else if(o>191&&o<224){const s=e[r++];t[n++]=String.fromCharCode((31&o)<<6|63&s)}else if(o>239&&o<365){const s=((7&o)<<18|(63&e[r++])<<12|(63&e[r++])<<6|63&e[r++])-65536;t[n++]=String.fromCharCode(55296+(s>>10)),t[n++]=String.fromCharCode(56320+(1023&s))}else{const s=e[r++],i=e[r++];t[n++]=String.fromCharCode((15&o)<<12|(63&s)<<6|63&i)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const r=t?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let t=0;t<e.length;){const o=r[e.charAt(t++)],i=t<e.length?r[e.charAt(t)]:0;++t;const a=t<e.length?r[e.charAt(t)]:64;++t;const c=t<e.length?r[e.charAt(t)]:64;if(++t,null==o||null==i||null==a||null==c)throw new s;const u=o<<2|i>>4;if(n.push(u),64!==a){const e=i<<4&240|a>>2;if(n.push(e),64!==c){const e=a<<6&192|c;n.push(e)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class s extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const i=function(e){return function(e){const t=n(e);return o.encodeByteArray(t,!0)}(e).replace(/\./g,"")},a=()=>{try{return function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==r.g)return r.g;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__||(()=>{if("undefined"==typeof process||void 0===process.env)return;const e=process.env.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0})()||(()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}const t=e&&function(e){try{return o.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null}(e[1]);return t&&JSON.parse(t)})()}catch(e){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)}},c=e=>{const t=(e=>{var t,r;return null===(r=null===(t=a())||void 0===t?void 0:t.emulatorHosts)||void 0===r?void 0:r[e]})(e);if(!t)return;const r=t.lastIndexOf(":");if(r<=0||r+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const n=parseInt(t.substring(r+1),10);return"["===t[0]?[t.substring(1,r-1),n]:[t.substring(0,r),n]},u=()=>{var e;return null===(e=a())||void 0===e?void 0:e.config};class h{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),"function"==typeof e&&(this.promise.catch((()=>{})),1===e.length?e(t):e(t,r))}}}function f(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const r=t||"demo-project",n=e.iat||0,o=e.sub||e.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const s=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:n,exp:n+3600,auth_time:n,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},e);return[i(JSON.stringify({alg:"none",type:"JWT"})),i(JSON.stringify(s)),""].join(".")}function l(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function d(){const e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}function p(){return!function(){var e;const t=null===(e=a())||void 0===e?void 0:e.forceEnvironment;if("node"===t)return!0;if("browser"===t)return!1;try{return"[object process]"===Object.prototype.toString.call(r.g.process)}catch(e){return!1}}()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function _(){try{return"object"==typeof indexedDB}catch(e){return!1}}function g(){return new Promise(((e,t)=>{try{let r=!0;const n="validate-browser-context-for-indexeddb-analytics-module",o=self.indexedDB.open(n);o.onsuccess=()=>{o.result.close(),r||self.indexedDB.deleteDatabase(n),e(!0)},o.onupgradeneeded=()=>{r=!1},o.onerror=()=>{var e;t((null===(e=o.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}}))}function y(){return!("undefined"==typeof navigator||!navigator.cookieEnabled)}class b extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name="FirebaseError",Object.setPrototypeOf(this,b.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,S.prototype.create)}}class S{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},n=`${this.service}/${e}`,o=this.errors[e],s=o?function(e,t){return e.replace(E,((e,r)=>{const n=t[r];return null!=n?String(n):`<${r}?>`}))}(o,r):"Error",i=`${this.serviceName}: ${s} (${n}).`;return new b(n,i,r)}}const E=/\{\$([^}]+)}/g;function A(e,t){if(e===t)return!0;const r=Object.keys(e),n=Object.keys(t);for(const o of r){if(!n.includes(o))return!1;const r=e[o],s=t[o];if(v(r)&&v(s)){if(!A(r,s))return!1}else if(r!==s)return!1}for(const e of n)if(!r.includes(e))return!1;return!0}function v(e){return null!==e&&"object"==typeof e}const T=1e3,C=2,m=144e5,D=.5;function B(e,t=T,r=C){const n=t*Math.pow(r,e),o=Math.round(D*n*(Math.random()-.5)*2);return Math.min(m,n+o)}function w(e){return e&&e._delegate?e._delegate:e}}}]);
//# sourceMappingURL=187.e9209cea78a44217f47b.bundle.js.map