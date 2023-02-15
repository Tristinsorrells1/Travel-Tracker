/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_old_map_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_old_map_jpg__WEBPACK_IMPORTED_MODULE_3__.default);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  font-family: 'Noto Serif';\n  color: black;\n}\n\nhtml,\nbody,\nmain {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ")\n}\n\nhtml, body {\n  min-height: 100%;\n  margin: 0px;\n  padding: 0px;\n}\n\nbody {\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n\nmain {\n  margin-top: 8vh;\n}\n\nsection {\n  height: 100%;\n}\n\nnav {\n  display: flex;\n  height: 4vh;\n  align-items: center;\n  justify-content: space-between;\n  color: white;\n  padding: 2vh 0 2vh 0;\n}\n\n.date-container {\n  display: flex;\n  margin: 1vh 0 .5vh 13vw;\n  width: fit-content;\n  border: 1px solid rgb(14, 13, 13);\n  font-size: 2vh;\n}\n\n#dateTime,\n.date {\n  padding-right: 1vw;\n  font-size: 1.2vw;\n}\n\n.login-container {\n  height: 40vh;\n  width: 30vw;\n  flex-direction: column;\n  text-align: center;\n  background-color: rgba(154, 196, 200, 0.693);\n}\n\nbutton {\n  padding: 0 0 0 .25vh;\n  color: white;\n  background-color: rgb(50, 50, 51);\n}\n\nbutton:hover {\n  background-color: rgb(203, 211, 214);\n  transition: 1s;\n  color: black;\n}\n\n.trip-container {\n  margin-top: 6vh;\n  background-color: #9d96965e;\n  text-align: center;\n  width: 15vw;\n  margin-bottom: 1vh;\n}\n\n.grid-container {\n  width: 70vw;\n  overflow: auto;\n}\n\n#h1,\n.trip-expense-text {\n  background-color: rgba(154, 196, 200, 0.61);\n  border-radius: .25vw;\n  width: fit-content;\n  padding: 0 2vw 0 2vw;\n}\n\n.trip-expense-text {\n  height: 5vh;\n}\n\n.trips-grid {\n  width: fit-content;\n  height: fit-content;\n  display: grid;\n  grid-auto-flow: column;\n  grid-auto-columns: minmax(1, 1fr);\n  justify-content: space-evenly;\n  column-gap: 1vw;\n  overflow: visible;\n}\n\n.trip-image {\n  height: 12vw;\n  max-width: 15vw;\n}\n\n.expense-container {\n  height: fit-content;\n}\n\n.expense-message {\n  font-size: 1vw;\n  border-bottom: 2px solid rgb(63, 61, 61);\n  margin: 5vh;\n}\n\n.expense-text-container,\n.expense-message {\n  margin-top: -1vw;\n  width: 60vw;\n}\n\n.expense-text-container {\n  border-radius: .25vw;\n  height: 10vh;\n}\n\n.total-spent-text {\n  margin: .25vw;\n}\n\n.expense-table {\n  height: 60vh;\n  border-collapse: collapse;\n  padding-bottom: 2vw;\n  margin-top: 10vh;\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n}\n\nth {\n  background-color: rgba(152, 155, 155, 0.892);\n  padding: 4vh;\n}\n\ntd,\n.trip-estimate-text {\n  padding: 3vh;\n}\n\nth,\ntd {\n  border: 1px solid rgb(24, 24, 24);\n}\n\ntr:nth-child(even) {\n  background: rgba(154, 196, 200, 0.856);\n}\n\n.past-pending-upcoming-h2 {\n  margin-left: 15vw;\n  height: 3.5vh;\n  background-color: rgb(0, 0, 0);\n  width: 12vw;\n  padding: 0 1vw 0 1vw;\n  margin-bottom: -3vw;\n}\n\ntr:nth-child(odd) {\n  background: rgba(152, 155, 155, 0.892);\n}\n\ntr:hover {\n  background: rgba(207, 213, 214, 0.892)\n}\n\n.booking-form-container {\n  height: 70vh;\n  display: flex;\n  width: 50vw;\n}\n\n.booking-form,\n.post-response-message {\n  height: 67vh;\n  width: 50vw;\n  flex-direction: column;\n}\n\ninput {\n  display: block;\n  margin: 2.5vh;\n  width: 11vw;\n}\n\n#destinationInput {\n  width: 12vw;\n  margin-top: 1vh;\n  height: 4vh;\n}\n\n.red-text,\ncaption {\n  color: red;\n}\n\n.missing-info {\n  border: 3px dashed red;\n}\n\n.submit-request-button,\n.price-estimate-button {\n  height: 5vh;\n  width: 15vw;\n  margin-top: 2vh;\n}\n\n.agent-fee-text {\n  font-size: 2vh;\n  margin-top: -1vh;\n}\n\n.blue-background {\n  background-color: rgba(154, 196, 200, 0.848);\n}\n\n.border {\n  border: 2px solid rgb(57, 55, 55);\n}\n\nh2,\n.journey-message {\n  font-size: 1.5vw;\n  height: .5vh;\n  padding: 1vh;\n}\n\nh2 {\n  width: fit-content;\n}\n\nh1 {\n  font-size: 2vw;\n  margin-top: -2vw;\n}\n\n.auto-margins,\nh2,\ninput {\n  margin-right: auto;\n  margin-left: auto;\n}\n\nh2,\nh1,\nlabel,\n.center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\nsection,\nnav,\nhtml,\nbody {\n  width: 100%;\n}\n\n/* Agent Page Styling*/\n.search-for-user-container {\n  display: flex;\n  flex-direction: column;\n}\n\n.agent-stats-text-container,\n.search-for-user-container {\n  width: 30vw;\n  height: 30.5vh;\n  margin-bottom: 5vh;\n}\n\n.agent-stats {\n  width: 80vw;\n  flex-direction: column;\n}\n\n.agent-result {\n  text-align: center;\n}\n\n.found-trip {\n  width: 35vw;\n  height: 50vh;\n  margin-bottom: 15vh;\n}\n\n.agent-button {\n  margin: .5vw;\n  width: 11vw;\n  height: 8vh;\n}\n\n.search-button,\n.show-all-users-table-button {\n width: 10vw;\n margin-bottom: 1vw;\n}\n\n.searched-table {\n  width: 100%;\n}\n\n.aprove-trip-button {\n  background-color: rgb(125, 141, 125);\n}\n\n.delete-trip-button {\n  background-color: rgb(216, 129, 129);\n}\n\n.hidden {\n  display: none !important;\n}", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,yBAAyB;EACzB,YAAY;AACd;;AAEA;;;EAGE;AACF;;AAEA;EACE,gBAAgB;EAChB,WAAW;EACX,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,aAAa;EACb,WAAW;EACX,mBAAmB;EACnB,8BAA8B;EAC9B,YAAY;EACZ,oBAAoB;AACtB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,kBAAkB;EAClB,iCAAiC;EACjC,cAAc;AAChB;;AAEA;;EAEE,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,sBAAsB;EACtB,kBAAkB;EAClB,4CAA4C;AAC9C;;AAEA;EACE,oBAAoB;EACpB,YAAY;EACZ,iCAAiC;AACnC;;AAEA;EACE,oCAAoC;EACpC,cAAc;EACd,YAAY;AACd;;AAEA;EACE,eAAe;EACf,2BAA2B;EAC3B,kBAAkB;EAClB,WAAW;EACX,kBAAkB;AACpB;;AAEA;EACE,WAAW;EACX,cAAc;AAChB;;AAEA;;EAEE,2CAA2C;EAC3C,oBAAoB;EACpB,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,iCAAiC;EACjC,6BAA6B;EAC7B,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,cAAc;EACd,wCAAwC;EACxC,WAAW;AACb;;AAEA;;EAEE,gBAAgB;EAChB,WAAW;AACb;;AAEA;EACE,oBAAoB;EACpB,YAAY;AACd;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,yBAAyB;EACzB,mBAAmB;EACnB,gBAAgB;EAChB,aAAa;EACb,uBAAuB;EACvB,uBAAuB;AACzB;;AAEA;EACE,4CAA4C;EAC5C,YAAY;AACd;;AAEA;;EAEE,YAAY;AACd;;AAEA;;EAEE,iCAAiC;AACnC;;AAEA;EACE,sCAAsC;AACxC;;AAEA;EACE,iBAAiB;EACjB,aAAa;EACb,8BAA8B;EAC9B,WAAW;EACX,oBAAoB;EACpB,mBAAmB;AACrB;;AAEA;EACE,sCAAsC;AACxC;;AAEA;EACE;AACF;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,WAAW;AACb;;AAEA;;EAEE,YAAY;EACZ,WAAW;EACX,sBAAsB;AACxB;;AAEA;EACE,cAAc;EACd,aAAa;EACb,WAAW;AACb;;AAEA;EACE,WAAW;EACX,eAAe;EACf,WAAW;AACb;;AAEA;;EAEE,UAAU;AACZ;;AAEA;EACE,sBAAsB;AACxB;;AAEA;;EAEE,WAAW;EACX,WAAW;EACX,eAAe;AACjB;;AAEA;EACE,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,4CAA4C;AAC9C;;AAEA;EACE,iCAAiC;AACnC;;AAEA;;EAEE,gBAAgB;EAChB,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,cAAc;EACd,gBAAgB;AAClB;;AAEA;;;EAGE,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;;;;EAIE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;;;;EAIE,WAAW;AACb;;AAEA,sBAAsB;AACtB;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;;EAEE,WAAW;EACX,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,WAAW;EACX,sBAAsB;AACxB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,WAAW;AACb;;AAEA;;CAEC,WAAW;CACX,kBAAkB;AACnB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,wBAAwB;AAC1B","sourcesContent":["* {\n  font-family: 'Noto Serif';\n  color: black;\n}\n\nhtml,\nbody,\nmain {\n  background-image: url('../images/old-map.jpg')\n}\n\nhtml, body {\n  min-height: 100%;\n  margin: 0px;\n  padding: 0px;\n}\n\nbody {\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n\nmain {\n  margin-top: 8vh;\n}\n\nsection {\n  height: 100%;\n}\n\nnav {\n  display: flex;\n  height: 4vh;\n  align-items: center;\n  justify-content: space-between;\n  color: white;\n  padding: 2vh 0 2vh 0;\n}\n\n.date-container {\n  display: flex;\n  margin: 1vh 0 .5vh 13vw;\n  width: fit-content;\n  border: 1px solid rgb(14, 13, 13);\n  font-size: 2vh;\n}\n\n#dateTime,\n.date {\n  padding-right: 1vw;\n  font-size: 1.2vw;\n}\n\n.login-container {\n  height: 40vh;\n  width: 30vw;\n  flex-direction: column;\n  text-align: center;\n  background-color: rgba(154, 196, 200, 0.693);\n}\n\nbutton {\n  padding: 0 0 0 .25vh;\n  color: white;\n  background-color: rgb(50, 50, 51);\n}\n\nbutton:hover {\n  background-color: rgb(203, 211, 214);\n  transition: 1s;\n  color: black;\n}\n\n.trip-container {\n  margin-top: 6vh;\n  background-color: #9d96965e;\n  text-align: center;\n  width: 15vw;\n  margin-bottom: 1vh;\n}\n\n.grid-container {\n  width: 70vw;\n  overflow: auto;\n}\n\n#h1,\n.trip-expense-text {\n  background-color: rgba(154, 196, 200, 0.61);\n  border-radius: .25vw;\n  width: fit-content;\n  padding: 0 2vw 0 2vw;\n}\n\n.trip-expense-text {\n  height: 5vh;\n}\n\n.trips-grid {\n  width: fit-content;\n  height: fit-content;\n  display: grid;\n  grid-auto-flow: column;\n  grid-auto-columns: minmax(1, 1fr);\n  justify-content: space-evenly;\n  column-gap: 1vw;\n  overflow: visible;\n}\n\n.trip-image {\n  height: 12vw;\n  max-width: 15vw;\n}\n\n.expense-container {\n  height: fit-content;\n}\n\n.expense-message {\n  font-size: 1vw;\n  border-bottom: 2px solid rgb(63, 61, 61);\n  margin: 5vh;\n}\n\n.expense-text-container,\n.expense-message {\n  margin-top: -1vw;\n  width: 60vw;\n}\n\n.expense-text-container {\n  border-radius: .25vw;\n  height: 10vh;\n}\n\n.total-spent-text {\n  margin: .25vw;\n}\n\n.expense-table {\n  height: 60vh;\n  border-collapse: collapse;\n  padding-bottom: 2vw;\n  margin-top: 10vh;\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n}\n\nth {\n  background-color: rgba(152, 155, 155, 0.892);\n  padding: 4vh;\n}\n\ntd,\n.trip-estimate-text {\n  padding: 3vh;\n}\n\nth,\ntd {\n  border: 1px solid rgb(24, 24, 24);\n}\n\ntr:nth-child(even) {\n  background: rgba(154, 196, 200, 0.856);\n}\n\n.past-pending-upcoming-h2 {\n  margin-left: 15vw;\n  height: 3.5vh;\n  background-color: rgb(0, 0, 0);\n  width: 12vw;\n  padding: 0 1vw 0 1vw;\n  margin-bottom: -3vw;\n}\n\ntr:nth-child(odd) {\n  background: rgba(152, 155, 155, 0.892);\n}\n\ntr:hover {\n  background: rgba(207, 213, 214, 0.892)\n}\n\n.booking-form-container {\n  height: 70vh;\n  display: flex;\n  width: 50vw;\n}\n\n.booking-form,\n.post-response-message {\n  height: 67vh;\n  width: 50vw;\n  flex-direction: column;\n}\n\ninput {\n  display: block;\n  margin: 2.5vh;\n  width: 11vw;\n}\n\n#destinationInput {\n  width: 12vw;\n  margin-top: 1vh;\n  height: 4vh;\n}\n\n.red-text,\ncaption {\n  color: red;\n}\n\n.missing-info {\n  border: 3px dashed red;\n}\n\n.submit-request-button,\n.price-estimate-button {\n  height: 5vh;\n  width: 15vw;\n  margin-top: 2vh;\n}\n\n.agent-fee-text {\n  font-size: 2vh;\n  margin-top: -1vh;\n}\n\n.blue-background {\n  background-color: rgba(154, 196, 200, 0.848);\n}\n\n.border {\n  border: 2px solid rgb(57, 55, 55);\n}\n\nh2,\n.journey-message {\n  font-size: 1.5vw;\n  height: .5vh;\n  padding: 1vh;\n}\n\nh2 {\n  width: fit-content;\n}\n\nh1 {\n  font-size: 2vw;\n  margin-top: -2vw;\n}\n\n.auto-margins,\nh2,\ninput {\n  margin-right: auto;\n  margin-left: auto;\n}\n\nh2,\nh1,\nlabel,\n.center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\nsection,\nnav,\nhtml,\nbody {\n  width: 100%;\n}\n\n/* Agent Page Styling*/\n.search-for-user-container {\n  display: flex;\n  flex-direction: column;\n}\n\n.agent-stats-text-container,\n.search-for-user-container {\n  width: 30vw;\n  height: 30.5vh;\n  margin-bottom: 5vh;\n}\n\n.agent-stats {\n  width: 80vw;\n  flex-direction: column;\n}\n\n.agent-result {\n  text-align: center;\n}\n\n.found-trip {\n  width: 35vw;\n  height: 50vh;\n  margin-bottom: 15vh;\n}\n\n.agent-button {\n  margin: .5vw;\n  width: 11vw;\n  height: 8vh;\n}\n\n.search-button,\n.show-all-users-table-button {\n width: 10vw;\n margin-bottom: 1vw;\n}\n\n.searched-table {\n  width: 100%;\n}\n\n.aprove-trip-button {\n  background-color: rgb(125, 141, 125);\n}\n\n.delete-trip-button {\n  background-color: rgb(216, 129, 129);\n}\n\n.hidden {\n  display: none !important;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/old-map.jpg");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const fetchApiData = (path) => {
  return fetch(`http://localhost:3001/api/v1/${path}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch(() => console.log(`${path} API Error!`));
};

const fetchData = () => {
  return Promise.all([
    fetchApiData("travelers"),
    fetchApiData("trips"),
    fetchApiData("destinations"),
  ]);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ fetchData });


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Destinations {
  constructor(destinationsData) {
    this.data = destinationsData;
  }

  findTripCost(request, type) {
    let destination = this.data.find(
      (destination) => destination.id === request.destinationID
    );
    let tripCost =
      destination.estimatedLodgingCostPerDay * request.duration +
      destination.estimatedFlightCostPerPerson * request.travelers;
    if (type === "agent") {
      return tripCost * 0.1;
    }
    return tripCost + tripCost * 0.1;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Destinations);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.travelerType = userData.travelerType;
    this.trips;
    this.amountSpent;
  }

  checkIDandTrips(travelers, trips) {
    if (!travelers.findIfUserExists(this.id)) {
      return `No user with this ID found`;
    } else if (!trips.findIfUserHasTrips(this.id)) {
      return `No trips found for this traveler`;
    }
    return false;
  }

  getTrips(travelers, trips) {
    if (this.checkIDandTrips(travelers, trips)) {
      return this.checkIDandTrips(travelers, trips);
    }
    this.trips = trips.getTripsByUser(this.id);
    return this.trips;
  }

  getTripByStatus(schedule, trips, travelers, todaysDate) {
    todaysDate = todaysDate.replaceAll("/", "");
    let tripsByStatus = [];
    let pastOrUpcomingTrips;
    this.getTrips(travelers, trips);
    let notPendingTrips = this.trips
      .filter((trip) => trip.status !== "pending")
      .map((trip) => {
        return {
          ...trip,
          date: trip.date.replaceAll("/", ""),
        };
      });

    if (this.checkIDandTrips(travelers, trips)) {
      return this.checkIDandTrips(travelers, trips);
    } else if (schedule === "pending") {
      return this.trips.filter((trip) => trip.status === "pending");
    } else if (schedule === "past") {
      pastOrUpcomingTrips = notPendingTrips.filter(
        (trip) => parseInt(trip.date) < parseInt(todaysDate)
      );
    } else if (schedule === "upcoming") {
      pastOrUpcomingTrips = notPendingTrips.filter(
        (trip) => parseInt(trip.date) >= parseInt(todaysDate)
      );
    }
    pastOrUpcomingTrips.forEach((pastTrip) => {
      this.trips.forEach((trip) => {
        if (pastTrip.id === trip.id) {
          tripsByStatus.push(trip);
        }
      });
    });
    return tripsByStatus;
  }

  createTripRequest(destinationID, date, duration, travelers, trips) {
    let allTrips = trips.getTripsForAllUsers();
    let lastUsedId = allTrips[allTrips.length - 1].id;
    let tripRequest = {
      id: (lastUsedId += 1),
      userID: this.id,
      destinationID,
      travelers,
      date,
      duration,
      status: "pending",
      suggestedActivities: [],
    };
    return tripRequest;
  }

  totalAmountSpent(destinations, todaysDate) {
    let yearlyTrips = this.trips.filter((trip) => {
      return trip.date.slice(0, 4) === todaysDate.slice(0, 4);
    });
    let total = yearlyTrips.reduce((accum, trip) => {
      let tripCost = destinations.findTripCost(trip);
      accum += tripCost;
      return accum;
    }, 0);
    this.amountSpent = total;
    return total;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Trips {
  constructor(tripsData) {
    this.data = tripsData;
  }

  findIfUserHasTrips(id) {
    let trips = this.data.filter((trip) => trip.userID === id);
    if (trips.length < 1) {
      return false;
    }
    return trips;
  }

  getTripsByUser(id) {
    if (!this.findIfUserHasTrips(id)) {
      return `No trips found for this traveler`;
    }
    return this.findIfUserHasTrips(id);
  }

  getTripsForAllUsers() {
    return this.data;
  }

  getTripsByDate(date) {
    let trips = this.data.filter((trip) => trip.date === date);
    if (trips.length < 1) {
      return `No trips found on this date`;
    }
    return trips;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Trips);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Travelers {
  constructor(travelersData) {
    this.data = travelersData;
  }

  findIfUserExists(id) {
    let traveler = this.data.find((user) => user.id === id);
    if (!traveler) {
      return false;
    }
    return traveler;
  }

  findTravelerById(id) {
    if (!this.findIfUserExists(id)) {
      return `We could not find a traveler with this id`;
    }
    return this.findIfUserExists(id);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Travelers);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);


class Agent {
  constructor(travelersInfo, tripsInfo) {
    this.travelersInfo = travelersInfo;
    this.tripsInfo = tripsInfo;
  }

  findUserByName(name) {
    let foundUser = this.travelersInfo.find((userInfo) => {
      return (
        userInfo.name.trim().toLowerCase() === name.trim().toLowerCase()
      );
    });
    if (!foundUser) {
      return `No Travelers by the name of ${name} found`;
    }
    return new _src_User__WEBPACK_IMPORTED_MODULE_0__.default(foundUser);
  }

  findUsersOnATripToday(week) {
    let date = new Date(week);
    let usersOnTrips = [];
    this.tripsInfo.forEach((trip) => {
      let startDate = new Date(trip.date);
      let endDate = new Date(startDate.getTime() + trip.duration * 86400000);
      if (
        date.getTime() >= startDate.getTime() &&
        date.getTime() <= endDate.getTime()
      ) {
        usersOnTrips.push(trip);
      }
    });
    if (usersOnTrips.length === 0) {
      return `There are no users currently on a trip`;
    }
    return usersOnTrips;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Agent);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/turing-logo.png");

/***/ })
/******/ 	]);
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
/******/ 			id: moduleId,
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
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _src_Destinations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _src_User__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _src_Trips__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);
/* harmony import */ var _src_Travelers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12);
/* harmony import */ var _src_Agent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var _images_turing_logo_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(14);
//----------------------------Imports------------------------------------------









// ----------------------------------Variables----------------------------
let trips;
let travelers;
let destinations;
let tripsData;
let travelersData;
let destinationsData;
let user;
let agent;
let today = "2020/08/07";

//-----------------------------------querySelectors------------------------
let pastTripsGrid = document.querySelector(".past-trips-grid");
let pendingTripsGrid = document.querySelector(".pending-trips-grid");
let futureTripsGrid = document.querySelector(".future-trips-grid");

let yourJourneyAwaitsText = document.querySelector(".journey-message");
let totalSpentText = document.querySelector(".total-spent-text");
let yearlyAmountText = document.querySelector(".amount-this-year-text");
let bookingText = document.querySelector(".request-to-book-text");
let loginMessage = document.querySelector(".login-text");
let tripEstimateText = document.querySelector(".trip-estimate-text");
let agentFeeText = document.querySelector(".agent-fee-text");
let postResponseMessage = document.querySelector(".post-response-message");
let agentResponseMessage = document.querySelector(".agent-result");
let noUsersWithNameMessage = document.querySelector(".no-user-with-name ");
let agentStats = document.querySelector(".agent-stats");
let h1 = document.querySelector("#h1");

let expenseButton = document.querySelector(".expense-button");
let tripButton = document.querySelector(".trips-button");
let bookNewTripButton = document.querySelector(".book-trip-button");
let submitRequestButton = document.querySelector(".submit-request-button");
let priceEstimateButton = document.querySelector(".price-estimate-button");
let loginButton = document.querySelector(".login-button");
let logoutButton = document.querySelector(".logout-button");
let searchButton = document.querySelector(".search-button");
let approveTripButton = document.querySelector(".aprove-trip-button");
let deleteTripButton = document.querySelector(".delete-trip-button");
let goBackButton = document.querySelector(".see-all-trips-button");
let showAllUsersButton = document.querySelector(".show-all-users-table-button");

let bookingSection = document.querySelector(".booking-view");
let tripsSection = document.querySelector(".trips-view");
let expenseSection = document.querySelector(".expense-view");
let loginSection = document.querySelector(".login-view");
let agentView = document.querySelector(".agent-view");

let form = document.querySelector(".booking-form");
let expenseTable = document.querySelector(".expense-table");
let dateandTime = document.querySelector(".date-container");

let dateInput = document.querySelector("#departureDate");
let durationInput = document.querySelector("#numberOfDays");
let groupSizeInput = document.querySelector("#numberOfPeople");
let destinationInput = document.querySelector("#destinationInput");
let usernameInput = document.querySelector("#username");
let passwordInput = document.querySelector("#password");
let searchInput = document.querySelector("#search");

let pendingTrips = document.querySelector(".pending-trips");
let usersOnTrips = document.querySelector(".users-on-a-trip");
let totalMoneyEarned = document.querySelector(".money-earned");
let annualMoneyEarned = document.querySelector(".annual-money-earned");
let allTripsTable = document.querySelector(".all-users-table");
let searchedUserTable = document.querySelector(".searched-table");
let foundTrip = document.querySelector(".found-trip");
let searchForUserContainer = document.querySelector(
  ".search-for-user-container"
);

//-----------------------------------eventListeners------------------------
expenseButton.addEventListener("click", function () {
  expenseSection.classList.remove("hidden");
  addHiddenClass([tripsSection, bookingSection]);
});

tripButton.addEventListener("click", function () {
  tripsSection.classList.remove("hidden");
  addHiddenClass([expenseSection, bookingSection]);
});

bookNewTripButton.addEventListener("click", function () {
  bookingSection.classList.remove("hidden");
  addHiddenClass([expenseSection, tripsSection]);
});

submitRequestButton.addEventListener("click", function (event) {
  event.preventDefault();
  postTripRequest();
});

priceEstimateButton.addEventListener("click", function (event) {
  event.preventDefault();
  getTripEstimate();
});

loginButton.addEventListener("click", function (event) {
  event.preventDefault();
  verifyLoginInfo();
});

logoutButton.addEventListener("click", function () {
  logoutUser();
});

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  searchForUser();
});

searchedUserTable.addEventListener("click", function (event) {
  let tripFound = trips.data.find(
    (trip) => trip.id === Number(event.target.innerText)
  );
  if (tripFound) {
    getTripToApproveOrDeny(tripFound);
  }
});

allTripsTable.addEventListener("click", function (event) {
  let tripFound = trips.data.find(
    (trip) => trip.id === Number(event.target.innerText)
  );
  if (tripFound) {
    getTripToApproveOrDeny(tripFound);
  }
});

goBackButton.addEventListener("click", function () {
  goBackToTable();
});

showAllUsersButton.addEventListener("click", function () {
  goBackToTable();
});

// -----------------------------------Functions----------------------------
function fetchApiPromises() {
  return _apiCalls__WEBPACK_IMPORTED_MODULE_1__.default.fetchData().then((data) => {
    travelersData = data[0].travelers;
    tripsData = data[1].trips;
    destinationsData = data[2].destinations;
    createInstances();
  });
}

fetchApiPromises();

function createInstances() {
  travelers = new _src_Travelers__WEBPACK_IMPORTED_MODULE_5__.default(travelersData);
  trips = new _src_Trips__WEBPACK_IMPORTED_MODULE_4__.default(tripsData);
  destinations = new _src_Destinations__WEBPACK_IMPORTED_MODULE_2__.default(destinationsData);
  agent = new _src_Agent__WEBPACK_IMPORTED_MODULE_6__.default(travelersData, tripsData);
}

var dt = new Date();
document.getElementById("dateTime").innerHTML = dt.toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hourCycle: "h11",
  hour12: true,
});

function addHiddenClass(array) {
  array.forEach((item) => {
    item.classList.add("hidden");
  });
}

function removeHiddenClass(array) {
  array.forEach((item) => {
    item.classList.remove("hidden");
  });
}

function createLayout() {
  createTripsGrid(
    pastTripsGrid,
    user.getTripByStatus("past", trips, travelers, today)
  );
  createTripsGrid(
    pendingTripsGrid,
    user.getTripByStatus("pending", trips, travelers, today)
  );
  createTripsGrid(
    futureTripsGrid,
    user.getTripByStatus("upcoming", trips, travelers, today)
  );
  createExpenseTable();
  createExpenseReport();
  h1.innerText = `Welcome Back, ${user.name.split(" ")[0]}`;
}

function createTripsGrid(tripGrid, tripTimeline) {
  tripGrid.innerHTML = "";
  let tripsInGrid = [];
  let getTrips = tripTimeline.map((trip) => {
    return destinations["data"].find(
      (destination) => destination.id === trip.destinationID
    );
  });

  getTrips.forEach((destination) => {
    tripTimeline.forEach((trip) => {
      if (
        destination.id === trip.destinationID &&
        !tripsInGrid.includes(trip)
      ) {
        tripGrid.innerHTML += ` <div class="trip-container border">
                    <div class="trip-image-container">
                            <img class="trip-image"
                            src=${destination.image} alt="A picturesque view in ${destination.destination}">
                        </div>
                        <p>${destination.destination}</p>
                        <p>Duration: ${trip.duration} days</p>
                        <p>Date: ${trip.date}</p>
                </div>
                    `;
        tripsInGrid.push(trip);
      }
    });
  });
  if (tripGrid.innerHTML === "") {
    tripGrid.innerHTML = `<p class="no-trips-in-grid center">No Trips Found</p>`;
  }
}

function createExpenseTable() {
  let usersTrips = user.getTrips(travelers, trips);
  let tripsAlreadyInTable = [];

  let getTrips = usersTrips.map((trip) => {
    return destinations["data"].find(
      (destination) => destination.id === trip.destinationID
    );
  });

  getTrips.forEach((destination) => {
    usersTrips.forEach((trip) => {
      if (
        destination.id === trip.destinationID &&
        !tripsAlreadyInTable.includes(trip)
      ) {
        let row = expenseTable.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);

        cell1.innerHTML = `${destination.destination}`;
        cell2.innerHTML = `${trip.date}`;
        cell3.innerHTML = `${trip.duration}`;
        cell4.innerHTML = `${trip.travelers}`;
        cell5.innerHTML = `${trip.status}`;
        cell6.innerHTML = `$${destinations
          .findTripCost(trip)
          .toLocaleString("en-US")}`;
        tripsAlreadyInTable.push(trip);
      }
    });
  });
}

function createExpenseReport() {
  let usersTrips = user.getTrips(travelers, trips);

  let totalSum = usersTrips.reduce((accum, trip) => {
    let tripCost = Number(destinations.findTripCost(trip));
    accum += tripCost;
    return accum;
  }, 0);

  let annualSum = usersTrips.reduce((accum, trip) => {
    if (trip.date.slice(0, 4) === today.slice(0, 4)) {
      let tripCost = Number(destinations.findTripCost(trip));
      accum += tripCost;
    }
    return accum;
  }, 0);

  yearlyAmountText.innerHTML = `You've spent $${annualSum.toLocaleString(
    "en-US"
  )} on trips in ${today.slice(0, 4)}`;
  totalSpentText.innerHTML = `and $${totalSum.toLocaleString("en-US")} total`;
}

function checkForEmptyInputs() {
  let inputValues = [
    dateInput,
    durationInput,
    groupSizeInput,
    destinationInput,
  ];

  if (
    !dateInput.value ||
    !durationInput.value.trim() ||
    !groupSizeInput.value.trim() ||
    !destinationInput.value.trim()
  ) {
    let filtered = inputValues.filter((userInput) => {
      return userInput.value.trim() === "";
    });
    filtered.forEach((field) => {
      field.classList.add("missing-info");
    });
    bookingText.classList.remove("hidden");
    bookingText.innerText = "Please Fill Out All Fields";
    bookingText.classList.add("red-text");
    return false;
  }
  bookingText.classList.remove("red-text");
  bookingText.innerText = "Request to Book a Trip";
  inputValues.forEach((field) => {
    field.classList.remove("missing-info");
  });
  return true;
}

function createTrip() {
  let tripRequest;
  if (
    dateInput.value &&
    durationInput.value.trim() &&
    groupSizeInput.value.trim() &&
    destinationInput.value.trim()
  ) {
    tripRequest = user.createTripRequest(
      Number(destinationInput.value),
      dateInput.value.replaceAll("-", "/"),
      Number(durationInput.value),
      Number(groupSizeInput.value),
      trips
    );
  }
  return tripRequest;
}

function getTripEstimate() {
  if (!checkForEmptyInputs()) {
    return checkForEmptyInputs();
  }
  let tripRequest = createTrip();
  let estimateCost = destinations.findTripCost(tripRequest);
  addHiddenClass([submitRequestButton, priceEstimateButton]);
  agentFeeText.classList.remove("hidden");
  tripEstimateText.innerHTML = `
    <p>Based on the information provided, the estimated trip price is $${estimateCost.toLocaleString(
      "en-US"
    )}</p>`;

  setTimeout(() => {
    resetAfterEstimate();
  }, "5000");
}

function resetAfterEstimate() {
  tripEstimateText.innerHTML = "";
  removeHiddenClass([submitRequestButton, priceEstimateButton]);
  agentFeeText.classList.add("hidden");
}

function resetForm() {
  form.classList.remove("hidden");
  postResponseMessage.innerText = "";
  postResponseMessage.classList.add("hidden");
}

function resetTable() {
  while (expenseTable.rows.length > 1) {
    expenseTable.deleteRow(1);
  }
}

function showPostResult(result) {
  form.classList.add("hidden");
  postResponseMessage.classList.remove("hidden");
  if (result === "success") {
    postResponseMessage.innerText =
      "Success! Your trip request will be reviewed by a travel agent soon.";
  } else if (result === "server error") {
    postResponseMessage.innerText =
      "A server issue has occured. Please try again later.";
  } else {
    postResponseMessage.innerText =
      "An unexpected issue has occured. Please try again later.";
  }
  setTimeout(resetForm, 6000);
}

function postTripRequest() {
  if (!checkForEmptyInputs()) {
    return checkForEmptyInputs();
  }
  let tripRequest = createTrip();
  durationInput.value = null;
  groupSizeInput.value = null;
  destinationInput.value = null;
  fetch(`http://localhost:3001/api/v1/trips`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tripRequest),
  })
    .then((response) => {
      if (!response.ok) {
        response.json().then((response) => {
          console.log(response.message);
        });
        return showPostResult("unknown");
      } else {
        showPostResult("success");
        fetch(`http://localhost:3001/api/v1/trips`)
          .then((response) => response.json())
          .then(() => {
            fetchApiPromises().then(() => {
              resetTable();
              createLayout();
            });
          });
      }
    })
    .catch(() => {
      showPostResult("server error");
    });
}

