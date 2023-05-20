/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/canvas-text-wrapper/canvas-text-wrapper.js":
/*!*****************************************************************!*\
  !*** ./node_modules/canvas-text-wrapper/canvas-text-wrapper.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("/* module decorator */ module = __webpack_require__.nmd(module);\n(function (root) {\n\n  function CanvasTextWrapper(canvas, text, options) {\n    'use strict';\n\n    var defaults = {\n      font: '18px Arial, sans-serif',\n      sizeToFill: false,\n      maxFontSizeToFill: false,\n      lineHeight: 1,\n      allowNewLine: true,\n      lineBreak: 'auto',\n      textAlign: 'left',\n      verticalAlign: 'top',\n      justifyLines: false,\n      paddingX: 0,\n      paddingY: 0,\n      fitParent: false,\n      strokeText: false,\n      renderHDPI: true,\n      textDecoration: 'none'\n    };\n\n    var opts = {};\n\n    for (var key in defaults) {\n      opts[key] = options.hasOwnProperty(key) ? options[key] : defaults[key];\n    }\n\n    var context = canvas.getContext('2d');\n    context.font = opts.font;\n    context.textBaseline = 'bottom';\n\n    var scale = 1;\n    var devicePixelRatio = (typeof __webpack_require__.g !== 'undefined') ? __webpack_require__.g.devicePixelRatio : root.devicePixelRatio;\n\n    // if (opts.renderHDPI && devicePixelRatio > 1) {\n    //   var tempCtx = {};\n\n    //   // store context settings in a temp object before scaling otherwise they will be lost\n    //   for (var key in context) {\n    //     tempCtx[key] = context[key];\n    //   }\n\n    //   var canvasWidth = canvas.width;\n    //   var canvasHeight = canvas.height;\n    //   scale = devicePixelRatio;\n\n    //   context.canvas.width = canvasWidth * scale;\n    //   context.canvas.height = canvasHeight * scale;\n    //   context.canvas.style.width = canvasWidth * scale * 0.5 + 'px';\n    //   context.canvas.style.height = canvasHeight * scale * 0.5 + 'px';\n\n    //   // restore context settings\n    //   for (var key in tempCtx) {\n    //       context[key] = tempCtx[key];\n    //   }\n\n    //   context.scale(scale, scale);\n    // }\n\n    var EL_WIDTH = (!opts.fitParent ? canvas.width : canvas.parentNode.clientWidth) / scale;\n    var EL_HEIGHT = (!opts.fitParent ? canvas.height : canvas.parentNode.clientHeight) / scale;\n    var MAX_TXT_WIDTH = EL_WIDTH - (opts.paddingX * 2);\n    var MAX_TXT_HEIGHT = EL_HEIGHT - (opts.paddingY * 2);\n\n    var fontSize = opts.font.match(/\\d+(px|em|%)/g) ? +opts.font.match(/\\d+(px|em|%)/g)[0].match(/\\d+/g) : 18;\n    var textBlockHeight = 0;\n    var lines = [];\n    var newLineIndexes = [];\n    var textPos = {x: 0, y: 0};\n    var lineHeight = 0;\n    var fontParts;\n    var multiNewLineDelimiter = '\\u200B';\n\n    text = handleMultipleNewline(text);\n    setFont(fontSize);\n    setLineHeight();\n    validate();\n    render();\n\n    function handleMultipleNewline (text) {\n      do {\n        text = text.replace(/\\n\\n/g, '\\n' + multiNewLineDelimiter + '\\n');\n      } while (text.indexOf('\\n\\n') > -1);\n      return text;\n    }\n    \n    function setFont(fontSize) {\n      if (!fontParts) fontParts = (!opts.sizeToFill) ? opts.font.split(/\\b\\d+px\\b/i) : context.font.split(/\\b\\d+px\\b/i);\n      context.font = fontParts[0] + fontSize + 'px' + fontParts[1];\n    }\n\n    function setLineHeight() {\n      if (!isNaN(opts.lineHeight)) {\n        lineHeight = fontSize * opts.lineHeight;\n      } else if (opts.lineHeight.toString().indexOf('px') !== -1) {\n        lineHeight = parseInt(opts.lineHeight);\n      } else if (opts.lineHeight.toString().indexOf('%') !== -1) {\n        lineHeight = (parseInt(opts.lineHeight) / 100) * fontSize;\n      }\n    }\n\n    function render() {\n      if (opts.sizeToFill) {\n        var wordsCount = text.trim().split(/\\s+/).length;\n        var newFontSize = 0;\n        var fontSizeHasLimit = opts.maxFontSizeToFill !== false;\n\n        do {\n          if (fontSizeHasLimit) {\n            if (++newFontSize <= opts.maxFontSizeToFill) {\n              adjustFontSize(newFontSize);\n            } else {\n              break;\n            }\n          } else {\n            adjustFontSize(++newFontSize);\n          }\n        } while (textBlockHeight < MAX_TXT_HEIGHT && (lines.join(' ').split(/\\s+/).length == wordsCount));\n\n        adjustFontSize(--newFontSize);\n      } else {\n        wrap();\n      }\n\n      if (opts.justifyLines && opts.lineBreak === 'auto') {\n        justify();\n      }\n\n      setVertAlign();\n      setHorizAlign();\n      drawText();\n    }\n\n    function adjustFontSize(size) {\n      setFont(size);\n      lineHeight = size;\n      wrap();\n    }\n\n    function wrap() {\n      if (opts.allowNewLine) {\n        var newLines = text.trim().split('\\n');\n        for (var i = 0, idx = 0; i < newLines.length - 1; i++) {\n          idx += newLines[i].trim().split(/\\s+/).length;\n          newLineIndexes.push(idx)\n        }\n      }\n\n      var words = text.trim().split(/\\s+/);\n      checkLength(words);\n      breakText(words);\n\n      textBlockHeight = lines.length * lineHeight;\n    }\n\n    function checkLength(words) {\n      var testString, tokenLen, sliced, leftover;\n\n      words.forEach(function (word, index) {\n        testString = '';\n        tokenLen = context.measureText(word).width;\n\n        if (tokenLen > MAX_TXT_WIDTH) {\n          for (var k = 0; (context.measureText(testString + word[k]).width <= MAX_TXT_WIDTH) && (k < word.length); k++) {\n            testString += word[k];\n          }\n\n          sliced = word.slice(0, k);\n          leftover = word.slice(k);\n          words.splice(index, 1, sliced, leftover);\n        }\n      });\n    }\n\n    function breakText(words) {\n      lines = [];\n      for (var i = 0, j = 0; i < words.length; j++) {\n        lines[j] = '';\n\n        if (opts.lineBreak === 'auto') {\n          if (context.measureText(lines[j] + words[i]).width > MAX_TXT_WIDTH) {\n            break;\n          } else {\n            while ((context.measureText(lines[j] + words[i]).width <= MAX_TXT_WIDTH) && (i < words.length)) {\n\n              lines[j] += words[i] + ' ';\n              i++;\n\n              if (opts.allowNewLine) {\n                for (var k = 0; k < newLineIndexes.length; k++) {\n                  if (newLineIndexes[k] === i) {\n                    j++;\n                    lines[j] = '';\n                    break;\n                  }\n                }\n              }\n            }\n          }\n          lines[j] = lines[j].trim();\n        } else {\n          lines[j] = words[i];\n          i++;\n        }\n      }\n    }\n\n    function justify() {\n      var maxLen, longestLineIndex, tokenLen;\n      for (var i = 0; i < lines.length; i++) {\n        tokenLen = context.measureText(lines[i]).width;\n\n        if (!maxLen || tokenLen > maxLen) {\n          maxLen = tokenLen;\n          longestLineIndex = i;\n        }\n      }\n\n      // fill lines with extra spaces\n      var numWords, spaceLength, numOfSpaces, num, filler;\n      var delimiter = '\\u200A';\n      for (i = 0; i < lines.length; i++) {\n        if (i === longestLineIndex) continue;\n\n        numWords = lines[i].trim().split(/\\s+/).length;\n        if (numWords <= 1) continue;\n\n        lines[i] = lines[i].trim().split(/\\s+/).join(delimiter);\n\n        spaceLength = context.measureText(delimiter).width;\n        numOfSpaces = (maxLen - context.measureText(lines[i]).width) / spaceLength;\n        num = numOfSpaces / (numWords - 1);\n\n        filler = '';\n        for (var j = 0; j < num; j++) {\n          filler += delimiter;\n        }\n\n        lines[i] = lines[i].trim().split(delimiter).join(filler);\n      }\n    }\n\n    function underline(text, x, y) {\n      var width = context.measureText(text).width;\n\n      switch (context.textAlign) {\n        case 'center':\n          x -= (width / 2);\n          break;\n        case 'right':\n          x -= width;\n          break;\n      }\n\n      context.beginPath();\n      context.moveTo(x, y);\n      context.lineTo(x + width, y);\n      context.stroke();\n    }\n\n    function drawText() {\n      var skipLineOnMatch = multiNewLineDelimiter + ' ';\n      for (var i = 0; i < lines.length; i++) {\n        textPos.y = parseInt(textPos.y) + lineHeight;\n        if (lines[i] !== skipLineOnMatch) {\n          context.fillText(lines[i], textPos.x, textPos.y);\n        \n          if (opts.strokeText) {\n            context.strokeText(lines[i], textPos.x, textPos.y);\n          }\n\n          if (opts.textDecoration.toLocaleLowerCase() === 'underline') {\n            underline(lines[i], textPos.x, textPos.y);\n          }\n        }\n      }\n    }\n\n    function setHorizAlign() {\n      context.textAlign = opts.textAlign;\n\n      if (opts.textAlign == 'center') {\n        textPos.x = EL_WIDTH / 2;\n      } else if (opts.textAlign == 'right') {\n        textPos.x = EL_WIDTH - opts.paddingX;\n      } else {\n        textPos.x = opts.paddingX;\n      }\n    }\n\n    function setVertAlign() {\n      if (opts.verticalAlign == 'middle') {\n        textPos.y = (EL_HEIGHT - textBlockHeight) / 2;\n      } else if (opts.verticalAlign == 'bottom') {\n        textPos.y = EL_HEIGHT - textBlockHeight - opts.paddingY;\n      } else {\n        textPos.y = opts.paddingY;\n      }\n    }\n\n    function validate() {\n      if (typeof text !== 'string')\n        throw new TypeError('The second parameter must be a String.');\n\n      if (isNaN(fontSize))\n        throw new TypeError('Cannot parse \"font\".');\n\n      if (isNaN(lineHeight))\n        throw new TypeError('Cannot parse \"lineHeight\".');\n\n      if (opts.textAlign.toLocaleLowerCase() !== 'left' && opts.textAlign.toLocaleLowerCase() !== 'center' && opts.textAlign.toLocaleLowerCase() !== 'right')\n        throw new TypeError('Property \"textAlign\" must be set to either \"left\", \"center\", or \"right\".');\n\n      if (opts.verticalAlign.toLocaleLowerCase() !== 'top' && opts.verticalAlign.toLocaleLowerCase() !== 'middle' && opts.verticalAlign.toLocaleLowerCase() !== 'bottom')\n        throw new TypeError('Property \"verticalAlign\" must be set to either \"top\", \"middle\", or \"bottom\".');\n\n      if (typeof opts.justifyLines !== 'boolean')\n        throw new TypeError('Property \"justifyLines\" must be a Boolean.');\n\n      if (isNaN(opts.paddingX))\n        throw new TypeError('Property \"paddingX\" must be a Number.');\n\n      if (isNaN(opts.paddingY))\n        throw new TypeError('Property \"paddingY\" must be a Number.');\n\n      if (typeof opts.fitParent !== 'boolean')\n        throw new TypeError('Property \"fitParent\" must be a Boolean.');\n\n      if (opts.lineBreak.toLocaleLowerCase() !== 'auto' && opts.lineBreak.toLocaleLowerCase() !== 'word')\n        throw new TypeError('Property \"lineBreak\" must be set to either \"auto\" or \"word\".');\n\n      if (typeof opts.sizeToFill !== 'boolean')\n        throw new TypeError('Property \"sizeToFill\" must be a Boolean.');\n\n      if (typeof opts.strokeText !== 'boolean')\n        throw new TypeError('Property \"strokeText\" must be a Boolean.');\n\n      if (typeof opts.renderHDPI !== 'boolean')\n        throw new TypeError('Property \"renderHDPI\" must be a Boolean.');\n\n      if (opts.textDecoration.toLocaleLowerCase() !== 'none' && opts.textDecoration.toLocaleLowerCase() !== 'underline')\n        throw new TypeError('Property \"textDecoration\" must be set to either \"none\" or \"underline\".');\n    }\n\n    return(lines);\n  }\n\n  if ('module' in root && 'exports' in module) {\n    module.exports = CanvasTextWrapper;\n  } else {\n    root.CanvasTextWrapper = CanvasTextWrapper;\n  }\n})(this);\n\n\n//# sourceURL=webpack://post-creator/./node_modules/canvas-text-wrapper/canvas-text-wrapper.js?");

/***/ }),

/***/ "./node_modules/justreddit/build/functions/randomImage.js":
/*!****************************************************************!*\
  !*** ./node_modules/justreddit/build/functions/randomImage.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst randomImageSub_1 = __webpack_require__(/*! ./randomImageSub */ \"./node_modules/justreddit/build/functions/randomImageSub.js\");\r\nconst randomImageFromSub_1 = __webpack_require__(/*! ./randomImageFromSub */ \"./node_modules/justreddit/build/functions/randomImageFromSub.js\");\r\nasync function randomImage(options) {\r\n    if (typeof (options === null || options === void 0 ? void 0 : options.subReddit) === \"string\")\r\n        options.subReddit = undefined;\r\n    return await (0, randomImageFromSub_1.default)({ subReddit: (0, randomImageSub_1.default)(), ...options });\r\n}\r\nexports[\"default\"] = randomImage;\r\n\n\n//# sourceURL=webpack://post-creator/./node_modules/justreddit/build/functions/randomImage.js?");

