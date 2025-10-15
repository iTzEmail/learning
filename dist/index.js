/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"./node_modules/firebase/app/dist/esm/index.esm.js\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ \"./node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n\r\n\r\nconst firebaseConfig = {\r\n  apiKey: \"AIzaSyDYCId6a0xOqbDi13rko_bSvIRv0KNmcNI\",\r\n  authDomain: \"fir-9-26d77.firebaseapp.com\",\r\n  projectId: \"fir-9-26d77\",\r\n  storageBucket: \"fir-9-26d77.firebasestorage.app\",\r\n  messagingSenderId: \"995514548945\",\r\n  appId: \"1:995514548945:web:a43c7592b043b164f17bf0\",\r\n  measurementId: \"G-BPNQ5G1XH0\"\r\n};\r\n\r\n\r\n// Init Firebase app\r\n(0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);\r\n\r\n\r\n\r\n// Authentication\r\n\r\n\r\nconst auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)();\r\n\r\n\r\n// Auth changes\r\n\r\n\r\nconst ubsubAuth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.onAuthStateChanged)(auth, (user) => {\r\n    console.log('user status changed:', user);\r\n});\r\n\r\n\r\n// Sign up\r\n\r\n\r\nconst signUp = document.querySelector('.signup');\r\nsignUp.addEventListener('submit', (e) => {\r\n    e.preventDefault();\r\n\r\n    const email = signUp.email.value;\r\n    const password = signUp.password.value;\r\n    (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.createUserWithEmailAndPassword)(auth, email, password)\r\n        .then((cred) => {\r\n            alert('User successfully created!');\r\n\r\n            signUp.reset();\r\n        })\r\n        .catch(err => {\r\n            alert(err.message);\r\n        });\r\n});\r\n\r\n\r\n// Login\r\n\r\n\r\nconst login = document.querySelector('.login');\r\nlogin.addEventListener('submit', (e) => {\r\n    e.preventDefault();\r\n\r\n    const email = login.email.value;\r\n    const password = login.password.value;\r\n    (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.signInWithEmailAndPassword)(auth, email, password)\r\n        .then((cred) => {\r\n            alert('Successfully logged in!');\r\n\r\n            login.reset();\r\n        })\r\n        .catch(err => {\r\n            alert(err.message);\r\n        });\r\n});\r\n\r\n\r\n// Sign out\r\n\r\n\r\nconst logout = document.querySelector('.logout');\r\nlogout.addEventListener('click', () => {\r\n    (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.signOut)(auth)\r\n        .then(() => {\r\n            alert('Successfully logged out!');\r\n        })\r\n        .catch(err => {\r\n            console.log(err.message);\r\n        });\r\n});\r\n\r\n\r\n\r\n// Real time collection data\r\n\r\n\r\nconst db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getFirestore)();\r\nconst colRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.collection)(db, 'books');\r\n\r\n// Queries\r\n// const q = query(colRef, where(\"author\", \"==\", \"patrick rothfuss\"), orderBy('createdAt', 'desc'));\r\nconst q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.query)(colRef, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.orderBy)('createdAt', 'desc'));\r\nconst unsubCol = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.onSnapshot)(q, (snapshot) => {\r\n    let books = [];\r\n    snapshot.docs.forEach((doc) => {\r\n        books.push({ ...doc.data(), id: doc.id });\r\n    });\r\n\r\n    console.log(books);\r\n});\r\n\r\n\r\n// Adding documents\r\n\r\n\r\nconst addBook = document.querySelector('.add');\r\naddBook.addEventListener('submit', (e) => {\r\n    e.preventDefault();\r\n\r\n    (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.addDoc)(colRef, {\r\n        title: addBook.title.value,\r\n        author: addBook.author.value,\r\n        createdAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.serverTimestamp)()\r\n    })\r\n    .then(() => {\r\n        alert('Book successfully added!');\r\n\r\n        addBook.reset();\r\n    })\r\n    .catch(err => { \r\n        console.log(err.message);\r\n    });\r\n});\r\n\r\n\r\n// Deleting documents\r\n\r\n\r\nconst deleteBook = document.querySelector('.delete');\r\ndeleteBook.addEventListener('submit', (e) => {\r\n    e.preventDefault();\r\n\r\n    const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(db, 'books', deleteBook.id.value);\r\n    (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.deleteDoc)(docRef)\r\n        .then(() => {\r\n            alert('Book successfully deleted!'); \r\n\r\n            deleteBook.reset();\r\n        })\r\n        .catch(err => {\r\n            console.log(err.message);\r\n        });\r\n});\r\n\r\n\r\n// Get a single document\r\n\r\n\r\nconst docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(db, 'books', 'iKQDpDRXxlLbZJF15Vu8');\r\n// getDoc(docRef)\r\n//     .then((doc) => {\r\n//         console.log(doc.data(), doc.id);\r\n//     });\r\n\r\nconst unsubDoc = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.onSnapshot)(docRef, (doc) => {\r\n    console.log(doc.data(), doc.id);\r\n});\r\n\r\n\r\n// Update document\r\n\r\n\r\nconst updateBook = document.querySelector('.update');\r\nupdateBook.addEventListener('submit', (e) => {\r\n    e.preventDefault();\r\n\r\n    const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(db, 'books', updateBook.id.value);\r\n    (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(docRef, {\r\n        title: 'updated title',\r\n        author: 'updated author'\r\n    })\r\n    .then(() => {\r\n        alert('Book successfully updated!');\r\n        \r\n        updateBook.reset();\r\n    })\r\n    .catch(err => {\r\n        console.log(err.message);\r\n    });\r\n});\r\n\r\n\r\n// Unsubscribe from changes (for testing purposes)\r\nconst unsub = document.querySelector('.unsub');\r\nunsub.addEventListener('click', () => {\r\n    console.log('Unsubscribing from collection changes');\r\n\r\n    ubsubAuth();\r\n    unsubCol();\r\n    unsubDoc();\r\n});\n\n//# sourceURL=webpack://webpack/./src/js/index.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkwebpack"] = self["webpackChunkwebpack"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_firebase_app_dist_esm_index_esm_js-node_modules_firebase_auth_dist_esm_i-d79ff4"], () => (__webpack_require__("./src/js/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;