//------------------------------------------Login/Logout Functions-----------------------------
function loginAsAdmin() {
  getAgentStats();
  removeHiddenClass([agentView, logoutButton]);
  addHiddenClass([loginSection]);
}

function verifyLoginInfo() {
  let inputValues = [usernameInput, passwordInput];

  if (!usernameInput.value.trim() || !passwordInput.value.trim()) {
    let filtered = inputValues.filter((userInput) => {
      return userInput.value.trim() === "";
    });
    filtered.forEach((field) => {
      field.classList.add("missing-info");
    });
    loginMessage.innerText = "Please enter a username and password.";
    loginMessage.classList.add("red-text");
    return;
  }
  inputValues.forEach((field) => {
    field.classList.remove("missing-info");
  });
  loginMessage.innerText = "Login";
  loginMessage.classList.remove("red-text");
  findUserInSystem();
}

function findUserInSystem() {
  if (usernameInput.value === "agent" && passwordInput.value === "travel") {
    return loginAsAdmin();
  } else if (usernameInput.value === "agent") {
    loginMessage.innerText = "Incorrect password. Please try again.";
    loginMessage.classList.add("red-text");
    return;
  } else if (
    usernameInput.value.slice(0, 8) !== "traveler" ||
    isNaN(usernameInput.value.slice(8)) ||
    usernameInput.value.slice(8) <= 0 ||
    usernameInput.value.slice(8) > 50
  ) {
    usernameInput.classList.add("missing-info");
    loginMessage.innerText = "Please enter a valid username.";
    loginMessage.classList.add("red-text");
    return;
  }
  if (passwordInput.value !== "travel") {
    passwordInput.classList.add("missing-info");
    loginMessage.innerText =
      "Please enter a valid username and password combination.";
    loginMessage.classList.add("red-text");
    return;
  }
  loginAsUser();
}