/***/ }),

/***/ "./node_modules/justreddit/build/functions/randomImageFromSub.js":
/*!***********************************************************************!*\
  !*** ./node_modules/justreddit/build/functions/randomImageFromSub.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst randomPostFromSub_1 = __webpack_require__(/*! ./randomPostFromSub */ \"./node_modules/justreddit/build/functions/randomPostFromSub.js\");\r\nfunction getImageFromGalleryPost(post) {\r\n    var _a, _b;\r\n    const images = Object.values((_a = post.raw) === null || _a === void 0 ? void 0 : _a.media_metadata).filter((image) => image.status === \"valid\");\r\n    return (_b = images[Math.floor(Math.random() * images.length)]) === null || _b === void 0 ? void 0 : _b.s.u.replace(/&amp;/g, \"&\");\r\n}\r\nasync function randomImageFromSub({ subReddit, sortType = \"top\", maxTries = 15, postGetLimit = 10 }) {\r\n    var _a, _b, _c;\r\n    let post = null;\r\n    let tries = 0;\r\n    while (typeof post !== null && tries <= maxTries) {\r\n        const randomPost = await (0, randomPostFromSub_1.default)({ subReddit, sortType, postGetLimit, excludeRaw: false });\r\n        if (typeof ((_a = randomPost.raw) === null || _a === void 0 ? void 0 : _a.url) === \"string\" && ((_b = randomPost.raw) === null || _b === void 0 ? void 0 : _b.url.length) > 0 && /\\.(jpe?g|png|gif|bmp)$/i.test((_c = randomPost.raw) === null || _c === void 0 ? void 0 : _c.url) === true) {\r\n            post = randomPost;\r\n            break;\r\n        }\r\n        tries++;\r\n    }\r\n    if (post === null)\r\n        return \"https://via.placeholder.com/150\";\r\n    if ((post === null || post === void 0 ? void 0 : post.raw.is_gallery) === true)\r\n        return getImageFromGalleryPost(post);\r\n    return post === null || post === void 0 ? void 0 : post.raw.url.replace(\"gifv\", \"gif\");\r\n}\r\nexports[\"default\"] = randomImageFromSub;\r\n\n\n//# sourceURL=webpack://post-creator/./node_modules/justreddit/build/functions/randomImageFromSub.js?");

