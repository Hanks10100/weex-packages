(this.nativeLog || function(s) {console.log(s)})('START JS FRAMEWORK: 0.14.4 Build 20160711');
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	__webpack_require__(1);
	
	/**
	 * register methods
	 */
	var methods = __webpack_require__(71);
	var _global = global;
	var registerMethods = _global.registerMethods;
	
	registerMethods(methods);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	__webpack_require__(2);
	
	var _runtime = __webpack_require__(44);
	
	var _runtime2 = _interopRequireDefault(_runtime);
	
	var _package = __webpack_require__(69);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var native = _package.subversion.native;
	var transformer = _package.subversion.transformer;
	
	var _loop = function _loop(methodName) {
	  global[methodName] = function () {
	    var ret = _runtime2.default[methodName].apply(_runtime2.default, arguments);
	    if (ret instanceof Error) {
	      console.error(ret.toString());
	    }
	    return ret;
	  };
	};
	
	for (var methodName in _runtime2.default) {
	  _loop(methodName);
	}
	
	Object.assign(global, {
	  frameworkVersion: native,
	  needTransformerVersion: transformer
	});
	
	/**
	 * register methods
	 */
	var methods = __webpack_require__(70);
	var _global = global;
	var registerMethods = _global.registerMethods;
	
	registerMethods(methods);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(3);
	
	__webpack_require__(41);
	
	__webpack_require__(42);
	
	__webpack_require__(43);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(4);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(5);
	module.exports = __webpack_require__(8).Object.assign;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(6);
	
	$export($export.S + $export.F, 'Object', { assign: __webpack_require__(24) });

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(7),
	    core = __webpack_require__(8),
	    hide = __webpack_require__(9),
	    redefine = __webpack_require__(19),
	    ctx = __webpack_require__(22),
	    PROTOTYPE = 'prototype';
	
	var $export = function $export(type, name, source) {
	  var IS_FORCED = type & $export.F,
	      IS_GLOBAL = type & $export.G,
	      IS_STATIC = type & $export.S,
	      IS_PROTO = type & $export.P,
	      IS_BIND = type & $export.B,
	      target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE],
	      exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
	      expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {}),
	      key,
	      own,
	      out,
	      exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if (target) redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1; // forced
	$export.G = 2; // global
	$export.S = 4; // static
	$export.P = 8; // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	$export.U = 64; // safe
	$export.R = 128; // real proto method for `library`
	module.exports = $export;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	var core = module.exports = { version: '2.4.0' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var dP = __webpack_require__(10),
	    createDesc = __webpack_require__(18);
	module.exports = __webpack_require__(14) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var anObject = __webpack_require__(11),
	    IE8_DOM_DEFINE = __webpack_require__(13),
	    toPrimitive = __webpack_require__(17),
	    dP = Object.defineProperty;
	
	exports.f = __webpack_require__(14) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) {/* empty */}
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isObject = __webpack_require__(12);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	module.exports = function (it) {
	  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = !__webpack_require__(14) && !__webpack_require__(15)(function () {
	  return Object.defineProperty(__webpack_require__(16)('div'), 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(15)(function () {
	  return Object.defineProperty({}, 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isObject = __webpack_require__(12),
	    document = __webpack_require__(7).document
	// in old IE typeof document.createElement is 'object'
	,
	    is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(12);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(7),
	    hide = __webpack_require__(9),
	    has = __webpack_require__(20),
	    SRC = __webpack_require__(21)('src'),
	    TO_STRING = 'toString',
	    $toString = Function[TO_STRING],
	    TPL = ('' + $toString).split(TO_STRING);
	
	__webpack_require__(8).inspectSource = function (it) {
	  return $toString.call(it);
	};
	
	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) has(val, 'name') || hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === global) {
	    O[key] = val;
	  } else {
	    if (!safe) {
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if (O[key]) O[key] = val;else hide(O, key, val);
	    }
	  }
	  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	
	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	var id = 0,
	    px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// optional / simple context binding
	var aFunction = __webpack_require__(23);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };
	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };
	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }
	  return function () /* ...args */{
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	
	var getKeys = __webpack_require__(25),
	    gOPS = __webpack_require__(38),
	    pIE = __webpack_require__(39),
	    toObject = __webpack_require__(40),
	    IObject = __webpack_require__(28),
	    $assign = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(15)(function () {
	  var A = {},
	      B = {},
	      S = Symbol(),
	      K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) {
	    B[k] = k;
	  });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) {
	  // eslint-disable-line no-unused-vars
	  var T = toObject(target),
	      aLen = arguments.length,
	      index = 1,
	      getSymbols = gOPS.f,
	      isEnum = pIE.f;
	  while (aLen > index) {
	    var S = IObject(arguments[index++]),
	        keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
	        length = keys.length,
	        j = 0,
	        key;
	    while (length > j) {
	      if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	    }
	  }return T;
	} : $assign;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(26),
	    enumBugKeys = __webpack_require__(37);
	
	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var has = __webpack_require__(20),
	    toIObject = __webpack_require__(27),
	    arrayIndexOf = __webpack_require__(31)(false),
	    IE_PROTO = __webpack_require__(35)('IE_PROTO');
	
	module.exports = function (object, names) {
	  var O = toIObject(object),
	      i = 0,
	      result = [],
	      key;
	  for (key in O) {
	    if (key != IE_PROTO) has(O, key) && result.push(key);
	  } // Don't enum bug & hidden keys
	  while (names.length > i) {
	    if (has(O, key = names[i++])) {
	      ~arrayIndexOf(result, key) || result.push(key);
	    }
	  }return result;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(28),
	    defined = __webpack_require__(30);
	module.exports = function (it) {
	  return IObject(defined(it));
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(29);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";
	
	var toString = {}.toString;
	
	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	"use strict";
	
	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(27),
	    toLength = __webpack_require__(32),
	    toIndex = __webpack_require__(34);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this),
	        length = toLength(O.length),
	        index = toIndex(fromIndex, length),
	        value;
	    // Array#includes uses SameValueZero equality algorithm
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      if (value != value) return true;
	      // Array#toIndex ignores holes, Array#includes - not
	    } else for (; length > index; index++) {
	        if (IS_INCLUDES || index in O) {
	          if (O[index] === el) return IS_INCLUDES || index || 0;
	        }
	      }return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 7.1.15 ToLength
	var toInteger = __webpack_require__(33),
	    min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict";
	
	// 7.1.4 ToInteger
	var ceil = Math.ceil,
	    floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var toInteger = __webpack_require__(33),
	    max = Math.max,
	    min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var shared = __webpack_require__(36)('keys'),
	    uid = __webpack_require__(21);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(7),
	    SHARED = '__core-js_shared__',
	    store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';
	
	// IE 8- don't enum bug keys
	module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";
	
	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";
	
	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(30);
	module.exports = function (it) {
	  return Object(defined(it));
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _global = global;
	var setTimeout = _global.setTimeout;
	var setTimeoutNative = _global.setTimeoutNative;
	
	
	var MSG = 'Use "global.setTimeout"  is unexpected, ' + 'please use require("@weex-module").setTimeout instead.';
	
	// fix no setTimeout on Android V8
	/* istanbul ignore if */
	if (typeof setTimeout === 'undefined' && typeof setTimeoutNative === 'function') {
	  (function () {
	    var timeoutMap = {};
	    var timeoutId = 0;
	    global.setTimeout = function (cb, time) {
	      console.warn(MSG);
	      timeoutMap[++timeoutId] = cb;
	      setTimeoutNative(timeoutId.toString(), time);
	    };
	    global.setTimeoutCallback = function (id) {
	      if (typeof timeoutMap[id] === 'function') {
	        timeoutMap[id]();
	        delete timeoutMap[id];
	      }
	    };
	  })();
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 42 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var OriginPromise = global.Promise || function () {};
	var MSG = 'Using "Promise" is unexpected';
	
	var UnexpectedPromise = function UnexpectedPromise() {
	  console.warn(MSG);
	
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	
	  return new (Function.prototype.bind.apply(OriginPromise, [null].concat(args)))();
	};
	
	var fn = ['all', 'race', 'resolve', 'reject'];
	fn.forEach(function (n) {
	  UnexpectedPromise[n] = function () {
	    console.warn(MSG);
	    return OriginPromise[n] && OriginPromise[n].apply(OriginPromise, arguments);
	  };
	});
	
	global.Promise = UnexpectedPromise;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 43 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var _global = global;
	var console = _global.console;
	var nativeLog = _global.nativeLog;
	
	var LEVELS = ['error', 'warn', 'info', 'log', 'debug'];
	var levelMap = {};
	
	generateLevelMap();
	
	/* istanbul ignore if */
	if (typeof console === 'undefined' || // Android
	global.WXEnvironment && global.WXEnvironment.platform === 'iOS' // iOS
	) {
	    global.console = {
	      debug: function debug() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }
	
	        if (checkLevel('debug')) {
	          nativeLog.apply(undefined, _toConsumableArray(format(args)).concat(['__DEBUG']));
	        }
	      },
	      log: function log() {
	        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	          args[_key2] = arguments[_key2];
	        }
	
	        if (checkLevel('log')) {
	          nativeLog.apply(undefined, _toConsumableArray(format(args)).concat(['__LOG']));
	        }
	      },
	      info: function info() {
	        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	          args[_key3] = arguments[_key3];
	        }
	
	        if (checkLevel('info')) {
	          nativeLog.apply(undefined, _toConsumableArray(format(args)).concat(['__INFO']));
	        }
	      },
	      warn: function warn() {
	        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	          args[_key4] = arguments[_key4];
	        }
	
	        if (checkLevel('warn')) {
	          nativeLog.apply(undefined, _toConsumableArray(format(args)).concat(['__WARN']));
	        }
	      },
	      error: function error() {
	        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	          args[_key5] = arguments[_key5];
	        }
	
	        if (checkLevel('error')) {
	          nativeLog.apply(undefined, _toConsumableArray(format(args)).concat(['__ERROR']));
	        }
	      }
	    };
	  } else {
	  // HTML5
	  var debug = console.debug;
	  var log = console.log;
	  var info = console.info;
	  var warn = console.warn;
	  var error = console.error;
	
	  console.__ori__ = { debug: debug, log: log, info: info, warn: warn, error: error };
	  console.debug = function () {
	    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	      args[_key6] = arguments[_key6];
	    }
	
	    if (checkLevel('debug')) {
	      console.__ori__.debug.apply(console, args);
	    }
	  };
	  console.log = function () {
	    for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	      args[_key7] = arguments[_key7];
	    }
	
	    if (checkLevel('log')) {
	      console.__ori__.log.apply(console, args);
	    }
	  };
	  console.info = function () {
	    for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
	      args[_key8] = arguments[_key8];
	    }
	
	    if (checkLevel('info')) {
	      console.__ori__.info.apply(console, args);
	    }
	  };
	  console.warn = function () {
	    for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
	      args[_key9] = arguments[_key9];
	    }
	
	    if (checkLevel('warn')) {
	      console.__ori__.warn.apply(console, args);
	    }
	  };
	  console.error = function () {
	    for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
	      args[_key10] = arguments[_key10];
	    }
	
	    if (checkLevel('error')) {
	      console.__ori__.error.apply(console, args);
	    }
	  };
	}
	
	function generateLevelMap() {
	  LEVELS.forEach(function (level) {
	    var levelIndex = LEVELS.indexOf(level);
	    levelMap[level] = {};
	    LEVELS.forEach(function (type) {
	      var typeIndex = LEVELS.indexOf(type);
	      if (typeIndex <= levelIndex) {
	        levelMap[level][type] = true;
	      }
	    });
	  });
	}
	
	function normalize(v) {
	  var type = Object.prototype.toString.call(v);
	  if (type.toLowerCase() === '[object object]') {
	    v = JSON.stringify(v);
	  } else {
	    v = String(v);
	  }
	  return v;
	}
	
	function checkLevel(type) {
	  var logLevel = global.WXEnvironment && global.WXEnvironment.logLevel || 'log';
	  return levelMap[logLevel] && levelMap[logLevel][type];
	}
	
	function format(args) {
	  return args.map(function (v) {
	    return normalize(v);
	  });
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createInstance = createInstance;
	
	var _frameworks = __webpack_require__(45);
	
	var _frameworks2 = _interopRequireDefault(_frameworks);
	
	var _vdom = __webpack_require__(67);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var config = {
	  Document: _vdom.Document, Element: _vdom.Element, Comment: _vdom.Comment,
	  sendTasks: function sendTasks() {
	    var _global;
	
	    return (_global = global).callNative.apply(_global, arguments);
	  }
	};
	
	for (var name in _frameworks2.default) {
	  var framework = _frameworks2.default[name];
	  framework.init(config);
	}
	
	var versionRegExp = /^\/\/ *(\{[^\}]*\}) *\r?\n/;
	
	function checkVersion(code) {
	  var info = void 0;
	  var result = versionRegExp.exec(code);
	  if (result) {
	    try {
	      info = JSON.parse(result[1]);
	    } catch (e) {}
	  }
	  return info;
	}
	
	var instanceMap = {};
	
	function createInstance(id, code, config, data) {
	  var info = instanceMap[id];
	  if (!info) {
	    info = checkVersion(code) || {};
	    if (!_frameworks2.default[info.framework]) {
	      info.framework = 'Weex';
	    }
	    instanceMap[id] = info;
	    config = config || {};
	    config.bundleVersion = info.version;
	    return _frameworks2.default[info.framework].createInstance(id, code, config, data);
	  }
	  return new Error('invalid instance id "' + id + '"');
	}
	
	var methods = {
	  createInstance: createInstance
	};
	
	function genInit(methodName) {
	  methods[methodName] = function () {
	    for (var _name in _frameworks2.default) {
	      var _framework = _frameworks2.default[_name];
	      if (_framework && _framework[methodName]) {
	        _framework[methodName].apply(_framework, arguments);
	      }
	    }
	  };
	}
	
	['registerComponents', 'registerModules', 'registerMethods'].forEach(genInit);
	
	function genInstance(methodName) {
	  methods[methodName] = function () {
	    var id = arguments.length <= 0 ? undefined : arguments[0];
	    var info = instanceMap[id];
	    if (info && _frameworks2.default[info.framework]) {
	      var _frameworks$info$fram;
	
	      return (_frameworks$info$fram = _frameworks2.default[info.framework])[methodName].apply(_frameworks$info$fram, arguments);
	    }
	    return new Error('invalid instance id "' + id + '"');
	  };
	}
	
	['destroyInstance', 'refreshInstance', 'callJS', 'getRoot'].forEach(genInstance);
	
	methods.receiveTasks = methods.callJS;
	
	exports.default = methods;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _default = __webpack_require__(46);
	
	var Weex = _interopRequireWildcard(_default);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	exports.default = {
	  Weex: Weex
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * @fileOverview Main entry, instance manager
	                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                   * - createInstance(instanceId, code, options, data)
	                                                                                                                                                                                                                                                   * - refreshInstance(instanceId, data)
	                                                                                                                                                                                                                                                   * - destroyInstance(instanceId)
	                                                                                                                                                                                                                                                   * - registerComponents(components)
	                                                                                                                                                                                                                                                   * - registerModules(modules)
	                                                                                                                                                                                                                                                   * - getRoot(instanceId)
	                                                                                                                                                                                                                                                   * - instanceMap
	                                                                                                                                                                                                                                                   * - callJS(instanceId, tasks)
	                                                                                                                                                                                                                                                   *   - fireEvent(ref, type, data)
	                                                                                                                                                                                                                                                   *   - callback(funcId, data)
	                                                                                                                                                                                                                                                   */
	
	exports.init = init;
	exports.createInstance = createInstance;
	exports.refreshInstance = refreshInstance;
	exports.destroyInstance = destroyInstance;
	exports.registerComponents = registerComponents;
	exports.registerModules = registerModules;
	exports.registerMethods = registerMethods;
	exports.getRoot = getRoot;
	exports.callJS = callJS;
	
	var _config = __webpack_require__(47);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _app = __webpack_require__(48);
	
	var _app2 = _interopRequireDefault(_app);
	
	var _vm = __webpack_require__(53);
	
	var _vm2 = _interopRequireDefault(_vm);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var nativeComponentMap = _config2.default.nativeComponentMap;
	
	var instanceMap = {};
	
	function init(cfg) {
	  _config2.default.Document = cfg.Document;
	  _config2.default.Element = cfg.Element;
	  _config2.default.Comment = cfg.Comment;
	  _config2.default.sendTasks = cfg.sendTasks;
	}
	
	/**
	 * create a Weex instance
	 *
	 * @param  {string} instanceId
	 * @param  {string} code
	 * @param  {object} [options] option `HAS_LOG` enable print log
	 * @param  {object} [data]
	 */
	function createInstance(instanceId, code, options, data) {
	  var instance = instanceMap[instanceId];
	  options = options || {};
	
	  _config2.default.debug = options.debug;
	
	  var result = void 0;
	  if (!instance) {
	    instance = new _app2.default(instanceId, options);
	    instanceMap[instanceId] = instance;
	    result = instance.init(code, data);
	  } else {
	    result = new Error('invalid instance id "' + instanceId + '"');
	  }
	
	  return result;
	}
	
	/**
	 * refresh a Weex instance
	 *
	 * @param  {string} instanceId
	 * @param  {object} data
	 */
	function refreshInstance(instanceId, data) {
	  var instance = instanceMap[instanceId];
	  var result = void 0;
	  if (instance) {
	    result = instance.refreshData(data);
	  } else {
	    result = new Error('invalid instance id "' + instanceId + '"');
	  }
	  return result;
	}
	
	/**
	 * destroy a Weex instance
	 * @param  {string} instanceId
	 */
	function destroyInstance(instanceId) {
	  var instance = instanceMap[instanceId];
	  if (!instance) {
	    return new Error('invalid instance id "' + instanceId + '"');
	  }
	
	  instance.destroy();
	  delete instanceMap[instanceId];
	  return instanceMap;
	}
	
	/**
	 * register the name of each native component
	 * @param  {array} components array of name
	 */
	function registerComponents(components) {
	  if (Array.isArray(components)) {
	    components.forEach(function register(name) {
	      /* istanbul ignore if */
	      if (!name) {
	        return;
	      }
	      if (typeof name === 'string') {
	        nativeComponentMap[name] = true;
	      } else if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object' && typeof name.type === 'string') {
	        nativeComponentMap[name.type] = name;
	      }
	    });
	  }
	}
	
	/**
	 * register the name and methods of each module
	 * @param  {object} modules a object of modules
	 */
	function registerModules(modules) {
	  if ((typeof modules === 'undefined' ? 'undefined' : _typeof(modules)) === 'object') {
	    _vm2.default.registerModules(modules);
	  }
	}
	
	/**
	 * register the name and methods of each api
	 * @param  {object} apis a object of apis
	 */
	function registerMethods(apis) {
	  if ((typeof apis === 'undefined' ? 'undefined' : _typeof(apis)) === 'object') {
	    _vm2.default.registerMethods(apis);
	  }
	}
	
	/**
	 * get a whole element tree of an instance
	 * for debugging
	 * @param  {string} instanceId
	 * @return {object} a virtual dom tree
	 */
	function getRoot(instanceId) {
	  var instance = instanceMap[instanceId];
	  var result = void 0;
	  if (instance) {
	    result = instance.getRootElement();
	  } else {
	    result = new Error('invalid instance id "' + instanceId + '"');
	  }
	  return result;
	}
	
	var jsHandlers = {
	  fireEvent: function fireEvent(instanceId, ref, type, data, domChanges) {
	    var instance = instanceMap[instanceId];
	    return instance.fireEvent(ref, type, data, domChanges);
	  },
	
	  callback: function callback(instanceId, funcId, data, ifLast) {
	    var instance = instanceMap[instanceId];
	    return instance.callback(funcId, data, ifLast);
	  }
	};
	
	/**
	 * accept calls from native (event or callback)
	 *
	 * @param  {string} instanceId
	 * @param  {array} tasks list with `method` and `args`
	 */
	function callJS(instanceId, tasks) {
	  var instance = instanceMap[instanceId];
	  if (instance && Array.isArray(tasks)) {
	    var _ret = function () {
	      var results = [];
	      tasks.forEach(function (task) {
	        var handler = jsHandlers[task.method];
	        var args = [].concat(_toConsumableArray(task.args));
	        if (typeof handler === 'function') {
	          args.unshift(instanceId);
	          results.push(handler.apply(undefined, _toConsumableArray(args)));
	        }
	      });
	      return {
	        v: results
	      };
	    }();
	
	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	  return new Error('invalid instance id "' + instanceId + '" or tasks');
	}

/***/ },
/* 47 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  nativeComponentMap: {
	    text: true,
	    image: true,
	    container: true,
	    slider: {
	      type: 'slider',
	      append: 'tree'
	    },
	    cell: {
	      type: 'cell',
	      append: 'tree'
	    }
	  },
	  customComponentMap: {},
	  debug: false
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = AppInstance;
	
	var _util = __webpack_require__(49);
	
	var _bundle = __webpack_require__(50);
	
	var bundle = _interopRequireWildcard(_bundle);
	
	var _ctrl = __webpack_require__(65);
	
	var ctrl = _interopRequireWildcard(_ctrl);
	
	var _differ = __webpack_require__(66);
	
	var _differ2 = _interopRequireDefault(_differ);
	
	var _config = __webpack_require__(47);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _register = __webpack_require__(63);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 * @fileOverview
	 * Weex instance constructor & definition
	 */
	
	function AppInstance(instanceId, options) {
	  this.id = instanceId;
	  this.options = options || {};
	  this.vm = null;
	  this.customComponentMap = {};
	  this.callbacks = {};
	  this.doc = new _config2.default.Document(instanceId, this.options.bundleUrl);
	  this.differ = new _differ2.default(instanceId);
	  this.uid = 0;
	}
	
	function normalize(app, v) {
	  var type = (0, _util.typof)(v);
	
	  switch (type) {
	    case 'undefined':
	    case 'null':
	      return '';
	    case 'regexp':
	      return v.toString();
	    case 'date':
	      return v.toISOString();
	    case 'number':
	    case 'string':
	    case 'boolean':
	    case 'array':
	    case 'object':
	      if (v instanceof _config2.default.Element) {
	        return v.ref;
	      }
	      return v;
	    case 'function':
	      app.callbacks[++app.uid] = v;
	      return app.uid.toString();
	    default:
	      return JSON.stringify(v);
	  }
	}
	
	AppInstance.prototype.callTasks = function (tasks) {
	  var _this = this;
	
	  if ((0, _util.typof)(tasks) !== 'array') {
	    tasks = [tasks];
	  }
	
	  tasks.forEach(function (task) {
	    task.args = task.args.map(function (arg) {
	      return normalize(_this, arg);
	    });
	  });
	
	  return _config2.default.sendTasks(this.id, tasks, '-1');
	};
	
	(0, _util.extend)(AppInstance.prototype, bundle, ctrl, {
	  registerComponent: _register.registerComponent,
	  requireComponent: _register.requireComponent,
	  requireModule: _register.requireModule
	});

/***/ },
/* 49 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.isReserved = isReserved;
	exports.def = def;
	exports.remove = remove;
	exports.hasOwn = hasOwn;
	exports.cached = cached;
	exports.bind = bind;
	exports.toArray = toArray;
	exports.extend = extend;
	exports.isObject = isObject;
	exports.isPlainObject = isPlainObject;
	exports.stringify = stringify;
	exports.typof = typof;
	exports.normalize = normalize;
	exports.error = error;
	exports.warn = warn;
	exports.info = info;
	exports.debug = debug;
	exports.log = log;
	/* global MutationObserver */
	
	// / lang.js
	
	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */
	
	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}
	
	/**
	 * Define a property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */
	
	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}
	
	// / env.js
	
	// can we use __proto__?
	var hasProto = exports.hasProto = '__proto__' in {};
	
	// Browser environment sniffing
	var inBrowser = exports.inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';
	
	// detect devtools
	var devtools = exports.devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
	
	// UA sniffing for working around browser-specific quirks
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIos = UA && /(iphone|ipad|ipod|ios)/i.test(UA);
	var isWechat = UA && UA.indexOf('micromessenger') > 0;
	
	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */
	
	var nextTick = exports.nextTick = function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc = void 0;
	  function nextTickHandler() {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks = [];
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }
	
	  /* istanbul ignore if */
	  if (typeof MutationObserver !== 'undefined' && !(isWechat && isIos)) {
	    (function () {
	      var counter = 1;
	      var observer = new MutationObserver(nextTickHandler);
	      var textNode = document.createTextNode(counter);
	      observer.observe(textNode, {
	        characterData: true
	      });
	      timerFunc = function timerFunc() {
	        counter = (counter + 1) % 2;
	        textNode.data = counter;
	      };
	    })();
	  } else {
	    // webpack attempts to inject a shim for setImmediate
	    // if it is used as a global, so we have to work around that to
	    // avoid bundling unnecessary code.
	    var context = inBrowser ? window : typeof global !== 'undefined' ? global : {};
	    timerFunc = context.setImmediate || setTimeout;
	  }
	  return function (cb, ctx) {
	    var func = ctx ? function () {
	      cb.call(ctx);
	    } : cb;
	    callbacks.push(func);
	    if (pending) return;
	    pending = true;
	    timerFunc(nextTickHandler, 0);
	  };
	}();
	
	var _Set = void 0;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && Set.toString().match(/native code/)) {
	  // use native Set when available.
	  exports._Set = _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  exports._Set = _Set = function _Set() {
	    this.set = Object.create(null);
	  };
	  _Set.prototype.has = function (key) {
	    return this.set[key] !== undefined;
	  };
	  _Set.prototype.add = function (key) {
	    this.set[key] = 1;
	  };
	  _Set.prototype.clear = function () {
	    this.set = Object.create(null);
	  };
	}
	
	exports._Set = _Set;
	
	// / shared
	
	/**
	 * Remove an item from an array
	 *
	 * @param {Array} arr
	 * @param {*} item
	 */
	
	function remove(arr, item) {
	  if (arr.length) {
	    var index = arr.indexOf(item);
	    if (index > -1) {
	      return arr.splice(index, 1);
	    }
	  }
	}
	
	/**
	 * Check whether the object has the property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}
	
	/**
	 * Create a cached version of a pure function.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */
	
	function cached(fn) {
	  var cache = Object.create(null);
	  return function cachedFn(str) {
	    var hit = cache[str];
	    return hit || (cache[str] = fn(str));
	  };
	}
	
	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var camelizeRE = /-(\w)/g;
	var camelize = exports.camelize = cached(function (str) {
	  return str.replace(camelizeRE, toUpper);
	});
	
	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}
	
	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var hyphenateRE = /([a-z\d])([A-Z])/g;
	var hyphenate = exports.hyphenate = cached(function (str) {
	  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
	});
	
	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */
	
	function bind(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}
	
	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */
	
	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	}
	
	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */
	
	function extend(target) {
	  for (var _len = arguments.length, src = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    src[_key - 1] = arguments[_key];
	  }
	
	  if (typeof Object.assign === 'function') {
	    Object.assign.apply(Object, [target].concat(src));
	  } else {
	    var first = src.shift();
	    for (var key in first) {
	      target[key] = first[key];
	    }
	    if (src.length) {
	      extend.apply(undefined, [target].concat(src));
	    }
	  }
	  return target;
	}
	
	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	function isObject(obj) {
	  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
	}
	
	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';
	function isPlainObject(obj) {
	  return toString.call(obj) === OBJECT_STRING;
	}
	
	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var isArray = exports.isArray = Array.isArray;
	
	// / other
	
	function stringify(x) {
	  return typeof x === 'undefined' || x === null || typeof x === 'function' ? '' : (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' ? x instanceof RegExp ? x.toString() : x instanceof Date ? JSON.parse(JSON.stringify(x)) : JSON.stringify(x) : x.toString();
	}
	
	function typof(v) {
	  var s = Object.prototype.toString.call(v);
	  return s.substring(8, s.length - 1).toLowerCase();
	}
	
	function normalize(v) {
	  var type = typof(v);
	
	  switch (type) {
	    case 'undefined':
	    case 'null':
	      return '';
	    case 'regexp':
	      return v.toString();
	    case 'date':
	      return v.toISOString();
	    case 'number':
	    case 'string':
	    case 'boolean':
	    case 'array':
	    case 'object':
	    case 'function':
	      return v;
	  }
	}
	
	var enableLog = typeof console !== 'undefined' && global.IS_PRODUCT !== true;
	
	/**
	 * @param {String} msg
	 */
	function error() {
	  var _console;
	
	  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
	  }
	
	  enableLog && console.error && (_console = console).error.apply(_console, ['[JS Framework]'].concat(args));
	}
	
	/**
	 * @param {String} msg
	 */
	function warn() {
	  var _console2;
	
	  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	    args[_key3] = arguments[_key3];
	  }
	
	  enableLog && console.warn && (_console2 = console).warn.apply(_console2, ['[JS Framework]'].concat(args));
	}
	
	/**
	 * @param {String} msg
	 */
	function info() {
	  var _console3;
	
	  for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	    args[_key4] = arguments[_key4];
	  }
	
	  enableLog && console.info && (_console3 = console).info.apply(_console3, ['[JS Framework]'].concat(args));
	}
	
	/**
	 * @param {String} msg
	 */
	function debug() {
	  var _console4;
	
	  for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	    args[_key5] = arguments[_key5];
	  }
	
	  enableLog && console.debug && (_console4 = console).debug.apply(_console4, ['[JS Framework]'].concat(args));
	}
	
	/**
	 * @param {String} msg
	 */
	function log() {
	  var _console5;
	
	  for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	    args[_key6] = arguments[_key6];
	  }
	
	  enableLog && console.log && (_console5 = console).log.apply(_console5, ['[JS Framework]'].concat(args));
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.require = exports.define = undefined;
	exports.clearCommonModules = clearCommonModules;
	exports.bootstrap = bootstrap;
	exports.register = register;
	exports.render = render;
	
	var _semver = __webpack_require__(51);
	
	var _semver2 = _interopRequireDefault(_semver);
	
	var _util = __webpack_require__(49);
	
	var _ = _interopRequireWildcard(_util);
	
	var _vm = __webpack_require__(53);
	
	var _vm2 = _interopRequireDefault(_vm);
	
	var _downgrade = __webpack_require__(64);
	
	var downgrade = _interopRequireWildcard(_downgrade);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
	                                                                                                                                                                                                                   * @fileOverview
	                                                                                                                                                                                                                   * api that invoked by js bundle code
	                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                   * - define(name, factory): define a new composed component type
	                                                                                                                                                                                                                   * - bootstrap(type, config, data): require a certain type &
	                                                                                                                                                                                                                   *         render with (optional) data
	                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                   * deprecated:
	                                                                                                                                                                                                                   * - register(type, options): register a new composed component type
	                                                                                                                                                                                                                   * - render(type, data): render by a certain type with (optional) data
	                                                                                                                                                                                                                   * - require(type)(data): require a type then render with data
	                                                                                                                                                                                                                   */
	
	var WEEX_COMPONENT_REG = /^@weex-component\//;
	var WEEX_MODULE_REG = /^@weex-module\//;
	var NORMAL_MODULE_REG = /^\.{1,2}\//;
	var JS_SURFIX_REG = /\.js$/;
	
	var isWeexComponent = function isWeexComponent(name) {
	  return !!name.match(WEEX_COMPONENT_REG);
	};
	var isWeexModule = function isWeexModule(name) {
	  return !!name.match(WEEX_MODULE_REG);
	};
	var isNormalModule = function isNormalModule(name) {
	  return !!name.match(NORMAL_MODULE_REG);
	};
	var isNpmModule = function isNpmModule(name) {
	  return !isWeexComponent(name) && !isWeexModule(name) && !isNormalModule(name);
	};
	
	function removeWeexPrefix(str) {
	  return str.replace(WEEX_COMPONENT_REG, '').replace(WEEX_MODULE_REG, '');
	}
	
	function removeJSSurfix(str) {
	  return str.replace(JS_SURFIX_REG, '');
	}
	
	var commonModules = {};
	
	function clearCommonModules() {
	  commonModules = {};
	}
	
	// define(name, factory) for primary usage
	// or
	// define(name, deps, factory) for compatibility
	// Notice: DO NOT use function define() {},
	// it will cause error after builded by webpack
	var define = exports.define = function define(name, deps, factory) {
	  var _this = this;
	
	  _.debug('define a component', name);
	
	  if (_.typof(deps) === 'function') {
	    factory = deps;
	    deps = [];
	  }
	
	  var _require = function _require(name) {
	    var cleanName = void 0;
	
	    if (isWeexComponent(name)) {
	      cleanName = removeWeexPrefix(name);
	      return _this.requireComponent(cleanName);
	    }
	    if (isWeexModule(name)) {
	      cleanName = removeWeexPrefix(name);
	      return _this.requireModule(cleanName);
	    }
	    if (isNormalModule(name)) {
	      cleanName = removeJSSurfix(name);
	      return commonModules[name];
	    }
	    if (isNpmModule(name)) {
	      cleanName = removeJSSurfix(name);
	      return commonModules[name];
	    }
	  };
	  var _module = { exports: {} };
	
	  var cleanName = void 0;
	  if (isWeexComponent(name)) {
	    cleanName = removeWeexPrefix(name);
	
	    factory(_require, _module.exports, _module);
	
	    this.registerComponent(cleanName, _module.exports);
	  } else if (isWeexModule(name)) {
	    cleanName = removeWeexPrefix(name);
	
	    factory(_require, _module.exports, _module);
	
	    _vm2.default.registerModules(_defineProperty({}, cleanName, _module.exports));
	  } else if (isNormalModule(name)) {
	    cleanName = removeJSSurfix(name);
	
	    factory(_require, _module.exports, _module);
	
	    commonModules[cleanName] = _module.exports;
	  } else if (isNpmModule(name)) {
	    cleanName = removeJSSurfix(name);
	
	    factory(_require, _module.exports, _module);
	
	    var exports = _module.exports;
	    if (exports.template || exports.style || exports.methods) {
	      // downgrade to old define method (define('componentName', factory))
	      // the exports contain one key of template, style or methods
	      // but it has risk!!!
	      this.registerComponent(cleanName, exports);
	    } else {
	      commonModules[cleanName] = _module.exports;
	    }
	  }
	};
	
	function bootstrap(name, config, data) {
	  _.debug('bootstrap for ' + name);
	
	  var cleanName = void 0;
	
	  if (isWeexComponent(name)) {
	    cleanName = removeWeexPrefix(name);
	  } else if (isNpmModule(name)) {
	    cleanName = removeJSSurfix(name);
	    // check if define by old 'define' method
	    /* istanbul ignore if */
	    if (!this.customComponentMap[cleanName]) {
	      return new Error('It\'s not a component: ' + name);
	    }
	  } else {
	    return new Error('Wrong component name: ' + name);
	  }
	
	  config = _.isPlainObject(config) ? config : {};
	
	  if (typeof config.transformerVersion === 'string' && typeof global.needTransformerVersion === 'string' && !_semver2.default.satisfies(config.transformerVersion, global.needTransformerVersion)) {
	    return new Error('JS Bundle version: ' + config.transformerVersion + ' ' + ('not compatible with ' + global.needTransformerVersion));
	  }
	
	  var _checkDowngrade = downgrade.check(config.downgrade);
	  /* istanbul ignore if */
	  if (_checkDowngrade.isDowngrade) {
	    this.callTasks([{
	      module: 'instanceWrap',
	      method: 'error',
	      args: [_checkDowngrade.errorType, _checkDowngrade.code, _checkDowngrade.errorMessage]
	    }]);
	    return new Error('Downgrade[' + _checkDowngrade.code + ']: ' + _checkDowngrade.errorMessage);
	  }
	
	  this.vm = new _vm2.default(cleanName, null, { _app: this }, null, data);
	}
	
	/**
	 * @deprecated
	 */
	function register(type, options) {
	  _.warn('Register is deprecated, please install lastest transformer.');
	  this.registerComponent(type, options);
	}
	
	/**
	 * @deprecated
	 */
	function render(type, data) {
	  _.warn('Render is deprecated, please install lastest transformer.');
	  return this.bootstrap(type, {}, data);
	}
	
	/**
	 * @deprecated
	 */
	function _require2(type) {
	  var _this2 = this;
	
	  _.warn('Require is deprecated, please install lastest transformer.');
	  return function (data) {
	    return _this2.bootstrap(type, {}, data);
	  };
	}
	exports.require = _require2;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports = module.exports = SemVer;
	
	// The debug function is excluded entirely from the minified version.
	/* nomin */var debug;
	/* nomin */if ((typeof process === 'undefined' ? 'undefined' : _typeof(process)) === 'object' &&
	/* nomin */process.env &&
	/* nomin */process.env.NODE_DEBUG &&
	/* nomin *//\bsemver\b/i.test(process.env.NODE_DEBUG))
	  /* nomin */debug = function debug() {
	    /* nomin */var args = Array.prototype.slice.call(arguments, 0);
	    /* nomin */args.unshift('SEMVER');
	    /* nomin */console.log.apply(console, args);
	    /* nomin */
	  };
	  /* nomin */else
	  /* nomin */debug = function debug() {};
	
	// Note: this is the semver.org version of the spec that it implements
	// Not necessarily the package version of this code.
	exports.SEMVER_SPEC_VERSION = '2.0.0';
	
	var MAX_LENGTH = 256;
	var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
	
	// The actual regexps go on exports.re
	var re = exports.re = [];
	var src = exports.src = [];
	var R = 0;
	
	// The following Regular Expressions can be used for tokenizing,
	// validating, and parsing SemVer version strings.
	
	// ## Numeric Identifier
	// A single `0`, or a non-zero digit followed by zero or more digits.
	
	var NUMERICIDENTIFIER = R++;
	src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
	var NUMERICIDENTIFIERLOOSE = R++;
	src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';
	
	// ## Non-numeric Identifier
	// Zero or more digits, followed by a letter or hyphen, and then zero or
	// more letters, digits, or hyphens.
	
	var NONNUMERICIDENTIFIER = R++;
	src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';
	
	// ## Main Version
	// Three dot-separated numeric identifiers.
	
	var MAINVERSION = R++;
	src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' + '(' + src[NUMERICIDENTIFIER] + ')\\.' + '(' + src[NUMERICIDENTIFIER] + ')';
	
	var MAINVERSIONLOOSE = R++;
	src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' + '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' + '(' + src[NUMERICIDENTIFIERLOOSE] + ')';
	
	// ## Pre-release Version Identifier
	// A numeric identifier, or a non-numeric identifier.
	
	var PRERELEASEIDENTIFIER = R++;
	src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] + '|' + src[NONNUMERICIDENTIFIER] + ')';
	
	var PRERELEASEIDENTIFIERLOOSE = R++;
	src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] + '|' + src[NONNUMERICIDENTIFIER] + ')';
	
	// ## Pre-release Version
	// Hyphen, followed by one or more dot-separated pre-release version
	// identifiers.
	
	var PRERELEASE = R++;
	src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] + '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';
	
	var PRERELEASELOOSE = R++;
	src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] + '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';
	
	// ## Build Metadata Identifier
	// Any combination of digits, letters, or hyphens.
	
	var BUILDIDENTIFIER = R++;
	src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';
	
	// ## Build Metadata
	// Plus sign, followed by one or more period-separated build metadata
	// identifiers.
	
	var BUILD = R++;
	src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] + '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';
	
	// ## Full Version String
	// A main version, followed optionally by a pre-release version and
	// build metadata.
	
	// Note that the only major, minor, patch, and pre-release sections of
	// the version string are capturing groups.  The build metadata is not a
	// capturing group, because it should not ever be used in version
	// comparison.
	
	var FULL = R++;
	var FULLPLAIN = 'v?' + src[MAINVERSION] + src[PRERELEASE] + '?' + src[BUILD] + '?';
	
	src[FULL] = '^' + FULLPLAIN + '$';
	
	// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
	// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
	// common in the npm registry.
	var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] + src[PRERELEASELOOSE] + '?' + src[BUILD] + '?';
	
	var LOOSE = R++;
	src[LOOSE] = '^' + LOOSEPLAIN + '$';
	
	var GTLT = R++;
	src[GTLT] = '((?:<|>)?=?)';
	
	// Something like "2.*" or "1.2.x".
	// Note that "x.x" is a valid xRange identifer, meaning "any version"
	// Only the first item is strictly required.
	var XRANGEIDENTIFIERLOOSE = R++;
	src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
	var XRANGEIDENTIFIER = R++;
	src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';
	
	var XRANGEPLAIN = R++;
	src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' + '(?:' + src[PRERELEASE] + ')?' + src[BUILD] + '?' + ')?)?';
	
	var XRANGEPLAINLOOSE = R++;
	src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:' + src[PRERELEASELOOSE] + ')?' + src[BUILD] + '?' + ')?)?';
	
	var XRANGE = R++;
	src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
	var XRANGELOOSE = R++;
	src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';
	
	// Tilde ranges.
	// Meaning is "reasonably at or greater than"
	var LONETILDE = R++;
	src[LONETILDE] = '(?:~>?)';
	
	var TILDETRIM = R++;
	src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
	re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
	var tildeTrimReplace = '$1~';
	
	var TILDE = R++;
	src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
	var TILDELOOSE = R++;
	src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';
	
	// Caret ranges.
	// Meaning is "at least and backwards compatible with"
	var LONECARET = R++;
	src[LONECARET] = '(?:\\^)';
	
	var CARETTRIM = R++;
	src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
	re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
	var caretTrimReplace = '$1^';
	
	var CARET = R++;
	src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
	var CARETLOOSE = R++;
	src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';
	
	// A simple gt/lt/eq thing, or just "" to indicate "any version"
	var COMPARATORLOOSE = R++;
	src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
	var COMPARATOR = R++;
	src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';
	
	// An expression to strip any whitespace between the gtlt and the thing
	// it modifies, so that `> 1.2.3` ==> `>1.2.3`
	var COMPARATORTRIM = R++;
	src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] + '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';
	
	// this one has to use the /g flag
	re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
	var comparatorTrimReplace = '$1$2$3';
	
	// Something like `1.2.3 - 1.2.4`
	// Note that these all use the loose form, because they'll be
	// checked against either the strict or loose comparator form
	// later.
	var HYPHENRANGE = R++;
	src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' + '\\s+-\\s+' + '(' + src[XRANGEPLAIN] + ')' + '\\s*$';
	
	var HYPHENRANGELOOSE = R++;
	src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' + '\\s+-\\s+' + '(' + src[XRANGEPLAINLOOSE] + ')' + '\\s*$';
	
	// Star ranges basically just allow anything at all.
	var STAR = R++;
	src[STAR] = '(<|>)?=?\\s*\\*';
	
	// Compile to actual regexp objects.
	// All are flag-free, unless they were created above with a flag.
	for (var i = 0; i < R; i++) {
	  debug(i, src[i]);
	  if (!re[i]) re[i] = new RegExp(src[i]);
	}
	
	exports.parse = parse;
	function parse(version, loose) {
	  if (version instanceof SemVer) return version;
	
	  if (typeof version !== 'string') return null;
	
	  if (version.length > MAX_LENGTH) return null;
	
	  var r = loose ? re[LOOSE] : re[FULL];
	  if (!r.test(version)) return null;
	
	  try {
	    return new SemVer(version, loose);
	  } catch (er) {
	    return null;
	  }
	}
	
	exports.valid = valid;
	function valid(version, loose) {
	  var v = parse(version, loose);
	  return v ? v.version : null;
	}
	
	exports.clean = clean;
	function clean(version, loose) {
	  var s = parse(version.trim().replace(/^[=v]+/, ''), loose);
	  return s ? s.version : null;
	}
	
	exports.SemVer = SemVer;
	
	function SemVer(version, loose) {
	  if (version instanceof SemVer) {
	    if (version.loose === loose) return version;else version = version.version;
	  } else if (typeof version !== 'string') {
	    throw new TypeError('Invalid Version: ' + version);
	  }
	
	  if (version.length > MAX_LENGTH) throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters');
	
	  if (!(this instanceof SemVer)) return new SemVer(version, loose);
	
	  debug('SemVer', version, loose);
	  this.loose = loose;
	  var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);
	
	  if (!m) throw new TypeError('Invalid Version: ' + version);
	
	  this.raw = version;
	
	  // these are actually numbers
	  this.major = +m[1];
	  this.minor = +m[2];
	  this.patch = +m[3];
	
	  if (this.major > MAX_SAFE_INTEGER || this.major < 0) throw new TypeError('Invalid major version');
	
	  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) throw new TypeError('Invalid minor version');
	
	  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) throw new TypeError('Invalid patch version');
	
	  // numberify any prerelease numeric ids
	  if (!m[4]) this.prerelease = [];else this.prerelease = m[4].split('.').map(function (id) {
	    if (/^[0-9]+$/.test(id)) {
	      var num = +id;
	      if (num >= 0 && num < MAX_SAFE_INTEGER) return num;
	    }
	    return id;
	  });
	
	  this.build = m[5] ? m[5].split('.') : [];
	  this.format();
	}
	
	SemVer.prototype.format = function () {
	  this.version = this.major + '.' + this.minor + '.' + this.patch;
	  if (this.prerelease.length) this.version += '-' + this.prerelease.join('.');
	  return this.version;
	};
	
	SemVer.prototype.toString = function () {
	  return this.version;
	};
	
	SemVer.prototype.compare = function (other) {
	  debug('SemVer.compare', this.version, this.loose, other);
	  if (!(other instanceof SemVer)) other = new SemVer(other, this.loose);
	
	  return this.compareMain(other) || this.comparePre(other);
	};
	
	SemVer.prototype.compareMain = function (other) {
	  if (!(other instanceof SemVer)) other = new SemVer(other, this.loose);
	
	  return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
	};
	
	SemVer.prototype.comparePre = function (other) {
	  if (!(other instanceof SemVer)) other = new SemVer(other, this.loose);
	
	  // NOT having a prerelease is > having one
	  if (this.prerelease.length && !other.prerelease.length) return -1;else if (!this.prerelease.length && other.prerelease.length) return 1;else if (!this.prerelease.length && !other.prerelease.length) return 0;
	
	  var i = 0;
	  do {
	    var a = this.prerelease[i];
	    var b = other.prerelease[i];
	    debug('prerelease compare', i, a, b);
	    if (a === undefined && b === undefined) return 0;else if (b === undefined) return 1;else if (a === undefined) return -1;else if (a === b) continue;else return compareIdentifiers(a, b);
	  } while (++i);
	};
	
	// preminor will bump the version up to the next minor release, and immediately
	// down to pre-release. premajor and prepatch work the same way.
	SemVer.prototype.inc = function (release, identifier) {
	  switch (release) {
	    case 'premajor':
	      this.prerelease.length = 0;
	      this.patch = 0;
	      this.minor = 0;
	      this.major++;
	      this.inc('pre', identifier);
	      break;
	    case 'preminor':
	      this.prerelease.length = 0;
	      this.patch = 0;
	      this.minor++;
	      this.inc('pre', identifier);
	      break;
	    case 'prepatch':
	      // If this is already a prerelease, it will bump to the next version
	      // drop any prereleases that might already exist, since they are not
	      // relevant at this point.
	      this.prerelease.length = 0;
	      this.inc('patch', identifier);
	      this.inc('pre', identifier);
	      break;
	    // If the input is a non-prerelease version, this acts the same as
	    // prepatch.
	    case 'prerelease':
	      if (this.prerelease.length === 0) this.inc('patch', identifier);
	      this.inc('pre', identifier);
	      break;
	
	    case 'major':
	      // If this is a pre-major version, bump up to the same major version.
	      // Otherwise increment major.
	      // 1.0.0-5 bumps to 1.0.0
	      // 1.1.0 bumps to 2.0.0
	      if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) this.major++;
	      this.minor = 0;
	      this.patch = 0;
	      this.prerelease = [];
	      break;
	    case 'minor':
	      // If this is a pre-minor version, bump up to the same minor version.
	      // Otherwise increment minor.
	      // 1.2.0-5 bumps to 1.2.0
	      // 1.2.1 bumps to 1.3.0
	      if (this.patch !== 0 || this.prerelease.length === 0) this.minor++;
	      this.patch = 0;
	      this.prerelease = [];
	      break;
	    case 'patch':
	      // If this is not a pre-release version, it will increment the patch.
	      // If it is a pre-release it will bump up to the same patch version.
	      // 1.2.0-5 patches to 1.2.0
	      // 1.2.0 patches to 1.2.1
	      if (this.prerelease.length === 0) this.patch++;
	      this.prerelease = [];
	      break;
	    // This probably shouldn't be used publicly.
	    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
	    case 'pre':
	      if (this.prerelease.length === 0) this.prerelease = [0];else {
	        var i = this.prerelease.length;
	        while (--i >= 0) {
	          if (typeof this.prerelease[i] === 'number') {
	            this.prerelease[i]++;
	            i = -2;
	          }
	        }
	        if (i === -1) // didn't increment anything
	          this.prerelease.push(0);
	      }
	      if (identifier) {
	        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
	        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
	        if (this.prerelease[0] === identifier) {
	          if (isNaN(this.prerelease[1])) this.prerelease = [identifier, 0];
	        } else this.prerelease = [identifier, 0];
	      }
	      break;
	
	    default:
	      throw new Error('invalid increment argument: ' + release);
	  }
	  this.format();
	  this.raw = this.version;
	  return this;
	};
	
	exports.inc = inc;
	function inc(version, release, loose, identifier) {
	  if (typeof loose === 'string') {
	    identifier = loose;
	    loose = undefined;
	  }
	
	  try {
	    return new SemVer(version, loose).inc(release, identifier).version;
	  } catch (er) {
	    return null;
	  }
	}
	
	exports.diff = diff;
	function diff(version1, version2) {
	  if (eq(version1, version2)) {
	    return null;
	  } else {
	    var v1 = parse(version1);
	    var v2 = parse(version2);
	    if (v1.prerelease.length || v2.prerelease.length) {
	      for (var key in v1) {
	        if (key === 'major' || key === 'minor' || key === 'patch') {
	          if (v1[key] !== v2[key]) {
	            return 'pre' + key;
	          }
	        }
	      }
	      return 'prerelease';
	    }
	    for (var key in v1) {
	      if (key === 'major' || key === 'minor' || key === 'patch') {
	        if (v1[key] !== v2[key]) {
	          return key;
	        }
	      }
	    }
	  }
	}
	
	exports.compareIdentifiers = compareIdentifiers;
	
	var numeric = /^[0-9]+$/;
	function compareIdentifiers(a, b) {
	  var anum = numeric.test(a);
	  var bnum = numeric.test(b);
	
	  if (anum && bnum) {
	    a = +a;
	    b = +b;
	  }
	
	  return anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : a > b ? 1 : 0;
	}
	
	exports.rcompareIdentifiers = rcompareIdentifiers;
	function rcompareIdentifiers(a, b) {
	  return compareIdentifiers(b, a);
	}
	
	exports.major = major;
	function major(a, loose) {
	  return new SemVer(a, loose).major;
	}
	
	exports.minor = minor;
	function minor(a, loose) {
	  return new SemVer(a, loose).minor;
	}
	
	exports.patch = patch;
	function patch(a, loose) {
	  return new SemVer(a, loose).patch;
	}
	
	exports.compare = compare;
	function compare(a, b, loose) {
	  return new SemVer(a, loose).compare(b);
	}
	
	exports.compareLoose = compareLoose;
	function compareLoose(a, b) {
	  return compare(a, b, true);
	}
	
	exports.rcompare = rcompare;
	function rcompare(a, b, loose) {
	  return compare(b, a, loose);
	}
	
	exports.sort = sort;
	function sort(list, loose) {
	  return list.sort(function (a, b) {
	    return exports.compare(a, b, loose);
	  });
	}
	
	exports.rsort = rsort;
	function rsort(list, loose) {
	  return list.sort(function (a, b) {
	    return exports.rcompare(a, b, loose);
	  });
	}
	
	exports.gt = gt;
	function gt(a, b, loose) {
	  return compare(a, b, loose) > 0;
	}
	
	exports.lt = lt;
	function lt(a, b, loose) {
	  return compare(a, b, loose) < 0;
	}
	
	exports.eq = eq;
	function eq(a, b, loose) {
	  return compare(a, b, loose) === 0;
	}
	
	exports.neq = neq;
	function neq(a, b, loose) {
	  return compare(a, b, loose) !== 0;
	}
	
	exports.gte = gte;
	function gte(a, b, loose) {
	  return compare(a, b, loose) >= 0;
	}
	
	exports.lte = lte;
	function lte(a, b, loose) {
	  return compare(a, b, loose) <= 0;
	}
	
	exports.cmp = cmp;
	function cmp(a, op, b, loose) {
	  var ret;
	  switch (op) {
	    case '===':
	      if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') a = a.version;
	      if ((typeof b === 'undefined' ? 'undefined' : _typeof(b)) === 'object') b = b.version;
	      ret = a === b;
	      break;
	    case '!==':
	      if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') a = a.version;
	      if ((typeof b === 'undefined' ? 'undefined' : _typeof(b)) === 'object') b = b.version;
	      ret = a !== b;
	      break;
	    case '':case '=':case '==':
	      ret = eq(a, b, loose);break;
	    case '!=':
	      ret = neq(a, b, loose);break;
	    case '>':
	      ret = gt(a, b, loose);break;
	    case '>=':
	      ret = gte(a, b, loose);break;
	    case '<':
	      ret = lt(a, b, loose);break;
	    case '<=':
	      ret = lte(a, b, loose);break;
	    default:
	      throw new TypeError('Invalid operator: ' + op);
	  }
	  return ret;
	}
	
	exports.Comparator = Comparator;
	function Comparator(comp, loose) {
	  if (comp instanceof Comparator) {
	    if (comp.loose === loose) return comp;else comp = comp.value;
	  }
	
	  if (!(this instanceof Comparator)) return new Comparator(comp, loose);
	
	  debug('comparator', comp, loose);
	  this.loose = loose;
	  this.parse(comp);
	
	  if (this.semver === ANY) this.value = '';else this.value = this.operator + this.semver.version;
	
	  debug('comp', this);
	}
	
	var ANY = {};
	Comparator.prototype.parse = function (comp) {
	  var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
	  var m = comp.match(r);
	
	  if (!m) throw new TypeError('Invalid comparator: ' + comp);
	
	  this.operator = m[1];
	  if (this.operator === '=') this.operator = '';
	
	  // if it literally is just '>' or '' then allow anything.
	  if (!m[2]) this.semver = ANY;else this.semver = new SemVer(m[2], this.loose);
	};
	
	Comparator.prototype.toString = function () {
	  return this.value;
	};
	
	Comparator.prototype.test = function (version) {
	  debug('Comparator.test', version, this.loose);
	
	  if (this.semver === ANY) return true;
	
	  if (typeof version === 'string') version = new SemVer(version, this.loose);
	
	  return cmp(version, this.operator, this.semver, this.loose);
	};
	
	exports.Range = Range;
	function Range(range, loose) {
	  if (range instanceof Range && range.loose === loose) return range;
	
	  if (!(this instanceof Range)) return new Range(range, loose);
	
	  this.loose = loose;
	
	  // First, split based on boolean or ||
	  this.raw = range;
	  this.set = range.split(/\s*\|\|\s*/).map(function (range) {
	    return this.parseRange(range.trim());
	  }, this).filter(function (c) {
	    // throw out any that are not relevant for whatever reason
	    return c.length;
	  });
	
	  if (!this.set.length) {
	    throw new TypeError('Invalid SemVer Range: ' + range);
	  }
	
	  this.format();
	}
	
	Range.prototype.format = function () {
	  this.range = this.set.map(function (comps) {
	    return comps.join(' ').trim();
	  }).join('||').trim();
	  return this.range;
	};
	
	Range.prototype.toString = function () {
	  return this.range;
	};
	
	Range.prototype.parseRange = function (range) {
	  var loose = this.loose;
	  range = range.trim();
	  debug('range', range, loose);
	  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
	  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
	  range = range.replace(hr, hyphenReplace);
	  debug('hyphen replace', range);
	  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
	  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
	  debug('comparator trim', range, re[COMPARATORTRIM]);
	
	  // `~ 1.2.3` => `~1.2.3`
	  range = range.replace(re[TILDETRIM], tildeTrimReplace);
	
	  // `^ 1.2.3` => `^1.2.3`
	  range = range.replace(re[CARETTRIM], caretTrimReplace);
	
	  // normalize spaces
	  range = range.split(/\s+/).join(' ');
	
	  // At this point, the range is completely trimmed and
	  // ready to be split into comparators.
	
	  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
	  var set = range.split(' ').map(function (comp) {
	    return parseComparator(comp, loose);
	  }).join(' ').split(/\s+/);
	  if (this.loose) {
	    // in loose mode, throw out any that are not valid comparators
	    set = set.filter(function (comp) {
	      return !!comp.match(compRe);
	    });
	  }
	  set = set.map(function (comp) {
	    return new Comparator(comp, loose);
	  });
	
	  return set;
	};
	
	// Mostly just for testing and legacy API reasons
	exports.toComparators = toComparators;
	function toComparators(range, loose) {
	  return new Range(range, loose).set.map(function (comp) {
	    return comp.map(function (c) {
	      return c.value;
	    }).join(' ').trim().split(' ');
	  });
	}
	
	// comprised of xranges, tildes, stars, and gtlt's at this point.
	// already replaced the hyphen ranges
	// turn into a set of JUST comparators.
	function parseComparator(comp, loose) {
	  debug('comp', comp);
	  comp = replaceCarets(comp, loose);
	  debug('caret', comp);
	  comp = replaceTildes(comp, loose);
	  debug('tildes', comp);
	  comp = replaceXRanges(comp, loose);
	  debug('xrange', comp);
	  comp = replaceStars(comp, loose);
	  debug('stars', comp);
	  return comp;
	}
	
	function isX(id) {
	  return !id || id.toLowerCase() === 'x' || id === '*';
	}
	
	// ~, ~> --> * (any, kinda silly)
	// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
	// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
	// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
	// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
	// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
	function replaceTildes(comp, loose) {
	  return comp.trim().split(/\s+/).map(function (comp) {
	    return replaceTilde(comp, loose);
	  }).join(' ');
	}
	
	function replaceTilde(comp, loose) {
	  var r = loose ? re[TILDELOOSE] : re[TILDE];
	  return comp.replace(r, function (_, M, m, p, pr) {
	    debug('tilde', comp, _, M, m, p, pr);
	    var ret;
	
	    if (isX(M)) ret = '';else if (isX(m)) ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';else if (isX(p))
	      // ~1.2 == >=1.2.0- <1.3.0-
	      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';else if (pr) {
	      debug('replaceTilde pr', pr);
	      if (pr.charAt(0) !== '-') pr = '-' + pr;
	      ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + M + '.' + (+m + 1) + '.0';
	    } else
	      // ~1.2.3 == >=1.2.3 <1.3.0
	      ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + (+m + 1) + '.0';
	
	    debug('tilde return', ret);
	    return ret;
	  });
	}
	
	// ^ --> * (any, kinda silly)
	// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
	// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
	// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
	// ^1.2.3 --> >=1.2.3 <2.0.0
	// ^1.2.0 --> >=1.2.0 <2.0.0
	function replaceCarets(comp, loose) {
	  return comp.trim().split(/\s+/).map(function (comp) {
	    return replaceCaret(comp, loose);
	  }).join(' ');
	}
	
	function replaceCaret(comp, loose) {
	  debug('caret', comp, loose);
	  var r = loose ? re[CARETLOOSE] : re[CARET];
	  return comp.replace(r, function (_, M, m, p, pr) {
	    debug('caret', comp, _, M, m, p, pr);
	    var ret;
	
	    if (isX(M)) ret = '';else if (isX(m)) ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';else if (isX(p)) {
	      if (M === '0') ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';else ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
	    } else if (pr) {
	      debug('replaceCaret pr', pr);
	      if (pr.charAt(0) !== '-') pr = '-' + pr;
	      if (M === '0') {
	        if (m === '0') ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + M + '.' + m + '.' + (+p + 1);else ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + M + '.' + (+m + 1) + '.0';
	      } else ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + (+M + 1) + '.0.0';
	    } else {
	      debug('no pr');
	      if (M === '0') {
	        if (m === '0') ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + m + '.' + (+p + 1);else ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + (+m + 1) + '.0';
	      } else ret = '>=' + M + '.' + m + '.' + p + ' <' + (+M + 1) + '.0.0';
	    }
	
	    debug('caret return', ret);
	    return ret;
	  });
	}
	
	function replaceXRanges(comp, loose) {
	  debug('replaceXRanges', comp, loose);
	  return comp.split(/\s+/).map(function (comp) {
	    return replaceXRange(comp, loose);
	  }).join(' ');
	}
	
	function replaceXRange(comp, loose) {
	  comp = comp.trim();
	  var r = loose ? re[XRANGELOOSE] : re[XRANGE];
	  return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
	    debug('xRange', comp, ret, gtlt, M, m, p, pr);
	    var xM = isX(M);
	    var xm = xM || isX(m);
	    var xp = xm || isX(p);
	    var anyX = xp;
	
	    if (gtlt === '=' && anyX) gtlt = '';
	
	    if (xM) {
	      if (gtlt === '>' || gtlt === '<') {
	        // nothing is allowed
	        ret = '<0.0.0';
	      } else {
	        // nothing is forbidden
	        ret = '*';
	      }
	    } else if (gtlt && anyX) {
	      // replace X with 0
	      if (xm) m = 0;
	      if (xp) p = 0;
	
	      if (gtlt === '>') {
	        // >1 => >=2.0.0
	        // >1.2 => >=1.3.0
	        // >1.2.3 => >= 1.2.4
	        gtlt = '>=';
	        if (xm) {
	          M = +M + 1;
	          m = 0;
	          p = 0;
	        } else if (xp) {
	          m = +m + 1;
	          p = 0;
	        }
	      } else if (gtlt === '<=') {
	        // <=0.7.x is actually <0.8.0, since any 0.7.x should
	        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
	        gtlt = '<';
	        if (xm) M = +M + 1;else m = +m + 1;
	      }
	
	      ret = gtlt + M + '.' + m + '.' + p;
	    } else if (xm) {
	      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
	    } else if (xp) {
	      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
	    }
	
	    debug('xRange return', ret);
	
	    return ret;
	  });
	}
	
	// Because * is AND-ed with everything else in the comparator,
	// and '' means "any version", just remove the *s entirely.
	function replaceStars(comp, loose) {
	  debug('replaceStars', comp, loose);
	  // Looseness is ignored here.  star is always as loose as it gets!
	  return comp.trim().replace(re[STAR], '');
	}
	
	// This function is passed to string.replace(re[HYPHENRANGE])
	// M, m, patch, prerelease, build
	// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
	// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
	// 1.2 - 3.4 => >=1.2.0 <3.5.0
	function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
	
	  if (isX(fM)) from = '';else if (isX(fm)) from = '>=' + fM + '.0.0';else if (isX(fp)) from = '>=' + fM + '.' + fm + '.0';else from = '>=' + from;
	
	  if (isX(tM)) to = '';else if (isX(tm)) to = '<' + (+tM + 1) + '.0.0';else if (isX(tp)) to = '<' + tM + '.' + (+tm + 1) + '.0';else if (tpr) to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;else to = '<=' + to;
	
	  return (from + ' ' + to).trim();
	}
	
	// if ANY of the sets match ALL of its comparators, then pass
	Range.prototype.test = function (version) {
	  if (!version) return false;
	
	  if (typeof version === 'string') version = new SemVer(version, this.loose);
	
	  for (var i = 0; i < this.set.length; i++) {
	    if (testSet(this.set[i], version)) return true;
	  }
	  return false;
	};
	
	function testSet(set, version) {
	  for (var i = 0; i < set.length; i++) {
	    if (!set[i].test(version)) return false;
	  }
	
	  if (version.prerelease.length) {
	    // Find the set of versions that are allowed to have prereleases
	    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
	    // That should allow `1.2.3-pr.2` to pass.
	    // However, `1.2.4-alpha.notready` should NOT be allowed,
	    // even though it's within the range set by the comparators.
	    for (var i = 0; i < set.length; i++) {
	      debug(set[i].semver);
	      if (set[i].semver === ANY) continue;
	
	      if (set[i].semver.prerelease.length > 0) {
	        var allowed = set[i].semver;
	        if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) return true;
	      }
	    }
	
	    // Version has a -pre, but it's not one of the ones we like.
	    return false;
	  }
	
	  return true;
	}
	
	exports.satisfies = satisfies;
	function satisfies(version, range, loose) {
	  try {
	    range = new Range(range, loose);
	  } catch (er) {
	    return false;
	  }
	  return range.test(version);
	}
	
	exports.maxSatisfying = maxSatisfying;
	function maxSatisfying(versions, range, loose) {
	  return versions.filter(function (version) {
	    return satisfies(version, range, loose);
	  }).sort(function (a, b) {
	    return rcompare(a, b, loose);
	  })[0] || null;
	}
	
	exports.validRange = validRange;
	function validRange(range, loose) {
	  try {
	    // Return '*' instead of '' so that truthiness works.
	    // This will throw if it's invalid anyway
	    return new Range(range, loose).range || '*';
	  } catch (er) {
	    return null;
	  }
	}
	
	// Determine if version is less than all the versions possible in the range
	exports.ltr = ltr;
	function ltr(version, range, loose) {
	  return outside(version, range, '<', loose);
	}
	
	// Determine if version is greater than all the versions possible in the range.
	exports.gtr = gtr;
	function gtr(version, range, loose) {
	  return outside(version, range, '>', loose);
	}
	
	exports.outside = outside;
	function outside(version, range, hilo, loose) {
	  version = new SemVer(version, loose);
	  range = new Range(range, loose);
	
	  var gtfn, ltefn, ltfn, comp, ecomp;
	  switch (hilo) {
	    case '>':
	      gtfn = gt;
	      ltefn = lte;
	      ltfn = lt;
	      comp = '>';
	      ecomp = '>=';
	      break;
	    case '<':
	      gtfn = lt;
	      ltefn = gte;
	      ltfn = gt;
	      comp = '<';
	      ecomp = '<=';
	      break;
	    default:
	      throw new TypeError('Must provide a hilo val of "<" or ">"');
	  }
	
	  // If it satisifes the range it is not outside
	  if (satisfies(version, range, loose)) {
	    return false;
	  }
	
	  // From now on, variable terms are as if we're in "gtr" mode.
	  // but note that everything is flipped for the "ltr" function.
	
	  for (var i = 0; i < range.set.length; ++i) {
	    var comparators = range.set[i];
	
	    var high = null;
	    var low = null;
	
	    comparators.forEach(function (comparator) {
	      if (comparator.semver === ANY) {
	        comparator = new Comparator('>=0.0.0');
	      }
	      high = high || comparator;
	      low = low || comparator;
	      if (gtfn(comparator.semver, high.semver, loose)) {
	        high = comparator;
	      } else if (ltfn(comparator.semver, low.semver, loose)) {
	        low = comparator;
	      }
	    });
	
	    // If the edge version comparator has a operator then our version
	    // isn't outside it
	    if (high.operator === comp || high.operator === ecomp) {
	      return false;
	    }
	
	    // If the lowest version comparator has an operator and our version
	    // is less than it then it isn't higher than the range
	    if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
	      return false;
	    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
	      return false;
	    }
	  }
	  return true;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';
	
	// shim for using process in browser
	
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	    try {
	        cachedSetTimeout = setTimeout;
	    } catch (e) {
	        cachedSetTimeout = function cachedSetTimeout() {
	            throw new Error('setTimeout is not defined');
	        };
	    }
	    try {
	        cachedClearTimeout = clearTimeout;
	    } catch (e) {
	        cachedClearTimeout = function cachedClearTimeout() {
	            throw new Error('clearTimeout is not defined');
	        };
	    }
	})();
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Vm;
	
	var _util = __webpack_require__(49);
	
	var _ = _interopRequireWildcard(_util);
	
	var _state = __webpack_require__(54);
	
	var state = _interopRequireWildcard(_state);
	
	var _compiler = __webpack_require__(59);
	
	var compiler = _interopRequireWildcard(_compiler);
	
	var _directive = __webpack_require__(60);
	
	var directive = _interopRequireWildcard(_directive);
	
	var _domHelper = __webpack_require__(61);
	
	var domHelper = _interopRequireWildcard(_domHelper);
	
	var _events = __webpack_require__(62);
	
	var events = _interopRequireWildcard(_events);
	
	var _register = __webpack_require__(63);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function callOldReadyEntry(vm, component) {
	  if (component.methods && component.methods.ready) {
	    _.warn('"exports.methods.ready" is deprecated, ' + 'please use "exports.created" instead');
	    component.methods.ready.call(vm);
	  }
	}
	
	/**
	 * ViewModel constructor
	 *
	 * @param {string} type
	 * @param {object} options    component options
	 * @param {object} parentVm   which contains _app
	 * @param {object} parentEl   root element or frag block
	 * @param {object} mergedData external data
	 * @param {object} externalEvents external events
	 */
	/**
	 * @fileOverview
	 * ViewModel Constructor & definition
	 */
	
	function Vm(type, options, parentVm, parentEl, mergedData, externalEvents) {
	  this._parent = parentVm._realParent ? parentVm._realParent : parentVm;
	  this._app = parentVm._app;
	  parentVm._childrenVms && parentVm._childrenVms.push(this);
	
	  if (!options) {
	    options = this._app.customComponentMap[type] || {};
	  }
	  var data = options.data || {};
	
	  this._options = options;
	  this._methods = options.methods || {};
	  this._computed = options.computed || {};
	  this._css = options.style || {};
	  this._ids = {};
	  this._vmEvents = {};
	  this._childrenVms = [];
	  this._type = type;
	
	  // bind events and lifecycles
	  this._initEvents(externalEvents);
	
	  _.debug('"init" lifecycle in Vm(' + this._type + ')');
	  this.$emit('hook:init');
	  this._inited = true;
	  // proxy data and methods
	  // observe data and add this to vms
	  this._data = typeof data === 'function' ? data() : data;
	  if (mergedData) {
	    _.extend(this._data, mergedData);
	  }
	  this._initState();
	
	  _.debug('"created" lifecycle in Vm(' + this._type + ')');
	  this.$emit('hook:created');
	  this._created = true;
	  // backward old ready entry
	  callOldReadyEntry(this, options);
	
	  // if no parentElement then specify the documentElement
	  this._parentEl = parentEl || this._app.doc.documentElement;
	  this._build();
	}
	
	_.extend(Vm.prototype, state, compiler, directive, domHelper, events);
	_.extend(Vm, {
	  registerModules: _register.registerModules,
	  registerMethods: _register.registerMethods
	});

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._initState = _initState;
	exports._initData = _initData;
	exports._initComputed = _initComputed;
	exports._initMethods = _initMethods;
	
	var _watcher = __webpack_require__(55);
	
	var _watcher2 = _interopRequireDefault(_watcher);
	
	var _dep = __webpack_require__(56);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	var _observer = __webpack_require__(57);
	
	var _util = __webpack_require__(49);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint-disable */
	
	function _initState() {
	  var vm = this;
	  vm._watchers = [];
	  vm._initData();
	  vm._initComputed();
	  vm._initMethods();
	}
	
	function _initData() {
	  var vm = this;
	  var data = vm._data;
	
	  if (!(0, _util.isPlainObject)(data)) {
	    data = {};
	  }
	  // proxy data on instance
	  var keys = Object.keys(data);
	  var i = keys.length;
	  while (i--) {
	    (0, _observer.proxy)(vm, keys[i]);
	  }
	  // observe data
	  (0, _observer.observe)(data, vm);
	}
	
	function noop() {}
	
	function _initComputed() {
	  var vm = this;
	  var computed = vm._computed;
	  if (computed) {
	    for (var key in computed) {
	      var userDef = computed[key];
	      var def = {
	        enumerable: true,
	        configurable: true
	      };
	      if (typeof userDef === 'function') {
	        def.get = makeComputedGetter(userDef, vm);
	        def.set = noop;
	      } else {
	        def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, vm) : (0, _util.bind)(userDef.get, vm) : noop;
	        def.set = userDef.set ? (0, _util.bind)(userDef.set, vm) : noop;
	      }
	      Object.defineProperty(vm, key, def);
	    }
	  }
	}
	
	function makeComputedGetter(getter, owner) {
	  var watcher = new _watcher2.default(owner, getter, null, {
	    lazy: true
	  });
	  return function computedGetter() {
	    if (watcher.dirty) {
	      watcher.evaluate();
	    }
	    if (_dep2.default.target) {
	      watcher.depend();
	    }
	    return watcher.value;
	  };
	}
	
	function _initMethods() {
	  var vm = this;
	  var methods = vm._methods;
	  if (methods) {
	    for (var key in methods) {
	      vm[key] = (0, _util.bind)(methods[key], vm);
	    }
	  }
	}

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Watcher;
	
	var _dep = __webpack_require__(56);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	var _util = __webpack_require__(49);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint-disable */
	
	var uid = 0;
	// import { pushWatcher } from './batcher'
	
	var prevTarget = void 0;
	
	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String|Function} expOrFn
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	
	function Watcher(vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    (0, _util.extend)(this, options);
	  }
	  var isFn = typeof expOrFn === 'function';
	  this.vm = vm;
	  vm._watchers.push(this);
	  this.expression = expOrFn;
	  this.cb = cb;
	  this.id = ++uid; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _util._Set();
	  this.newDepIds = new _util._Set();
	  // parse expression for getter
	  if (isFn) {
	    this.getter = expOrFn;
	  } else {
	    this.getter = (0, _util.parsePath)(expOrFn);
	    if (!this.getter) {
	      this.getter = function () {};
	      process.env.NODE_ENV !== 'production' && (0, _util.warn)('Failed watching path: ' + expOrFn + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
	    }
	  }
	  this.value = this.lazy ? undefined : this.get();
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false;
	}
	
	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	
	Watcher.prototype.get = function () {
	  this.beforeGet();
	  var value = this.getter.call(this.vm, this.vm);
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  this.afterGet();
	  return value;
	};
	
	/**
	 * Prepare for dependency collection.
	 */
	
	Watcher.prototype.beforeGet = function () {
	  prevTarget = _dep2.default.target;
	  _dep2.default.target = this;
	};
	
	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */
	
	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};
	
	/**
	 * Clean up for dependency collection.
	 */
	
	Watcher.prototype.afterGet = function () {
	  _dep2.default.target = prevTarget;
	  var i = this.deps.length;
	  while (i--) {
	    var dep = this.deps[i];
	    if (!this.newDepIds.has(dep.id)) {
	      dep.removeSub(this);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};
	
	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */
	
	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true;
	  } else {
	    this.run();
	  }
	  // } else if (this.sync) {
	  //   this.run()
	  // } else {
	  //   // if queued, only overwrite shallow with non-shallow,
	  //   // but not the other way around.
	  //   this.shallow = this.queued
	  //     ? shallow
	  //       ? this.shallow
	  //       : false
	  //     : !!shallow
	  //   this.queued = true
	  //   pushWatcher(this)
	  // }
	};
	
	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */
	
	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value ||
	    // Deep watchers and watchers on Object/Arrays should fire even
	    // when the value is the same, because the value may
	    // have mutated; but only do so if this is a
	    // non-shallow update (caused by a vm digest).
	    ((0, _util.isObject)(value) || this.deep) && !this.shallow) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      this.cb.call(this.vm, value, oldValue);
	    }
	    this.queued = this.shallow = false;
	  }
	};
	
	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	
	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = _dep2.default.target;
	  this.value = this.get();
	  this.dirty = false;
	  _dep2.default.target = current;
	};
	
	/**
	 * Depend on all deps collected by this watcher.
	 */
	
	Watcher.prototype.depend = function () {
	  var i = this.deps.length;
	  while (i--) {
	    this.deps[i].depend();
	  }
	};
	
	/**
	 * Remove self from all dependencies' subcriber list.
	 */
	
	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      (0, _util.remove)(this.vm._watchers, this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this.deps[i].removeSub(this);
	    }
	    this.active = false;
	    this.vm = this.cb = this.value = null;
	  }
	};
	
	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 * @param {Set} seen
	 */
	
	var seenObjects = new _util._Set();
	function traverse(val, seen) {
	  var i = void 0,
	      keys = void 0,
	      isA = void 0,
	      isO = void 0;
	  if (!seen) {
	    seen = seenObjects;
	    seen.clear();
	  }
	  isA = (0, _util.isArray)(val);
	  isO = (0, _util.isObject)(val);
	  if (isA || isO) {
	    if (val.__ob__) {
	      var depId = val.__ob__.dep.id;
	      if (seen.has(depId)) {
	        return;
	      } else {
	        seen.add(depId);
	      }
	    }
	    if (isA) {
	      i = val.length;
	      while (i--) {
	        traverse(val[i], seen);
	      }
	    } else if (isO) {
	      keys = Object.keys(val);
	      i = keys.length;
	      while (i--) {
	        traverse(val[keys[i]], seen);
	      }
	    }
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)))

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Dep;
	
	var _util = __webpack_require__(49);
	
	var uid = 0;
	
	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	
	/* eslint-disable */
	
	function Dep() {
	  this.id = uid++;
	  this.subs = [];
	}
	
	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	
	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub);
	};
	
	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.removeSub = function (sub) {
	  (0, _util.remove)(this.subs, sub);
	};
	
	/**
	 * Add self as a dependency to the target watcher.
	 */
	
	Dep.prototype.depend = function () {
	  Dep.target.addDep(this);
	};
	
	/**
	 * Notify all subscribers of a new value.
	 */
	
	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = this.subs.slice();
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Observer = Observer;
	exports.observe = observe;
	exports.defineReactive = defineReactive;
	exports.set = set;
	exports.del = del;
	exports.proxy = proxy;
	exports.unproxy = unproxy;
	
	var _dep = __webpack_require__(56);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	var _array = __webpack_require__(58);
	
	var _util = __webpack_require__(49);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var arrayKeys = Object.getOwnPropertyNames(_array.arrayMethods);
	
	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */
	
	/* eslint-disable */
	
	function Observer(value) {
	  this.value = value;
	  this.dep = new _dep2.default();
	  (0, _util.def)(value, '__ob__', this);
	  if ((0, _util.isArray)(value)) {
	    var augment = _util.hasProto ? protoAugment : copyAugment;
	    augment(value, _array.arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	}
	
	// Instance methods
	
	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */
	
	Observer.prototype.walk = function (obj) {
	  for (var key in obj) {
	    this.convert(key, obj[key]);
	  }
	};
	
	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */
	
	Observer.prototype.observeArray = function (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};
	
	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */
	
	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val);
	};
	
	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */
	
	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm);
	};
	
	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */
	
	Observer.prototype.removeVm = function (vm) {
	  (0, _util.remove)(this.vms, vm);
	};
	
	// helpers
	
	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} src
	 */
	
	function protoAugment(target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}
	
	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */
	
	function copyAugment(target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    (0, _util.def)(target, key, src[key]);
	  }
	}
	
	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */
	
	function observe(value, vm) {
	  if (!(0, _util.isObject)(value)) {
	    return;
	  }
	  var ob = void 0;
	  if ((0, _util.hasOwn)(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (((0, _util.isArray)(value) || (0, _util.isPlainObject)(value)) && Object.isExtensible(value) && !value._isVue) {
	    ob = new Observer(value);
	  }
	  if (ob && vm) {
	    ob.addVm(vm);
	  }
	  return ob;
	}
	
	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */
	
	function defineReactive(obj, key, val) {
	  var dep = new _dep2.default();
	
	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return;
	  }
	
	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;
	
	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;
	      if (_dep2.default.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if ((0, _util.isArray)(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i];
	            e && e.__ob__ && e.__ob__.dep.depend();
	          }
	        }
	      }
	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return;
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}
	
	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @public
	 */
	
	function set(obj, key, val) {
	  if ((0, _util.isArray)(obj)) {
	    return obj.splice(key, 1, val);
	  }
	  if ((0, _util.hasOwn)(obj, key)) {
	    obj[key] = val;
	    return;
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val);
	    return;
	  }
	  var ob = obj.__ob__;
	  if (!ob) {
	    obj[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      proxy(vm, key);
	      vm.$forceUpdate();
	    }
	  }
	  return val;
	}
	
	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */
	
	function del(obj, key) {
	  if (!(0, _util.hasOwn)(obj, key)) {
	    return;
	  }
	  delete obj[key];
	  var ob = obj.__ob__;
	
	  if (!ob) {
	    if (obj._isVue) {
	      delete obj._data[key];
	      obj.$forceUpdate();
	    }
	    return;
	  }
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      unproxy(vm, key);
	      vm.$forceUpdate();
	    }
	  }
	}
	
	var KEY_WORDS = ['$index', '$value', '$event'];
	function proxy(vm, key) {
	  if (KEY_WORDS.indexOf(key) > -1 || !(0, _util.isReserved)(key)) {
	    Object.defineProperty(vm, key, {
	      configurable: true,
	      enumerable: true,
	      get: function proxyGetter() {
	        return vm._data[key];
	      },
	      set: function proxySetter(val) {
	        vm._data[key] = val;
	      }
	    });
	  }
	}
	
	function unproxy(vm, key) {
	  if (!(0, _util.isReserved)(key)) {
	    delete vm[key];
	  }
	}

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.arrayMethods = undefined;
	
	var _util = __webpack_require__(49);
	
	var arrayProto = Array.prototype; /* eslint-disable */
	
	var arrayMethods = exports.arrayMethods = Object.create(arrayProto)
	
	/**
	 * Intercept mutating methods and emit events
	 */
	
	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  (0, _util.def)(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted = void 0;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break;
	      case 'unshift':
	        inserted = args;
	        break;
	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }
	    if (inserted) ob.observeArray(inserted);
	    // notify change
	    ob.dep.notify();
	    return result;
	  });
	});
	
	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */
	
	(0, _util.def)(arrayProto, '$set', function $set(index, val) {
	  if (index >= this.length) {
	    this.length = index + 1;
	  }
	  return this.splice(index, 1, val)[0];
	});
	
	/**
	 * Convenience method to remove the element at given index.
	 *
	 * @param {Number} index
	 * @param {*} val
	 */
	
	(0, _util.def)(arrayProto, '$remove', function $remove(index) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  if (typeof index !== 'number') {
	    index = this.indexOf(index);
	  }
	  if (index > -1) {
	    this.splice(index, 1);
	  }
	});

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * @fileOverview
	                                                                                                                                                                                                                                                   * ViewModel template parser & data-binding process
	                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                   * required:
	                                                                                                                                                                                                                                                   * index.js: Vm
	                                                                                                                                                                                                                                                   * dom-helper.js: _createElement, _createBlock
	                                                                                                                                                                                                                                                   * dom-helper.js: _attachTarget, _moveTarget, _removeTarget
	                                                                                                                                                                                                                                                   * directive.js: _bindElement, _bindSubVm, _watch
	                                                                                                                                                                                                                                                   * events.js: $on
	                                                                                                                                                                                                                                                   */
	
	exports._build = _build;
	exports._compile = _compile;
	exports._targetIsFragment = _targetIsFragment;
	exports._targetIsContent = _targetIsContent;
	exports._targetNeedCheckRepeat = _targetNeedCheckRepeat;
	exports._targetNeedCheckShown = _targetNeedCheckShown;
	exports._targetNeedCheckType = _targetNeedCheckType;
	exports._targetIsComposed = _targetIsComposed;
	exports._compileFragment = _compileFragment;
	exports._compileRepeat = _compileRepeat;
	exports._compileShown = _compileShown;
	exports._compileType = _compileType;
	exports._compileCustomComponent = _compileCustomComponent;
	exports._compileNativeComponent = _compileNativeComponent;
	exports._compileChildren = _compileChildren;
	exports._bindRepeat = _bindRepeat;
	exports._bindShown = _bindShown;
	exports._watchBlock = _watchBlock;
	exports._mergeContext = _mergeContext;
	
	var _util = __webpack_require__(49);
	
	var _ = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 * build(externalDirs)
	 *   createVm()
	 *   merge(externalDirs, dirs)
	 *   compile(template, parentNode)
	 *     if (type is content) create contentNode
	 *     else if (dirs have v-for) foreach -> create context
	 *       -> compile(templateWithoutFor, parentNode): diff(list) onchange
	 *     else if (dirs have v-if) assert
	 *       -> compile(templateWithoutIf, parentNode): toggle(shown) onchange
	 *     else if (type is native)
	 *       set(dirs): update(id/attr/style/class) onchange
	 *       append(template, parentNode)
	 *       foreach childNodes -> compile(childNode, template)
	 *     else if (type is custom)
	 *       addChildVm(vm, parentVm)
	 *       build(externalDirs)
	 *       foreach childNodes -> compile(childNode, template)
	 */
	function _build() {
	  var opt = this._options || {};
	  var template = opt.template || {};
	
	  if (opt.replace) {
	    if (template.children && template.children.length === 1) {
	      this._compile(template.children[0], this._parentEl);
	    } else {
	      this._compile(template.children, this._parentEl);
	    }
	  } else {
	    this._compile(template, this._parentEl);
	  }
	
	  _.debug('"ready" lifecycle in Vm(' + this._type + ')');
	  this.$emit('hook:ready');
	  this._ready = true;
	}
	
	/**
	 * Generate elements by child or children and append to parent elements.
	 * Root element info would be merged if has. The first argument may be an array
	 * if the root element with options.replace has not only one child.
	 *
	 * @param {object|array} target
	 * @param {object}       dest
	 * @param {object}       meta
	 */
	function _compile(target, dest, meta) {
	  var app = this._app || {};
	
	  if (app.lastSignal === -1) {
	    return;
	  }
	
	  var context = this;
	  if (context._targetIsFragment(target)) {
	    context._compileFragment(target, dest, meta);
	    return;
	  }
	  meta = meta || {};
	  if (context._targetIsContent(target)) {
	    _.debug('compile "content" block by', target);
	    context._content = context._createBlock(dest);
	    return;
	  }
	
	  if (context._targetNeedCheckRepeat(target, meta)) {
	    _.debug('compile "repeat" logic by', target);
	    context._compileRepeat(target, dest);
	    return;
	  }
	  if (context._targetNeedCheckShown(target, meta)) {
	    _.debug('compile "if" logic by', target);
	    context._compileShown(target, dest, meta);
	    return;
	  }
	  var typeGetter = meta.type || target.type;
	  if (context._targetNeedCheckType(typeGetter, meta)) {
	    context._compileType(target, dest, typeGetter, meta);
	    return;
	  }
	  var type = typeGetter;
	  var component = context._targetIsComposed(target, type);
	  if (component) {
	    _.debug('compile composed component by', target);
	    context._compileCustomComponent(component, target, dest, type, meta);
	    return;
	  }
	  _.debug('compile native component by', target);
	  context._compileNativeComponent(target, dest, type);
	}
	
	/**
	 * Check if target is a fragment (an array).
	 *
	 * @param  {object}  target
	 * @return {boolean}
	 */
	function _targetIsFragment(target) {
	  return Array.isArray(target);
	}
	
	/**
	 * Check if target type is content/slot.
	 *
	 * @param  {object}  target
	 * @return {boolean}
	 */
	function _targetIsContent(target) {
	  return target.type === 'content' || target.type === 'slot';
	}
	
	/**
	 * Check if target need to compile by a list.
	 *
	 * @param  {object}  target
	 * @param  {object}  meta
	 * @return {boolean}
	 */
	function _targetNeedCheckRepeat(target, meta) {
	  return !meta.hasOwnProperty('repeat') && target.repeat;
	}
	
	/**
	 * Check if target need to compile by a boolean value.
	 *
	 * @param  {object}  target
	 * @param  {object}  meta
	 * @return {boolean}
	 */
	function _targetNeedCheckShown(target, meta) {
	  return !meta.hasOwnProperty('shown') && target.shown;
	}
	
	/**
	 * Check if target need to compile by a dynamic type.
	 *
	 * @param  {string|function} typeGetter
	 * @param  {object}          meta
	 * @return {boolean}
	 */
	function _targetNeedCheckType(typeGetter, meta) {
	  return typeof typeGetter === 'function' && !meta.hasOwnProperty('type');
	}
	
	/**
	 * Check if this kind of component is composed.
	 *
	 * @param  {string}  type
	 * @return {boolean}
	 */
	function _targetIsComposed(target, type) {
	  var component = void 0;
	  if (this._app && this._app.customComponentMap) {
	    component = this._app.customComponentMap[type];
	  }
	  if (this._options && this._options.components) {
	    component = this._options.components[type];
	  }
	  if (target.component) {
	    component = component || {};
	  }
	  return component;
	}
	
	/**
	 * Compile a list of targets.
	 *
	 * @param {object} target
	 * @param {object} dest
	 * @param {object} meta
	 */
	function _compileFragment(target, dest, meta) {
	  var _this = this;
	
	  var fragBlock = this._createBlock(dest);
	  target.forEach(function (child) {
	    _this._compile(child, fragBlock, meta);
	  });
	}
	
	/**
	 * Compile a target with repeat directive.
	 *
	 * @param {object} target
	 * @param {object} dest
	 */
	function _compileRepeat(target, dest) {
	  var repeat = target.repeat;
	  var oldStyle = typeof repeat === 'function';
	  var getter = repeat.getter || repeat.expression || repeat;
	  if (typeof getter !== 'function') {
	    getter = function getter() {
	      return [];
	    };
	  }
	  var key = repeat.key || '$index';
	  var value = repeat.value || '$value';
	  var trackBy = repeat.trackBy || target.trackBy || target.attr && target.attr.trackBy;
	
	  var fragBlock = this._createBlock(dest);
	  fragBlock.children = [];
	  fragBlock.data = [];
	  fragBlock.vms = [];
	
	  this._bindRepeat(target, fragBlock, { getter: getter, key: key, value: value, trackBy: trackBy, oldStyle: oldStyle });
	}
	
	/**
	 * Compile a target with if directive.
	 *
	 * @param {object} target
	 * @param {object} dest
	 * @param {object} meta
	 */
	function _compileShown(target, dest, meta) {
	  var newMeta = { shown: true };
	  var fragBlock = this._createBlock(dest);
	
	  if (dest.element && dest.children) {
	    dest.children.push(fragBlock);
	  }
	
	  if (meta.repeat) {
	    newMeta.repeat = meta.repeat;
	  }
	
	  this._bindShown(target, fragBlock, newMeta);
	}
	
	/**
	 * Compile a target with dynamic component type.
	 *
	 * @param {object}   target
	 * @param {object}   dest
	 * @param {function} typeGetter
	 */
	function _compileType(target, dest, typeGetter, meta) {
	  var _this2 = this;
	
	  var type = typeGetter.call(this);
	  var newMeta = Object.assign({ type: type }, meta);
	  var fragBlock = this._createBlock(dest);
	
	  if (dest.element && dest.children) {
	    dest.children.push(fragBlock);
	  }
	
	  this._watch(typeGetter, function (value) {
	    var newMeta = Object.assign({ type: value }, meta);
	    _this2._removeBlock(fragBlock, true);
	    _this2._compile(target, fragBlock, newMeta);
	  });
	
	  this._compile(target, fragBlock, newMeta);
	}
	
	/**
	 * Compile a composed component.
	 *
	 * @param {object} target
	 * @param {object} dest
	 * @param {string} type
	 */
	function _compileCustomComponent(component, target, dest, type, meta) {
	  var Vm = this.constructor;
	  var context = this;
	  var subVm = new Vm(type, component, context, dest, undefined, {
	    'hook:init': function hookInit() {
	      context._setId(target.id, null, this);
	      // bind template earlier because of lifecycle issues
	      this._externalBinding = {
	        parent: context,
	        template: target
	      };
	    },
	    'hook:created': function hookCreated() {
	      context._bindSubVm(this, target, meta.repeat);
	    },
	    'hook:ready': function hookReady() {
	      if (this._content) {
	        context._compileChildren(target, this._content);
	      }
	    }
	  });
	  this._bindSubVmAfterInitialized(subVm, target);
	}
	
	/**
	 * Generate element from template and attach to the dest if needed.
	 * The time to attach depends on whether the mode status is node or tree.
	 *
	 * @param {object} template
	 * @param {object} dest
	 * @param {string} type
	 */
	function _compileNativeComponent(template, dest, type) {
	  this._applyNaitveComponentOptions(template);
	
	  var element = void 0;
	  if (dest.ref === '_documentElement') {
	    // if its parent is documentElement then it's a body
	    _.debug('compile to create body for', type);
	    element = this._createBody(type);
	  } else {
	    _.debug('compile to create element for', type);
	    element = this._createElement(type);
	  }
	
	  if (!this._rootEl) {
	    this._rootEl = element;
	    // bind event earlier because of lifecycle issues
	    var binding = this._externalBinding || {};
	    var target = binding.template;
	    var vm = binding.parent;
	    if (target && target.events && vm && element) {
	      for (var _type in target.events) {
	        var handler = vm[target.events[_type]];
	        if (handler) {
	          element.addEvent(_type, _.bind(handler, vm));
	        }
	      }
	    }
	  }
	
	  this._bindElement(element, template);
	
	  if (template.attr && template.attr.append) {
	    // backward, append prop in attr
	    template.append = template.attr.append;
	  }
	
	  if (template.append) {
	    // give the append attribute for ios adaptation
	    element.attr = element.attr || {};
	    element.attr.append = template.append;
	  }
	
	  var treeMode = template.append === 'tree';
	  var app = this._app || {};
	  if (app.lastSignal !== -1 && !treeMode) {
	    _.debug('compile to append single node for', element);
	    app.lastSignal = this._attachTarget(element, dest);
	  }
	  if (app.lastSignal !== -1) {
	    this._compileChildren(template, element);
	  }
	  if (app.lastSignal !== -1 && treeMode) {
	    _.debug('compile to append whole tree for', element);
	    app.lastSignal = this._attachTarget(element, dest);
	  }
	}
	
	/**
	 * Set all children to a certain parent element.
	 *
	 * @param {object} template
	 * @param {object} dest
	 */
	function _compileChildren(template, dest) {
	  var _this3 = this;
	
	  var app = this._app || {};
	  var children = template.children;
	  if (children && children.length) {
	    children.every(function (child) {
	      _this3._compile(child, dest);
	      return app.lastSignal !== -1;
	    });
	  }
	}
	
	/**
	 * Watch the list update and refresh the changes.
	 *
	 * @param {object} target
	 * @param {object} fragBlock {vms, data, children}
	 * @param {object} info      {getter, key, value, trackBy, oldStyle}
	 */
	function _bindRepeat(target, fragBlock, info) {
	  var _this4 = this;
	
	  var vms = fragBlock.vms;
	  var children = fragBlock.children;
	  var getter = info.getter;
	  var trackBy = info.trackBy;
	  var oldStyle = info.oldStyle;
	
	  var keyName = info.key;
	  var valueName = info.value;
	
	  function compileItem(item, index, context) {
	    var mergedData = void 0;
	    if (oldStyle) {
	      mergedData = item;
	      if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
	        mergedData[keyName] = index;
	        if (!mergedData.hasOwnProperty('INDEX')) {
	          Object.defineProperty(mergedData, 'INDEX', {
	            value: function value() {
	              _.warn('"INDEX" in repeat is deprecated,' + ' please use "$index" instead');
	            }
	          });
	        }
	      }
	    } else {
	      mergedData = {};
	      mergedData[keyName] = index;
	      mergedData[valueName] = item;
	    }
	    context = context._mergeContext(mergedData);
	    vms.push(context);
	    context._compile(target, fragBlock, { repeat: item });
	  }
	
	  var list = this._watchBlock(fragBlock, getter, 'repeat', function (data) {
	    _.debug('the "repeat" item has changed', data);
	    if (!fragBlock) {
	      return;
	    }
	
	    var oldChildren = children.slice();
	    var oldVms = vms.slice();
	    var oldData = fragBlock.data.slice();
	    // 1. collect all new refs track by
	    var trackMap = {};
	    var reusedMap = {};
	    data.forEach(function (item, index) {
	      var key = trackBy ? item[trackBy] : oldStyle ? item[keyName] : index;
	      /* istanbul ignore if */
	      if (key == null || key === '') {
	        return;
	      }
	      trackMap[key] = item;
	    });
	
	    // 2. remove unused element foreach old item
	    var reusedList = [];
	    oldData.forEach(function (item, index) {
	      var key = trackBy ? item[trackBy] : oldStyle ? item[keyName] : index;
	      if (trackMap.hasOwnProperty(key)) {
	        reusedMap[key] = {
	          item: item, index: index, key: key,
	          target: oldChildren[index],
	          vm: oldVms[index]
	        };
	        reusedList.push(item);
	      } else {
	        _this4._removeTarget(oldChildren[index]);
	      }
	    });
	
	    // 3. create new element foreach new item
	    children.length = 0;
	    vms.length = 0;
	    fragBlock.data = data.slice();
	    fragBlock.updateMark = fragBlock.start;
	
	    data.forEach(function (item, index) {
	      var key = trackBy ? item[trackBy] : oldStyle ? item[keyName] : index;
	      var reused = reusedMap[key];
	      if (reused) {
	        if (reused.item === reusedList[0]) {
	          reusedList.shift();
	        } else {
	          reusedList.$remove(reused.item);
	          _this4._moveTarget(reused.target, fragBlock.updateMark, true);
	        }
	        children.push(reused.target);
	        vms.push(reused.vm);
	        reused.vm[keyName] = index;
	        fragBlock.updateMark = reused.target;
	      } else {
	        compileItem(item, index, _this4);
	      }
	    });
	
	    delete fragBlock.updateMark;
	  });
	
	  fragBlock.data = list.slice(0);
	  list.forEach(function (item, index) {
	    compileItem(item, index, _this4);
	  });
	}
	
	/**
	 * Watch the display update and add/remove the element.
	 *
	 * @param  {object} target
	 * @param  {object} fragBlock
	 * @param  {object} context
	 */
	function _bindShown(target, fragBlock, meta) {
	  var _this5 = this;
	
	  var display = this._watchBlock(fragBlock, target.shown, 'shown', function (display) {
	    _.debug('the "if" item was changed', display);
	
	    if (!fragBlock || !!fragBlock.display === !!display) {
	      return;
	    }
	    fragBlock.display = !!display;
	    if (display) {
	      _this5._compile(target, fragBlock, meta);
	    } else {
	      _this5._removeBlock(fragBlock, true);
	    }
	  });
	
	  fragBlock.display = !!display;
	  if (display) {
	    this._compile(target, fragBlock, meta);
	  }
	}
	
	/**
	 * Watch calc value changes and append certain type action to differ.
	 * It is used for if or repeat data-binding generator.
	 *
	 * @param  {object}   fragBlock
	 * @param  {function} calc
	 * @param  {string}   type
	 * @param  {function} handler
	 * @return {any}      init value of calc
	 */
	function _watchBlock(fragBlock, calc, type, handler) {
	  var differ = this && this._app && this._app.differ;
	  var config = {};
	  var depth = (fragBlock.element.depth || 0) + 1;
	
	  return this._watch(calc, function (value) {
	    config.latestValue = value;
	    if (differ && !config.recorded) {
	      differ.append(type, depth, fragBlock.blockId, function () {
	        var latestValue = config.latestValue;
	        handler(latestValue);
	        config.recorded = false;
	        config.latestValue = undefined;
	      });
	    }
	    config.recorded = true;
	  });
	}
	
	/**
	 * Clone a context and merge certain data.
	 *
	 * @param  {object} mergedData
	 * @return {object}
	 */
	function _mergeContext(mergedData) {
	  var context = Object.create(this);
	  context._data = mergedData;
	  context._initData();
	  context._initComputed();
	  context._realParent = this;
	  return context;
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * @fileOverview
	                                                                                                                                                                                                                                                   * Directive Parser
	                                                                                                                                                                                                                                                   */
	
	exports._applyNaitveComponentOptions = _applyNaitveComponentOptions;
	exports._bindElement = _bindElement;
	exports._bindSubVm = _bindSubVm;
	exports._bindSubVmAfterInitialized = _bindSubVmAfterInitialized;
	exports._setId = _setId;
	exports._setAttr = _setAttr;
	exports._setClass = _setClass;
	exports._setStyle = _setStyle;
	exports._setEvent = _setEvent;
	exports._bindEvents = _bindEvents;
	exports._bindDir = _bindDir;
	exports._bindKey = _bindKey;
	exports._watch = _watch;
	
	var _util = __webpack_require__(49);
	
	var _ = _interopRequireWildcard(_util);
	
	var _watcher = __webpack_require__(55);
	
	var _watcher2 = _interopRequireDefault(_watcher);
	
	var _config = __webpack_require__(47);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var nativeComponentMap = _config2.default.nativeComponentMap;
	
	
	var SETTERS = {
	  attr: 'setAttr',
	  style: 'setStyle',
	  event: 'addEvent'
	};
	
	/**
	 * apply the native component's options(specified by template.type)
	 * to the template
	 */
	function _applyNaitveComponentOptions(template) {
	  var type = template.type;
	
	  var options = nativeComponentMap[type];
	
	  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
	    for (var key in options) {
	      if (template[key] == null) {
	        template[key] = options[key];
	      } else if (_.typof(template[key]) === 'object' && _.typof(options[key]) === 'object') {
	        for (var subkey in options[key]) {
	          if (template[key][subkey] == null) {
	            template[key][subkey] = options[key][subkey];
	          }
	        }
	      }
	    }
	  }
	}
	
	/**
	 * bind all id, attr, classnames, style, events to an element
	 */
	function _bindElement(el, template) {
	  this._setId(template.id, el, this);
	  this._setAttr(el, template.attr);
	  this._setClass(el, template.classList);
	  this._setStyle(el, template.style);
	  this._bindEvents(el, template.events);
	}
	
	/**
	 * bind all props to sub vm and bind all style, events to the root element
	 * of the sub vm if it doesn't have a replaced multi-node fragment
	 */
	function _bindSubVm(subVm, template, repeatItem) {
	  subVm = subVm || {};
	  template = template || {};
	
	  var options = subVm._options || {};
	
	  // bind props
	  var props = options.props;
	
	  if (Array.isArray(props)) {
	    props = props.reduce(function (result, value) {
	      result[value] = true;
	      return result;
	    }, {});
	  }
	
	  mergeProps(repeatItem, props, this, subVm);
	  mergeProps(template.attr, props, this, subVm);
	}
	
	function _bindSubVmAfterInitialized(subVm, template) {
	  mergeClassStyle(template.classList, this, subVm);
	  mergeStyle(template.style, this, subVm);
	}
	
	function mergeProps(target, props, vm, subVm) {
	  if (!target) {
	    return;
	  }
	
	  var _loop = function _loop(key) {
	    if (!props || props[key]) {
	      var value = target[key];
	      if (typeof value === 'function') {
	        var returnValue = vm._watch(value, function (v) {
	          subVm[key] = v;
	        });
	        subVm[key] = returnValue;
	      } else {
	        subVm[key] = value;
	      }
	    }
	  };
	
	  for (var key in target) {
	    _loop(key);
	  }
	}
	
	function mergeStyle(target, vm, subVm) {
	  var _loop2 = function _loop2(key) {
	    var value = target[key];
	    if (typeof value === 'function') {
	      var returnValue = vm._watch(value, function (v) {
	        if (subVm._rootEl) {
	          subVm._rootEl.setStyle(key, v);
	        }
	      });
	      subVm._rootEl.setStyle(key, returnValue);
	    } else {
	      if (subVm._rootEl) {
	        subVm._rootEl.setStyle(key, value);
	      }
	    }
	  };
	
	  for (var key in target) {
	    _loop2(key);
	  }
	}
	
	function mergeClassStyle(target, vm, subVm) {
	  var css = vm._options && vm._options.style || {};
	
	  /* istanbul ignore if */
	  if (!subVm._rootEl) {
	    return;
	  }
	
	  if (typeof target === 'function') {
	    var _value = vm._watch(target, function (v) {
	      setClassStyle(subVm._rootEl, css, v);
	    });
	    setClassStyle(subVm._rootEl, css, _value);
	  } else if (target != null) {
	    setClassStyle(subVm._rootEl, css, target);
	  }
	}
	
	/**
	 * bind id to an element
	 * each id is unique in a whole vm
	 */
	function _setId(id, el, vm) {
	  var _this = this;
	
	  var map = Object.create(null);
	
	  Object.defineProperties(map, {
	    vm: {
	      value: vm,
	      writable: false,
	      configurable: false
	    },
	    el: {
	      get: function get() {
	        return el || vm._rootEl;
	      },
	      configurable: false
	    }
	  });
	
	  if (typeof id === 'function') {
	    var handler = id;
	    id = handler.call(this);
	    if (id) {
	      this._ids[id] = map;
	    }
	    this._watch(handler, function (newId) {
	      if (newId) {
	        _this._ids[newId] = map;
	      }
	    });
	  } else if (id && typeof id === 'string') {
	    this._ids[id] = map;
	  }
	}
	
	/**
	 * bind attr to an element
	 */
	function _setAttr(el, attr) {
	  this._bindDir(el, 'attr', attr);
	}
	
	function setClassStyle(el, css, classList) {
	  var classStyle = {};
	  var length = classList.length;
	
	  for (var i = 0; i < length; i++) {
	    var style = css[classList[i]];
	    if (style) {
	      for (var key in style) {
	        classStyle[key] = style[key];
	      }
	    }
	  }
	  el.setClassStyle(classStyle);
	}
	
	/**
	 * bind classnames to an element
	 */
	function _setClass(el, classList) {
	  if (typeof classList !== 'function' && !Array.isArray(classList)) {
	    return;
	  }
	  if (Array.isArray(classList) && !classList.length) {
	    el.setClassStyle({});
	    return;
	  }
	
	  var style = this._options && this._options.style || {};
	  if (typeof classList === 'function') {
	    var _value2 = this._watch(classList, function (v) {
	      setClassStyle(el, style, v);
	    });
	    setClassStyle(el, style, _value2);
	  } else {
	    setClassStyle(el, style, classList);
	  }
	}
	
	/**
	 * bind style to an element
	 */
	function _setStyle(el, style) {
	  this._bindDir(el, 'style', style);
	}
	
	/**
	 * add an event type and handler to an element and generate a dom update
	 */
	function _setEvent(el, type, handler) {
	  el.addEvent(type, _.bind(handler, this));
	}
	
	/**
	 * add all events of an element
	 */
	function _bindEvents(el, events) {
	  if (!events) {
	    return;
	  }
	  var keys = Object.keys(events);
	  var i = keys.length;
	  while (i--) {
	    var key = keys[i];
	    var handler = events[key];
	    if (typeof handler === 'string') {
	      handler = this[handler];
	      /* istanbul ignore if */
	      if (!handler) {
	        _.error('The method "' + handler + '" is not defined.');
	      }
	    }
	    this._setEvent(el, key, handler);
	  }
	}
	
	/**
	 * set a series of members as a kind of an element
	 * for example: style, attr, ...
	 * if the value is a function then bind the data changes
	 */
	function _bindDir(el, name, data) {
	  if (!data) {
	    return;
	  }
	  var keys = Object.keys(data);
	  var i = keys.length;
	  while (i--) {
	    var key = keys[i];
	    var _value3 = data[key];
	    if (typeof _value3 === 'function') {
	      this._bindKey(el, name, key, _value3);
	    } else {
	      el[SETTERS[name]](key, _value3);
	    }
	  }
	}
	
	/**
	 * bind data changes to a certain key to a name series in an element
	 */
	function _bindKey(el, name, key, calc) {
	  var _this2 = this;
	
	  var methodName = SETTERS[name];
	  // watch the calc, and returns a value by calc.call()
	  var value = this._watch(calc, function (value) {
	    function handler() {
	      el[methodName](key, value);
	    }
	    var differ = _this2 && _this2._app && _this2._app.differ;
	    if (differ) {
	      differ.append('element', el.depth, el.ref, handler);
	    } else {
	      handler();
	    }
	  });
	
	  el[methodName](key, value);
	}
	
	/**
	 * watch a calc function and callback if the calc value changes
	 */
	function _watch(calc, callback) {
	  var watcher = new _watcher2.default(this, calc, function (value, oldValue) {
	    /* istanbul ignore if */
	    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' && value === oldValue) {
	      return;
	    }
	    callback(value);
	  });
	
	  return watcher.value;
	}

/***/ },
/* 61 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports._createBody = _createBody;
	exports._createElement = _createElement;
	exports._createBlock = _createBlock;
	exports._createBlockStart = _createBlockStart;
	exports._createBlockEnd = _createBlockEnd;
	exports._attachTarget = _attachTarget;
	exports._moveTarget = _moveTarget;
	exports._moveElement = _moveElement;
	exports._moveBlock = _moveBlock;
	exports._removeTarget = _removeTarget;
	exports._removeElement = _removeElement;
	exports._removeBlock = _removeBlock;
	/**
	 * @fileOverview Document & Element Helpers.
	 *
	 * required:
	 * Document#: createElement, createComment, getRef
	 * Element#: appendChild, insertBefore, removeChild, nextSibling
	 */
	
	/**
	 * Create a body by type
	 * Using this._app.doc
	 *
	 * @param  {string} type
	 */
	function _createBody(type) {
	  var doc = this._app.doc;
	  return doc.createBody(type);
	}
	
	/**
	 * Create an element by type
	 * Using this._app.doc
	 *
	 * @param  {string} type
	 */
	function _createElement(type) {
	  var doc = this._app.doc;
	  return doc.createElement(type);
	}
	
	/**
	 * Create and return a frag block for an element.
	 * The frag block has a starter, ender and the element itself.
	 *
	 * @param  {object} element
	 */
	function _createBlock(element) {
	  var start = this._createBlockStart();
	  var end = this._createBlockEnd();
	  var blockId = lastestBlockId++;
	  if (element.element) {
	    element.element.insertBefore(start, element.end);
	    element.element.insertBefore(end, element.end);
	    element = element.element;
	  } else {
	    element.appendChild(start);
	    element.appendChild(end);
	  }
	  return { start: start, end: end, element: element, blockId: blockId };
	}
	
	var lastestBlockId = 1;
	
	/**
	 * Create and return a block starter.
	 * Using this._app.doc
	 */
	function _createBlockStart() {
	  var doc = this._app.doc;
	  var anchor = doc.createComment('start');
	  return anchor;
	}
	
	/**
	 * Create and return a block ender.
	 * Using this._app.doc
	 */
	function _createBlockEnd() {
	  var doc = this._app.doc;
	  var anchor = doc.createComment('end');
	  return anchor;
	}
	
	/**
	 * Attach target to a certain dest using appendChild by default.
	 * If the dest is a frag block then insert before the ender.
	 * If the target is a frag block then attach the starter and ender in order.
	 *
	 * @param  {object} target
	 * @param  {object} dest
	 */
	function _attachTarget(target, dest) {
	  if (dest.element) {
	    var before = dest.end;
	    var after = dest.updateMark;
	    // push new target for watch list update later
	    if (dest.children) {
	      dest.children.push(target);
	    }
	    // for check repeat case
	    if (after) {
	      var signal = this._moveTarget(target, after);
	      dest.updateMark = target.element ? target.end : target;
	      return signal;
	    } else if (target.element) {
	      dest.element.insertBefore(target.start, before);
	      dest.element.insertBefore(target.end, before);
	    } else {
	      return dest.element.insertBefore(target, before);
	    }
	  } else {
	    if (target.element) {
	      dest.appendChild(target.start);
	      dest.appendChild(target.end);
	    } else {
	      return dest.appendChild(target);
	    }
	  }
	}
	
	/**
	 * Move target before a certain element. The target maybe block or element.
	 *
	 * @param  {object} target
	 * @param  {object} before
	 */
	function _moveTarget(target, after) {
	  if (target.element) {
	    return this._moveBlock(target, after);
	  }
	  return this._moveElement(target, after);
	}
	
	/**
	 * Move element before a certain element.
	 *
	 * @param  {object} element
	 * @param  {object} before
	 */
	function _moveElement(element, after) {
	  var parent = after.parentNode;
	  if (parent) {
	    return parent.insertAfter(element, after);
	  }
	}
	
	/**
	 * Move all elements of the block before a certain element.
	 *
	 * @param  {object} fragBlock
	 * @param  {object} before
	 */
	function _moveBlock(fragBlock, after) {
	  var parent = after.parentNode;
	
	  if (parent) {
	    var _ret = function () {
	      var el = fragBlock.start;
	      var signal = void 0;
	      var group = [el];
	
	      while (el && el !== fragBlock.end) {
	        el = el.nextSibling;
	        group.push(el);
	      }
	
	      var temp = after;
	      group.every(function (el) {
	        signal = parent.insertAfter(el, temp);
	        temp = el;
	        return signal !== -1;
	      });
	
	      return {
	        v: signal
	      };
	    }();
	
	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	}
	
	/**
	 * Remove target from DOM tree.
	 * If the target is a frag block then call _removeBlock
	 *
	 * @param  {object} target
	 */
	function _removeTarget(target) {
	  if (target.element) {
	    this._removeBlock(target);
	  } else {
	    this._removeElement(target);
	  }
	}
	
	/**
	 * Remove a certain element.
	 * Using this._app.doc
	 *
	 * @param  {object} target
	 */
	function _removeElement(target) {
	  var parent = target.parentNode;
	
	  if (parent) {
	    parent.removeChild(target);
	  }
	}
	
	/**
	 * Remove a frag block.
	 * The second param decides whether the block self should be removed too.
	 *
	 * @param  {object}  fragBlock
	 * @param  {Boolean} preserveBlock=false
	 */
	function _removeBlock(fragBlock) {
	  var _this = this;
	
	  var preserveBlock = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
	  var result = [];
	  var el = fragBlock.start.nextSibling;
	
	  while (el && el !== fragBlock.end) {
	    result.push(el);
	    el = el.nextSibling;
	  }
	
	  if (!preserveBlock) {
	    this._removeElement(fragBlock.start);
	  }
	  result.forEach(function (el) {
	    _this._removeElement(el);
	  });
	  if (!preserveBlock) {
	    this._removeElement(fragBlock.end);
	  }
	}

/***/ },
/* 62 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.$emit = $emit;
	exports.$dispatch = $dispatch;
	exports.$broadcast = $broadcast;
	exports.$on = $on;
	exports.$off = $off;
	exports._initEvents = _initEvents;
	function Evt(type, detail) {
	  if (detail instanceof Evt) {
	    return detail;
	  }
	
	  this.timestamp = Date.now();
	  this.detail = detail;
	  this.type = type;
	
	  var shouldStop = false;
	  this.stop = function () {
	    shouldStop = true;
	  };
	  this.hasStopped = function () {
	    return shouldStop;
	  };
	}
	
	function $emit(type, detail) {
	  var _this = this;
	
	  var events = this._vmEvents;
	  var handlerList = events[type];
	  if (handlerList) {
	    (function () {
	      var evt = new Evt(type, detail);
	      handlerList.forEach(function (handler) {
	        handler.call(_this, evt);
	      });
	    })();
	  }
	}
	
	function $dispatch(type, detail) {
	  var evt = new Evt(type, detail);
	  this.$emit(type, evt);
	
	  if (!evt.hasStopped() && this._parent && this._parent.$dispatch) {
	    this._parent.$dispatch(type, evt);
	  }
	}
	
	function $broadcast(type, detail) {
	  var evt = new Evt(type, detail);
	  this.$emit(type, evt);
	
	  if (!evt.hasStopped() && this._childrenVms) {
	    this._childrenVms.forEach(function (subVm) {
	      subVm.$broadcast(type, evt);
	    });
	  }
	}
	
	function $on(type, handler) {
	  if (!type || typeof handler !== 'function') {
	    return;
	  }
	  var events = this._vmEvents;
	  var handlerList = events[type] || [];
	  handlerList.push(handler);
	  events[type] = handlerList;
	
	  // fixed old version lifecycle design
	  if (type === 'hook:ready' && this._ready) {
	    this.$emit('hook:ready');
	  }
	}
	
	function $off(type, handler) {
	  if (!type) {
	    return;
	  }
	  var events = this._vmEvents;
	  if (!handler) {
	    delete events[type];
	    return;
	  }
	  var handlerList = events[type];
	  if (!handlerList) {
	    return;
	  }
	  handlerList.$remove(handler);
	}
	
	var LIFE_CYCLE_TYPES = ['init', 'created', 'ready'];
	
	function _initEvents(externalEvents) {
	  var _this2 = this;
	
	  var options = this._options || {};
	  var events = options.events || {};
	  for (var type1 in events) {
	    this.$on(type1, events[type1]);
	  }
	  for (var type2 in externalEvents) {
	    this.$on(type2, externalEvents[type2]);
	  }
	  LIFE_CYCLE_TYPES.forEach(function (type) {
	    _this2.$on('hook:' + type, options[type]);
	  });
	}

/***/ },
/* 63 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.clearModules = clearModules;
	exports.getModule = getModule;
	exports.requireModule = requireModule;
	exports.registerModules = registerModules;
	exports.registerMethods = registerMethods;
	exports.requireComponent = requireComponent;
	exports.registerComponent = registerComponent;
	var nativeModules = {};
	
	function assignModules(modules, ifReplace) {
	  var _loop = function _loop(moduleName) {
	    // init `modules[moduleName][]`
	    var methods = nativeModules[moduleName];
	    if (!methods) {
	      methods = {};
	      nativeModules[moduleName] = methods;
	    }
	
	    // push each non-existed new method
	    modules[moduleName].forEach(function (method) {
	      if (typeof method === 'string') {
	        method = {
	          name: method
	        };
	      }
	
	      if (!methods[method.name] || ifReplace) {
	        methods[method.name] = method;
	      }
	    });
	  };
	
	  for (var moduleName in modules) {
	    _loop(moduleName);
	  }
	}
	
	function assignApis(Ctor, apis) {
	  var p = Ctor.prototype;
	
	  for (var apiName in apis) {
	    if (!p.hasOwnProperty(apiName)) {
	      p[apiName] = apis[apiName];
	    }
	  }
	}
	
	function clearModules() {
	  nativeModules = {};
	}
	
	function getModule(moduleName) {
	  return nativeModules[moduleName];
	}
	
	/**
	 * @context a instance of AppInstance
	 */
	function requireModule(moduleName) {
	  var _this = this;
	
	  var methods = nativeModules[moduleName];
	  var target = {};
	
	  var _loop2 = function _loop2(methodName) {
	    target[methodName] = function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      return _this.callTasks({
	        module: moduleName,
	        method: methodName,
	        args: args
	      });
	    };
	  };
	
	  for (var methodName in methods) {
	    _loop2(methodName);
	  }
	
	  return target;
	}
	
	/**
	 * @context Vm
	 */
	function registerModules(modules, ifReplace) {
	  assignModules(modules, ifReplace);
	}
	
	/**
	 * @context Vm
	 */
	function registerMethods(apis) {
	  assignApis(this, apis);
	}
	
	/**
	 * @context a instance of AppInstance
	 */
	function requireComponent(name) {
	  var customComponentMap = this.customComponentMap;
	
	  return customComponentMap[name];
	}
	
	/**
	 * @context a instance of AppInstance
	 */
	function registerComponent(name, exports) {
	  var customComponentMap = this.customComponentMap;
	
	
	  if (customComponentMap[name]) {
	    throw new Error('define a component(' + name + ') that already exists');
	  }
	
	  customComponentMap[name] = exports;
	}

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.normalizeVersion = normalizeVersion;
	exports.getError = getError;
	exports.check = check;
	
	var _semver = __webpack_require__(51);
	
	var _semver2 = _interopRequireDefault(_semver);
	
	var _util = __webpack_require__(49);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * [normalizeVersion description]
	 * @param  {String} Version. ie: 1, 1.0, 1.0.0
	 * @return {String} Version
	 */
	function normalizeVersion(v) {
	  var isValid = _semver2.default.valid(v);
	  if (isValid) {
	    return v;
	  }
	
	  v = typeof v === 'string' ? v : '';
	  var split = v.split('.');
	  var i = 0;
	  var result = [];
	
	  while (i < 3) {
	    var s = typeof split[i] === 'string' && split[i] ? split[i] : '0';
	    result.push(s);
	    i++;
	  }
	
	  return result.join('.');
	}
	
	function getError(key, val, criteria) {
	  var result = {
	    isDowngrade: true,
	    errorType: 1,
	    code: 1000
	  };
	  var getMsg = function getMsg(key, val, criteria) {
	    return 'Downgrade[' + key + '] :: deviceInfo ' + val + ' matched criteria ' + criteria;
	  };
	  var _key = key.toLowerCase();
	
	  result.errorMessage = getMsg(key, val, criteria);
	
	  if (_key.indexOf('osversion') >= 0) {
	    result.code = 1001;
	  } else if (_key.indexOf('appversion') >= 0) {
	    result.code = 1002;
	  } else if (_key.indexOf('weexversion') >= 0) {
	    result.code = 1003;
	  } else if (_key.indexOf('devicemodel') >= 0) {
	    result.code = 1004;
	  }
	
	  return result;
	}
	
	/**
	 * WEEX framework input(deviceInfo)
	 * {
	 *   platform: 'iOS' or 'android'
	 *   osVersion: '1.0.0' or '1.0' or '1'
	 *   appVersion: '1.0.0' or '1.0' or '1'
	 *   weexVersion: '1.0.0' or '1.0' or '1'
	 *   dDeviceModel: 'MODEL_NAME'
	 * }
	 *
	 * downgrade config(config)
	 * {
	 *   ios: {
	 *     osVersion: '>1.0.0' or '>=1.0.0' or '<1.0.0' or '<=1.0.0' or '1.0.0'
	 *     appVersion: '>1.0.0' or '>=1.0.0' or '<1.0.0' or '<=1.0.0' or '1.0.0'
	 *     weexVersion: '>1.0.0' or '>=1.0.0' or '<1.0.0' or '<=1.0.0' or '1.0.0'
	 *     deviceModel: ['modelA', 'modelB', ...]
	 *   },
	 *   android: {
	 *     osVersion: '>1.0.0' or '>=1.0.0' or '<1.0.0' or '<=1.0.0' or '1.0.0'
	 *     appVersion: '>1.0.0' or '>=1.0.0' or '<1.0.0' or '<=1.0.0' or '1.0.0'
	 *     weexVersion: '>1.0.0' or '>=1.0.0' or '<1.0.0' or '<=1.0.0' or '1.0.0'
	 *     deviceModel: ['modelA', 'modelB', ...]
	 *   }
	 * }
	 *
	 *
	 * @param  {object} deviceInfo Weex SDK framework input
	 * @param  {object} config     user input
	 * @return {Object}            { isDowngrade: true/false, errorMessage... }
	 */
	function check(config, deviceInfo) {
	  deviceInfo = deviceInfo || global.WXEnvironment;
	  deviceInfo = (0, _util.isPlainObject)(deviceInfo) ? deviceInfo : {};
	
	  var result = {
	    isDowngrade: false // defautl is pass
	  };
	
	  if ((0, _util.typof)(config) === 'function') {
	    var customDowngrade = config.call(this, deviceInfo, {
	      semver: _semver2.default,
	      normalizeVersion: this.normalizeVersion
	    });
	
	    customDowngrade = !!customDowngrade;
	
	    result = customDowngrade ? this.getError('custom', '', 'custom params') : result;
	  } else {
	    config = (0, _util.isPlainObject)(config) ? config : {};
	
	    var platform = deviceInfo.platform || 'unknow';
	    var dPlatform = platform.toLowerCase();
	    var cObj = config[dPlatform] || {};
	
	    for (var i in deviceInfo) {
	      var key = i;
	      var keyLower = key.toLowerCase();
	      var val = deviceInfo[i];
	      var isVersion = keyLower.indexOf('version') >= 0;
	      var isDeviceModel = keyLower.indexOf('devicemodel') >= 0;
	      var criteria = cObj[i];
	
	      if (criteria && isVersion) {
	        var c = this.normalizeVersion(criteria);
	        var d = this.normalizeVersion(deviceInfo[i]);
	
	        if (_semver2.default.satisfies(d, c)) {
	          result = this.getError(key, val, criteria);
	          break;
	        }
	      } else if (isDeviceModel) {
	        var _criteria = (0, _util.typof)(criteria) === 'array' ? criteria : [criteria];
	        if (_criteria.indexOf(val) >= 0) {
	          result = this.getError(key, val, criteria);
	          break;
	        }
	      }
	    }
	  }
	
	  return result;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.updateActions = updateActions;
	exports.init = init;
	exports.destroy = destroy;
	exports.getRootElement = getRootElement;
	exports.fireEvent = fireEvent;
	exports.callback = callback;
	exports.refreshData = refreshData;
	
	var _util = __webpack_require__(49);
	
	var _ = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
	                                                                                                                                                                                                     * @fileOverview
	                                                                                                                                                                                                     * instance controls from native
	                                                                                                                                                                                                     *
	                                                                                                                                                                                                     * - init bundle
	                                                                                                                                                                                                     * - fire event
	                                                                                                                                                                                                     * - callback
	                                                                                                                                                                                                     * - destroy
	                                                                                                                                                                                                     *
	                                                                                                                                                                                                     * corresponded with the API of instance manager (framework.js)
	                                                                                                                                                                                                     */
	
	function updateActions() {
	  this.differ.flush();
	  var tasks = [];
	  if (this.doc && this.doc.listener && this.doc.listener.updates.length) {
	    tasks.push.apply(tasks, _toConsumableArray(this.doc.listener.updates));
	    this.doc.listener.updates = [];
	  }
	  if (tasks.length) {
	    return this.callTasks(tasks);
	  }
	}
	
	function init(code, data) {
	  var _this = this;
	
	  _.debug('Intialize an instance with:\n', code, data);
	
	  var result = void 0;
	  // @see: lib/app/bundle.js
	  var define = _.bind(this.define, this);
	  var bootstrap = function bootstrap(name, config, _data) {
	    result = _this.bootstrap(name, config, _data || data);
	    _this.updateActions();
	    _this.doc.listener.createFinish();
	    _.debug('After intialized an instance(' + _this.id + ')');
	  };
	
	  // backward(register/render)
	  var register = _.bind(this.register, this);
	  var render = function render(name, _data) {
	    result = _this.bootstrap(name, {}, _data);
	  };
	
	  var require = function require(name) {
	    return function (_data) {
	      result = _this.bootstrap(name, {}, _data);
	    };
	  };
	
	  var document = this.doc;
	
	  var functionBody = void 0;
	  /* istanbul ignore if */
	  if (typeof code === 'function') {
	    // `function () {...}` -> `{...}`
	    // not very strict
	    functionBody = code.toString().substr(12);
	  } else if (code) {
	    functionBody = code.toString();
	  }
	
	  var _global = global;
	  var WXEnvironment = _global.WXEnvironment;
	
	  if (WXEnvironment && WXEnvironment.platform !== 'Web') {
	    (function () {
	      var timer = _this.requireModule('timer');
	      var timerAPIs = {
	        setTimeout: function setTimeout() {
	          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	          }
	
	          var handler = function handler() {
	            args[0].apply(args, _toConsumableArray(args.slice(2)));
	          };
	          timer.setTimeout(handler, args[1]);
	          return _this.uid.toString();
	        },
	        setInterval: function setInterval() {
	          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	            args[_key2] = arguments[_key2];
	          }
	
	          var handler = function handler() {
	            args[0].apply(args, _toConsumableArray(args.slice(2)));
	          };
	          timer.setInterval(handler, args[1]);
	          return _this.uid.toString();
	        },
	        clearTimeout: function clearTimeout(n) {
	          timer.clearTimeout(n);
	        },
	        clearInterval: function clearInterval(n) {
	          timer.clearInterval(n);
	        }
	      };
	
	      var fn = new Function('define', 'require', 'document', 'bootstrap', 'register', 'render', '__weex_define__', // alias for define
	      '__weex_bootstrap__', // alias for bootstrap
	      'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval', functionBody);
	
	      fn(define, require, document, bootstrap, register, render, define, bootstrap, timerAPIs.setTimeout, timerAPIs.setInterval, timerAPIs.clearTimeout, timerAPIs.clearInterval);
	    })();
	  } else {
	    var _fn = new Function('define', 'require', 'document', 'bootstrap', 'register', 'render', '__weex_define__', // alias for define
	    '__weex_bootstrap__', // alias for bootstrap
	    functionBody);
	
	    _fn(define, require, document, bootstrap, register, render, define, bootstrap);
	  }
	
	  return result;
	}
	
	function destroy() {
	  _.debug('Destory an instance(' + this.id + ')');
	
	  this.id = '';
	  this.options = null;
	  this.blocks = null;
	  this.vm = null;
	  this.doc = null;
	  this.customComponentMap = null;
	  this.callbacks = null;
	}
	
	function getRootElement() {
	  var doc = this.doc || {};
	  var body = doc.body || {};
	  return body.toJSON ? body.toJSON() : {};
	}
	
	function fireEvent(ref, type, e, domChanges) {
	  var _this2 = this;
	
	  _.debug('Fire a "' + type + '" event on an element(' + ref + ') in instance(' + this.id + ')');
	  if (Array.isArray(ref)) {
	    ref.some(function (ref) {
	      return _this2.fireEvent(ref, type, e) !== false;
	    });
	    return;
	  }
	
	  var el = this.doc.getRef(ref);
	
	  if (el) {
	    this.doc.close();
	    var result = this.doc.fireEvent(el, type, e, domChanges);
	    this.updateActions();
	    this.doc.listener.updateFinish();
	    this.doc.open();
	    return result;
	  }
	
	  return new Error('invalid element reference "' + ref + '"');
	}
	
	function callback(callbackId, data, ifKeepAlive) {
	  _.debug('Invoke a callback(' + callbackId + ') with', data, 'in instance(' + this.id + ')');
	
	  var callback = this.callbacks[callbackId];
	
	  if (typeof callback === 'function') {
	    this.doc.close();
	    callback(data); // data is already a object, @see: lib/runtime/index.js
	
	    if (typeof ifKeepAlive === 'undefined' || ifKeepAlive === false) {
	      this.callbacks[callbackId] = undefined;
	    }
	
	    this.updateActions();
	    this.doc.listener.updateFinish();
	    this.doc.open();
	    return;
	  }
	
	  return new Error('invalid callback id "' + callbackId + '"');
	}
	
	function refreshData(data) {
	  _.debug('Refresh with', data, 'in instance[' + this.id + ']');
	
	  var vm = this.vm;
	
	  if (vm && data) {
	    this.doc.close();
	    if (typeof vm.refreshData === 'function') {
	      vm.refreshData(data);
	    } else {
	      _.extend(vm, data);
	    }
	    this.updateActions();
	    this.doc.listener.refreshFinish();
	    this.doc.open();
	    return;
	  }
	
	  return new Error('invalid data "' + data + '"');
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 66 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Differ = function () {
	  function Differ(id) {
	    _classCallCheck(this, Differ);
	
	    this.id = id;
	    this.map = [];
	    this.hooks = [];
	  }
	
	  _createClass(Differ, [{
	    key: 'isEmpty',
	    value: function isEmpty() {
	      return this.map.length === 0;
	    }
	  }, {
	    key: 'append',
	    value: function append(type, depth, ref, handler) {
	      var _this = this;
	
	      if (!this.hasTimer) {
	        this.hasTimer = true;
	        setTimeout(function () {
	          _this.hasTimer = false;
	          _this.flush(true);
	        }, 0);
	      }
	      var map = this.map;
	      if (!map[depth]) {
	        map[depth] = {};
	      }
	      var group = map[depth];
	      if (!group[type]) {
	        group[type] = {};
	      }
	      if (type === 'element') {
	        if (!group[type][ref]) {
	          group[type][ref] = [];
	        }
	        group[type][ref].push(handler);
	      } else {
	        group[type][ref] = handler;
	      }
	    }
	  }, {
	    key: 'flush',
	    value: function flush(isTimeout) {
	      var map = this.map.slice();
	      this.map.length = 0;
	      map.forEach(function (group) {
	        callTypeMap(group, 'repeat');
	        callTypeMap(group, 'shown');
	        callTypeList(group, 'element');
	      });
	
	      var hooks = this.hooks.slice();
	      this.hooks.length = 0;
	      hooks.forEach(function (fn) {
	        fn();
	      });
	
	      if (!this.isEmpty()) {
	        this.flush();
	      }
	    }
	  }, {
	    key: 'then',
	    value: function then(fn) {
	      this.hooks.push(fn);
	    }
	  }]);
	
	  return Differ;
	}();
	
	exports.default = Differ;
	
	
	function callTypeMap(group, type) {
	  var map = group[type];
	  for (var ref in map) {
	    map[ref]();
	  }
	}
	
	function callTypeList(group, type) {
	  var map = group[type];
	  for (var ref in map) {
	    var list = map[ref];
	    list.forEach(function (handler) {
	      handler();
	    });
	  }
	}

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.instanceMap = undefined;
	exports.Document = Document;
	exports.Node = Node;
	exports.Element = Element;
	exports.Comment = Comment;
	
	var _listener4 = __webpack_require__(68);
	
	var _listener5 = _interopRequireDefault(_listener4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DEFAULT_TAG_NAME = 'div'; /**
	                               * @fileOverview
	                               * A simple virtual dom implementation
	                               */
	
	var instanceMap = exports.instanceMap = {};
	var nextNodeRef = 1;
	
	function Document(id, url, handler) {
	  id = id ? id.toString() : '';
	  this.id = id;
	  this.URL = url;
	
	  instanceMap[id] = this;
	  this.nodeMap = {};
	  this.listener = new _listener5.default(id, handler || genCallTasks(id));
	  this.createDocumentElement();
	}
	
	function genCallTasks(id) {
	  return function (tasks) {
	    if (!Array.isArray(tasks)) {
	      tasks = [tasks];
	    }
	    return callNative(id, tasks, '-1');
	  };
	}
	
	Document.prototype.destroy = function () {
	  delete this.listener;
	  delete this.nodeMap;
	  delete instanceMap[this.id];
	};
	
	Document.prototype.open = function () {
	  this.listener.batched = false;
	};
	
	Document.prototype.close = function () {
	  this.listener.batched = true;
	};
	
	Document.prototype.createDocumentElement = function () {
	  var _this = this;
	
	  if (!this.documentElement) {
	    var el = new Element('document');
	    el.docId = this.id;
	    el.ownerDocument = this;
	    el.role = 'documentElement';
	    el.depth = 0;
	    el.ref = '_documentElement';
	    this.nodeMap._documentElement = el;
	    this.documentElement = el;
	    el.appendChild = function (node) {
	      appendBody(_this, node);
	    };
	    el.insertBefore = function (node, before) {
	      appendBody(_this, node, before);
	    };
	  }
	
	  return this.documentElement;
	};
	
	function appendBody(doc, node, before) {
	  var documentElement = doc.documentElement;
	
	
	  if (documentElement.pureChildren.length > 0 || node.parentNode) {
	    return;
	  }
	  var children = documentElement.children;
	  var beforeIndex = children.indexOf(before);
	  if (beforeIndex < 0) {
	    children.push(node);
	  } else {
	    children.splice(beforeIndex, 0, node);
	  }
	
	  if (node.nodeType === 1) {
	    if (node.role === 'body') {
	      node.docId = doc.id;
	      node.ownerDocument = doc;
	      node.parentNode = documentElement;
	    } else {
	      node.children.forEach(function (child) {
	        child.parentNode = node;
	      });
	      setBody(doc, node);
	      node.docId = doc.id;
	      node.ownerDocument = doc;
	      linkParent(node, documentElement);
	      delete doc.nodeMap[node.nodeId];
	    }
	    documentElement.pureChildren.push(node);
	    doc.listener.createBody(node);
	  } else {
	    node.parentNode = documentElement;
	    doc.nodeMap[node.ref] = node;
	  }
	}
	
	function setBody(doc, el) {
	  el.role = 'body';
	  el.depth = 1;
	  delete doc.nodeMap[el.nodeId];
	  el.ref = '_root';
	  doc.nodeMap._root = el;
	  doc.body = el;
	}
	
	Document.prototype.createBody = function (type, props) {
	  if (!this.body) {
	    var el = new Element(type, props);
	    setBody(this, el);
	  }
	
	  return this.body;
	};
	
	Document.prototype.createElement = function (tagName, props) {
	  return new Element(tagName, props);
	};
	
	Document.prototype.createComment = function (text) {
	  return new Comment(text);
	};
	
	Document.prototype.fireEvent = function (el, type, e, domChanges) {
	  if (!el) {
	    return;
	  }
	  e = e || {};
	  e.type = type;
	  e.target = el;
	  e.timestamp = Date.now();
	  if (domChanges) {
	    updateElement(el, domChanges);
	  }
	  return el.fireEvent(type, e);
	};
	
	Document.prototype.getRef = function (ref) {
	  return this.nodeMap[ref];
	};
	
	function updateElement(el, changes) {
	  var attrs = changes.attrs || {};
	  for (var name in attrs) {
	    el.setAttr(name, attrs[name], true);
	  }
	  var style = changes.style || {};
	  for (var _name in style) {
	    el.setStyle(_name, style[_name], true);
	  }
	}
	
	function Node() {
	  this.nodeId = (nextNodeRef++).toString();
	  this.ref = this.nodeId;
	  this.children = [];
	  this.pureChildren = [];
	  this.parentNode = null;
	  this.nextSibling = null;
	  this.previousSibling = null;
	}
	
	Node.prototype.destroy = function () {
	  var doc = instanceMap[this.docId];
	  if (doc) {
	    delete this.docId;
	    delete doc.nodeMap[this.nodeId];
	  }
	  this.children.forEach(function (child) {
	    child.destroy();
	  });
	};
	
	function Element() {
	  var type = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_TAG_NAME : arguments[0];
	  var props = arguments[1];
	
	  props = props || {};
	  this.nodeType = 1;
	  this.nodeId = (nextNodeRef++).toString();
	  this.ref = this.nodeId;
	  this.type = type;
	  this.attr = props.attr || {};
	  this.classStyle = props.classStyle || {};
	  this.style = props.style || {};
	  this.event = {};
	  this.children = [];
	  this.pureChildren = [];
	}
	
	Element.prototype = new Node();
	
	Element.prototype.appendChild = function (node) {
	  if (node.parentNode && node.parentNode !== this) {
	    return;
	  }
	  if (!node.parentNode) {
	    linkParent(node, this);
	    insertIndex(node, this.children, this.children.length, true);
	    if (this.docId) {
	      registerNode(this.docId, node);
	    }
	    if (node.nodeType === 1) {
	      insertIndex(node, this.pureChildren, this.pureChildren.length);
	      if (this.docId) {
	        var listener = instanceMap[this.docId].listener;
	        return listener.addElement(node, this.ref, -1);
	      }
	    }
	  } else {
	    moveIndex(node, this.children, this.children.length, true);
	    if (node.nodeType === 1) {
	      var index = moveIndex(node, this.pureChildren, this.pureChildren.length);
	      if (this.docId && index >= 0) {
	        var _listener = instanceMap[this.docId].listener;
	        return _listener.moveElement(node.ref, this.ref, index);
	      }
	    }
	  }
	};
	
	Element.prototype.insertBefore = function (node, before) {
	  if (node.parentNode && node.parentNode !== this) {
	    return;
	  }
	  if (node === before || node.nextSibling === before) {
	    return;
	  }
	  if (!node.parentNode) {
	    linkParent(node, this);
	    insertIndex(node, this.children, this.children.indexOf(before), true);
	    if (this.docId) {
	      registerNode(this.docId, node);
	    }
	    if (node.nodeType === 1) {
	      var pureBefore = nextElement(before);
	      var index = insertIndex(node, this.pureChildren, pureBefore ? this.pureChildren.indexOf(pureBefore) : this.pureChildren.length);
	      if (this.docId) {
	        var listener = instanceMap[this.docId].listener;
	        return listener.addElement(node, this.ref, index);
	      }
	    }
	  } else {
	    moveIndex(node, this.children, this.children.indexOf(before), true);
	    if (node.nodeType === 1) {
	      var _pureBefore = nextElement(before);
	      var _index = moveIndex(node, this.pureChildren, _pureBefore ? this.pureChildren.indexOf(_pureBefore) : this.pureChildren.length);
	      if (this.docId && _index >= 0) {
	        var _listener2 = instanceMap[this.docId].listener;
	        return _listener2.moveElement(node.ref, this.ref, _index);
	      }
	    }
	  }
	};
	
	Element.prototype.insertAfter = function (node, after) {
	  if (node.parentNode && node.parentNode !== this) {
	    return;
	  }
	  if (node === after || node.previousSibling === after) {
	    return;
	  }
	  if (!node.parentNode) {
	    linkParent(node, this);
	    insertIndex(node, this.children, this.children.indexOf(after) + 1, true);
	    if (this.docId) {
	      registerNode(this.docId, node);
	    }
	    if (node.nodeType === 1) {
	      var index = insertIndex(node, this.pureChildren, this.pureChildren.indexOf(previousElement(after)) + 1);
	      if (this.docId) {
	        var listener = instanceMap[this.docId].listener;
	        return listener.addElement(node, this.ref, index);
	      }
	    }
	  } else {
	    moveIndex(node, this.children, this.children.indexOf(after) + 1, true);
	    if (node.nodeType === 1) {
	      var _index2 = moveIndex(node, this.pureChildren, this.pureChildren.indexOf(previousElement(after)) + 1);
	      if (this.docId && _index2 >= 0) {
	        var _listener3 = instanceMap[this.docId].listener;
	        return _listener3.moveElement(node.ref, this.ref, _index2);
	      }
	    }
	  }
	};
	
	Element.prototype.removeChild = function (node, preserved) {
	  if (node.parentNode) {
	    removeIndex(node, this.children, true);
	    if (node.nodeType === 1) {
	      removeIndex(node, this.pureChildren);
	      if (this.docId) {
	        var listener = instanceMap[this.docId].listener;
	        listener.removeElement(node.ref);
	      }
	    }
	  }
	  if (!preserved) {
	    node.destroy();
	  }
	};
	
	Element.prototype.clear = function () {
	  var _this2 = this;
	
	  if (this.docId) {
	    (function () {
	      var listener = instanceMap[_this2.docId].listener;
	      _this2.pureChildren.forEach(function (node) {
	        listener.removeElement(node.ref);
	      });
	    })();
	  }
	  this.children.forEach(function (node) {
	    node.destroy();
	  });
	  this.children.length = 0;
	  this.pureChildren.length = 0;
	};
	
	function nextElement(node) {
	  while (node) {
	    if (node.nodeType === 1) {
	      return node;
	    }
	    node = node.nextSibling;
	  }
	}
	
	function previousElement(node) {
	  while (node) {
	    if (node.nodeType === 1) {
	      return node;
	    }
	    node = node.previousSibling;
	  }
	}
	
	function linkParent(node, parent) {
	  node.parentNode = parent;
	  if (parent.docId) {
	    node.docId = parent.docId;
	    node.ownerDocument = parent.ownerDocument;
	    node.ownerDocument.nodeMap[node.nodeId] = node;
	    node.depth = parent.depth + 1;
	  }
	  node.children.forEach(function (child) {
	    linkParent(child, node);
	  });
	}
	
	function registerNode(docId, node) {
	  var doc = instanceMap[docId];
	  doc.nodeMap[node.nodeId] = node;
	}
	
	function insertIndex(target, list, newIndex, changeSibling) {
	  if (newIndex < 0) {
	    newIndex = 0;
	  }
	  var before = list[newIndex - 1];
	  var after = list[newIndex];
	  list.splice(newIndex, 0, target);
	  if (changeSibling) {
	    before && (before.nextSibling = target);
	    target.previousSibling = before;
	    target.nextSibling = after;
	    after && (after.previousSibling = target);
	  }
	  return newIndex;
	}
	
	function moveIndex(target, list, newIndex, changeSibling) {
	  var index = list.indexOf(target);
	  if (index < 0) {
	    return -1;
	  }
	  if (changeSibling) {
	    var before = list[index - 1];
	    var after = list[index + 1];
	    before && (before.nextSibling = after);
	    after && (after.previousSibling = before);
	  }
	  list.splice(index, 1);
	  var newIndexAfter = newIndex;
	  if (index <= newIndex) {
	    newIndexAfter = newIndex - 1;
	  }
	  var beforeNew = list[newIndexAfter - 1];
	  var afterNew = list[newIndexAfter];
	  list.splice(newIndexAfter, 0, target);
	  if (changeSibling) {
	    beforeNew && (beforeNew.nextSibling = target);
	    target.previousSibling = beforeNew;
	    target.nextSibling = afterNew;
	    afterNew && (afterNew.previousSibling = target);
	  }
	  if (index === newIndexAfter) {
	    return -1;
	  }
	  return newIndex;
	}
	
	function removeIndex(target, list, changeSibling) {
	  var index = list.indexOf(target);
	  if (index < 0) {
	    return;
	  }
	  if (changeSibling) {
	    var before = list[index - 1];
	    var after = list[index + 1];
	    before && (before.nextSibling = after);
	    after && (after.previousSibling = before);
	  }
	  list.splice(index, 1);
	}
	
	Element.prototype.setAttr = function (key, value, silent) {
	  if (this.attr[key] === value) {
	    return;
	  }
	  this.attr[key] = value;
	  if (!silent && this.docId) {
	    var listener = instanceMap[this.docId].listener;
	    listener.setAttr(this.ref, key, value);
	  }
	};
	
	Element.prototype.setStyle = function (key, value, silent) {
	  if (this.style[key] === value) {
	    return;
	  }
	  this.style[key] = value;
	  if (!silent && this.docId) {
	    var listener = instanceMap[this.docId].listener;
	    listener.setStyle(this.ref, key, value);
	  }
	};
	
	Element.prototype.setClassStyle = function (classStyle) {
	  this.classStyle = classStyle;
	  if (this.docId) {
	    var listener = instanceMap[this.docId].listener;
	    listener.setStyles(this.ref, this.toStyle());
	  }
	};
	
	Element.prototype.addEvent = function (type, handler) {
	  if (!this.event[type]) {
	    this.event[type] = handler;
	    if (this.docId) {
	      var listener = instanceMap[this.docId].listener;
	      listener.addEvent(this.ref, type);
	    }
	  }
	};
	
	Element.prototype.removeEvent = function (type) {
	  if (this.event[type]) {
	    delete this.event[type];
	    if (this.docId) {
	      var listener = instanceMap[this.docId].listener;
	      listener.removeEvent(this.ref, type);
	    }
	  }
	};
	
	Element.prototype.fireEvent = function (type, e) {
	  var handler = this.event[type];
	  if (handler) {
	    return handler.call(this, e);
	  }
	};
	
	Element.prototype.toStyle = function () {
	  return Object.assign({}, this.classStyle, this.style);
	};
	
	Element.prototype.toJSON = function () {
	  var result = {
	    ref: this.ref.toString(),
	    type: this.type,
	    attr: this.attr,
	    style: this.toStyle()
	  };
	  var event = Object.keys(this.event);
	  if (event.length) {
	    result.event = event;
	  }
	  if (this.pureChildren.length) {
	    result.children = this.pureChildren.map(function (child) {
	      return child.toJSON();
	    });
	  }
	  return result;
	};
	
	Element.prototype.toString = function () {
	  return '<' + this.type + ' attr=' + JSON.stringify(this.attr) + ' style=' + JSON.stringify(this.toStyle()) + '>' + this.pureChildren.map(function (child) {
	    return child.toString();
	  }).join('') + '</' + this.type + '>';
	};
	
	function Comment(value) {
	  this.nodeType = 8;
	  this.nodeId = (nextNodeRef++).toString();
	  this.ref = this.nodeId;
	  this.type = 'comment';
	  this.value = value;
	  this.children = [];
	  this.pureChildren = [];
	}
	
	Comment.prototype = new Node();
	
	Comment.prototype.toString = function () {
	  return '<!-- ' + this.value + ' -->';
	};

/***/ },
/* 68 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Listener;
	exports.createAction = createAction;
	function Listener(id, handler) {
	  this.id = id;
	  this.batched = false;
	  this.updates = [];
	  if (typeof handler === 'function') {
	    this.handler = handler;
	  }
	}
	
	Listener.prototype.createFinish = function (callback) {
	  var handler = this.handler;
	  return handler([createAction('createFinish', [])], callback);
	};
	
	Listener.prototype.updateFinish = function (callback) {
	  var handler = this.handler;
	  return handler([createAction('updateFinish', [])], callback);
	};
	
	Listener.prototype.refreshFinish = function (callback) {
	  var handler = this.handler;
	  return handler([createAction('refreshFinish', [])], callback);
	};
	
	Listener.prototype.createBody = function (element) {
	  var body = element.toJSON();
	  var children = body.children;
	  delete body.children;
	  var actions = [createAction('createBody', [body])];
	  if (children) {
	    actions.push.apply(actions, children.map(function (child) {
	      return createAction('addElement', [body.ref, child, -1]);
	    }));
	  }
	  return this.addActions(actions);
	};
	
	Listener.prototype.addElement = function (element, ref, index) {
	  if (!(index >= 0)) {
	    index = -1;
	  }
	  return this.addActions(createAction('addElement', [ref, element.toJSON(), index]));
	};
	
	Listener.prototype.removeElement = function (ref) {
	  if (Array.isArray(ref)) {
	    var actions = ref.map(function (r) {
	      return createAction('removeElement', [r]);
	    });
	    return this.addActions(actions);
	  }
	  return this.addActions(createAction('removeElement', [ref]));
	};
	
	Listener.prototype.moveElement = function (targetRef, parentRef, index) {
	  return this.addActions(createAction('moveElement', [targetRef, parentRef, index]));
	};
	
	Listener.prototype.setAttr = function (ref, key, value) {
	  var result = {};
	  result[key] = value;
	  return this.addActions(createAction('updateAttrs', [ref, result]));
	};
	
	Listener.prototype.setStyle = function (ref, key, value) {
	  var result = {};
	  result[key] = value;
	  return this.addActions(createAction('updateStyle', [ref, result]));
	};
	
	Listener.prototype.setStyles = function (ref, style) {
	  return this.addActions(createAction('updateStyle', [ref, style]));
	};
	
	Listener.prototype.addEvent = function (ref, type) {
	  return this.addActions(createAction('addEvent', [ref, type]));
	};
	
	Listener.prototype.removeEvent = function (ref, type) {
	  return this.addActions(createAction('removeEvent', [ref, type]));
	};
	
	Listener.prototype.handler = function (actions, cb) {
	  return cb && cb();
	};
	
	Listener.prototype.addActions = function (actions) {
	  var updates = this.updates;
	  var handler = this.handler;
	
	  if (!Array.isArray(actions)) {
	    actions = [actions];
	  }
	
	  if (this.batched) {
	    updates.push.apply(updates, actions);
	  } else {
	    return handler(actions);
	  }
	};
	
	function createAction(name, args) {
	  return { module: 'dom', method: name, args: args };
	}

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = {
		"name": "weex",
		"version": "0.4.0",
		"description": "A framework for building Mobile cross-platform UI",
		"license": "Apache-2.0",
		"repository": {
			"type": "git",
			"url": "git@github.com:alibaba/weex.git"
		},
		"homepage": "http://alibaba.github.io/weex/",
		"bugs": {
			"url": "https://github.com/alibaba/weex/issues"
		},
		"private": "true",
		"keywords": [
			"weex",
			"hybrid",
			"webcomponent",
			"appframework",
			"mvvm",
			"javascript",
			"webkit",
			"v8",
			"jscore",
			"html5",
			"android",
			"ios",
			"yunos"
		],
		"engines": {
			"node": ">=4"
		},
		"scripts": {
			"postinstall": "bash ./bin/install-hooks.sh",
			"build:browser": "webpack --config build/webpack.browser.config.js",
			"build:native": "webpack --config build/webpack.native.config.js",
			"build:examples": "webpack --config build/webpack.examples.config.js",
			"build:test": "webpack --config build/webpack.test.config.js",
			"dist:browser": "npm run build:browser && bash ./bin/dist-browser.sh",
			"dist": "npm run dist:browser",
			"dev:browser": "webpack --watch --config build/webpack.browser.config.js",
			"dev:native": "webpack --watch --config build/webpack.native.config.js",
			"dev:examples": "webpack --watch --config build/webpack.examples.config.js",
			"dev:test": "webpack --watch --config build/webpack.test.config.js",
			"build": "npm run build:native && npm run build:browser && npm run build:examples && npm run build:test",
			"lint": "eslint html5",
			"test:unit": "mocha --compilers js:babel-core/register html5/test/unit/*/*.js html5/test/unit/*/*/*.js",
			"test:cover": "babel-node node_modules/isparta/bin/isparta cover --report text node_modules/mocha/bin/_mocha -- --reporter dot html5/test/unit/*/*.js html5/test/unit/*/*/*.js",
			"test:e2e": "node html5/test/e2e/runner.js",
			"test": "npm run lint && npm run test:cover && npm run test:e2e",
			"serve": "serve ./ -p 12580",
			"clean:examples": "echo \"\\033[36;1m[Clean]\\033[0m \\033[33mexamples\\033[0m\" && rm -vrf examples/build/*",
			"clean:test": "echo \"\\033[36;1m[Clean]\\033[0m \\033[33mtest\\033[0m\" && rm -vrf test/build/*",
			"clean": "npm run clean:examples && npm run clean:test",
			"copy:js": "cp -vf ./dist/native.js ./android/sdk/assets/main.js",
			"copy:examples": "rm -rf ./android/playground/app/src/main/assets/* && cp -vrf ./examples/build/* ./android/playground/app/src/main/assets/",
			"copy": "npm run copy:js && npm run copy:examples"
		},
		"subversion": {
			"browser": "0.2.23",
			"framework": "0.10.13",
			"transformer": ">=0.1.5 <0.4"
		},
		"dependencies": {
			"animationjs": "^0.1.5",
			"carrousel": "^0.1.11",
			"core-js": "^2.4.0",
			"cubicbezier": "^0.1.1",
			"envd": "^0.1.1",
			"fixedsticky": "^0.1.0",
			"httpurl": "^0.1.1",
			"kountdown": "^0.1.2",
			"lazyimg": "^0.1.2",
			"lie": "^3.0.4",
			"modals": "^0.1.5",
			"scroll-to": "0.0.2",
			"semver": "^5.1.0",
			"transitionize": "0.0.3",
			"weex-components": "^0.1.3"
		},
		"devDependencies": {
			"babel-cli": "~6.4.5",
			"babel-loader": "^6.2.4",
			"babel-preset-es2015": "^6.9.0",
			"chai": "^3.5.0",
			"chromedriver": "^2.21.2",
			"cross-spawn": "^4.0.0",
			"css-loader": "^0.23.1",
			"eslint": "^2.11.1",
			"http-server": "^0.9.0",
			"isparta": "^4.0.0",
			"istanbul": "^0.4.3",
			"json-loader": "^0.5.4",
			"mocha": "^2.5.3",
			"nightwatch": "^0.9.4",
			"phantomjs-prebuilt": "^2.1.7",
			"selenium-server": "^2.53.0",
			"serve": "^1.4.0",
			"sinon": "^1.17.4",
			"sinon-chai": "^2.8.0",
			"style-loader": "^0.13.1",
			"uglify-js": "^2.6.4",
			"webpack": "^1.13.1",
			"weex-loader": "^0.2.0"
		}
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.$ = $;
	exports.$el = $el;
	exports.$vm = $vm;
	exports.$renderThen = $renderThen;
	exports.$scrollTo = $scrollTo;
	exports.$transition = $transition;
	exports.$getConfig = $getConfig;
	exports.$sendHttp = $sendHttp;
	exports.$openURL = $openURL;
	exports.$setTitle = $setTitle;
	exports.$call = $call;
	
	var _util = __webpack_require__(49);
	
	var _ = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 * ==========================================================
	 * common
	 * ==========================================================
	 */
	
	/**
	 * @deprecated use $vm instead
	 * find the vm by id
	 * Note: there is only one id in whole component
	 * @param  {string} id
	 * @return {Vm}
	 */
	function $(id) {
	  _.warn('Vm#$ is deprecated, please use Vm#$vm instead');
	  var info = this._ids[id];
	  if (info) {
	    return info.vm;
	  }
	}
	
	/**
	 * find the element by id
	 * Note: there is only one id in whole component
	 * @param  {string} id
	 * @return {Element}
	 */
	/**
	 * @fileOverview The api for invoking with "$" prefix
	 */
	function $el(id) {
	  var info = this._ids[id];
	  if (info) {
	    return info.el;
	  }
	}
	
	/**
	 * find the vm of the custom component by id
	 * Note: there is only one id in whole component
	 * @param  {string} id
	 * @return {Vm}
	 */
	function $vm(id) {
	  var info = this._ids[id];
	  if (info) {
	    return info.vm;
	  }
	}
	
	/**
	 * Fire when differ rendering finished
	 *
	 * @param  {Function} fn
	 */
	function $renderThen(fn) {
	  var app = this._app;
	  var differ = app.differ;
	  return differ.then(function () {
	    fn();
	  });
	}
	
	/**
	 * scroll an element specified by id into view,
	 * moreover specify a number of offset optionally
	 * @param  {string} id
	 * @param  {number} offset
	 */
	function $scrollTo(id, offset) {
	  _.warn('Vm#$scrollTo is deprecated, ' + 'please use "require(\'@weex-module/dom\')' + '.scrollTo(el, options)" instead');
	  var el = this.$el(id);
	  if (el) {
	    var dom = this._app.requireModule('dom');
	    dom.scrollToElement(el.ref, { offset: offset });
	  }
	}
	
	/**
	 * perform transition animation on an element specified by id
	 * @param  {string}   id
	 * @param  {object}   options
	 * @param  {object}   options.styles
	 * @param  {object}   options.duration(ms)
	 * @param  {object}   [options.timingFunction]
	 * @param  {object}   [options.delay=0(ms)]
	 * @param  {Function} callback
	 */
	function $transition(id, options, callback) {
	  var _this = this;
	
	  var el = this.$el(id);
	  if (el && options && options.styles) {
	    var animation = this._app.requireModule('animation');
	    animation.transition(el.ref, options, function () {
	      _this._setStyle(el, options.styles);
	      callback && callback.apply(undefined, arguments);
	    });
	  }
	}
	
	/**
	 * get some config
	 * @return {object} some config for app instance
	 * @property {string} bundleUrl
	 * @property {boolean} debug
	 * @property {object} env
	 * @property {string} env.weexVersion(ex. 1.0.0)
	 * @property {string} env.appName(ex. TB/TM)
	 * @property {string} env.appVersion(ex. 5.0.0)
	 * @property {string} env.platform(ex. iOS/Android)
	 * @property {string} env.osVersion(ex. 7.0.0)
	 * @property {string} env.deviceModel **native only**
	 * @property {number} env.[deviceWidth=750]
	 * @property {number} env.deviceHeight
	 */
	function $getConfig(callback) {
	  var config = _.extend({
	    env: global.WXEnvironment || {}
	  }, this._app.options);
	  if (_.typof(callback) === 'function') {
	    _.warn('the callback of Vm#$getConfig(callback) is deprecated, ' + 'this api now can directly RETURN config info.');
	    callback(config);
	  }
	  return config;
	}
	
	/**
	 * @deprecated
	 * request network via http protocol
	 * @param  {object}   params
	 * @param  {Function} callback
	 */
	function $sendHttp(params, callback) {
	  _.warn('Vm#$sendHttp is deprecated, ' + 'please use "require(\'@weex-module/stream\')' + '.sendHttp(params, callback)" instead');
	  var stream = this._app.requireModule('stream');
	  stream.sendHttp(params, callback);
	}
	
	/**
	 * @deprecated
	 * open a url
	 * @param  {string} url
	 */
	function $openURL(url) {
	  _.warn('Vm#$openURL is deprecated, ' + 'please use "require(\'@weex-module/event\')' + '.openURL(url)" instead');
	  var event = this._app.requireModule('event');
	  event.openURL(url);
	}
	
	/**
	 * @deprecated
	 * set a title for page
	 * @param  {string} title
	 */
	function $setTitle(title) {
	  _.warn('Vm#$setTitle is deprecated, ' + 'please use "require(\'@weex-module/pageInfo\')' + '.setTitle(title)" instead');
	  var pageInfo = this._app.requireModule('pageInfo');
	  pageInfo.setTitle(title);
	}
	
	/**
	 * @deprecated use "require('@weex-module/moduleName') instead"
	 * invoke a native method by specifing the name of module and method
	 * @param  {string} moduleName
	 * @param  {string} methodName
	 * @param  {...*} the rest arguments
	 */
	function $call(moduleName, methodName) {
	  _.warn('Vm#$call is deprecated, ' + 'please use "require(\'@weex-module/moduleName\')" instead');
	  var module = this._app.requireModule(moduleName);
	  if (module && module[methodName]) {
	    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	      args[_key - 2] = arguments[_key];
	    }
	
	    module[methodName].apply(module, args);
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 71 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.$userTrack = $userTrack;
	exports.$sendMtop = $sendMtop;
	exports.$callWindvane = $callWindvane;
	exports.$setSpm = $setSpm;
	exports.$getUserInfo = $getUserInfo;
	exports.$login = $login;
	exports.$logout = $logout;
	/**
	 * @fileOverview The api for invoking with "$" prefix
	 */
	
	/**
	 * ==========================================================
	 * private for ali
	 * ==========================================================
	 */
	
	/**
	 * invoke user-track on Taobao Moblie
	 * @param {string} type：enter, click, expose
	 * @param {string} name
	 * @param {string} comName
	 * @param {object} param
	*/
	function $userTrack(type, name, comName, param) {
	  var userTrack = this._app.requireModule('userTrack');
	  userTrack.commit(type, name, comName, param);
	}
	
	/**
	 * request a restfull api via the mtop gateway
	 * @param  {object}   params
	 * @param  {Function} callback
	 */
	function $sendMtop(params, callback) {
	  /* istanbul ignore else */
	  if (typeof window === 'undefined') {
	    // in native，use windvane
	    var windvane = this._app.requireModule('windvane');
	    windvane.call({
	      class: 'MtopWVPlugin',
	      method: 'send',
	      data: params
	    }, callback);
	  } else {
	    // in web brwoser，use stream.sendMtop
	    var stream = this._app.requireModule('stream');
	    stream.sendMtop(params, callback);
	  }
	}
	
	/**
	 * request a native api via windvane protocol
	 * @param  {object}   params
	 * @param  {Function} callback
	 */
	function $callWindvane(params, callback) {
	  var windvane = this._app.requireModule('windvane');
	  windvane.call(params, callback);
	}
	
	/**
	 * set spm for the page
	 * @param  {string} a
	 * @param  {string} b
	 */
	function $setSpm(a, b) {
	  var pageInfo = this._app.requireModule('pageInfo');
	  pageInfo.setSpm(a, b);
	}
	
	/**
	 * get the information of the current logined user
	 * @param  {Function} callback
	 */
	function $getUserInfo(callback) {
	  var user = this._app.requireModule('user');
	  user.getUserInfo(callback);
	}
	
	/**
	 * perform login
	 * @param  {Function} callback
	 */
	function $login(callback) {
	  var user = this._app.requireModule('user');
	  user.login(callback);
	}
	
	/**
	 * perform logout
	 * @param  {Function} callback
	 */
	function $logout(callback) {
	  var user = this._app.requireModule('user');
	  user.logout(callback);
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWYzYmFmYzliZDYzMDRhZjdiNjEiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3dlZXgvaHRtbDUvbmF0aXZlL2luZGV4LmpzIiwid2VicGFjazovLy8uLi93ZWV4L2h0bWw1L3NoYXJlZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vd2VleC9odG1sNS9zaGFyZWQvb2JqZWN0QXNzaWduLmpzIiwid2VicGFjazovLy8uLi93ZWV4L34vY29yZS1qcy9mbi9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uLi93ZWV4L34vY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy8uLi93ZWV4L34vY29yZS1qcy9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlZXgvfi9jb3JlLWpzL21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi4vd2VleC9+L2NvcmUtanMvbW9kdWxlcy9fY29yZS5qcyIsIndlYnBhY2s6Ly8vLi4vd2VleC9+L2NvcmUtanMvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vLi4vd2VleC9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uLi93ZWV4L34vY29yZS1qcy9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlZXgvfi9jb3JlLWpzL21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vd2VleC9+L2NvcmUtanMvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlZXgvfi9jb3JlLWpzL21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uLi93ZWV4L34vY29yZS1qcy9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi4vd2VleC9+L2NvcmUtanMvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi4vd2VleC9+L2NvcmUtanMvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovLy8uLi93ZWV4L34vY29yZS1qcy9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovLy8uLi93ZWV4L34vY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi4vd2VleC9+L2NvcmUtanMvbW9kdWxlcy9faGFzLmpzIiwid2VicGFjazovLy8uLi93ZWV4L34vY29yZS1qcy9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlZXgvfi9jb3JlLWpzL21vZHVsZXMvX2N0eC5qcyIsIndlYnBhY2s6Ly8vLi4vd2VleC9+L2NvcmUtanMvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi4vd2VleC9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi4vd2VleC9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlZXgvfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uLi93ZWV4L34vY29yZS1qcy9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwid2VicGFjazovLy8uLi93ZWV4L34vY29yZS1qcy9tb2R1bGVzL19pb2JqZWN0LmpzIiwid2VicGFjazovLy8uLi93ZWV4L34vY29yZS1qcy9tb2R1bGVzL19jb2YuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlZXgvfi9jb3JlLWpzL21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlZXgvfi9jb3JlLWpzL21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uLi93ZWV4L34vY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4uL3dlZXgvfi9jb3JlLWpzL21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlZXgvfi9jb3JlLWpzL21vZHVsZXMvX3RvLWluZGV4LmpzIiwid2VicGFjazovLy8uLi93ZWV4L34vY29yZS1qcy9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwid2VicGFjazovLy8uLi93ZWV4L34vY29yZS1qcy9tb2R1bGVzL19zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlZXgvfi9jb3JlLWpzL21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlZXgvfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwid2VicGFjazovLy8uLi93ZWV4L34vY29yZS1qcy9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwid2VicGFjazovLy8uLi93ZWV4L34vY29yZS1qcy9tb2R1bGVzL190by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlZXgvaHRtbDUvc2hhcmVkL3NldFRpbWVvdXQuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlZXgvaHRtbDUvc2hhcmVkL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlZXgvaHRtbDUvc2hhcmVkL2NvbnNvbGUuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlZXgvaHRtbDUvcnVudGltZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vd2VleC9odG1sNS9ydW50aW1lL2ZyYW1ld29ya3MuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlZXgvaHRtbDUvZGVmYXVsdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vd2VleC9odG1sNS9kZWZhdWx0L2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi4vd2VleC9odG1sNS9kZWZhdWx0L2FwcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vd2VleC9odG1sNS9kZWZhdWx0L3V0aWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3dlZXgvaHRtbDUvZGVmYXVsdC9hcHAvYnVuZGxlLmpzIiwid2VicGFjazovLy8uLi93ZWV4L34vc2VtdmVyL3NlbXZlci5qcyIsIndlYnBhY2s6Ly8vLi9+Ly5ucG1pbnN0YWxsL3Byb2Nlc3MvMC4xMS41L3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi4vd2VleC9odG1sNS9kZWZhdWx0L3ZtL2luZGV4LmpzIiwid2VicGFjazovLy8uLi93ZWV4L2h0bWw1L2RlZmF1bHQvY29yZS9zdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi4vd2VleC9odG1sNS9kZWZhdWx0L2NvcmUvd2F0Y2hlci5qcyIsIndlYnBhY2s6Ly8vLi4vd2VleC9odG1sNS9kZWZhdWx0L2NvcmUvZGVwLmpzIiwid2VicGFjazovLy8uLi93ZWV4L2h0bWw1L2RlZmF1bHQvY29yZS9vYnNlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi4vd2VleC9odG1sNS9kZWZhdWx0L2NvcmUvYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlZXgvaHRtbDUvZGVmYXVsdC92bS9jb21waWxlci5qcyIsIndlYnBhY2s6Ly8vLi4vd2VleC9odG1sNS9kZWZhdWx0L3ZtL2RpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi4vd2VleC9odG1sNS9kZWZhdWx0L3ZtL2RvbS1oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlZXgvaHRtbDUvZGVmYXVsdC92bS9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlZXgvaHRtbDUvZGVmYXVsdC9hcHAvcmVnaXN0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlZXgvaHRtbDUvZGVmYXVsdC9hcHAvZG93bmdyYWRlLmpzIiwid2VicGFjazovLy8uLi93ZWV4L2h0bWw1L2RlZmF1bHQvYXBwL2N0cmwuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlZXgvaHRtbDUvZGVmYXVsdC9hcHAvZGlmZmVyLmpzIiwid2VicGFjazovLy8uLi93ZWV4L2h0bWw1L3Zkb20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3dlZXgvaHRtbDUvdmRvbS9saXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi4vd2VleC9wYWNrYWdlLmpzb24iLCJ3ZWJwYWNrOi8vLy4uL3dlZXgvaHRtbDUvZGVmYXVsdC9hcGkvbWV0aG9kcy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvYXBpL21ldGhvZHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7Ozs7O0FBS0EsS0FBTSxVQUFVLG9CQUFRLEVBQVIsQ0FBaEI7ZUFDMEIsTTtLQUFuQixlLFdBQUEsZTs7QUFDUCxpQkFBZ0IsT0FBaEIsRTs7Ozs7Ozs7O0FDUEE7O0FBQ0E7Ozs7QUFDQTs7OztLQUVRLE0sdUJBQUEsTTtLQUFRLFcsdUJBQUEsVzs7NEJBRUwsVTtBQUNULFVBQU8sVUFBUCxJQUFxQixZQUFtQjtBQUN0QyxTQUFNLE1BQU0sa0JBQVEsVUFBUixxQ0FBWjtBQUNBLFNBQUksZUFBZSxLQUFuQixFQUEwQjtBQUN4QixlQUFRLEtBQVIsQ0FBYyxJQUFJLFFBQUosRUFBZDtBQUNEO0FBQ0QsWUFBTyxHQUFQO0FBQ0QsSUFORDs7O0FBREYsTUFBSyxJQUFNLFVBQVgsdUJBQWtDO0FBQUEsU0FBdkIsVUFBdUI7QUFRakM7O0FBRUQsUUFBTyxNQUFQLENBQWMsTUFBZCxFQUFzQjtBQUNwQixxQkFBa0IsTUFERTtBQUVwQiwyQkFBd0I7QUFGSixFQUF0Qjs7Ozs7QUFRQSxLQUFNLFVBQVUsb0JBQVEsRUFBUixDQUFoQjtlQUM0QixNO0tBQXBCLGUsV0FBQSxlOztBQUNSLGlCQUFnQixPQUFoQixFOzs7Ozs7Ozs7QUMxQkE7O0FBQ0E7O0FBQ0E7O0FBQ0EseUI7Ozs7Ozs7O0FDSEEsd0I7Ozs7Ozs7O0FDQUEscUJBQVEsQ0FBUjtBQUNBLFFBQU8sT0FBUCxHQUFpQixvQkFBUSxDQUFSLEVBQStCLE1BQS9CLENBQXNDLE1BQXZELEM7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QUssV0FBTCxDQUFpQixRQUFqQjtBQUNEOzs7Ozs7QUFNTSxVQUFTLE1BQVQsQ0FBZ0IsUUFBaEIsRUFBMEI7QUFDL0IsT0FBTSxPQUFPLEtBQUssSUFBTCxDQUFVLGFBQVYsQ0FBd0IsTUFBeEIsQ0FBYjtBQUNBLFFBQUssS0FBTCxDQUFXLFFBQVg7QUFDRDs7Ozs7O0FBTU0sVUFBUyxPQUFULENBQWlCLFFBQWpCLEVBQTJCO0FBQ2hDLE9BQU0sT0FBTyxLQUFLLElBQUwsQ0FBVSxhQUFWLENBQXdCLE1BQXhCLENBQWI7QUFDQSxRQUFLLE1BQUwsQ0FBWSxRQUFaO0FBQ0QsRSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZWYzYmFmYzliZDYzMDRhZjdiNjFcbiAqKi8iLCJpbXBvcnQgJ3dlZXgvaHRtbDUvbmF0aXZlJ1xuXG4vKipcbiAqIHJlZ2lzdGVyIG1ldGhvZHNcbiAqL1xuY29uc3QgbWV0aG9kcyA9IHJlcXVpcmUoJy4vbGliL2FwaS9tZXRob2RzJylcbmNvbnN0IHtyZWdpc3Rlck1ldGhvZHN9ID0gZ2xvYmFsXG5yZWdpc3Rlck1ldGhvZHMobWV0aG9kcylcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgJy4uL3NoYXJlZCdcbmltcG9ydCBydW50aW1lIGZyb20gJy4uL3J1bnRpbWUnXG5pbXBvcnQgeyBzdWJ2ZXJzaW9uIH0gZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJ1xuXG5jb25zdCB7IG5hdGl2ZSwgdHJhbnNmb3JtZXIgfSA9IHN1YnZlcnNpb25cblxuZm9yIChjb25zdCBtZXRob2ROYW1lIGluIHJ1bnRpbWUpIHtcbiAgZ2xvYmFsW21ldGhvZE5hbWVdID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICBjb25zdCByZXQgPSBydW50aW1lW21ldGhvZE5hbWVdKC4uLmFyZ3MpXG4gICAgaWYgKHJldCBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKHJldC50b1N0cmluZygpKVxuICAgIH1cbiAgICByZXR1cm4gcmV0XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihnbG9iYWwsIHtcbiAgZnJhbWV3b3JrVmVyc2lvbjogbmF0aXZlLFxuICBuZWVkVHJhbnNmb3JtZXJWZXJzaW9uOiB0cmFuc2Zvcm1lclxufSlcblxuLyoqXG4gKiByZWdpc3RlciBtZXRob2RzXG4gKi9cbmNvbnN0IG1ldGhvZHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0L2FwaS9tZXRob2RzJylcbmNvbnN0IHsgcmVnaXN0ZXJNZXRob2RzIH0gPSBnbG9iYWxcbnJlZ2lzdGVyTWV0aG9kcyhtZXRob2RzKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9odG1sNS9uYXRpdmUvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgJy4vb2JqZWN0QXNzaWduJ1xuaW1wb3J0ICcuL3NldFRpbWVvdXQnXG5pbXBvcnQgJy4vcHJvbWlzZSdcbmltcG9ydCAnLi9jb25zb2xlJ1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9odG1sNS9zaGFyZWQvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgJ2NvcmUtanMvZm4vb2JqZWN0L2Fzc2lnbidcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3dlZXgvaHRtbDUvc2hhcmVkL29iamVjdEFzc2lnbi5qc1xuICoqLyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9+L2NvcmUtanMvZm4vb2JqZWN0L2Fzc2lnbi5qc1xuICoqLyIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHthc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKX0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3dlZXgvfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanNcbiAqKi8iLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCByZWRlZmluZSAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIHx8IChnbG9iYWxbbmFtZV0gPSB7fSkgOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBleHBvcnRzICAgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KVxuICAgICwgZXhwUHJvdG8gID0gZXhwb3J0c1tQUk9UT1RZUEVdIHx8IChleHBvcnRzW1BST1RPVFlQRV0gPSB7fSlcbiAgICAsIGtleSwgb3duLCBvdXQsIGV4cDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gKG93biA/IHRhcmdldCA6IHNvdXJjZSlba2V5XTtcbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIGV4cCA9IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICBpZih0YXJnZXQpcmVkZWZpbmUodGFyZ2V0LCBrZXksIG91dCwgdHlwZSAmICRleHBvcnQuVSk7XG4gICAgLy8gZXhwb3J0XG4gICAgaWYoZXhwb3J0c1trZXldICE9IG91dCloaWRlKGV4cG9ydHMsIGtleSwgZXhwKTtcbiAgICBpZihJU19QUk9UTyAmJiBleHBQcm90b1trZXldICE9IG91dClleHBQcm90b1trZXldID0gb3V0O1xuICB9XG59O1xuZ2xvYmFsLmNvcmUgPSBjb3JlO1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YCBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi93ZWV4L34vY29yZS1qcy9tb2R1bGVzL19leHBvcnQuanNcbiAqKi8iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9+L2NvcmUtanMvbW9kdWxlcy9fZ2xvYmFsLmpzXG4gKiovIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMi40LjAnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3dlZXgvfi9jb3JlLWpzL21vZHVsZXMvX2NvcmUuanNcbiAqKi8iLCJ2YXIgZFAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9+L2NvcmUtanMvbW9kdWxlcy9faGlkZS5qc1xuICoqLyIsInZhciBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGRQICAgICAgICAgICAgID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyl7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZignZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKU9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4gKiovIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9+L2NvcmUtanMvbW9kdWxlcy9fYW4tb2JqZWN0LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3dlZXgvfi9jb3JlLWpzL21vZHVsZXMvX2lzLW9iamVjdC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcclxuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XHJcbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3dlZXgvfi9jb3JlLWpzL21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4gKiovIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9+L2NvcmUtanMvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi93ZWV4L34vY29yZS1qcy9tb2R1bGVzL19mYWlscy5qc1xuICoqLyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi93ZWV4L34vY29yZS1qcy9tb2R1bGVzL19kb20tY3JlYXRlLmpzXG4gKiovIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9+L2NvcmUtanMvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3dlZXgvfi9jb3JlLWpzL21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanNcbiAqKi8iLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBoYXMgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIFNSQyAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpKCdzcmMnKVxuICAsIFRPX1NUUklORyA9ICd0b1N0cmluZydcbiAgLCAkdG9TdHJpbmcgPSBGdW5jdGlvbltUT19TVFJJTkddXG4gICwgVFBMICAgICAgID0gKCcnICsgJHRvU3RyaW5nKS5zcGxpdChUT19TVFJJTkcpO1xuXG5yZXF1aXJlKCcuL19jb3JlJykuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuICR0b1N0cmluZy5jYWxsKGl0KTtcbn07XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE8sIGtleSwgdmFsLCBzYWZlKXtcbiAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2YgdmFsID09ICdmdW5jdGlvbic7XG4gIGlmKGlzRnVuY3Rpb24paGFzKHZhbCwgJ25hbWUnKSB8fCBoaWRlKHZhbCwgJ25hbWUnLCBrZXkpO1xuICBpZihPW2tleV0gPT09IHZhbClyZXR1cm47XG4gIGlmKGlzRnVuY3Rpb24paGFzKHZhbCwgU1JDKSB8fCBoaWRlKHZhbCwgU1JDLCBPW2tleV0gPyAnJyArIE9ba2V5XSA6IFRQTC5qb2luKFN0cmluZyhrZXkpKSk7XG4gIGlmKE8gPT09IGdsb2JhbCl7XG4gICAgT1trZXldID0gdmFsO1xuICB9IGVsc2Uge1xuICAgIGlmKCFzYWZlKXtcbiAgICAgIGRlbGV0ZSBPW2tleV07XG4gICAgICBoaWRlKE8sIGtleSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoT1trZXldKU9ba2V5XSA9IHZhbDtcbiAgICAgIGVsc2UgaGlkZShPLCBrZXksIHZhbCk7XG4gICAgfVxuICB9XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICByZXR1cm4gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyAmJiB0aGlzW1NSQ10gfHwgJHRvU3RyaW5nLmNhbGwodGhpcyk7XG59KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi93ZWV4L34vY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS5qc1xuICoqLyIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3dlZXgvfi9jb3JlLWpzL21vZHVsZXMvX2hhcy5qc1xuICoqLyIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3dlZXgvfi9jb3JlLWpzL21vZHVsZXMvX3VpZC5qc1xuICoqLyIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9+L2NvcmUtanMvbW9kdWxlcy9fY3R4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9+L2NvcmUtanMvbW9kdWxlcy9fYS1mdW5jdGlvbi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJylcbiAgLCBwSUUgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKVxuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsICRhc3NpZ24gID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgdmFyIEEgPSB7fVxuICAgICwgQiA9IHt9XG4gICAgLCBTID0gU3ltYm9sKClcbiAgICAsIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbihrKXsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCAgICAgPSB0b09iamVjdCh0YXJnZXQpXG4gICAgLCBhTGVuICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGluZGV4ID0gMVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZlxuICAgICwgaXNFbnVtICAgICA9IHBJRS5mO1xuICB3aGlsZShhTGVuID4gaW5kZXgpe1xuICAgIHZhciBTICAgICAgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSlcbiAgICAgICwga2V5cyAgID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKWlmKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qc1xuICoqLyIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxyXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXHJcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcclxuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3dlZXgvfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLmpzXG4gKiovIiwidmFyIGhhcyAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXHJcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcclxuICAsIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpXHJcbiAgLCBJRV9QUk9UTyAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgbmFtZXMpe1xyXG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxyXG4gICAgLCBpICAgICAgPSAwXHJcbiAgICAsIHJlc3VsdCA9IFtdXHJcbiAgICAsIGtleTtcclxuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XHJcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xyXG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKXtcclxuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanNcbiAqKi8iLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3dlZXgvfi9jb3JlLWpzL21vZHVsZXMvX3RvLWlvYmplY3QuanNcbiAqKi8iLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi93ZWV4L34vY29yZS1qcy9tb2R1bGVzL19pb2JqZWN0LmpzXG4gKiovIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi93ZWV4L34vY29yZS1qcy9tb2R1bGVzL19jb2YuanNcbiAqKi8iLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9+L2NvcmUtanMvbW9kdWxlcy9fZGVmaW5lZC5qc1xuICoqLyIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9MZW5ndGggID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCB0b0luZGV4ICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdCgkdGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpXG4gICAgICAsIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICBpZihJU19JTkNMVURFUyAmJiBlbCAhPSBlbCl3aGlsZShsZW5ndGggPiBpbmRleCl7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICBpZih2YWx1ZSAhPSB2YWx1ZSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSN0b0luZGV4IGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi93ZWV4L34vY29yZS1qcy9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qc1xuICoqLyIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3dlZXgvfi9jb3JlLWpzL21vZHVsZXMvX3RvLWxlbmd0aC5qc1xuICoqLyIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi93ZWV4L34vY29yZS1qcy9tb2R1bGVzL190by1pbnRlZ2VyLmpzXG4gKiovIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1heCAgICAgICA9IE1hdGgubWF4XG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi93ZWV4L34vY29yZS1qcy9tb2R1bGVzL190by1pbmRleC5qc1xuICoqLyIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpXHJcbiAgLCB1aWQgICAgPSByZXF1aXJlKCcuL191aWQnKTtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xyXG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9+L2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLWtleS5qc1xuICoqLyIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9+L2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLmpzXG4gKiovIiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xyXG5tb2R1bGUuZXhwb3J0cyA9IChcclxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xyXG4pLnNwbGl0KCcsJyk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9+L2NvcmUtanMvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qc1xuICoqLyIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanNcbiAqKi8iLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi93ZWV4L34vY29yZS1qcy9tb2R1bGVzL19vYmplY3QtcGllLmpzXG4gKiovIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3dlZXgvfi9jb3JlLWpzL21vZHVsZXMvX3RvLW9iamVjdC5qc1xuICoqLyIsImNvbnN0IHtcbiAgc2V0VGltZW91dCwgc2V0VGltZW91dE5hdGl2ZVxufSA9IGdsb2JhbFxuXG5jb25zdCBNU0cgPSAnVXNlIFwiZ2xvYmFsLnNldFRpbWVvdXRcIiAgaXMgdW5leHBlY3RlZCwgJyArXG4gICAgICAgICAgICAgICdwbGVhc2UgdXNlIHJlcXVpcmUoXCJAd2VleC1tb2R1bGVcIikuc2V0VGltZW91dCBpbnN0ZWFkLidcblxuLy8gZml4IG5vIHNldFRpbWVvdXQgb24gQW5kcm9pZCBWOFxuLyogaXN0YW5idWwgaWdub3JlIGlmICovXG5pZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICd1bmRlZmluZWQnICYmXG4gIHR5cGVvZiBzZXRUaW1lb3V0TmF0aXZlID09PSAnZnVuY3Rpb24nKSB7XG4gIGNvbnN0IHRpbWVvdXRNYXAgPSB7fVxuICBsZXQgdGltZW91dElkID0gMFxuICBnbG9iYWwuc2V0VGltZW91dCA9IChjYiwgdGltZSkgPT4ge1xuICAgIGNvbnNvbGUud2FybihNU0cpXG4gICAgdGltZW91dE1hcFsrK3RpbWVvdXRJZF0gPSBjYlxuICAgIHNldFRpbWVvdXROYXRpdmUodGltZW91dElkLnRvU3RyaW5nKCksIHRpbWUpXG4gIH1cbiAgZ2xvYmFsLnNldFRpbWVvdXRDYWxsYmFjayA9IChpZCkgPT4ge1xuICAgIGlmICh0eXBlb2YgdGltZW91dE1hcFtpZF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRpbWVvdXRNYXBbaWRdKClcbiAgICAgIGRlbGV0ZSB0aW1lb3V0TWFwW2lkXVxuICAgIH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9odG1sNS9zaGFyZWQvc2V0VGltZW91dC5qc1xuICoqLyIsImNvbnN0IE9yaWdpblByb21pc2UgPSBnbG9iYWwuUHJvbWlzZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge31cbmNvbnN0IE1TRyA9ICdVc2luZyBcIlByb21pc2VcIiBpcyB1bmV4cGVjdGVkJ1xuXG5jb25zdCBVbmV4cGVjdGVkUHJvbWlzZSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gIGNvbnNvbGUud2FybihNU0cpXG4gIHJldHVybiBuZXcgT3JpZ2luUHJvbWlzZSguLi5hcmdzKVxufVxuXG5jb25zdCBmbiA9IFsnYWxsJywgJ3JhY2UnLCAncmVzb2x2ZScsICdyZWplY3QnXVxuZm4uZm9yRWFjaChuID0+IHtcbiAgVW5leHBlY3RlZFByb21pc2Vbbl0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIGNvbnNvbGUud2FybihNU0cpXG4gICAgcmV0dXJuIE9yaWdpblByb21pc2Vbbl0gJiYgT3JpZ2luUHJvbWlzZVtuXSguLi5hcmdzKVxuICB9XG59KVxuXG5nbG9iYWwuUHJvbWlzZSA9IFVuZXhwZWN0ZWRQcm9taXNlXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi93ZWV4L2h0bWw1L3NoYXJlZC9wcm9taXNlLmpzXG4gKiovIiwiY29uc3QgeyBjb25zb2xlLCBuYXRpdmVMb2cgfSA9IGdsb2JhbFxuY29uc3QgTEVWRUxTID0gWydlcnJvcicsICd3YXJuJywgJ2luZm8nLCAnbG9nJywgJ2RlYnVnJ11cbmNvbnN0IGxldmVsTWFwID0ge31cblxuZ2VuZXJhdGVMZXZlbE1hcCgpXG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuaWYgKFxuICB0eXBlb2YgY29uc29sZSA9PT0gJ3VuZGVmaW5lZCcgfHwgLy8gQW5kcm9pZFxuICAoZ2xvYmFsLldYRW52aXJvbm1lbnQgJiYgZ2xvYmFsLldYRW52aXJvbm1lbnQucGxhdGZvcm0gPT09ICdpT1MnKSAvLyBpT1Ncbikge1xuICBnbG9iYWwuY29uc29sZSA9IHtcbiAgICBkZWJ1ZzogKC4uLmFyZ3MpID0+IHtcbiAgICAgIGlmIChjaGVja0xldmVsKCdkZWJ1ZycpKSB7IG5hdGl2ZUxvZyguLi5mb3JtYXQoYXJncyksICdfX0RFQlVHJykgfVxuICAgIH0sXG4gICAgbG9nOiAoLi4uYXJncykgPT4ge1xuICAgICAgaWYgKGNoZWNrTGV2ZWwoJ2xvZycpKSB7IG5hdGl2ZUxvZyguLi5mb3JtYXQoYXJncyksICdfX0xPRycpIH1cbiAgICB9LFxuICAgIGluZm86ICguLi5hcmdzKSA9PiB7XG4gICAgICBpZiAoY2hlY2tMZXZlbCgnaW5mbycpKSB7IG5hdGl2ZUxvZyguLi5mb3JtYXQoYXJncyksICdfX0lORk8nKSB9XG4gICAgfSxcbiAgICB3YXJuOiAoLi4uYXJncykgPT4ge1xuICAgICAgaWYgKGNoZWNrTGV2ZWwoJ3dhcm4nKSkgeyBuYXRpdmVMb2coLi4uZm9ybWF0KGFyZ3MpLCAnX19XQVJOJykgfVxuICAgIH0sXG4gICAgZXJyb3I6ICguLi5hcmdzKSA9PiB7XG4gICAgICBpZiAoY2hlY2tMZXZlbCgnZXJyb3InKSkgeyBuYXRpdmVMb2coLi4uZm9ybWF0KGFyZ3MpLCAnX19FUlJPUicpIH1cbiAgICB9XG4gIH1cbn1cbmVsc2UgeyAvLyBIVE1MNVxuICBjb25zdCB7IGRlYnVnLCBsb2csIGluZm8sIHdhcm4sIGVycm9yIH0gPSBjb25zb2xlXG4gIGNvbnNvbGUuX19vcmlfXyA9IHsgZGVidWcsIGxvZywgaW5mbywgd2FybiwgZXJyb3IgfVxuICBjb25zb2xlLmRlYnVnID0gKC4uLmFyZ3MpID0+IHtcbiAgICBpZiAoY2hlY2tMZXZlbCgnZGVidWcnKSkgeyBjb25zb2xlLl9fb3JpX18uZGVidWcuYXBwbHkoY29uc29sZSwgYXJncykgfVxuICB9XG4gIGNvbnNvbGUubG9nID0gKC4uLmFyZ3MpID0+IHtcbiAgICBpZiAoY2hlY2tMZXZlbCgnbG9nJykpIHsgY29uc29sZS5fX29yaV9fLmxvZy5hcHBseShjb25zb2xlLCBhcmdzKSB9XG4gIH1cbiAgY29uc29sZS5pbmZvID0gKC4uLmFyZ3MpID0+IHtcbiAgICBpZiAoY2hlY2tMZXZlbCgnaW5mbycpKSB7IGNvbnNvbGUuX19vcmlfXy5pbmZvLmFwcGx5KGNvbnNvbGUsIGFyZ3MpIH1cbiAgfVxuICBjb25zb2xlLndhcm4gPSAoLi4uYXJncykgPT4ge1xuICAgIGlmIChjaGVja0xldmVsKCd3YXJuJykpIHsgY29uc29sZS5fX29yaV9fLndhcm4uYXBwbHkoY29uc29sZSwgYXJncykgfVxuICB9XG4gIGNvbnNvbGUuZXJyb3IgPSAoLi4uYXJncykgPT4ge1xuICAgIGlmIChjaGVja0xldmVsKCdlcnJvcicpKSB7IGNvbnNvbGUuX19vcmlfXy5lcnJvci5hcHBseShjb25zb2xlLCBhcmdzKSB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVMZXZlbE1hcCAoKSB7XG4gIExFVkVMUy5mb3JFYWNoKGxldmVsID0+IHtcbiAgICBjb25zdCBsZXZlbEluZGV4ID0gTEVWRUxTLmluZGV4T2YobGV2ZWwpXG4gICAgbGV2ZWxNYXBbbGV2ZWxdID0ge31cbiAgICBMRVZFTFMuZm9yRWFjaCh0eXBlID0+IHtcbiAgICAgIGNvbnN0IHR5cGVJbmRleCA9IExFVkVMUy5pbmRleE9mKHR5cGUpXG4gICAgICBpZiAodHlwZUluZGV4IDw9IGxldmVsSW5kZXgpIHtcbiAgICAgICAgbGV2ZWxNYXBbbGV2ZWxdW3R5cGVdID0gdHJ1ZVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZSAodikge1xuICBjb25zdCB0eXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHYpXG4gIGlmICh0eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdbb2JqZWN0IG9iamVjdF0nKSB7XG4gICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpXG4gIH1cbiAgZWxzZSB7XG4gICAgdiA9IFN0cmluZyh2KVxuICB9XG4gIHJldHVybiB2XG59XG5cbmZ1bmN0aW9uIGNoZWNrTGV2ZWwgKHR5cGUpIHtcbiAgY29uc3QgbG9nTGV2ZWwgPSAoZ2xvYmFsLldYRW52aXJvbm1lbnQgJiYgZ2xvYmFsLldYRW52aXJvbm1lbnQubG9nTGV2ZWwpIHx8ICdsb2cnXG4gIHJldHVybiBsZXZlbE1hcFtsb2dMZXZlbF0gJiYgbGV2ZWxNYXBbbG9nTGV2ZWxdW3R5cGVdXG59XG5cbmZ1bmN0aW9uIGZvcm1hdCAoYXJncykge1xuICByZXR1cm4gYXJncy5tYXAodiA9PiBub3JtYWxpemUodikpXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi93ZWV4L2h0bWw1L3NoYXJlZC9jb25zb2xlLmpzXG4gKiovIiwiaW1wb3J0IGZyYW1ld29ya3MgZnJvbSAnLi9mcmFtZXdvcmtzJ1xuXG5pbXBvcnQgeyBEb2N1bWVudCwgRWxlbWVudCwgQ29tbWVudCB9IGZyb20gJy4uL3Zkb20nXG5cbmNvbnN0IGNvbmZpZyA9IHtcbiAgRG9jdW1lbnQsIEVsZW1lbnQsIENvbW1lbnQsXG4gIHNlbmRUYXNrcyAoLi4uYXJncykge1xuICAgIHJldHVybiBnbG9iYWwuY2FsbE5hdGl2ZSguLi5hcmdzKVxuICB9XG59XG5cbmZvciAoY29uc3QgbmFtZSBpbiBmcmFtZXdvcmtzKSB7XG4gIGNvbnN0IGZyYW1ld29yayA9IGZyYW1ld29ya3NbbmFtZV1cbiAgZnJhbWV3b3JrLmluaXQoY29uZmlnKVxufVxuXG5jb25zdCB2ZXJzaW9uUmVnRXhwID0gL15cXC9cXC8gKihcXHtbXlxcfV0qXFx9KSAqXFxyP1xcbi9cblxuZnVuY3Rpb24gY2hlY2tWZXJzaW9uIChjb2RlKSB7XG4gIGxldCBpbmZvXG4gIGNvbnN0IHJlc3VsdCA9IHZlcnNpb25SZWdFeHAuZXhlYyhjb2RlKVxuICBpZiAocmVzdWx0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGluZm8gPSBKU09OLnBhcnNlKHJlc3VsdFsxXSlcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuIGluZm9cbn1cblxuY29uc3QgaW5zdGFuY2VNYXAgPSB7fVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UgKGlkLCBjb2RlLCBjb25maWcsIGRhdGEpIHtcbiAgbGV0IGluZm8gPSBpbnN0YW5jZU1hcFtpZF1cbiAgaWYgKCFpbmZvKSB7XG4gICAgaW5mbyA9IGNoZWNrVmVyc2lvbihjb2RlKSB8fCB7fVxuICAgIGlmICghZnJhbWV3b3Jrc1tpbmZvLmZyYW1ld29ya10pIHtcbiAgICAgIGluZm8uZnJhbWV3b3JrID0gJ1dlZXgnXG4gICAgfVxuICAgIGluc3RhbmNlTWFwW2lkXSA9IGluZm9cbiAgICBjb25maWcgPSBjb25maWcgfHwge31cbiAgICBjb25maWcuYnVuZGxlVmVyc2lvbiA9IGluZm8udmVyc2lvblxuICAgIHJldHVybiBmcmFtZXdvcmtzW2luZm8uZnJhbWV3b3JrXS5jcmVhdGVJbnN0YW5jZShpZCwgY29kZSwgY29uZmlnLCBkYXRhKVxuICB9XG4gIHJldHVybiBuZXcgRXJyb3IoYGludmFsaWQgaW5zdGFuY2UgaWQgXCIke2lkfVwiYClcbn1cblxuY29uc3QgbWV0aG9kcyA9IHtcbiAgY3JlYXRlSW5zdGFuY2Vcbn1cblxuZnVuY3Rpb24gZ2VuSW5pdCAobWV0aG9kTmFtZSkge1xuICBtZXRob2RzW21ldGhvZE5hbWVdID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gZnJhbWV3b3Jrcykge1xuICAgICAgY29uc3QgZnJhbWV3b3JrID0gZnJhbWV3b3Jrc1tuYW1lXVxuICAgICAgaWYgKGZyYW1ld29yayAmJiBmcmFtZXdvcmtbbWV0aG9kTmFtZV0pIHtcbiAgICAgICAgZnJhbWV3b3JrW21ldGhvZE5hbWVdKC4uLmFyZ3MpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblsncmVnaXN0ZXJDb21wb25lbnRzJywgJ3JlZ2lzdGVyTW9kdWxlcycsICdyZWdpc3Rlck1ldGhvZHMnXS5mb3JFYWNoKGdlbkluaXQpXG5cbmZ1bmN0aW9uIGdlbkluc3RhbmNlIChtZXRob2ROYW1lKSB7XG4gIG1ldGhvZHNbbWV0aG9kTmFtZV0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIGNvbnN0IGlkID0gYXJnc1swXVxuICAgIGNvbnN0IGluZm8gPSBpbnN0YW5jZU1hcFtpZF1cbiAgICBpZiAoaW5mbyAmJiBmcmFtZXdvcmtzW2luZm8uZnJhbWV3b3JrXSkge1xuICAgICAgcmV0dXJuIGZyYW1ld29ya3NbaW5mby5mcmFtZXdvcmtdW21ldGhvZE5hbWVdKC4uLmFyZ3MpXG4gICAgfVxuICAgIHJldHVybiBuZXcgRXJyb3IoYGludmFsaWQgaW5zdGFuY2UgaWQgXCIke2lkfVwiYClcbiAgfVxufVxuXG5bJ2Rlc3Ryb3lJbnN0YW5jZScsICdyZWZyZXNoSW5zdGFuY2UnLCAnY2FsbEpTJywgJ2dldFJvb3QnXS5mb3JFYWNoKGdlbkluc3RhbmNlKVxuXG5tZXRob2RzLnJlY2VpdmVUYXNrcyA9IG1ldGhvZHMuY2FsbEpTXG5cbmV4cG9ydCBkZWZhdWx0IG1ldGhvZHNcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3dlZXgvaHRtbDUvcnVudGltZS9pbmRleC5qc1xuICoqLyIsImltcG9ydCAqIGFzIFdlZXggZnJvbSAnLi4vZGVmYXVsdCdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBXZWV4XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi93ZWV4L2h0bWw1L3J1bnRpbWUvZnJhbWV3b3Jrcy5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlldyBNYWluIGVudHJ5LCBpbnN0YW5jZSBtYW5hZ2VyXG4gKlxuICogLSBjcmVhdGVJbnN0YW5jZShpbnN0YW5jZUlkLCBjb2RlLCBvcHRpb25zLCBkYXRhKVxuICogLSByZWZyZXNoSW5zdGFuY2UoaW5zdGFuY2VJZCwgZGF0YSlcbiAqIC0gZGVzdHJveUluc3RhbmNlKGluc3RhbmNlSWQpXG4gKiAtIHJlZ2lzdGVyQ29tcG9uZW50cyhjb21wb25lbnRzKVxuICogLSByZWdpc3Rlck1vZHVsZXMobW9kdWxlcylcbiAqIC0gZ2V0Um9vdChpbnN0YW5jZUlkKVxuICogLSBpbnN0YW5jZU1hcFxuICogLSBjYWxsSlMoaW5zdGFuY2VJZCwgdGFza3MpXG4gKiAgIC0gZmlyZUV2ZW50KHJlZiwgdHlwZSwgZGF0YSlcbiAqICAgLSBjYWxsYmFjayhmdW5jSWQsIGRhdGEpXG4gKi9cblxuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZydcbmltcG9ydCBBcHBJbnN0YW5jZSBmcm9tICcuL2FwcCdcbmltcG9ydCBWbSBmcm9tICcuL3ZtJ1xuXG5jb25zdCB7XG4gIG5hdGl2ZUNvbXBvbmVudE1hcFxufSA9IGNvbmZpZ1xuY29uc3QgaW5zdGFuY2VNYXAgPSB7fVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCAoY2ZnKSB7XG4gIGNvbmZpZy5Eb2N1bWVudCA9IGNmZy5Eb2N1bWVudFxuICBjb25maWcuRWxlbWVudCA9IGNmZy5FbGVtZW50XG4gIGNvbmZpZy5Db21tZW50ID0gY2ZnLkNvbW1lbnRcbiAgY29uZmlnLnNlbmRUYXNrcyA9IGNmZy5zZW5kVGFza3Ncbn1cblxuLyoqXG4gKiBjcmVhdGUgYSBXZWV4IGluc3RhbmNlXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBpbnN0YW5jZUlkXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGNvZGVcbiAqIEBwYXJhbSAge29iamVjdH0gW29wdGlvbnNdIG9wdGlvbiBgSEFTX0xPR2AgZW5hYmxlIHByaW50IGxvZ1xuICogQHBhcmFtICB7b2JqZWN0fSBbZGF0YV1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlIChpbnN0YW5jZUlkLCBjb2RlLCBvcHRpb25zLCBkYXRhKSB7XG4gIGxldCBpbnN0YW5jZSA9IGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cbiAgY29uZmlnLmRlYnVnID0gb3B0aW9ucy5kZWJ1Z1xuXG4gIGxldCByZXN1bHRcbiAgaWYgKCFpbnN0YW5jZSkge1xuICAgIGluc3RhbmNlID0gbmV3IEFwcEluc3RhbmNlKGluc3RhbmNlSWQsIG9wdGlvbnMpXG4gICAgaW5zdGFuY2VNYXBbaW5zdGFuY2VJZF0gPSBpbnN0YW5jZVxuICAgIHJlc3VsdCA9IGluc3RhbmNlLmluaXQoY29kZSwgZGF0YSlcbiAgfVxuICBlbHNlIHtcbiAgICByZXN1bHQgPSBuZXcgRXJyb3IoYGludmFsaWQgaW5zdGFuY2UgaWQgXCIke2luc3RhbmNlSWR9XCJgKVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vKipcbiAqIHJlZnJlc2ggYSBXZWV4IGluc3RhbmNlXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBpbnN0YW5jZUlkXG4gKiBAcGFyYW0gIHtvYmplY3R9IGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZnJlc2hJbnN0YW5jZSAoaW5zdGFuY2VJZCwgZGF0YSkge1xuICBjb25zdCBpbnN0YW5jZSA9IGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gIGxldCByZXN1bHRcbiAgaWYgKGluc3RhbmNlKSB7XG4gICAgcmVzdWx0ID0gaW5zdGFuY2UucmVmcmVzaERhdGEoZGF0YSlcbiAgfVxuICBlbHNlIHtcbiAgICByZXN1bHQgPSBuZXcgRXJyb3IoYGludmFsaWQgaW5zdGFuY2UgaWQgXCIke2luc3RhbmNlSWR9XCJgKVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuLyoqXG4gKiBkZXN0cm95IGEgV2VleCBpbnN0YW5jZVxuICogQHBhcmFtICB7c3RyaW5nfSBpbnN0YW5jZUlkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95SW5zdGFuY2UgKGluc3RhbmNlSWQpIHtcbiAgY29uc3QgaW5zdGFuY2UgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICBpZiAoIWluc3RhbmNlKSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcihgaW52YWxpZCBpbnN0YW5jZSBpZCBcIiR7aW5zdGFuY2VJZH1cImApXG4gIH1cblxuICBpbnN0YW5jZS5kZXN0cm95KClcbiAgZGVsZXRlIGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gIHJldHVybiBpbnN0YW5jZU1hcFxufVxuXG4vKipcbiAqIHJlZ2lzdGVyIHRoZSBuYW1lIG9mIGVhY2ggbmF0aXZlIGNvbXBvbmVudFxuICogQHBhcmFtICB7YXJyYXl9IGNvbXBvbmVudHMgYXJyYXkgb2YgbmFtZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJDb21wb25lbnRzIChjb21wb25lbnRzKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGNvbXBvbmVudHMpKSB7XG4gICAgY29tcG9uZW50cy5mb3JFYWNoKGZ1bmN0aW9uIHJlZ2lzdGVyIChuYW1lKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmICghbmFtZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbmF0aXZlQ29tcG9uZW50TWFwW25hbWVdID0gdHJ1ZVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZW9mIG5hbWUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBuYW1lLnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG5hdGl2ZUNvbXBvbmVudE1hcFtuYW1lLnR5cGVdID0gbmFtZVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuLyoqXG4gKiByZWdpc3RlciB0aGUgbmFtZSBhbmQgbWV0aG9kcyBvZiBlYWNoIG1vZHVsZVxuICogQHBhcmFtICB7b2JqZWN0fSBtb2R1bGVzIGEgb2JqZWN0IG9mIG1vZHVsZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTW9kdWxlcyAobW9kdWxlcykge1xuICBpZiAodHlwZW9mIG1vZHVsZXMgPT09ICdvYmplY3QnKSB7XG4gICAgVm0ucmVnaXN0ZXJNb2R1bGVzKG1vZHVsZXMpXG4gIH1cbn1cblxuLyoqXG4gKiByZWdpc3RlciB0aGUgbmFtZSBhbmQgbWV0aG9kcyBvZiBlYWNoIGFwaVxuICogQHBhcmFtICB7b2JqZWN0fSBhcGlzIGEgb2JqZWN0IG9mIGFwaXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTWV0aG9kcyAoYXBpcykge1xuICBpZiAodHlwZW9mIGFwaXMgPT09ICdvYmplY3QnKSB7XG4gICAgVm0ucmVnaXN0ZXJNZXRob2RzKGFwaXMpXG4gIH1cbn1cblxuLyoqXG4gKiBnZXQgYSB3aG9sZSBlbGVtZW50IHRyZWUgb2YgYW4gaW5zdGFuY2VcbiAqIGZvciBkZWJ1Z2dpbmdcbiAqIEBwYXJhbSAge3N0cmluZ30gaW5zdGFuY2VJZFxuICogQHJldHVybiB7b2JqZWN0fSBhIHZpcnR1YWwgZG9tIHRyZWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJvb3QgKGluc3RhbmNlSWQpIHtcbiAgY29uc3QgaW5zdGFuY2UgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICBsZXQgcmVzdWx0XG4gIGlmIChpbnN0YW5jZSkge1xuICAgIHJlc3VsdCA9IGluc3RhbmNlLmdldFJvb3RFbGVtZW50KClcbiAgfVxuICBlbHNlIHtcbiAgICByZXN1bHQgPSBuZXcgRXJyb3IoYGludmFsaWQgaW5zdGFuY2UgaWQgXCIke2luc3RhbmNlSWR9XCJgKVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuY29uc3QganNIYW5kbGVycyA9IHtcbiAgZmlyZUV2ZW50OiBmdW5jdGlvbiBmaXJlRXZlbnQgKGluc3RhbmNlSWQsIHJlZiwgdHlwZSwgZGF0YSwgZG9tQ2hhbmdlcykge1xuICAgIGNvbnN0IGluc3RhbmNlID0gaW5zdGFuY2VNYXBbaW5zdGFuY2VJZF1cbiAgICByZXR1cm4gaW5zdGFuY2UuZmlyZUV2ZW50KHJlZiwgdHlwZSwgZGF0YSwgZG9tQ2hhbmdlcylcbiAgfSxcblxuICBjYWxsYmFjazogZnVuY3Rpb24gY2FsbGJhY2sgKGluc3RhbmNlSWQsIGZ1bmNJZCwgZGF0YSwgaWZMYXN0KSB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICAgIHJldHVybiBpbnN0YW5jZS5jYWxsYmFjayhmdW5jSWQsIGRhdGEsIGlmTGFzdClcbiAgfVxufVxuXG4vKipcbiAqIGFjY2VwdCBjYWxscyBmcm9tIG5hdGl2ZSAoZXZlbnQgb3IgY2FsbGJhY2spXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBpbnN0YW5jZUlkXG4gKiBAcGFyYW0gIHthcnJheX0gdGFza3MgbGlzdCB3aXRoIGBtZXRob2RgIGFuZCBgYXJnc2BcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbGxKUyAoaW5zdGFuY2VJZCwgdGFza3MpIHtcbiAgY29uc3QgaW5zdGFuY2UgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICBpZiAoaW5zdGFuY2UgJiYgQXJyYXkuaXNBcnJheSh0YXNrcykpIHtcbiAgICBjb25zdCByZXN1bHRzID0gW11cbiAgICB0YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICBjb25zdCBoYW5kbGVyID0ganNIYW5kbGVyc1t0YXNrLm1ldGhvZF1cbiAgICAgIGNvbnN0IGFyZ3MgPSBbLi4udGFzay5hcmdzXVxuICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGFyZ3MudW5zaGlmdChpbnN0YW5jZUlkKVxuICAgICAgICByZXN1bHRzLnB1c2goaGFuZGxlciguLi5hcmdzKSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiByZXN1bHRzXG4gIH1cbiAgcmV0dXJuIG5ldyBFcnJvcihgaW52YWxpZCBpbnN0YW5jZSBpZCBcIiR7aW5zdGFuY2VJZH1cIiBvciB0YXNrc2ApXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi93ZWV4L2h0bWw1L2RlZmF1bHQvaW5kZXguanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCB7XG4gIG5hdGl2ZUNvbXBvbmVudE1hcDoge1xuICAgIHRleHQ6IHRydWUsXG4gICAgaW1hZ2U6IHRydWUsXG4gICAgY29udGFpbmVyOiB0cnVlLFxuICAgIHNsaWRlcjoge1xuICAgICAgdHlwZTogJ3NsaWRlcicsXG4gICAgICBhcHBlbmQ6ICd0cmVlJ1xuICAgIH0sXG4gICAgY2VsbDoge1xuICAgICAgdHlwZTogJ2NlbGwnLFxuICAgICAgYXBwZW5kOiAndHJlZSdcbiAgICB9XG4gIH0sXG4gIGN1c3RvbUNvbXBvbmVudE1hcDoge30sXG4gIGRlYnVnOiBmYWxzZVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9odG1sNS9kZWZhdWx0L2NvbmZpZy5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlld1xuICogV2VleCBpbnN0YW5jZSBjb25zdHJ1Y3RvciAmIGRlZmluaXRpb25cbiAqL1xuXG5pbXBvcnQgeyBleHRlbmQsIHR5cG9mIH0gZnJvbSAnLi4vdXRpbCdcbmltcG9ydCAqIGFzIGJ1bmRsZSBmcm9tICcuL2J1bmRsZSdcbmltcG9ydCAqIGFzIGN0cmwgZnJvbSAnLi9jdHJsJ1xuaW1wb3J0IERpZmZlciBmcm9tICcuL2RpZmZlcidcblxuaW1wb3J0IHJlbmRlcmVyIGZyb20gJy4uL2NvbmZpZydcbmltcG9ydCB7IHJlZ2lzdGVyQ29tcG9uZW50LCByZXF1aXJlQ29tcG9uZW50LCByZXF1aXJlTW9kdWxlIH0gZnJvbSAnLi9yZWdpc3RlcidcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwSW5zdGFuY2UgKGluc3RhbmNlSWQsIG9wdGlvbnMpIHtcbiAgdGhpcy5pZCA9IGluc3RhbmNlSWRcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICB0aGlzLnZtID0gbnVsbFxuICB0aGlzLmN1c3RvbUNvbXBvbmVudE1hcCA9IHt9XG4gIHRoaXMuY2FsbGJhY2tzID0ge31cbiAgdGhpcy5kb2MgPSBuZXcgcmVuZGVyZXIuRG9jdW1lbnQoXG4gICAgaW5zdGFuY2VJZCxcbiAgICB0aGlzLm9wdGlvbnMuYnVuZGxlVXJsXG4gIClcbiAgdGhpcy5kaWZmZXIgPSBuZXcgRGlmZmVyKGluc3RhbmNlSWQpXG4gIHRoaXMudWlkID0gMFxufVxuXG5mdW5jdGlvbiBub3JtYWxpemUgKGFwcCwgdikge1xuICBjb25zdCB0eXBlID0gdHlwb2YodilcblxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgIGNhc2UgJ251bGwnOlxuICAgICAgcmV0dXJuICcnXG4gICAgY2FzZSAncmVnZXhwJzpcbiAgICAgIHJldHVybiB2LnRvU3RyaW5nKClcbiAgICBjYXNlICdkYXRlJzpcbiAgICAgIHJldHVybiB2LnRvSVNPU3RyaW5nKClcbiAgICBjYXNlICdudW1iZXInOlxuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgY2FzZSAnYXJyYXknOlxuICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICBpZiAodiBpbnN0YW5jZW9mIHJlbmRlcmVyLkVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHYucmVmXG4gICAgICB9XG4gICAgICByZXR1cm4gdlxuICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgIGFwcC5jYWxsYmFja3NbKythcHAudWlkXSA9IHZcbiAgICAgIHJldHVybiBhcHAudWlkLnRvU3RyaW5nKClcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpXG4gIH1cbn1cblxuQXBwSW5zdGFuY2UucHJvdG90eXBlLmNhbGxUYXNrcyA9IGZ1bmN0aW9uICh0YXNrcykge1xuICBpZiAodHlwb2YodGFza3MpICE9PSAnYXJyYXknKSB7XG4gICAgdGFza3MgPSBbdGFza3NdXG4gIH1cblxuICB0YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgdGFzay5hcmdzID0gdGFzay5hcmdzLm1hcChhcmcgPT4gbm9ybWFsaXplKHRoaXMsIGFyZykpXG4gIH0pXG5cbiAgcmV0dXJuIHJlbmRlcmVyLnNlbmRUYXNrcyh0aGlzLmlkLCB0YXNrcywgJy0xJylcbn1cblxuZXh0ZW5kKEFwcEluc3RhbmNlLnByb3RvdHlwZSwgYnVuZGxlLCBjdHJsLCB7XG4gIHJlZ2lzdGVyQ29tcG9uZW50LFxuICByZXF1aXJlQ29tcG9uZW50LFxuICByZXF1aXJlTW9kdWxlXG59KVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi93ZWV4L2h0bWw1L2RlZmF1bHQvYXBwL2luZGV4LmpzXG4gKiovIiwiLyogZ2xvYmFsIE11dGF0aW9uT2JzZXJ2ZXIgKi9cblxuLy8gLyBsYW5nLmpzXG5cbi8qKlxuICogQ2hlY2sgaWYgYSBzdHJpbmcgc3RhcnRzIHdpdGggJCBvciBfXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaXNSZXNlcnZlZCAoc3RyKSB7XG4gIGNvbnN0IGMgPSAoc3RyICsgJycpLmNoYXJDb2RlQXQoMClcbiAgcmV0dXJuIGMgPT09IDB4MjQgfHwgYyA9PT0gMHg1RlxufVxuXG4vKipcbiAqIERlZmluZSBhIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtlbnVtZXJhYmxlXVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkZWYgKG9iaiwga2V5LCB2YWwsIGVudW1lcmFibGUpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgdmFsdWU6IHZhbCxcbiAgICBlbnVtZXJhYmxlOiAhIWVudW1lcmFibGUsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pXG59XG5cbi8vIC8gZW52LmpzXG5cbi8vIGNhbiB3ZSB1c2UgX19wcm90b19fP1xuZXhwb3J0IGNvbnN0IGhhc1Byb3RvID0gJ19fcHJvdG9fXycgaW4ge31cblxuLy8gQnJvd3NlciBlbnZpcm9ubWVudCBzbmlmZmluZ1xuZXhwb3J0IGNvbnN0IGluQnJvd3NlciA9XG4gIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh3aW5kb3cpICE9PSAnW29iamVjdCBPYmplY3RdJ1xuXG4vLyBkZXRlY3QgZGV2dG9vbHNcbmV4cG9ydCBjb25zdCBkZXZ0b29scyA9IGluQnJvd3NlciAmJiB3aW5kb3cuX19WVUVfREVWVE9PTFNfR0xPQkFMX0hPT0tfX1xuXG4vLyBVQSBzbmlmZmluZyBmb3Igd29ya2luZyBhcm91bmQgYnJvd3Nlci1zcGVjaWZpYyBxdWlya3NcbmNvbnN0IFVBID0gaW5Ccm93c2VyICYmIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKClcbmNvbnN0IGlzSW9zID0gVUEgJiYgLyhpcGhvbmV8aXBhZHxpcG9kfGlvcykvaS50ZXN0KFVBKVxuY29uc3QgaXNXZWNoYXQgPSBVQSAmJiBVQS5pbmRleE9mKCdtaWNyb21lc3NlbmdlcicpID4gMFxuXG4vKipcbiAqIERlZmVyIGEgdGFzayB0byBleGVjdXRlIGl0IGFzeW5jaHJvbm91c2x5LiBJZGVhbGx5IHRoaXNcbiAqIHNob3VsZCBiZSBleGVjdXRlZCBhcyBhIG1pY3JvdGFzaywgc28gd2UgbGV2ZXJhZ2VcbiAqIE11dGF0aW9uT2JzZXJ2ZXIgaWYgaXQncyBhdmFpbGFibGUsIGFuZCBmYWxsYmFjayB0b1xuICogc2V0VGltZW91dCgwKS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuICogQHBhcmFtIHtPYmplY3R9IGN0eFxuICovXG5cbmV4cG9ydCBjb25zdCBuZXh0VGljayA9IChmdW5jdGlvbiAoKSB7XG4gIGxldCBjYWxsYmFja3MgPSBbXVxuICBsZXQgcGVuZGluZyA9IGZhbHNlXG4gIGxldCB0aW1lckZ1bmNcbiAgZnVuY3Rpb24gbmV4dFRpY2tIYW5kbGVyICgpIHtcbiAgICBwZW5kaW5nID0gZmFsc2VcbiAgICBjb25zdCBjb3BpZXMgPSBjYWxsYmFja3Muc2xpY2UoMClcbiAgICBjYWxsYmFja3MgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29waWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb3BpZXNbaV0oKVxuICAgIH1cbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAodHlwZW9mIE11dGF0aW9uT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnICYmICEoaXNXZWNoYXQgJiYgaXNJb3MpKSB7XG4gICAgbGV0IGNvdW50ZXIgPSAxXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihuZXh0VGlja0hhbmRsZXIpXG4gICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb3VudGVyKVxuICAgIG9ic2VydmVyLm9ic2VydmUodGV4dE5vZGUsIHtcbiAgICAgIGNoYXJhY3RlckRhdGE6IHRydWVcbiAgICB9KVxuICAgIHRpbWVyRnVuYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvdW50ZXIgPSAoY291bnRlciArIDEpICUgMlxuICAgICAgdGV4dE5vZGUuZGF0YSA9IGNvdW50ZXJcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gd2VicGFjayBhdHRlbXB0cyB0byBpbmplY3QgYSBzaGltIGZvciBzZXRJbW1lZGlhdGVcbiAgICAvLyBpZiBpdCBpcyB1c2VkIGFzIGEgZ2xvYmFsLCBzbyB3ZSBoYXZlIHRvIHdvcmsgYXJvdW5kIHRoYXQgdG9cbiAgICAvLyBhdm9pZCBidW5kbGluZyB1bm5lY2Vzc2FyeSBjb2RlLlxuICAgIGNvbnN0IGNvbnRleHQgPSBpbkJyb3dzZXJcbiAgICAgID8gd2luZG93XG4gICAgICA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDoge31cbiAgICB0aW1lckZ1bmMgPSBjb250ZXh0LnNldEltbWVkaWF0ZSB8fCBzZXRUaW1lb3V0XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIChjYiwgY3R4KSB7XG4gICAgY29uc3QgZnVuYyA9IGN0eFxuICAgICAgPyBmdW5jdGlvbiAoKSB7IGNiLmNhbGwoY3R4KSB9XG4gICAgICA6IGNiXG4gICAgY2FsbGJhY2tzLnB1c2goZnVuYylcbiAgICBpZiAocGVuZGluZykgcmV0dXJuXG4gICAgcGVuZGluZyA9IHRydWVcbiAgICB0aW1lckZ1bmMobmV4dFRpY2tIYW5kbGVyLCAwKVxuICB9XG59KSgpXG5cbmxldCBfU2V0XG4vKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbmlmICh0eXBlb2YgU2V0ICE9PSAndW5kZWZpbmVkJyAmJiBTZXQudG9TdHJpbmcoKS5tYXRjaCgvbmF0aXZlIGNvZGUvKSkge1xuICAvLyB1c2UgbmF0aXZlIFNldCB3aGVuIGF2YWlsYWJsZS5cbiAgX1NldCA9IFNldFxufVxuZWxzZSB7XG4gIC8vIGEgbm9uLXN0YW5kYXJkIFNldCBwb2x5ZmlsbCB0aGF0IG9ubHkgd29ya3Mgd2l0aCBwcmltaXRpdmUga2V5cy5cbiAgX1NldCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldCA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgfVxuICBfU2V0LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuc2V0W2tleV0gIT09IHVuZGVmaW5lZFxuICB9XG4gIF9TZXQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICB0aGlzLnNldFtrZXldID0gMVxuICB9XG4gIF9TZXQucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0ID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICB9XG59XG5cbmV4cG9ydCB7IF9TZXQgfVxuXG4vLyAvIHNoYXJlZFxuXG4vKipcbiAqIFJlbW92ZSBhbiBpdGVtIGZyb20gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqIEBwYXJhbSB7Kn0gaXRlbVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUgKGFyciwgaXRlbSkge1xuICBpZiAoYXJyLmxlbmd0aCkge1xuICAgIGNvbnN0IGluZGV4ID0gYXJyLmluZGV4T2YoaXRlbSlcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgcmV0dXJuIGFyci5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciB0aGUgb2JqZWN0IGhhcyB0aGUgcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuY29uc3QgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5XG5leHBvcnQgZnVuY3Rpb24gaGFzT3duIChvYmosIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSlcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBjYWNoZWQgdmVyc2lvbiBvZiBhIHB1cmUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjYWNoZWQgKGZuKSB7XG4gIGNvbnN0IGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICByZXR1cm4gZnVuY3Rpb24gY2FjaGVkRm4gKHN0cikge1xuICAgIGNvbnN0IGhpdCA9IGNhY2hlW3N0cl1cbiAgICByZXR1cm4gaGl0IHx8IChjYWNoZVtzdHJdID0gZm4oc3RyKSlcbiAgfVxufVxuXG4vKipcbiAqIENhbWVsaXplIGEgaHlwaGVuLWRlbG1pdGVkIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuY29uc3QgY2FtZWxpemVSRSA9IC8tKFxcdykvZ1xuZXhwb3J0IGNvbnN0IGNhbWVsaXplID0gY2FjaGVkKHN0ciA9PiB7XG4gIHJldHVybiBzdHIucmVwbGFjZShjYW1lbGl6ZVJFLCB0b1VwcGVyKVxufSlcblxuZnVuY3Rpb24gdG9VcHBlciAoXywgYykge1xuICByZXR1cm4gYyA/IGMudG9VcHBlckNhc2UoKSA6ICcnXG59XG5cbi8qKlxuICogSHlwaGVuYXRlIGEgY2FtZWxDYXNlIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuY29uc3QgaHlwaGVuYXRlUkUgPSAvKFthLXpcXGRdKShbQS1aXSkvZ1xuZXhwb3J0IGNvbnN0IGh5cGhlbmF0ZSA9IGNhY2hlZChzdHIgPT4ge1xuICByZXR1cm4gc3RyXG4gICAgLnJlcGxhY2UoaHlwaGVuYXRlUkUsICckMS0kMicpXG4gICAgLnRvTG93ZXJDYXNlKClcbn0pXG5cbi8qKlxuICogU2ltcGxlIGJpbmQsIGZhc3RlciB0aGFuIG5hdGl2ZVxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge09iamVjdH0gY3R4XG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYmluZCAoZm4sIGN0eCkge1xuICByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICBjb25zdCBsID0gYXJndW1lbnRzLmxlbmd0aFxuICAgIHJldHVybiBsXG4gICAgICA/IGwgPiAxXG4gICAgICAgID8gZm4uYXBwbHkoY3R4LCBhcmd1bWVudHMpXG4gICAgICAgIDogZm4uY2FsbChjdHgsIGEpXG4gICAgICA6IGZuLmNhbGwoY3R4KVxuICB9XG59XG5cbi8qKlxuICogQ29udmVydCBhbiBBcnJheS1saWtlIG9iamVjdCB0byBhIHJlYWwgQXJyYXkuXG4gKlxuICogQHBhcmFtIHtBcnJheS1saWtlfSBsaXN0XG4gKiBAcGFyYW0ge051bWJlcn0gW3N0YXJ0XSAtIHN0YXJ0IGluZGV4XG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdG9BcnJheSAobGlzdCwgc3RhcnQpIHtcbiAgc3RhcnQgPSBzdGFydCB8fCAwXG4gIGxldCBpID0gbGlzdC5sZW5ndGggLSBzdGFydFxuICBjb25zdCByZXQgPSBuZXcgQXJyYXkoaSlcbiAgd2hpbGUgKGktLSkge1xuICAgIHJldFtpXSA9IGxpc3RbaSArIHN0YXJ0XVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuLyoqXG4gKiBNaXggcHJvcGVydGllcyBpbnRvIHRhcmdldCBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHRvXG4gKiBAcGFyYW0ge09iamVjdH0gZnJvbVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQgKHRhcmdldCwgLi4uc3JjKSB7XG4gIGlmICh0eXBlb2YgT2JqZWN0LmFzc2lnbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIE9iamVjdC5hc3NpZ24odGFyZ2V0LCAuLi5zcmMpXG4gIH1cbiAgZWxzZSB7XG4gICAgY29uc3QgZmlyc3QgPSBzcmMuc2hpZnQoKVxuICAgIGZvciAoY29uc3Qga2V5IGluIGZpcnN0KSB7XG4gICAgICB0YXJnZXRba2V5XSA9IGZpcnN0W2tleV1cbiAgICB9XG4gICAgaWYgKHNyYy5sZW5ndGgpIHtcbiAgICAgIGV4dGVuZCh0YXJnZXQsIC4uLnNyYylcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldFxufVxuXG4vKipcbiAqIFF1aWNrIG9iamVjdCBjaGVjayAtIHRoaXMgaXMgcHJpbWFyaWx5IHVzZWQgdG8gdGVsbFxuICogT2JqZWN0cyBmcm9tIHByaW1pdGl2ZSB2YWx1ZXMgd2hlbiB3ZSBrbm93IHRoZSB2YWx1ZVxuICogaXMgYSBKU09OLWNvbXBsaWFudCB0eXBlLlxuICpcbiAqIEBwYXJhbSB7Kn0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCAob2JqKSB7XG4gIHJldHVybiBvYmogIT09IG51bGwgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCdcbn1cblxuLyoqXG4gKiBTdHJpY3Qgb2JqZWN0IHR5cGUgY2hlY2suIE9ubHkgcmV0dXJucyB0cnVlXG4gKiBmb3IgcGxhaW4gSmF2YVNjcmlwdCBvYmplY3RzLlxuICpcbiAqIEBwYXJhbSB7Kn0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5cbmNvbnN0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuY29uc3QgT0JKRUNUX1NUUklORyA9ICdbb2JqZWN0IE9iamVjdF0nXG5leHBvcnQgZnVuY3Rpb24gaXNQbGFpbk9iamVjdCAob2JqKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09IE9CSkVDVF9TVFJJTkdcbn1cblxuLyoqXG4gKiBBcnJheSB0eXBlIGNoZWNrLlxuICpcbiAqIEBwYXJhbSB7Kn0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5cbmV4cG9ydCBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheVxuXG4vLyAvIG90aGVyXG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnkgKHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSAndW5kZWZpbmVkJyB8fCB4ID09PSBudWxsIHx8IHR5cGVvZiAoeCkgPT09ICdmdW5jdGlvbidcbiAgICA/ICcnXG4gICAgOiB0eXBlb2YgeCA9PT0gJ29iamVjdCdcbiAgICAgID8geCBpbnN0YW5jZW9mIFJlZ0V4cFxuICAgICAgICA/IHgudG9TdHJpbmcoKVxuICAgICAgICA6IHggaW5zdGFuY2VvZiBEYXRlXG4gICAgICAgICAgPyBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHgpKVxuICAgICAgICAgIDogSlNPTi5zdHJpbmdpZnkoeClcbiAgICAgIDogeC50b1N0cmluZygpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0eXBvZiAodikge1xuICBjb25zdCBzID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHYpXG4gIHJldHVybiBzLnN1YnN0cmluZyg4LCBzLmxlbmd0aCAtIDEpLnRvTG93ZXJDYXNlKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZSAodikge1xuICBjb25zdCB0eXBlID0gdHlwb2YodilcblxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgIGNhc2UgJ251bGwnOlxuICAgICAgcmV0dXJuICcnXG4gICAgY2FzZSAncmVnZXhwJzpcbiAgICAgIHJldHVybiB2LnRvU3RyaW5nKClcbiAgICBjYXNlICdkYXRlJzpcbiAgICAgIHJldHVybiB2LnRvSVNPU3RyaW5nKClcbiAgICBjYXNlICdudW1iZXInOlxuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgY2FzZSAnYXJyYXknOlxuICAgIGNhc2UgJ29iamVjdCc6XG4gICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgcmV0dXJuIHZcbiAgfVxufVxuXG5jb25zdCBlbmFibGVMb2cgPSB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsLklTX1BST0RVQ1QgIT09IHRydWVcblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gbXNnXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlcnJvciAoLi4uYXJncykge1xuICBlbmFibGVMb2cgJiYgY29uc29sZS5lcnJvciAmJiBjb25zb2xlLmVycm9yKCdbSlMgRnJhbWV3b3JrXScsIC4uLmFyZ3MpXG59XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IG1zZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gd2FybiAoLi4uYXJncykge1xuICBlbmFibGVMb2cgJiYgY29uc29sZS53YXJuICYmIGNvbnNvbGUud2FybignW0pTIEZyYW1ld29ya10nLCAuLi5hcmdzKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBtc2dcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluZm8gKC4uLmFyZ3MpIHtcbiAgZW5hYmxlTG9nICYmIGNvbnNvbGUuaW5mbyAmJiBjb25zb2xlLmluZm8oJ1tKUyBGcmFtZXdvcmtdJywgLi4uYXJncylcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gbXNnXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWJ1ZyAoLi4uYXJncykge1xuICBlbmFibGVMb2cgJiYgY29uc29sZS5kZWJ1ZyAmJiBjb25zb2xlLmRlYnVnKCdbSlMgRnJhbWV3b3JrXScsIC4uLmFyZ3MpXG59XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IG1zZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gbG9nICguLi5hcmdzKSB7XG4gIGVuYWJsZUxvZyAmJiBjb25zb2xlLmxvZyAmJiBjb25zb2xlLmxvZygnW0pTIEZyYW1ld29ya10nLCAuLi5hcmdzKVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9odG1sNS9kZWZhdWx0L3V0aWwvaW5kZXguanNcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXdcbiAqIGFwaSB0aGF0IGludm9rZWQgYnkganMgYnVuZGxlIGNvZGVcbiAqXG4gKiAtIGRlZmluZShuYW1lLCBmYWN0b3J5KTogZGVmaW5lIGEgbmV3IGNvbXBvc2VkIGNvbXBvbmVudCB0eXBlXG4gKiAtIGJvb3RzdHJhcCh0eXBlLCBjb25maWcsIGRhdGEpOiByZXF1aXJlIGEgY2VydGFpbiB0eXBlICZcbiAqICAgICAgICAgcmVuZGVyIHdpdGggKG9wdGlvbmFsKSBkYXRhXG4gKlxuICogZGVwcmVjYXRlZDpcbiAqIC0gcmVnaXN0ZXIodHlwZSwgb3B0aW9ucyk6IHJlZ2lzdGVyIGEgbmV3IGNvbXBvc2VkIGNvbXBvbmVudCB0eXBlXG4gKiAtIHJlbmRlcih0eXBlLCBkYXRhKTogcmVuZGVyIGJ5IGEgY2VydGFpbiB0eXBlIHdpdGggKG9wdGlvbmFsKSBkYXRhXG4gKiAtIHJlcXVpcmUodHlwZSkoZGF0YSk6IHJlcXVpcmUgYSB0eXBlIHRoZW4gcmVuZGVyIHdpdGggZGF0YVxuICovXG5cbmltcG9ydCBzZW12ZXIgZnJvbSAnc2VtdmVyJ1xuaW1wb3J0ICogYXMgXyBmcm9tICcuLi91dGlsJ1xuaW1wb3J0IFZtIGZyb20gJy4uL3ZtJ1xuaW1wb3J0ICogYXMgZG93bmdyYWRlIGZyb20gJy4vZG93bmdyYWRlJ1xuXG5jb25zdCBXRUVYX0NPTVBPTkVOVF9SRUcgPSAvXkB3ZWV4LWNvbXBvbmVudFxcLy9cbmNvbnN0IFdFRVhfTU9EVUxFX1JFRyA9IC9eQHdlZXgtbW9kdWxlXFwvL1xuY29uc3QgTk9STUFMX01PRFVMRV9SRUcgPSAvXlxcLnsxLDJ9XFwvL1xuY29uc3QgSlNfU1VSRklYX1JFRyA9IC9cXC5qcyQvXG5cbmNvbnN0IGlzV2VleENvbXBvbmVudCA9IG5hbWUgPT4gISFuYW1lLm1hdGNoKFdFRVhfQ09NUE9ORU5UX1JFRylcbmNvbnN0IGlzV2VleE1vZHVsZSA9IG5hbWUgPT4gISFuYW1lLm1hdGNoKFdFRVhfTU9EVUxFX1JFRylcbmNvbnN0IGlzTm9ybWFsTW9kdWxlID0gbmFtZSA9PiAhIW5hbWUubWF0Y2goTk9STUFMX01PRFVMRV9SRUcpXG5jb25zdCBpc05wbU1vZHVsZSA9IG5hbWUgPT4gIWlzV2VleENvbXBvbmVudChuYW1lKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIWlzV2VleE1vZHVsZShuYW1lKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIWlzTm9ybWFsTW9kdWxlKG5hbWUpXG5cbmZ1bmN0aW9uIHJlbW92ZVdlZXhQcmVmaXggKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoV0VFWF9DT01QT05FTlRfUkVHLCAnJylcbiAgICAgICAgICAucmVwbGFjZShXRUVYX01PRFVMRV9SRUcsICcnKVxufVxuXG5mdW5jdGlvbiByZW1vdmVKU1N1cmZpeCAoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZShKU19TVVJGSVhfUkVHLCAnJylcbn1cblxubGV0IGNvbW1vbk1vZHVsZXMgPSB7fVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDb21tb25Nb2R1bGVzICgpIHtcbiAgY29tbW9uTW9kdWxlcyA9IHt9XG59XG5cbi8vIGRlZmluZShuYW1lLCBmYWN0b3J5KSBmb3IgcHJpbWFyeSB1c2FnZVxuLy8gb3Jcbi8vIGRlZmluZShuYW1lLCBkZXBzLCBmYWN0b3J5KSBmb3IgY29tcGF0aWJpbGl0eVxuLy8gTm90aWNlOiBETyBOT1QgdXNlIGZ1bmN0aW9uIGRlZmluZSgpIHt9LFxuLy8gaXQgd2lsbCBjYXVzZSBlcnJvciBhZnRlciBidWlsZGVkIGJ5IHdlYnBhY2tcbmV4cG9ydCBjb25zdCBkZWZpbmUgPSBmdW5jdGlvbiAobmFtZSwgZGVwcywgZmFjdG9yeSkge1xuICBfLmRlYnVnKCdkZWZpbmUgYSBjb21wb25lbnQnLCBuYW1lKVxuXG4gIGlmIChfLnR5cG9mKGRlcHMpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZmFjdG9yeSA9IGRlcHNcbiAgICBkZXBzID0gW11cbiAgfVxuXG4gIGNvbnN0IF9yZXF1aXJlID0gKG5hbWUpID0+IHtcbiAgICBsZXQgY2xlYW5OYW1lXG5cbiAgICBpZiAoaXNXZWV4Q29tcG9uZW50KG5hbWUpKSB7XG4gICAgICBjbGVhbk5hbWUgPSByZW1vdmVXZWV4UHJlZml4KG5hbWUpXG4gICAgICByZXR1cm4gdGhpcy5yZXF1aXJlQ29tcG9uZW50KGNsZWFuTmFtZSlcbiAgICB9XG4gICAgaWYgKGlzV2VleE1vZHVsZShuYW1lKSkge1xuICAgICAgY2xlYW5OYW1lID0gcmVtb3ZlV2VleFByZWZpeChuYW1lKVxuICAgICAgcmV0dXJuIHRoaXMucmVxdWlyZU1vZHVsZShjbGVhbk5hbWUpXG4gICAgfVxuICAgIGlmIChpc05vcm1hbE1vZHVsZShuYW1lKSkge1xuICAgICAgY2xlYW5OYW1lID0gcmVtb3ZlSlNTdXJmaXgobmFtZSlcbiAgICAgIHJldHVybiBjb21tb25Nb2R1bGVzW25hbWVdXG4gICAgfVxuICAgIGlmIChpc05wbU1vZHVsZShuYW1lKSkge1xuICAgICAgY2xlYW5OYW1lID0gcmVtb3ZlSlNTdXJmaXgobmFtZSlcbiAgICAgIHJldHVybiBjb21tb25Nb2R1bGVzW25hbWVdXG4gICAgfVxuICB9XG4gIGNvbnN0IF9tb2R1bGUgPSB7IGV4cG9ydHM6IHt9fVxuXG4gIGxldCBjbGVhbk5hbWVcbiAgaWYgKGlzV2VleENvbXBvbmVudChuYW1lKSkge1xuICAgIGNsZWFuTmFtZSA9IHJlbW92ZVdlZXhQcmVmaXgobmFtZSlcblxuICAgIGZhY3RvcnkoX3JlcXVpcmUsIF9tb2R1bGUuZXhwb3J0cywgX21vZHVsZSlcblxuICAgIHRoaXMucmVnaXN0ZXJDb21wb25lbnQoY2xlYW5OYW1lLCBfbW9kdWxlLmV4cG9ydHMpXG4gIH1cbiAgZWxzZSBpZiAoaXNXZWV4TW9kdWxlKG5hbWUpKSB7XG4gICAgY2xlYW5OYW1lID0gcmVtb3ZlV2VleFByZWZpeChuYW1lKVxuXG4gICAgZmFjdG9yeShfcmVxdWlyZSwgX21vZHVsZS5leHBvcnRzLCBfbW9kdWxlKVxuXG4gICAgVm0ucmVnaXN0ZXJNb2R1bGVzKHtcbiAgICAgIFtjbGVhbk5hbWVdOiBfbW9kdWxlLmV4cG9ydHNcbiAgICB9KVxuICB9XG4gIGVsc2UgaWYgKGlzTm9ybWFsTW9kdWxlKG5hbWUpKSB7XG4gICAgY2xlYW5OYW1lID0gcmVtb3ZlSlNTdXJmaXgobmFtZSlcblxuICAgIGZhY3RvcnkoX3JlcXVpcmUsIF9tb2R1bGUuZXhwb3J0cywgX21vZHVsZSlcblxuICAgIGNvbW1vbk1vZHVsZXNbY2xlYW5OYW1lXSA9IF9tb2R1bGUuZXhwb3J0c1xuICB9XG4gIGVsc2UgaWYgKGlzTnBtTW9kdWxlKG5hbWUpKSB7XG4gICAgY2xlYW5OYW1lID0gcmVtb3ZlSlNTdXJmaXgobmFtZSlcblxuICAgIGZhY3RvcnkoX3JlcXVpcmUsIF9tb2R1bGUuZXhwb3J0cywgX21vZHVsZSlcblxuICAgIGNvbnN0IGV4cG9ydHMgPSBfbW9kdWxlLmV4cG9ydHNcbiAgICBpZiAoZXhwb3J0cy50ZW1wbGF0ZSB8fFxuICAgICAgICBleHBvcnRzLnN0eWxlIHx8XG4gICAgICAgIGV4cG9ydHMubWV0aG9kcykge1xuICAgICAgLy8gZG93bmdyYWRlIHRvIG9sZCBkZWZpbmUgbWV0aG9kIChkZWZpbmUoJ2NvbXBvbmVudE5hbWUnLCBmYWN0b3J5KSlcbiAgICAgIC8vIHRoZSBleHBvcnRzIGNvbnRhaW4gb25lIGtleSBvZiB0ZW1wbGF0ZSwgc3R5bGUgb3IgbWV0aG9kc1xuICAgICAgLy8gYnV0IGl0IGhhcyByaXNrISEhXG4gICAgICB0aGlzLnJlZ2lzdGVyQ29tcG9uZW50KGNsZWFuTmFtZSwgZXhwb3J0cylcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb21tb25Nb2R1bGVzW2NsZWFuTmFtZV0gPSBfbW9kdWxlLmV4cG9ydHNcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJvb3RzdHJhcCAobmFtZSwgY29uZmlnLCBkYXRhKSB7XG4gIF8uZGVidWcoYGJvb3RzdHJhcCBmb3IgJHtuYW1lfWApXG5cbiAgbGV0IGNsZWFuTmFtZVxuXG4gIGlmIChpc1dlZXhDb21wb25lbnQobmFtZSkpIHtcbiAgICBjbGVhbk5hbWUgPSByZW1vdmVXZWV4UHJlZml4KG5hbWUpXG4gIH1cbiAgZWxzZSBpZiAoaXNOcG1Nb2R1bGUobmFtZSkpIHtcbiAgICBjbGVhbk5hbWUgPSByZW1vdmVKU1N1cmZpeChuYW1lKVxuICAgIC8vIGNoZWNrIGlmIGRlZmluZSBieSBvbGQgJ2RlZmluZScgbWV0aG9kXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCF0aGlzLmN1c3RvbUNvbXBvbmVudE1hcFtjbGVhbk5hbWVdKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKGBJdCdzIG5vdCBhIGNvbXBvbmVudDogJHtuYW1lfWApXG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybiBuZXcgRXJyb3IoYFdyb25nIGNvbXBvbmVudCBuYW1lOiAke25hbWV9YClcbiAgfVxuXG4gIGNvbmZpZyA9IF8uaXNQbGFpbk9iamVjdChjb25maWcpID8gY29uZmlnIDoge31cblxuICBpZiAodHlwZW9mIGNvbmZpZy50cmFuc2Zvcm1lclZlcnNpb24gPT09ICdzdHJpbmcnICYmXG4gICAgdHlwZW9mIGdsb2JhbC5uZWVkVHJhbnNmb3JtZXJWZXJzaW9uID09PSAnc3RyaW5nJyAmJlxuICAgICFzZW12ZXIuc2F0aXNmaWVzKGNvbmZpZy50cmFuc2Zvcm1lclZlcnNpb24sXG4gICAgICBnbG9iYWwubmVlZFRyYW5zZm9ybWVyVmVyc2lvbikpIHtcbiAgICByZXR1cm4gbmV3IEVycm9yKGBKUyBCdW5kbGUgdmVyc2lvbjogJHtjb25maWcudHJhbnNmb3JtZXJWZXJzaW9ufSBgICtcbiAgICAgIGBub3QgY29tcGF0aWJsZSB3aXRoICR7Z2xvYmFsLm5lZWRUcmFuc2Zvcm1lclZlcnNpb259YClcbiAgfVxuXG4gIGNvbnN0IF9jaGVja0Rvd25ncmFkZSA9IGRvd25ncmFkZS5jaGVjayhjb25maWcuZG93bmdyYWRlKVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKF9jaGVja0Rvd25ncmFkZS5pc0Rvd25ncmFkZSkge1xuICAgIHRoaXMuY2FsbFRhc2tzKFt7XG4gICAgICBtb2R1bGU6ICdpbnN0YW5jZVdyYXAnLFxuICAgICAgbWV0aG9kOiAnZXJyb3InLFxuICAgICAgYXJnczogW1xuICAgICAgICBfY2hlY2tEb3duZ3JhZGUuZXJyb3JUeXBlLFxuICAgICAgICBfY2hlY2tEb3duZ3JhZGUuY29kZSxcbiAgICAgICAgX2NoZWNrRG93bmdyYWRlLmVycm9yTWVzc2FnZVxuICAgICAgXVxuICAgIH1dKVxuICAgIHJldHVybiBuZXcgRXJyb3IoYERvd25ncmFkZVske19jaGVja0Rvd25ncmFkZS5jb2RlfV06ICR7X2NoZWNrRG93bmdyYWRlLmVycm9yTWVzc2FnZX1gKVxuICB9XG5cbiAgdGhpcy52bSA9IG5ldyBWbShjbGVhbk5hbWUsIG51bGwsIHsgX2FwcDogdGhpcyB9LCBudWxsLCBkYXRhKVxufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlciAodHlwZSwgb3B0aW9ucykge1xuICBfLndhcm4oJ1JlZ2lzdGVyIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSBpbnN0YWxsIGxhc3Rlc3QgdHJhbnNmb3JtZXIuJylcbiAgdGhpcy5yZWdpc3RlckNvbXBvbmVudCh0eXBlLCBvcHRpb25zKVxufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIgKHR5cGUsIGRhdGEpIHtcbiAgXy53YXJuKCdSZW5kZXIgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIGluc3RhbGwgbGFzdGVzdCB0cmFuc2Zvcm1lci4nKVxuICByZXR1cm4gdGhpcy5ib290c3RyYXAodHlwZSwge30sIGRhdGEpXG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcXVpcmUgKHR5cGUpIHtcbiAgXy53YXJuKCdSZXF1aXJlIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSBpbnN0YWxsIGxhc3Rlc3QgdHJhbnNmb3JtZXIuJylcbiAgcmV0dXJuIChkYXRhKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuYm9vdHN0cmFwKHR5cGUsIHt9LCBkYXRhKVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi93ZWV4L2h0bWw1L2RlZmF1bHQvYXBwL2J1bmRsZS5qc1xuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IFNlbVZlcjtcblxuLy8gVGhlIGRlYnVnIGZ1bmN0aW9uIGlzIGV4Y2x1ZGVkIGVudGlyZWx5IGZyb20gdGhlIG1pbmlmaWVkIHZlcnNpb24uXG4vKiBub21pbiAqLyB2YXIgZGVidWc7XG4vKiBub21pbiAqLyBpZiAodHlwZW9mIHByb2Nlc3MgPT09ICdvYmplY3QnICYmXG4gICAgLyogbm9taW4gKi8gcHJvY2Vzcy5lbnYgJiZcbiAgICAvKiBub21pbiAqLyBwcm9jZXNzLmVudi5OT0RFX0RFQlVHICYmXG4gICAgLyogbm9taW4gKi8gL1xcYnNlbXZlclxcYi9pLnRlc3QocHJvY2Vzcy5lbnYuTk9ERV9ERUJVRykpXG4gIC8qIG5vbWluICovIGRlYnVnID0gZnVuY3Rpb24oKSB7XG4gICAgLyogbm9taW4gKi8gdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIC8qIG5vbWluICovIGFyZ3MudW5zaGlmdCgnU0VNVkVSJyk7XG4gICAgLyogbm9taW4gKi8gY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJncyk7XG4gICAgLyogbm9taW4gKi8gfTtcbi8qIG5vbWluICovIGVsc2VcbiAgLyogbm9taW4gKi8gZGVidWcgPSBmdW5jdGlvbigpIHt9O1xuXG4vLyBOb3RlOiB0aGlzIGlzIHRoZSBzZW12ZXIub3JnIHZlcnNpb24gb2YgdGhlIHNwZWMgdGhhdCBpdCBpbXBsZW1lbnRzXG4vLyBOb3QgbmVjZXNzYXJpbHkgdGhlIHBhY2thZ2UgdmVyc2lvbiBvZiB0aGlzIGNvZGUuXG5leHBvcnRzLlNFTVZFUl9TUEVDX1ZFUlNJT04gPSAnMi4wLjAnO1xuXG52YXIgTUFYX0xFTkdUSCA9IDI1NjtcbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgfHwgOTAwNzE5OTI1NDc0MDk5MTtcblxuLy8gVGhlIGFjdHVhbCByZWdleHBzIGdvIG9uIGV4cG9ydHMucmVcbnZhciByZSA9IGV4cG9ydHMucmUgPSBbXTtcbnZhciBzcmMgPSBleHBvcnRzLnNyYyA9IFtdO1xudmFyIFIgPSAwO1xuXG4vLyBUaGUgZm9sbG93aW5nIFJlZ3VsYXIgRXhwcmVzc2lvbnMgY2FuIGJlIHVzZWQgZm9yIHRva2VuaXppbmcsXG4vLyB2YWxpZGF0aW5nLCBhbmQgcGFyc2luZyBTZW1WZXIgdmVyc2lvbiBzdHJpbmdzLlxuXG4vLyAjIyBOdW1lcmljIElkZW50aWZpZXJcbi8vIEEgc2luZ2xlIGAwYCwgb3IgYSBub24temVybyBkaWdpdCBmb2xsb3dlZCBieSB6ZXJvIG9yIG1vcmUgZGlnaXRzLlxuXG52YXIgTlVNRVJJQ0lERU5USUZJRVIgPSBSKys7XG5zcmNbTlVNRVJJQ0lERU5USUZJRVJdID0gJzB8WzEtOV1cXFxcZConO1xudmFyIE5VTUVSSUNJREVOVElGSUVSTE9PU0UgPSBSKys7XG5zcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gPSAnWzAtOV0rJztcblxuXG4vLyAjIyBOb24tbnVtZXJpYyBJZGVudGlmaWVyXG4vLyBaZXJvIG9yIG1vcmUgZGlnaXRzLCBmb2xsb3dlZCBieSBhIGxldHRlciBvciBoeXBoZW4sIGFuZCB0aGVuIHplcm8gb3Jcbi8vIG1vcmUgbGV0dGVycywgZGlnaXRzLCBvciBoeXBoZW5zLlxuXG52YXIgTk9OTlVNRVJJQ0lERU5USUZJRVIgPSBSKys7XG5zcmNbTk9OTlVNRVJJQ0lERU5USUZJRVJdID0gJ1xcXFxkKlthLXpBLVotXVthLXpBLVowLTktXSonO1xuXG5cbi8vICMjIE1haW4gVmVyc2lvblxuLy8gVGhyZWUgZG90LXNlcGFyYXRlZCBudW1lcmljIGlkZW50aWZpZXJzLlxuXG52YXIgTUFJTlZFUlNJT04gPSBSKys7XG5zcmNbTUFJTlZFUlNJT05dID0gJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSXSArICcpXFxcXC4nICtcbiAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJdICsgJylcXFxcLicgK1xuICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1tOVU1FUklDSURFTlRJRklFUl0gKyAnKSc7XG5cbnZhciBNQUlOVkVSU0lPTkxPT1NFID0gUisrO1xuc3JjW01BSU5WRVJTSU9OTE9PU0VdID0gJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICsgJylcXFxcLicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICsgJylcXFxcLicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICsgJyknO1xuXG4vLyAjIyBQcmUtcmVsZWFzZSBWZXJzaW9uIElkZW50aWZpZXJcbi8vIEEgbnVtZXJpYyBpZGVudGlmaWVyLCBvciBhIG5vbi1udW1lcmljIGlkZW50aWZpZXIuXG5cbnZhciBQUkVSRUxFQVNFSURFTlRJRklFUiA9IFIrKztcbnNyY1tQUkVSRUxFQVNFSURFTlRJRklFUl0gPSAnKD86JyArIHNyY1tOVU1FUklDSURFTlRJRklFUl0gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd8JyArIHNyY1tOT05OVU1FUklDSURFTlRJRklFUl0gKyAnKSc7XG5cbnZhciBQUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFID0gUisrO1xuc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSTE9PU0VdID0gJyg/OicgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3wnICsgc3JjW05PTk5VTUVSSUNJREVOVElGSUVSXSArICcpJztcblxuXG4vLyAjIyBQcmUtcmVsZWFzZSBWZXJzaW9uXG4vLyBIeXBoZW4sIGZvbGxvd2VkIGJ5IG9uZSBvciBtb3JlIGRvdC1zZXBhcmF0ZWQgcHJlLXJlbGVhc2UgdmVyc2lvblxuLy8gaWRlbnRpZmllcnMuXG5cbnZhciBQUkVSRUxFQVNFID0gUisrO1xuc3JjW1BSRVJFTEVBU0VdID0gJyg/Oi0oJyArIHNyY1tQUkVSRUxFQVNFSURFTlRJRklFUl0gK1xuICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuJyArIHNyY1tQUkVSRUxFQVNFSURFTlRJRklFUl0gKyAnKSopKSc7XG5cbnZhciBQUkVSRUxFQVNFTE9PU0UgPSBSKys7XG5zcmNbUFJFUkVMRUFTRUxPT1NFXSA9ICcoPzotPygnICsgc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSTE9PU0VdICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuJyArIHNyY1tQUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFXSArICcpKikpJztcblxuLy8gIyMgQnVpbGQgTWV0YWRhdGEgSWRlbnRpZmllclxuLy8gQW55IGNvbWJpbmF0aW9uIG9mIGRpZ2l0cywgbGV0dGVycywgb3IgaHlwaGVucy5cblxudmFyIEJVSUxESURFTlRJRklFUiA9IFIrKztcbnNyY1tCVUlMRElERU5USUZJRVJdID0gJ1swLTlBLVphLXotXSsnO1xuXG4vLyAjIyBCdWlsZCBNZXRhZGF0YVxuLy8gUGx1cyBzaWduLCBmb2xsb3dlZCBieSBvbmUgb3IgbW9yZSBwZXJpb2Qtc2VwYXJhdGVkIGJ1aWxkIG1ldGFkYXRhXG4vLyBpZGVudGlmaWVycy5cblxudmFyIEJVSUxEID0gUisrO1xuc3JjW0JVSUxEXSA9ICcoPzpcXFxcKygnICsgc3JjW0JVSUxESURFTlRJRklFUl0gK1xuICAgICAgICAgICAgICcoPzpcXFxcLicgKyBzcmNbQlVJTERJREVOVElGSUVSXSArICcpKikpJztcblxuXG4vLyAjIyBGdWxsIFZlcnNpb24gU3RyaW5nXG4vLyBBIG1haW4gdmVyc2lvbiwgZm9sbG93ZWQgb3B0aW9uYWxseSBieSBhIHByZS1yZWxlYXNlIHZlcnNpb24gYW5kXG4vLyBidWlsZCBtZXRhZGF0YS5cblxuLy8gTm90ZSB0aGF0IHRoZSBvbmx5IG1ham9yLCBtaW5vciwgcGF0Y2gsIGFuZCBwcmUtcmVsZWFzZSBzZWN0aW9ucyBvZlxuLy8gdGhlIHZlcnNpb24gc3RyaW5nIGFyZSBjYXB0dXJpbmcgZ3JvdXBzLiAgVGhlIGJ1aWxkIG1ldGFkYXRhIGlzIG5vdCBhXG4vLyBjYXB0dXJpbmcgZ3JvdXAsIGJlY2F1c2UgaXQgc2hvdWxkIG5vdCBldmVyIGJlIHVzZWQgaW4gdmVyc2lvblxuLy8gY29tcGFyaXNvbi5cblxudmFyIEZVTEwgPSBSKys7XG52YXIgRlVMTFBMQUlOID0gJ3Y/JyArIHNyY1tNQUlOVkVSU0lPTl0gK1xuICAgICAgICAgICAgICAgIHNyY1tQUkVSRUxFQVNFXSArICc/JyArXG4gICAgICAgICAgICAgICAgc3JjW0JVSUxEXSArICc/Jztcblxuc3JjW0ZVTExdID0gJ14nICsgRlVMTFBMQUlOICsgJyQnO1xuXG4vLyBsaWtlIGZ1bGwsIGJ1dCBhbGxvd3MgdjEuMi4zIGFuZCA9MS4yLjMsIHdoaWNoIHBlb3BsZSBkbyBzb21ldGltZXMuXG4vLyBhbHNvLCAxLjAuMGFscGhhMSAocHJlcmVsZWFzZSB3aXRob3V0IHRoZSBoeXBoZW4pIHdoaWNoIGlzIHByZXR0eVxuLy8gY29tbW9uIGluIHRoZSBucG0gcmVnaXN0cnkuXG52YXIgTE9PU0VQTEFJTiA9ICdbdj1cXFxcc10qJyArIHNyY1tNQUlOVkVSU0lPTkxPT1NFXSArXG4gICAgICAgICAgICAgICAgIHNyY1tQUkVSRUxFQVNFTE9PU0VdICsgJz8nICtcbiAgICAgICAgICAgICAgICAgc3JjW0JVSUxEXSArICc/JztcblxudmFyIExPT1NFID0gUisrO1xuc3JjW0xPT1NFXSA9ICdeJyArIExPT1NFUExBSU4gKyAnJCc7XG5cbnZhciBHVExUID0gUisrO1xuc3JjW0dUTFRdID0gJygoPzo8fD4pPz0/KSc7XG5cbi8vIFNvbWV0aGluZyBsaWtlIFwiMi4qXCIgb3IgXCIxLjIueFwiLlxuLy8gTm90ZSB0aGF0IFwieC54XCIgaXMgYSB2YWxpZCB4UmFuZ2UgaWRlbnRpZmVyLCBtZWFuaW5nIFwiYW55IHZlcnNpb25cIlxuLy8gT25seSB0aGUgZmlyc3QgaXRlbSBpcyBzdHJpY3RseSByZXF1aXJlZC5cbnZhciBYUkFOR0VJREVOVElGSUVSTE9PU0UgPSBSKys7XG5zcmNbWFJBTkdFSURFTlRJRklFUkxPT1NFXSA9IHNyY1tOVU1FUklDSURFTlRJRklFUkxPT1NFXSArICd8eHxYfFxcXFwqJztcbnZhciBYUkFOR0VJREVOVElGSUVSID0gUisrO1xuc3JjW1hSQU5HRUlERU5USUZJRVJdID0gc3JjW05VTUVSSUNJREVOVElGSUVSXSArICd8eHxYfFxcXFwqJztcblxudmFyIFhSQU5HRVBMQUlOID0gUisrO1xuc3JjW1hSQU5HRVBMQUlOXSA9ICdbdj1cXFxcc10qKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLignICsgc3JjW1hSQU5HRUlERU5USUZJRVJdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAnKD86XFxcXC4oJyArIHNyY1tYUkFOR0VJREVOVElGSUVSXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJyg/OicgKyBzcmNbUFJFUkVMRUFTRV0gKyAnKT8nICtcbiAgICAgICAgICAgICAgICAgICBzcmNbQlVJTERdICsgJz8nICtcbiAgICAgICAgICAgICAgICAgICAnKT8pPyc7XG5cbnZhciBYUkFOR0VQTEFJTkxPT1NFID0gUisrO1xuc3JjW1hSQU5HRVBMQUlOTE9PU0VdID0gJ1t2PVxcXFxzXSooJyArIHNyY1tYUkFOR0VJREVOVElGSUVSTE9PU0VdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLignICsgc3JjW1hSQU5HRUlERU5USUZJRVJMT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUkxPT1NFXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKD86JyArIHNyY1tQUkVSRUxFQVNFTE9PU0VdICsgJyk/JyArXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmNbQlVJTERdICsgJz8nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcpPyk/JztcblxudmFyIFhSQU5HRSA9IFIrKztcbnNyY1tYUkFOR0VdID0gJ14nICsgc3JjW0dUTFRdICsgJ1xcXFxzKicgKyBzcmNbWFJBTkdFUExBSU5dICsgJyQnO1xudmFyIFhSQU5HRUxPT1NFID0gUisrO1xuc3JjW1hSQU5HRUxPT1NFXSA9ICdeJyArIHNyY1tHVExUXSArICdcXFxccyonICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyQnO1xuXG4vLyBUaWxkZSByYW5nZXMuXG4vLyBNZWFuaW5nIGlzIFwicmVhc29uYWJseSBhdCBvciBncmVhdGVyIHRoYW5cIlxudmFyIExPTkVUSUxERSA9IFIrKztcbnNyY1tMT05FVElMREVdID0gJyg/On4+PyknO1xuXG52YXIgVElMREVUUklNID0gUisrO1xuc3JjW1RJTERFVFJJTV0gPSAnKFxcXFxzKiknICsgc3JjW0xPTkVUSUxERV0gKyAnXFxcXHMrJztcbnJlW1RJTERFVFJJTV0gPSBuZXcgUmVnRXhwKHNyY1tUSUxERVRSSU1dLCAnZycpO1xudmFyIHRpbGRlVHJpbVJlcGxhY2UgPSAnJDF+JztcblxudmFyIFRJTERFID0gUisrO1xuc3JjW1RJTERFXSA9ICdeJyArIHNyY1tMT05FVElMREVdICsgc3JjW1hSQU5HRVBMQUlOXSArICckJztcbnZhciBUSUxERUxPT1NFID0gUisrO1xuc3JjW1RJTERFTE9PU0VdID0gJ14nICsgc3JjW0xPTkVUSUxERV0gKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnJCc7XG5cbi8vIENhcmV0IHJhbmdlcy5cbi8vIE1lYW5pbmcgaXMgXCJhdCBsZWFzdCBhbmQgYmFja3dhcmRzIGNvbXBhdGlibGUgd2l0aFwiXG52YXIgTE9ORUNBUkVUID0gUisrO1xuc3JjW0xPTkVDQVJFVF0gPSAnKD86XFxcXF4pJztcblxudmFyIENBUkVUVFJJTSA9IFIrKztcbnNyY1tDQVJFVFRSSU1dID0gJyhcXFxccyopJyArIHNyY1tMT05FQ0FSRVRdICsgJ1xcXFxzKyc7XG5yZVtDQVJFVFRSSU1dID0gbmV3IFJlZ0V4cChzcmNbQ0FSRVRUUklNXSwgJ2cnKTtcbnZhciBjYXJldFRyaW1SZXBsYWNlID0gJyQxXic7XG5cbnZhciBDQVJFVCA9IFIrKztcbnNyY1tDQVJFVF0gPSAnXicgKyBzcmNbTE9ORUNBUkVUXSArIHNyY1tYUkFOR0VQTEFJTl0gKyAnJCc7XG52YXIgQ0FSRVRMT09TRSA9IFIrKztcbnNyY1tDQVJFVExPT1NFXSA9ICdeJyArIHNyY1tMT05FQ0FSRVRdICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyQnO1xuXG4vLyBBIHNpbXBsZSBndC9sdC9lcSB0aGluZywgb3IganVzdCBcIlwiIHRvIGluZGljYXRlIFwiYW55IHZlcnNpb25cIlxudmFyIENPTVBBUkFUT1JMT09TRSA9IFIrKztcbnNyY1tDT01QQVJBVE9STE9PU0VdID0gJ14nICsgc3JjW0dUTFRdICsgJ1xcXFxzKignICsgTE9PU0VQTEFJTiArICcpJHxeJCc7XG52YXIgQ09NUEFSQVRPUiA9IFIrKztcbnNyY1tDT01QQVJBVE9SXSA9ICdeJyArIHNyY1tHVExUXSArICdcXFxccyooJyArIEZVTExQTEFJTiArICcpJHxeJCc7XG5cblxuLy8gQW4gZXhwcmVzc2lvbiB0byBzdHJpcCBhbnkgd2hpdGVzcGFjZSBiZXR3ZWVuIHRoZSBndGx0IGFuZCB0aGUgdGhpbmdcbi8vIGl0IG1vZGlmaWVzLCBzbyB0aGF0IGA+IDEuMi4zYCA9PT4gYD4xLjIuM2BcbnZhciBDT01QQVJBVE9SVFJJTSA9IFIrKztcbnNyY1tDT01QQVJBVE9SVFJJTV0gPSAnKFxcXFxzKiknICsgc3JjW0dUTFRdICtcbiAgICAgICAgICAgICAgICAgICAgICAnXFxcXHMqKCcgKyBMT09TRVBMQUlOICsgJ3wnICsgc3JjW1hSQU5HRVBMQUlOXSArICcpJztcblxuLy8gdGhpcyBvbmUgaGFzIHRvIHVzZSB0aGUgL2cgZmxhZ1xucmVbQ09NUEFSQVRPUlRSSU1dID0gbmV3IFJlZ0V4cChzcmNbQ09NUEFSQVRPUlRSSU1dLCAnZycpO1xudmFyIGNvbXBhcmF0b3JUcmltUmVwbGFjZSA9ICckMSQyJDMnO1xuXG5cbi8vIFNvbWV0aGluZyBsaWtlIGAxLjIuMyAtIDEuMi40YFxuLy8gTm90ZSB0aGF0IHRoZXNlIGFsbCB1c2UgdGhlIGxvb3NlIGZvcm0sIGJlY2F1c2UgdGhleSdsbCBiZVxuLy8gY2hlY2tlZCBhZ2FpbnN0IGVpdGhlciB0aGUgc3RyaWN0IG9yIGxvb3NlIGNvbXBhcmF0b3IgZm9ybVxuLy8gbGF0ZXIuXG52YXIgSFlQSEVOUkFOR0UgPSBSKys7XG5zcmNbSFlQSEVOUkFOR0VdID0gJ15cXFxccyooJyArIHNyY1tYUkFOR0VQTEFJTl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICdcXFxccystXFxcXHMrJyArXG4gICAgICAgICAgICAgICAgICAgJygnICsgc3JjW1hSQU5HRVBMQUlOXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJ1xcXFxzKiQnO1xuXG52YXIgSFlQSEVOUkFOR0VMT09TRSA9IFIrKztcbnNyY1tIWVBIRU5SQU5HRUxPT1NFXSA9ICdeXFxcXHMqKCcgKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1xcXFxzKy1cXFxccysnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1tYUkFOR0VQTEFJTkxPT1NFXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXFxcXHMqJCc7XG5cbi8vIFN0YXIgcmFuZ2VzIGJhc2ljYWxseSBqdXN0IGFsbG93IGFueXRoaW5nIGF0IGFsbC5cbnZhciBTVEFSID0gUisrO1xuc3JjW1NUQVJdID0gJyg8fD4pPz0/XFxcXHMqXFxcXConO1xuXG4vLyBDb21waWxlIHRvIGFjdHVhbCByZWdleHAgb2JqZWN0cy5cbi8vIEFsbCBhcmUgZmxhZy1mcmVlLCB1bmxlc3MgdGhleSB3ZXJlIGNyZWF0ZWQgYWJvdmUgd2l0aCBhIGZsYWcuXG5mb3IgKHZhciBpID0gMDsgaSA8IFI7IGkrKykge1xuICBkZWJ1ZyhpLCBzcmNbaV0pO1xuICBpZiAoIXJlW2ldKVxuICAgIHJlW2ldID0gbmV3IFJlZ0V4cChzcmNbaV0pO1xufVxuXG5leHBvcnRzLnBhcnNlID0gcGFyc2U7XG5mdW5jdGlvbiBwYXJzZSh2ZXJzaW9uLCBsb29zZSkge1xuICBpZiAodmVyc2lvbiBpbnN0YW5jZW9mIFNlbVZlcilcbiAgICByZXR1cm4gdmVyc2lvbjtcblxuICBpZiAodHlwZW9mIHZlcnNpb24gIT09ICdzdHJpbmcnKVxuICAgIHJldHVybiBudWxsO1xuXG4gIGlmICh2ZXJzaW9uLmxlbmd0aCA+IE1BWF9MRU5HVEgpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgdmFyIHIgPSBsb29zZSA/IHJlW0xPT1NFXSA6IHJlW0ZVTExdO1xuICBpZiAoIXIudGVzdCh2ZXJzaW9uKSlcbiAgICByZXR1cm4gbnVsbDtcblxuICB0cnkge1xuICAgIHJldHVybiBuZXcgU2VtVmVyKHZlcnNpb24sIGxvb3NlKTtcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5leHBvcnRzLnZhbGlkID0gdmFsaWQ7XG5mdW5jdGlvbiB2YWxpZCh2ZXJzaW9uLCBsb29zZSkge1xuICB2YXIgdiA9IHBhcnNlKHZlcnNpb24sIGxvb3NlKTtcbiAgcmV0dXJuIHYgPyB2LnZlcnNpb24gOiBudWxsO1xufVxuXG5cbmV4cG9ydHMuY2xlYW4gPSBjbGVhbjtcbmZ1bmN0aW9uIGNsZWFuKHZlcnNpb24sIGxvb3NlKSB7XG4gIHZhciBzID0gcGFyc2UodmVyc2lvbi50cmltKCkucmVwbGFjZSgvXls9dl0rLywgJycpLCBsb29zZSk7XG4gIHJldHVybiBzID8gcy52ZXJzaW9uIDogbnVsbDtcbn1cblxuZXhwb3J0cy5TZW1WZXIgPSBTZW1WZXI7XG5cbmZ1bmN0aW9uIFNlbVZlcih2ZXJzaW9uLCBsb29zZSkge1xuICBpZiAodmVyc2lvbiBpbnN0YW5jZW9mIFNlbVZlcikge1xuICAgIGlmICh2ZXJzaW9uLmxvb3NlID09PSBsb29zZSlcbiAgICAgIHJldHVybiB2ZXJzaW9uO1xuICAgIGVsc2VcbiAgICAgIHZlcnNpb24gPSB2ZXJzaW9uLnZlcnNpb247XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZlcnNpb24gIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBWZXJzaW9uOiAnICsgdmVyc2lvbik7XG4gIH1cblxuICBpZiAodmVyc2lvbi5sZW5ndGggPiBNQVhfTEVOR1RIKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZlcnNpb24gaXMgbG9uZ2VyIHRoYW4gJyArIE1BWF9MRU5HVEggKyAnIGNoYXJhY3RlcnMnKVxuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTZW1WZXIpKVxuICAgIHJldHVybiBuZXcgU2VtVmVyKHZlcnNpb24sIGxvb3NlKTtcblxuICBkZWJ1ZygnU2VtVmVyJywgdmVyc2lvbiwgbG9vc2UpO1xuICB0aGlzLmxvb3NlID0gbG9vc2U7XG4gIHZhciBtID0gdmVyc2lvbi50cmltKCkubWF0Y2gobG9vc2UgPyByZVtMT09TRV0gOiByZVtGVUxMXSk7XG5cbiAgaWYgKCFtKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgVmVyc2lvbjogJyArIHZlcnNpb24pO1xuXG4gIHRoaXMucmF3ID0gdmVyc2lvbjtcblxuICAvLyB0aGVzZSBhcmUgYWN0dWFsbHkgbnVtYmVyc1xuICB0aGlzLm1ham9yID0gK21bMV07XG4gIHRoaXMubWlub3IgPSArbVsyXTtcbiAgdGhpcy5wYXRjaCA9ICttWzNdO1xuXG4gIGlmICh0aGlzLm1ham9yID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLm1ham9yIDwgMClcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG1ham9yIHZlcnNpb24nKVxuXG4gIGlmICh0aGlzLm1pbm9yID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLm1pbm9yIDwgMClcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG1pbm9yIHZlcnNpb24nKVxuXG4gIGlmICh0aGlzLnBhdGNoID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLnBhdGNoIDwgMClcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHBhdGNoIHZlcnNpb24nKVxuXG4gIC8vIG51bWJlcmlmeSBhbnkgcHJlcmVsZWFzZSBudW1lcmljIGlkc1xuICBpZiAoIW1bNF0pXG4gICAgdGhpcy5wcmVyZWxlYXNlID0gW107XG4gIGVsc2VcbiAgICB0aGlzLnByZXJlbGVhc2UgPSBtWzRdLnNwbGl0KCcuJykubWFwKGZ1bmN0aW9uKGlkKSB7XG4gICAgICBpZiAoL15bMC05XSskLy50ZXN0KGlkKSkge1xuICAgICAgICB2YXIgbnVtID0gK2lkXG4gICAgICAgIGlmIChudW0gPj0gMCAmJiBudW0gPCBNQVhfU0FGRV9JTlRFR0VSKVxuICAgICAgICAgIHJldHVybiBudW1cbiAgICAgIH1cbiAgICAgIHJldHVybiBpZDtcbiAgICB9KTtcblxuICB0aGlzLmJ1aWxkID0gbVs1XSA/IG1bNV0uc3BsaXQoJy4nKSA6IFtdO1xuICB0aGlzLmZvcm1hdCgpO1xufVxuXG5TZW1WZXIucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnZlcnNpb24gPSB0aGlzLm1ham9yICsgJy4nICsgdGhpcy5taW5vciArICcuJyArIHRoaXMucGF0Y2g7XG4gIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoKVxuICAgIHRoaXMudmVyc2lvbiArPSAnLScgKyB0aGlzLnByZXJlbGVhc2Uuam9pbignLicpO1xuICByZXR1cm4gdGhpcy52ZXJzaW9uO1xufTtcblxuU2VtVmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy52ZXJzaW9uO1xufTtcblxuU2VtVmVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgZGVidWcoJ1NlbVZlci5jb21wYXJlJywgdGhpcy52ZXJzaW9uLCB0aGlzLmxvb3NlLCBvdGhlcik7XG4gIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSlcbiAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMubG9vc2UpO1xuXG4gIHJldHVybiB0aGlzLmNvbXBhcmVNYWluKG90aGVyKSB8fCB0aGlzLmNvbXBhcmVQcmUob3RoZXIpO1xufTtcblxuU2VtVmVyLnByb3RvdHlwZS5jb21wYXJlTWFpbiA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSlcbiAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMubG9vc2UpO1xuXG4gIHJldHVybiBjb21wYXJlSWRlbnRpZmllcnModGhpcy5tYWpvciwgb3RoZXIubWFqb3IpIHx8XG4gICAgICAgICBjb21wYXJlSWRlbnRpZmllcnModGhpcy5taW5vciwgb3RoZXIubWlub3IpIHx8XG4gICAgICAgICBjb21wYXJlSWRlbnRpZmllcnModGhpcy5wYXRjaCwgb3RoZXIucGF0Y2gpO1xufTtcblxuU2VtVmVyLnByb3RvdHlwZS5jb21wYXJlUHJlID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKVxuICAgIG90aGVyID0gbmV3IFNlbVZlcihvdGhlciwgdGhpcy5sb29zZSk7XG5cbiAgLy8gTk9UIGhhdmluZyBhIHByZXJlbGVhc2UgaXMgPiBoYXZpbmcgb25lXG4gIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmICFvdGhlci5wcmVyZWxlYXNlLmxlbmd0aClcbiAgICByZXR1cm4gLTE7XG4gIGVsc2UgaWYgKCF0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmIG90aGVyLnByZXJlbGVhc2UubGVuZ3RoKVxuICAgIHJldHVybiAxO1xuICBlbHNlIGlmICghdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCAmJiAhb3RoZXIucHJlcmVsZWFzZS5sZW5ndGgpXG4gICAgcmV0dXJuIDA7XG5cbiAgdmFyIGkgPSAwO1xuICBkbyB7XG4gICAgdmFyIGEgPSB0aGlzLnByZXJlbGVhc2VbaV07XG4gICAgdmFyIGIgPSBvdGhlci5wcmVyZWxlYXNlW2ldO1xuICAgIGRlYnVnKCdwcmVyZWxlYXNlIGNvbXBhcmUnLCBpLCBhLCBiKTtcbiAgICBpZiAoYSA9PT0gdW5kZWZpbmVkICYmIGIgPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiAwO1xuICAgIGVsc2UgaWYgKGIgPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKGEgPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiAtMTtcbiAgICBlbHNlIGlmIChhID09PSBiKVxuICAgICAgY29udGludWU7XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIGNvbXBhcmVJZGVudGlmaWVycyhhLCBiKTtcbiAgfSB3aGlsZSAoKytpKTtcbn07XG5cbi8vIHByZW1pbm9yIHdpbGwgYnVtcCB0aGUgdmVyc2lvbiB1cCB0byB0aGUgbmV4dCBtaW5vciByZWxlYXNlLCBhbmQgaW1tZWRpYXRlbHlcbi8vIGRvd24gdG8gcHJlLXJlbGVhc2UuIHByZW1ham9yIGFuZCBwcmVwYXRjaCB3b3JrIHRoZSBzYW1lIHdheS5cblNlbVZlci5wcm90b3R5cGUuaW5jID0gZnVuY3Rpb24ocmVsZWFzZSwgaWRlbnRpZmllcikge1xuICBzd2l0Y2ggKHJlbGVhc2UpIHtcbiAgICBjYXNlICdwcmVtYWpvcic6XG4gICAgICB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID0gMDtcbiAgICAgIHRoaXMucGF0Y2ggPSAwO1xuICAgICAgdGhpcy5taW5vciA9IDA7XG4gICAgICB0aGlzLm1ham9yKys7XG4gICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllcik7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdwcmVtaW5vcic6XG4gICAgICB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID0gMDtcbiAgICAgIHRoaXMucGF0Y2ggPSAwO1xuICAgICAgdGhpcy5taW5vcisrO1xuICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncHJlcGF0Y2gnOlxuICAgICAgLy8gSWYgdGhpcyBpcyBhbHJlYWR5IGEgcHJlcmVsZWFzZSwgaXQgd2lsbCBidW1wIHRvIHRoZSBuZXh0IHZlcnNpb25cbiAgICAgIC8vIGRyb3AgYW55IHByZXJlbGVhc2VzIHRoYXQgbWlnaHQgYWxyZWFkeSBleGlzdCwgc2luY2UgdGhleSBhcmUgbm90XG4gICAgICAvLyByZWxldmFudCBhdCB0aGlzIHBvaW50LlxuICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9IDA7XG4gICAgICB0aGlzLmluYygncGF0Y2gnLCBpZGVudGlmaWVyKTtcbiAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKTtcbiAgICAgIGJyZWFrO1xuICAgIC8vIElmIHRoZSBpbnB1dCBpcyBhIG5vbi1wcmVyZWxlYXNlIHZlcnNpb24sIHRoaXMgYWN0cyB0aGUgc2FtZSBhc1xuICAgIC8vIHByZXBhdGNoLlxuICAgIGNhc2UgJ3ByZXJlbGVhc2UnOlxuICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApXG4gICAgICAgIHRoaXMuaW5jKCdwYXRjaCcsIGlkZW50aWZpZXIpO1xuICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdtYWpvcic6XG4gICAgICAvLyBJZiB0aGlzIGlzIGEgcHJlLW1ham9yIHZlcnNpb24sIGJ1bXAgdXAgdG8gdGhlIHNhbWUgbWFqb3IgdmVyc2lvbi5cbiAgICAgIC8vIE90aGVyd2lzZSBpbmNyZW1lbnQgbWFqb3IuXG4gICAgICAvLyAxLjAuMC01IGJ1bXBzIHRvIDEuMC4wXG4gICAgICAvLyAxLjEuMCBidW1wcyB0byAyLjAuMFxuICAgICAgaWYgKHRoaXMubWlub3IgIT09IDAgfHwgdGhpcy5wYXRjaCAhPT0gMCB8fCB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKVxuICAgICAgICB0aGlzLm1ham9yKys7XG4gICAgICB0aGlzLm1pbm9yID0gMDtcbiAgICAgIHRoaXMucGF0Y2ggPSAwO1xuICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW107XG4gICAgICBicmVhaztcbiAgICBjYXNlICdtaW5vcic6XG4gICAgICAvLyBJZiB0aGlzIGlzIGEgcHJlLW1pbm9yIHZlcnNpb24sIGJ1bXAgdXAgdG8gdGhlIHNhbWUgbWlub3IgdmVyc2lvbi5cbiAgICAgIC8vIE90aGVyd2lzZSBpbmNyZW1lbnQgbWlub3IuXG4gICAgICAvLyAxLjIuMC01IGJ1bXBzIHRvIDEuMi4wXG4gICAgICAvLyAxLjIuMSBidW1wcyB0byAxLjMuMFxuICAgICAgaWYgKHRoaXMucGF0Y2ggIT09IDAgfHwgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMClcbiAgICAgICAgdGhpcy5taW5vcisrO1xuICAgICAgdGhpcy5wYXRjaCA9IDA7XG4gICAgICB0aGlzLnByZXJlbGVhc2UgPSBbXTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3BhdGNoJzpcbiAgICAgIC8vIElmIHRoaXMgaXMgbm90IGEgcHJlLXJlbGVhc2UgdmVyc2lvbiwgaXQgd2lsbCBpbmNyZW1lbnQgdGhlIHBhdGNoLlxuICAgICAgLy8gSWYgaXQgaXMgYSBwcmUtcmVsZWFzZSBpdCB3aWxsIGJ1bXAgdXAgdG8gdGhlIHNhbWUgcGF0Y2ggdmVyc2lvbi5cbiAgICAgIC8vIDEuMi4wLTUgcGF0Y2hlcyB0byAxLjIuMFxuICAgICAgLy8gMS4yLjAgcGF0Y2hlcyB0byAxLjIuMVxuICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApXG4gICAgICAgIHRoaXMucGF0Y2grKztcbiAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtdO1xuICAgICAgYnJlYWs7XG4gICAgLy8gVGhpcyBwcm9iYWJseSBzaG91bGRuJ3QgYmUgdXNlZCBwdWJsaWNseS5cbiAgICAvLyAxLjAuMCBcInByZVwiIHdvdWxkIGJlY29tZSAxLjAuMC0wIHdoaWNoIGlzIHRoZSB3cm9uZyBkaXJlY3Rpb24uXG4gICAgY2FzZSAncHJlJzpcbiAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKVxuICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbMF07XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIGkgPSB0aGlzLnByZXJlbGVhc2UubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoLS1pID49IDApIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJlcmVsZWFzZVtpXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMucHJlcmVsZWFzZVtpXSsrO1xuICAgICAgICAgICAgaSA9IC0yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA9PT0gLTEpIC8vIGRpZG4ndCBpbmNyZW1lbnQgYW55dGhpbmdcbiAgICAgICAgICB0aGlzLnByZXJlbGVhc2UucHVzaCgwKTtcbiAgICAgIH1cbiAgICAgIGlmIChpZGVudGlmaWVyKSB7XG4gICAgICAgIC8vIDEuMi4wLWJldGEuMSBidW1wcyB0byAxLjIuMC1iZXRhLjIsXG4gICAgICAgIC8vIDEuMi4wLWJldGEuZm9vYmx6IG9yIDEuMi4wLWJldGEgYnVtcHMgdG8gMS4yLjAtYmV0YS4wXG4gICAgICAgIGlmICh0aGlzLnByZXJlbGVhc2VbMF0gPT09IGlkZW50aWZpZXIpIHtcbiAgICAgICAgICBpZiAoaXNOYU4odGhpcy5wcmVyZWxlYXNlWzFdKSlcbiAgICAgICAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtpZGVudGlmaWVyLCAwXTtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW2lkZW50aWZpZXIsIDBdO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGluY3JlbWVudCBhcmd1bWVudDogJyArIHJlbGVhc2UpO1xuICB9XG4gIHRoaXMuZm9ybWF0KCk7XG4gIHRoaXMucmF3ID0gdGhpcy52ZXJzaW9uO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmV4cG9ydHMuaW5jID0gaW5jO1xuZnVuY3Rpb24gaW5jKHZlcnNpb24sIHJlbGVhc2UsIGxvb3NlLCBpZGVudGlmaWVyKSB7XG4gIGlmICh0eXBlb2YobG9vc2UpID09PSAnc3RyaW5nJykge1xuICAgIGlkZW50aWZpZXIgPSBsb29zZTtcbiAgICBsb29zZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBTZW1WZXIodmVyc2lvbiwgbG9vc2UpLmluYyhyZWxlYXNlLCBpZGVudGlmaWVyKS52ZXJzaW9uO1xuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmV4cG9ydHMuZGlmZiA9IGRpZmY7XG5mdW5jdGlvbiBkaWZmKHZlcnNpb24xLCB2ZXJzaW9uMikge1xuICBpZiAoZXEodmVyc2lvbjEsIHZlcnNpb24yKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9IGVsc2Uge1xuICAgIHZhciB2MSA9IHBhcnNlKHZlcnNpb24xKTtcbiAgICB2YXIgdjIgPSBwYXJzZSh2ZXJzaW9uMik7XG4gICAgaWYgKHYxLnByZXJlbGVhc2UubGVuZ3RoIHx8IHYyLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gdjEpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ21ham9yJyB8fCBrZXkgPT09ICdtaW5vcicgfHwga2V5ID09PSAncGF0Y2gnKSB7XG4gICAgICAgICAgaWYgKHYxW2tleV0gIT09IHYyW2tleV0pIHtcbiAgICAgICAgICAgIHJldHVybiAncHJlJytrZXk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gJ3ByZXJlbGVhc2UnO1xuICAgIH1cbiAgICBmb3IgKHZhciBrZXkgaW4gdjEpIHtcbiAgICAgIGlmIChrZXkgPT09ICdtYWpvcicgfHwga2V5ID09PSAnbWlub3InIHx8IGtleSA9PT0gJ3BhdGNoJykge1xuICAgICAgICBpZiAodjFba2V5XSAhPT0gdjJba2V5XSkge1xuICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0cy5jb21wYXJlSWRlbnRpZmllcnMgPSBjb21wYXJlSWRlbnRpZmllcnM7XG5cbnZhciBudW1lcmljID0gL15bMC05XSskLztcbmZ1bmN0aW9uIGNvbXBhcmVJZGVudGlmaWVycyhhLCBiKSB7XG4gIHZhciBhbnVtID0gbnVtZXJpYy50ZXN0KGEpO1xuICB2YXIgYm51bSA9IG51bWVyaWMudGVzdChiKTtcblxuICBpZiAoYW51bSAmJiBibnVtKSB7XG4gICAgYSA9ICthO1xuICAgIGIgPSArYjtcbiAgfVxuXG4gIHJldHVybiAoYW51bSAmJiAhYm51bSkgPyAtMSA6XG4gICAgICAgICAoYm51bSAmJiAhYW51bSkgPyAxIDpcbiAgICAgICAgIGEgPCBiID8gLTEgOlxuICAgICAgICAgYSA+IGIgPyAxIDpcbiAgICAgICAgIDA7XG59XG5cbmV4cG9ydHMucmNvbXBhcmVJZGVudGlmaWVycyA9IHJjb21wYXJlSWRlbnRpZmllcnM7XG5mdW5jdGlvbiByY29tcGFyZUlkZW50aWZpZXJzKGEsIGIpIHtcbiAgcmV0dXJuIGNvbXBhcmVJZGVudGlmaWVycyhiLCBhKTtcbn1cblxuZXhwb3J0cy5tYWpvciA9IG1ham9yO1xuZnVuY3Rpb24gbWFqb3IoYSwgbG9vc2UpIHtcbiAgcmV0dXJuIG5ldyBTZW1WZXIoYSwgbG9vc2UpLm1ham9yO1xufVxuXG5leHBvcnRzLm1pbm9yID0gbWlub3I7XG5mdW5jdGlvbiBtaW5vcihhLCBsb29zZSkge1xuICByZXR1cm4gbmV3IFNlbVZlcihhLCBsb29zZSkubWlub3I7XG59XG5cbmV4cG9ydHMucGF0Y2ggPSBwYXRjaDtcbmZ1bmN0aW9uIHBhdGNoKGEsIGxvb3NlKSB7XG4gIHJldHVybiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5wYXRjaDtcbn1cblxuZXhwb3J0cy5jb21wYXJlID0gY29tcGFyZTtcbmZ1bmN0aW9uIGNvbXBhcmUoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIG5ldyBTZW1WZXIoYSwgbG9vc2UpLmNvbXBhcmUoYik7XG59XG5cbmV4cG9ydHMuY29tcGFyZUxvb3NlID0gY29tcGFyZUxvb3NlO1xuZnVuY3Rpb24gY29tcGFyZUxvb3NlKGEsIGIpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgdHJ1ZSk7XG59XG5cbmV4cG9ydHMucmNvbXBhcmUgPSByY29tcGFyZTtcbmZ1bmN0aW9uIHJjb21wYXJlKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGIsIGEsIGxvb3NlKTtcbn1cblxuZXhwb3J0cy5zb3J0ID0gc29ydDtcbmZ1bmN0aW9uIHNvcnQobGlzdCwgbG9vc2UpIHtcbiAgcmV0dXJuIGxpc3Quc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuY29tcGFyZShhLCBiLCBsb29zZSk7XG4gIH0pO1xufVxuXG5leHBvcnRzLnJzb3J0ID0gcnNvcnQ7XG5mdW5jdGlvbiByc29ydChsaXN0LCBsb29zZSkge1xuICByZXR1cm4gbGlzdC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5yY29tcGFyZShhLCBiLCBsb29zZSk7XG4gIH0pO1xufVxuXG5leHBvcnRzLmd0ID0gZ3Q7XG5mdW5jdGlvbiBndChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPiAwO1xufVxuXG5leHBvcnRzLmx0ID0gbHQ7XG5mdW5jdGlvbiBsdChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPCAwO1xufVxuXG5leHBvcnRzLmVxID0gZXE7XG5mdW5jdGlvbiBlcShhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPT09IDA7XG59XG5cbmV4cG9ydHMubmVxID0gbmVxO1xuZnVuY3Rpb24gbmVxKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSAhPT0gMDtcbn1cblxuZXhwb3J0cy5ndGUgPSBndGU7XG5mdW5jdGlvbiBndGUoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpID49IDA7XG59XG5cbmV4cG9ydHMubHRlID0gbHRlO1xuZnVuY3Rpb24gbHRlKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSA8PSAwO1xufVxuXG5leHBvcnRzLmNtcCA9IGNtcDtcbmZ1bmN0aW9uIGNtcChhLCBvcCwgYiwgbG9vc2UpIHtcbiAgdmFyIHJldDtcbiAgc3dpdGNoIChvcCkge1xuICAgIGNhc2UgJz09PSc6XG4gICAgICBpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnKSBhID0gYS52ZXJzaW9uO1xuICAgICAgaWYgKHR5cGVvZiBiID09PSAnb2JqZWN0JykgYiA9IGIudmVyc2lvbjtcbiAgICAgIHJldCA9IGEgPT09IGI7XG4gICAgICBicmVhaztcbiAgICBjYXNlICchPT0nOlxuICAgICAgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0JykgYSA9IGEudmVyc2lvbjtcbiAgICAgIGlmICh0eXBlb2YgYiA9PT0gJ29iamVjdCcpIGIgPSBiLnZlcnNpb247XG4gICAgICByZXQgPSBhICE9PSBiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnJzogY2FzZSAnPSc6IGNhc2UgJz09JzogcmV0ID0gZXEoYSwgYiwgbG9vc2UpOyBicmVhaztcbiAgICBjYXNlICchPSc6IHJldCA9IG5lcShhLCBiLCBsb29zZSk7IGJyZWFrO1xuICAgIGNhc2UgJz4nOiByZXQgPSBndChhLCBiLCBsb29zZSk7IGJyZWFrO1xuICAgIGNhc2UgJz49JzogcmV0ID0gZ3RlKGEsIGIsIGxvb3NlKTsgYnJlYWs7XG4gICAgY2FzZSAnPCc6IHJldCA9IGx0KGEsIGIsIGxvb3NlKTsgYnJlYWs7XG4gICAgY2FzZSAnPD0nOiByZXQgPSBsdGUoYSwgYiwgbG9vc2UpOyBicmVhaztcbiAgICBkZWZhdWx0OiB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG9wZXJhdG9yOiAnICsgb3ApO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmV4cG9ydHMuQ29tcGFyYXRvciA9IENvbXBhcmF0b3I7XG5mdW5jdGlvbiBDb21wYXJhdG9yKGNvbXAsIGxvb3NlKSB7XG4gIGlmIChjb21wIGluc3RhbmNlb2YgQ29tcGFyYXRvcikge1xuICAgIGlmIChjb21wLmxvb3NlID09PSBsb29zZSlcbiAgICAgIHJldHVybiBjb21wO1xuICAgIGVsc2VcbiAgICAgIGNvbXAgPSBjb21wLnZhbHVlO1xuICB9XG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIENvbXBhcmF0b3IpKVxuICAgIHJldHVybiBuZXcgQ29tcGFyYXRvcihjb21wLCBsb29zZSk7XG5cbiAgZGVidWcoJ2NvbXBhcmF0b3InLCBjb21wLCBsb29zZSk7XG4gIHRoaXMubG9vc2UgPSBsb29zZTtcbiAgdGhpcy5wYXJzZShjb21wKTtcblxuICBpZiAodGhpcy5zZW12ZXIgPT09IEFOWSlcbiAgICB0aGlzLnZhbHVlID0gJyc7XG4gIGVsc2VcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5vcGVyYXRvciArIHRoaXMuc2VtdmVyLnZlcnNpb247XG5cbiAgZGVidWcoJ2NvbXAnLCB0aGlzKTtcbn1cblxudmFyIEFOWSA9IHt9O1xuQ29tcGFyYXRvci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbihjb21wKSB7XG4gIHZhciByID0gdGhpcy5sb29zZSA/IHJlW0NPTVBBUkFUT1JMT09TRV0gOiByZVtDT01QQVJBVE9SXTtcbiAgdmFyIG0gPSBjb21wLm1hdGNoKHIpO1xuXG4gIGlmICghbSlcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGNvbXBhcmF0b3I6ICcgKyBjb21wKTtcblxuICB0aGlzLm9wZXJhdG9yID0gbVsxXTtcbiAgaWYgKHRoaXMub3BlcmF0b3IgPT09ICc9JylcbiAgICB0aGlzLm9wZXJhdG9yID0gJyc7XG5cbiAgLy8gaWYgaXQgbGl0ZXJhbGx5IGlzIGp1c3QgJz4nIG9yICcnIHRoZW4gYWxsb3cgYW55dGhpbmcuXG4gIGlmICghbVsyXSlcbiAgICB0aGlzLnNlbXZlciA9IEFOWTtcbiAgZWxzZVxuICAgIHRoaXMuc2VtdmVyID0gbmV3IFNlbVZlcihtWzJdLCB0aGlzLmxvb3NlKTtcbn07XG5cbkNvbXBhcmF0b3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnZhbHVlO1xufTtcblxuQ29tcGFyYXRvci5wcm90b3R5cGUudGVzdCA9IGZ1bmN0aW9uKHZlcnNpb24pIHtcbiAgZGVidWcoJ0NvbXBhcmF0b3IudGVzdCcsIHZlcnNpb24sIHRoaXMubG9vc2UpO1xuXG4gIGlmICh0aGlzLnNlbXZlciA9PT0gQU5ZKVxuICAgIHJldHVybiB0cnVlO1xuXG4gIGlmICh0eXBlb2YgdmVyc2lvbiA9PT0gJ3N0cmluZycpXG4gICAgdmVyc2lvbiA9IG5ldyBTZW1WZXIodmVyc2lvbiwgdGhpcy5sb29zZSk7XG5cbiAgcmV0dXJuIGNtcCh2ZXJzaW9uLCB0aGlzLm9wZXJhdG9yLCB0aGlzLnNlbXZlciwgdGhpcy5sb29zZSk7XG59O1xuXG5cbmV4cG9ydHMuUmFuZ2UgPSBSYW5nZTtcbmZ1bmN0aW9uIFJhbmdlKHJhbmdlLCBsb29zZSkge1xuICBpZiAoKHJhbmdlIGluc3RhbmNlb2YgUmFuZ2UpICYmIHJhbmdlLmxvb3NlID09PSBsb29zZSlcbiAgICByZXR1cm4gcmFuZ2U7XG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJhbmdlKSlcbiAgICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLCBsb29zZSk7XG5cbiAgdGhpcy5sb29zZSA9IGxvb3NlO1xuXG4gIC8vIEZpcnN0LCBzcGxpdCBiYXNlZCBvbiBib29sZWFuIG9yIHx8XG4gIHRoaXMucmF3ID0gcmFuZ2U7XG4gIHRoaXMuc2V0ID0gcmFuZ2Uuc3BsaXQoL1xccypcXHxcXHxcXHMqLykubWFwKGZ1bmN0aW9uKHJhbmdlKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VSYW5nZShyYW5nZS50cmltKCkpO1xuICB9LCB0aGlzKS5maWx0ZXIoZnVuY3Rpb24oYykge1xuICAgIC8vIHRocm93IG91dCBhbnkgdGhhdCBhcmUgbm90IHJlbGV2YW50IGZvciB3aGF0ZXZlciByZWFzb25cbiAgICByZXR1cm4gYy5sZW5ndGg7XG4gIH0pO1xuXG4gIGlmICghdGhpcy5zZXQubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBTZW1WZXIgUmFuZ2U6ICcgKyByYW5nZSk7XG4gIH1cblxuICB0aGlzLmZvcm1hdCgpO1xufVxuXG5SYW5nZS5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucmFuZ2UgPSB0aGlzLnNldC5tYXAoZnVuY3Rpb24oY29tcHMpIHtcbiAgICByZXR1cm4gY29tcHMuam9pbignICcpLnRyaW0oKTtcbiAgfSkuam9pbignfHwnKS50cmltKCk7XG4gIHJldHVybiB0aGlzLnJhbmdlO1xufTtcblxuUmFuZ2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnJhbmdlO1xufTtcblxuUmFuZ2UucHJvdG90eXBlLnBhcnNlUmFuZ2UgPSBmdW5jdGlvbihyYW5nZSkge1xuICB2YXIgbG9vc2UgPSB0aGlzLmxvb3NlO1xuICByYW5nZSA9IHJhbmdlLnRyaW0oKTtcbiAgZGVidWcoJ3JhbmdlJywgcmFuZ2UsIGxvb3NlKTtcbiAgLy8gYDEuMi4zIC0gMS4yLjRgID0+IGA+PTEuMi4zIDw9MS4yLjRgXG4gIHZhciBociA9IGxvb3NlID8gcmVbSFlQSEVOUkFOR0VMT09TRV0gOiByZVtIWVBIRU5SQU5HRV07XG4gIHJhbmdlID0gcmFuZ2UucmVwbGFjZShociwgaHlwaGVuUmVwbGFjZSk7XG4gIGRlYnVnKCdoeXBoZW4gcmVwbGFjZScsIHJhbmdlKTtcbiAgLy8gYD4gMS4yLjMgPCAxLjIuNWAgPT4gYD4xLjIuMyA8MS4yLjVgXG4gIHJhbmdlID0gcmFuZ2UucmVwbGFjZShyZVtDT01QQVJBVE9SVFJJTV0sIGNvbXBhcmF0b3JUcmltUmVwbGFjZSk7XG4gIGRlYnVnKCdjb21wYXJhdG9yIHRyaW0nLCByYW5nZSwgcmVbQ09NUEFSQVRPUlRSSU1dKTtcblxuICAvLyBgfiAxLjIuM2AgPT4gYH4xLjIuM2BcbiAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW1RJTERFVFJJTV0sIHRpbGRlVHJpbVJlcGxhY2UpO1xuXG4gIC8vIGBeIDEuMi4zYCA9PiBgXjEuMi4zYFxuICByYW5nZSA9IHJhbmdlLnJlcGxhY2UocmVbQ0FSRVRUUklNXSwgY2FyZXRUcmltUmVwbGFjZSk7XG5cbiAgLy8gbm9ybWFsaXplIHNwYWNlc1xuICByYW5nZSA9IHJhbmdlLnNwbGl0KC9cXHMrLykuam9pbignICcpO1xuXG4gIC8vIEF0IHRoaXMgcG9pbnQsIHRoZSByYW5nZSBpcyBjb21wbGV0ZWx5IHRyaW1tZWQgYW5kXG4gIC8vIHJlYWR5IHRvIGJlIHNwbGl0IGludG8gY29tcGFyYXRvcnMuXG5cbiAgdmFyIGNvbXBSZSA9IGxvb3NlID8gcmVbQ09NUEFSQVRPUkxPT1NFXSA6IHJlW0NPTVBBUkFUT1JdO1xuICB2YXIgc2V0ID0gcmFuZ2Uuc3BsaXQoJyAnKS5tYXAoZnVuY3Rpb24oY29tcCkge1xuICAgIHJldHVybiBwYXJzZUNvbXBhcmF0b3IoY29tcCwgbG9vc2UpO1xuICB9KS5qb2luKCcgJykuc3BsaXQoL1xccysvKTtcbiAgaWYgKHRoaXMubG9vc2UpIHtcbiAgICAvLyBpbiBsb29zZSBtb2RlLCB0aHJvdyBvdXQgYW55IHRoYXQgYXJlIG5vdCB2YWxpZCBjb21wYXJhdG9yc1xuICAgIHNldCA9IHNldC5maWx0ZXIoZnVuY3Rpb24oY29tcCkge1xuICAgICAgcmV0dXJuICEhY29tcC5tYXRjaChjb21wUmUpO1xuICAgIH0pO1xuICB9XG4gIHNldCA9IHNldC5tYXAoZnVuY3Rpb24oY29tcCkge1xuICAgIHJldHVybiBuZXcgQ29tcGFyYXRvcihjb21wLCBsb29zZSk7XG4gIH0pO1xuXG4gIHJldHVybiBzZXQ7XG59O1xuXG4vLyBNb3N0bHkganVzdCBmb3IgdGVzdGluZyBhbmQgbGVnYWN5IEFQSSByZWFzb25zXG5leHBvcnRzLnRvQ29tcGFyYXRvcnMgPSB0b0NvbXBhcmF0b3JzO1xuZnVuY3Rpb24gdG9Db21wYXJhdG9ycyhyYW5nZSwgbG9vc2UpIHtcbiAgcmV0dXJuIG5ldyBSYW5nZShyYW5nZSwgbG9vc2UpLnNldC5tYXAoZnVuY3Rpb24oY29tcCkge1xuICAgIHJldHVybiBjb21wLm1hcChmdW5jdGlvbihjKSB7XG4gICAgICByZXR1cm4gYy52YWx1ZTtcbiAgICB9KS5qb2luKCcgJykudHJpbSgpLnNwbGl0KCcgJyk7XG4gIH0pO1xufVxuXG4vLyBjb21wcmlzZWQgb2YgeHJhbmdlcywgdGlsZGVzLCBzdGFycywgYW5kIGd0bHQncyBhdCB0aGlzIHBvaW50LlxuLy8gYWxyZWFkeSByZXBsYWNlZCB0aGUgaHlwaGVuIHJhbmdlc1xuLy8gdHVybiBpbnRvIGEgc2V0IG9mIEpVU1QgY29tcGFyYXRvcnMuXG5mdW5jdGlvbiBwYXJzZUNvbXBhcmF0b3IoY29tcCwgbG9vc2UpIHtcbiAgZGVidWcoJ2NvbXAnLCBjb21wKTtcbiAgY29tcCA9IHJlcGxhY2VDYXJldHMoY29tcCwgbG9vc2UpO1xuICBkZWJ1ZygnY2FyZXQnLCBjb21wKTtcbiAgY29tcCA9IHJlcGxhY2VUaWxkZXMoY29tcCwgbG9vc2UpO1xuICBkZWJ1ZygndGlsZGVzJywgY29tcCk7XG4gIGNvbXAgPSByZXBsYWNlWFJhbmdlcyhjb21wLCBsb29zZSk7XG4gIGRlYnVnKCd4cmFuZ2UnLCBjb21wKTtcbiAgY29tcCA9IHJlcGxhY2VTdGFycyhjb21wLCBsb29zZSk7XG4gIGRlYnVnKCdzdGFycycsIGNvbXApO1xuICByZXR1cm4gY29tcDtcbn1cblxuZnVuY3Rpb24gaXNYKGlkKSB7XG4gIHJldHVybiAhaWQgfHwgaWQudG9Mb3dlckNhc2UoKSA9PT0gJ3gnIHx8IGlkID09PSAnKic7XG59XG5cbi8vIH4sIH4+IC0tPiAqIChhbnksIGtpbmRhIHNpbGx5KVxuLy8gfjIsIH4yLngsIH4yLngueCwgfj4yLCB+PjIueCB+PjIueC54IC0tPiA+PTIuMC4wIDwzLjAuMFxuLy8gfjIuMCwgfjIuMC54LCB+PjIuMCwgfj4yLjAueCAtLT4gPj0yLjAuMCA8Mi4xLjBcbi8vIH4xLjIsIH4xLjIueCwgfj4xLjIsIH4+MS4yLnggLS0+ID49MS4yLjAgPDEuMy4wXG4vLyB+MS4yLjMsIH4+MS4yLjMgLS0+ID49MS4yLjMgPDEuMy4wXG4vLyB+MS4yLjAsIH4+MS4yLjAgLS0+ID49MS4yLjAgPDEuMy4wXG5mdW5jdGlvbiByZXBsYWNlVGlsZGVzKGNvbXAsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wLnRyaW0oKS5zcGxpdCgvXFxzKy8pLm1hcChmdW5jdGlvbihjb21wKSB7XG4gICAgcmV0dXJuIHJlcGxhY2VUaWxkZShjb21wLCBsb29zZSk7XG4gIH0pLmpvaW4oJyAnKTtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVRpbGRlKGNvbXAsIGxvb3NlKSB7XG4gIHZhciByID0gbG9vc2UgPyByZVtUSUxERUxPT1NFXSA6IHJlW1RJTERFXTtcbiAgcmV0dXJuIGNvbXAucmVwbGFjZShyLCBmdW5jdGlvbihfLCBNLCBtLCBwLCBwcikge1xuICAgIGRlYnVnKCd0aWxkZScsIGNvbXAsIF8sIE0sIG0sIHAsIHByKTtcbiAgICB2YXIgcmV0O1xuXG4gICAgaWYgKGlzWChNKSlcbiAgICAgIHJldCA9ICcnO1xuICAgIGVsc2UgaWYgKGlzWChtKSlcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4wLjAgPCcgKyAoK00gKyAxKSArICcuMC4wJztcbiAgICBlbHNlIGlmIChpc1gocCkpXG4gICAgICAvLyB+MS4yID09ID49MS4yLjAtIDwxLjMuMC1cbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuMCA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCc7XG4gICAgZWxzZSBpZiAocHIpIHtcbiAgICAgIGRlYnVnKCdyZXBsYWNlVGlsZGUgcHInLCBwcik7XG4gICAgICBpZiAocHIuY2hhckF0KDApICE9PSAnLScpXG4gICAgICAgIHByID0gJy0nICsgcHI7XG4gICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgcHIgK1xuICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCc7XG4gICAgfSBlbHNlXG4gICAgICAvLyB+MS4yLjMgPT0gPj0xLjIuMyA8MS4zLjBcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgK1xuICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCc7XG5cbiAgICBkZWJ1ZygndGlsZGUgcmV0dXJuJywgcmV0KTtcbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cblxuLy8gXiAtLT4gKiAoYW55LCBraW5kYSBzaWxseSlcbi8vIF4yLCBeMi54LCBeMi54LnggLS0+ID49Mi4wLjAgPDMuMC4wXG4vLyBeMi4wLCBeMi4wLnggLS0+ID49Mi4wLjAgPDMuMC4wXG4vLyBeMS4yLCBeMS4yLnggLS0+ID49MS4yLjAgPDIuMC4wXG4vLyBeMS4yLjMgLS0+ID49MS4yLjMgPDIuMC4wXG4vLyBeMS4yLjAgLS0+ID49MS4yLjAgPDIuMC4wXG5mdW5jdGlvbiByZXBsYWNlQ2FyZXRzKGNvbXAsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wLnRyaW0oKS5zcGxpdCgvXFxzKy8pLm1hcChmdW5jdGlvbihjb21wKSB7XG4gICAgcmV0dXJuIHJlcGxhY2VDYXJldChjb21wLCBsb29zZSk7XG4gIH0pLmpvaW4oJyAnKTtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZUNhcmV0KGNvbXAsIGxvb3NlKSB7XG4gIGRlYnVnKCdjYXJldCcsIGNvbXAsIGxvb3NlKTtcbiAgdmFyIHIgPSBsb29zZSA/IHJlW0NBUkVUTE9PU0VdIDogcmVbQ0FSRVRdO1xuICByZXR1cm4gY29tcC5yZXBsYWNlKHIsIGZ1bmN0aW9uKF8sIE0sIG0sIHAsIHByKSB7XG4gICAgZGVidWcoJ2NhcmV0JywgY29tcCwgXywgTSwgbSwgcCwgcHIpO1xuICAgIHZhciByZXQ7XG5cbiAgICBpZiAoaXNYKE0pKVxuICAgICAgcmV0ID0gJyc7XG4gICAgZWxzZSBpZiAoaXNYKG0pKVxuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLjAuMCA8JyArICgrTSArIDEpICsgJy4wLjAnO1xuICAgIGVsc2UgaWYgKGlzWChwKSkge1xuICAgICAgaWYgKE0gPT09ICcwJylcbiAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4wIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4wIDwnICsgKCtNICsgMSkgKyAnLjAuMCc7XG4gICAgfSBlbHNlIGlmIChwcikge1xuICAgICAgZGVidWcoJ3JlcGxhY2VDYXJldCBwcicsIHByKTtcbiAgICAgIGlmIChwci5jaGFyQXQoMCkgIT09ICctJylcbiAgICAgICAgcHIgPSAnLScgKyBwcjtcbiAgICAgIGlmIChNID09PSAnMCcpIHtcbiAgICAgICAgaWYgKG0gPT09ICcwJylcbiAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgcHIgK1xuICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgbSArICcuJyArICgrcCArIDEpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArIHByICtcbiAgICAgICAgICAgICAgICAnIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcbiAgICAgIH0gZWxzZVxuICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgcHIgK1xuICAgICAgICAgICAgICAnIDwnICsgKCtNICsgMSkgKyAnLjAuMCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnKCdubyBwcicpO1xuICAgICAgaWYgKE0gPT09ICcwJykge1xuICAgICAgICBpZiAobSA9PT0gJzAnKVxuICAgICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgK1xuICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgbSArICcuJyArICgrcCArIDEpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCc7XG4gICAgICB9IGVsc2VcbiAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAgICcgPCcgKyAoK00gKyAxKSArICcuMC4wJztcbiAgICB9XG5cbiAgICBkZWJ1ZygnY2FyZXQgcmV0dXJuJywgcmV0KTtcbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVhSYW5nZXMoY29tcCwgbG9vc2UpIHtcbiAgZGVidWcoJ3JlcGxhY2VYUmFuZ2VzJywgY29tcCwgbG9vc2UpO1xuICByZXR1cm4gY29tcC5zcGxpdCgvXFxzKy8pLm1hcChmdW5jdGlvbihjb21wKSB7XG4gICAgcmV0dXJuIHJlcGxhY2VYUmFuZ2UoY29tcCwgbG9vc2UpO1xuICB9KS5qb2luKCcgJyk7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VYUmFuZ2UoY29tcCwgbG9vc2UpIHtcbiAgY29tcCA9IGNvbXAudHJpbSgpO1xuICB2YXIgciA9IGxvb3NlID8gcmVbWFJBTkdFTE9PU0VdIDogcmVbWFJBTkdFXTtcbiAgcmV0dXJuIGNvbXAucmVwbGFjZShyLCBmdW5jdGlvbihyZXQsIGd0bHQsIE0sIG0sIHAsIHByKSB7XG4gICAgZGVidWcoJ3hSYW5nZScsIGNvbXAsIHJldCwgZ3RsdCwgTSwgbSwgcCwgcHIpO1xuICAgIHZhciB4TSA9IGlzWChNKTtcbiAgICB2YXIgeG0gPSB4TSB8fCBpc1gobSk7XG4gICAgdmFyIHhwID0geG0gfHwgaXNYKHApO1xuICAgIHZhciBhbnlYID0geHA7XG5cbiAgICBpZiAoZ3RsdCA9PT0gJz0nICYmIGFueVgpXG4gICAgICBndGx0ID0gJyc7XG5cbiAgICBpZiAoeE0pIHtcbiAgICAgIGlmIChndGx0ID09PSAnPicgfHwgZ3RsdCA9PT0gJzwnKSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaXMgYWxsb3dlZFxuICAgICAgICByZXQgPSAnPDAuMC4wJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaXMgZm9yYmlkZGVuXG4gICAgICAgIHJldCA9ICcqJztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGd0bHQgJiYgYW55WCkge1xuICAgICAgLy8gcmVwbGFjZSBYIHdpdGggMFxuICAgICAgaWYgKHhtKVxuICAgICAgICBtID0gMDtcbiAgICAgIGlmICh4cClcbiAgICAgICAgcCA9IDA7XG5cbiAgICAgIGlmIChndGx0ID09PSAnPicpIHtcbiAgICAgICAgLy8gPjEgPT4gPj0yLjAuMFxuICAgICAgICAvLyA+MS4yID0+ID49MS4zLjBcbiAgICAgICAgLy8gPjEuMi4zID0+ID49IDEuMi40XG4gICAgICAgIGd0bHQgPSAnPj0nO1xuICAgICAgICBpZiAoeG0pIHtcbiAgICAgICAgICBNID0gK00gKyAxO1xuICAgICAgICAgIG0gPSAwO1xuICAgICAgICAgIHAgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHhwKSB7XG4gICAgICAgICAgbSA9ICttICsgMTtcbiAgICAgICAgICBwID0gMDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChndGx0ID09PSAnPD0nKSB7XG4gICAgICAgIC8vIDw9MC43LnggaXMgYWN0dWFsbHkgPDAuOC4wLCBzaW5jZSBhbnkgMC43Lnggc2hvdWxkXG4gICAgICAgIC8vIHBhc3MuICBTaW1pbGFybHksIDw9Ny54IGlzIGFjdHVhbGx5IDw4LjAuMCwgZXRjLlxuICAgICAgICBndGx0ID0gJzwnXG4gICAgICAgIGlmICh4bSlcbiAgICAgICAgICBNID0gK00gKyAxXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBtID0gK20gKyAxXG4gICAgICB9XG5cbiAgICAgIHJldCA9IGd0bHQgKyBNICsgJy4nICsgbSArICcuJyArIHA7XG4gICAgfSBlbHNlIGlmICh4bSkge1xuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLjAuMCA8JyArICgrTSArIDEpICsgJy4wLjAnO1xuICAgIH0gZWxzZSBpZiAoeHApIHtcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuMCA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCc7XG4gICAgfVxuXG4gICAgZGVidWcoJ3hSYW5nZSByZXR1cm4nLCByZXQpO1xuXG4gICAgcmV0dXJuIHJldDtcbiAgfSk7XG59XG5cbi8vIEJlY2F1c2UgKiBpcyBBTkQtZWQgd2l0aCBldmVyeXRoaW5nIGVsc2UgaW4gdGhlIGNvbXBhcmF0b3IsXG4vLyBhbmQgJycgbWVhbnMgXCJhbnkgdmVyc2lvblwiLCBqdXN0IHJlbW92ZSB0aGUgKnMgZW50aXJlbHkuXG5mdW5jdGlvbiByZXBsYWNlU3RhcnMoY29tcCwgbG9vc2UpIHtcbiAgZGVidWcoJ3JlcGxhY2VTdGFycycsIGNvbXAsIGxvb3NlKTtcbiAgLy8gTG9vc2VuZXNzIGlzIGlnbm9yZWQgaGVyZS4gIHN0YXIgaXMgYWx3YXlzIGFzIGxvb3NlIGFzIGl0IGdldHMhXG4gIHJldHVybiBjb21wLnRyaW0oKS5yZXBsYWNlKHJlW1NUQVJdLCAnJyk7XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgcGFzc2VkIHRvIHN0cmluZy5yZXBsYWNlKHJlW0hZUEhFTlJBTkdFXSlcbi8vIE0sIG0sIHBhdGNoLCBwcmVyZWxlYXNlLCBidWlsZFxuLy8gMS4yIC0gMy40LjUgPT4gPj0xLjIuMCA8PTMuNC41XG4vLyAxLjIuMyAtIDMuNCA9PiA+PTEuMi4wIDwzLjUuMCBBbnkgMy40Lnggd2lsbCBkb1xuLy8gMS4yIC0gMy40ID0+ID49MS4yLjAgPDMuNS4wXG5mdW5jdGlvbiBoeXBoZW5SZXBsYWNlKCQwLFxuICAgICAgICAgICAgICAgICAgICAgICBmcm9tLCBmTSwgZm0sIGZwLCBmcHIsIGZiLFxuICAgICAgICAgICAgICAgICAgICAgICB0bywgdE0sIHRtLCB0cCwgdHByLCB0Yikge1xuXG4gIGlmIChpc1goZk0pKVxuICAgIGZyb20gPSAnJztcbiAgZWxzZSBpZiAoaXNYKGZtKSlcbiAgICBmcm9tID0gJz49JyArIGZNICsgJy4wLjAnO1xuICBlbHNlIGlmIChpc1goZnApKVxuICAgIGZyb20gPSAnPj0nICsgZk0gKyAnLicgKyBmbSArICcuMCc7XG4gIGVsc2VcbiAgICBmcm9tID0gJz49JyArIGZyb207XG5cbiAgaWYgKGlzWCh0TSkpXG4gICAgdG8gPSAnJztcbiAgZWxzZSBpZiAoaXNYKHRtKSlcbiAgICB0byA9ICc8JyArICgrdE0gKyAxKSArICcuMC4wJztcbiAgZWxzZSBpZiAoaXNYKHRwKSlcbiAgICB0byA9ICc8JyArIHRNICsgJy4nICsgKCt0bSArIDEpICsgJy4wJztcbiAgZWxzZSBpZiAodHByKVxuICAgIHRvID0gJzw9JyArIHRNICsgJy4nICsgdG0gKyAnLicgKyB0cCArICctJyArIHRwcjtcbiAgZWxzZVxuICAgIHRvID0gJzw9JyArIHRvO1xuXG4gIHJldHVybiAoZnJvbSArICcgJyArIHRvKS50cmltKCk7XG59XG5cblxuLy8gaWYgQU5ZIG9mIHRoZSBzZXRzIG1hdGNoIEFMTCBvZiBpdHMgY29tcGFyYXRvcnMsIHRoZW4gcGFzc1xuUmFuZ2UucHJvdG90eXBlLnRlc3QgPSBmdW5jdGlvbih2ZXJzaW9uKSB7XG4gIGlmICghdmVyc2lvbilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiB2ZXJzaW9uID09PSAnc3RyaW5nJylcbiAgICB2ZXJzaW9uID0gbmV3IFNlbVZlcih2ZXJzaW9uLCB0aGlzLmxvb3NlKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHRlc3RTZXQodGhpcy5zZXRbaV0sIHZlcnNpb24pKVxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuZnVuY3Rpb24gdGVzdFNldChzZXQsIHZlcnNpb24pIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXQubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIXNldFtpXS50ZXN0KHZlcnNpb24pKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHZlcnNpb24ucHJlcmVsZWFzZS5sZW5ndGgpIHtcbiAgICAvLyBGaW5kIHRoZSBzZXQgb2YgdmVyc2lvbnMgdGhhdCBhcmUgYWxsb3dlZCB0byBoYXZlIHByZXJlbGVhc2VzXG4gICAgLy8gRm9yIGV4YW1wbGUsIF4xLjIuMy1wci4xIGRlc3VnYXJzIHRvID49MS4yLjMtcHIuMSA8Mi4wLjBcbiAgICAvLyBUaGF0IHNob3VsZCBhbGxvdyBgMS4yLjMtcHIuMmAgdG8gcGFzcy5cbiAgICAvLyBIb3dldmVyLCBgMS4yLjQtYWxwaGEubm90cmVhZHlgIHNob3VsZCBOT1QgYmUgYWxsb3dlZCxcbiAgICAvLyBldmVuIHRob3VnaCBpdCdzIHdpdGhpbiB0aGUgcmFuZ2Ugc2V0IGJ5IHRoZSBjb21wYXJhdG9ycy5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNldC5sZW5ndGg7IGkrKykge1xuICAgICAgZGVidWcoc2V0W2ldLnNlbXZlcik7XG4gICAgICBpZiAoc2V0W2ldLnNlbXZlciA9PT0gQU5ZKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgaWYgKHNldFtpXS5zZW12ZXIucHJlcmVsZWFzZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBhbGxvd2VkID0gc2V0W2ldLnNlbXZlcjtcbiAgICAgICAgaWYgKGFsbG93ZWQubWFqb3IgPT09IHZlcnNpb24ubWFqb3IgJiZcbiAgICAgICAgICAgIGFsbG93ZWQubWlub3IgPT09IHZlcnNpb24ubWlub3IgJiZcbiAgICAgICAgICAgIGFsbG93ZWQucGF0Y2ggPT09IHZlcnNpb24ucGF0Y2gpXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVmVyc2lvbiBoYXMgYSAtcHJlLCBidXQgaXQncyBub3Qgb25lIG9mIHRoZSBvbmVzIHdlIGxpa2UuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydHMuc2F0aXNmaWVzID0gc2F0aXNmaWVzO1xuZnVuY3Rpb24gc2F0aXNmaWVzKHZlcnNpb24sIHJhbmdlLCBsb29zZSkge1xuICB0cnkge1xuICAgIHJhbmdlID0gbmV3IFJhbmdlKHJhbmdlLCBsb29zZSk7XG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiByYW5nZS50ZXN0KHZlcnNpb24pO1xufVxuXG5leHBvcnRzLm1heFNhdGlzZnlpbmcgPSBtYXhTYXRpc2Z5aW5nO1xuZnVuY3Rpb24gbWF4U2F0aXNmeWluZyh2ZXJzaW9ucywgcmFuZ2UsIGxvb3NlKSB7XG4gIHJldHVybiB2ZXJzaW9ucy5maWx0ZXIoZnVuY3Rpb24odmVyc2lvbikge1xuICAgIHJldHVybiBzYXRpc2ZpZXModmVyc2lvbiwgcmFuZ2UsIGxvb3NlKTtcbiAgfSkuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIHJjb21wYXJlKGEsIGIsIGxvb3NlKTtcbiAgfSlbMF0gfHwgbnVsbDtcbn1cblxuZXhwb3J0cy52YWxpZFJhbmdlID0gdmFsaWRSYW5nZTtcbmZ1bmN0aW9uIHZhbGlkUmFuZ2UocmFuZ2UsIGxvb3NlKSB7XG4gIHRyeSB7XG4gICAgLy8gUmV0dXJuICcqJyBpbnN0ZWFkIG9mICcnIHNvIHRoYXQgdHJ1dGhpbmVzcyB3b3Jrcy5cbiAgICAvLyBUaGlzIHdpbGwgdGhyb3cgaWYgaXQncyBpbnZhbGlkIGFueXdheVxuICAgIHJldHVybiBuZXcgUmFuZ2UocmFuZ2UsIGxvb3NlKS5yYW5nZSB8fCAnKic7XG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLy8gRGV0ZXJtaW5lIGlmIHZlcnNpb24gaXMgbGVzcyB0aGFuIGFsbCB0aGUgdmVyc2lvbnMgcG9zc2libGUgaW4gdGhlIHJhbmdlXG5leHBvcnRzLmx0ciA9IGx0cjtcbmZ1bmN0aW9uIGx0cih2ZXJzaW9uLCByYW5nZSwgbG9vc2UpIHtcbiAgcmV0dXJuIG91dHNpZGUodmVyc2lvbiwgcmFuZ2UsICc8JywgbG9vc2UpO1xufVxuXG4vLyBEZXRlcm1pbmUgaWYgdmVyc2lvbiBpcyBncmVhdGVyIHRoYW4gYWxsIHRoZSB2ZXJzaW9ucyBwb3NzaWJsZSBpbiB0aGUgcmFuZ2UuXG5leHBvcnRzLmd0ciA9IGd0cjtcbmZ1bmN0aW9uIGd0cih2ZXJzaW9uLCByYW5nZSwgbG9vc2UpIHtcbiAgcmV0dXJuIG91dHNpZGUodmVyc2lvbiwgcmFuZ2UsICc+JywgbG9vc2UpO1xufVxuXG5leHBvcnRzLm91dHNpZGUgPSBvdXRzaWRlO1xuZnVuY3Rpb24gb3V0c2lkZSh2ZXJzaW9uLCByYW5nZSwgaGlsbywgbG9vc2UpIHtcbiAgdmVyc2lvbiA9IG5ldyBTZW1WZXIodmVyc2lvbiwgbG9vc2UpO1xuICByYW5nZSA9IG5ldyBSYW5nZShyYW5nZSwgbG9vc2UpO1xuXG4gIHZhciBndGZuLCBsdGVmbiwgbHRmbiwgY29tcCwgZWNvbXA7XG4gIHN3aXRjaCAoaGlsbykge1xuICAgIGNhc2UgJz4nOlxuICAgICAgZ3RmbiA9IGd0O1xuICAgICAgbHRlZm4gPSBsdGU7XG4gICAgICBsdGZuID0gbHQ7XG4gICAgICBjb21wID0gJz4nO1xuICAgICAgZWNvbXAgPSAnPj0nO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnPCc6XG4gICAgICBndGZuID0gbHQ7XG4gICAgICBsdGVmbiA9IGd0ZTtcbiAgICAgIGx0Zm4gPSBndDtcbiAgICAgIGNvbXAgPSAnPCc7XG4gICAgICBlY29tcCA9ICc8PSc7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTXVzdCBwcm92aWRlIGEgaGlsbyB2YWwgb2YgXCI8XCIgb3IgXCI+XCInKTtcbiAgfVxuXG4gIC8vIElmIGl0IHNhdGlzaWZlcyB0aGUgcmFuZ2UgaXQgaXMgbm90IG91dHNpZGVcbiAgaWYgKHNhdGlzZmllcyh2ZXJzaW9uLCByYW5nZSwgbG9vc2UpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gRnJvbSBub3cgb24sIHZhcmlhYmxlIHRlcm1zIGFyZSBhcyBpZiB3ZSdyZSBpbiBcImd0clwiIG1vZGUuXG4gIC8vIGJ1dCBub3RlIHRoYXQgZXZlcnl0aGluZyBpcyBmbGlwcGVkIGZvciB0aGUgXCJsdHJcIiBmdW5jdGlvbi5cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmdlLnNldC5sZW5ndGg7ICsraSkge1xuICAgIHZhciBjb21wYXJhdG9ycyA9IHJhbmdlLnNldFtpXTtcblxuICAgIHZhciBoaWdoID0gbnVsbDtcbiAgICB2YXIgbG93ID0gbnVsbDtcblxuICAgIGNvbXBhcmF0b3JzLmZvckVhY2goZnVuY3Rpb24oY29tcGFyYXRvcikge1xuICAgICAgaWYgKGNvbXBhcmF0b3Iuc2VtdmVyID09PSBBTlkpIHtcbiAgICAgICAgY29tcGFyYXRvciA9IG5ldyBDb21wYXJhdG9yKCc+PTAuMC4wJylcbiAgICAgIH1cbiAgICAgIGhpZ2ggPSBoaWdoIHx8IGNvbXBhcmF0b3I7XG4gICAgICBsb3cgPSBsb3cgfHwgY29tcGFyYXRvcjtcbiAgICAgIGlmIChndGZuKGNvbXBhcmF0b3Iuc2VtdmVyLCBoaWdoLnNlbXZlciwgbG9vc2UpKSB7XG4gICAgICAgIGhpZ2ggPSBjb21wYXJhdG9yO1xuICAgICAgfSBlbHNlIGlmIChsdGZuKGNvbXBhcmF0b3Iuc2VtdmVyLCBsb3cuc2VtdmVyLCBsb29zZSkpIHtcbiAgICAgICAgbG93ID0gY29tcGFyYXRvcjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIElmIHRoZSBlZGdlIHZlcnNpb24gY29tcGFyYXRvciBoYXMgYSBvcGVyYXRvciB0aGVuIG91ciB2ZXJzaW9uXG4gICAgLy8gaXNuJ3Qgb3V0c2lkZSBpdFxuICAgIGlmIChoaWdoLm9wZXJhdG9yID09PSBjb21wIHx8IGhpZ2gub3BlcmF0b3IgPT09IGVjb21wKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGxvd2VzdCB2ZXJzaW9uIGNvbXBhcmF0b3IgaGFzIGFuIG9wZXJhdG9yIGFuZCBvdXIgdmVyc2lvblxuICAgIC8vIGlzIGxlc3MgdGhhbiBpdCB0aGVuIGl0IGlzbid0IGhpZ2hlciB0aGFuIHRoZSByYW5nZVxuICAgIGlmICgoIWxvdy5vcGVyYXRvciB8fCBsb3cub3BlcmF0b3IgPT09IGNvbXApICYmXG4gICAgICAgIGx0ZWZuKHZlcnNpb24sIGxvdy5zZW12ZXIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChsb3cub3BlcmF0b3IgPT09IGVjb21wICYmIGx0Zm4odmVyc2lvbiwgbG93LnNlbXZlcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi93ZWV4L34vc2VtdmVyL3NlbXZlci5qc1xuICoqLyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbihmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGlzIG5vdCBkZWZpbmVkJyk7XG4gICAgfVxuICB9XG4gIHRyeSB7XG4gICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICB9IGNhdGNoIChlKSB7XG4gICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaXMgbm90IGRlZmluZWQnKTtcbiAgICB9XG4gIH1cbn0gKCkpXG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBjYWNoZWRTZXRUaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+Ly5ucG1pbnN0YWxsL3Byb2Nlc3MvMC4xMS41L3Byb2Nlc3MvYnJvd3Nlci5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlld1xuICogVmlld01vZGVsIENvbnN0cnVjdG9yICYgZGVmaW5pdGlvblxuICovXG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnLi4vdXRpbCdcbmltcG9ydCAqIGFzIHN0YXRlIGZyb20gJy4uL2NvcmUvc3RhdGUnXG5pbXBvcnQgKiBhcyBjb21waWxlciBmcm9tICcuL2NvbXBpbGVyJ1xuaW1wb3J0ICogYXMgZGlyZWN0aXZlIGZyb20gJy4vZGlyZWN0aXZlJ1xuaW1wb3J0ICogYXMgZG9tSGVscGVyIGZyb20gJy4vZG9tLWhlbHBlcidcbmltcG9ydCAqIGFzIGV2ZW50cyBmcm9tICcuL2V2ZW50cydcblxuaW1wb3J0IHsgcmVnaXN0ZXJNb2R1bGVzLCByZWdpc3Rlck1ldGhvZHMgfSBmcm9tICcuLi9hcHAvcmVnaXN0ZXInXG5cbmZ1bmN0aW9uIGNhbGxPbGRSZWFkeUVudHJ5ICh2bSwgY29tcG9uZW50KSB7XG4gIGlmIChjb21wb25lbnQubWV0aG9kcyAmJlxuICAgICAgY29tcG9uZW50Lm1ldGhvZHMucmVhZHkpIHtcbiAgICBfLndhcm4oJ1wiZXhwb3J0cy5tZXRob2RzLnJlYWR5XCIgaXMgZGVwcmVjYXRlZCwgJyArXG4gICAgICAncGxlYXNlIHVzZSBcImV4cG9ydHMuY3JlYXRlZFwiIGluc3RlYWQnKVxuICAgIGNvbXBvbmVudC5tZXRob2RzLnJlYWR5LmNhbGwodm0pXG4gIH1cbn1cblxuLyoqXG4gKiBWaWV3TW9kZWwgY29uc3RydWN0b3JcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgICAgY29tcG9uZW50IG9wdGlvbnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJlbnRWbSAgIHdoaWNoIGNvbnRhaW5zIF9hcHBcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJlbnRFbCAgIHJvb3QgZWxlbWVudCBvciBmcmFnIGJsb2NrXG4gKiBAcGFyYW0ge29iamVjdH0gbWVyZ2VkRGF0YSBleHRlcm5hbCBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gZXh0ZXJuYWxFdmVudHMgZXh0ZXJuYWwgZXZlbnRzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFZtIChcbiAgdHlwZSxcbiAgb3B0aW9ucyxcbiAgcGFyZW50Vm0sXG4gIHBhcmVudEVsLFxuICBtZXJnZWREYXRhLFxuICBleHRlcm5hbEV2ZW50c1xuKSB7XG4gIHRoaXMuX3BhcmVudCA9IHBhcmVudFZtLl9yZWFsUGFyZW50ID8gcGFyZW50Vm0uX3JlYWxQYXJlbnQgOiBwYXJlbnRWbVxuICB0aGlzLl9hcHAgPSBwYXJlbnRWbS5fYXBwXG4gIHBhcmVudFZtLl9jaGlsZHJlblZtcyAmJiBwYXJlbnRWbS5fY2hpbGRyZW5WbXMucHVzaCh0aGlzKVxuXG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB0aGlzLl9hcHAuY3VzdG9tQ29tcG9uZW50TWFwW3R5cGVdIHx8IHt9XG4gIH1cbiAgY29uc3QgZGF0YSA9IG9wdGlvbnMuZGF0YSB8fCB7fVxuXG4gIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zXG4gIHRoaXMuX21ldGhvZHMgPSBvcHRpb25zLm1ldGhvZHMgfHwge31cbiAgdGhpcy5fY29tcHV0ZWQgPSBvcHRpb25zLmNvbXB1dGVkIHx8IHt9XG4gIHRoaXMuX2NzcyA9IG9wdGlvbnMuc3R5bGUgfHwge31cbiAgdGhpcy5faWRzID0ge31cbiAgdGhpcy5fdm1FdmVudHMgPSB7fVxuICB0aGlzLl9jaGlsZHJlblZtcyA9IFtdXG4gIHRoaXMuX3R5cGUgPSB0eXBlXG5cbiAgLy8gYmluZCBldmVudHMgYW5kIGxpZmVjeWNsZXNcbiAgdGhpcy5faW5pdEV2ZW50cyhleHRlcm5hbEV2ZW50cylcblxuICBfLmRlYnVnKGBcImluaXRcIiBsaWZlY3ljbGUgaW4gVm0oJHt0aGlzLl90eXBlfSlgKVxuICB0aGlzLiRlbWl0KCdob29rOmluaXQnKVxuICB0aGlzLl9pbml0ZWQgPSB0cnVlXG4gIC8vIHByb3h5IGRhdGEgYW5kIG1ldGhvZHNcbiAgLy8gb2JzZXJ2ZSBkYXRhIGFuZCBhZGQgdGhpcyB0byB2bXNcbiAgdGhpcy5fZGF0YSA9IHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nID8gZGF0YSgpIDogZGF0YVxuICBpZiAobWVyZ2VkRGF0YSkge1xuICAgIF8uZXh0ZW5kKHRoaXMuX2RhdGEsIG1lcmdlZERhdGEpXG4gIH1cbiAgdGhpcy5faW5pdFN0YXRlKClcblxuICBfLmRlYnVnKGBcImNyZWF0ZWRcIiBsaWZlY3ljbGUgaW4gVm0oJHt0aGlzLl90eXBlfSlgKVxuICB0aGlzLiRlbWl0KCdob29rOmNyZWF0ZWQnKVxuICB0aGlzLl9jcmVhdGVkID0gdHJ1ZVxuICAvLyBiYWNrd2FyZCBvbGQgcmVhZHkgZW50cnlcbiAgY2FsbE9sZFJlYWR5RW50cnkodGhpcywgb3B0aW9ucylcblxuICAvLyBpZiBubyBwYXJlbnRFbGVtZW50IHRoZW4gc3BlY2lmeSB0aGUgZG9jdW1lbnRFbGVtZW50XG4gIHRoaXMuX3BhcmVudEVsID0gcGFyZW50RWwgfHwgdGhpcy5fYXBwLmRvYy5kb2N1bWVudEVsZW1lbnRcbiAgdGhpcy5fYnVpbGQoKVxufVxuXG5fLmV4dGVuZChWbS5wcm90b3R5cGUsIHN0YXRlLCBjb21waWxlciwgZGlyZWN0aXZlLCBkb21IZWxwZXIsIGV2ZW50cylcbl8uZXh0ZW5kKFZtLCB7XG4gIHJlZ2lzdGVyTW9kdWxlcyxcbiAgcmVnaXN0ZXJNZXRob2RzXG59KVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9odG1sNS9kZWZhdWx0L3ZtL2luZGV4LmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgKi9cblxuaW1wb3J0IFdhdGNoZXIgZnJvbSAnLi93YXRjaGVyJ1xuaW1wb3J0IERlcCBmcm9tICcuL2RlcCdcbmltcG9ydCB7XG4gIG9ic2VydmUsXG4gIHByb3h5LFxuICB1bnByb3h5XG59IGZyb20gJy4vb2JzZXJ2ZXInXG5pbXBvcnQge1xuICBpc0FycmF5LFxuICBpc1BsYWluT2JqZWN0LFxuICBiaW5kXG59IGZyb20gJy4uL3V0aWwnXG5cbmV4cG9ydCBmdW5jdGlvbiBfaW5pdFN0YXRlICgpIHtcbiAgY29uc3Qgdm0gPSB0aGlzXG4gIHZtLl93YXRjaGVycyA9IFtdXG4gIHZtLl9pbml0RGF0YSgpXG4gIHZtLl9pbml0Q29tcHV0ZWQoKVxuICB2bS5faW5pdE1ldGhvZHMoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX2luaXREYXRhICgpIHtcbiAgY29uc3Qgdm0gPSB0aGlzXG4gIGxldCBkYXRhID0gdm0uX2RhdGFcblxuICBpZiAoIWlzUGxhaW5PYmplY3QoZGF0YSkpIHtcbiAgICBkYXRhID0ge31cbiAgfVxuICAvLyBwcm94eSBkYXRhIG9uIGluc3RhbmNlXG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhkYXRhKVxuICBsZXQgaSA9IGtleXMubGVuZ3RoXG4gIHdoaWxlIChpLS0pIHtcbiAgICBwcm94eSh2bSwga2V5c1tpXSlcbiAgfVxuICAvLyBvYnNlcnZlIGRhdGFcbiAgb2JzZXJ2ZShkYXRhLCB2bSlcbn1cblxuZnVuY3Rpb24gbm9vcCAoKSB7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfaW5pdENvbXB1dGVkICgpIHtcbiAgY29uc3Qgdm0gPSB0aGlzXG4gIGNvbnN0IGNvbXB1dGVkID0gdm0uX2NvbXB1dGVkXG4gIGlmIChjb21wdXRlZCkge1xuICAgIGZvciAobGV0IGtleSBpbiBjb21wdXRlZCkge1xuICAgICAgY29uc3QgdXNlckRlZiA9IGNvbXB1dGVkW2tleV1cbiAgICAgIGNvbnN0IGRlZiA9IHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHVzZXJEZWYgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZGVmLmdldCA9IG1ha2VDb21wdXRlZEdldHRlcih1c2VyRGVmLCB2bSlcbiAgICAgICAgZGVmLnNldCA9IG5vb3BcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlZi5nZXQgPSB1c2VyRGVmLmdldFxuICAgICAgICAgID8gdXNlckRlZi5jYWNoZSAhPT0gZmFsc2VcbiAgICAgICAgICAgID8gbWFrZUNvbXB1dGVkR2V0dGVyKHVzZXJEZWYuZ2V0LCB2bSlcbiAgICAgICAgICAgIDogYmluZCh1c2VyRGVmLmdldCwgdm0pXG4gICAgICAgICAgOiBub29wXG4gICAgICAgIGRlZi5zZXQgPSB1c2VyRGVmLnNldFxuICAgICAgICAgID8gYmluZCh1c2VyRGVmLnNldCwgdm0pXG4gICAgICAgICAgOiBub29wXG4gICAgICB9XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodm0sIGtleSwgZGVmKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtYWtlQ29tcHV0ZWRHZXR0ZXIgKGdldHRlciwgb3duZXIpIHtcbiAgY29uc3Qgd2F0Y2hlciA9IG5ldyBXYXRjaGVyKG93bmVyLCBnZXR0ZXIsIG51bGwsIHtcbiAgICBsYXp5OiB0cnVlXG4gIH0pXG4gIHJldHVybiBmdW5jdGlvbiBjb21wdXRlZEdldHRlciAoKSB7XG4gICAgaWYgKHdhdGNoZXIuZGlydHkpIHtcbiAgICAgIHdhdGNoZXIuZXZhbHVhdGUoKVxuICAgIH1cbiAgICBpZiAoRGVwLnRhcmdldCkge1xuICAgICAgd2F0Y2hlci5kZXBlbmQoKVxuICAgIH1cbiAgICByZXR1cm4gd2F0Y2hlci52YWx1ZVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfaW5pdE1ldGhvZHMgKCkge1xuICBjb25zdCB2bSA9IHRoaXNcbiAgY29uc3QgbWV0aG9kcyA9IHZtLl9tZXRob2RzXG4gIGlmIChtZXRob2RzKSB7XG4gICAgZm9yIChsZXQga2V5IGluIG1ldGhvZHMpIHtcbiAgICAgIHZtW2tleV0gPSBiaW5kKG1ldGhvZHNba2V5XSwgdm0pXG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi93ZWV4L2h0bWw1L2RlZmF1bHQvY29yZS9zdGF0ZS5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlICovXG5cbmltcG9ydCBEZXAgZnJvbSAnLi9kZXAnXG4vLyBpbXBvcnQgeyBwdXNoV2F0Y2hlciB9IGZyb20gJy4vYmF0Y2hlcidcbmltcG9ydCB7XG4gIHdhcm4sXG4gIHJlbW92ZSxcbiAgZXh0ZW5kLFxuICBpc0FycmF5LFxuICBpc09iamVjdCxcbiAgcGFyc2VQYXRoLFxuICBfU2V0IGFzIFNldFxufSBmcm9tICcuLi91dGlsJ1xuXG5sZXQgdWlkID0gMFxubGV0IHByZXZUYXJnZXRcblxuLyoqXG4gKiBBIHdhdGNoZXIgcGFyc2VzIGFuIGV4cHJlc3Npb24sIGNvbGxlY3RzIGRlcGVuZGVuY2llcyxcbiAqIGFuZCBmaXJlcyBjYWxsYmFjayB3aGVuIHRoZSBleHByZXNzaW9uIHZhbHVlIGNoYW5nZXMuXG4gKiBUaGlzIGlzIHVzZWQgZm9yIGJvdGggdGhlICR3YXRjaCgpIGFwaSBhbmQgZGlyZWN0aXZlcy5cbiAqXG4gKiBAcGFyYW0ge1Z1ZX0gdm1cbiAqIEBwYXJhbSB7U3RyaW5nfEZ1bmN0aW9ufSBleHBPckZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqICAgICAgICAgICAgICAgICAtIHtBcnJheX0gZmlsdGVyc1xuICogICAgICAgICAgICAgICAgIC0ge0Jvb2xlYW59IHR3b1dheVxuICogICAgICAgICAgICAgICAgIC0ge0Jvb2xlYW59IGRlZXBcbiAqICAgICAgICAgICAgICAgICAtIHtCb29sZWFufSB1c2VyXG4gKiAgICAgICAgICAgICAgICAgLSB7Qm9vbGVhbn0gc3luY1xuICogICAgICAgICAgICAgICAgIC0ge0Jvb2xlYW59IGxhenlcbiAqICAgICAgICAgICAgICAgICAtIHtGdW5jdGlvbn0gW3ByZVByb2Nlc3NdXG4gKiAgICAgICAgICAgICAgICAgLSB7RnVuY3Rpb259IFtwb3N0UHJvY2Vzc11cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFdhdGNoZXIgKHZtLCBleHBPckZuLCBjYiwgb3B0aW9ucykge1xuICAvLyBtaXggaW4gb3B0aW9uc1xuICBpZiAob3B0aW9ucykge1xuICAgIGV4dGVuZCh0aGlzLCBvcHRpb25zKVxuICB9XG4gIGNvbnN0IGlzRm4gPSB0eXBlb2YgZXhwT3JGbiA9PT0gJ2Z1bmN0aW9uJ1xuICB0aGlzLnZtID0gdm1cbiAgdm0uX3dhdGNoZXJzLnB1c2godGhpcylcbiAgdGhpcy5leHByZXNzaW9uID0gZXhwT3JGblxuICB0aGlzLmNiID0gY2JcbiAgdGhpcy5pZCA9ICsrdWlkIC8vIHVpZCBmb3IgYmF0Y2hpbmdcbiAgdGhpcy5hY3RpdmUgPSB0cnVlXG4gIHRoaXMuZGlydHkgPSB0aGlzLmxhenkgLy8gZm9yIGxhenkgd2F0Y2hlcnNcbiAgdGhpcy5kZXBzID0gW11cbiAgdGhpcy5uZXdEZXBzID0gW11cbiAgdGhpcy5kZXBJZHMgPSBuZXcgU2V0KClcbiAgdGhpcy5uZXdEZXBJZHMgPSBuZXcgU2V0KClcbiAgLy8gcGFyc2UgZXhwcmVzc2lvbiBmb3IgZ2V0dGVyXG4gIGlmIChpc0ZuKSB7XG4gICAgdGhpcy5nZXR0ZXIgPSBleHBPckZuXG4gIH0gZWxzZSB7XG4gICAgdGhpcy5nZXR0ZXIgPSBwYXJzZVBhdGgoZXhwT3JGbilcbiAgICBpZiAoIXRoaXMuZ2V0dGVyKSB7XG4gICAgICB0aGlzLmdldHRlciA9IGZ1bmN0aW9uICgpIHt9XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAgICdGYWlsZWQgd2F0Y2hpbmcgcGF0aDogJyArIGV4cE9yRm4gK1xuICAgICAgICAnV2F0Y2hlciBvbmx5IGFjY2VwdHMgc2ltcGxlIGRvdC1kZWxpbWl0ZWQgcGF0aHMuICcgK1xuICAgICAgICAnRm9yIGZ1bGwgY29udHJvbCwgdXNlIGEgZnVuY3Rpb24gaW5zdGVhZC4nLFxuICAgICAgICB2bVxuICAgICAgKVxuICAgIH1cbiAgfVxuICB0aGlzLnZhbHVlID0gdGhpcy5sYXp5XG4gICAgPyB1bmRlZmluZWRcbiAgICA6IHRoaXMuZ2V0KClcbiAgLy8gc3RhdGUgZm9yIGF2b2lkaW5nIGZhbHNlIHRyaWdnZXJzIGZvciBkZWVwIGFuZCBBcnJheVxuICAvLyB3YXRjaGVycyBkdXJpbmcgdm0uX2RpZ2VzdCgpXG4gIHRoaXMucXVldWVkID0gdGhpcy5zaGFsbG93ID0gZmFsc2Vcbn1cblxuLyoqXG4gKiBFdmFsdWF0ZSB0aGUgZ2V0dGVyLCBhbmQgcmUtY29sbGVjdCBkZXBlbmRlbmNpZXMuXG4gKi9cblxuV2F0Y2hlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmJlZm9yZUdldCgpXG4gIGNvbnN0IHZhbHVlID0gdGhpcy5nZXR0ZXIuY2FsbCh0aGlzLnZtLCB0aGlzLnZtKVxuICAvLyBcInRvdWNoXCIgZXZlcnkgcHJvcGVydHkgc28gdGhleSBhcmUgYWxsIHRyYWNrZWQgYXNcbiAgLy8gZGVwZW5kZW5jaWVzIGZvciBkZWVwIHdhdGNoaW5nXG4gIGlmICh0aGlzLmRlZXApIHtcbiAgICB0cmF2ZXJzZSh2YWx1ZSlcbiAgfVxuICB0aGlzLmFmdGVyR2V0KClcbiAgcmV0dXJuIHZhbHVlXG59XG5cbi8qKlxuICogUHJlcGFyZSBmb3IgZGVwZW5kZW5jeSBjb2xsZWN0aW9uLlxuICovXG5cbldhdGNoZXIucHJvdG90eXBlLmJlZm9yZUdldCA9IGZ1bmN0aW9uICgpIHtcbiAgcHJldlRhcmdldCA9IERlcC50YXJnZXRcbiAgRGVwLnRhcmdldCA9IHRoaXNcbn1cblxuLyoqXG4gKiBBZGQgYSBkZXBlbmRlbmN5IHRvIHRoaXMgZGlyZWN0aXZlLlxuICpcbiAqIEBwYXJhbSB7RGVwfSBkZXBcbiAqL1xuXG5XYXRjaGVyLnByb3RvdHlwZS5hZGREZXAgPSBmdW5jdGlvbiAoZGVwKSB7XG4gIGNvbnN0IGlkID0gZGVwLmlkXG4gIGlmICghdGhpcy5uZXdEZXBJZHMuaGFzKGlkKSkge1xuICAgIHRoaXMubmV3RGVwSWRzLmFkZChpZClcbiAgICB0aGlzLm5ld0RlcHMucHVzaChkZXApXG4gICAgaWYgKCF0aGlzLmRlcElkcy5oYXMoaWQpKSB7XG4gICAgICBkZXAuYWRkU3ViKHRoaXMpXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQ2xlYW4gdXAgZm9yIGRlcGVuZGVuY3kgY29sbGVjdGlvbi5cbiAqL1xuXG5XYXRjaGVyLnByb3RvdHlwZS5hZnRlckdldCA9IGZ1bmN0aW9uICgpIHtcbiAgRGVwLnRhcmdldCA9IHByZXZUYXJnZXRcbiAgbGV0IGkgPSB0aGlzLmRlcHMubGVuZ3RoXG4gIHdoaWxlIChpLS0pIHtcbiAgICBjb25zdCBkZXAgPSB0aGlzLmRlcHNbaV1cbiAgICBpZiAoIXRoaXMubmV3RGVwSWRzLmhhcyhkZXAuaWQpKSB7XG4gICAgICBkZXAucmVtb3ZlU3ViKHRoaXMpXG4gICAgfVxuICB9XG4gIGxldCB0bXAgPSB0aGlzLmRlcElkc1xuICB0aGlzLmRlcElkcyA9IHRoaXMubmV3RGVwSWRzXG4gIHRoaXMubmV3RGVwSWRzID0gdG1wXG4gIHRoaXMubmV3RGVwSWRzLmNsZWFyKClcbiAgdG1wID0gdGhpcy5kZXBzXG4gIHRoaXMuZGVwcyA9IHRoaXMubmV3RGVwc1xuICB0aGlzLm5ld0RlcHMgPSB0bXBcbiAgdGhpcy5uZXdEZXBzLmxlbmd0aCA9IDBcbn1cblxuLyoqXG4gKiBTdWJzY3JpYmVyIGludGVyZmFjZS5cbiAqIFdpbGwgYmUgY2FsbGVkIHdoZW4gYSBkZXBlbmRlbmN5IGNoYW5nZXMuXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBzaGFsbG93XG4gKi9cblxuV2F0Y2hlci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKHNoYWxsb3cpIHtcbiAgaWYgKHRoaXMubGF6eSkge1xuICAgIHRoaXMuZGlydHkgPSB0cnVlXG4gIH0gZWxzZSB7XG4gICAgdGhpcy5ydW4oKVxuICB9XG4gIC8vIH0gZWxzZSBpZiAodGhpcy5zeW5jKSB7XG4gIC8vICAgdGhpcy5ydW4oKVxuICAvLyB9IGVsc2Uge1xuICAvLyAgIC8vIGlmIHF1ZXVlZCwgb25seSBvdmVyd3JpdGUgc2hhbGxvdyB3aXRoIG5vbi1zaGFsbG93LFxuICAvLyAgIC8vIGJ1dCBub3QgdGhlIG90aGVyIHdheSBhcm91bmQuXG4gIC8vICAgdGhpcy5zaGFsbG93ID0gdGhpcy5xdWV1ZWRcbiAgLy8gICAgID8gc2hhbGxvd1xuICAvLyAgICAgICA/IHRoaXMuc2hhbGxvd1xuICAvLyAgICAgICA6IGZhbHNlXG4gIC8vICAgICA6ICEhc2hhbGxvd1xuICAvLyAgIHRoaXMucXVldWVkID0gdHJ1ZVxuICAvLyAgIHB1c2hXYXRjaGVyKHRoaXMpXG4gIC8vIH1cbn1cblxuLyoqXG4gKiBCYXRjaGVyIGpvYiBpbnRlcmZhY2UuXG4gKiBXaWxsIGJlIGNhbGxlZCBieSB0aGUgYmF0Y2hlci5cbiAqL1xuXG5XYXRjaGVyLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXQoKVxuICAgIGlmIChcbiAgICAgIHZhbHVlICE9PSB0aGlzLnZhbHVlIHx8XG4gICAgICAvLyBEZWVwIHdhdGNoZXJzIGFuZCB3YXRjaGVycyBvbiBPYmplY3QvQXJyYXlzIHNob3VsZCBmaXJlIGV2ZW5cbiAgICAgIC8vIHdoZW4gdGhlIHZhbHVlIGlzIHRoZSBzYW1lLCBiZWNhdXNlIHRoZSB2YWx1ZSBtYXlcbiAgICAgIC8vIGhhdmUgbXV0YXRlZDsgYnV0IG9ubHkgZG8gc28gaWYgdGhpcyBpcyBhXG4gICAgICAvLyBub24tc2hhbGxvdyB1cGRhdGUgKGNhdXNlZCBieSBhIHZtIGRpZ2VzdCkuXG4gICAgICAoKGlzT2JqZWN0KHZhbHVlKSB8fCB0aGlzLmRlZXApICYmICF0aGlzLnNoYWxsb3cpXG4gICAgKSB7XG4gICAgICAvLyBzZXQgbmV3IHZhbHVlXG4gICAgICBjb25zdCBvbGRWYWx1ZSA9IHRoaXMudmFsdWVcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxuICAgICAgdGhpcy5jYi5jYWxsKHRoaXMudm0sIHZhbHVlLCBvbGRWYWx1ZSlcbiAgICB9XG4gICAgdGhpcy5xdWV1ZWQgPSB0aGlzLnNoYWxsb3cgPSBmYWxzZVxuICB9XG59XG5cbi8qKlxuICogRXZhbHVhdGUgdGhlIHZhbHVlIG9mIHRoZSB3YXRjaGVyLlxuICogVGhpcyBvbmx5IGdldHMgY2FsbGVkIGZvciBsYXp5IHdhdGNoZXJzLlxuICovXG5cbldhdGNoZXIucHJvdG90eXBlLmV2YWx1YXRlID0gZnVuY3Rpb24gKCkge1xuICAvLyBhdm9pZCBvdmVyd3JpdGluZyBhbm90aGVyIHdhdGNoZXIgdGhhdCBpcyBiZWluZ1xuICAvLyBjb2xsZWN0ZWQuXG4gIGNvbnN0IGN1cnJlbnQgPSBEZXAudGFyZ2V0XG4gIHRoaXMudmFsdWUgPSB0aGlzLmdldCgpXG4gIHRoaXMuZGlydHkgPSBmYWxzZVxuICBEZXAudGFyZ2V0ID0gY3VycmVudFxufVxuXG4vKipcbiAqIERlcGVuZCBvbiBhbGwgZGVwcyBjb2xsZWN0ZWQgYnkgdGhpcyB3YXRjaGVyLlxuICovXG5cbldhdGNoZXIucHJvdG90eXBlLmRlcGVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgbGV0IGkgPSB0aGlzLmRlcHMubGVuZ3RoXG4gIHdoaWxlIChpLS0pIHtcbiAgICB0aGlzLmRlcHNbaV0uZGVwZW5kKClcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZSBzZWxmIGZyb20gYWxsIGRlcGVuZGVuY2llcycgc3ViY3JpYmVyIGxpc3QuXG4gKi9cblxuV2F0Y2hlci5wcm90b3R5cGUudGVhcmRvd24gPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgIC8vIHJlbW92ZSBzZWxmIGZyb20gdm0ncyB3YXRjaGVyIGxpc3RcbiAgICAvLyB0aGlzIGlzIGEgc29tZXdoYXQgZXhwZW5zaXZlIG9wZXJhdGlvbiBzbyB3ZSBza2lwIGl0XG4gICAgLy8gaWYgdGhlIHZtIGlzIGJlaW5nIGRlc3Ryb3llZCBvciBpcyBwZXJmb3JtaW5nIGEgdi1mb3JcbiAgICAvLyByZS1yZW5kZXIgKHRoZSB3YXRjaGVyIGxpc3QgaXMgdGhlbiBmaWx0ZXJlZCBieSB2LWZvcikuXG4gICAgaWYgKCF0aGlzLnZtLl9pc0JlaW5nRGVzdHJveWVkICYmICF0aGlzLnZtLl92Rm9yUmVtb3ZpbmcpIHtcbiAgICAgIHJlbW92ZSh0aGlzLnZtLl93YXRjaGVycywgdGhpcylcbiAgICB9XG4gICAgbGV0IGkgPSB0aGlzLmRlcHMubGVuZ3RoXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdGhpcy5kZXBzW2ldLnJlbW92ZVN1Yih0aGlzKVxuICAgIH1cbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlXG4gICAgdGhpcy52bSA9IHRoaXMuY2IgPSB0aGlzLnZhbHVlID0gbnVsbFxuICB9XG59XG5cbi8qKlxuICogUmVjcnVzaXZlbHkgdHJhdmVyc2UgYW4gb2JqZWN0IHRvIGV2b2tlIGFsbCBjb252ZXJ0ZWRcbiAqIGdldHRlcnMsIHNvIHRoYXQgZXZlcnkgbmVzdGVkIHByb3BlcnR5IGluc2lkZSB0aGUgb2JqZWN0XG4gKiBpcyBjb2xsZWN0ZWQgYXMgYSBcImRlZXBcIiBkZXBlbmRlbmN5LlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcGFyYW0ge1NldH0gc2VlblxuICovXG5cbmNvbnN0IHNlZW5PYmplY3RzID0gbmV3IFNldCgpXG5mdW5jdGlvbiB0cmF2ZXJzZSAodmFsLCBzZWVuKSB7XG4gIGxldCBpLCBrZXlzLCBpc0EsIGlzT1xuICBpZiAoIXNlZW4pIHtcbiAgICBzZWVuID0gc2Vlbk9iamVjdHNcbiAgICBzZWVuLmNsZWFyKClcbiAgfVxuICBpc0EgPSBpc0FycmF5KHZhbClcbiAgaXNPID0gaXNPYmplY3QodmFsKVxuICBpZiAoaXNBIHx8IGlzTykge1xuICAgIGlmICh2YWwuX19vYl9fKSB7XG4gICAgICBjb25zdCBkZXBJZCA9IHZhbC5fX29iX18uZGVwLmlkXG4gICAgICBpZiAoc2Vlbi5oYXMoZGVwSWQpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2Vlbi5hZGQoZGVwSWQpXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChpc0EpIHtcbiAgICAgIGkgPSB2YWwubGVuZ3RoXG4gICAgICB3aGlsZSAoaS0tKSB0cmF2ZXJzZSh2YWxbaV0sIHNlZW4pXG4gICAgfSBlbHNlIGlmIChpc08pIHtcbiAgICAgIGtleXMgPSBPYmplY3Qua2V5cyh2YWwpXG4gICAgICBpID0ga2V5cy5sZW5ndGhcbiAgICAgIHdoaWxlIChpLS0pIHRyYXZlcnNlKHZhbFtrZXlzW2ldXSwgc2VlbilcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3dlZXgvaHRtbDUvZGVmYXVsdC9jb3JlL3dhdGNoZXIuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuXG5pbXBvcnQgeyByZW1vdmUgfSBmcm9tICcuLi91dGlsJ1xuXG5sZXQgdWlkID0gMFxuXG4vKipcbiAqIEEgZGVwIGlzIGFuIG9ic2VydmFibGUgdGhhdCBjYW4gaGF2ZSBtdWx0aXBsZVxuICogZGlyZWN0aXZlcyBzdWJzY3JpYmluZyB0byBpdC5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEZXAgKCkge1xuICB0aGlzLmlkID0gdWlkKytcbiAgdGhpcy5zdWJzID0gW11cbn1cblxuLy8gdGhlIGN1cnJlbnQgdGFyZ2V0IHdhdGNoZXIgYmVpbmcgZXZhbHVhdGVkLlxuLy8gdGhpcyBpcyBnbG9iYWxseSB1bmlxdWUgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvbmx5IG9uZVxuLy8gd2F0Y2hlciBiZWluZyBldmFsdWF0ZWQgYXQgYW55IHRpbWUuXG5EZXAudGFyZ2V0ID0gbnVsbFxuXG4vKipcbiAqIEFkZCBhIGRpcmVjdGl2ZSBzdWJzY3JpYmVyLlxuICpcbiAqIEBwYXJhbSB7RGlyZWN0aXZlfSBzdWJcbiAqL1xuXG5EZXAucHJvdG90eXBlLmFkZFN1YiA9IGZ1bmN0aW9uIChzdWIpIHtcbiAgdGhpcy5zdWJzLnB1c2goc3ViKVxufVxuXG4vKipcbiAqIFJlbW92ZSBhIGRpcmVjdGl2ZSBzdWJzY3JpYmVyLlxuICpcbiAqIEBwYXJhbSB7RGlyZWN0aXZlfSBzdWJcbiAqL1xuXG5EZXAucHJvdG90eXBlLnJlbW92ZVN1YiA9IGZ1bmN0aW9uIChzdWIpIHtcbiAgcmVtb3ZlKHRoaXMuc3Vicywgc3ViKVxufVxuXG4vKipcbiAqIEFkZCBzZWxmIGFzIGEgZGVwZW5kZW5jeSB0byB0aGUgdGFyZ2V0IHdhdGNoZXIuXG4gKi9cblxuRGVwLnByb3RvdHlwZS5kZXBlbmQgPSBmdW5jdGlvbiAoKSB7XG4gIERlcC50YXJnZXQuYWRkRGVwKHRoaXMpXG59XG5cbi8qKlxuICogTm90aWZ5IGFsbCBzdWJzY3JpYmVycyBvZiBhIG5ldyB2YWx1ZS5cbiAqL1xuXG5EZXAucHJvdG90eXBlLm5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gc3RhYmxpemUgdGhlIHN1YnNjcmliZXIgbGlzdCBmaXJzdFxuICBjb25zdCBzdWJzID0gdGhpcy5zdWJzLnNsaWNlKClcbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBzdWJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHN1YnNbaV0udXBkYXRlKClcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9odG1sNS9kZWZhdWx0L2NvcmUvZGVwLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgKi9cblxuaW1wb3J0IERlcCBmcm9tICcuL2RlcCdcbmltcG9ydCB7IGFycmF5TWV0aG9kcyB9IGZyb20gJy4vYXJyYXknXG5pbXBvcnQge1xuICBkZWYsXG4gIHJlbW92ZSxcbiAgaXNBcnJheSxcbiAgaXNPYmplY3QsXG4gIGlzUGxhaW5PYmplY3QsXG4gIGhhc1Byb3RvLFxuICBoYXNPd24sXG4gIGlzUmVzZXJ2ZWRcbn0gZnJvbSAnLi4vdXRpbCdcblxuY29uc3QgYXJyYXlLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJyYXlNZXRob2RzKVxuXG4vKipcbiAqIE9ic2VydmVyIGNsYXNzIHRoYXQgYXJlIGF0dGFjaGVkIHRvIGVhY2ggb2JzZXJ2ZWRcbiAqIG9iamVjdC4gT25jZSBhdHRhY2hlZCwgdGhlIG9ic2VydmVyIGNvbnZlcnRzIHRhcmdldFxuICogb2JqZWN0J3MgcHJvcGVydHkga2V5cyBpbnRvIGdldHRlci9zZXR0ZXJzIHRoYXRcbiAqIGNvbGxlY3QgZGVwZW5kZW5jaWVzIGFuZCBkaXNwYXRjaGVzIHVwZGF0ZXMuXG4gKlxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IHZhbHVlXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gT2JzZXJ2ZXIgKHZhbHVlKSB7XG4gIHRoaXMudmFsdWUgPSB2YWx1ZVxuICB0aGlzLmRlcCA9IG5ldyBEZXAoKVxuICBkZWYodmFsdWUsICdfX29iX18nLCB0aGlzKVxuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBjb25zdCBhdWdtZW50ID0gaGFzUHJvdG9cbiAgICAgID8gcHJvdG9BdWdtZW50XG4gICAgICA6IGNvcHlBdWdtZW50XG4gICAgYXVnbWVudCh2YWx1ZSwgYXJyYXlNZXRob2RzLCBhcnJheUtleXMpXG4gICAgdGhpcy5vYnNlcnZlQXJyYXkodmFsdWUpXG4gIH0gZWxzZSB7XG4gICAgdGhpcy53YWxrKHZhbHVlKVxuICB9XG59XG5cbi8vIEluc3RhbmNlIG1ldGhvZHNcblxuLyoqXG4gKiBXYWxrIHRocm91Z2ggZWFjaCBwcm9wZXJ0eSBhbmQgY29udmVydCB0aGVtIGludG9cbiAqIGdldHRlci9zZXR0ZXJzLiBUaGlzIG1ldGhvZCBzaG91bGQgb25seSBiZSBjYWxsZWQgd2hlblxuICogdmFsdWUgdHlwZSBpcyBPYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICovXG5cbk9ic2VydmVyLnByb3RvdHlwZS53YWxrID0gZnVuY3Rpb24gKG9iaikge1xuICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XG4gICAgdGhpcy5jb252ZXJ0KGtleSwgb2JqW2tleV0pXG4gIH1cbn1cblxuLyoqXG4gKiBPYnNlcnZlIGEgbGlzdCBvZiBBcnJheSBpdGVtcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBpdGVtc1xuICovXG5cbk9ic2VydmVyLnByb3RvdHlwZS5vYnNlcnZlQXJyYXkgPSBmdW5jdGlvbiAoaXRlbXMpIHtcbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBpdGVtcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBvYnNlcnZlKGl0ZW1zW2ldKVxuICB9XG59XG5cbi8qKlxuICogQ29udmVydCBhIHByb3BlcnR5IGludG8gZ2V0dGVyL3NldHRlciBzbyB3ZSBjYW4gZW1pdFxuICogdGhlIGV2ZW50cyB3aGVuIHRoZSBwcm9wZXJ0eSBpcyBhY2Nlc3NlZC9jaGFuZ2VkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKi9cblxuT2JzZXJ2ZXIucHJvdG90eXBlLmNvbnZlcnQgPSBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcbiAgZGVmaW5lUmVhY3RpdmUodGhpcy52YWx1ZSwga2V5LCB2YWwpXG59XG5cbi8qKlxuICogQWRkIGFuIG93bmVyIHZtLCBzbyB0aGF0IHdoZW4gJHNldC8kZGVsZXRlIG11dGF0aW9uc1xuICogaGFwcGVuIHdlIGNhbiBub3RpZnkgb3duZXIgdm1zIHRvIHByb3h5IHRoZSBrZXlzIGFuZFxuICogZGlnZXN0IHRoZSB3YXRjaGVycy4gVGhpcyBpcyBvbmx5IGNhbGxlZCB3aGVuIHRoZSBvYmplY3RcbiAqIGlzIG9ic2VydmVkIGFzIGFuIGluc3RhbmNlJ3Mgcm9vdCAkZGF0YS5cbiAqXG4gKiBAcGFyYW0ge1Z1ZX0gdm1cbiAqL1xuXG5PYnNlcnZlci5wcm90b3R5cGUuYWRkVm0gPSBmdW5jdGlvbiAodm0pIHtcbiAgKHRoaXMudm1zIHx8ICh0aGlzLnZtcyA9IFtdKSkucHVzaCh2bSlcbn1cblxuLyoqXG4gKiBSZW1vdmUgYW4gb3duZXIgdm0uIFRoaXMgaXMgY2FsbGVkIHdoZW4gdGhlIG9iamVjdCBpc1xuICogc3dhcHBlZCBvdXQgYXMgYW4gaW5zdGFuY2UncyAkZGF0YSBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtWdWV9IHZtXG4gKi9cblxuT2JzZXJ2ZXIucHJvdG90eXBlLnJlbW92ZVZtID0gZnVuY3Rpb24gKHZtKSB7XG4gIHJlbW92ZSh0aGlzLnZtcywgdm0pXG59XG5cbi8vIGhlbHBlcnNcblxuLyoqXG4gKiBBdWdtZW50IGFuIHRhcmdldCBPYmplY3Qgb3IgQXJyYXkgYnkgaW50ZXJjZXB0aW5nXG4gKiB0aGUgcHJvdG90eXBlIGNoYWluIHVzaW5nIF9fcHJvdG9fX1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBzcmNcbiAqL1xuXG5mdW5jdGlvbiBwcm90b0F1Z21lbnQgKHRhcmdldCwgc3JjKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG4gIHRhcmdldC5fX3Byb3RvX18gPSBzcmNcbiAgLyogZXNsaW50LWVuYWJsZSBuby1wcm90byAqL1xufVxuXG4vKipcbiAqIEF1Z21lbnQgYW4gdGFyZ2V0IE9iamVjdCBvciBBcnJheSBieSBkZWZpbmluZ1xuICogaGlkZGVuIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IHRhcmdldFxuICogQHBhcmFtIHtPYmplY3R9IHByb3RvXG4gKi9cblxuZnVuY3Rpb24gY29weUF1Z21lbnQgKHRhcmdldCwgc3JjLCBrZXlzKSB7XG4gIGZvciAobGV0IGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBjb25zdCBrZXkgPSBrZXlzW2ldXG4gICAgZGVmKHRhcmdldCwga2V5LCBzcmNba2V5XSlcbiAgfVxufVxuXG4vKipcbiAqIEF0dGVtcHQgdG8gY3JlYXRlIGFuIG9ic2VydmVyIGluc3RhbmNlIGZvciBhIHZhbHVlLFxuICogcmV0dXJucyB0aGUgbmV3IG9ic2VydmVyIGlmIHN1Y2Nlc3NmdWxseSBvYnNlcnZlZCxcbiAqIG9yIHRoZSBleGlzdGluZyBvYnNlcnZlciBpZiB0aGUgdmFsdWUgYWxyZWFkeSBoYXMgb25lLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEBwYXJhbSB7VnVlfSBbdm1dXG4gKiBAcmV0dXJuIHtPYnNlcnZlcnx1bmRlZmluZWR9XG4gKiBAc3RhdGljXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG9ic2VydmUgKHZhbHVlLCB2bSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVyblxuICB9XG4gIGxldCBvYlxuICBpZiAoaGFzT3duKHZhbHVlLCAnX19vYl9fJykgJiYgdmFsdWUuX19vYl9fIGluc3RhbmNlb2YgT2JzZXJ2ZXIpIHtcbiAgICBvYiA9IHZhbHVlLl9fb2JfX1xuICB9IGVsc2UgaWYgKFxuICAgIChpc0FycmF5KHZhbHVlKSB8fCBpc1BsYWluT2JqZWN0KHZhbHVlKSkgJiZcbiAgICBPYmplY3QuaXNFeHRlbnNpYmxlKHZhbHVlKSAmJlxuICAgICF2YWx1ZS5faXNWdWVcbiAgKSB7XG4gICAgb2IgPSBuZXcgT2JzZXJ2ZXIodmFsdWUpXG4gIH1cbiAgaWYgKG9iICYmIHZtKSB7XG4gICAgb2IuYWRkVm0odm0pXG4gIH1cbiAgcmV0dXJuIG9iXG59XG5cbi8qKlxuICogRGVmaW5lIGEgcmVhY3RpdmUgcHJvcGVydHkgb24gYW4gT2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZVJlYWN0aXZlIChvYmosIGtleSwgdmFsKSB7XG4gIGNvbnN0IGRlcCA9IG5ldyBEZXAoKVxuXG4gIGNvbnN0IHByb3BlcnR5ID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSlcbiAgaWYgKHByb3BlcnR5ICYmIHByb3BlcnR5LmNvbmZpZ3VyYWJsZSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIC8vIGNhdGVyIGZvciBwcmUtZGVmaW5lZCBnZXR0ZXIvc2V0dGVyc1xuICBjb25zdCBnZXR0ZXIgPSBwcm9wZXJ0eSAmJiBwcm9wZXJ0eS5nZXRcbiAgY29uc3Qgc2V0dGVyID0gcHJvcGVydHkgJiYgcHJvcGVydHkuc2V0XG5cbiAgbGV0IGNoaWxkT2IgPSBvYnNlcnZlKHZhbClcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiByZWFjdGl2ZUdldHRlciAoKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGdldHRlciA/IGdldHRlci5jYWxsKG9iaikgOiB2YWxcbiAgICAgIGlmIChEZXAudGFyZ2V0KSB7XG4gICAgICAgIGRlcC5kZXBlbmQoKVxuICAgICAgICBpZiAoY2hpbGRPYikge1xuICAgICAgICAgIGNoaWxkT2IuZGVwLmRlcGVuZCgpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgZm9yIChsZXQgZSwgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGUgPSB2YWx1ZVtpXVxuICAgICAgICAgICAgZSAmJiBlLl9fb2JfXyAmJiBlLl9fb2JfXy5kZXAuZGVwZW5kKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiByZWFjdGl2ZVNldHRlciAobmV3VmFsKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGdldHRlciA/IGdldHRlci5jYWxsKG9iaikgOiB2YWxcbiAgICAgIGlmIChuZXdWYWwgPT09IHZhbHVlKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgaWYgKHNldHRlcikge1xuICAgICAgICBzZXR0ZXIuY2FsbChvYmosIG5ld1ZhbClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IG5ld1ZhbFxuICAgICAgfVxuICAgICAgY2hpbGRPYiA9IG9ic2VydmUobmV3VmFsKVxuICAgICAgZGVwLm5vdGlmeSgpXG4gICAgfVxuICB9KVxufVxuXG4vKipcbiAqIFNldCBhIHByb3BlcnR5IG9uIGFuIG9iamVjdC4gQWRkcyB0aGUgbmV3IHByb3BlcnR5IGFuZFxuICogdHJpZ2dlcnMgY2hhbmdlIG5vdGlmaWNhdGlvbiBpZiB0aGUgcHJvcGVydHkgZG9lc24ndFxuICogYWxyZWFkeSBleGlzdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHB1YmxpY1xuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXQgKG9iaiwga2V5LCB2YWwpIHtcbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBvYmouc3BsaWNlKGtleSwgMSwgdmFsKVxuICB9XG4gIGlmIChoYXNPd24ob2JqLCBrZXkpKSB7XG4gICAgb2JqW2tleV0gPSB2YWxcbiAgICByZXR1cm5cbiAgfVxuICBpZiAob2JqLl9pc1Z1ZSkge1xuICAgIHNldChvYmouX2RhdGEsIGtleSwgdmFsKVxuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IG9iID0gb2JqLl9fb2JfX1xuICBpZiAoIW9iKSB7XG4gICAgb2JqW2tleV0gPSB2YWxcbiAgICByZXR1cm5cbiAgfVxuICBvYi5jb252ZXJ0KGtleSwgdmFsKVxuICBvYi5kZXAubm90aWZ5KClcbiAgaWYgKG9iLnZtcykge1xuICAgIGxldCBpID0gb2Iudm1zLmxlbmd0aFxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGNvbnN0IHZtID0gb2Iudm1zW2ldXG4gICAgICBwcm94eSh2bSwga2V5KVxuICAgICAgdm0uJGZvcmNlVXBkYXRlKClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZhbFxufVxuXG4vKipcbiAqIERlbGV0ZSBhIHByb3BlcnR5IGFuZCB0cmlnZ2VyIGNoYW5nZSBpZiBuZWNlc3NhcnkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkZWwgKG9iaiwga2V5KSB7XG4gIGlmICghaGFzT3duKG9iaiwga2V5KSkge1xuICAgIHJldHVyblxuICB9XG4gIGRlbGV0ZSBvYmpba2V5XVxuICBjb25zdCBvYiA9IG9iai5fX29iX19cblxuICBpZiAoIW9iKSB7XG4gICAgaWYgKG9iai5faXNWdWUpIHtcbiAgICAgIGRlbGV0ZSBvYmouX2RhdGFba2V5XVxuICAgICAgb2JqLiRmb3JjZVVwZGF0ZSgpXG4gICAgfVxuICAgIHJldHVyblxuICB9XG4gIG9iLmRlcC5ub3RpZnkoKVxuICBpZiAob2Iudm1zKSB7XG4gICAgbGV0IGkgPSBvYi52bXMubGVuZ3RoXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgY29uc3Qgdm0gPSBvYi52bXNbaV1cbiAgICAgIHVucHJveHkodm0sIGtleSlcbiAgICAgIHZtLiRmb3JjZVVwZGF0ZSgpXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IEtFWV9XT1JEUyA9IFsnJGluZGV4JywgJyR2YWx1ZScsICckZXZlbnQnXVxuZXhwb3J0IGZ1bmN0aW9uIHByb3h5ICh2bSwga2V5KSB7XG4gIGlmIChLRVlfV09SRFMuaW5kZXhPZihrZXkpID4gLTEgfHwgIWlzUmVzZXJ2ZWQoa2V5KSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2bSwga2V5LCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiBwcm94eUdldHRlciAoKSB7XG4gICAgICAgIHJldHVybiB2bS5fZGF0YVtrZXldXG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbiBwcm94eVNldHRlciAodmFsKSB7XG4gICAgICAgIHZtLl9kYXRhW2tleV0gPSB2YWxcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnByb3h5ICh2bSwga2V5KSB7XG4gIGlmICghaXNSZXNlcnZlZChrZXkpKSB7XG4gICAgZGVsZXRlIHZtW2tleV1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9odG1sNS9kZWZhdWx0L2NvcmUvb2JzZXJ2ZXIuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuXG5pbXBvcnQgeyBkZWYgfSBmcm9tICcuLi91dGlsJ1xuXG5jb25zdCBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlXG5leHBvcnQgY29uc3QgYXJyYXlNZXRob2RzID0gT2JqZWN0LmNyZWF0ZShhcnJheVByb3RvKVxuXG4vKipcbiAqIEludGVyY2VwdCBtdXRhdGluZyBtZXRob2RzIGFuZCBlbWl0IGV2ZW50c1xuICovXG5cbjtbXG4gICdwdXNoJyxcbiAgJ3BvcCcsXG4gICdzaGlmdCcsXG4gICd1bnNoaWZ0JyxcbiAgJ3NwbGljZScsXG4gICdzb3J0JyxcbiAgJ3JldmVyc2UnXG5dXG4uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gIC8vIGNhY2hlIG9yaWdpbmFsIG1ldGhvZFxuICBjb25zdCBvcmlnaW5hbCA9IGFycmF5UHJvdG9bbWV0aG9kXVxuICBkZWYoYXJyYXlNZXRob2RzLCBtZXRob2QsIGZ1bmN0aW9uIG11dGF0b3IgKCkge1xuICAgIC8vIGF2b2lkIGxlYWtpbmcgYXJndW1lbnRzOlxuICAgIC8vIGh0dHA6Ly9qc3BlcmYuY29tL2Nsb3N1cmUtd2l0aC1hcmd1bWVudHNcbiAgICBsZXQgaSA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICBjb25zdCBhcmdzID0gbmV3IEFycmF5KGkpXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXVxuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSBvcmlnaW5hbC5hcHBseSh0aGlzLCBhcmdzKVxuICAgIGNvbnN0IG9iID0gdGhpcy5fX29iX19cbiAgICBsZXQgaW5zZXJ0ZWRcbiAgICBzd2l0Y2ggKG1ldGhvZCkge1xuICAgICAgY2FzZSAncHVzaCc6XG4gICAgICAgIGluc2VydGVkID0gYXJnc1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAndW5zaGlmdCc6XG4gICAgICAgIGluc2VydGVkID0gYXJnc1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnc3BsaWNlJzpcbiAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzLnNsaWNlKDIpXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICAgIGlmIChpbnNlcnRlZCkgb2Iub2JzZXJ2ZUFycmF5KGluc2VydGVkKVxuICAgIC8vIG5vdGlmeSBjaGFuZ2VcbiAgICBvYi5kZXAubm90aWZ5KClcbiAgICByZXR1cm4gcmVzdWx0XG4gIH0pXG59KVxuXG4vKipcbiAqIFN3YXAgdGhlIGVsZW1lbnQgYXQgdGhlIGdpdmVuIGluZGV4IHdpdGggYSBuZXcgdmFsdWVcbiAqIGFuZCBlbWl0cyBjb3JyZXNwb25kaW5nIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4geyp9IC0gcmVwbGFjZWQgZWxlbWVudFxuICovXG5cbmRlZihcbiAgYXJyYXlQcm90byxcbiAgJyRzZXQnLFxuICBmdW5jdGlvbiAkc2V0IChpbmRleCwgdmFsKSB7XG4gICAgaWYgKGluZGV4ID49IHRoaXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmxlbmd0aCA9IGluZGV4ICsgMVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zcGxpY2UoaW5kZXgsIDEsIHZhbClbMF1cbiAgfVxuKVxuXG4vKipcbiAqIENvbnZlbmllbmNlIG1ldGhvZCB0byByZW1vdmUgdGhlIGVsZW1lbnQgYXQgZ2l2ZW4gaW5kZXguXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gKiBAcGFyYW0geyp9IHZhbFxuICovXG5cbmRlZihcbiAgYXJyYXlQcm90byxcbiAgJyRyZW1vdmUnLFxuICBmdW5jdGlvbiAkcmVtb3ZlIChpbmRleCkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICghdGhpcy5sZW5ndGgpIHJldHVyblxuICAgIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInKSB7XG4gICAgICBpbmRleCA9IHRoaXMuaW5kZXhPZihpbmRleClcbiAgICB9XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMuc3BsaWNlKGluZGV4LCAxKVxuICAgIH1cbiAgfVxuKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9odG1sNS9kZWZhdWx0L2NvcmUvYXJyYXkuanNcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXdcbiAqIFZpZXdNb2RlbCB0ZW1wbGF0ZSBwYXJzZXIgJiBkYXRhLWJpbmRpbmcgcHJvY2Vzc1xuICpcbiAqIHJlcXVpcmVkOlxuICogaW5kZXguanM6IFZtXG4gKiBkb20taGVscGVyLmpzOiBfY3JlYXRlRWxlbWVudCwgX2NyZWF0ZUJsb2NrXG4gKiBkb20taGVscGVyLmpzOiBfYXR0YWNoVGFyZ2V0LCBfbW92ZVRhcmdldCwgX3JlbW92ZVRhcmdldFxuICogZGlyZWN0aXZlLmpzOiBfYmluZEVsZW1lbnQsIF9iaW5kU3ViVm0sIF93YXRjaFxuICogZXZlbnRzLmpzOiAkb25cbiAqL1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJy4uL3V0aWwnXG5cbi8qKlxuICogYnVpbGQoZXh0ZXJuYWxEaXJzKVxuICogICBjcmVhdGVWbSgpXG4gKiAgIG1lcmdlKGV4dGVybmFsRGlycywgZGlycylcbiAqICAgY29tcGlsZSh0ZW1wbGF0ZSwgcGFyZW50Tm9kZSlcbiAqICAgICBpZiAodHlwZSBpcyBjb250ZW50KSBjcmVhdGUgY29udGVudE5vZGVcbiAqICAgICBlbHNlIGlmIChkaXJzIGhhdmUgdi1mb3IpIGZvcmVhY2ggLT4gY3JlYXRlIGNvbnRleHRcbiAqICAgICAgIC0+IGNvbXBpbGUodGVtcGxhdGVXaXRob3V0Rm9yLCBwYXJlbnROb2RlKTogZGlmZihsaXN0KSBvbmNoYW5nZVxuICogICAgIGVsc2UgaWYgKGRpcnMgaGF2ZSB2LWlmKSBhc3NlcnRcbiAqICAgICAgIC0+IGNvbXBpbGUodGVtcGxhdGVXaXRob3V0SWYsIHBhcmVudE5vZGUpOiB0b2dnbGUoc2hvd24pIG9uY2hhbmdlXG4gKiAgICAgZWxzZSBpZiAodHlwZSBpcyBuYXRpdmUpXG4gKiAgICAgICBzZXQoZGlycyk6IHVwZGF0ZShpZC9hdHRyL3N0eWxlL2NsYXNzKSBvbmNoYW5nZVxuICogICAgICAgYXBwZW5kKHRlbXBsYXRlLCBwYXJlbnROb2RlKVxuICogICAgICAgZm9yZWFjaCBjaGlsZE5vZGVzIC0+IGNvbXBpbGUoY2hpbGROb2RlLCB0ZW1wbGF0ZSlcbiAqICAgICBlbHNlIGlmICh0eXBlIGlzIGN1c3RvbSlcbiAqICAgICAgIGFkZENoaWxkVm0odm0sIHBhcmVudFZtKVxuICogICAgICAgYnVpbGQoZXh0ZXJuYWxEaXJzKVxuICogICAgICAgZm9yZWFjaCBjaGlsZE5vZGVzIC0+IGNvbXBpbGUoY2hpbGROb2RlLCB0ZW1wbGF0ZSlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9idWlsZCAoKSB7XG4gIGNvbnN0IG9wdCA9IHRoaXMuX29wdGlvbnMgfHwge31cbiAgY29uc3QgdGVtcGxhdGUgPSBvcHQudGVtcGxhdGUgfHwge31cblxuICBpZiAob3B0LnJlcGxhY2UpIHtcbiAgICBpZiAodGVtcGxhdGUuY2hpbGRyZW4gJiYgdGVtcGxhdGUuY2hpbGRyZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgICB0aGlzLl9jb21waWxlKHRlbXBsYXRlLmNoaWxkcmVuWzBdLCB0aGlzLl9wYXJlbnRFbClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLl9jb21waWxlKHRlbXBsYXRlLmNoaWxkcmVuLCB0aGlzLl9wYXJlbnRFbClcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgdGhpcy5fY29tcGlsZSh0ZW1wbGF0ZSwgdGhpcy5fcGFyZW50RWwpXG4gIH1cblxuICBfLmRlYnVnKGBcInJlYWR5XCIgbGlmZWN5Y2xlIGluIFZtKCR7dGhpcy5fdHlwZX0pYClcbiAgdGhpcy4kZW1pdCgnaG9vazpyZWFkeScpXG4gIHRoaXMuX3JlYWR5ID0gdHJ1ZVxufVxuXG4vKipcbiAqIEdlbmVyYXRlIGVsZW1lbnRzIGJ5IGNoaWxkIG9yIGNoaWxkcmVuIGFuZCBhcHBlbmQgdG8gcGFyZW50IGVsZW1lbnRzLlxuICogUm9vdCBlbGVtZW50IGluZm8gd291bGQgYmUgbWVyZ2VkIGlmIGhhcy4gVGhlIGZpcnN0IGFyZ3VtZW50IG1heSBiZSBhbiBhcnJheVxuICogaWYgdGhlIHJvb3QgZWxlbWVudCB3aXRoIG9wdGlvbnMucmVwbGFjZSBoYXMgbm90IG9ubHkgb25lIGNoaWxkLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fGFycmF5fSB0YXJnZXRcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICBkZXN0XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgbWV0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NvbXBpbGUgKHRhcmdldCwgZGVzdCwgbWV0YSkge1xuICBjb25zdCBhcHAgPSB0aGlzLl9hcHAgfHwge31cblxuICBpZiAoYXBwLmxhc3RTaWduYWwgPT09IC0xKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBjb250ZXh0ID0gdGhpc1xuICBpZiAoY29udGV4dC5fdGFyZ2V0SXNGcmFnbWVudCh0YXJnZXQpKSB7XG4gICAgY29udGV4dC5fY29tcGlsZUZyYWdtZW50KHRhcmdldCwgZGVzdCwgbWV0YSlcbiAgICByZXR1cm5cbiAgfVxuICBtZXRhID0gbWV0YSB8fCB7fVxuICBpZiAoY29udGV4dC5fdGFyZ2V0SXNDb250ZW50KHRhcmdldCkpIHtcbiAgICBfLmRlYnVnKCdjb21waWxlIFwiY29udGVudFwiIGJsb2NrIGJ5JywgdGFyZ2V0KVxuICAgIGNvbnRleHQuX2NvbnRlbnQgPSBjb250ZXh0Ll9jcmVhdGVCbG9jayhkZXN0KVxuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKGNvbnRleHQuX3RhcmdldE5lZWRDaGVja1JlcGVhdCh0YXJnZXQsIG1ldGEpKSB7XG4gICAgXy5kZWJ1ZygnY29tcGlsZSBcInJlcGVhdFwiIGxvZ2ljIGJ5JywgdGFyZ2V0KVxuICAgIGNvbnRleHQuX2NvbXBpbGVSZXBlYXQodGFyZ2V0LCBkZXN0KVxuICAgIHJldHVyblxuICB9XG4gIGlmIChjb250ZXh0Ll90YXJnZXROZWVkQ2hlY2tTaG93bih0YXJnZXQsIG1ldGEpKSB7XG4gICAgXy5kZWJ1ZygnY29tcGlsZSBcImlmXCIgbG9naWMgYnknLCB0YXJnZXQpXG4gICAgY29udGV4dC5fY29tcGlsZVNob3duKHRhcmdldCwgZGVzdCwgbWV0YSlcbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCB0eXBlR2V0dGVyID0gbWV0YS50eXBlIHx8IHRhcmdldC50eXBlXG4gIGlmIChjb250ZXh0Ll90YXJnZXROZWVkQ2hlY2tUeXBlKHR5cGVHZXR0ZXIsIG1ldGEpKSB7XG4gICAgY29udGV4dC5fY29tcGlsZVR5cGUodGFyZ2V0LCBkZXN0LCB0eXBlR2V0dGVyLCBtZXRhKVxuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IHR5cGUgPSB0eXBlR2V0dGVyXG4gIGNvbnN0IGNvbXBvbmVudCA9IGNvbnRleHQuX3RhcmdldElzQ29tcG9zZWQodGFyZ2V0LCB0eXBlKVxuICBpZiAoY29tcG9uZW50KSB7XG4gICAgXy5kZWJ1ZygnY29tcGlsZSBjb21wb3NlZCBjb21wb25lbnQgYnknLCB0YXJnZXQpXG4gICAgY29udGV4dC5fY29tcGlsZUN1c3RvbUNvbXBvbmVudChjb21wb25lbnQsIHRhcmdldCwgZGVzdCwgdHlwZSwgbWV0YSlcbiAgICByZXR1cm5cbiAgfVxuICBfLmRlYnVnKCdjb21waWxlIG5hdGl2ZSBjb21wb25lbnQgYnknLCB0YXJnZXQpXG4gIGNvbnRleHQuX2NvbXBpbGVOYXRpdmVDb21wb25lbnQodGFyZ2V0LCBkZXN0LCB0eXBlKVxufVxuXG4vKipcbiAqIENoZWNrIGlmIHRhcmdldCBpcyBhIGZyYWdtZW50IChhbiBhcnJheSkuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSAgdGFyZ2V0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gX3RhcmdldElzRnJhZ21lbnQgKHRhcmdldCkge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheSh0YXJnZXQpXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGFyZ2V0IHR5cGUgaXMgY29udGVudC9zbG90LlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gIHRhcmdldFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF90YXJnZXRJc0NvbnRlbnQgKHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0LnR5cGUgPT09ICdjb250ZW50JyB8fCB0YXJnZXQudHlwZSA9PT0gJ3Nsb3QnXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGFyZ2V0IG5lZWQgdG8gY29tcGlsZSBieSBhIGxpc3QuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSAgdGFyZ2V0XG4gKiBAcGFyYW0gIHtvYmplY3R9ICBtZXRhXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gX3RhcmdldE5lZWRDaGVja1JlcGVhdCAodGFyZ2V0LCBtZXRhKSB7XG4gIHJldHVybiAhbWV0YS5oYXNPd25Qcm9wZXJ0eSgncmVwZWF0JykgJiYgdGFyZ2V0LnJlcGVhdFxufVxuXG4vKipcbiAqIENoZWNrIGlmIHRhcmdldCBuZWVkIHRvIGNvbXBpbGUgYnkgYSBib29sZWFuIHZhbHVlLlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gIHRhcmdldFxuICogQHBhcmFtICB7b2JqZWN0fSAgbWV0YVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF90YXJnZXROZWVkQ2hlY2tTaG93biAodGFyZ2V0LCBtZXRhKSB7XG4gIHJldHVybiAhbWV0YS5oYXNPd25Qcm9wZXJ0eSgnc2hvd24nKSAmJiB0YXJnZXQuc2hvd25cbn1cblxuLyoqXG4gKiBDaGVjayBpZiB0YXJnZXQgbmVlZCB0byBjb21waWxlIGJ5IGEgZHluYW1pYyB0eXBlLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ3xmdW5jdGlvbn0gdHlwZUdldHRlclxuICogQHBhcmFtICB7b2JqZWN0fSAgICAgICAgICBtZXRhXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gX3RhcmdldE5lZWRDaGVja1R5cGUgKHR5cGVHZXR0ZXIsIG1ldGEpIHtcbiAgcmV0dXJuICh0eXBlb2YgdHlwZUdldHRlciA9PT0gJ2Z1bmN0aW9uJykgJiYgIW1ldGEuaGFzT3duUHJvcGVydHkoJ3R5cGUnKVxufVxuXG4vKipcbiAqIENoZWNrIGlmIHRoaXMga2luZCBvZiBjb21wb25lbnQgaXMgY29tcG9zZWQuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSAgdHlwZVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF90YXJnZXRJc0NvbXBvc2VkICh0YXJnZXQsIHR5cGUpIHtcbiAgbGV0IGNvbXBvbmVudFxuICBpZiAodGhpcy5fYXBwICYmIHRoaXMuX2FwcC5jdXN0b21Db21wb25lbnRNYXApIHtcbiAgICBjb21wb25lbnQgPSB0aGlzLl9hcHAuY3VzdG9tQ29tcG9uZW50TWFwW3R5cGVdXG4gIH1cbiAgaWYgKHRoaXMuX29wdGlvbnMgJiYgdGhpcy5fb3B0aW9ucy5jb21wb25lbnRzKSB7XG4gICAgY29tcG9uZW50ID0gdGhpcy5fb3B0aW9ucy5jb21wb25lbnRzW3R5cGVdXG4gIH1cbiAgaWYgKHRhcmdldC5jb21wb25lbnQpIHtcbiAgICBjb21wb25lbnQgPSBjb21wb25lbnQgfHwge31cbiAgfVxuICByZXR1cm4gY29tcG9uZW50XG59XG5cbi8qKlxuICogQ29tcGlsZSBhIGxpc3Qgb2YgdGFyZ2V0cy5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0ge29iamVjdH0gZGVzdFxuICogQHBhcmFtIHtvYmplY3R9IG1ldGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jb21waWxlRnJhZ21lbnQgKHRhcmdldCwgZGVzdCwgbWV0YSkge1xuICBjb25zdCBmcmFnQmxvY2sgPSB0aGlzLl9jcmVhdGVCbG9jayhkZXN0KVxuICB0YXJnZXQuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICB0aGlzLl9jb21waWxlKGNoaWxkLCBmcmFnQmxvY2ssIG1ldGEpXG4gIH0pXG59XG5cbi8qKlxuICogQ29tcGlsZSBhIHRhcmdldCB3aXRoIHJlcGVhdCBkaXJlY3RpdmUuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICogQHBhcmFtIHtvYmplY3R9IGRlc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jb21waWxlUmVwZWF0ICh0YXJnZXQsIGRlc3QpIHtcbiAgY29uc3QgcmVwZWF0ID0gdGFyZ2V0LnJlcGVhdFxuICBjb25zdCBvbGRTdHlsZSA9IHR5cGVvZiByZXBlYXQgPT09ICdmdW5jdGlvbidcbiAgbGV0IGdldHRlciA9IHJlcGVhdC5nZXR0ZXIgfHwgcmVwZWF0LmV4cHJlc3Npb24gfHwgcmVwZWF0XG4gIGlmICh0eXBlb2YgZ2V0dGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgZ2V0dGVyID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW10gfVxuICB9XG4gIGNvbnN0IGtleSA9IHJlcGVhdC5rZXkgfHwgJyRpbmRleCdcbiAgY29uc3QgdmFsdWUgPSByZXBlYXQudmFsdWUgfHwgJyR2YWx1ZSdcbiAgY29uc3QgdHJhY2tCeSA9IHJlcGVhdC50cmFja0J5IHx8IHRhcmdldC50cmFja0J5IHx8XG4gICAgKHRhcmdldC5hdHRyICYmIHRhcmdldC5hdHRyLnRyYWNrQnkpXG5cbiAgY29uc3QgZnJhZ0Jsb2NrID0gdGhpcy5fY3JlYXRlQmxvY2soZGVzdClcbiAgZnJhZ0Jsb2NrLmNoaWxkcmVuID0gW11cbiAgZnJhZ0Jsb2NrLmRhdGEgPSBbXVxuICBmcmFnQmxvY2sudm1zID0gW11cblxuICB0aGlzLl9iaW5kUmVwZWF0KHRhcmdldCwgZnJhZ0Jsb2NrLCB7IGdldHRlciwga2V5LCB2YWx1ZSwgdHJhY2tCeSwgb2xkU3R5bGUgfSlcbn1cblxuLyoqXG4gKiBDb21waWxlIGEgdGFyZ2V0IHdpdGggaWYgZGlyZWN0aXZlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSB7b2JqZWN0fSBkZXN0XG4gKiBAcGFyYW0ge29iamVjdH0gbWV0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NvbXBpbGVTaG93biAodGFyZ2V0LCBkZXN0LCBtZXRhKSB7XG4gIGNvbnN0IG5ld01ldGEgPSB7IHNob3duOiB0cnVlIH1cbiAgY29uc3QgZnJhZ0Jsb2NrID0gdGhpcy5fY3JlYXRlQmxvY2soZGVzdClcblxuICBpZiAoZGVzdC5lbGVtZW50ICYmIGRlc3QuY2hpbGRyZW4pIHtcbiAgICBkZXN0LmNoaWxkcmVuLnB1c2goZnJhZ0Jsb2NrKVxuICB9XG5cbiAgaWYgKG1ldGEucmVwZWF0KSB7XG4gICAgbmV3TWV0YS5yZXBlYXQgPSBtZXRhLnJlcGVhdFxuICB9XG5cbiAgdGhpcy5fYmluZFNob3duKHRhcmdldCwgZnJhZ0Jsb2NrLCBuZXdNZXRhKVxufVxuXG4vKipcbiAqIENvbXBpbGUgYSB0YXJnZXQgd2l0aCBkeW5hbWljIGNvbXBvbmVudCB0eXBlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSAgIHRhcmdldFxuICogQHBhcmFtIHtvYmplY3R9ICAgZGVzdFxuICogQHBhcmFtIHtmdW5jdGlvbn0gdHlwZUdldHRlclxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NvbXBpbGVUeXBlICh0YXJnZXQsIGRlc3QsIHR5cGVHZXR0ZXIsIG1ldGEpIHtcbiAgY29uc3QgdHlwZSA9IHR5cGVHZXR0ZXIuY2FsbCh0aGlzKVxuICBjb25zdCBuZXdNZXRhID0gT2JqZWN0LmFzc2lnbih7IHR5cGUgfSwgbWV0YSlcbiAgY29uc3QgZnJhZ0Jsb2NrID0gdGhpcy5fY3JlYXRlQmxvY2soZGVzdClcblxuICBpZiAoZGVzdC5lbGVtZW50ICYmIGRlc3QuY2hpbGRyZW4pIHtcbiAgICBkZXN0LmNoaWxkcmVuLnB1c2goZnJhZ0Jsb2NrKVxuICB9XG5cbiAgdGhpcy5fd2F0Y2godHlwZUdldHRlciwgKHZhbHVlKSA9PiB7XG4gICAgY29uc3QgbmV3TWV0YSA9IE9iamVjdC5hc3NpZ24oeyB0eXBlOiB2YWx1ZSB9LCBtZXRhKVxuICAgIHRoaXMuX3JlbW92ZUJsb2NrKGZyYWdCbG9jaywgdHJ1ZSlcbiAgICB0aGlzLl9jb21waWxlKHRhcmdldCwgZnJhZ0Jsb2NrLCBuZXdNZXRhKVxuICB9KVxuXG4gIHRoaXMuX2NvbXBpbGUodGFyZ2V0LCBmcmFnQmxvY2ssIG5ld01ldGEpXG59XG5cbi8qKlxuICogQ29tcGlsZSBhIGNvbXBvc2VkIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0ge29iamVjdH0gZGVzdFxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jb21waWxlQ3VzdG9tQ29tcG9uZW50IChjb21wb25lbnQsIHRhcmdldCwgZGVzdCwgdHlwZSwgbWV0YSkge1xuICBjb25zdCBWbSA9IHRoaXMuY29uc3RydWN0b3JcbiAgY29uc3QgY29udGV4dCA9IHRoaXNcbiAgY29uc3Qgc3ViVm0gPSBuZXcgVm0odHlwZSwgY29tcG9uZW50LCBjb250ZXh0LCBkZXN0LCB1bmRlZmluZWQsIHtcbiAgICAnaG9vazppbml0JzogZnVuY3Rpb24gKCkge1xuICAgICAgY29udGV4dC5fc2V0SWQodGFyZ2V0LmlkLCBudWxsLCB0aGlzKVxuICAgICAgLy8gYmluZCB0ZW1wbGF0ZSBlYXJsaWVyIGJlY2F1c2Ugb2YgbGlmZWN5Y2xlIGlzc3Vlc1xuICAgICAgdGhpcy5fZXh0ZXJuYWxCaW5kaW5nID0ge1xuICAgICAgICBwYXJlbnQ6IGNvbnRleHQsXG4gICAgICAgIHRlbXBsYXRlOiB0YXJnZXRcbiAgICAgIH1cbiAgICB9LFxuICAgICdob29rOmNyZWF0ZWQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb250ZXh0Ll9iaW5kU3ViVm0odGhpcywgdGFyZ2V0LCBtZXRhLnJlcGVhdClcbiAgICB9LFxuICAgICdob29rOnJlYWR5JzogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuX2NvbnRlbnQpIHtcbiAgICAgICAgY29udGV4dC5fY29tcGlsZUNoaWxkcmVuKHRhcmdldCwgdGhpcy5fY29udGVudClcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIHRoaXMuX2JpbmRTdWJWbUFmdGVySW5pdGlhbGl6ZWQoc3ViVm0sIHRhcmdldClcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSBlbGVtZW50IGZyb20gdGVtcGxhdGUgYW5kIGF0dGFjaCB0byB0aGUgZGVzdCBpZiBuZWVkZWQuXG4gKiBUaGUgdGltZSB0byBhdHRhY2ggZGVwZW5kcyBvbiB3aGV0aGVyIHRoZSBtb2RlIHN0YXR1cyBpcyBub2RlIG9yIHRyZWUuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRlbXBsYXRlXG4gKiBAcGFyYW0ge29iamVjdH0gZGVzdFxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jb21waWxlTmF0aXZlQ29tcG9uZW50ICh0ZW1wbGF0ZSwgZGVzdCwgdHlwZSkge1xuICB0aGlzLl9hcHBseU5haXR2ZUNvbXBvbmVudE9wdGlvbnModGVtcGxhdGUpXG5cbiAgbGV0IGVsZW1lbnRcbiAgaWYgKGRlc3QucmVmID09PSAnX2RvY3VtZW50RWxlbWVudCcpIHtcbiAgICAvLyBpZiBpdHMgcGFyZW50IGlzIGRvY3VtZW50RWxlbWVudCB0aGVuIGl0J3MgYSBib2R5XG4gICAgXy5kZWJ1ZygnY29tcGlsZSB0byBjcmVhdGUgYm9keSBmb3InLCB0eXBlKVxuICAgIGVsZW1lbnQgPSB0aGlzLl9jcmVhdGVCb2R5KHR5cGUpXG4gIH1cbiAgZWxzZSB7XG4gICAgXy5kZWJ1ZygnY29tcGlsZSB0byBjcmVhdGUgZWxlbWVudCBmb3InLCB0eXBlKVxuICAgIGVsZW1lbnQgPSB0aGlzLl9jcmVhdGVFbGVtZW50KHR5cGUpXG4gIH1cblxuICBpZiAoIXRoaXMuX3Jvb3RFbCkge1xuICAgIHRoaXMuX3Jvb3RFbCA9IGVsZW1lbnRcbiAgICAvLyBiaW5kIGV2ZW50IGVhcmxpZXIgYmVjYXVzZSBvZiBsaWZlY3ljbGUgaXNzdWVzXG4gICAgY29uc3QgYmluZGluZyA9IHRoaXMuX2V4dGVybmFsQmluZGluZyB8fCB7fVxuICAgIGNvbnN0IHRhcmdldCA9IGJpbmRpbmcudGVtcGxhdGVcbiAgICBjb25zdCB2bSA9IGJpbmRpbmcucGFyZW50XG4gICAgaWYgKHRhcmdldCAmJiB0YXJnZXQuZXZlbnRzICYmIHZtICYmIGVsZW1lbnQpIHtcbiAgICAgIGZvciAoY29uc3QgdHlwZSBpbiB0YXJnZXQuZXZlbnRzKSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSB2bVt0YXJnZXQuZXZlbnRzW3R5cGVdXVxuICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnQodHlwZSwgXy5iaW5kKGhhbmRsZXIsIHZtKSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuX2JpbmRFbGVtZW50KGVsZW1lbnQsIHRlbXBsYXRlKVxuXG4gIGlmICh0ZW1wbGF0ZS5hdHRyICYmIHRlbXBsYXRlLmF0dHIuYXBwZW5kKSB7IC8vIGJhY2t3YXJkLCBhcHBlbmQgcHJvcCBpbiBhdHRyXG4gICAgdGVtcGxhdGUuYXBwZW5kID0gdGVtcGxhdGUuYXR0ci5hcHBlbmRcbiAgfVxuXG4gIGlmICh0ZW1wbGF0ZS5hcHBlbmQpIHsgLy8gZ2l2ZSB0aGUgYXBwZW5kIGF0dHJpYnV0ZSBmb3IgaW9zIGFkYXB0YXRpb25cbiAgICBlbGVtZW50LmF0dHIgPSBlbGVtZW50LmF0dHIgfHwge31cbiAgICBlbGVtZW50LmF0dHIuYXBwZW5kID0gdGVtcGxhdGUuYXBwZW5kXG4gIH1cblxuICBjb25zdCB0cmVlTW9kZSA9IHRlbXBsYXRlLmFwcGVuZCA9PT0gJ3RyZWUnXG4gIGNvbnN0IGFwcCA9IHRoaXMuX2FwcCB8fCB7fVxuICBpZiAoYXBwLmxhc3RTaWduYWwgIT09IC0xICYmICF0cmVlTW9kZSkge1xuICAgIF8uZGVidWcoJ2NvbXBpbGUgdG8gYXBwZW5kIHNpbmdsZSBub2RlIGZvcicsIGVsZW1lbnQpXG4gICAgYXBwLmxhc3RTaWduYWwgPSB0aGlzLl9hdHRhY2hUYXJnZXQoZWxlbWVudCwgZGVzdClcbiAgfVxuICBpZiAoYXBwLmxhc3RTaWduYWwgIT09IC0xKSB7XG4gICAgdGhpcy5fY29tcGlsZUNoaWxkcmVuKHRlbXBsYXRlLCBlbGVtZW50KVxuICB9XG4gIGlmIChhcHAubGFzdFNpZ25hbCAhPT0gLTEgJiYgdHJlZU1vZGUpIHtcbiAgICBfLmRlYnVnKCdjb21waWxlIHRvIGFwcGVuZCB3aG9sZSB0cmVlIGZvcicsIGVsZW1lbnQpXG4gICAgYXBwLmxhc3RTaWduYWwgPSB0aGlzLl9hdHRhY2hUYXJnZXQoZWxlbWVudCwgZGVzdClcbiAgfVxufVxuXG4vKipcbiAqIFNldCBhbGwgY2hpbGRyZW4gdG8gYSBjZXJ0YWluIHBhcmVudCBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0ZW1wbGF0ZVxuICogQHBhcmFtIHtvYmplY3R9IGRlc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jb21waWxlQ2hpbGRyZW4gKHRlbXBsYXRlLCBkZXN0KSB7XG4gIGNvbnN0IGFwcCA9IHRoaXMuX2FwcCB8fCB7fVxuICBjb25zdCBjaGlsZHJlbiA9IHRlbXBsYXRlLmNoaWxkcmVuXG4gIGlmIChjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICBjaGlsZHJlbi5ldmVyeSgoY2hpbGQpID0+IHtcbiAgICAgIHRoaXMuX2NvbXBpbGUoY2hpbGQsIGRlc3QpXG4gICAgICByZXR1cm4gYXBwLmxhc3RTaWduYWwgIT09IC0xXG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIFdhdGNoIHRoZSBsaXN0IHVwZGF0ZSBhbmQgcmVmcmVzaCB0aGUgY2hhbmdlcy5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0ge29iamVjdH0gZnJhZ0Jsb2NrIHt2bXMsIGRhdGEsIGNoaWxkcmVufVxuICogQHBhcmFtIHtvYmplY3R9IGluZm8gICAgICB7Z2V0dGVyLCBrZXksIHZhbHVlLCB0cmFja0J5LCBvbGRTdHlsZX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9iaW5kUmVwZWF0ICh0YXJnZXQsIGZyYWdCbG9jaywgaW5mbykge1xuICBjb25zdCB2bXMgPSBmcmFnQmxvY2sudm1zXG4gIGNvbnN0IGNoaWxkcmVuID0gZnJhZ0Jsb2NrLmNoaWxkcmVuXG4gIGNvbnN0IHsgZ2V0dGVyLCB0cmFja0J5LCBvbGRTdHlsZSB9ID0gaW5mb1xuICBjb25zdCBrZXlOYW1lID0gaW5mby5rZXlcbiAgY29uc3QgdmFsdWVOYW1lID0gaW5mby52YWx1ZVxuXG4gIGZ1bmN0aW9uIGNvbXBpbGVJdGVtIChpdGVtLCBpbmRleCwgY29udGV4dCkge1xuICAgIGxldCBtZXJnZWREYXRhXG4gICAgaWYgKG9sZFN0eWxlKSB7XG4gICAgICBtZXJnZWREYXRhID0gaXRlbVxuICAgICAgaWYgKHR5cGVvZiBpdGVtID09PSAnb2JqZWN0Jykge1xuICAgICAgICBtZXJnZWREYXRhW2tleU5hbWVdID0gaW5kZXhcbiAgICAgICAgaWYgKCFtZXJnZWREYXRhLmhhc093blByb3BlcnR5KCdJTkRFWCcpKSB7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1lcmdlZERhdGEsICdJTkRFWCcsIHtcbiAgICAgICAgICAgIHZhbHVlOiAoKSA9PiB7XG4gICAgICAgICAgICAgIF8ud2FybignXCJJTkRFWFwiIGluIHJlcGVhdCBpcyBkZXByZWNhdGVkLCcgK1xuICAgICAgICAgICAgICAgICcgcGxlYXNlIHVzZSBcIiRpbmRleFwiIGluc3RlYWQnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBtZXJnZWREYXRhID0ge31cbiAgICAgIG1lcmdlZERhdGFba2V5TmFtZV0gPSBpbmRleFxuICAgICAgbWVyZ2VkRGF0YVt2YWx1ZU5hbWVdID0gaXRlbVxuICAgIH1cbiAgICBjb250ZXh0ID0gY29udGV4dC5fbWVyZ2VDb250ZXh0KG1lcmdlZERhdGEpXG4gICAgdm1zLnB1c2goY29udGV4dClcbiAgICBjb250ZXh0Ll9jb21waWxlKHRhcmdldCwgZnJhZ0Jsb2NrLCB7IHJlcGVhdDogaXRlbSB9KVxuICB9XG5cbiAgY29uc3QgbGlzdCA9IHRoaXMuX3dhdGNoQmxvY2soZnJhZ0Jsb2NrLCBnZXR0ZXIsICdyZXBlYXQnLFxuICAgIChkYXRhKSA9PiB7XG4gICAgICBfLmRlYnVnKCd0aGUgXCJyZXBlYXRcIiBpdGVtIGhhcyBjaGFuZ2VkJywgZGF0YSlcbiAgICAgIGlmICghZnJhZ0Jsb2NrKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCBvbGRDaGlsZHJlbiA9IGNoaWxkcmVuLnNsaWNlKClcbiAgICAgIGNvbnN0IG9sZFZtcyA9IHZtcy5zbGljZSgpXG4gICAgICBjb25zdCBvbGREYXRhID0gZnJhZ0Jsb2NrLmRhdGEuc2xpY2UoKVxuICAgICAgLy8gMS4gY29sbGVjdCBhbGwgbmV3IHJlZnMgdHJhY2sgYnlcbiAgICAgIGNvbnN0IHRyYWNrTWFwID0ge31cbiAgICAgIGNvbnN0IHJldXNlZE1hcCA9IHt9XG4gICAgICBkYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IHRyYWNrQnkgPyBpdGVtW3RyYWNrQnldIDogKG9sZFN0eWxlID8gaXRlbVtrZXlOYW1lXSA6IGluZGV4KVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKGtleSA9PSBudWxsIHx8IGtleSA9PT0gJycpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0cmFja01hcFtrZXldID0gaXRlbVxuICAgICAgfSlcblxuICAgICAgLy8gMi4gcmVtb3ZlIHVudXNlZCBlbGVtZW50IGZvcmVhY2ggb2xkIGl0ZW1cbiAgICAgIGNvbnN0IHJldXNlZExpc3QgPSBbXVxuICAgICAgb2xkRGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBrZXkgPSB0cmFja0J5ID8gaXRlbVt0cmFja0J5XSA6IChvbGRTdHlsZSA/IGl0ZW1ba2V5TmFtZV0gOiBpbmRleClcbiAgICAgICAgaWYgKHRyYWNrTWFwLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICByZXVzZWRNYXBba2V5XSA9IHtcbiAgICAgICAgICAgIGl0ZW0sIGluZGV4LCBrZXksXG4gICAgICAgICAgICB0YXJnZXQ6IG9sZENoaWxkcmVuW2luZGV4XSxcbiAgICAgICAgICAgIHZtOiBvbGRWbXNbaW5kZXhdXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldXNlZExpc3QucHVzaChpdGVtKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3JlbW92ZVRhcmdldChvbGRDaGlsZHJlbltpbmRleF0pXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIC8vIDMuIGNyZWF0ZSBuZXcgZWxlbWVudCBmb3JlYWNoIG5ldyBpdGVtXG4gICAgICBjaGlsZHJlbi5sZW5ndGggPSAwXG4gICAgICB2bXMubGVuZ3RoID0gMFxuICAgICAgZnJhZ0Jsb2NrLmRhdGEgPSBkYXRhLnNsaWNlKClcbiAgICAgIGZyYWdCbG9jay51cGRhdGVNYXJrID0gZnJhZ0Jsb2NrLnN0YXJ0XG5cbiAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3Qga2V5ID0gdHJhY2tCeSA/IGl0ZW1bdHJhY2tCeV0gOiAob2xkU3R5bGUgPyBpdGVtW2tleU5hbWVdIDogaW5kZXgpXG4gICAgICAgIGNvbnN0IHJldXNlZCA9IHJldXNlZE1hcFtrZXldXG4gICAgICAgIGlmIChyZXVzZWQpIHtcbiAgICAgICAgICBpZiAocmV1c2VkLml0ZW0gPT09IHJldXNlZExpc3RbMF0pIHtcbiAgICAgICAgICAgIHJldXNlZExpc3Quc2hpZnQoKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldXNlZExpc3QuJHJlbW92ZShyZXVzZWQuaXRlbSlcbiAgICAgICAgICAgIHRoaXMuX21vdmVUYXJnZXQocmV1c2VkLnRhcmdldCwgZnJhZ0Jsb2NrLnVwZGF0ZU1hcmssIHRydWUpXG4gICAgICAgICAgfVxuICAgICAgICAgIGNoaWxkcmVuLnB1c2gocmV1c2VkLnRhcmdldClcbiAgICAgICAgICB2bXMucHVzaChyZXVzZWQudm0pXG4gICAgICAgICAgcmV1c2VkLnZtW2tleU5hbWVdID0gaW5kZXhcbiAgICAgICAgICBmcmFnQmxvY2sudXBkYXRlTWFyayA9IHJldXNlZC50YXJnZXRcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjb21waWxlSXRlbShpdGVtLCBpbmRleCwgdGhpcylcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgZGVsZXRlIGZyYWdCbG9jay51cGRhdGVNYXJrXG4gICAgfVxuICApXG5cbiAgZnJhZ0Jsb2NrLmRhdGEgPSBsaXN0LnNsaWNlKDApXG4gIGxpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICBjb21waWxlSXRlbShpdGVtLCBpbmRleCwgdGhpcylcbiAgfSlcbn1cblxuLyoqXG4gKiBXYXRjaCB0aGUgZGlzcGxheSB1cGRhdGUgYW5kIGFkZC9yZW1vdmUgdGhlIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSAge29iamVjdH0gZnJhZ0Jsb2NrXG4gKiBAcGFyYW0gIHtvYmplY3R9IGNvbnRleHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9iaW5kU2hvd24gKHRhcmdldCwgZnJhZ0Jsb2NrLCBtZXRhKSB7XG4gIGNvbnN0IGRpc3BsYXkgPSB0aGlzLl93YXRjaEJsb2NrKGZyYWdCbG9jaywgdGFyZ2V0LnNob3duLCAnc2hvd24nLFxuICAgIChkaXNwbGF5KSA9PiB7XG4gICAgICBfLmRlYnVnKCd0aGUgXCJpZlwiIGl0ZW0gd2FzIGNoYW5nZWQnLCBkaXNwbGF5KVxuXG4gICAgICBpZiAoIWZyYWdCbG9jayB8fCAhIWZyYWdCbG9jay5kaXNwbGF5ID09PSAhIWRpc3BsYXkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBmcmFnQmxvY2suZGlzcGxheSA9ICEhZGlzcGxheVxuICAgICAgaWYgKGRpc3BsYXkpIHtcbiAgICAgICAgdGhpcy5fY29tcGlsZSh0YXJnZXQsIGZyYWdCbG9jaywgbWV0YSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9yZW1vdmVCbG9jayhmcmFnQmxvY2ssIHRydWUpXG4gICAgICB9XG4gICAgfVxuICApXG5cbiAgZnJhZ0Jsb2NrLmRpc3BsYXkgPSAhIWRpc3BsYXlcbiAgaWYgKGRpc3BsYXkpIHtcbiAgICB0aGlzLl9jb21waWxlKHRhcmdldCwgZnJhZ0Jsb2NrLCBtZXRhKVxuICB9XG59XG5cbi8qKlxuICogV2F0Y2ggY2FsYyB2YWx1ZSBjaGFuZ2VzIGFuZCBhcHBlbmQgY2VydGFpbiB0eXBlIGFjdGlvbiB0byBkaWZmZXIuXG4gKiBJdCBpcyB1c2VkIGZvciBpZiBvciByZXBlYXQgZGF0YS1iaW5kaW5nIGdlbmVyYXRvci5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9ICAgZnJhZ0Jsb2NrXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gY2FsY1xuICogQHBhcmFtICB7c3RyaW5nfSAgIHR5cGVcbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSBoYW5kbGVyXG4gKiBAcmV0dXJuIHthbnl9ICAgICAgaW5pdCB2YWx1ZSBvZiBjYWxjXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfd2F0Y2hCbG9jayAoZnJhZ0Jsb2NrLCBjYWxjLCB0eXBlLCBoYW5kbGVyKSB7XG4gIGNvbnN0IGRpZmZlciA9IHRoaXMgJiYgdGhpcy5fYXBwICYmIHRoaXMuX2FwcC5kaWZmZXJcbiAgY29uc3QgY29uZmlnID0ge31cbiAgY29uc3QgZGVwdGggPSAoZnJhZ0Jsb2NrLmVsZW1lbnQuZGVwdGggfHwgMCkgKyAxXG5cbiAgcmV0dXJuIHRoaXMuX3dhdGNoKGNhbGMsICh2YWx1ZSkgPT4ge1xuICAgIGNvbmZpZy5sYXRlc3RWYWx1ZSA9IHZhbHVlXG4gICAgaWYgKGRpZmZlciAmJiAhY29uZmlnLnJlY29yZGVkKSB7XG4gICAgICBkaWZmZXIuYXBwZW5kKHR5cGUsIGRlcHRoLCBmcmFnQmxvY2suYmxvY2tJZCwgKCkgPT4ge1xuICAgICAgICBjb25zdCBsYXRlc3RWYWx1ZSA9IGNvbmZpZy5sYXRlc3RWYWx1ZVxuICAgICAgICBoYW5kbGVyKGxhdGVzdFZhbHVlKVxuICAgICAgICBjb25maWcucmVjb3JkZWQgPSBmYWxzZVxuICAgICAgICBjb25maWcubGF0ZXN0VmFsdWUgPSB1bmRlZmluZWRcbiAgICAgIH0pXG4gICAgfVxuICAgIGNvbmZpZy5yZWNvcmRlZCA9IHRydWVcbiAgfSlcbn1cblxuLyoqXG4gKiBDbG9uZSBhIGNvbnRleHQgYW5kIG1lcmdlIGNlcnRhaW4gZGF0YS5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IG1lcmdlZERhdGFcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9tZXJnZUNvbnRleHQgKG1lcmdlZERhdGEpIHtcbiAgY29uc3QgY29udGV4dCA9IE9iamVjdC5jcmVhdGUodGhpcylcbiAgY29udGV4dC5fZGF0YSA9IG1lcmdlZERhdGFcbiAgY29udGV4dC5faW5pdERhdGEoKVxuICBjb250ZXh0Ll9pbml0Q29tcHV0ZWQoKVxuICBjb250ZXh0Ll9yZWFsUGFyZW50ID0gdGhpc1xuICByZXR1cm4gY29udGV4dFxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9odG1sNS9kZWZhdWx0L3ZtL2NvbXBpbGVyLmpzXG4gKiovIiwiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3XG4gKiBEaXJlY3RpdmUgUGFyc2VyXG4gKi9cblxuaW1wb3J0ICogYXMgXyBmcm9tICcuLi91dGlsJ1xuXG5pbXBvcnQgV2F0Y2hlciBmcm9tICcuLi9jb3JlL3dhdGNoZXInXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZydcblxuY29uc3QgeyBuYXRpdmVDb21wb25lbnRNYXAgfSA9IGNvbmZpZ1xuXG5jb25zdCBTRVRURVJTID0ge1xuICBhdHRyOiAnc2V0QXR0cicsXG4gIHN0eWxlOiAnc2V0U3R5bGUnLFxuICBldmVudDogJ2FkZEV2ZW50J1xufVxuXG4vKipcbiAqIGFwcGx5IHRoZSBuYXRpdmUgY29tcG9uZW50J3Mgb3B0aW9ucyhzcGVjaWZpZWQgYnkgdGVtcGxhdGUudHlwZSlcbiAqIHRvIHRoZSB0ZW1wbGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2FwcGx5TmFpdHZlQ29tcG9uZW50T3B0aW9ucyAodGVtcGxhdGUpIHtcbiAgY29uc3QgeyB0eXBlIH0gPSB0ZW1wbGF0ZVxuICBjb25zdCBvcHRpb25zID0gbmF0aXZlQ29tcG9uZW50TWFwW3R5cGVdXG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnb2JqZWN0Jykge1xuICAgIGZvciAoY29uc3Qga2V5IGluIG9wdGlvbnMpIHtcbiAgICAgIGlmICh0ZW1wbGF0ZVtrZXldID09IG51bGwpIHtcbiAgICAgICAgdGVtcGxhdGVba2V5XSA9IG9wdGlvbnNba2V5XVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoXy50eXBvZih0ZW1wbGF0ZVtrZXldKSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgXy50eXBvZihvcHRpb25zW2tleV0pID09PSAnb2JqZWN0Jykge1xuICAgICAgICBmb3IgKGNvbnN0IHN1YmtleSBpbiBvcHRpb25zW2tleV0pIHtcbiAgICAgICAgICBpZiAodGVtcGxhdGVba2V5XVtzdWJrZXldID09IG51bGwpIHtcbiAgICAgICAgICAgIHRlbXBsYXRlW2tleV1bc3Via2V5XSA9IG9wdGlvbnNba2V5XVtzdWJrZXldXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogYmluZCBhbGwgaWQsIGF0dHIsIGNsYXNzbmFtZXMsIHN0eWxlLCBldmVudHMgdG8gYW4gZWxlbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2JpbmRFbGVtZW50IChlbCwgdGVtcGxhdGUpIHtcbiAgdGhpcy5fc2V0SWQodGVtcGxhdGUuaWQsIGVsLCB0aGlzKVxuICB0aGlzLl9zZXRBdHRyKGVsLCB0ZW1wbGF0ZS5hdHRyKVxuICB0aGlzLl9zZXRDbGFzcyhlbCwgdGVtcGxhdGUuY2xhc3NMaXN0KVxuICB0aGlzLl9zZXRTdHlsZShlbCwgdGVtcGxhdGUuc3R5bGUpXG4gIHRoaXMuX2JpbmRFdmVudHMoZWwsIHRlbXBsYXRlLmV2ZW50cylcbn1cblxuLyoqXG4gKiBiaW5kIGFsbCBwcm9wcyB0byBzdWIgdm0gYW5kIGJpbmQgYWxsIHN0eWxlLCBldmVudHMgdG8gdGhlIHJvb3QgZWxlbWVudFxuICogb2YgdGhlIHN1YiB2bSBpZiBpdCBkb2Vzbid0IGhhdmUgYSByZXBsYWNlZCBtdWx0aS1ub2RlIGZyYWdtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfYmluZFN1YlZtIChzdWJWbSwgdGVtcGxhdGUsIHJlcGVhdEl0ZW0pIHtcbiAgc3ViVm0gPSBzdWJWbSB8fCB7fVxuICB0ZW1wbGF0ZSA9IHRlbXBsYXRlIHx8IHt9XG5cbiAgY29uc3Qgb3B0aW9ucyA9IHN1YlZtLl9vcHRpb25zIHx8IHt9XG5cbiAgLy8gYmluZCBwcm9wc1xuICBsZXQgcHJvcHMgPSBvcHRpb25zLnByb3BzXG5cbiAgaWYgKEFycmF5LmlzQXJyYXkocHJvcHMpKSB7XG4gICAgcHJvcHMgPSBwcm9wcy5yZWR1Y2UoKHJlc3VsdCwgdmFsdWUpID0+IHtcbiAgICAgIHJlc3VsdFt2YWx1ZV0gPSB0cnVlXG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSwge30pXG4gIH1cblxuICBtZXJnZVByb3BzKHJlcGVhdEl0ZW0sIHByb3BzLCB0aGlzLCBzdWJWbSlcbiAgbWVyZ2VQcm9wcyh0ZW1wbGF0ZS5hdHRyLCBwcm9wcywgdGhpcywgc3ViVm0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfYmluZFN1YlZtQWZ0ZXJJbml0aWFsaXplZCAoc3ViVm0sIHRlbXBsYXRlKSB7XG4gIG1lcmdlQ2xhc3NTdHlsZSh0ZW1wbGF0ZS5jbGFzc0xpc3QsIHRoaXMsIHN1YlZtKVxuICBtZXJnZVN0eWxlKHRlbXBsYXRlLnN0eWxlLCB0aGlzLCBzdWJWbSlcbn1cblxuZnVuY3Rpb24gbWVyZ2VQcm9wcyAodGFyZ2V0LCBwcm9wcywgdm0sIHN1YlZtKSB7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgZm9yIChjb25zdCBrZXkgaW4gdGFyZ2V0KSB7XG4gICAgaWYgKCFwcm9wcyB8fCBwcm9wc1trZXldKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRhcmdldFtrZXldXG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnN0IHJldHVyblZhbHVlID0gdm0uX3dhdGNoKHZhbHVlLCBmdW5jdGlvbiAodikge1xuICAgICAgICAgIHN1YlZtW2tleV0gPSB2XG4gICAgICAgIH0pXG4gICAgICAgIHN1YlZtW2tleV0gPSByZXR1cm5WYWx1ZVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHN1YlZtW2tleV0gPSB2YWx1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtZXJnZVN0eWxlICh0YXJnZXQsIHZtLCBzdWJWbSkge1xuICBmb3IgKGNvbnN0IGtleSBpbiB0YXJnZXQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRhcmdldFtrZXldXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3QgcmV0dXJuVmFsdWUgPSB2bS5fd2F0Y2godmFsdWUsIGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIGlmIChzdWJWbS5fcm9vdEVsKSB7XG4gICAgICAgICAgc3ViVm0uX3Jvb3RFbC5zZXRTdHlsZShrZXksIHYpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBzdWJWbS5fcm9vdEVsLnNldFN0eWxlKGtleSwgcmV0dXJuVmFsdWUpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaWYgKHN1YlZtLl9yb290RWwpIHtcbiAgICAgICAgc3ViVm0uX3Jvb3RFbC5zZXRTdHlsZShrZXksIHZhbHVlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtZXJnZUNsYXNzU3R5bGUgKHRhcmdldCwgdm0sIHN1YlZtKSB7XG4gIGNvbnN0IGNzcyA9IHZtLl9vcHRpb25zICYmIHZtLl9vcHRpb25zLnN0eWxlIHx8IHt9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmICghc3ViVm0uX3Jvb3RFbCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHZtLl93YXRjaCh0YXJnZXQsIHYgPT4ge1xuICAgICAgc2V0Q2xhc3NTdHlsZShzdWJWbS5fcm9vdEVsLCBjc3MsIHYpXG4gICAgfSlcbiAgICBzZXRDbGFzc1N0eWxlKHN1YlZtLl9yb290RWwsIGNzcywgdmFsdWUpXG4gIH1cbiAgZWxzZSBpZiAodGFyZ2V0ICE9IG51bGwpIHtcbiAgICBzZXRDbGFzc1N0eWxlKHN1YlZtLl9yb290RWwsIGNzcywgdGFyZ2V0KVxuICB9XG59XG5cbi8qKlxuICogYmluZCBpZCB0byBhbiBlbGVtZW50XG4gKiBlYWNoIGlkIGlzIHVuaXF1ZSBpbiBhIHdob2xlIHZtXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfc2V0SWQgKGlkLCBlbCwgdm0pIHtcbiAgY29uc3QgbWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG1hcCwge1xuICAgIHZtOiB7XG4gICAgICB2YWx1ZTogdm0sXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfSxcbiAgICBlbDoge1xuICAgICAgZ2V0OiAoKSA9PiBlbCB8fCB2bS5fcm9vdEVsLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH1cbiAgfSlcblxuICBpZiAodHlwZW9mIGlkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3QgaGFuZGxlciA9IGlkXG4gICAgaWQgPSBoYW5kbGVyLmNhbGwodGhpcylcbiAgICBpZiAoaWQpIHtcbiAgICAgIHRoaXMuX2lkc1tpZF0gPSBtYXBcbiAgICB9XG4gICAgdGhpcy5fd2F0Y2goaGFuZGxlciwgKG5ld0lkKSA9PiB7XG4gICAgICBpZiAobmV3SWQpIHtcbiAgICAgICAgdGhpcy5faWRzW25ld0lkXSA9IG1hcFxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgZWxzZSBpZiAoaWQgJiYgdHlwZW9mIGlkID09PSAnc3RyaW5nJykge1xuICAgIHRoaXMuX2lkc1tpZF0gPSBtYXBcbiAgfVxufVxuXG4vKipcbiAqIGJpbmQgYXR0ciB0byBhbiBlbGVtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfc2V0QXR0ciAoZWwsIGF0dHIpIHtcbiAgdGhpcy5fYmluZERpcihlbCwgJ2F0dHInLCBhdHRyKVxufVxuXG5mdW5jdGlvbiBzZXRDbGFzc1N0eWxlIChlbCwgY3NzLCBjbGFzc0xpc3QpIHtcbiAgY29uc3QgY2xhc3NTdHlsZSA9IHt9XG4gIGNvbnN0IGxlbmd0aCA9IGNsYXNzTGlzdC5sZW5ndGhcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgc3R5bGUgPSBjc3NbY2xhc3NMaXN0W2ldXVxuICAgIGlmIChzdHlsZSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gc3R5bGUpIHtcbiAgICAgICAgY2xhc3NTdHlsZVtrZXldID0gc3R5bGVba2V5XVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBlbC5zZXRDbGFzc1N0eWxlKGNsYXNzU3R5bGUpXG59XG5cbi8qKlxuICogYmluZCBjbGFzc25hbWVzIHRvIGFuIGVsZW1lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9zZXRDbGFzcyAoZWwsIGNsYXNzTGlzdCkge1xuICBpZiAodHlwZW9mIGNsYXNzTGlzdCAhPT0gJ2Z1bmN0aW9uJyAmJiAhQXJyYXkuaXNBcnJheShjbGFzc0xpc3QpKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkoY2xhc3NMaXN0KSAmJiAhY2xhc3NMaXN0Lmxlbmd0aCkge1xuICAgIGVsLnNldENsYXNzU3R5bGUoe30pXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBzdHlsZSA9IHRoaXMuX29wdGlvbnMgJiYgdGhpcy5fb3B0aW9ucy5zdHlsZSB8fCB7fVxuICBpZiAodHlwZW9mIGNsYXNzTGlzdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fd2F0Y2goY2xhc3NMaXN0LCB2ID0+IHtcbiAgICAgIHNldENsYXNzU3R5bGUoZWwsIHN0eWxlLCB2KVxuICAgIH0pXG4gICAgc2V0Q2xhc3NTdHlsZShlbCwgc3R5bGUsIHZhbHVlKVxuICB9XG4gIGVsc2Uge1xuICAgIHNldENsYXNzU3R5bGUoZWwsIHN0eWxlLCBjbGFzc0xpc3QpXG4gIH1cbn1cblxuLyoqXG4gKiBiaW5kIHN0eWxlIHRvIGFuIGVsZW1lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9zZXRTdHlsZSAoZWwsIHN0eWxlKSB7XG4gIHRoaXMuX2JpbmREaXIoZWwsICdzdHlsZScsIHN0eWxlKVxufVxuXG4vKipcbiAqIGFkZCBhbiBldmVudCB0eXBlIGFuZCBoYW5kbGVyIHRvIGFuIGVsZW1lbnQgYW5kIGdlbmVyYXRlIGEgZG9tIHVwZGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX3NldEV2ZW50IChlbCwgdHlwZSwgaGFuZGxlcikge1xuICBlbC5hZGRFdmVudCh0eXBlLCBfLmJpbmQoaGFuZGxlciwgdGhpcykpXG59XG5cbi8qKlxuICogYWRkIGFsbCBldmVudHMgb2YgYW4gZWxlbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2JpbmRFdmVudHMgKGVsLCBldmVudHMpIHtcbiAgaWYgKCFldmVudHMpIHtcbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKVxuICBsZXQgaSA9IGtleXMubGVuZ3RoXG4gIHdoaWxlIChpLS0pIHtcbiAgICBjb25zdCBrZXkgPSBrZXlzW2ldXG4gICAgbGV0IGhhbmRsZXIgPSBldmVudHNba2V5XVxuICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGhhbmRsZXIgPSB0aGlzW2hhbmRsZXJdXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmICghaGFuZGxlcikge1xuICAgICAgICBfLmVycm9yKGBUaGUgbWV0aG9kIFwiJHtoYW5kbGVyfVwiIGlzIG5vdCBkZWZpbmVkLmApXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX3NldEV2ZW50KGVsLCBrZXksIGhhbmRsZXIpXG4gIH1cbn1cblxuLyoqXG4gKiBzZXQgYSBzZXJpZXMgb2YgbWVtYmVycyBhcyBhIGtpbmQgb2YgYW4gZWxlbWVudFxuICogZm9yIGV4YW1wbGU6IHN0eWxlLCBhdHRyLCAuLi5cbiAqIGlmIHRoZSB2YWx1ZSBpcyBhIGZ1bmN0aW9uIHRoZW4gYmluZCB0aGUgZGF0YSBjaGFuZ2VzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfYmluZERpciAoZWwsIG5hbWUsIGRhdGEpIHtcbiAgaWYgKCFkYXRhKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGRhdGEpXG4gIGxldCBpID0ga2V5cy5sZW5ndGhcbiAgd2hpbGUgKGktLSkge1xuICAgIGNvbnN0IGtleSA9IGtleXNbaV1cbiAgICBjb25zdCB2YWx1ZSA9IGRhdGFba2V5XVxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuX2JpbmRLZXkoZWwsIG5hbWUsIGtleSwgdmFsdWUpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZWxbU0VUVEVSU1tuYW1lXV0oa2V5LCB2YWx1ZSlcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBiaW5kIGRhdGEgY2hhbmdlcyB0byBhIGNlcnRhaW4ga2V5IHRvIGEgbmFtZSBzZXJpZXMgaW4gYW4gZWxlbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2JpbmRLZXkgKGVsLCBuYW1lLCBrZXksIGNhbGMpIHtcbiAgY29uc3QgbWV0aG9kTmFtZSA9IFNFVFRFUlNbbmFtZV1cbiAgLy8gd2F0Y2ggdGhlIGNhbGMsIGFuZCByZXR1cm5zIGEgdmFsdWUgYnkgY2FsYy5jYWxsKClcbiAgY29uc3QgdmFsdWUgPSB0aGlzLl93YXRjaChjYWxjLCAodmFsdWUpID0+IHtcbiAgICBmdW5jdGlvbiBoYW5kbGVyICgpIHtcbiAgICAgIGVsW21ldGhvZE5hbWVdKGtleSwgdmFsdWUpXG4gICAgfVxuICAgIGNvbnN0IGRpZmZlciA9IHRoaXMgJiYgdGhpcy5fYXBwICYmIHRoaXMuX2FwcC5kaWZmZXJcbiAgICBpZiAoZGlmZmVyKSB7XG4gICAgICBkaWZmZXIuYXBwZW5kKCdlbGVtZW50JywgZWwuZGVwdGgsIGVsLnJlZiwgaGFuZGxlcilcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBoYW5kbGVyKClcbiAgICB9XG4gIH0pXG5cbiAgZWxbbWV0aG9kTmFtZV0oa2V5LCB2YWx1ZSlcbn1cblxuLyoqXG4gKiB3YXRjaCBhIGNhbGMgZnVuY3Rpb24gYW5kIGNhbGxiYWNrIGlmIHRoZSBjYWxjIHZhbHVlIGNoYW5nZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF93YXRjaCAoY2FsYywgY2FsbGJhY2spIHtcbiAgY29uc3Qgd2F0Y2hlciA9IG5ldyBXYXRjaGVyKHRoaXMsIGNhbGMsIGZ1bmN0aW9uICh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JyAmJiB2YWx1ZSA9PT0gb2xkVmFsdWUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjYWxsYmFjayh2YWx1ZSlcbiAgfSlcblxuICByZXR1cm4gd2F0Y2hlci52YWx1ZVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9odG1sNS9kZWZhdWx0L3ZtL2RpcmVjdGl2ZS5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlldyBEb2N1bWVudCAmIEVsZW1lbnQgSGVscGVycy5cbiAqXG4gKiByZXF1aXJlZDpcbiAqIERvY3VtZW50IzogY3JlYXRlRWxlbWVudCwgY3JlYXRlQ29tbWVudCwgZ2V0UmVmXG4gKiBFbGVtZW50IzogYXBwZW5kQ2hpbGQsIGluc2VydEJlZm9yZSwgcmVtb3ZlQ2hpbGQsIG5leHRTaWJsaW5nXG4gKi9cblxuLyoqXG4gKiBDcmVhdGUgYSBib2R5IGJ5IHR5cGVcbiAqIFVzaW5nIHRoaXMuX2FwcC5kb2NcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHR5cGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVCb2R5ICh0eXBlKSB7XG4gIGNvbnN0IGRvYyA9IHRoaXMuX2FwcC5kb2NcbiAgcmV0dXJuIGRvYy5jcmVhdGVCb2R5KHR5cGUpXG59XG5cbi8qKlxuICogQ3JlYXRlIGFuIGVsZW1lbnQgYnkgdHlwZVxuICogVXNpbmcgdGhpcy5fYXBwLmRvY1xuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gdHlwZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZUVsZW1lbnQgKHR5cGUpIHtcbiAgY29uc3QgZG9jID0gdGhpcy5fYXBwLmRvY1xuICByZXR1cm4gZG9jLmNyZWF0ZUVsZW1lbnQodHlwZSlcbn1cblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBhIGZyYWcgYmxvY2sgZm9yIGFuIGVsZW1lbnQuXG4gKiBUaGUgZnJhZyBibG9jayBoYXMgYSBzdGFydGVyLCBlbmRlciBhbmQgdGhlIGVsZW1lbnQgaXRzZWxmLlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gZWxlbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZUJsb2NrIChlbGVtZW50KSB7XG4gIGNvbnN0IHN0YXJ0ID0gdGhpcy5fY3JlYXRlQmxvY2tTdGFydCgpXG4gIGNvbnN0IGVuZCA9IHRoaXMuX2NyZWF0ZUJsb2NrRW5kKClcbiAgY29uc3QgYmxvY2tJZCA9IGxhc3Rlc3RCbG9ja0lkKytcbiAgaWYgKGVsZW1lbnQuZWxlbWVudCkge1xuICAgIGVsZW1lbnQuZWxlbWVudC5pbnNlcnRCZWZvcmUoc3RhcnQsIGVsZW1lbnQuZW5kKVxuICAgIGVsZW1lbnQuZWxlbWVudC5pbnNlcnRCZWZvcmUoZW5kLCBlbGVtZW50LmVuZClcbiAgICBlbGVtZW50ID0gZWxlbWVudC5lbGVtZW50XG4gIH1cbiAgZWxzZSB7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChzdGFydClcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGVuZClcbiAgfVxuICByZXR1cm4geyBzdGFydCwgZW5kLCBlbGVtZW50LCBibG9ja0lkIH1cbn1cblxubGV0IGxhc3Rlc3RCbG9ja0lkID0gMVxuXG4vKipcbiAqIENyZWF0ZSBhbmQgcmV0dXJuIGEgYmxvY2sgc3RhcnRlci5cbiAqIFVzaW5nIHRoaXMuX2FwcC5kb2NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVCbG9ja1N0YXJ0ICgpIHtcbiAgY29uc3QgZG9jID0gdGhpcy5fYXBwLmRvY1xuICBjb25zdCBhbmNob3IgPSBkb2MuY3JlYXRlQ29tbWVudCgnc3RhcnQnKVxuICByZXR1cm4gYW5jaG9yXG59XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gYSBibG9jayBlbmRlci5cbiAqIFVzaW5nIHRoaXMuX2FwcC5kb2NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVCbG9ja0VuZCAoKSB7XG4gIGNvbnN0IGRvYyA9IHRoaXMuX2FwcC5kb2NcbiAgY29uc3QgYW5jaG9yID0gZG9jLmNyZWF0ZUNvbW1lbnQoJ2VuZCcpXG4gIHJldHVybiBhbmNob3Jcbn1cblxuLyoqXG4gKiBBdHRhY2ggdGFyZ2V0IHRvIGEgY2VydGFpbiBkZXN0IHVzaW5nIGFwcGVuZENoaWxkIGJ5IGRlZmF1bHQuXG4gKiBJZiB0aGUgZGVzdCBpcyBhIGZyYWcgYmxvY2sgdGhlbiBpbnNlcnQgYmVmb3JlIHRoZSBlbmRlci5cbiAqIElmIHRoZSB0YXJnZXQgaXMgYSBmcmFnIGJsb2NrIHRoZW4gYXR0YWNoIHRoZSBzdGFydGVyIGFuZCBlbmRlciBpbiBvcmRlci5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IHRhcmdldFxuICogQHBhcmFtICB7b2JqZWN0fSBkZXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfYXR0YWNoVGFyZ2V0ICh0YXJnZXQsIGRlc3QpIHtcbiAgaWYgKGRlc3QuZWxlbWVudCkge1xuICAgIGNvbnN0IGJlZm9yZSA9IGRlc3QuZW5kXG4gICAgY29uc3QgYWZ0ZXIgPSBkZXN0LnVwZGF0ZU1hcmtcbiAgICAvLyBwdXNoIG5ldyB0YXJnZXQgZm9yIHdhdGNoIGxpc3QgdXBkYXRlIGxhdGVyXG4gICAgaWYgKGRlc3QuY2hpbGRyZW4pIHtcbiAgICAgIGRlc3QuY2hpbGRyZW4ucHVzaCh0YXJnZXQpXG4gICAgfVxuICAgIC8vIGZvciBjaGVjayByZXBlYXQgY2FzZVxuICAgIGlmIChhZnRlcikge1xuICAgICAgY29uc3Qgc2lnbmFsID0gdGhpcy5fbW92ZVRhcmdldCh0YXJnZXQsIGFmdGVyKVxuICAgICAgZGVzdC51cGRhdGVNYXJrID0gdGFyZ2V0LmVsZW1lbnQgPyB0YXJnZXQuZW5kIDogdGFyZ2V0XG4gICAgICByZXR1cm4gc2lnbmFsXG4gICAgfVxuICAgIGVsc2UgaWYgKHRhcmdldC5lbGVtZW50KSB7XG4gICAgICBkZXN0LmVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRhcmdldC5zdGFydCwgYmVmb3JlKVxuICAgICAgZGVzdC5lbGVtZW50Lmluc2VydEJlZm9yZSh0YXJnZXQuZW5kLCBiZWZvcmUpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIGRlc3QuZWxlbWVudC5pbnNlcnRCZWZvcmUodGFyZ2V0LCBiZWZvcmUpXG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIGlmICh0YXJnZXQuZWxlbWVudCkge1xuICAgICAgZGVzdC5hcHBlbmRDaGlsZCh0YXJnZXQuc3RhcnQpXG4gICAgICBkZXN0LmFwcGVuZENoaWxkKHRhcmdldC5lbmQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIGRlc3QuYXBwZW5kQ2hpbGQodGFyZ2V0KVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIE1vdmUgdGFyZ2V0IGJlZm9yZSBhIGNlcnRhaW4gZWxlbWVudC4gVGhlIHRhcmdldCBtYXliZSBibG9jayBvciBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0gIHtvYmplY3R9IGJlZm9yZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX21vdmVUYXJnZXQgKHRhcmdldCwgYWZ0ZXIpIHtcbiAgaWYgKHRhcmdldC5lbGVtZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuX21vdmVCbG9jayh0YXJnZXQsIGFmdGVyKVxuICB9XG4gIHJldHVybiB0aGlzLl9tb3ZlRWxlbWVudCh0YXJnZXQsIGFmdGVyKVxufVxuXG4vKipcbiAqIE1vdmUgZWxlbWVudCBiZWZvcmUgYSBjZXJ0YWluIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSBlbGVtZW50XG4gKiBAcGFyYW0gIHtvYmplY3R9IGJlZm9yZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX21vdmVFbGVtZW50IChlbGVtZW50LCBhZnRlcikge1xuICBjb25zdCBwYXJlbnQgPSBhZnRlci5wYXJlbnROb2RlXG4gIGlmIChwYXJlbnQpIHtcbiAgICByZXR1cm4gcGFyZW50Lmluc2VydEFmdGVyKGVsZW1lbnQsIGFmdGVyKVxuICB9XG59XG5cbi8qKlxuICogTW92ZSBhbGwgZWxlbWVudHMgb2YgdGhlIGJsb2NrIGJlZm9yZSBhIGNlcnRhaW4gZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IGZyYWdCbG9ja1xuICogQHBhcmFtICB7b2JqZWN0fSBiZWZvcmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9tb3ZlQmxvY2sgKGZyYWdCbG9jaywgYWZ0ZXIpIHtcbiAgY29uc3QgcGFyZW50ID0gYWZ0ZXIucGFyZW50Tm9kZVxuXG4gIGlmIChwYXJlbnQpIHtcbiAgICBsZXQgZWwgPSBmcmFnQmxvY2suc3RhcnRcbiAgICBsZXQgc2lnbmFsXG4gICAgY29uc3QgZ3JvdXAgPSBbZWxdXG5cbiAgICB3aGlsZSAoZWwgJiYgZWwgIT09IGZyYWdCbG9jay5lbmQpIHtcbiAgICAgIGVsID0gZWwubmV4dFNpYmxpbmdcbiAgICAgIGdyb3VwLnB1c2goZWwpXG4gICAgfVxuXG4gICAgbGV0IHRlbXAgPSBhZnRlclxuICAgIGdyb3VwLmV2ZXJ5KChlbCkgPT4ge1xuICAgICAgc2lnbmFsID0gcGFyZW50Lmluc2VydEFmdGVyKGVsLCB0ZW1wKVxuICAgICAgdGVtcCA9IGVsXG4gICAgICByZXR1cm4gc2lnbmFsICE9PSAtMVxuICAgIH0pXG5cbiAgICByZXR1cm4gc2lnbmFsXG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmUgdGFyZ2V0IGZyb20gRE9NIHRyZWUuXG4gKiBJZiB0aGUgdGFyZ2V0IGlzIGEgZnJhZyBibG9jayB0aGVuIGNhbGwgX3JlbW92ZUJsb2NrXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSB0YXJnZXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9yZW1vdmVUYXJnZXQgKHRhcmdldCkge1xuICBpZiAodGFyZ2V0LmVsZW1lbnQpIHtcbiAgICB0aGlzLl9yZW1vdmVCbG9jayh0YXJnZXQpXG4gIH1cbiAgZWxzZSB7XG4gICAgdGhpcy5fcmVtb3ZlRWxlbWVudCh0YXJnZXQpXG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmUgYSBjZXJ0YWluIGVsZW1lbnQuXG4gKiBVc2luZyB0aGlzLl9hcHAuZG9jXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSB0YXJnZXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9yZW1vdmVFbGVtZW50ICh0YXJnZXQpIHtcbiAgY29uc3QgcGFyZW50ID0gdGFyZ2V0LnBhcmVudE5vZGVcblxuICBpZiAocGFyZW50KSB7XG4gICAgcGFyZW50LnJlbW92ZUNoaWxkKHRhcmdldClcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZSBhIGZyYWcgYmxvY2suXG4gKiBUaGUgc2Vjb25kIHBhcmFtIGRlY2lkZXMgd2hldGhlciB0aGUgYmxvY2sgc2VsZiBzaG91bGQgYmUgcmVtb3ZlZCB0b28uXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSAgZnJhZ0Jsb2NrXG4gKiBAcGFyYW0gIHtCb29sZWFufSBwcmVzZXJ2ZUJsb2NrPWZhbHNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfcmVtb3ZlQmxvY2sgKGZyYWdCbG9jaywgcHJlc2VydmVCbG9jayA9IGZhbHNlKSB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGxldCBlbCA9IGZyYWdCbG9jay5zdGFydC5uZXh0U2libGluZ1xuXG4gIHdoaWxlIChlbCAmJiBlbCAhPT0gZnJhZ0Jsb2NrLmVuZCkge1xuICAgIHJlc3VsdC5wdXNoKGVsKVxuICAgIGVsID0gZWwubmV4dFNpYmxpbmdcbiAgfVxuXG4gIGlmICghcHJlc2VydmVCbG9jaykge1xuICAgIHRoaXMuX3JlbW92ZUVsZW1lbnQoZnJhZ0Jsb2NrLnN0YXJ0KVxuICB9XG4gIHJlc3VsdC5mb3JFYWNoKChlbCkgPT4ge1xuICAgIHRoaXMuX3JlbW92ZUVsZW1lbnQoZWwpXG4gIH0pXG4gIGlmICghcHJlc2VydmVCbG9jaykge1xuICAgIHRoaXMuX3JlbW92ZUVsZW1lbnQoZnJhZ0Jsb2NrLmVuZClcbiAgfVxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi93ZWV4L2h0bWw1L2RlZmF1bHQvdm0vZG9tLWhlbHBlci5qc1xuICoqLyIsImZ1bmN0aW9uIEV2dCAodHlwZSwgZGV0YWlsKSB7XG4gIGlmIChkZXRhaWwgaW5zdGFuY2VvZiBFdnQpIHtcbiAgICByZXR1cm4gZGV0YWlsXG4gIH1cblxuICB0aGlzLnRpbWVzdGFtcCA9IERhdGUubm93KClcbiAgdGhpcy5kZXRhaWwgPSBkZXRhaWxcbiAgdGhpcy50eXBlID0gdHlwZVxuXG4gIGxldCBzaG91bGRTdG9wID0gZmFsc2VcbiAgdGhpcy5zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgIHNob3VsZFN0b3AgPSB0cnVlXG4gIH1cbiAgdGhpcy5oYXNTdG9wcGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBzaG91bGRTdG9wXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uICRlbWl0ICh0eXBlLCBkZXRhaWwpIHtcbiAgY29uc3QgZXZlbnRzID0gdGhpcy5fdm1FdmVudHNcbiAgY29uc3QgaGFuZGxlckxpc3QgPSBldmVudHNbdHlwZV1cbiAgaWYgKGhhbmRsZXJMaXN0KSB7XG4gICAgY29uc3QgZXZ0ID0gbmV3IEV2dCh0eXBlLCBkZXRhaWwpXG4gICAgaGFuZGxlckxpc3QuZm9yRWFjaCgoaGFuZGxlcikgPT4ge1xuICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGV2dClcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAkZGlzcGF0Y2ggKHR5cGUsIGRldGFpbCkge1xuICBjb25zdCBldnQgPSBuZXcgRXZ0KHR5cGUsIGRldGFpbClcbiAgdGhpcy4kZW1pdCh0eXBlLCBldnQpXG5cbiAgaWYgKCFldnQuaGFzU3RvcHBlZCgpICYmIHRoaXMuX3BhcmVudCAmJiB0aGlzLl9wYXJlbnQuJGRpc3BhdGNoKSB7XG4gICAgdGhpcy5fcGFyZW50LiRkaXNwYXRjaCh0eXBlLCBldnQpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uICRicm9hZGNhc3QgKHR5cGUsIGRldGFpbCkge1xuICBjb25zdCBldnQgPSBuZXcgRXZ0KHR5cGUsIGRldGFpbClcbiAgdGhpcy4kZW1pdCh0eXBlLCBldnQpXG5cbiAgaWYgKCFldnQuaGFzU3RvcHBlZCgpICYmIHRoaXMuX2NoaWxkcmVuVm1zKSB7XG4gICAgdGhpcy5fY2hpbGRyZW5WbXMuZm9yRWFjaCgoc3ViVm0pID0+IHtcbiAgICAgIHN1YlZtLiRicm9hZGNhc3QodHlwZSwgZXZ0KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uICRvbiAodHlwZSwgaGFuZGxlcikge1xuICBpZiAoIXR5cGUgfHwgdHlwZW9mIGhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCBldmVudHMgPSB0aGlzLl92bUV2ZW50c1xuICBjb25zdCBoYW5kbGVyTGlzdCA9IGV2ZW50c1t0eXBlXSB8fCBbXVxuICBoYW5kbGVyTGlzdC5wdXNoKGhhbmRsZXIpXG4gIGV2ZW50c1t0eXBlXSA9IGhhbmRsZXJMaXN0XG5cbiAgLy8gZml4ZWQgb2xkIHZlcnNpb24gbGlmZWN5Y2xlIGRlc2lnblxuICBpZiAodHlwZSA9PT0gJ2hvb2s6cmVhZHknICYmIHRoaXMuX3JlYWR5KSB7XG4gICAgdGhpcy4kZW1pdCgnaG9vazpyZWFkeScpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uICRvZmYgKHR5cGUsIGhhbmRsZXIpIHtcbiAgaWYgKCF0eXBlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3QgZXZlbnRzID0gdGhpcy5fdm1FdmVudHNcbiAgaWYgKCFoYW5kbGVyKSB7XG4gICAgZGVsZXRlIGV2ZW50c1t0eXBlXVxuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IGhhbmRsZXJMaXN0ID0gZXZlbnRzW3R5cGVdXG4gIGlmICghaGFuZGxlckxpc3QpIHtcbiAgICByZXR1cm5cbiAgfVxuICBoYW5kbGVyTGlzdC4kcmVtb3ZlKGhhbmRsZXIpXG59XG5cbmNvbnN0IExJRkVfQ1lDTEVfVFlQRVMgPSBbJ2luaXQnLCAnY3JlYXRlZCcsICdyZWFkeSddXG5cbmV4cG9ydCBmdW5jdGlvbiBfaW5pdEV2ZW50cyAoZXh0ZXJuYWxFdmVudHMpIHtcbiAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuX29wdGlvbnMgfHwge31cbiAgY29uc3QgZXZlbnRzID0gb3B0aW9ucy5ldmVudHMgfHwge31cbiAgZm9yIChjb25zdCB0eXBlMSBpbiBldmVudHMpIHtcbiAgICB0aGlzLiRvbih0eXBlMSwgZXZlbnRzW3R5cGUxXSlcbiAgfVxuICBmb3IgKGNvbnN0IHR5cGUyIGluIGV4dGVybmFsRXZlbnRzKSB7XG4gICAgdGhpcy4kb24odHlwZTIsIGV4dGVybmFsRXZlbnRzW3R5cGUyXSlcbiAgfVxuICBMSUZFX0NZQ0xFX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICB0aGlzLiRvbihgaG9vazoke3R5cGV9YCwgb3B0aW9uc1t0eXBlXSlcbiAgfSlcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3dlZXgvaHRtbDUvZGVmYXVsdC92bS9ldmVudHMuanNcbiAqKi8iLCJsZXQgbmF0aXZlTW9kdWxlcyA9IHt9XG5cbmZ1bmN0aW9uIGFzc2lnbk1vZHVsZXMgKG1vZHVsZXMsIGlmUmVwbGFjZSkge1xuICBmb3IgKGNvbnN0IG1vZHVsZU5hbWUgaW4gbW9kdWxlcykge1xuICAgIC8vIGluaXQgYG1vZHVsZXNbbW9kdWxlTmFtZV1bXWBcbiAgICBsZXQgbWV0aG9kcyA9IG5hdGl2ZU1vZHVsZXNbbW9kdWxlTmFtZV1cbiAgICBpZiAoIW1ldGhvZHMpIHtcbiAgICAgIG1ldGhvZHMgPSB7fVxuICAgICAgbmF0aXZlTW9kdWxlc1ttb2R1bGVOYW1lXSA9IG1ldGhvZHNcbiAgICB9XG5cbiAgICAvLyBwdXNoIGVhY2ggbm9uLWV4aXN0ZWQgbmV3IG1ldGhvZFxuICAgIG1vZHVsZXNbbW9kdWxlTmFtZV0uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICBpZiAodHlwZW9mIG1ldGhvZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbWV0aG9kID0ge1xuICAgICAgICAgIG5hbWU6IG1ldGhvZFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghbWV0aG9kc1ttZXRob2QubmFtZV0gfHwgaWZSZXBsYWNlKSB7XG4gICAgICAgIG1ldGhvZHNbbWV0aG9kLm5hbWVdID0gbWV0aG9kXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NpZ25BcGlzIChDdG9yLCBhcGlzKSB7XG4gIGNvbnN0IHAgPSBDdG9yLnByb3RvdHlwZVxuXG4gIGZvciAoY29uc3QgYXBpTmFtZSBpbiBhcGlzKSB7XG4gICAgaWYgKCFwLmhhc093blByb3BlcnR5KGFwaU5hbWUpKSB7XG4gICAgICBwW2FwaU5hbWVdID0gYXBpc1thcGlOYW1lXVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJNb2R1bGVzICgpIHtcbiAgbmF0aXZlTW9kdWxlcyA9IHt9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb2R1bGUgKG1vZHVsZU5hbWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU1vZHVsZXNbbW9kdWxlTmFtZV1cbn1cblxuLyoqXG4gKiBAY29udGV4dCBhIGluc3RhbmNlIG9mIEFwcEluc3RhbmNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXF1aXJlTW9kdWxlIChtb2R1bGVOYW1lKSB7XG4gIGNvbnN0IG1ldGhvZHMgPSBuYXRpdmVNb2R1bGVzW21vZHVsZU5hbWVdXG4gIGNvbnN0IHRhcmdldCA9IHt9XG5cbiAgZm9yIChjb25zdCBtZXRob2ROYW1lIGluIG1ldGhvZHMpIHtcbiAgICB0YXJnZXRbbWV0aG9kTmFtZV0gPSAoLi4uYXJncykgPT4gdGhpcy5jYWxsVGFza3Moe1xuICAgICAgbW9kdWxlOiBtb2R1bGVOYW1lLFxuICAgICAgbWV0aG9kOiBtZXRob2ROYW1lLFxuICAgICAgYXJnczogYXJnc1xuICAgIH0pXG4gIH1cblxuICByZXR1cm4gdGFyZ2V0XG59XG5cbi8qKlxuICogQGNvbnRleHQgVm1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTW9kdWxlcyAobW9kdWxlcywgaWZSZXBsYWNlKSB7XG4gIGFzc2lnbk1vZHVsZXMobW9kdWxlcywgaWZSZXBsYWNlKVxufVxuXG4vKipcbiAqIEBjb250ZXh0IFZtXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck1ldGhvZHMgKGFwaXMpIHtcbiAgYXNzaWduQXBpcyh0aGlzLCBhcGlzKVxufVxuXG4vKipcbiAqIEBjb250ZXh0IGEgaW5zdGFuY2Ugb2YgQXBwSW5zdGFuY2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcXVpcmVDb21wb25lbnQgKG5hbWUpIHtcbiAgY29uc3QgeyBjdXN0b21Db21wb25lbnRNYXAgfSA9IHRoaXNcbiAgcmV0dXJuIGN1c3RvbUNvbXBvbmVudE1hcFtuYW1lXVxufVxuXG4vKipcbiAqIEBjb250ZXh0IGEgaW5zdGFuY2Ugb2YgQXBwSW5zdGFuY2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQ29tcG9uZW50IChuYW1lLCBleHBvcnRzKSB7XG4gIGNvbnN0IHsgY3VzdG9tQ29tcG9uZW50TWFwIH0gPSB0aGlzXG5cbiAgaWYgKGN1c3RvbUNvbXBvbmVudE1hcFtuYW1lXSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgZGVmaW5lIGEgY29tcG9uZW50KCR7bmFtZX0pIHRoYXQgYWxyZWFkeSBleGlzdHNgKVxuICB9XG5cbiAgY3VzdG9tQ29tcG9uZW50TWFwW25hbWVdID0gZXhwb3J0c1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9odG1sNS9kZWZhdWx0L2FwcC9yZWdpc3Rlci5qc1xuICoqLyIsImltcG9ydCBzZW12ZXIgZnJvbSAnc2VtdmVyJ1xuaW1wb3J0IHsgaXNQbGFpbk9iamVjdCwgdHlwb2YgfSBmcm9tICcuLi91dGlsJ1xuXG4vKipcbiAqIFtub3JtYWxpemVWZXJzaW9uIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7U3RyaW5nfSBWZXJzaW9uLiBpZTogMSwgMS4wLCAxLjAuMFxuICogQHJldHVybiB7U3RyaW5nfSBWZXJzaW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVWZXJzaW9uICh2KSB7XG4gIGNvbnN0IGlzVmFsaWQgPSBzZW12ZXIudmFsaWQodilcbiAgaWYgKGlzVmFsaWQpIHtcbiAgICByZXR1cm4gdlxuICB9XG5cbiAgdiA9IHR5cGVvZiAodikgPT09ICdzdHJpbmcnID8gdiA6ICcnXG4gIGNvbnN0IHNwbGl0ID0gdi5zcGxpdCgnLicpXG4gIGxldCBpID0gMFxuICBjb25zdCByZXN1bHQgPSBbXVxuXG4gIHdoaWxlIChpIDwgMykge1xuICAgIGNvbnN0IHMgPSB0eXBlb2YgKHNwbGl0W2ldKSA9PT0gJ3N0cmluZycgJiYgc3BsaXRbaV0gPyBzcGxpdFtpXSA6ICcwJ1xuICAgIHJlc3VsdC5wdXNoKHMpXG4gICAgaSsrXG4gIH1cblxuICByZXR1cm4gcmVzdWx0LmpvaW4oJy4nKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RXJyb3IgKGtleSwgdmFsLCBjcml0ZXJpYSkge1xuICBjb25zdCByZXN1bHQgPSB7XG4gICAgaXNEb3duZ3JhZGU6IHRydWUsXG4gICAgZXJyb3JUeXBlOiAxLFxuICAgIGNvZGU6IDEwMDBcbiAgfVxuICBjb25zdCBnZXRNc2cgPSBmdW5jdGlvbiAoa2V5LCB2YWwsIGNyaXRlcmlhKSB7XG4gICAgcmV0dXJuICdEb3duZ3JhZGVbJyArIGtleSArICddIDo6IGRldmljZUluZm8gJ1xuICAgICAgKyB2YWwgKyAnIG1hdGNoZWQgY3JpdGVyaWEgJyArIGNyaXRlcmlhXG4gIH1cbiAgY29uc3QgX2tleSA9IGtleS50b0xvd2VyQ2FzZSgpXG5cbiAgcmVzdWx0LmVycm9yTWVzc2FnZSA9IGdldE1zZyhrZXksIHZhbCwgY3JpdGVyaWEpXG5cbiAgaWYgKF9rZXkuaW5kZXhPZignb3N2ZXJzaW9uJykgPj0gMCkge1xuICAgIHJlc3VsdC5jb2RlID0gMTAwMVxuICB9XG4gIGVsc2UgaWYgKF9rZXkuaW5kZXhPZignYXBwdmVyc2lvbicpID49IDApIHtcbiAgICByZXN1bHQuY29kZSA9IDEwMDJcbiAgfVxuICBlbHNlIGlmIChfa2V5LmluZGV4T2YoJ3dlZXh2ZXJzaW9uJykgPj0gMCkge1xuICAgIHJlc3VsdC5jb2RlID0gMTAwM1xuICB9XG4gIGVsc2UgaWYgKF9rZXkuaW5kZXhPZignZGV2aWNlbW9kZWwnKSA+PSAwKSB7XG4gICAgcmVzdWx0LmNvZGUgPSAxMDA0XG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8qKlxuICogV0VFWCBmcmFtZXdvcmsgaW5wdXQoZGV2aWNlSW5mbylcbiAqIHtcbiAqICAgcGxhdGZvcm06ICdpT1MnIG9yICdhbmRyb2lkJ1xuICogICBvc1ZlcnNpb246ICcxLjAuMCcgb3IgJzEuMCcgb3IgJzEnXG4gKiAgIGFwcFZlcnNpb246ICcxLjAuMCcgb3IgJzEuMCcgb3IgJzEnXG4gKiAgIHdlZXhWZXJzaW9uOiAnMS4wLjAnIG9yICcxLjAnIG9yICcxJ1xuICogICBkRGV2aWNlTW9kZWw6ICdNT0RFTF9OQU1FJ1xuICogfVxuICpcbiAqIGRvd25ncmFkZSBjb25maWcoY29uZmlnKVxuICoge1xuICogICBpb3M6IHtcbiAqICAgICBvc1ZlcnNpb246ICc+MS4wLjAnIG9yICc+PTEuMC4wJyBvciAnPDEuMC4wJyBvciAnPD0xLjAuMCcgb3IgJzEuMC4wJ1xuICogICAgIGFwcFZlcnNpb246ICc+MS4wLjAnIG9yICc+PTEuMC4wJyBvciAnPDEuMC4wJyBvciAnPD0xLjAuMCcgb3IgJzEuMC4wJ1xuICogICAgIHdlZXhWZXJzaW9uOiAnPjEuMC4wJyBvciAnPj0xLjAuMCcgb3IgJzwxLjAuMCcgb3IgJzw9MS4wLjAnIG9yICcxLjAuMCdcbiAqICAgICBkZXZpY2VNb2RlbDogWydtb2RlbEEnLCAnbW9kZWxCJywgLi4uXVxuICogICB9LFxuICogICBhbmRyb2lkOiB7XG4gKiAgICAgb3NWZXJzaW9uOiAnPjEuMC4wJyBvciAnPj0xLjAuMCcgb3IgJzwxLjAuMCcgb3IgJzw9MS4wLjAnIG9yICcxLjAuMCdcbiAqICAgICBhcHBWZXJzaW9uOiAnPjEuMC4wJyBvciAnPj0xLjAuMCcgb3IgJzwxLjAuMCcgb3IgJzw9MS4wLjAnIG9yICcxLjAuMCdcbiAqICAgICB3ZWV4VmVyc2lvbjogJz4xLjAuMCcgb3IgJz49MS4wLjAnIG9yICc8MS4wLjAnIG9yICc8PTEuMC4wJyBvciAnMS4wLjAnXG4gKiAgICAgZGV2aWNlTW9kZWw6IFsnbW9kZWxBJywgJ21vZGVsQicsIC4uLl1cbiAqICAgfVxuICogfVxuICpcbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IGRldmljZUluZm8gV2VleCBTREsgZnJhbWV3b3JrIGlucHV0XG4gKiBAcGFyYW0gIHtvYmplY3R9IGNvbmZpZyAgICAgdXNlciBpbnB1dFxuICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgIHsgaXNEb3duZ3JhZGU6IHRydWUvZmFsc2UsIGVycm9yTWVzc2FnZS4uLiB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjaGVjayAoY29uZmlnLCBkZXZpY2VJbmZvKSB7XG4gIGRldmljZUluZm8gPSBkZXZpY2VJbmZvIHx8IGdsb2JhbC5XWEVudmlyb25tZW50XG4gIGRldmljZUluZm8gPSBpc1BsYWluT2JqZWN0KGRldmljZUluZm8pID8gZGV2aWNlSW5mbyA6IHt9XG5cbiAgbGV0IHJlc3VsdCA9IHtcbiAgICBpc0Rvd25ncmFkZTogZmFsc2UgLy8gZGVmYXV0bCBpcyBwYXNzXG4gIH1cblxuICBpZiAodHlwb2YoY29uZmlnKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGxldCBjdXN0b21Eb3duZ3JhZGUgPSBjb25maWcuY2FsbCh0aGlzLCBkZXZpY2VJbmZvLCB7XG4gICAgICBzZW12ZXI6IHNlbXZlcixcbiAgICAgIG5vcm1hbGl6ZVZlcnNpb246IHRoaXMubm9ybWFsaXplVmVyc2lvblxuICAgIH0pXG5cbiAgICBjdXN0b21Eb3duZ3JhZGUgPSAhIWN1c3RvbURvd25ncmFkZVxuXG4gICAgcmVzdWx0ID0gY3VzdG9tRG93bmdyYWRlID8gdGhpcy5nZXRFcnJvcignY3VzdG9tJywgJycsICdjdXN0b20gcGFyYW1zJykgOiByZXN1bHRcbiAgfVxuICBlbHNlIHtcbiAgICBjb25maWcgPSBpc1BsYWluT2JqZWN0KGNvbmZpZykgPyBjb25maWcgOiB7fVxuXG4gICAgY29uc3QgcGxhdGZvcm0gPSBkZXZpY2VJbmZvLnBsYXRmb3JtIHx8ICd1bmtub3cnXG4gICAgY29uc3QgZFBsYXRmb3JtID0gcGxhdGZvcm0udG9Mb3dlckNhc2UoKVxuICAgIGNvbnN0IGNPYmogPSBjb25maWdbZFBsYXRmb3JtXSB8fCB7fVxuXG4gICAgZm9yIChjb25zdCBpIGluIGRldmljZUluZm8pIHtcbiAgICAgIGNvbnN0IGtleSA9IGlcbiAgICAgIGNvbnN0IGtleUxvd2VyID0ga2V5LnRvTG93ZXJDYXNlKClcbiAgICAgIGNvbnN0IHZhbCA9IGRldmljZUluZm9baV1cbiAgICAgIGNvbnN0IGlzVmVyc2lvbiA9IGtleUxvd2VyLmluZGV4T2YoJ3ZlcnNpb24nKSA+PSAwXG4gICAgICBjb25zdCBpc0RldmljZU1vZGVsID0ga2V5TG93ZXIuaW5kZXhPZignZGV2aWNlbW9kZWwnKSA+PSAwXG4gICAgICBjb25zdCBjcml0ZXJpYSA9IGNPYmpbaV1cblxuICAgICAgaWYgKGNyaXRlcmlhICYmIGlzVmVyc2lvbikge1xuICAgICAgICBjb25zdCBjID0gdGhpcy5ub3JtYWxpemVWZXJzaW9uKGNyaXRlcmlhKVxuICAgICAgICBjb25zdCBkID0gdGhpcy5ub3JtYWxpemVWZXJzaW9uKGRldmljZUluZm9baV0pXG5cbiAgICAgICAgaWYgKHNlbXZlci5zYXRpc2ZpZXMoZCwgYykpIHtcbiAgICAgICAgICByZXN1bHQgPSB0aGlzLmdldEVycm9yKGtleSwgdmFsLCBjcml0ZXJpYSlcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc0RldmljZU1vZGVsKSB7XG4gICAgICAgIGNvbnN0IF9jcml0ZXJpYSA9IHR5cG9mKGNyaXRlcmlhKSA9PT0gJ2FycmF5JyA/IGNyaXRlcmlhIDogW2NyaXRlcmlhXVxuICAgICAgICBpZiAoX2NyaXRlcmlhLmluZGV4T2YodmFsKSA+PSAwKSB7XG4gICAgICAgICAgcmVzdWx0ID0gdGhpcy5nZXRFcnJvcihrZXksIHZhbCwgY3JpdGVyaWEpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3dlZXgvaHRtbDUvZGVmYXVsdC9hcHAvZG93bmdyYWRlLmpzXG4gKiovIiwiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3XG4gKiBpbnN0YW5jZSBjb250cm9scyBmcm9tIG5hdGl2ZVxuICpcbiAqIC0gaW5pdCBidW5kbGVcbiAqIC0gZmlyZSBldmVudFxuICogLSBjYWxsYmFja1xuICogLSBkZXN0cm95XG4gKlxuICogY29ycmVzcG9uZGVkIHdpdGggdGhlIEFQSSBvZiBpbnN0YW5jZSBtYW5hZ2VyIChmcmFtZXdvcmsuanMpXG4gKi9cblxuaW1wb3J0ICogYXMgXyBmcm9tICcuLi91dGlsJ1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQWN0aW9ucyAoKSB7XG4gIHRoaXMuZGlmZmVyLmZsdXNoKClcbiAgY29uc3QgdGFza3MgPSBbXVxuICBpZiAodGhpcy5kb2MgJiYgdGhpcy5kb2MubGlzdGVuZXIgJiYgdGhpcy5kb2MubGlzdGVuZXIudXBkYXRlcy5sZW5ndGgpIHtcbiAgICB0YXNrcy5wdXNoKC4uLnRoaXMuZG9jLmxpc3RlbmVyLnVwZGF0ZXMpXG4gICAgdGhpcy5kb2MubGlzdGVuZXIudXBkYXRlcyA9IFtdXG4gIH1cbiAgaWYgKHRhc2tzLmxlbmd0aCkge1xuICAgIHJldHVybiB0aGlzLmNhbGxUYXNrcyh0YXNrcylcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCAoY29kZSwgZGF0YSkge1xuICBfLmRlYnVnKCdJbnRpYWxpemUgYW4gaW5zdGFuY2Ugd2l0aDpcXG4nLCBjb2RlLCBkYXRhKVxuXG4gIGxldCByZXN1bHRcbiAgLy8gQHNlZTogbGliL2FwcC9idW5kbGUuanNcbiAgY29uc3QgZGVmaW5lID0gXy5iaW5kKHRoaXMuZGVmaW5lLCB0aGlzKVxuICBjb25zdCBib290c3RyYXAgPSAobmFtZSwgY29uZmlnLCBfZGF0YSkgPT4ge1xuICAgIHJlc3VsdCA9IHRoaXMuYm9vdHN0cmFwKG5hbWUsIGNvbmZpZywgX2RhdGEgfHwgZGF0YSlcbiAgICB0aGlzLnVwZGF0ZUFjdGlvbnMoKVxuICAgIHRoaXMuZG9jLmxpc3RlbmVyLmNyZWF0ZUZpbmlzaCgpXG4gICAgXy5kZWJ1ZyhgQWZ0ZXIgaW50aWFsaXplZCBhbiBpbnN0YW5jZSgke3RoaXMuaWR9KWApXG4gIH1cblxuICAvLyBiYWNrd2FyZChyZWdpc3Rlci9yZW5kZXIpXG4gIGNvbnN0IHJlZ2lzdGVyID0gXy5iaW5kKHRoaXMucmVnaXN0ZXIsIHRoaXMpXG4gIGNvbnN0IHJlbmRlciA9IChuYW1lLCBfZGF0YSkgPT4ge1xuICAgIHJlc3VsdCA9IHRoaXMuYm9vdHN0cmFwKG5hbWUsIHt9LCBfZGF0YSlcbiAgfVxuXG4gIGNvbnN0IHJlcXVpcmUgPSBuYW1lID0+IF9kYXRhID0+IHtcbiAgICByZXN1bHQgPSB0aGlzLmJvb3RzdHJhcChuYW1lLCB7fSwgX2RhdGEpXG4gIH1cblxuICBjb25zdCBkb2N1bWVudCA9IHRoaXMuZG9jXG5cbiAgbGV0IGZ1bmN0aW9uQm9keVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKHR5cGVvZiBjb2RlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gYGZ1bmN0aW9uICgpIHsuLi59YCAtPiBgey4uLn1gXG4gICAgLy8gbm90IHZlcnkgc3RyaWN0XG4gICAgZnVuY3Rpb25Cb2R5ID0gY29kZS50b1N0cmluZygpLnN1YnN0cigxMilcbiAgfVxuICBlbHNlIGlmIChjb2RlKSB7XG4gICAgZnVuY3Rpb25Cb2R5ID0gY29kZS50b1N0cmluZygpXG4gIH1cblxuICBjb25zdCB7IFdYRW52aXJvbm1lbnQgfSA9IGdsb2JhbFxuICBpZiAoV1hFbnZpcm9ubWVudCAmJiBXWEVudmlyb25tZW50LnBsYXRmb3JtICE9PSAnV2ViJykge1xuICAgIGNvbnN0IHRpbWVyID0gdGhpcy5yZXF1aXJlTW9kdWxlKCd0aW1lcicpXG4gICAgY29uc3QgdGltZXJBUElzID0ge1xuICAgICAgc2V0VGltZW91dDogKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBhcmdzWzBdKC4uLmFyZ3Muc2xpY2UoMikpXG4gICAgICAgIH1cbiAgICAgICAgdGltZXIuc2V0VGltZW91dChoYW5kbGVyLCBhcmdzWzFdKVxuICAgICAgICByZXR1cm4gdGhpcy51aWQudG9TdHJpbmcoKVxuICAgICAgfSxcbiAgICAgIHNldEludGVydmFsOiAoLi4uYXJncykgPT4ge1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGFyZ3NbMF0oLi4uYXJncy5zbGljZSgyKSlcbiAgICAgICAgfVxuICAgICAgICB0aW1lci5zZXRJbnRlcnZhbChoYW5kbGVyLCBhcmdzWzFdKVxuICAgICAgICByZXR1cm4gdGhpcy51aWQudG9TdHJpbmcoKVxuICAgICAgfSxcbiAgICAgIGNsZWFyVGltZW91dDogKG4pID0+IHtcbiAgICAgICAgdGltZXIuY2xlYXJUaW1lb3V0KG4pXG4gICAgICB9LFxuICAgICAgY2xlYXJJbnRlcnZhbDogKG4pID0+IHtcbiAgICAgICAgdGltZXIuY2xlYXJJbnRlcnZhbChuKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGZuID0gbmV3IEZ1bmN0aW9uKFxuICAgICAgJ2RlZmluZScsXG4gICAgICAncmVxdWlyZScsXG4gICAgICAnZG9jdW1lbnQnLFxuICAgICAgJ2Jvb3RzdHJhcCcsXG4gICAgICAncmVnaXN0ZXInLFxuICAgICAgJ3JlbmRlcicsXG4gICAgICAnX193ZWV4X2RlZmluZV9fJywgLy8gYWxpYXMgZm9yIGRlZmluZVxuICAgICAgJ19fd2VleF9ib290c3RyYXBfXycsIC8vIGFsaWFzIGZvciBib290c3RyYXBcbiAgICAgICdzZXRUaW1lb3V0JyxcbiAgICAgICdzZXRJbnRlcnZhbCcsXG4gICAgICAnY2xlYXJUaW1lb3V0JyxcbiAgICAgICdjbGVhckludGVydmFsJyxcbiAgICAgIGZ1bmN0aW9uQm9keVxuICAgIClcblxuICAgIGZuKFxuICAgICAgZGVmaW5lLFxuICAgICAgcmVxdWlyZSxcbiAgICAgIGRvY3VtZW50LFxuICAgICAgYm9vdHN0cmFwLFxuICAgICAgcmVnaXN0ZXIsXG4gICAgICByZW5kZXIsXG4gICAgICBkZWZpbmUsXG4gICAgICBib290c3RyYXAsXG4gICAgICB0aW1lckFQSXMuc2V0VGltZW91dCxcbiAgICAgIHRpbWVyQVBJcy5zZXRJbnRlcnZhbCxcbiAgICAgIHRpbWVyQVBJcy5jbGVhclRpbWVvdXQsXG4gICAgICB0aW1lckFQSXMuY2xlYXJJbnRlcnZhbClcbiAgfVxuICBlbHNlIHtcbiAgICBjb25zdCBmbiA9IG5ldyBGdW5jdGlvbihcbiAgICAgICdkZWZpbmUnLFxuICAgICAgJ3JlcXVpcmUnLFxuICAgICAgJ2RvY3VtZW50JyxcbiAgICAgICdib290c3RyYXAnLFxuICAgICAgJ3JlZ2lzdGVyJyxcbiAgICAgICdyZW5kZXInLFxuICAgICAgJ19fd2VleF9kZWZpbmVfXycsIC8vIGFsaWFzIGZvciBkZWZpbmVcbiAgICAgICdfX3dlZXhfYm9vdHN0cmFwX18nLCAvLyBhbGlhcyBmb3IgYm9vdHN0cmFwXG4gICAgICBmdW5jdGlvbkJvZHlcbiAgICApXG5cbiAgICBmbihcbiAgICAgIGRlZmluZSxcbiAgICAgIHJlcXVpcmUsXG4gICAgICBkb2N1bWVudCxcbiAgICAgIGJvb3RzdHJhcCxcbiAgICAgIHJlZ2lzdGVyLFxuICAgICAgcmVuZGVyLFxuICAgICAgZGVmaW5lLFxuICAgICAgYm9vdHN0cmFwKVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gIF8uZGVidWcoYERlc3RvcnkgYW4gaW5zdGFuY2UoJHt0aGlzLmlkfSlgKVxuXG4gIHRoaXMuaWQgPSAnJ1xuICB0aGlzLm9wdGlvbnMgPSBudWxsXG4gIHRoaXMuYmxvY2tzID0gbnVsbFxuICB0aGlzLnZtID0gbnVsbFxuICB0aGlzLmRvYyA9IG51bGxcbiAgdGhpcy5jdXN0b21Db21wb25lbnRNYXAgPSBudWxsXG4gIHRoaXMuY2FsbGJhY2tzID0gbnVsbFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um9vdEVsZW1lbnQgKCkge1xuICBjb25zdCBkb2MgPSB0aGlzLmRvYyB8fCB7fVxuICBjb25zdCBib2R5ID0gZG9jLmJvZHkgfHwge31cbiAgcmV0dXJuIGJvZHkudG9KU09OID8gYm9keS50b0pTT04oKSA6IHt9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaXJlRXZlbnQgKHJlZiwgdHlwZSwgZSwgZG9tQ2hhbmdlcykge1xuICBfLmRlYnVnKGBGaXJlIGEgXCIke3R5cGV9XCIgZXZlbnQgb24gYW4gZWxlbWVudCgke3JlZn0pIGluIGluc3RhbmNlKCR7dGhpcy5pZH0pYClcbiAgaWYgKEFycmF5LmlzQXJyYXkocmVmKSkge1xuICAgIHJlZi5zb21lKChyZWYpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmZpcmVFdmVudChyZWYsIHR5cGUsIGUpICE9PSBmYWxzZVxuICAgIH0pXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBlbCA9IHRoaXMuZG9jLmdldFJlZihyZWYpXG5cbiAgaWYgKGVsKSB7XG4gICAgdGhpcy5kb2MuY2xvc2UoKVxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZG9jLmZpcmVFdmVudChlbCwgdHlwZSwgZSwgZG9tQ2hhbmdlcylcbiAgICB0aGlzLnVwZGF0ZUFjdGlvbnMoKVxuICAgIHRoaXMuZG9jLmxpc3RlbmVyLnVwZGF0ZUZpbmlzaCgpXG4gICAgdGhpcy5kb2Mub3BlbigpXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgcmV0dXJuIG5ldyBFcnJvcihgaW52YWxpZCBlbGVtZW50IHJlZmVyZW5jZSBcIiR7cmVmfVwiYClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGxiYWNrIChjYWxsYmFja0lkLCBkYXRhLCBpZktlZXBBbGl2ZSkge1xuICBfLmRlYnVnKGBJbnZva2UgYSBjYWxsYmFjaygke2NhbGxiYWNrSWR9KSB3aXRoYCwgZGF0YSxcbiAgICAgICAgICAgIGBpbiBpbnN0YW5jZSgke3RoaXMuaWR9KWApXG5cbiAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLmNhbGxiYWNrc1tjYWxsYmFja0lkXVxuXG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0aGlzLmRvYy5jbG9zZSgpXG4gICAgY2FsbGJhY2soZGF0YSkgLy8gZGF0YSBpcyBhbHJlYWR5IGEgb2JqZWN0LCBAc2VlOiBsaWIvcnVudGltZS9pbmRleC5qc1xuXG4gICAgaWYgKHR5cGVvZiBpZktlZXBBbGl2ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgaWZLZWVwQWxpdmUgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrc1tjYWxsYmFja0lkXSA9IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlQWN0aW9ucygpXG4gICAgdGhpcy5kb2MubGlzdGVuZXIudXBkYXRlRmluaXNoKClcbiAgICB0aGlzLmRvYy5vcGVuKClcbiAgICByZXR1cm5cbiAgfVxuXG4gIHJldHVybiBuZXcgRXJyb3IoYGludmFsaWQgY2FsbGJhY2sgaWQgXCIke2NhbGxiYWNrSWR9XCJgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVmcmVzaERhdGEgKGRhdGEpIHtcbiAgXy5kZWJ1ZyhgUmVmcmVzaCB3aXRoYCwgZGF0YSxcbiAgICAgICAgICAgIGBpbiBpbnN0YW5jZVske3RoaXMuaWR9XWApXG5cbiAgY29uc3Qgdm0gPSB0aGlzLnZtXG5cbiAgaWYgKHZtICYmIGRhdGEpIHtcbiAgICB0aGlzLmRvYy5jbG9zZSgpXG4gICAgaWYgKHR5cGVvZiB2bS5yZWZyZXNoRGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdm0ucmVmcmVzaERhdGEoZGF0YSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBfLmV4dGVuZCh2bSwgZGF0YSlcbiAgICB9XG4gICAgdGhpcy51cGRhdGVBY3Rpb25zKClcbiAgICB0aGlzLmRvYy5saXN0ZW5lci5yZWZyZXNoRmluaXNoKClcbiAgICB0aGlzLmRvYy5vcGVuKClcbiAgICByZXR1cm5cbiAgfVxuXG4gIHJldHVybiBuZXcgRXJyb3IoYGludmFsaWQgZGF0YSBcIiR7ZGF0YX1cImApXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi93ZWV4L2h0bWw1L2RlZmF1bHQvYXBwL2N0cmwuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBEaWZmZXIge1xuICBjb25zdHJ1Y3RvciAoaWQpIHtcbiAgICB0aGlzLmlkID0gaWRcbiAgICB0aGlzLm1hcCA9IFtdXG4gICAgdGhpcy5ob29rcyA9IFtdXG4gIH1cbiAgaXNFbXB0eSAoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwLmxlbmd0aCA9PT0gMFxuICB9XG4gIGFwcGVuZCAodHlwZSwgZGVwdGgsIHJlZiwgaGFuZGxlcikge1xuICAgIGlmICghdGhpcy5oYXNUaW1lcikge1xuICAgICAgdGhpcy5oYXNUaW1lciA9IHRydWVcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmhhc1RpbWVyID0gZmFsc2VcbiAgICAgICAgdGhpcy5mbHVzaCh0cnVlKVxuICAgICAgfSwgMClcbiAgICB9XG4gICAgY29uc3QgbWFwID0gdGhpcy5tYXBcbiAgICBpZiAoIW1hcFtkZXB0aF0pIHtcbiAgICAgIG1hcFtkZXB0aF0gPSB7fVxuICAgIH1cbiAgICBjb25zdCBncm91cCA9IG1hcFtkZXB0aF1cbiAgICBpZiAoIWdyb3VwW3R5cGVdKSB7XG4gICAgICBncm91cFt0eXBlXSA9IHt9XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAnZWxlbWVudCcpIHtcbiAgICAgIGlmICghZ3JvdXBbdHlwZV1bcmVmXSkge1xuICAgICAgICBncm91cFt0eXBlXVtyZWZdID0gW11cbiAgICAgIH1cbiAgICAgIGdyb3VwW3R5cGVdW3JlZl0ucHVzaChoYW5kbGVyKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGdyb3VwW3R5cGVdW3JlZl0gPSBoYW5kbGVyXG4gICAgfVxuICB9XG4gIGZsdXNoIChpc1RpbWVvdXQpIHtcbiAgICBjb25zdCBtYXAgPSB0aGlzLm1hcC5zbGljZSgpXG4gICAgdGhpcy5tYXAubGVuZ3RoID0gMFxuICAgIG1hcC5mb3JFYWNoKChncm91cCkgPT4ge1xuICAgICAgY2FsbFR5cGVNYXAoZ3JvdXAsICdyZXBlYXQnKVxuICAgICAgY2FsbFR5cGVNYXAoZ3JvdXAsICdzaG93bicpXG4gICAgICBjYWxsVHlwZUxpc3QoZ3JvdXAsICdlbGVtZW50JylcbiAgICB9KVxuXG4gICAgY29uc3QgaG9va3MgPSB0aGlzLmhvb2tzLnNsaWNlKClcbiAgICB0aGlzLmhvb2tzLmxlbmd0aCA9IDBcbiAgICBob29rcy5mb3JFYWNoKChmbikgPT4ge1xuICAgICAgZm4oKVxuICAgIH0pXG5cbiAgICBpZiAoIXRoaXMuaXNFbXB0eSgpKSB7XG4gICAgICB0aGlzLmZsdXNoKClcbiAgICB9XG4gIH1cbiAgdGhlbiAoZm4pIHtcbiAgICB0aGlzLmhvb2tzLnB1c2goZm4pXG4gIH1cbn1cblxuZnVuY3Rpb24gY2FsbFR5cGVNYXAgKGdyb3VwLCB0eXBlKSB7XG4gIGNvbnN0IG1hcCA9IGdyb3VwW3R5cGVdXG4gIGZvciAoY29uc3QgcmVmIGluIG1hcCkge1xuICAgIG1hcFtyZWZdKClcbiAgfVxufVxuXG5mdW5jdGlvbiBjYWxsVHlwZUxpc3QgKGdyb3VwLCB0eXBlKSB7XG4gIGNvbnN0IG1hcCA9IGdyb3VwW3R5cGVdXG4gIGZvciAoY29uc3QgcmVmIGluIG1hcCkge1xuICAgIGNvbnN0IGxpc3QgPSBtYXBbcmVmXVxuICAgIGxpc3QuZm9yRWFjaCgoaGFuZGxlcikgPT4geyBoYW5kbGVyKCkgfSlcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9odG1sNS9kZWZhdWx0L2FwcC9kaWZmZXIuanNcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXdcbiAqIEEgc2ltcGxlIHZpcnR1YWwgZG9tIGltcGxlbWVudGF0aW9uXG4gKi9cblxuaW1wb3J0IExpc3RlbmVyIGZyb20gJy4vbGlzdGVuZXInXG5cbmNvbnN0IERFRkFVTFRfVEFHX05BTUUgPSAnZGl2J1xuXG5leHBvcnQgY29uc3QgaW5zdGFuY2VNYXAgPSB7fVxubGV0IG5leHROb2RlUmVmID0gMVxuXG5leHBvcnQgZnVuY3Rpb24gRG9jdW1lbnQgKGlkLCB1cmwsIGhhbmRsZXIpIHtcbiAgaWQgPSBpZCA/IGlkLnRvU3RyaW5nKCkgOiAnJ1xuICB0aGlzLmlkID0gaWRcbiAgdGhpcy5VUkwgPSB1cmxcblxuICBpbnN0YW5jZU1hcFtpZF0gPSB0aGlzXG4gIHRoaXMubm9kZU1hcCA9IHt9XG4gIHRoaXMubGlzdGVuZXIgPSBuZXcgTGlzdGVuZXIoaWQsIGhhbmRsZXIgfHwgZ2VuQ2FsbFRhc2tzKGlkKSlcbiAgdGhpcy5jcmVhdGVEb2N1bWVudEVsZW1lbnQoKVxufVxuXG5mdW5jdGlvbiBnZW5DYWxsVGFza3MgKGlkKSB7XG4gIHJldHVybiAodGFza3MpID0+IHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGFza3MpKSB7XG4gICAgICB0YXNrcyA9IFt0YXNrc11cbiAgICB9XG4gICAgcmV0dXJuIGNhbGxOYXRpdmUoaWQsIHRhc2tzLCAnLTEnKVxuICB9XG59XG5cbkRvY3VtZW50LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICBkZWxldGUgdGhpcy5saXN0ZW5lclxuICBkZWxldGUgdGhpcy5ub2RlTWFwXG4gIGRlbGV0ZSBpbnN0YW5jZU1hcFt0aGlzLmlkXVxufVxuXG5Eb2N1bWVudC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5saXN0ZW5lci5iYXRjaGVkID0gZmFsc2Vcbn1cblxuRG9jdW1lbnQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmxpc3RlbmVyLmJhdGNoZWQgPSB0cnVlXG59XG5cbkRvY3VtZW50LnByb3RvdHlwZS5jcmVhdGVEb2N1bWVudEVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghdGhpcy5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICBjb25zdCBlbCA9IG5ldyBFbGVtZW50KCdkb2N1bWVudCcpXG4gICAgZWwuZG9jSWQgPSB0aGlzLmlkXG4gICAgZWwub3duZXJEb2N1bWVudCA9IHRoaXNcbiAgICBlbC5yb2xlID0gJ2RvY3VtZW50RWxlbWVudCdcbiAgICBlbC5kZXB0aCA9IDBcbiAgICBlbC5yZWYgPSAnX2RvY3VtZW50RWxlbWVudCdcbiAgICB0aGlzLm5vZGVNYXAuX2RvY3VtZW50RWxlbWVudCA9IGVsXG4gICAgdGhpcy5kb2N1bWVudEVsZW1lbnQgPSBlbFxuICAgIGVsLmFwcGVuZENoaWxkID0gKG5vZGUpID0+IHtcbiAgICAgIGFwcGVuZEJvZHkodGhpcywgbm9kZSlcbiAgICB9XG4gICAgZWwuaW5zZXJ0QmVmb3JlID0gKG5vZGUsIGJlZm9yZSkgPT4ge1xuICAgICAgYXBwZW5kQm9keSh0aGlzLCBub2RlLCBiZWZvcmUpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXMuZG9jdW1lbnRFbGVtZW50XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEJvZHkgKGRvYywgbm9kZSwgYmVmb3JlKSB7XG4gIGNvbnN0IHsgZG9jdW1lbnRFbGVtZW50IH0gPSBkb2NcblxuICBpZiAoZG9jdW1lbnRFbGVtZW50LnB1cmVDaGlsZHJlbi5sZW5ndGggPiAwIHx8IG5vZGUucGFyZW50Tm9kZSkge1xuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IGNoaWxkcmVuID0gZG9jdW1lbnRFbGVtZW50LmNoaWxkcmVuXG4gIGNvbnN0IGJlZm9yZUluZGV4ID0gY2hpbGRyZW4uaW5kZXhPZihiZWZvcmUpXG4gIGlmIChiZWZvcmVJbmRleCA8IDApIHtcbiAgICBjaGlsZHJlbi5wdXNoKG5vZGUpXG4gIH1cbiAgZWxzZSB7XG4gICAgY2hpbGRyZW4uc3BsaWNlKGJlZm9yZUluZGV4LCAwLCBub2RlKVxuICB9XG5cbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICBpZiAobm9kZS5yb2xlID09PSAnYm9keScpIHtcbiAgICAgIG5vZGUuZG9jSWQgPSBkb2MuaWRcbiAgICAgIG5vZGUub3duZXJEb2N1bWVudCA9IGRvY1xuICAgICAgbm9kZS5wYXJlbnROb2RlID0gZG9jdW1lbnRFbGVtZW50XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgY2hpbGQucGFyZW50Tm9kZSA9IG5vZGVcbiAgICAgIH0pXG4gICAgICBzZXRCb2R5KGRvYywgbm9kZSlcbiAgICAgIG5vZGUuZG9jSWQgPSBkb2MuaWRcbiAgICAgIG5vZGUub3duZXJEb2N1bWVudCA9IGRvY1xuICAgICAgbGlua1BhcmVudChub2RlLCBkb2N1bWVudEVsZW1lbnQpXG4gICAgICBkZWxldGUgZG9jLm5vZGVNYXBbbm9kZS5ub2RlSWRdXG4gICAgfVxuICAgIGRvY3VtZW50RWxlbWVudC5wdXJlQ2hpbGRyZW4ucHVzaChub2RlKVxuICAgIGRvYy5saXN0ZW5lci5jcmVhdGVCb2R5KG5vZGUpXG4gIH1cbiAgZWxzZSB7XG4gICAgbm9kZS5wYXJlbnROb2RlID0gZG9jdW1lbnRFbGVtZW50XG4gICAgZG9jLm5vZGVNYXBbbm9kZS5yZWZdID0gbm9kZVxuICB9XG59XG5cbmZ1bmN0aW9uIHNldEJvZHkgKGRvYywgZWwpIHtcbiAgZWwucm9sZSA9ICdib2R5J1xuICBlbC5kZXB0aCA9IDFcbiAgZGVsZXRlIGRvYy5ub2RlTWFwW2VsLm5vZGVJZF1cbiAgZWwucmVmID0gJ19yb290J1xuICBkb2Mubm9kZU1hcC5fcm9vdCA9IGVsXG4gIGRvYy5ib2R5ID0gZWxcbn1cblxuRG9jdW1lbnQucHJvdG90eXBlLmNyZWF0ZUJvZHkgPSBmdW5jdGlvbiAodHlwZSwgcHJvcHMpIHtcbiAgaWYgKCF0aGlzLmJvZHkpIHtcbiAgICBjb25zdCBlbCA9IG5ldyBFbGVtZW50KHR5cGUsIHByb3BzKVxuICAgIHNldEJvZHkodGhpcywgZWwpXG4gIH1cblxuICByZXR1cm4gdGhpcy5ib2R5XG59XG5cbkRvY3VtZW50LnByb3RvdHlwZS5jcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gKHRhZ05hbWUsIHByb3BzKSB7XG4gIHJldHVybiBuZXcgRWxlbWVudCh0YWdOYW1lLCBwcm9wcylcbn1cblxuRG9jdW1lbnQucHJvdG90eXBlLmNyZWF0ZUNvbW1lbnQgPSBmdW5jdGlvbiAodGV4dCkge1xuICByZXR1cm4gbmV3IENvbW1lbnQodGV4dClcbn1cblxuRG9jdW1lbnQucHJvdG90eXBlLmZpcmVFdmVudCA9IGZ1bmN0aW9uIChlbCwgdHlwZSwgZSwgZG9tQ2hhbmdlcykge1xuICBpZiAoIWVsKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgZSA9IGUgfHwge31cbiAgZS50eXBlID0gdHlwZVxuICBlLnRhcmdldCA9IGVsXG4gIGUudGltZXN0YW1wID0gRGF0ZS5ub3coKVxuICBpZiAoZG9tQ2hhbmdlcykge1xuICAgIHVwZGF0ZUVsZW1lbnQoZWwsIGRvbUNoYW5nZXMpXG4gIH1cbiAgcmV0dXJuIGVsLmZpcmVFdmVudCh0eXBlLCBlKVxufVxuXG5Eb2N1bWVudC5wcm90b3R5cGUuZ2V0UmVmID0gZnVuY3Rpb24gKHJlZikge1xuICByZXR1cm4gdGhpcy5ub2RlTWFwW3JlZl1cbn1cblxuZnVuY3Rpb24gdXBkYXRlRWxlbWVudCAoZWwsIGNoYW5nZXMpIHtcbiAgY29uc3QgYXR0cnMgPSBjaGFuZ2VzLmF0dHJzIHx8IHt9XG4gIGZvciAoY29uc3QgbmFtZSBpbiBhdHRycykge1xuICAgIGVsLnNldEF0dHIobmFtZSwgYXR0cnNbbmFtZV0sIHRydWUpXG4gIH1cbiAgY29uc3Qgc3R5bGUgPSBjaGFuZ2VzLnN0eWxlIHx8IHt9XG4gIGZvciAoY29uc3QgbmFtZSBpbiBzdHlsZSkge1xuICAgIGVsLnNldFN0eWxlKG5hbWUsIHN0eWxlW25hbWVdLCB0cnVlKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBOb2RlICgpIHtcbiAgdGhpcy5ub2RlSWQgPSAobmV4dE5vZGVSZWYrKykudG9TdHJpbmcoKVxuICB0aGlzLnJlZiA9IHRoaXMubm9kZUlkXG4gIHRoaXMuY2hpbGRyZW4gPSBbXVxuICB0aGlzLnB1cmVDaGlsZHJlbiA9IFtdXG4gIHRoaXMucGFyZW50Tm9kZSA9IG51bGxcbiAgdGhpcy5uZXh0U2libGluZyA9IG51bGxcbiAgdGhpcy5wcmV2aW91c1NpYmxpbmcgPSBudWxsXG59XG5cbk5vZGUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGRvYyA9IGluc3RhbmNlTWFwW3RoaXMuZG9jSWRdXG4gIGlmIChkb2MpIHtcbiAgICBkZWxldGUgdGhpcy5kb2NJZFxuICAgIGRlbGV0ZSBkb2Mubm9kZU1hcFt0aGlzLm5vZGVJZF1cbiAgfVxuICB0aGlzLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgIGNoaWxkLmRlc3Ryb3koKVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gRWxlbWVudCAodHlwZSA9IERFRkFVTFRfVEFHX05BTUUsIHByb3BzKSB7XG4gIHByb3BzID0gcHJvcHMgfHwge31cbiAgdGhpcy5ub2RlVHlwZSA9IDFcbiAgdGhpcy5ub2RlSWQgPSAobmV4dE5vZGVSZWYrKykudG9TdHJpbmcoKVxuICB0aGlzLnJlZiA9IHRoaXMubm9kZUlkXG4gIHRoaXMudHlwZSA9IHR5cGVcbiAgdGhpcy5hdHRyID0gcHJvcHMuYXR0ciB8fCB7fVxuICB0aGlzLmNsYXNzU3R5bGUgPSBwcm9wcy5jbGFzc1N0eWxlIHx8IHt9XG4gIHRoaXMuc3R5bGUgPSBwcm9wcy5zdHlsZSB8fCB7fVxuICB0aGlzLmV2ZW50ID0ge31cbiAgdGhpcy5jaGlsZHJlbiA9IFtdXG4gIHRoaXMucHVyZUNoaWxkcmVuID0gW11cbn1cblxuRWxlbWVudC5wcm90b3R5cGUgPSBuZXcgTm9kZSgpXG5cbkVsZW1lbnQucHJvdG90eXBlLmFwcGVuZENoaWxkID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgaWYgKG5vZGUucGFyZW50Tm9kZSAmJiBub2RlLnBhcmVudE5vZGUgIT09IHRoaXMpIHtcbiAgICByZXR1cm5cbiAgfVxuICBpZiAoIW5vZGUucGFyZW50Tm9kZSkge1xuICAgIGxpbmtQYXJlbnQobm9kZSwgdGhpcylcbiAgICBpbnNlcnRJbmRleChub2RlLCB0aGlzLmNoaWxkcmVuLCB0aGlzLmNoaWxkcmVuLmxlbmd0aCwgdHJ1ZSlcbiAgICBpZiAodGhpcy5kb2NJZCkge1xuICAgICAgcmVnaXN0ZXJOb2RlKHRoaXMuZG9jSWQsIG5vZGUpXG4gICAgfVxuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgICBpbnNlcnRJbmRleChub2RlLCB0aGlzLnB1cmVDaGlsZHJlbiwgdGhpcy5wdXJlQ2hpbGRyZW4ubGVuZ3RoKVxuICAgICAgaWYgKHRoaXMuZG9jSWQpIHtcbiAgICAgICAgY29uc3QgbGlzdGVuZXIgPSBpbnN0YW5jZU1hcFt0aGlzLmRvY0lkXS5saXN0ZW5lclxuICAgICAgICByZXR1cm4gbGlzdGVuZXIuYWRkRWxlbWVudChub2RlLCB0aGlzLnJlZiwgLTEpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIG1vdmVJbmRleChub2RlLCB0aGlzLmNoaWxkcmVuLCB0aGlzLmNoaWxkcmVuLmxlbmd0aCwgdHJ1ZSlcbiAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgY29uc3QgaW5kZXggPSBtb3ZlSW5kZXgobm9kZSwgdGhpcy5wdXJlQ2hpbGRyZW4sIHRoaXMucHVyZUNoaWxkcmVuLmxlbmd0aClcbiAgICAgIGlmICh0aGlzLmRvY0lkICYmIGluZGV4ID49IDApIHtcbiAgICAgICAgY29uc3QgbGlzdGVuZXIgPSBpbnN0YW5jZU1hcFt0aGlzLmRvY0lkXS5saXN0ZW5lclxuICAgICAgICByZXR1cm4gbGlzdGVuZXIubW92ZUVsZW1lbnQobm9kZS5yZWYsIHRoaXMucmVmLCBpbmRleClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUuaW5zZXJ0QmVmb3JlID0gZnVuY3Rpb24gKG5vZGUsIGJlZm9yZSkge1xuICBpZiAobm9kZS5wYXJlbnROb2RlICYmIG5vZGUucGFyZW50Tm9kZSAhPT0gdGhpcykge1xuICAgIHJldHVyblxuICB9XG4gIGlmIChub2RlID09PSBiZWZvcmUgfHwgbm9kZS5uZXh0U2libGluZyA9PT0gYmVmb3JlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKCFub2RlLnBhcmVudE5vZGUpIHtcbiAgICBsaW5rUGFyZW50KG5vZGUsIHRoaXMpXG4gICAgaW5zZXJ0SW5kZXgobm9kZSwgdGhpcy5jaGlsZHJlbiwgdGhpcy5jaGlsZHJlbi5pbmRleE9mKGJlZm9yZSksIHRydWUpXG4gICAgaWYgKHRoaXMuZG9jSWQpIHtcbiAgICAgIHJlZ2lzdGVyTm9kZSh0aGlzLmRvY0lkLCBub2RlKVxuICAgIH1cbiAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgY29uc3QgcHVyZUJlZm9yZSA9IG5leHRFbGVtZW50KGJlZm9yZSlcbiAgICAgIGNvbnN0IGluZGV4ID0gaW5zZXJ0SW5kZXgoXG4gICAgICAgIG5vZGUsXG4gICAgICAgIHRoaXMucHVyZUNoaWxkcmVuLFxuICAgICAgICBwdXJlQmVmb3JlXG4gICAgICAgICAgPyB0aGlzLnB1cmVDaGlsZHJlbi5pbmRleE9mKHB1cmVCZWZvcmUpXG4gICAgICAgICAgOiB0aGlzLnB1cmVDaGlsZHJlbi5sZW5ndGhcbiAgICAgIClcbiAgICAgIGlmICh0aGlzLmRvY0lkKSB7XG4gICAgICAgIGNvbnN0IGxpc3RlbmVyID0gaW5zdGFuY2VNYXBbdGhpcy5kb2NJZF0ubGlzdGVuZXJcbiAgICAgICAgcmV0dXJuIGxpc3RlbmVyLmFkZEVsZW1lbnQobm9kZSwgdGhpcy5yZWYsIGluZGV4KVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBtb3ZlSW5kZXgobm9kZSwgdGhpcy5jaGlsZHJlbiwgdGhpcy5jaGlsZHJlbi5pbmRleE9mKGJlZm9yZSksIHRydWUpXG4gICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgIGNvbnN0IHB1cmVCZWZvcmUgPSBuZXh0RWxlbWVudChiZWZvcmUpXG4gICAgICBjb25zdCBpbmRleCA9IG1vdmVJbmRleChcbiAgICAgICAgbm9kZSxcbiAgICAgICAgdGhpcy5wdXJlQ2hpbGRyZW4sXG4gICAgICAgIHB1cmVCZWZvcmVcbiAgICAgICAgICA/IHRoaXMucHVyZUNoaWxkcmVuLmluZGV4T2YocHVyZUJlZm9yZSlcbiAgICAgICAgICA6IHRoaXMucHVyZUNoaWxkcmVuLmxlbmd0aFxuICAgICAgKVxuICAgICAgaWYgKHRoaXMuZG9jSWQgJiYgaW5kZXggPj0gMCkge1xuICAgICAgICBjb25zdCBsaXN0ZW5lciA9IGluc3RhbmNlTWFwW3RoaXMuZG9jSWRdLmxpc3RlbmVyXG4gICAgICAgIHJldHVybiBsaXN0ZW5lci5tb3ZlRWxlbWVudChub2RlLnJlZiwgdGhpcy5yZWYsIGluZGV4KVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS5pbnNlcnRBZnRlciA9IGZ1bmN0aW9uIChub2RlLCBhZnRlcikge1xuICBpZiAobm9kZS5wYXJlbnROb2RlICYmIG5vZGUucGFyZW50Tm9kZSAhPT0gdGhpcykge1xuICAgIHJldHVyblxuICB9XG4gIGlmIChub2RlID09PSBhZnRlciB8fCBub2RlLnByZXZpb3VzU2libGluZyA9PT0gYWZ0ZXIpIHtcbiAgICByZXR1cm5cbiAgfVxuICBpZiAoIW5vZGUucGFyZW50Tm9kZSkge1xuICAgIGxpbmtQYXJlbnQobm9kZSwgdGhpcylcbiAgICBpbnNlcnRJbmRleChub2RlLCB0aGlzLmNoaWxkcmVuLCB0aGlzLmNoaWxkcmVuLmluZGV4T2YoYWZ0ZXIpICsgMSwgdHJ1ZSlcbiAgICBpZiAodGhpcy5kb2NJZCkge1xuICAgICAgcmVnaXN0ZXJOb2RlKHRoaXMuZG9jSWQsIG5vZGUpXG4gICAgfVxuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgICBjb25zdCBpbmRleCA9IGluc2VydEluZGV4KFxuICAgICAgICBub2RlLFxuICAgICAgICB0aGlzLnB1cmVDaGlsZHJlbixcbiAgICAgICAgdGhpcy5wdXJlQ2hpbGRyZW4uaW5kZXhPZihwcmV2aW91c0VsZW1lbnQoYWZ0ZXIpKSArIDFcbiAgICAgIClcbiAgICAgIGlmICh0aGlzLmRvY0lkKSB7XG4gICAgICAgIGNvbnN0IGxpc3RlbmVyID0gaW5zdGFuY2VNYXBbdGhpcy5kb2NJZF0ubGlzdGVuZXJcbiAgICAgICAgcmV0dXJuIGxpc3RlbmVyLmFkZEVsZW1lbnQobm9kZSwgdGhpcy5yZWYsIGluZGV4KVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBtb3ZlSW5kZXgobm9kZSwgdGhpcy5jaGlsZHJlbiwgdGhpcy5jaGlsZHJlbi5pbmRleE9mKGFmdGVyKSArIDEsIHRydWUpXG4gICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gbW92ZUluZGV4KFxuICAgICAgICBub2RlLFxuICAgICAgICB0aGlzLnB1cmVDaGlsZHJlbixcbiAgICAgICAgdGhpcy5wdXJlQ2hpbGRyZW4uaW5kZXhPZihwcmV2aW91c0VsZW1lbnQoYWZ0ZXIpKSArIDFcbiAgICAgIClcbiAgICAgIGlmICh0aGlzLmRvY0lkICYmIGluZGV4ID49IDApIHtcbiAgICAgICAgY29uc3QgbGlzdGVuZXIgPSBpbnN0YW5jZU1hcFt0aGlzLmRvY0lkXS5saXN0ZW5lclxuICAgICAgICByZXR1cm4gbGlzdGVuZXIubW92ZUVsZW1lbnQobm9kZS5yZWYsIHRoaXMucmVmLCBpbmRleClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbiAobm9kZSwgcHJlc2VydmVkKSB7XG4gIGlmIChub2RlLnBhcmVudE5vZGUpIHtcbiAgICByZW1vdmVJbmRleChub2RlLCB0aGlzLmNoaWxkcmVuLCB0cnVlKVxuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgICByZW1vdmVJbmRleChub2RlLCB0aGlzLnB1cmVDaGlsZHJlbilcbiAgICAgIGlmICh0aGlzLmRvY0lkKSB7XG4gICAgICAgIGNvbnN0IGxpc3RlbmVyID0gaW5zdGFuY2VNYXBbdGhpcy5kb2NJZF0ubGlzdGVuZXJcbiAgICAgICAgbGlzdGVuZXIucmVtb3ZlRWxlbWVudChub2RlLnJlZilcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKCFwcmVzZXJ2ZWQpIHtcbiAgICBub2RlLmRlc3Ryb3koKVxuICB9XG59XG5cbkVsZW1lbnQucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5kb2NJZCkge1xuICAgIGNvbnN0IGxpc3RlbmVyID0gaW5zdGFuY2VNYXBbdGhpcy5kb2NJZF0ubGlzdGVuZXJcbiAgICB0aGlzLnB1cmVDaGlsZHJlbi5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgbGlzdGVuZXIucmVtb3ZlRWxlbWVudChub2RlLnJlZilcbiAgICB9KVxuICB9XG4gIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChub2RlID0+IHtcbiAgICBub2RlLmRlc3Ryb3koKVxuICB9KVxuICB0aGlzLmNoaWxkcmVuLmxlbmd0aCA9IDBcbiAgdGhpcy5wdXJlQ2hpbGRyZW4ubGVuZ3RoID0gMFxufVxuXG5mdW5jdGlvbiBuZXh0RWxlbWVudCAobm9kZSkge1xuICB3aGlsZSAobm9kZSkge1xuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgICByZXR1cm4gbm9kZVxuICAgIH1cbiAgICBub2RlID0gbm9kZS5uZXh0U2libGluZ1xuICB9XG59XG5cbmZ1bmN0aW9uIHByZXZpb3VzRWxlbWVudCAobm9kZSkge1xuICB3aGlsZSAobm9kZSkge1xuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgICByZXR1cm4gbm9kZVxuICAgIH1cbiAgICBub2RlID0gbm9kZS5wcmV2aW91c1NpYmxpbmdcbiAgfVxufVxuXG5mdW5jdGlvbiBsaW5rUGFyZW50IChub2RlLCBwYXJlbnQpIHtcbiAgbm9kZS5wYXJlbnROb2RlID0gcGFyZW50XG4gIGlmIChwYXJlbnQuZG9jSWQpIHtcbiAgICBub2RlLmRvY0lkID0gcGFyZW50LmRvY0lkXG4gICAgbm9kZS5vd25lckRvY3VtZW50ID0gcGFyZW50Lm93bmVyRG9jdW1lbnRcbiAgICBub2RlLm93bmVyRG9jdW1lbnQubm9kZU1hcFtub2RlLm5vZGVJZF0gPSBub2RlXG4gICAgbm9kZS5kZXB0aCA9IHBhcmVudC5kZXB0aCArIDFcbiAgfVxuICBub2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgIGxpbmtQYXJlbnQoY2hpbGQsIG5vZGUpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyTm9kZSAoZG9jSWQsIG5vZGUpIHtcbiAgY29uc3QgZG9jID0gaW5zdGFuY2VNYXBbZG9jSWRdXG4gIGRvYy5ub2RlTWFwW25vZGUubm9kZUlkXSA9IG5vZGVcbn1cblxuZnVuY3Rpb24gaW5zZXJ0SW5kZXggKHRhcmdldCwgbGlzdCwgbmV3SW5kZXgsIGNoYW5nZVNpYmxpbmcpIHtcbiAgaWYgKG5ld0luZGV4IDwgMCkge1xuICAgIG5ld0luZGV4ID0gMFxuICB9XG4gIGNvbnN0IGJlZm9yZSA9IGxpc3RbbmV3SW5kZXggLSAxXVxuICBjb25zdCBhZnRlciA9IGxpc3RbbmV3SW5kZXhdXG4gIGxpc3Quc3BsaWNlKG5ld0luZGV4LCAwLCB0YXJnZXQpXG4gIGlmIChjaGFuZ2VTaWJsaW5nKSB7XG4gICAgYmVmb3JlICYmIChiZWZvcmUubmV4dFNpYmxpbmcgPSB0YXJnZXQpXG4gICAgdGFyZ2V0LnByZXZpb3VzU2libGluZyA9IGJlZm9yZVxuICAgIHRhcmdldC5uZXh0U2libGluZyA9IGFmdGVyXG4gICAgYWZ0ZXIgJiYgKGFmdGVyLnByZXZpb3VzU2libGluZyA9IHRhcmdldClcbiAgfVxuICByZXR1cm4gbmV3SW5kZXhcbn1cblxuZnVuY3Rpb24gbW92ZUluZGV4ICh0YXJnZXQsIGxpc3QsIG5ld0luZGV4LCBjaGFuZ2VTaWJsaW5nKSB7XG4gIGNvbnN0IGluZGV4ID0gbGlzdC5pbmRleE9mKHRhcmdldClcbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiAtMVxuICB9XG4gIGlmIChjaGFuZ2VTaWJsaW5nKSB7XG4gICAgY29uc3QgYmVmb3JlID0gbGlzdFtpbmRleCAtIDFdXG4gICAgY29uc3QgYWZ0ZXIgPSBsaXN0W2luZGV4ICsgMV1cbiAgICBiZWZvcmUgJiYgKGJlZm9yZS5uZXh0U2libGluZyA9IGFmdGVyKVxuICAgIGFmdGVyICYmIChhZnRlci5wcmV2aW91c1NpYmxpbmcgPSBiZWZvcmUpXG4gIH1cbiAgbGlzdC5zcGxpY2UoaW5kZXgsIDEpXG4gIGxldCBuZXdJbmRleEFmdGVyID0gbmV3SW5kZXhcbiAgaWYgKGluZGV4IDw9IG5ld0luZGV4KSB7XG4gICAgbmV3SW5kZXhBZnRlciA9IG5ld0luZGV4IC0gMVxuICB9XG4gIGNvbnN0IGJlZm9yZU5ldyA9IGxpc3RbbmV3SW5kZXhBZnRlciAtIDFdXG4gIGNvbnN0IGFmdGVyTmV3ID0gbGlzdFtuZXdJbmRleEFmdGVyXVxuICBsaXN0LnNwbGljZShuZXdJbmRleEFmdGVyLCAwLCB0YXJnZXQpXG4gIGlmIChjaGFuZ2VTaWJsaW5nKSB7XG4gICAgYmVmb3JlTmV3ICYmIChiZWZvcmVOZXcubmV4dFNpYmxpbmcgPSB0YXJnZXQpXG4gICAgdGFyZ2V0LnByZXZpb3VzU2libGluZyA9IGJlZm9yZU5ld1xuICAgIHRhcmdldC5uZXh0U2libGluZyA9IGFmdGVyTmV3XG4gICAgYWZ0ZXJOZXcgJiYgKGFmdGVyTmV3LnByZXZpb3VzU2libGluZyA9IHRhcmdldClcbiAgfVxuICBpZiAoaW5kZXggPT09IG5ld0luZGV4QWZ0ZXIpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuICByZXR1cm4gbmV3SW5kZXhcbn1cblxuZnVuY3Rpb24gcmVtb3ZlSW5kZXggKHRhcmdldCwgbGlzdCwgY2hhbmdlU2libGluZykge1xuICBjb25zdCBpbmRleCA9IGxpc3QuaW5kZXhPZih0YXJnZXQpXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm5cbiAgfVxuICBpZiAoY2hhbmdlU2libGluZykge1xuICAgIGNvbnN0IGJlZm9yZSA9IGxpc3RbaW5kZXggLSAxXVxuICAgIGNvbnN0IGFmdGVyID0gbGlzdFtpbmRleCArIDFdXG4gICAgYmVmb3JlICYmIChiZWZvcmUubmV4dFNpYmxpbmcgPSBhZnRlcilcbiAgICBhZnRlciAmJiAoYWZ0ZXIucHJldmlvdXNTaWJsaW5nID0gYmVmb3JlKVxuICB9XG4gIGxpc3Quc3BsaWNlKGluZGV4LCAxKVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS5zZXRBdHRyID0gZnVuY3Rpb24gKGtleSwgdmFsdWUsIHNpbGVudCkge1xuICBpZiAodGhpcy5hdHRyW2tleV0gPT09IHZhbHVlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdGhpcy5hdHRyW2tleV0gPSB2YWx1ZVxuICBpZiAoIXNpbGVudCAmJiB0aGlzLmRvY0lkKSB7XG4gICAgY29uc3QgbGlzdGVuZXIgPSBpbnN0YW5jZU1hcFt0aGlzLmRvY0lkXS5saXN0ZW5lclxuICAgIGxpc3RlbmVyLnNldEF0dHIodGhpcy5yZWYsIGtleSwgdmFsdWUpXG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUuc2V0U3R5bGUgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgc2lsZW50KSB7XG4gIGlmICh0aGlzLnN0eWxlW2tleV0gPT09IHZhbHVlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdGhpcy5zdHlsZVtrZXldID0gdmFsdWVcbiAgaWYgKCFzaWxlbnQgJiYgdGhpcy5kb2NJZCkge1xuICAgIGNvbnN0IGxpc3RlbmVyID0gaW5zdGFuY2VNYXBbdGhpcy5kb2NJZF0ubGlzdGVuZXJcbiAgICBsaXN0ZW5lci5zZXRTdHlsZSh0aGlzLnJlZiwga2V5LCB2YWx1ZSlcbiAgfVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS5zZXRDbGFzc1N0eWxlID0gZnVuY3Rpb24gKGNsYXNzU3R5bGUpIHtcbiAgdGhpcy5jbGFzc1N0eWxlID0gY2xhc3NTdHlsZVxuICBpZiAodGhpcy5kb2NJZCkge1xuICAgIGNvbnN0IGxpc3RlbmVyID0gaW5zdGFuY2VNYXBbdGhpcy5kb2NJZF0ubGlzdGVuZXJcbiAgICBsaXN0ZW5lci5zZXRTdHlsZXModGhpcy5yZWYsIHRoaXMudG9TdHlsZSgpKVxuICB9XG59XG5cbkVsZW1lbnQucHJvdG90eXBlLmFkZEV2ZW50ID0gZnVuY3Rpb24gKHR5cGUsIGhhbmRsZXIpIHtcbiAgaWYgKCF0aGlzLmV2ZW50W3R5cGVdKSB7XG4gICAgdGhpcy5ldmVudFt0eXBlXSA9IGhhbmRsZXJcbiAgICBpZiAodGhpcy5kb2NJZCkge1xuICAgICAgY29uc3QgbGlzdGVuZXIgPSBpbnN0YW5jZU1hcFt0aGlzLmRvY0lkXS5saXN0ZW5lclxuICAgICAgbGlzdGVuZXIuYWRkRXZlbnQodGhpcy5yZWYsIHR5cGUpXG4gICAgfVxuICB9XG59XG5cbkVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUV2ZW50ID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgaWYgKHRoaXMuZXZlbnRbdHlwZV0pIHtcbiAgICBkZWxldGUgdGhpcy5ldmVudFt0eXBlXVxuICAgIGlmICh0aGlzLmRvY0lkKSB7XG4gICAgICBjb25zdCBsaXN0ZW5lciA9IGluc3RhbmNlTWFwW3RoaXMuZG9jSWRdLmxpc3RlbmVyXG4gICAgICBsaXN0ZW5lci5yZW1vdmVFdmVudCh0aGlzLnJlZiwgdHlwZSlcbiAgICB9XG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUuZmlyZUV2ZW50ID0gZnVuY3Rpb24gKHR5cGUsIGUpIHtcbiAgY29uc3QgaGFuZGxlciA9IHRoaXMuZXZlbnRbdHlwZV1cbiAgaWYgKGhhbmRsZXIpIHtcbiAgICByZXR1cm4gaGFuZGxlci5jYWxsKHRoaXMsIGUpXG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUudG9TdHlsZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuY2xhc3NTdHlsZSwgdGhpcy5zdHlsZSlcbn1cblxuRWxlbWVudC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCByZXN1bHQgPSB7XG4gICAgcmVmOiB0aGlzLnJlZi50b1N0cmluZygpLFxuICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICBhdHRyOiB0aGlzLmF0dHIsXG4gICAgc3R5bGU6IHRoaXMudG9TdHlsZSgpXG4gIH1cbiAgY29uc3QgZXZlbnQgPSBPYmplY3Qua2V5cyh0aGlzLmV2ZW50KVxuICBpZiAoZXZlbnQubGVuZ3RoKSB7XG4gICAgcmVzdWx0LmV2ZW50ID0gZXZlbnRcbiAgfVxuICBpZiAodGhpcy5wdXJlQ2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgcmVzdWx0LmNoaWxkcmVuID0gdGhpcy5wdXJlQ2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gY2hpbGQudG9KU09OKCkpXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5FbGVtZW50LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICc8JyArIHRoaXMudHlwZSArXG4gICAgJyBhdHRyPScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLmF0dHIpICtcbiAgICAnIHN0eWxlPScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnRvU3R5bGUoKSkgKyAnPicgK1xuICAgIHRoaXMucHVyZUNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IGNoaWxkLnRvU3RyaW5nKCkpLmpvaW4oJycpICtcbiAgICAnPC8nICsgdGhpcy50eXBlICsgJz4nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb21tZW50ICh2YWx1ZSkge1xuICB0aGlzLm5vZGVUeXBlID0gOFxuICB0aGlzLm5vZGVJZCA9IChuZXh0Tm9kZVJlZisrKS50b1N0cmluZygpXG4gIHRoaXMucmVmID0gdGhpcy5ub2RlSWRcbiAgdGhpcy50eXBlID0gJ2NvbW1lbnQnXG4gIHRoaXMudmFsdWUgPSB2YWx1ZVxuICB0aGlzLmNoaWxkcmVuID0gW11cbiAgdGhpcy5wdXJlQ2hpbGRyZW4gPSBbXVxufVxuXG5Db21tZW50LnByb3RvdHlwZSA9IG5ldyBOb2RlKClcblxuQ29tbWVudC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAnPCEtLSAnICsgdGhpcy52YWx1ZSArICcgLS0+J1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9odG1sNS92ZG9tL2luZGV4LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTGlzdGVuZXIgKGlkLCBoYW5kbGVyKSB7XG4gIHRoaXMuaWQgPSBpZFxuICB0aGlzLmJhdGNoZWQgPSBmYWxzZVxuICB0aGlzLnVwZGF0ZXMgPSBbXVxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0aGlzLmhhbmRsZXIgPSBoYW5kbGVyXG4gIH1cbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLmNyZWF0ZUZpbmlzaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICBjb25zdCBoYW5kbGVyID0gdGhpcy5oYW5kbGVyXG4gIHJldHVybiBoYW5kbGVyKFtjcmVhdGVBY3Rpb24oJ2NyZWF0ZUZpbmlzaCcsIFtdKV0sIGNhbGxiYWNrKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUudXBkYXRlRmluaXNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIGNvbnN0IGhhbmRsZXIgPSB0aGlzLmhhbmRsZXJcbiAgcmV0dXJuIGhhbmRsZXIoW2NyZWF0ZUFjdGlvbigndXBkYXRlRmluaXNoJywgW10pXSwgY2FsbGJhY2spXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5yZWZyZXNoRmluaXNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIGNvbnN0IGhhbmRsZXIgPSB0aGlzLmhhbmRsZXJcbiAgcmV0dXJuIGhhbmRsZXIoW2NyZWF0ZUFjdGlvbigncmVmcmVzaEZpbmlzaCcsIFtdKV0sIGNhbGxiYWNrKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUuY3JlYXRlQm9keSA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gIGNvbnN0IGJvZHkgPSBlbGVtZW50LnRvSlNPTigpXG4gIGNvbnN0IGNoaWxkcmVuID0gYm9keS5jaGlsZHJlblxuICBkZWxldGUgYm9keS5jaGlsZHJlblxuICBjb25zdCBhY3Rpb25zID0gW2NyZWF0ZUFjdGlvbignY3JlYXRlQm9keScsIFtib2R5XSldXG4gIGlmIChjaGlsZHJlbikge1xuICAgIGFjdGlvbnMucHVzaC5hcHBseShhY3Rpb25zLCBjaGlsZHJlbi5tYXAoY2hpbGQgPT4ge1xuICAgICAgcmV0dXJuIGNyZWF0ZUFjdGlvbignYWRkRWxlbWVudCcsIFtib2R5LnJlZiwgY2hpbGQsIC0xXSlcbiAgICB9KSlcbiAgfVxuICByZXR1cm4gdGhpcy5hZGRBY3Rpb25zKGFjdGlvbnMpXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5hZGRFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQsIHJlZiwgaW5kZXgpIHtcbiAgaWYgKCEoaW5kZXggPj0gMCkpIHtcbiAgICBpbmRleCA9IC0xXG4gIH1cbiAgcmV0dXJuIHRoaXMuYWRkQWN0aW9ucyhjcmVhdGVBY3Rpb24oJ2FkZEVsZW1lbnQnLCBbcmVmLCBlbGVtZW50LnRvSlNPTigpLCBpbmRleF0pKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUucmVtb3ZlRWxlbWVudCA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkocmVmKSkge1xuICAgIGNvbnN0IGFjdGlvbnMgPSByZWYubWFwKChyKSA9PiBjcmVhdGVBY3Rpb24oJ3JlbW92ZUVsZW1lbnQnLCBbcl0pKVxuICAgIHJldHVybiB0aGlzLmFkZEFjdGlvbnMoYWN0aW9ucylcbiAgfVxuICByZXR1cm4gdGhpcy5hZGRBY3Rpb25zKGNyZWF0ZUFjdGlvbigncmVtb3ZlRWxlbWVudCcsIFtyZWZdKSlcbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLm1vdmVFbGVtZW50ID0gZnVuY3Rpb24gKHRhcmdldFJlZiwgcGFyZW50UmVmLCBpbmRleCkge1xuICByZXR1cm4gdGhpcy5hZGRBY3Rpb25zKGNyZWF0ZUFjdGlvbignbW92ZUVsZW1lbnQnLCBbdGFyZ2V0UmVmLCBwYXJlbnRSZWYsIGluZGV4XSkpXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5zZXRBdHRyID0gZnVuY3Rpb24gKHJlZiwga2V5LCB2YWx1ZSkge1xuICBjb25zdCByZXN1bHQgPSB7fVxuICByZXN1bHRba2V5XSA9IHZhbHVlXG4gIHJldHVybiB0aGlzLmFkZEFjdGlvbnMoY3JlYXRlQWN0aW9uKCd1cGRhdGVBdHRycycsIFtyZWYsIHJlc3VsdF0pKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUuc2V0U3R5bGUgPSBmdW5jdGlvbiAocmVmLCBrZXksIHZhbHVlKSB7XG4gIGNvbnN0IHJlc3VsdCA9IHt9XG4gIHJlc3VsdFtrZXldID0gdmFsdWVcbiAgcmV0dXJuIHRoaXMuYWRkQWN0aW9ucyhjcmVhdGVBY3Rpb24oJ3VwZGF0ZVN0eWxlJywgW3JlZiwgcmVzdWx0XSkpXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5zZXRTdHlsZXMgPSBmdW5jdGlvbiAocmVmLCBzdHlsZSkge1xuICByZXR1cm4gdGhpcy5hZGRBY3Rpb25zKGNyZWF0ZUFjdGlvbigndXBkYXRlU3R5bGUnLCBbcmVmLCBzdHlsZV0pKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUuYWRkRXZlbnQgPSBmdW5jdGlvbiAocmVmLCB0eXBlKSB7XG4gIHJldHVybiB0aGlzLmFkZEFjdGlvbnMoY3JlYXRlQWN0aW9uKCdhZGRFdmVudCcsIFtyZWYsIHR5cGVdKSlcbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50ID0gZnVuY3Rpb24gKHJlZiwgdHlwZSkge1xuICByZXR1cm4gdGhpcy5hZGRBY3Rpb25zKGNyZWF0ZUFjdGlvbigncmVtb3ZlRXZlbnQnLCBbcmVmLCB0eXBlXSkpXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5oYW5kbGVyID0gZnVuY3Rpb24gKGFjdGlvbnMsIGNiKSB7XG4gIHJldHVybiBjYiAmJiBjYigpXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5hZGRBY3Rpb25zID0gZnVuY3Rpb24gKGFjdGlvbnMpIHtcbiAgY29uc3QgdXBkYXRlcyA9IHRoaXMudXBkYXRlc1xuICBjb25zdCBoYW5kbGVyID0gdGhpcy5oYW5kbGVyXG5cbiAgaWYgKCFBcnJheS5pc0FycmF5KGFjdGlvbnMpKSB7XG4gICAgYWN0aW9ucyA9IFthY3Rpb25zXVxuICB9XG5cbiAgaWYgKHRoaXMuYmF0Y2hlZCkge1xuICAgIHVwZGF0ZXMucHVzaC5hcHBseSh1cGRhdGVzLCBhY3Rpb25zKVxuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybiBoYW5kbGVyKGFjdGlvbnMpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbiAobmFtZSwgYXJncykge1xuICByZXR1cm4geyBtb2R1bGU6ICdkb20nLCBtZXRob2Q6IG5hbWUsIGFyZ3M6IGFyZ3MgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9odG1sNS92ZG9tL2xpc3RlbmVyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwibmFtZVwiOiBcIndlZXhcIixcblx0XCJ2ZXJzaW9uXCI6IFwiMC40LjBcIixcblx0XCJkZXNjcmlwdGlvblwiOiBcIkEgZnJhbWV3b3JrIGZvciBidWlsZGluZyBNb2JpbGUgY3Jvc3MtcGxhdGZvcm0gVUlcIixcblx0XCJsaWNlbnNlXCI6IFwiQXBhY2hlLTIuMFwiLFxuXHRcInJlcG9zaXRvcnlcIjoge1xuXHRcdFwidHlwZVwiOiBcImdpdFwiLFxuXHRcdFwidXJsXCI6IFwiZ2l0QGdpdGh1Yi5jb206YWxpYmFiYS93ZWV4LmdpdFwiXG5cdH0sXG5cdFwiaG9tZXBhZ2VcIjogXCJodHRwOi8vYWxpYmFiYS5naXRodWIuaW8vd2VleC9cIixcblx0XCJidWdzXCI6IHtcblx0XHRcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9hbGliYWJhL3dlZXgvaXNzdWVzXCJcblx0fSxcblx0XCJwcml2YXRlXCI6IFwidHJ1ZVwiLFxuXHRcImtleXdvcmRzXCI6IFtcblx0XHRcIndlZXhcIixcblx0XHRcImh5YnJpZFwiLFxuXHRcdFwid2ViY29tcG9uZW50XCIsXG5cdFx0XCJhcHBmcmFtZXdvcmtcIixcblx0XHRcIm12dm1cIixcblx0XHRcImphdmFzY3JpcHRcIixcblx0XHRcIndlYmtpdFwiLFxuXHRcdFwidjhcIixcblx0XHRcImpzY29yZVwiLFxuXHRcdFwiaHRtbDVcIixcblx0XHRcImFuZHJvaWRcIixcblx0XHRcImlvc1wiLFxuXHRcdFwieXVub3NcIlxuXHRdLFxuXHRcImVuZ2luZXNcIjoge1xuXHRcdFwibm9kZVwiOiBcIj49NFwiXG5cdH0sXG5cdFwic2NyaXB0c1wiOiB7XG5cdFx0XCJwb3N0aW5zdGFsbFwiOiBcImJhc2ggLi9iaW4vaW5zdGFsbC1ob29rcy5zaFwiLFxuXHRcdFwiYnVpbGQ6YnJvd3NlclwiOiBcIndlYnBhY2sgLS1jb25maWcgYnVpbGQvd2VicGFjay5icm93c2VyLmNvbmZpZy5qc1wiLFxuXHRcdFwiYnVpbGQ6bmF0aXZlXCI6IFwid2VicGFjayAtLWNvbmZpZyBidWlsZC93ZWJwYWNrLm5hdGl2ZS5jb25maWcuanNcIixcblx0XHRcImJ1aWxkOmV4YW1wbGVzXCI6IFwid2VicGFjayAtLWNvbmZpZyBidWlsZC93ZWJwYWNrLmV4YW1wbGVzLmNvbmZpZy5qc1wiLFxuXHRcdFwiYnVpbGQ6dGVzdFwiOiBcIndlYnBhY2sgLS1jb25maWcgYnVpbGQvd2VicGFjay50ZXN0LmNvbmZpZy5qc1wiLFxuXHRcdFwiZGlzdDpicm93c2VyXCI6IFwibnBtIHJ1biBidWlsZDpicm93c2VyICYmIGJhc2ggLi9iaW4vZGlzdC1icm93c2VyLnNoXCIsXG5cdFx0XCJkaXN0XCI6IFwibnBtIHJ1biBkaXN0OmJyb3dzZXJcIixcblx0XHRcImRldjpicm93c2VyXCI6IFwid2VicGFjayAtLXdhdGNoIC0tY29uZmlnIGJ1aWxkL3dlYnBhY2suYnJvd3Nlci5jb25maWcuanNcIixcblx0XHRcImRldjpuYXRpdmVcIjogXCJ3ZWJwYWNrIC0td2F0Y2ggLS1jb25maWcgYnVpbGQvd2VicGFjay5uYXRpdmUuY29uZmlnLmpzXCIsXG5cdFx0XCJkZXY6ZXhhbXBsZXNcIjogXCJ3ZWJwYWNrIC0td2F0Y2ggLS1jb25maWcgYnVpbGQvd2VicGFjay5leGFtcGxlcy5jb25maWcuanNcIixcblx0XHRcImRldjp0ZXN0XCI6IFwid2VicGFjayAtLXdhdGNoIC0tY29uZmlnIGJ1aWxkL3dlYnBhY2sudGVzdC5jb25maWcuanNcIixcblx0XHRcImJ1aWxkXCI6IFwibnBtIHJ1biBidWlsZDpuYXRpdmUgJiYgbnBtIHJ1biBidWlsZDpicm93c2VyICYmIG5wbSBydW4gYnVpbGQ6ZXhhbXBsZXMgJiYgbnBtIHJ1biBidWlsZDp0ZXN0XCIsXG5cdFx0XCJsaW50XCI6IFwiZXNsaW50IGh0bWw1XCIsXG5cdFx0XCJ0ZXN0OnVuaXRcIjogXCJtb2NoYSAtLWNvbXBpbGVycyBqczpiYWJlbC1jb3JlL3JlZ2lzdGVyIGh0bWw1L3Rlc3QvdW5pdC8qLyouanMgaHRtbDUvdGVzdC91bml0LyovKi8qLmpzXCIsXG5cdFx0XCJ0ZXN0OmNvdmVyXCI6IFwiYmFiZWwtbm9kZSBub2RlX21vZHVsZXMvaXNwYXJ0YS9iaW4vaXNwYXJ0YSBjb3ZlciAtLXJlcG9ydCB0ZXh0IG5vZGVfbW9kdWxlcy9tb2NoYS9iaW4vX21vY2hhIC0tIC0tcmVwb3J0ZXIgZG90IGh0bWw1L3Rlc3QvdW5pdC8qLyouanMgaHRtbDUvdGVzdC91bml0LyovKi8qLmpzXCIsXG5cdFx0XCJ0ZXN0OmUyZVwiOiBcIm5vZGUgaHRtbDUvdGVzdC9lMmUvcnVubmVyLmpzXCIsXG5cdFx0XCJ0ZXN0XCI6IFwibnBtIHJ1biBsaW50ICYmIG5wbSBydW4gdGVzdDpjb3ZlciAmJiBucG0gcnVuIHRlc3Q6ZTJlXCIsXG5cdFx0XCJzZXJ2ZVwiOiBcInNlcnZlIC4vIC1wIDEyNTgwXCIsXG5cdFx0XCJjbGVhbjpleGFtcGxlc1wiOiBcImVjaG8gXFxcIlxcXFwwMzNbMzY7MW1bQ2xlYW5dXFxcXDAzM1swbSBcXFxcMDMzWzMzbWV4YW1wbGVzXFxcXDAzM1swbVxcXCIgJiYgcm0gLXZyZiBleGFtcGxlcy9idWlsZC8qXCIsXG5cdFx0XCJjbGVhbjp0ZXN0XCI6IFwiZWNobyBcXFwiXFxcXDAzM1szNjsxbVtDbGVhbl1cXFxcMDMzWzBtIFxcXFwwMzNbMzNtdGVzdFxcXFwwMzNbMG1cXFwiICYmIHJtIC12cmYgdGVzdC9idWlsZC8qXCIsXG5cdFx0XCJjbGVhblwiOiBcIm5wbSBydW4gY2xlYW46ZXhhbXBsZXMgJiYgbnBtIHJ1biBjbGVhbjp0ZXN0XCIsXG5cdFx0XCJjb3B5OmpzXCI6IFwiY3AgLXZmIC4vZGlzdC9uYXRpdmUuanMgLi9hbmRyb2lkL3Nkay9hc3NldHMvbWFpbi5qc1wiLFxuXHRcdFwiY29weTpleGFtcGxlc1wiOiBcInJtIC1yZiAuL2FuZHJvaWQvcGxheWdyb3VuZC9hcHAvc3JjL21haW4vYXNzZXRzLyogJiYgY3AgLXZyZiAuL2V4YW1wbGVzL2J1aWxkLyogLi9hbmRyb2lkL3BsYXlncm91bmQvYXBwL3NyYy9tYWluL2Fzc2V0cy9cIixcblx0XHRcImNvcHlcIjogXCJucG0gcnVuIGNvcHk6anMgJiYgbnBtIHJ1biBjb3B5OmV4YW1wbGVzXCJcblx0fSxcblx0XCJzdWJ2ZXJzaW9uXCI6IHtcblx0XHRcImJyb3dzZXJcIjogXCIwLjIuMjNcIixcblx0XHRcImZyYW1ld29ya1wiOiBcIjAuMTAuMTNcIixcblx0XHRcInRyYW5zZm9ybWVyXCI6IFwiPj0wLjEuNSA8MC40XCJcblx0fSxcblx0XCJkZXBlbmRlbmNpZXNcIjoge1xuXHRcdFwiYW5pbWF0aW9uanNcIjogXCJeMC4xLjVcIixcblx0XHRcImNhcnJvdXNlbFwiOiBcIl4wLjEuMTFcIixcblx0XHRcImNvcmUtanNcIjogXCJeMi40LjBcIixcblx0XHRcImN1YmljYmV6aWVyXCI6IFwiXjAuMS4xXCIsXG5cdFx0XCJlbnZkXCI6IFwiXjAuMS4xXCIsXG5cdFx0XCJmaXhlZHN0aWNreVwiOiBcIl4wLjEuMFwiLFxuXHRcdFwiaHR0cHVybFwiOiBcIl4wLjEuMVwiLFxuXHRcdFwia291bnRkb3duXCI6IFwiXjAuMS4yXCIsXG5cdFx0XCJsYXp5aW1nXCI6IFwiXjAuMS4yXCIsXG5cdFx0XCJsaWVcIjogXCJeMy4wLjRcIixcblx0XHRcIm1vZGFsc1wiOiBcIl4wLjEuNVwiLFxuXHRcdFwic2Nyb2xsLXRvXCI6IFwiMC4wLjJcIixcblx0XHRcInNlbXZlclwiOiBcIl41LjEuMFwiLFxuXHRcdFwidHJhbnNpdGlvbml6ZVwiOiBcIjAuMC4zXCIsXG5cdFx0XCJ3ZWV4LWNvbXBvbmVudHNcIjogXCJeMC4xLjNcIlxuXHR9LFxuXHRcImRldkRlcGVuZGVuY2llc1wiOiB7XG5cdFx0XCJiYWJlbC1jbGlcIjogXCJ+Ni40LjVcIixcblx0XHRcImJhYmVsLWxvYWRlclwiOiBcIl42LjIuNFwiLFxuXHRcdFwiYmFiZWwtcHJlc2V0LWVzMjAxNVwiOiBcIl42LjkuMFwiLFxuXHRcdFwiY2hhaVwiOiBcIl4zLjUuMFwiLFxuXHRcdFwiY2hyb21lZHJpdmVyXCI6IFwiXjIuMjEuMlwiLFxuXHRcdFwiY3Jvc3Mtc3Bhd25cIjogXCJeNC4wLjBcIixcblx0XHRcImNzcy1sb2FkZXJcIjogXCJeMC4yMy4xXCIsXG5cdFx0XCJlc2xpbnRcIjogXCJeMi4xMS4xXCIsXG5cdFx0XCJodHRwLXNlcnZlclwiOiBcIl4wLjkuMFwiLFxuXHRcdFwiaXNwYXJ0YVwiOiBcIl40LjAuMFwiLFxuXHRcdFwiaXN0YW5idWxcIjogXCJeMC40LjNcIixcblx0XHRcImpzb24tbG9hZGVyXCI6IFwiXjAuNS40XCIsXG5cdFx0XCJtb2NoYVwiOiBcIl4yLjUuM1wiLFxuXHRcdFwibmlnaHR3YXRjaFwiOiBcIl4wLjkuNFwiLFxuXHRcdFwicGhhbnRvbWpzLXByZWJ1aWx0XCI6IFwiXjIuMS43XCIsXG5cdFx0XCJzZWxlbml1bS1zZXJ2ZXJcIjogXCJeMi41My4wXCIsXG5cdFx0XCJzZXJ2ZVwiOiBcIl4xLjQuMFwiLFxuXHRcdFwic2lub25cIjogXCJeMS4xNy40XCIsXG5cdFx0XCJzaW5vbi1jaGFpXCI6IFwiXjIuOC4wXCIsXG5cdFx0XCJzdHlsZS1sb2FkZXJcIjogXCJeMC4xMy4xXCIsXG5cdFx0XCJ1Z2xpZnktanNcIjogXCJeMi42LjRcIixcblx0XHRcIndlYnBhY2tcIjogXCJeMS4xMy4xXCIsXG5cdFx0XCJ3ZWV4LWxvYWRlclwiOiBcIl4wLjIuMFwiXG5cdH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi93ZWV4L3BhY2thZ2UuanNvblxuICoqIG1vZHVsZSBpZCA9IDY5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXcgVGhlIGFwaSBmb3IgaW52b2tpbmcgd2l0aCBcIiRcIiBwcmVmaXhcbiAqL1xuaW1wb3J0ICogYXMgXyBmcm9tICcuLi91dGlsJ1xuXG4vKipcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIGNvbW1vblxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgdXNlICR2bSBpbnN0ZWFkXG4gKiBmaW5kIHRoZSB2bSBieSBpZFxuICogTm90ZTogdGhlcmUgaXMgb25seSBvbmUgaWQgaW4gd2hvbGUgY29tcG9uZW50XG4gKiBAcGFyYW0gIHtzdHJpbmd9IGlkXG4gKiBAcmV0dXJuIHtWbX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICQgKGlkKSB7XG4gIF8ud2FybignVm0jJCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIFZtIyR2bSBpbnN0ZWFkJylcbiAgY29uc3QgaW5mbyA9IHRoaXMuX2lkc1tpZF1cbiAgaWYgKGluZm8pIHtcbiAgICByZXR1cm4gaW5mby52bVxuICB9XG59XG5cbi8qKlxuICogZmluZCB0aGUgZWxlbWVudCBieSBpZFxuICogTm90ZTogdGhlcmUgaXMgb25seSBvbmUgaWQgaW4gd2hvbGUgY29tcG9uZW50XG4gKiBAcGFyYW0gIHtzdHJpbmd9IGlkXG4gKiBAcmV0dXJuIHtFbGVtZW50fVxuICovXG5leHBvcnQgZnVuY3Rpb24gJGVsIChpZCkge1xuICBjb25zdCBpbmZvID0gdGhpcy5faWRzW2lkXVxuICBpZiAoaW5mbykge1xuICAgIHJldHVybiBpbmZvLmVsXG4gIH1cbn1cblxuLyoqXG4gKiBmaW5kIHRoZSB2bSBvZiB0aGUgY3VzdG9tIGNvbXBvbmVudCBieSBpZFxuICogTm90ZTogdGhlcmUgaXMgb25seSBvbmUgaWQgaW4gd2hvbGUgY29tcG9uZW50XG4gKiBAcGFyYW0gIHtzdHJpbmd9IGlkXG4gKiBAcmV0dXJuIHtWbX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICR2bSAoaWQpIHtcbiAgY29uc3QgaW5mbyA9IHRoaXMuX2lkc1tpZF1cbiAgaWYgKGluZm8pIHtcbiAgICByZXR1cm4gaW5mby52bVxuICB9XG59XG5cbi8qKlxuICogRmlyZSB3aGVuIGRpZmZlciByZW5kZXJpbmcgZmluaXNoZWRcbiAqXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRyZW5kZXJUaGVuIChmbikge1xuICBjb25zdCBhcHAgPSB0aGlzLl9hcHBcbiAgY29uc3QgZGlmZmVyID0gYXBwLmRpZmZlclxuICByZXR1cm4gZGlmZmVyLnRoZW4oKCkgPT4ge1xuICAgIGZuKClcbiAgfSlcbn1cblxuLyoqXG4gKiBzY3JvbGwgYW4gZWxlbWVudCBzcGVjaWZpZWQgYnkgaWQgaW50byB2aWV3LFxuICogbW9yZW92ZXIgc3BlY2lmeSBhIG51bWJlciBvZiBvZmZzZXQgb3B0aW9uYWxseVxuICogQHBhcmFtICB7c3RyaW5nfSBpZFxuICogQHBhcmFtICB7bnVtYmVyfSBvZmZzZXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRzY3JvbGxUbyAoaWQsIG9mZnNldCkge1xuICBfLndhcm4oJ1ZtIyRzY3JvbGxUbyBpcyBkZXByZWNhdGVkLCAnICtcbiAgICAgICAgICAncGxlYXNlIHVzZSBcInJlcXVpcmUoXFwnQHdlZXgtbW9kdWxlL2RvbVxcJyknICtcbiAgICAgICAgICAnLnNjcm9sbFRvKGVsLCBvcHRpb25zKVwiIGluc3RlYWQnKVxuICBjb25zdCBlbCA9IHRoaXMuJGVsKGlkKVxuICBpZiAoZWwpIHtcbiAgICBjb25zdCBkb20gPSB0aGlzLl9hcHAucmVxdWlyZU1vZHVsZSgnZG9tJylcbiAgICBkb20uc2Nyb2xsVG9FbGVtZW50KGVsLnJlZiwgeyBvZmZzZXQ6IG9mZnNldCB9KVxuICB9XG59XG5cbi8qKlxuICogcGVyZm9ybSB0cmFuc2l0aW9uIGFuaW1hdGlvbiBvbiBhbiBlbGVtZW50IHNwZWNpZmllZCBieSBpZFxuICogQHBhcmFtICB7c3RyaW5nfSAgIGlkXG4gKiBAcGFyYW0gIHtvYmplY3R9ICAgb3B0aW9uc1xuICogQHBhcmFtICB7b2JqZWN0fSAgIG9wdGlvbnMuc3R5bGVzXG4gKiBAcGFyYW0gIHtvYmplY3R9ICAgb3B0aW9ucy5kdXJhdGlvbihtcylcbiAqIEBwYXJhbSAge29iamVjdH0gICBbb3B0aW9ucy50aW1pbmdGdW5jdGlvbl1cbiAqIEBwYXJhbSAge29iamVjdH0gICBbb3B0aW9ucy5kZWxheT0wKG1zKV1cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFja1xuICovXG5leHBvcnQgZnVuY3Rpb24gJHRyYW5zaXRpb24gKGlkLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICBjb25zdCBlbCA9IHRoaXMuJGVsKGlkKVxuICBpZiAoZWwgJiYgb3B0aW9ucyAmJiBvcHRpb25zLnN0eWxlcykge1xuICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuX2FwcC5yZXF1aXJlTW9kdWxlKCdhbmltYXRpb24nKVxuICAgIGFuaW1hdGlvbi50cmFuc2l0aW9uKGVsLnJlZiwgb3B0aW9ucywgKC4uLmFyZ3MpID0+IHtcbiAgICAgIHRoaXMuX3NldFN0eWxlKGVsLCBvcHRpb25zLnN0eWxlcylcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKC4uLmFyZ3MpXG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIGdldCBzb21lIGNvbmZpZ1xuICogQHJldHVybiB7b2JqZWN0fSBzb21lIGNvbmZpZyBmb3IgYXBwIGluc3RhbmNlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gYnVuZGxlVXJsXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGRlYnVnXG4gKiBAcHJvcGVydHkge29iamVjdH0gZW52XG4gKiBAcHJvcGVydHkge3N0cmluZ30gZW52LndlZXhWZXJzaW9uKGV4LiAxLjAuMClcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlbnYuYXBwTmFtZShleC4gVEIvVE0pXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZW52LmFwcFZlcnNpb24oZXguIDUuMC4wKVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGVudi5wbGF0Zm9ybShleC4gaU9TL0FuZHJvaWQpXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZW52Lm9zVmVyc2lvbihleC4gNy4wLjApXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZW52LmRldmljZU1vZGVsICoqbmF0aXZlIG9ubHkqKlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGVudi5bZGV2aWNlV2lkdGg9NzUwXVxuICogQHByb3BlcnR5IHtudW1iZXJ9IGVudi5kZXZpY2VIZWlnaHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRnZXRDb25maWcgKGNhbGxiYWNrKSB7XG4gIGNvbnN0IGNvbmZpZyA9IF8uZXh0ZW5kKHtcbiAgICBlbnY6IGdsb2JhbC5XWEVudmlyb25tZW50IHx8IHt9XG4gIH0sIHRoaXMuX2FwcC5vcHRpb25zKVxuICBpZiAoXy50eXBvZihjYWxsYmFjaykgPT09ICdmdW5jdGlvbicpIHtcbiAgICBfLndhcm4oJ3RoZSBjYWxsYmFjayBvZiBWbSMkZ2V0Q29uZmlnKGNhbGxiYWNrKSBpcyBkZXByZWNhdGVkLCAnICtcbiAgICAgICd0aGlzIGFwaSBub3cgY2FuIGRpcmVjdGx5IFJFVFVSTiBjb25maWcgaW5mby4nKVxuICAgIGNhbGxiYWNrKGNvbmZpZylcbiAgfVxuICByZXR1cm4gY29uZmlnXG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWRcbiAqIHJlcXVlc3QgbmV0d29yayB2aWEgaHR0cCBwcm90b2NvbFxuICogQHBhcmFtICB7b2JqZWN0fSAgIHBhcmFtc1xuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkc2VuZEh0dHAgKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgXy53YXJuKCdWbSMkc2VuZEh0dHAgaXMgZGVwcmVjYXRlZCwgJyArXG4gICAgICAgICAgJ3BsZWFzZSB1c2UgXCJyZXF1aXJlKFxcJ0B3ZWV4LW1vZHVsZS9zdHJlYW1cXCcpJyArXG4gICAgICAgICAgJy5zZW5kSHR0cChwYXJhbXMsIGNhbGxiYWNrKVwiIGluc3RlYWQnKVxuICBjb25zdCBzdHJlYW0gPSB0aGlzLl9hcHAucmVxdWlyZU1vZHVsZSgnc3RyZWFtJylcbiAgc3RyZWFtLnNlbmRIdHRwKHBhcmFtcywgY2FsbGJhY2spXG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWRcbiAqIG9wZW4gYSB1cmxcbiAqIEBwYXJhbSAge3N0cmluZ30gdXJsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkb3BlblVSTCAodXJsKSB7XG4gIF8ud2FybignVm0jJG9wZW5VUkwgaXMgZGVwcmVjYXRlZCwgJyArXG4gICAgICAgICAgJ3BsZWFzZSB1c2UgXCJyZXF1aXJlKFxcJ0B3ZWV4LW1vZHVsZS9ldmVudFxcJyknICtcbiAgICAgICAgICAnLm9wZW5VUkwodXJsKVwiIGluc3RlYWQnKVxuICBjb25zdCBldmVudCA9IHRoaXMuX2FwcC5yZXF1aXJlTW9kdWxlKCdldmVudCcpXG4gIGV2ZW50Lm9wZW5VUkwodXJsKVxufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKiBzZXQgYSB0aXRsZSBmb3IgcGFnZVxuICogQHBhcmFtICB7c3RyaW5nfSB0aXRsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gJHNldFRpdGxlICh0aXRsZSkge1xuICBfLndhcm4oJ1ZtIyRzZXRUaXRsZSBpcyBkZXByZWNhdGVkLCAnICtcbiAgICAgICAgICAncGxlYXNlIHVzZSBcInJlcXVpcmUoXFwnQHdlZXgtbW9kdWxlL3BhZ2VJbmZvXFwnKScgK1xuICAgICAgICAgICcuc2V0VGl0bGUodGl0bGUpXCIgaW5zdGVhZCcpXG4gIGNvbnN0IHBhZ2VJbmZvID0gdGhpcy5fYXBwLnJlcXVpcmVNb2R1bGUoJ3BhZ2VJbmZvJylcbiAgcGFnZUluZm8uc2V0VGl0bGUodGl0bGUpXG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgdXNlIFwicmVxdWlyZSgnQHdlZXgtbW9kdWxlL21vZHVsZU5hbWUnKSBpbnN0ZWFkXCJcbiAqIGludm9rZSBhIG5hdGl2ZSBtZXRob2QgYnkgc3BlY2lmaW5nIHRoZSBuYW1lIG9mIG1vZHVsZSBhbmQgbWV0aG9kXG4gKiBAcGFyYW0gIHtzdHJpbmd9IG1vZHVsZU5hbWVcbiAqIEBwYXJhbSAge3N0cmluZ30gbWV0aG9kTmFtZVxuICogQHBhcmFtICB7Li4uKn0gdGhlIHJlc3QgYXJndW1lbnRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkY2FsbCAobW9kdWxlTmFtZSwgbWV0aG9kTmFtZSwgLi4uYXJncykge1xuICBfLndhcm4oJ1ZtIyRjYWxsIGlzIGRlcHJlY2F0ZWQsICcgK1xuICAgICdwbGVhc2UgdXNlIFwicmVxdWlyZShcXCdAd2VleC1tb2R1bGUvbW9kdWxlTmFtZVxcJylcIiBpbnN0ZWFkJylcbiAgY29uc3QgbW9kdWxlID0gdGhpcy5fYXBwLnJlcXVpcmVNb2R1bGUobW9kdWxlTmFtZSlcbiAgaWYgKG1vZHVsZSAmJiBtb2R1bGVbbWV0aG9kTmFtZV0pIHtcbiAgICBtb2R1bGVbbWV0aG9kTmFtZV0oLi4uYXJncylcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vd2VleC9odG1sNS9kZWZhdWx0L2FwaS9tZXRob2RzLmpzXG4gKiovIiwiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3IFRoZSBhcGkgZm9yIGludm9raW5nIHdpdGggXCIkXCIgcHJlZml4XG4gKi9cblxuLyoqXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBwcml2YXRlIGZvciBhbGlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG4vKipcbiAqIGludm9rZSB1c2VyLXRyYWNrIG9uIFRhb2JhbyBNb2JsaWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBl77yaZW50ZXIsIGNsaWNrLCBleHBvc2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tTmFtZVxuICogQHBhcmFtIHtvYmplY3R9IHBhcmFtXG4qL1xuZXhwb3J0IGZ1bmN0aW9uICR1c2VyVHJhY2sodHlwZSwgbmFtZSwgY29tTmFtZSwgcGFyYW0pIHtcbiAgY29uc3QgdXNlclRyYWNrID0gdGhpcy5fYXBwLnJlcXVpcmVNb2R1bGUoJ3VzZXJUcmFjaycpXG4gIHVzZXJUcmFjay5jb21taXQodHlwZSwgbmFtZSwgY29tTmFtZSwgcGFyYW0pXG59XG5cbi8qKlxuICogcmVxdWVzdCBhIHJlc3RmdWxsIGFwaSB2aWEgdGhlIG10b3AgZ2F0ZXdheVxuICogQHBhcmFtICB7b2JqZWN0fSAgIHBhcmFtc1xuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkc2VuZE10b3AocGFyYW1zLCBjYWxsYmFjaykge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBpbiBuYXRpdmXvvIx1c2Ugd2luZHZhbmVcbiAgICBjb25zdCB3aW5kdmFuZSA9IHRoaXMuX2FwcC5yZXF1aXJlTW9kdWxlKCd3aW5kdmFuZScpXG4gICAgd2luZHZhbmUuY2FsbCh7XG4gICAgICBjbGFzczogJ010b3BXVlBsdWdpbicsXG4gICAgICBtZXRob2Q6ICdzZW5kJyxcbiAgICAgIGRhdGE6IHBhcmFtc1xuICAgIH0sIGNhbGxiYWNrKVxuICB9IGVsc2Uge1xuICAgIC8vIGluIHdlYiBicndvc2Vy77yMdXNlIHN0cmVhbS5zZW5kTXRvcFxuICAgIGNvbnN0IHN0cmVhbSA9IHRoaXMuX2FwcC5yZXF1aXJlTW9kdWxlKCdzdHJlYW0nKVxuICAgIHN0cmVhbS5zZW5kTXRvcChwYXJhbXMsIGNhbGxiYWNrKVxuICB9XG59XG5cbi8qKlxuICogcmVxdWVzdCBhIG5hdGl2ZSBhcGkgdmlhIHdpbmR2YW5lIHByb3RvY29sXG4gKiBAcGFyYW0gIHtvYmplY3R9ICAgcGFyYW1zXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRjYWxsV2luZHZhbmUocGFyYW1zLCBjYWxsYmFjaykge1xuICBjb25zdCB3aW5kdmFuZSA9IHRoaXMuX2FwcC5yZXF1aXJlTW9kdWxlKCd3aW5kdmFuZScpXG4gIHdpbmR2YW5lLmNhbGwocGFyYW1zLCBjYWxsYmFjaylcbn1cblxuLyoqXG4gKiBzZXQgc3BtIGZvciB0aGUgcGFnZVxuICogQHBhcmFtICB7c3RyaW5nfSBhXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRzZXRTcG0oYSwgYikge1xuICBjb25zdCBwYWdlSW5mbyA9IHRoaXMuX2FwcC5yZXF1aXJlTW9kdWxlKCdwYWdlSW5mbycpXG4gIHBhZ2VJbmZvLnNldFNwbShhLCBiKVxufVxuXG4vKipcbiAqIGdldCB0aGUgaW5mb3JtYXRpb24gb2YgdGhlIGN1cnJlbnQgbG9naW5lZCB1c2VyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRnZXRVc2VySW5mbyhjYWxsYmFjaykge1xuICBjb25zdCB1c2VyID0gdGhpcy5fYXBwLnJlcXVpcmVNb2R1bGUoJ3VzZXInKVxuICB1c2VyLmdldFVzZXJJbmZvKGNhbGxiYWNrKVxufVxuXG4vKipcbiAqIHBlcmZvcm0gbG9naW5cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFja1xuICovXG5leHBvcnQgZnVuY3Rpb24gJGxvZ2luKGNhbGxiYWNrKSB7XG4gIGNvbnN0IHVzZXIgPSB0aGlzLl9hcHAucmVxdWlyZU1vZHVsZSgndXNlcicpXG4gIHVzZXIubG9naW4oY2FsbGJhY2spXG59XG5cbi8qKlxuICogcGVyZm9ybSBsb2dvdXRcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFja1xuICovXG5leHBvcnQgZnVuY3Rpb24gJGxvZ291dChjYWxsYmFjaykge1xuICBjb25zdCB1c2VyID0gdGhpcy5fYXBwLnJlcXVpcmVNb2R1bGUoJ3VzZXInKVxuICB1c2VyLmxvZ291dChjYWxsYmFjaylcbn1cblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9hcGkvbWV0aG9kcy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=