function loginAsUser() {
  let userID = Number(usernameInput.value.slice(8));
  user = new _src_User__WEBPACK_IMPORTED_MODULE_3__.default(travelers.findTravelerById(userID));
  loginSection.classList.add("hidden");
  removeHiddenClass([
    tripsSection,
    expenseButton,
    tripButton,
    bookNewTripButton,
    logoutButton,
    dateandTime,
  ]);
  yourJourneyAwaitsText.innerText = `Your Next Journey Awaits, ${
    user.name.split(" ")[0]
  }`;
  createLayout();
}

function logoutUser() {
  user = null;
  passwordInput.value = "";
  usernameInput.value = "";
  loginSection.classList.remove("hidden");
  addHiddenClass([
    tripsSection,
    expenseButton,
    tripButton,
    bookNewTripButton,
    logoutButton,
    dateandTime,
    bookingSection,
    expenseSection,
    agentView,
  ]);
  loginMessage.innerText = "Login";
  yourJourneyAwaitsText.innerText =
    "Travel Tracker - Imagine Where Life Can Take You";
  resetTable();
}

// -----------------------------------------Agent View Functions -----------------------------------
function getAgentStats() {
  let allUsersTrips = trips.getTripsForAllUsers();
  let getPendingTrips = allUsersTrips.filter(
    (trip) => trip.status === "pending"
  );
  let getUsersOnTrips = agent.findUsersOnATripToday(today);
  let totalSum = allUsersTrips.reduce((accum, trip) => {
    let tripCost = destinations.findTripCost(trip, "agent");
    accum += tripCost;
    return accum;
  }, 0);
  let annualSum = allUsersTrips.reduce((accum, trip) => {
    if (trip.date.slice(0, 4) === today.slice(0, 4)) {
      let tripCost = Number(destinations.findTripCost(trip, "agent"));
      accum += tripCost;
    }
    return accum;
  }, 0);

  pendingTrips.innerText = `There are ${getPendingTrips.length} pending trips to review`;
  usersOnTrips.innerText = `There are ${getUsersOnTrips.length} users on a trip today`;
  totalMoneyEarned.innerText = `You have earned a total commission of $${totalSum.toLocaleString(
    "en-US"
  )}`;
  annualMoneyEarned.innerText = `You have earned $${annualSum.toLocaleString(
    "en-US"
  )} in 2020`;
  createAgentTable();
}