/***/ }),

/***/ "./node_modules/justreddit/build/functions/randomImageSub.js":
/*!*******************************************************************!*\
  !*** ./node_modules/justreddit/build/functions/randomImageSub.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst options_1 = __webpack_require__(/*! ../types/options */ \"./node_modules/justreddit/build/types/options.js\");\r\nfunction randomImageSub() {\r\n    return options_1.imageSubReddits[Math.floor(Math.random() * options_1.imageSubReddits.length)];\r\n}\r\nexports[\"default\"] = randomImageSub;\r\n\n\n//# sourceURL=webpack://post-creator/./node_modules/justreddit/build/functions/randomImageSub.js?");

/***/ }),

/***/ "./node_modules/justreddit/build/functions/randomPost.js":
/*!***************************************************************!*\
  !*** ./node_modules/justreddit/build/functions/randomPost.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst randomPostFromSub_1 = __webpack_require__(/*! ./randomPostFromSub */ \"./node_modules/justreddit/build/functions/randomPostFromSub.js\");\r\nconst randomSub_1 = __webpack_require__(/*! ./randomSub */ \"./node_modules/justreddit/build/functions/randomSub.js\");\r\nasync function randomPost(options) {\r\n    if (typeof (options === null || options === void 0 ? void 0 : options.subReddit) === \"string\")\r\n        options.subReddit = undefined;\r\n    return await (0, randomPostFromSub_1.default)({ subReddit: (0, randomSub_1.default)(), ...options });\r\n}\r\nexports[\"default\"] = randomPost;\r\n\n\n//# sourceURL=webpack://post-creator/./node_modules/justreddit/build/functions/randomPost.js?");

