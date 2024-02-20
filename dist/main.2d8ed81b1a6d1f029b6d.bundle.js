(()=>{"use strict";var __webpack_modules__={237:(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{eval('/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(913);\n/* harmony import */ var firebase_analytics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(781);\n\n\n\nconst firebaseConfig = {\n  apiKey: "AIzaSyBKIBkV5vITokOAxsQ5Mt9nGAWQejKLOmE",\n  authDomain: "green-ia.firebaseapp.com",\n  databaseURL: "https://green-ia-default-rtdb.europe-west1.firebasedatabase.app",\n  projectId: "green-ia",\n  storageBucket: "green-ia.appspot.com",\n  messagingSenderId: "232056525028",\n  appId: "1:232056525028:web:71aa265a8354f36b0e5cf1",\n  measurementId: "G-BHRBE7S89W"\n};\n\nconst app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__/* .initializeApp */ .Wp)(firebaseConfig);\nconst analytics = (0,firebase_analytics__WEBPACK_IMPORTED_MODULE_1__/* .getAnalytics */ .P5)(app);\n\n// Use dynamic imports for Firestore only when needed\nconst loadFirestore = async () => {\n  try {\n    const { getFirestore } = await __webpack_require__.e(/* import() */ 116).then(__webpack_require__.bind(__webpack_require__, 116));\n    const db = getFirestore(app);\n  } catch (error) {\n    console.error(\'Error loading Firestore:\', error);\n  }\n};\n\nloadFirestore();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjM3LmpzIiwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ncmVlbl9pYV93ZWJzaXRlLy4vaW5kZXguanM/NDFmNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbml0aWFsaXplQXBwIH0gZnJvbSBcImZpcmViYXNlL2FwcFwiO1xuaW1wb3J0IHsgZ2V0QW5hbHl0aWNzIH0gZnJvbSBcImZpcmViYXNlL2FuYWx5dGljc1wiO1xuXG5jb25zdCBmaXJlYmFzZUNvbmZpZyA9IHtcbiAgYXBpS2V5OiBcIkFJemFTeUJLSUJrVjV2SVRva09BeHNRNU10OW5HQVdRZWpLTE9tRVwiLFxuICBhdXRoRG9tYWluOiBcImdyZWVuLWlhLmZpcmViYXNlYXBwLmNvbVwiLFxuICBkYXRhYmFzZVVSTDogXCJodHRwczovL2dyZWVuLWlhLWRlZmF1bHQtcnRkYi5ldXJvcGUtd2VzdDEuZmlyZWJhc2VkYXRhYmFzZS5hcHBcIixcbiAgcHJvamVjdElkOiBcImdyZWVuLWlhXCIsXG4gIHN0b3JhZ2VCdWNrZXQ6IFwiZ3JlZW4taWEuYXBwc3BvdC5jb21cIixcbiAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiMjMyMDU2NTI1MDI4XCIsXG4gIGFwcElkOiBcIjE6MjMyMDU2NTI1MDI4OndlYjo3MWFhMjY1YTgzNTRmMzZiMGU1Y2YxXCIsXG4gIG1lYXN1cmVtZW50SWQ6IFwiRy1CSFJCRTdTODlXXCJcbn07XG5cbmNvbnN0IGFwcCA9IGluaXRpYWxpemVBcHAoZmlyZWJhc2VDb25maWcpO1xuY29uc3QgYW5hbHl0aWNzID0gZ2V0QW5hbHl0aWNzKGFwcCk7XG5cbi8vIFVzZSBkeW5hbWljIGltcG9ydHMgZm9yIEZpcmVzdG9yZSBvbmx5IHdoZW4gbmVlZGVkXG5jb25zdCBsb2FkRmlyZXN0b3JlID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgZ2V0RmlyZXN0b3JlIH0gPSBhd2FpdCBpbXBvcnQoJ2ZpcmViYXNlL2ZpcmVzdG9yZScpO1xuICAgIGNvbnN0IGRiID0gZ2V0RmlyZXN0b3JlKGFwcCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBGaXJlc3RvcmU6JywgZXJyb3IpO1xuICB9XG59O1xuXG5sb2FkRmlyZXN0b3JlKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///237\n')}},__webpack_module_cache__={},deferred,inProgress,dataWebpackPrefix;function __webpack_require__(e){var _=__webpack_module_cache__[e];if(void 0!==_)return _.exports;var r=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](r,r.exports,__webpack_require__),r.exports}__webpack_require__.m=__webpack_modules__,deferred=[],__webpack_require__.O=(e,_,r,a)=>{if(!_){var i=1/0;for(p=0;p<deferred.length;p++){for(var[_,r,a]=deferred[p],c=!0,t=0;t<_.length;t++)(!1&a||i>=a)&&Object.keys(__webpack_require__.O).every((e=>__webpack_require__.O[e](_[t])))?_.splice(t--,1):(c=!1,a<i&&(i=a));if(c){deferred.splice(p--,1);var n=r();void 0!==n&&(e=n)}}return e}a=a||0;for(var p=deferred.length;p>0&&deferred[p-1][2]>a;p--)deferred[p]=deferred[p-1];deferred[p]=[_,r,a]},__webpack_require__.d=(e,_)=>{for(var r in _)__webpack_require__.o(_,r)&&!__webpack_require__.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:_[r]})},__webpack_require__.f={},__webpack_require__.e=e=>Promise.all(Object.keys(__webpack_require__.f).reduce(((_,r)=>(__webpack_require__.f[r](e,_),_)),[])),__webpack_require__.u=e=>e+".97727ff8d73a891adaee.chunk.js",__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.o=(e,_)=>Object.prototype.hasOwnProperty.call(e,_),inProgress={},dataWebpackPrefix="green_ia_website:",__webpack_require__.l=(e,_,r,a)=>{if(inProgress[e])inProgress[e].push(_);else{var i,c;if(void 0!==r)for(var t=document.getElementsByTagName("script"),n=0;n<t.length;n++){var p=t[n];if(p.getAttribute("src")==e||p.getAttribute("data-webpack")==dataWebpackPrefix+r){i=p;break}}i||(c=!0,(i=document.createElement("script")).charset="utf-8",i.timeout=120,__webpack_require__.nc&&i.setAttribute("nonce",__webpack_require__.nc),i.setAttribute("data-webpack",dataWebpackPrefix+r),i.src=e),inProgress[e]=[_];var o=(_,r)=>{i.onerror=i.onload=null,clearTimeout(b);var a=inProgress[e];if(delete inProgress[e],i.parentNode&&i.parentNode.removeChild(i),a&&a.forEach((e=>e(r))),_)return _(r)},b=setTimeout(o.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=o.bind(null,i.onerror),i.onload=o.bind(null,i.onload),c&&document.head.appendChild(i)}},(()=>{var e;__webpack_require__.g.importScripts&&(e=__webpack_require__.g.location+"");var _=__webpack_require__.g.document;if(!e&&_&&(_.currentScript&&(e=_.currentScript.src),!e)){var r=_.getElementsByTagName("script");if(r.length)for(var a=r.length-1;a>-1&&(!e||!/^http(s?):/.test(e));)e=r[a--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),__webpack_require__.p=e})(),(()=>{var e={792:0};__webpack_require__.f.j=(_,r)=>{var a=__webpack_require__.o(e,_)?e[_]:void 0;if(0!==a)if(a)r.push(a[2]);else{var i=new Promise(((r,i)=>a=e[_]=[r,i]));r.push(a[2]=i);var c=__webpack_require__.p+__webpack_require__.u(_),t=new Error;__webpack_require__.l(c,(r=>{if(__webpack_require__.o(e,_)&&(0!==(a=e[_])&&(e[_]=void 0),a)){var i=r&&("load"===r.type?"missing":r.type),c=r&&r.target&&r.target.src;t.message="Loading chunk "+_+" failed.\n("+i+": "+c+")",t.name="ChunkLoadError",t.type=i,t.request=c,a[1](t)}}),"chunk-"+_,_)}},__webpack_require__.O.j=_=>0===e[_];var _=(_,r)=>{var a,i,[c,t,n]=r,p=0;if(c.some((_=>0!==e[_]))){for(a in t)__webpack_require__.o(t,a)&&(__webpack_require__.m[a]=t[a]);if(n)var o=n(__webpack_require__)}for(_&&_(r);p<c.length;p++)i=c[p],__webpack_require__.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return __webpack_require__.O(o)},r=self.webpackChunkgreen_ia_website=self.webpackChunkgreen_ia_website||[];r.forEach(_.bind(null,0)),r.push=_.bind(null,r.push.bind(r))})();var __webpack_exports__=__webpack_require__.O(void 0,[869],(()=>__webpack_require__(237)));__webpack_exports__=__webpack_require__.O(__webpack_exports__)})();