function createAgentTable() {
  while (allTripsTable.rows.length > 1) {
    allTripsTable.deleteRow(1);
  }

  allTripsTable.classList.remove("hidden");
  let usersTrips = trips.getTripsForAllUsers();
  let tripsAlreadyInTable = [];

  let getTrips = usersTrips.map((trip) => {
    return destinations["data"].find(
      (destination) => destination.id === trip.destinationID
    );
  });
  getTrips.forEach((destination) => {
    usersTrips.forEach((trip) => {
      if (
        destination.id === trip.destinationID &&
        !tripsAlreadyInTable.includes(trip)
      ) {
        let row = allTripsTable.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        let cell7 = row.insertCell(6);
        let cell8 = row.insertCell(7);

        cell1.innerHTML = `${travelers.findTravelerById(trip.userID).name}`;
        cell8.innerHTML = `${trip.id}`;
        cell2.innerHTML = `${destination.destination}`;
        cell3.innerHTML = `${trip.date}`;
        cell4.innerHTML = `${trip.duration} days`;
        cell5.innerHTML = `${trip.travelers} travelers`;
        cell7.innerHTML = `${trip.status}`;
        cell6.innerHTML = `$${destinations
          .findTripCost(trip, "agent")
          .toLocaleString("en-US")}`;
        tripsAlreadyInTable.push(trip);
      }
    });
  });
}