/***/ }),

/***/ "./node_modules/justreddit/build/functions/randomPostFromSub.js":
/*!**********************************************************************!*\
  !*** ./node_modules/justreddit/build/functions/randomPostFromSub.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst node_fetch_1 = __webpack_require__(/*! node-fetch */ \"./node_modules/node-fetch/browser.js\");\r\nconst options_1 = __webpack_require__(/*! ../types/options */ \"./node_modules/justreddit/build/types/options.js\");\r\nasync function randomPostFromSub({ subReddit, sortType = \"top\", postGetLimit = 10, excludeRaw = true }) {\r\n    var _a, _b;\r\n    if (subReddit === null)\r\n        return {\r\n            error: \"No sub reddit\",\r\n        };\r\n    if (sortType === \"random\")\r\n        sortType = options_1.sortTypes[Math.floor(Math.random() * options_1.sortTypes.length)];\r\n    if (options_1.sortTypes.includes(sortType) === false)\r\n        return {\r\n            error: `Invalid sort type: ${sortType}`,\r\n        };\r\n    const redditFetch = await (0, node_fetch_1.default)(`https://www.reddit.com/r/${subReddit}/${sortType}.json?limit=${postGetLimit}`);\r\n    const response = await redditFetch.json();\r\n    if (typeof response.error !== \"undefined\")\r\n        return {\r\n            error: `reddit error: ${response.error}`,\r\n        };\r\n    const posts = (_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.children) === null || _b === void 0 ? void 0 : _b.map((child) => child.data);\r\n    const post = posts[Math.floor(Math.random() * posts.length)];\r\n    if (post === null)\r\n        return {\r\n            error: \"No post found\",\r\n        };\r\n    return {\r\n        image: typeof (post === null || post === void 0 ? void 0 : post.url_overridden_by_dest) === \"string\" ? post.url_overridden_by_dest : null,\r\n        title: post.title,\r\n        content: post.selftext,\r\n        url: `https://www.reddit.com${post.permalink}`,\r\n        subreddit: post.subreddit,\r\n        author: post.author,\r\n        upvotes: post.ups,\r\n        downvotes: post.downs,\r\n        upvoteRatio: post.upvote_ratio,\r\n        nsfw: post.over_18,\r\n        createdUTC: post.created_utc,\r\n        category: post.category,\r\n        thumbnail: post.thumbnail,\r\n        pinned: post.pinned,\r\n        archived: post.archived,\r\n        awards: post.all_awardings,\r\n        commentAmount: post.num_comments,\r\n        html: post.selftext_html,\r\n        raw: excludeRaw !== true ? post : null,\r\n    };\r\n}\r\nexports[\"default\"] = randomPostFromSub;\r\n\n\n//# sourceURL=webpack://post-creator/./node_modules/justreddit/build/functions/randomPostFromSub.js?");

/***/ }),

/***/ "./node_modules/justreddit/build/functions/randomSub.js":
/*!**************************************************************!*\
  !*** ./node_modules/justreddit/build/functions/randomSub.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst options_1 = __webpack_require__(/*! ../types/options */ \"./node_modules/justreddit/build/types/options.js\");\r\nfunction randomSub() {\r\n    return options_1.subReddits[Math.floor(Math.random() * options_1.subReddits.length)];\r\n}\r\nexports[\"default\"] = randomSub;\r\n\n\n//# sourceURL=webpack://post-creator/./node_modules/justreddit/build/functions/randomSub.js?");

/***/ }),

/***/ "./node_modules/justreddit/build/functions/randomSubInfo.js":
/*!******************************************************************!*\
  !*** ./node_modules/justreddit/build/functions/randomSubInfo.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst randomSub_1 = __webpack_require__(/*! ./randomSub */ \"./node_modules/justreddit/build/functions/randomSub.js\");\r\nconst subInfo_1 = __webpack_require__(/*! ./subInfo */ \"./node_modules/justreddit/build/functions/subInfo.js\");\r\nasync function randomSubInfo(options) {\r\n    if (typeof (options === null || options === void 0 ? void 0 : options.subReddit) === \"string\")\r\n        options.subReddit = undefined;\r\n    return await (0, subInfo_1.default)({ subReddit: (0, randomSub_1.default)(), ...options });\r\n}\r\nexports[\"default\"] = randomSubInfo;\r\n\n\n//# sourceURL=webpack://post-creator/./node_modules/justreddit/build/functions/randomSubInfo.js?");

/***/ }),