function showAgentResult(result) {
  addHiddenClass([
    agentStats,
    approveTripButton,
    deleteTripButton,
    goBackButton,
  ]);

  if (result === "success") {
    agentResponseMessage.innerText =
      "Success! This trip request has been deleted.";
  } else if (result === "server error") {
    agentResponseMessage.innerText =
      "A server issue has occured. Please try again later.";
  } else if (result === "update") {
    agentResponseMessage.innerText =
      "Success! The trip is approved and the status has been changed.";
  } else if (result === "already approved") {
    agentResponseMessage.innerText = "Trip has already been approved.";
  } else {
    agentResponseMessage.innerText =
      "An unexpected issue has occured. Please try again later.";
  }
  setTimeout(resetAgentDashboard, 3000);
}

function resetAgentDashboard() {
  removeHiddenClass([agentStats, searchForUserContainer, searchInput, searchButton]);
  foundTrip.classList.add("hidden");
  agentResponseMessage.innerText = "";
  getAgentStats();
}

function searchForUser() {
  let foundUser = agent.findUserByName(searchInput.value);
  allTripsTable.classList.add("hidden");
  searchInput.value = "";
  if (foundUser instanceof _src_User__WEBPACK_IMPORTED_MODULE_3__.default) {
    noUsersWithNameMessage.classList.add("hidden");
    showAllUsersButton.classList.remove("hidden");
    return createTableForSearchUser(foundUser);
  }
  noUsersWithNameMessage.classList.remove("hidden");
  addHiddenClass([searchButton, searchInput]);

  setTimeout(resetForNewUserSearch, 4000);
  resetAgentDashboard();
}

function resetForNewUserSearch() {
  noUsersWithNameMessage.classList.add("hidden");
  searchButton.classList.remove("hidden");
  removeHiddenClass([searchButton, searchInput]);
}

function createTableForSearchUser(user) {
  while (searchedUserTable.rows.length > 1) {
    searchedUserTable.deleteRow(1);
  }

  let usersTrips = trips.getTripsByUser(user.id);
  searchedUserTable.classList.remove("hidden");
  allTripsTable.classList.add("hidden");
  let tripsAlreadyInTable = [];

  let getTrips = usersTrips.map((trip) => {
    return destinations["data"].find(
      (destination) => destination.id === trip.destinationID
    );
  });

  getTrips.forEach((destination) => {
    usersTrips.forEach((trip) => {
      if (
        destination.id === trip.destinationID &&
        !tripsAlreadyInTable.includes(trip)
      ) {
        let row = searchedUserTable.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        let cell7 = row.insertCell(6);
        let cell8 = row.insertCell(7);

        cell1.innerHTML = `${travelers.findTravelerById(trip.userID).name}`;
        cell8.innerHTML = `${trip.id}`;
        cell2.innerHTML = `${destination.destination}`;
        cell3.innerHTML = `${trip.date}`;
        cell4.innerHTML = `${trip.duration} days`;
        cell5.innerHTML = `${trip.travelers} travelers`;
        cell7.innerHTML = `${trip.status}`;
        cell6.innerHTML = `$${destinations
          .findTripCost(trip, "agent")
          .toLocaleString("en-US")}`;
        tripsAlreadyInTable.push(trip);
      }
    });
  });
}