/***/ "./node_modules/justreddit/build/functions/subInfo.js":
/*!************************************************************!*\
  !*** ./node_modules/justreddit/build/functions/subInfo.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst node_fetch_1 = __webpack_require__(/*! node-fetch */ \"./node_modules/node-fetch/browser.js\");\r\nasync function subInfo({ subReddit, excludeRaw = true }) {\r\n    if (subReddit === null)\r\n        return {\r\n            error: \"no subreddit\",\r\n        };\r\n    const redditFetch = await (0, node_fetch_1.default)(`https://www.reddit.com/r/${subReddit}/about.json`);\r\n    const response = await redditFetch.json();\r\n    if (typeof response.error !== \"undefined\")\r\n        return {\r\n            error: `reddit error: ${response.error}`,\r\n        };\r\n    const redditInfo = response.data;\r\n    if (redditInfo === null)\r\n        return {\r\n            error: \"no subreddit found\",\r\n        };\r\n    return {\r\n        subreddit: redditInfo.display_name,\r\n        title: redditInfo.title,\r\n        description: redditInfo.public_description,\r\n        url: `https://www.reddit.com${redditInfo.url}`,\r\n        primaryColor: redditInfo.primary_color,\r\n        keyColor: redditInfo.key_color,\r\n        type: redditInfo.subreddit_type,\r\n        icon: redditInfo.community_icon,\r\n        userCount: redditInfo.subscribers,\r\n        activeUserCount: redditInfo.active_user_count,\r\n        banner: redditInfo.banner_background_image,\r\n        mobileBanner: redditInfo.mobile_banner_image,\r\n        bannerColor: redditInfo.banner_background_color,\r\n        emojisEnabled: redditInfo.emojis_enabled,\r\n        nsfw: redditInfo.over_18,\r\n        createdUTC: redditInfo.created_utc,\r\n        crossPostable: redditInfo.is_crosspostable_subreddit,\r\n        raw: excludeRaw !== true ? redditInfo : null,\r\n    };\r\n}\r\nexports[\"default\"] = subInfo;\r\n\n\n//# sourceURL=webpack://post-creator/./node_modules/justreddit/build/functions/subInfo.js?");

/***/ }),

/***/ "./node_modules/justreddit/build/index.js":
/*!************************************************!*\
  !*** ./node_modules/justreddit/build/index.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    var desc = Object.getOwnPropertyDescriptor(m, k);\r\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\r\n      desc = { enumerable: true, get: function() { return m[k]; } };\r\n    }\r\n    Object.defineProperty(o, k2, desc);\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\r\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.randomSubInfo = exports.subInfo = exports.randomImageFromSub = exports.randomImage = exports.randomImageSub = exports.randomSub = exports.randomPost = exports.randomPostFromSub = void 0;\r\nconst randomPostFromSub_1 = __webpack_require__(/*! ./functions/randomPostFromSub */ \"./node_modules/justreddit/build/functions/randomPostFromSub.js\");\r\nexports.randomPostFromSub = randomPostFromSub_1.default;\r\nconst randomPost_1 = __webpack_require__(/*! ./functions/randomPost */ \"./node_modules/justreddit/build/functions/randomPost.js\");\r\nexports.randomPost = randomPost_1.default;\r\nconst randomSub_1 = __webpack_require__(/*! ./functions/randomSub */ \"./node_modules/justreddit/build/functions/randomSub.js\");\r\nexports.randomSub = randomSub_1.default;\r\nconst randomImageSub_1 = __webpack_require__(/*! ./functions/randomImageSub */ \"./node_modules/justreddit/build/functions/randomImageSub.js\");\r\nexports.randomImageSub = randomImageSub_1.default;\r\nconst randomImage_1 = __webpack_require__(/*! ./functions/randomImage */ \"./node_modules/justreddit/build/functions/randomImage.js\");\r\nexports.randomImage = randomImage_1.default;\r\nconst randomImageFromSub_1 = __webpack_require__(/*! ./functions/randomImageFromSub */ \"./node_modules/justreddit/build/functions/randomImageFromSub.js\");\r\nexports.randomImageFromSub = randomImageFromSub_1.default;\r\nconst subInfo_1 = __webpack_require__(/*! ./functions/subInfo */ \"./node_modules/justreddit/build/functions/subInfo.js\");\r\nexports.subInfo = subInfo_1.default;\r\nconst randomSubInfo_1 = __webpack_require__(/*! ./functions/randomSubInfo */ \"./node_modules/justreddit/build/functions/randomSubInfo.js\");\r\nexports.randomSubInfo = randomSubInfo_1.default;\r\n__exportStar(__webpack_require__(/*! ./types/post */ \"./node_modules/justreddit/build/types/post.js\"), exports);\r\n__exportStar(__webpack_require__(/*! ./types/sub */ \"./node_modules/justreddit/build/types/sub.js\"), exports);\r\nexports[\"default\"] = randomPost_1.default;\r\n\n\n//# sourceURL=webpack://post-creator/./node_modules/justreddit/build/index.js?");

/***/ }),