function getTripToApproveOrDeny(tripFound) {
  addHiddenClass([
    searchForUserContainer,
    searchButton,
    allTripsTable,
    agentStats,
    searchedUserTable,
  ]);

  removeHiddenClass([
    approveTripButton,
    deleteTripButton,
    goBackButton,
    foundTrip,
  ]);

  deleteTripButton.addEventListener("click", function () {
    deleteTrip(tripFound.id);
  });

  approveTripButton.addEventListener("click", function () {
    approveTrip(tripFound.id);
  });
}

function deleteTrip(id) {
  fetch(`http://localhost:3001/api/v1/trips/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        response.json().then((response) => {
          console.log(response.message);
        });
        return showAgentResult("unknown");
      } else {
        fetch(`http://localhost:3001/api/v1/trips`)
          .then((response) => response.json())
          .then(() => {
            fetchApiPromises().then(() => {
              showAgentResult("success");
              createInstances();
              createAgentTable();
              allTripsTable.classList.add("hidden");
            });
          });
      }
    })
    .catch(() => {
      showAgentResult("server error");
    });
}

function goBackToTable() {
  removeHiddenClass([
    searchForUserContainer,
    searchButton,
    allTripsTable,
    agentStats,
  ]);
  addHiddenClass([foundTrip, noUsersWithNameMessage]);
}

function approveTrip(id) {
  let trip = trips.data.find((trip) => trip.id === id);
  if (trip.status === "approved") {
    return showAgentResult("already approved");
  }
  fetch(`http://localhost:3001/api/v1/updateTrip?id=${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status: "approved" }),
  })
    .then((response) => {
      if (!response.ok) {
        response.json().then((response) => {
          console.log(response.message);
        });
        return showAgentResult("unknown");
      } else {
        fetch(`http://localhost:3001/api/v1/trips`)
          .then((response) => response.json())
          .then(() => {
            fetchApiPromises().then(() => {
              showAgentResult("update");
              createInstances();
              createAgentTable();
              allTripsTable.classList.add("hidden");
            });
          });
      }
    })
    .catch(() => {
      showAgentResult("server error");
    });
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map