/***/ "./node_modules/justreddit/build/types/options.js":
/*!********************************************************!*\
  !*** ./node_modules/justreddit/build/types/options.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.imageSubReddits = exports.subReddits = exports.sortTypes = void 0;\r\nexports.sortTypes = [\"new\", \"top\", \"hot\", \"controversial\", \"rising\"];\r\nexports.subReddits = \"r/100yearsago r/1200isplenty r/13or30 r/1500isplenty r/2007scape r/2healthbars r/2meirl42meirl4meirl r/2meirl4meirl r/30ROCK r/3amjokes r/3Dprinting r/3DS r/3dshacks r/40kLore r/49ers r/4chan r/4PanelCringe r/5050 r/90DayFiance r/AbandonedPorn r/ableton r/ABoringDystopia r/ABraThatFits r/absolutelynotme_irl r/absolutelynotmeirl r/AbsoluteUnits r/AccidentalComedy r/AccidentalRacism r/AccidentalRenaissance r/accidentalswastika r/AccidentalWesAnderson r/Accounting r/ActLikeYouBelong r/actuallesbians r/Addons4Kodi r/ADHD r/AdPorn r/AdrenalinePorn r/AdvancedFitness r/adventuretime r/advertising r/Advice r/AdviceAnimals r/afkarena r/AfterEffectsr/AgainstHateSubreddits r/agedlikemilk r/ainbow r/AionNetwork r/AirForce r/airsoft r/AlbumArtPorn r/alcohol r/alexandradaddario r/AlexisRen r/algorithms r/algotrading r/AlienBlue r/aliens r/AliensAmongUs r/AlisonBrie r/Allsvenskan r/altcoin r/alternativeart r/AMA r/AMADisasters r/AmateurRoomPorn r/amazon r/amazonecho r/Amd r/americandad r/AmericanHorrorStory r/amibeingdetained r/amiibo r/Amish r/AmItheAsshole r/amiugly r/Amoledbackgrounds r/analog r/Anarchism r/Anarcho_Capitalism r/Android r/androidapps r/androiddev r/AndroidGaming r/AndroidQuestions r/androidthemes r/AndroidWear r/angularjs r/AnimalCrossing r/AnimalPorn r/AnimalsBeingBros r/AnimalsBeingDerps r/AnimalsBeingJerks r/AnimalsBeingMoms r/animalsdoingstuff r/Animalsthatlovemagic r/AnimalTextGifs r/animation r/anime r/anime_irl r/animegifs r/Animemes r/animenocontext r/Animesuggest r/Animewallpaper r/announcements r/ANormalDayInRussia r/answers r/AnthemTheGame r/Anthropology r/Anticonsumption r/AntiJokes r/antiMLM r/Anxiety r/aoe2 r/apexlegends r/apolloapp r/AppalachianTrailr/AppHookup r/apple r/AppleWatch r/ApplyingToCollege r/Aquariums r/ar15 r/arabfunny r/araragi r/Archaeology r/ArcherFX r/Archery r/architecture r/ArchitecturePorn r/archlinux r/arduino r/argentina r/ArianaGrande r/ARK r/arma r/army r/arresteddevelopment r/arrow r/Art r/ArtefactPorn r/ArtFundamentals r/artificial r/ArtisanVideos r/ArtPorn r/AryaWinsTheThrone r/AsianBeauty r/asiangirlsbeingcute r/asianpeoplegifs r/AskAcademia r/AskAnAmerican r/AskAnthropology r/AskCulinary r/AskDocs r/AskElectronics r/AskEngineers r/askgaybros r/AskHistorians r/AskMen r/AskMenOver30 r/AskNetsec r/AskOuija r/askphilosophy r/AskReddit r/asksciencer /AskScienceFiction r/AskSocialScience r/asktransgender r/asktrp r/AskTrumpSupporters r/AskUK r/AskWomen r/askwomenadvice r/asmr r/asoiaf r/aSongOfMemesAndRage r/aspergers r/assassinscreed r/assholedesign r/assholetax r/Assistance r/AstralProjection r/astrology r/Astronomy r/astrophotography r/ATBGE r/AteTheOnion r/atheism r/Atlanta r/attackontitan r/Audi r/audiobooks r/audioengineering r/audiophile r/Austin r/australia r/Austria r/AutoDetailing r/Autos r/Avengers r/aves r/aviation r/awakened r/AwardSpeechEdits r/awesome r/AwesomeCarMods r/awfuleverything r/awfuleyebrows r/aws r/aww r/Awwducational r/awwnime r/Awww r/awwwtf r/AyyMD r/babybigcatgifs r/BabyBumps r/BabyCorgis r/babyelephantgifs r/backpacking r/baconit r/baconreader r/Bad_Cop_No_Donut r/Badfaketexts r/badhistory r/badtattoos r/badwomensanatomy r/Baking r/Bandnames r/bangtan r/bannedfromclubpenguin r/barkour r/barstoolsports r/bartenders r/baseball r/BasicIncome r/Bass r/batman r/Battlecars r/Battlefield r/battlefield_4 r/battlefield_one r/BattlefieldV r/battlestations r/bayarea r/BBQ r/BDSMAdvice r/BeAmazed r/beards r/bearsdoinghumanthings r/beatles r/beauty r/BeautyBoxes r/BeautyGuruChatter r/Beekeeping r/beer r/beermoney r/beerporn r/beetlejuicing r/BeforeNAfterAdoption r/behindthegifs r/beholdthemasterrace r/belgium r/Berserk r/bertstrips r/bestof r/bestoflegaladvice r/bestofnetflix r/BestOfOutrageCulture r/BestOfReports r/beta r/bettafish r/betterCallSaul r/BetterEveryLoop r/beyondthebump r/bicycling r/bidenbro r/bigboobproblems r/bigboye r/BigBrother r/BigCatGifs r/bigdickproblems r/bikecommuting r/BikiniBottomTwitter r/binance r/bindingofisaac r/bingbongtheorem r/biology r/Bioshock r/bipolar r/Birbs r/BirdsArentReal r/BirdsBeingDicks r/birdswitharms r/bisexual r/bitchimabus r/Bitcoin r/BitcoinBeginners r/BitcoinMarkets r/bizarrebuildings r/bjj r/blackcats r/blackdesertonline r/blackhat r/blackmagicfuckery r/blackmirror r/blackops3 r/Blackops4 r/blackpeoplegifs r/BlackPeopleTwitter r/Blacksmith r/bleach r/blender r/Blep r/blessedimages r/BlockChain r/blog r/bloodborne r/blop r/BlueMidterm2018 r/blunderyears r/blursedimages r/BMW r/boardgamesr/BobsBurgers r/bodybuilding r/bodyweightfitness r/bois r/BoJackHorseman r/BokuNoHeroAcademia r/BollywoodRealism r/BoneAppleTea r/bonehurtingjuice r/Bonsai r/bookclub r/bookporn r/books r/booksuggestions r/boop r/boottoobig r/Borderlands r/Borderlands2 r/borderlands3 r/Bossfight r/boston r/bostonceltics r/Botchedsurgeries r/bouldering r/bourbon r/Boxing r/BoxingStreams r/boxoffice r/BPD r/BrandNewSentence r/brasil r/Brawlstars r/Breadit r/BreadStapledToTrees r/BreadTube r/breakingbad r/BreakUps r/Breath_of_the_Wild r/breathinginformation r/brisbane r/britishproblems r/BritishSuccess r/brockhampton r/Brogress r/brokengifs r/brooklynninenine r/Browns r/brushybrushy r/brutalism r/btc r/Buddhism r/BudgetAudiophile r/budgetfood r/buildapc r/buildapcforme r/buildapcsales r/buildapcsalesuk r/bulletjournal r/Bundesliga r/Bushcraft r/business r/BuyItForLife r/C25K r/CabinPorn r/cableporn r/Calgary r/California r/Calligraphy r/CallOfDuty r/calvinandhobbes r/camping r/CampingandHiking r/CampingGear r/canada r/CanadaPolitics r/cannabis r/CannabisExtracts r/cardano r/cardistry r/cardsagainsthumanity r/careerguidance r/carporn r/cars r/Cartalk r/castiron r/castles r/CasualConversation r/casualiama r/CasualUK r/CatastrophicFailure r/catbellies r/Catculations r/CatGifs r/Catholicism r/Catloaf r/catpictures r/catpranks r/cats r/CatsAreAssholes r/catsareliquid r/CatsISUOTTATFO r/CatSlaps r/catsonglass r/CatsStandingUp r/Catswhoyell r/Catswithjobs r/CatTaps r/CBD r/CBDOilReviews r/ccna r/CCW r/Celebhub r/Celebs r/cemu r/CFB r/CFBStreams r/CGPGrey r/chairsunderwater r/changemyview r/chaoticgood r/ChapoTrapHouse r/characterdrawing r/Cheap_Meals r/CheeseandRiceReddit r/chelseafc r/chemicalreactiongifs r/chemistry r/chess r/CHIBears r/chicago r/chicagobulls r/childfree r/ChildrenFallingOver r/chile r/China r/Chonkers r/ChoosingBeggars r/Christianity r/chrome r/Chromecast r/chromeos r/churning r/cigars r/Cinemagraphs r/cinematography r/circlejerk r/CircleofTrust r/CitiesSkylines r/CityPorn r/civ r/ClashOfClans r/ClashRoyale r/classic4chan r/classicalmusic r/classiccars r/classicwow r/ClassyPornstars r/cleanjokes r/clevelandcavs r/clevercomebacks r/climbing r/Coachella r/coaxedintoasnafu r/cocktails r/CoDCompetitive r/coding r/CODZombies r/Coffee r/cogsci r/collapse r/college r/CollegeBasketball r/Colorado r/coloringcorruptions r/Colorization r/ColorizedHistory r/CombatFootage r/combinedgifsr/comedy r/ComedyCemetery r/comedyheaven r/comedyhomicide r/comedynecromancy r/ComedyNecrophilia r/comicbookmovies r/comicbooks r/comics r/CommercialCuts r/communism r/communism101 r/community r/CompanyBattles r/CompetitiveHS r/Competitiveoverwatch r/COMPLETEANARCHY r/compsci r/computers r/computerscience r/confession r/confessions r/confidence r/confusing_perspective r/CongratsLikeImFive r/Conservative r/conspiracy r/conspiracytheories r/conspiratard r/consulting r/ContagiousLaughter r/continuityporn r/controllablewebcams r/ConvenientCop r/Cooking r/cookingforbeginners r/coolguides r/copypasta r/cordcutters r/corgi r/CorporateFacepalm r/cosplay r/cosplaybabes r/cosplaygirls r/coupons r/cowboys r/CowChop r/CozyPlaces r/cpp r/CrackWatch r/crafts r/CrappyDesign r/crappyoffbrands r/CrazyIdeas r/creepy r/creepyasterisks r/creepyencounters r/creepypasta r/creepyPMs r/CreepyWikipedia r/CrewsCrew r/Cricket r/cringe r/cringepics r/Cringetopia r/criticalrole r/crochet r/crossdressing r/crossfit r/CrossStitch r/CruciblePlaybook r/CrusaderKings r/crypto r/Crypto_Currency_News r/CryptoCurrencies r/CryptoCurrency r/CryptoCurrencyTrading r/CryptoMarkets r/cscareerquestions r/csgo r/csharp r/css r/Cubers r/curledfeetsies r/curlyhair r/Cursed_Images r/cursedcomments r/cursedimages r/cursedvideos r/customhearthstone r/CyanideandHappiness r/Cyberpunk r/cyberpunkgame r/cybersecurity r/cycling r/Cynicalbrit\".split(\" \").map((word) => word.replace(\"r/\", \"\"));\r\nexports.imageSubReddits = \"r/fashionphotography r/filmphotography r/lomography r/photoassignments r/Photoessay r/photographers r/photojournalism r/portraitphotos r/ProPhotoTips r/whatcamerashouldibuy r/photographic r/shutterbugs r/cameras r/postprocessing r/raweddits r/photos r/pics r/catpictures r/beerporn r/EarthPorn r/portraits r/video r/redditor_pics r/pics2 r/1000words r/ratemypic r/Unbelievable r/GreatPics r/foodshots r/LondonPics r/Decade r/RedditorsInAction r/urbanexploration r/picss r/ChicagoPics r/imgur r/Pentax r/weedpics r/CoolPics r/AnythingYouCanTakeAPhotographOfPorn r/analog r/hdr r/ToyCamera\".split(\" \").map((word) => word.replace(\"r/\", \"\"));\r\n\n\n//# sourceURL=webpack://post-creator/./node_modules/justreddit/build/types/options.js?");

/***/ }),

/***/ "./node_modules/justreddit/build/types/post.js":
/*!*****************************************************!*\
  !*** ./node_modules/justreddit/build/types/post.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\n\n\n//# sourceURL=webpack://post-creator/./node_modules/justreddit/build/types/post.js?");

/***/ }),

/***/ "./node_modules/justreddit/build/types/sub.js":
/*!****************************************************!*\
  !*** ./node_modules/justreddit/build/types/sub.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\n\n\n//# sourceURL=webpack://post-creator/./node_modules/justreddit/build/types/sub.js?");

/***/ }),

/***/ "./node_modules/node-fetch/browser.js":
/*!********************************************!*\
  !*** ./node_modules/node-fetch/browser.js ***!
  \********************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";
eval("\n\n// ref: https://github.com/tc39/proposal-global\nvar getGlobal = function () {\n\t// the only reliable means to get the global object is\n\t// `Function('return this')()`\n\t// However, this causes CSP violations in Chrome apps.\n\tif (typeof self !== 'undefined') { return self; }\n\tif (typeof window !== 'undefined') { return window; }\n\tif (typeof __webpack_require__.g !== 'undefined') { return __webpack_require__.g; }\n\tthrow new Error('unable to locate global object');\n}\n\nvar globalObject = getGlobal();\n\nmodule.exports = exports = globalObject.fetch;\n\n// Needed for TypeScript and Webpack.\nif (globalObject.fetch) {\n\texports[\"default\"] = globalObject.fetch.bind(globalObject);\n}\n\nexports.Headers = globalObject.Headers;\nexports.Request = globalObject.Request;\nexports.Response = globalObject.Response;\n\n\n//# sourceURL=webpack://post-creator/./node_modules/node-fetch/browser.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const justreddit = __webpack_require__(/*! justreddit */ \"./node_modules/justreddit/build/index.js\");\nvar canvas = document.getElementById(\"canvas\");\nconst ctx = canvas.getContext(\"2d\");\nvar CanvasTextWrapper = (__webpack_require__(/*! canvas-text-wrapper */ \"./node_modules/canvas-text-wrapper/canvas-text-wrapper.js\").CanvasTextWrapper);\n\nconst git = document.getElementById(\"git\");\nconst sub = document.getElementById(\"subreddit\");\nconst img_padding = document.getElementById(\"img-padding\"); img_padding.value = \"30\";\nconst html_text = document.getElementById(\"text\");\nconst yenile = document.getElementById(\"yenile\");\nconst text_size = document.getElementById(\"text-size\"); text_size.value = \"30\";\nconst text_font = document.getElementById(\"text-font\"); text_font.value = \"OpenSans\";\nconst text_color = document.getElementById(\"text-color\"); text_color.value = \"#FFFFFF\";\nconst gradient_color = document.getElementById(\"gradient-color\"); gradient_color.value = \"#0000FF\";\nconst gradient_check = document.getElementById(\"gradient-check\"); gradient_check.ariaChecked = true;\nconst gradient_start = document.getElementById(\"gradient-start\"); gradient_start.value = \"50\";\nconst resim_dosyasi = document.getElementById(\"resim-dosyasi\");\nvar currentImage = \"\";\n\nasync function getRandomPost(subreddit) {\n  let post = await justreddit.randomPostFromSub({\n    subReddit:subreddit,\n    sortType:\"new\",\n    postGetLimit: 100000\n  })\n  console.log(post.image);\n  if(post.image && post.image.match(/redd.it(?=.*jpg|.*png)/)) {\n    return post;\n  }else {\n    return await getRandomPost(subreddit);\n  }\n}\n\nfunction PutTextOnImage(url, text, options, imagePadding, textColor, gradientColor, gradient, gradiantStart) {\n  var img = new Image();\n  img.onload = async function() {\n    ctx.canvas.height = img.height+imagePadding;\n    ctx.canvas.width = img.width;\n    ctx.drawImage(await createImageBitmap(img), 0, 0);\n    if(gradient === true) {\n      console.log(parseInt(ctx.canvas.height*(1-gradiantStart)), gradiantStart);\n      const gradient = ctx.createLinearGradient(0, parseInt(ctx.canvas.height*(1-gradiantStart)), 0, ctx.canvas.height);\n      gradient.addColorStop(0, 'transparent');     // Start color\n      gradient.addColorStop(1, gradientColor);    // End color\n    ctx.fillStyle = gradient;\n    ctx.fillRect(0, 0, canvas.width, canvas.height);\n    }else {\n      ctx.fillStyle = gradientColor;\n      ctx.fillRect(0, img.height, canvas.width, canvas.height);\n    }\n    ctx.fillStyle = textColor;\n    CanvasTextWrapper(ctx.canvas, text, options)\n  };\n  img.src = url;\n}\n\n\ngit.addEventListener('click', ()=>{\n  getRandomPost(sub.value).then(async(post)=>{\n    currentImage = post.image;\n    html_text.value = post.title;\n    resim_dosyasi.url = post.image;\n    console.log(text_size.value+' px '+text_font.value);\n    PutTextOnImage(post.image, post.title, {font: text_size.value+'px '+text_font.value, verticalAlign:\"bottom\", paddingX:20, paddingY:20}, parseInt(img_padding.value), text_color.value, gradient_color.value, gradient_check.checked, parseInt(gradient_start.value)/100)\n  });\n})\n\nyenile.addEventListener('click', ()=>{\n  if(resim_dosyasi.files.length !== 0) {\n    if (resim_dosyasi.files && resim_dosyasi.files[0]) {\n      var reader = new FileReader();\n      reader.onload = function (e) {\n        currentImage = e.target.result;\n      }\n      reader.readAsDataURL(resim_dosyasi.files[0]);\n    }\n  }\n  PutTextOnImage(currentImage, html_text.value, {font: text_size.value+'px '+text_font.value, verticalAlign:\"bottom\", paddingX:20, paddingY:20}, parseInt(img_padding.value), text_color.value, gradient_color.value, gradient_check.checked, parseInt(gradient_start.value)/100)\n})\n\n\n//# sourceURL=webpack://post-creator/./src/index.js?");

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;