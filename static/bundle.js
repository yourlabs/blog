/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.sass */ "./main.sass");
/* harmony import */ var _main_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_main_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var loading_attribute_polyfill_loading_attribute_polyfill_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! loading-attribute-polyfill/loading-attribute-polyfill.js */ "./node_modules/loading-attribute-polyfill/loading-attribute-polyfill.js");
/* harmony import */ var loading_attribute_polyfill_loading_attribute_polyfill_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(loading_attribute_polyfill_loading_attribute_polyfill_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var instantclick__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! instantclick */ "./node_modules/instantclick/dist/instantclick.js");
/* harmony import */ var instantclick__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(instantclick__WEBPACK_IMPORTED_MODULE_2__);



var links = document.getElementsByTagName("a");
var sites = ['yourlabs.org', 'yourlabs.fr', window.location.hostname]
for (var i = 0, linksLength = links.length; i < linksLength; i++) {
  if (sites.indexOf(links[i].hostname) < 0) {
    links[i].target = '_blank';
  }
  if (links[i].pathname == window.location.pathname && links[i].hostname == window.location.hostname) {
    if (links[i].childNodes.length > 1) continue // it's an image or something we don't want to underline
    links[i].classList.add('active')
  }
}


instantclick__WEBPACK_IMPORTED_MODULE_2___default.a.init()
var dnt = (navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack);
var doNotTrack = (dnt == "1" || dnt == "yes");
if (!doNotTrack) {
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
  ga('create', 'UA-169189134-1', 'auto');
  ga('set', 'anonymizeIp', true);
  ga('send', 'pageview');
}


/***/ }),

/***/ "./main.sass":
/*!*******************!*\
  !*** ./main.sass ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/instantclick/dist/instantclick.js":
/*!********************************************************!*\
  !*** ./node_modules/instantclick/dist/instantclick.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

/* InstantClick 3.1.0 | (C) 2014-2017 Alexandre Dieulot | http://instantclick.io/license */

var instantclick;
var InstantClick = instantclick = function(document, location, $userAgent) {
  // Internal variables
  var $currentLocationWithoutHash
    , $urlToPreload
    , $preloadTimer
    , $lastTouchTimestamp
    , $hasBeenInitialized
    , $touchEndedWithoutClickTimer
    , $lastUsedTimeoutId = 0

  // Preloading-related variables
    , $history = {}
    , $xhr
    , $url = false
    , $title = false
    , $isContentTypeNotHTML
    , $areTrackedElementsDifferent
    , $body = false
    , $lastDisplayTimestamp = 0
    , $isPreloading = false
    , $isWaitingForCompletion = false
    , $gotANetworkError = false
    , $trackedElementsData = []

  // Variables defined by public functions
    , $preloadOnMousedown
    , $delayBeforePreload = 65
    , $eventsCallbacks = {
        preload: [],
        receive: [],
        wait: [],
        change: [],
        restore: [],
        exit: []
      }
    , $timers = {}
    , $currentPageXhrs = []
    , $windowEventListeners = {}
    , $delegatedEvents = {};


  ////////// POLYFILL //////////


  // Needed for `addEvent`
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      function (selector) {
        var this$1 = this;

        var matches = document.querySelectorAll(selector);
        for (var i = 0; i < matches.length; i++) {
          if (matches[i] == this$1) {
            return true
          }
        }
        return false
      };
  }


  ////////// HELPERS //////////


  function removeHash(url) {
    var index = url.indexOf('#');
    if (index == -1) {
      return url
    }
    return url.substr(0, index)
  }

  function getParentLinkElement(element) {
    while (element && element.nodeName != 'A') {
      element = element.parentNode;
    }
    // `element` will be null if no link element is found
    return element
  }

  function isBlacklisted(element) {
    do {
      if (!element.hasAttribute) { // Parent of <html>
        break
      }
      if (element.hasAttribute('data-instant')) {
        return false
      }
      if (element.hasAttribute('data-no-instant')) {
        return true
      }
    }
    while (element = element.parentNode)
    return false
  }

  function isPreloadable(linkElement) {
    var domain = location.protocol + '//' + location.host;

    if (linkElement.target // target="_blank" etc.
        || linkElement.hasAttribute('download')
        || linkElement.href.indexOf(domain + '/') != 0 // Another domain, or no href attribute
        || (linkElement.href.indexOf('#') > -1
            && removeHash(linkElement.href) == $currentLocationWithoutHash) // Anchor
        || isBlacklisted(linkElement)
       ) {
      return false
    }
    return true
  }

  function triggerPageEvent(eventType) {
    var argumentsToApply = Array.prototype.slice.call(arguments, 1)
      , returnValue = false;
    for (var i = 0; i < $eventsCallbacks[eventType].length; i++) {
      if (eventType == 'receive') {
        var altered = $eventsCallbacks[eventType][i].apply(window, argumentsToApply);
        if (altered) {
          // Update arguments for the next iteration of the loop.
          if ('body' in altered) {
            argumentsToApply[1] = altered.body;
          }
          if ('title' in altered) {
            argumentsToApply[2] = altered.title;
          }

          returnValue = altered;
        }
      }
      else {
        $eventsCallbacks[eventType][i].apply(window, argumentsToApply);
      }
    }
    return returnValue
  }

  function changePage(title, body, urlToPush, scrollPosition) {
    abortCurrentPageXhrs();

    document.documentElement.replaceChild(body, document.body);
    // We cannot just use `document.body = doc.body`, it causes Safari (tested
    // 5.1, 6.0 and Mobile 7.0) to execute script tags directly.

    document.title = title;

    if (urlToPush) {
      addOrRemoveWindowEventListeners('remove');
      if (urlToPush != location.href) {
        history.pushState(null, null, urlToPush);

        if ($userAgent.indexOf(' CriOS/') > -1) {
          // Chrome for iOS:
          //
          // 1. Removes title in tab on pushState, so it needs to be set after.
          //
          // 2. Will not set the title if it's identical after trimming, so we
          //    add a non-breaking space.
          if (document.title == title) {
            document.title = title + String.fromCharCode(160);
          }
          else {
            document.title = title;
          }
        }
      }

      var hashIndex = urlToPush.indexOf('#')
        , offsetElement = hashIndex > -1
                     && document.getElementById(urlToPush.substr(hashIndex + 1))
        , offset = 0;

      if (offsetElement) {
        while (offsetElement.offsetParent) {
          offset += offsetElement.offsetTop;

          offsetElement = offsetElement.offsetParent;
        }
      }
      if ('requestAnimationFrame' in window) {
        // Safari on macOS doesn't immediately visually change the page on
        // `document.documentElement.replaceChild`, so if `scrollTo` is called
        // without `requestAnimationFrame` it often scrolls before the page
        // is displayed.
        requestAnimationFrame(function() {
          scrollTo(0, offset);
        });
      }
      else {
        scrollTo(0, offset);
        // Safari on macOS scrolls before the page is visually changed, but
        // adding `requestAnimationFrame` doesn't fix it in this case.
      }

      clearCurrentPageTimeouts();

      $currentLocationWithoutHash = removeHash(urlToPush);

      if ($currentLocationWithoutHash in $windowEventListeners) {
        $windowEventListeners[$currentLocationWithoutHash] = [];
      }

      $timers[$currentLocationWithoutHash] = {};

      applyScriptElements(function(element) {
        return !element.hasAttribute('data-instant-track')
      });

      triggerPageEvent('change', false);
    }
    else {
      // On popstate, browsers scroll by themselves, but at least Firefox
      // scrolls BEFORE popstate is fired and thus before we can replace the
      // page. If the page before popstate is too short the user won't be
      // scrolled at the right position as a result. We need to scroll again.
      scrollTo(0, scrollPosition);

      // iOS's gesture to go back by swiping from the left edge of the screen
      // will start a preloading if the user touches a link, it needs to be
      // cancelled otherwise the page behind the touched link will be
      // displayed.
      $xhr.abort();
      setPreloadingAsHalted();

      applyScriptElements(function(element) {
        return element.hasAttribute('data-instant-restore')
      });

      restoreTimers();

      triggerPageEvent('restore');
    }
  }

  function setPreloadingAsHalted() {
    $isPreloading = false;
    $isWaitingForCompletion = false;
  }

  function removeNoscriptTags(html) {
    // Must be done on text, not on a node's innerHTML, otherwise strange
    // things happen with implicitly closed elements (see the Noscript test).
    return html.replace(/<noscript[\s\S]+?<\/noscript>/gi, '')
  }

  function abortCurrentPageXhrs() {
    for (var i = 0; i < $currentPageXhrs.length; i++) {
      if (typeof $currentPageXhrs[i] == 'object' && 'abort' in $currentPageXhrs[i]) {
        $currentPageXhrs[i].instantclickAbort = true;
        $currentPageXhrs[i].abort();
      }
    }
    $currentPageXhrs = [];
  }

  function clearCurrentPageTimeouts() {
    for (var i in $timers[$currentLocationWithoutHash]) {
      var timeout = $timers[$currentLocationWithoutHash][i];
      window.clearTimeout(timeout.realId);
      timeout.delayLeft = timeout.delay - +new Date + timeout.timestamp;
    }
  }

  function restoreTimers() {
    for (var i in $timers[$currentLocationWithoutHash]) {
      if (!('delayLeft' in $timers[$currentLocationWithoutHash][i])) {
        continue
      }
      var args = [
        $timers[$currentLocationWithoutHash][i].callback,
        $timers[$currentLocationWithoutHash][i].delayLeft
      ];
      for (var j = 0; j < $timers[$currentLocationWithoutHash][i].params.length; j++) {
        args.push($timers[$currentLocationWithoutHash][i].params[j]);
      }
      addTimer(args, $timers[$currentLocationWithoutHash][i].isRepeating, $timers[$currentLocationWithoutHash][i].delay);
      delete $timers[$currentLocationWithoutHash][i];
    }
  }

  function handleTouchendWithoutClick() {
    $xhr.abort();
    setPreloadingAsHalted();
  }

  function addOrRemoveWindowEventListeners(addOrRemove) {
    if ($currentLocationWithoutHash in $windowEventListeners) {
      for (var i = 0; i < $windowEventListeners[$currentLocationWithoutHash].length; i++) {
        window[addOrRemove + 'EventListener'].apply(window, $windowEventListeners[$currentLocationWithoutHash][i]);
      }
    }
  }

  function applyScriptElements(condition) {
    var scriptElementsInDOM = document.body.getElementsByTagName('script')
      , scriptElementsToCopy = []
      , originalElement
      , copyElement
      , parentNode
      , nextSibling
      , i;

    // `scriptElementsInDOM` will change during the copy of scripts if
    // a script add or delete script elements, so we need to put script
    // elements in an array to loop through them correctly.
    for (i = 0; i < scriptElementsInDOM.length; i++) {
      scriptElementsToCopy.push(scriptElementsInDOM[i]);
    }

    for (i = 0; i < scriptElementsToCopy.length; i++) {
      originalElement = scriptElementsToCopy[i];
      if (!originalElement) { // Might have disappeared, see previous comment
        continue
      }
      if (!condition(originalElement)) {
        continue
      }

      copyElement = document.createElement('script');
      for (var j = 0; j < originalElement.attributes.length; j++) {
        copyElement.setAttribute(originalElement.attributes[j].name, originalElement.attributes[j].value);
      }
      copyElement.textContent = originalElement.textContent;

      parentNode = originalElement.parentNode;
      nextSibling = originalElement.nextSibling;
      parentNode.removeChild(originalElement);
      parentNode.insertBefore(copyElement, nextSibling);
    }
  }

  function addTrackedElements() {
    var trackedElements = document.querySelectorAll('[data-instant-track]')
      , element
      , elementData;
    for (var i = 0; i < trackedElements.length; i++) {
      element = trackedElements[i];
      elementData = element.getAttribute('href') || element.getAttribute('src') || element.textContent;
      // We can't use just `element.href` and `element.src` because we can't
      // retrieve `href`s and `src`s from the Ajax response.
      $trackedElementsData.push(elementData);
    }
  }

  function addTimer(args, isRepeating, realDelay) {
    var callback = args[0]
      , delay = args[1]
      , params = [].slice.call(args, 2)
      , timestamp = +new Date;

    $lastUsedTimeoutId++;
    var id = $lastUsedTimeoutId;

    var callbackModified;
    if (isRepeating) {
      callbackModified = function(args2) {
        callback(args2);
        delete $timers[$currentLocationWithoutHash][id];
        args[0] = callback;
        args[1] = delay;
        addTimer(args, true);
      };
    }
    else {
      callbackModified = function(args2) {
        callback(args2);
        delete $timers[$currentLocationWithoutHash][id];
      };
    }

    args[0] = callbackModified;
    if (realDelay != undefined) {
      timestamp += delay - realDelay;
      delay = realDelay;
    }
    var realId = window.setTimeout.apply(window, args);
    $timers[$currentLocationWithoutHash][id] = {
      realId: realId,
      timestamp: timestamp,
      callback: callback,
      delay: delay,
      params: params,
      isRepeating: isRepeating
    };
    return -id
  }


  ////////// EVENT LISTENERS //////////


  function mousedownListener(event) {
    var linkElement = getParentLinkElement(event.target);

    if (!linkElement || !isPreloadable(linkElement)) {
      return
    }

    preload(linkElement.href);
  }

  function mouseoverListener(event) {
    if ($lastTouchTimestamp > (+new Date - 500)) {
      // On a touch device, if the content of the page change on mouseover
      // click is never fired and the user will need to tap a second time.
      // https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW4
      //
      // Content change could happen in the `preload` event, so we stop there.
      return
    }

    if (+new Date - $lastDisplayTimestamp < 100) {
      // After a page is displayed, if the user's cursor happens to be above
      // a link a mouseover event will be in most browsers triggered
      // automatically, and in other browsers it will be triggered when the
      // user moves his mouse by 1px.
      //
      // Here are the behaviors I noticed, all on Windows:
      // - Safari 5.1: auto-triggers after 0 ms
      // - IE 11: auto-triggers after 30-80 ms (depends on page's size?)
      // - Firefox: auto-triggers after 10 ms
      // - Opera 18: auto-triggers after 10 ms
      //
      // - Chrome: triggers when cursor moved
      // - Opera 12.16: triggers when cursor moved
      //
      // To remedy to this, we do nothing if the last display occurred less
      // than 100 ms ago.

      return
    }

    var linkElement = getParentLinkElement(event.target);

    if (!linkElement) {
      return
    }

    if (linkElement == getParentLinkElement(event.relatedTarget)) {
      // Happens when mouseout-ing and mouseover-ing child elements of the same link element
      return
    }

    if (!isPreloadable(linkElement)) {
      return
    }

    linkElement.addEventListener('mouseout', mouseoutListener);

    if (!$isWaitingForCompletion) {
      $urlToPreload = linkElement.href;
      $preloadTimer = setTimeout(preload, $delayBeforePreload);
    }
  }

  function touchstartListener(event) {
    $lastTouchTimestamp = +new Date;

    var linkElement = getParentLinkElement(event.target);

    if (!linkElement || !isPreloadable(linkElement)) {
      return
    }

    if ($touchEndedWithoutClickTimer) {
      clearTimeout($touchEndedWithoutClickTimer);
      $touchEndedWithoutClickTimer = false;
    }

    linkElement.addEventListener('touchend', touchendAndTouchcancelListener);
    linkElement.addEventListener('touchcancel', touchendAndTouchcancelListener);

    preload(linkElement.href);
  }

  function clickListenerPrelude() {
    // Makes clickListener be fired after everyone else, so that we can respect
    // event.preventDefault.
    document.addEventListener('click', clickListener);
  }

  function clickListener(event) {
    document.removeEventListener('click', clickListener);

    if ($touchEndedWithoutClickTimer) {
      clearTimeout($touchEndedWithoutClickTimer);
      $touchEndedWithoutClickTimer = false;
    }

    if (event.defaultPrevented) {
      return
    }

    var linkElement = getParentLinkElement(event.target);

    if (!linkElement || !isPreloadable(linkElement)) {
      return
    }

    // Check if it's opening in a new tab
    if (event.button != 0 // Chrome < 55 fires a click event when the middle mouse button is pressed
      || event.metaKey
      || event.ctrlKey) {
      return
    }
    event.preventDefault();
    display(linkElement.href);
  }

  function mouseoutListener(event) {
    if (getParentLinkElement(event.target) == getParentLinkElement(event.relatedTarget)) {
      // Happens when mouseout-ing and mouseover-ing child elements of the same link element,
      // we don't want to stop preloading then.
      return
    }

    if ($preloadTimer) {
      clearTimeout($preloadTimer);
      $preloadTimer = false;
      return
    }

    if (!$isPreloading || $isWaitingForCompletion) {
      return
    }

    $xhr.abort();
    setPreloadingAsHalted();
  }

  function touchendAndTouchcancelListener(event) {
    if (!$isPreloading || $isWaitingForCompletion) {
      return
    }

    $touchEndedWithoutClickTimer = setTimeout(handleTouchendWithoutClick, 500);
  }

  function readystatechangeListener() {
    if ($xhr.readyState == 2) { // headers received
      var contentType = $xhr.getResponseHeader('Content-Type');
      if (!contentType || !/^text\/html/i.test(contentType)) {
        $isContentTypeNotHTML = true;
      }
    }

    if ($xhr.readyState < 4) {
      return
    }

    if ($xhr.status == 0) {
      // Request error/timeout/abort
      $gotANetworkError = true;
      if ($isWaitingForCompletion) {
        triggerPageEvent('exit', $url, 'network error');
        location.href = $url;
      }
      return
    }

    if ($isContentTypeNotHTML) {
      if ($isWaitingForCompletion) {
        triggerPageEvent('exit', $url, 'non-html content-type');
        location.href = $url;
      }
      return
    }

    var doc = document.implementation.createHTMLDocument('');
    doc.documentElement.innerHTML = removeNoscriptTags($xhr.responseText);
    $title = doc.title;
    $body = doc.body;

    var alteredOnReceive = triggerPageEvent('receive', $url, $body, $title);
    if (alteredOnReceive) {
      if ('body' in alteredOnReceive) {
        $body = alteredOnReceive.body;
      }
      if ('title' in alteredOnReceive) {
        $title = alteredOnReceive.title;
      }
    }

    var urlWithoutHash = removeHash($url);
    $history[urlWithoutHash] = {
      body: $body,
      title: $title,
      scrollPosition: urlWithoutHash in $history ? $history[urlWithoutHash].scrollPosition : 0
    };

    var trackedElements = doc.querySelectorAll('[data-instant-track]')
      , element
      , elementData;

    if (trackedElements.length != $trackedElementsData.length) {
      $areTrackedElementsDifferent = true;
    }
    else {
      for (var i = 0; i < trackedElements.length; i++) {
        element = trackedElements[i];
        elementData = element.getAttribute('href') || element.getAttribute('src') || element.textContent;
        if ($trackedElementsData.indexOf(elementData) == -1) {
          $areTrackedElementsDifferent = true;
        }
      }
    }

    if ($isWaitingForCompletion) {
      $isWaitingForCompletion = false;
      display($url);
    }
  }

  function popstateListener() {
    var loc = removeHash(location.href);
    if (loc == $currentLocationWithoutHash) {
      return
    }

    if ($isWaitingForCompletion) {
      setPreloadingAsHalted();
      $xhr.abort();
    }

    if (!(loc in $history)) {
      triggerPageEvent('exit', location.href, 'not in history');
      if (loc == location.href) { // no location.hash
        location.href = location.href;
        // Reloads the page while using cache for scripts, styles and images,
        // unlike `location.reload()`
      }
      else {
        // When there's a hash, `location.href = location.href` won't reload
        // the page (but will trigger a popstate event, thus causing an infinite
        // loop), so we need to call `location.reload()`
        location.reload();
      }
      return
    }

    $history[$currentLocationWithoutHash].scrollPosition = pageYOffset;
    clearCurrentPageTimeouts();
    addOrRemoveWindowEventListeners('remove');
    $currentLocationWithoutHash = loc;
    changePage($history[loc].title, $history[loc].body, false, $history[loc].scrollPosition);
    addOrRemoveWindowEventListeners('add');
  }


  ////////// MAIN FUNCTIONS //////////


  function preload(url) {
    if ($preloadTimer) {
      clearTimeout($preloadTimer);
      $preloadTimer = false;
    }

    if (!url) {
      url = $urlToPreload;
    }

    if ($isPreloading && (url == $url || $isWaitingForCompletion)) {
      return
    }
    $isPreloading = true;
    $isWaitingForCompletion = false;

    $url = url;
    $body = false;
    $isContentTypeNotHTML = false;
    $gotANetworkError = false;
    $areTrackedElementsDifferent = false;
    triggerPageEvent('preload');
    $xhr.open('GET', url);
    $xhr.timeout = 90000; // Must be set after `open()` with IE
    $xhr.send();
  }

  function display(url) {
    $lastDisplayTimestamp = +new Date;
    if ($preloadTimer || !$isPreloading) {
      // $preloadTimer:
      // Happens when there's a delay before preloading and that delay
      // hasn't expired (preloading didn't kick in).
      //
      // !$isPreloading:
      // A link has been clicked, and preloading hasn't been initiated.
      // It happens with touch devices when a user taps *near* the link,
      // causing `touchstart` not to be fired. Safari/Chrome will trigger
      // `mouseover`, `mousedown`, `click` (and others), but when that happens
      // we do nothing in `mouseover` as it may cause `click` not to fire (see
      // comment in `mouseoverListener`).
      //
      // It also happens when a user uses his keyboard to navigate (with Tab
      // and Return), and possibly in other non-mainstream ways to navigate
      // a website.

      if ($preloadTimer && $url && $url != url) {
        // Happens when the user clicks on a link before preloading
        // kicks in while another link is already preloading.

        triggerPageEvent('exit', url, 'click occured while preloading planned');
        location.href = url;
        return
      }

      preload(url);
      triggerPageEvent('wait');
      $isWaitingForCompletion = true; // Must be set *after* calling `preload`
      return
    }
    if ($isWaitingForCompletion) {
      // The user clicked on a link while a page to display was preloading.
      // Either on the same link or on another link. If it's the same link
      // something might have gone wrong (or he could have double clicked, we
      // don't handle that case), so we send him to the page without pjax.
      // If it's another link, it hasn't been preloaded, so we redirect the
      // user to it.
      triggerPageEvent('exit', url, 'clicked on a link while waiting for another page to display');
      location.href = url;
      return
    }
    if ($isContentTypeNotHTML) {
      triggerPageEvent('exit', $url, 'non-html content-type');
      location.href = $url;
      return
    }
    if ($gotANetworkError) {
      triggerPageEvent('exit', $url, 'network error');
      location.href = $url;
      return
    }
    if ($areTrackedElementsDifferent) {
      triggerPageEvent('exit', $url, 'different assets');
      location.href = $url;
      return
    }
    if (!$body) {
      triggerPageEvent('wait');
      $isWaitingForCompletion = true;
      return
    }
    $history[$currentLocationWithoutHash].scrollPosition = pageYOffset;
    setPreloadingAsHalted();
    changePage($title, $body, $url);
  }


  ////////// PUBLIC VARIABLE AND FUNCTIONS //////////


  var supported = false;
  if ('pushState' in history
      && location.protocol != "file:") {
    supported = true;

    var indexOfAndroid = $userAgent.indexOf('Android ');
    if (indexOfAndroid > -1) {
      // The stock browser in Android 4.0.3 through 4.3.1 supports pushState,
      // though it doesn't update the address bar.
      //
      // More problematic is that it has a bug on `popstate` when coming back
      // from a page not displayed through InstantClick: `location.href` is
      // undefined and `location.reload()` doesn't work.
      //
      // Android < 4.4 is therefore blacklisted, unless it's a browser known
      // not to have that latter bug.

      var androidVersion = parseFloat($userAgent.substr(indexOfAndroid + 'Android '.length));
      if (androidVersion < 4.4) {
        supported = false;
        if (androidVersion >= 4) {
          var whitelistedBrowsersUserAgentsOnAndroid4 = [
            / Chrome\//, // Chrome, Opera, Puffin, QQ, Yandex
            / UCBrowser\//,
            / Firefox\//,
            / Windows Phone / ];
          for (var i = 0; i < whitelistedBrowsersUserAgentsOnAndroid4.length; i++) {
            if (whitelistedBrowsersUserAgentsOnAndroid4[i].test($userAgent)) {
              supported = true;
              break
            }
          }
        }
      }
    }
  }

  function init(preloadingMode) {
    if (!supported) {
      triggerPageEvent('change', true);
      return
    }

    if ($hasBeenInitialized) {
      return
    }
    $hasBeenInitialized = true;

    if (preloadingMode == 'mousedown') {
      $preloadOnMousedown = true;
    }
    else if (typeof preloadingMode == 'number') {
      $delayBeforePreload = preloadingMode;
    }

    $currentLocationWithoutHash = removeHash(location.href);
    $timers[$currentLocationWithoutHash] = {};
    $history[$currentLocationWithoutHash] = {
      body: document.body,
      title: document.title,
      scrollPosition: pageYOffset
    };

    if (document.readyState == 'loading') {
      document.addEventListener('DOMContentLoaded', addTrackedElements);
    }
    else {
      addTrackedElements();
    }

    $xhr = new XMLHttpRequest();
    $xhr.addEventListener('readystatechange', readystatechangeListener);

    document.addEventListener('touchstart', touchstartListener, true);
    if ($preloadOnMousedown) {
      document.addEventListener('mousedown', mousedownListener, true);
    }
    else {
      document.addEventListener('mouseover', mouseoverListener, true);
    }
    document.addEventListener('click', clickListenerPrelude, true);

    addEventListener('popstate', popstateListener);
  }

  function on(eventType, callback) {
    $eventsCallbacks[eventType].push(callback);

    if (eventType == 'change') {
      callback(!$lastDisplayTimestamp);
    }
  }

  function setTimeout() {
    return addTimer(arguments, false)
  }

  function setInterval() {
    return addTimer(arguments, true)
  }

  function clearTimeout(id) {
    id = -id;
    for (var loc in $timers) {
      if (id in $timers[loc]) {
        window.clearTimeout($timers[loc][id].realId);
        delete $timers[loc][id];
      }
    }
  }

  function xhr(xhr) {
    $currentPageXhrs.push(xhr);
  }

  function addPageEvent() {
    if (!($currentLocationWithoutHash in $windowEventListeners)) {
      $windowEventListeners[$currentLocationWithoutHash] = [];
    }
    $windowEventListeners[$currentLocationWithoutHash].push(arguments);
    addEventListener.apply(window, arguments);
  }

  function removePageEvent() {
    var arguments$1 = arguments;

    if (!($currentLocationWithoutHash in $windowEventListeners)) {
      return
    }
    firstLoop:
    for (var i = 0; i < $windowEventListeners[$currentLocationWithoutHash].length; i++) {
      if (arguments$1.length != $windowEventListeners[$currentLocationWithoutHash][i].length) {
        continue
      }
      for (var j = 0; j < $windowEventListeners[$currentLocationWithoutHash][i].length; j++) {
        if (arguments$1[j] != $windowEventListeners[$currentLocationWithoutHash][i][j]) {
          continue firstLoop
        }
      }
      $windowEventListeners[$currentLocationWithoutHash].splice(i, 1);
    }
  }

  function addEvent(selector, type, listener) {
    if (!(type in $delegatedEvents)) {
      $delegatedEvents[type] = {};

      document.addEventListener(type, function(event) {
        var element = event.target;
        event.originalStopPropagation = event.stopPropagation;
        event.stopPropagation = function() {
          this.isPropagationStopped = true;
          this.originalStopPropagation();
        };
        while (element && element.nodeType == 1) {
          for (var selector in $delegatedEvents[type]) {
            if (element.matches(selector)) {
              for (var i = 0; i < $delegatedEvents[type][selector].length; i++) {
                $delegatedEvents[type][selector][i].call(element, event);
              }
              if (event.isPropagationStopped) {
                return
              }
              break
            }
          }
          element = element.parentNode;
        }
      }, false); // Third parameter isn't optional in Firefox < 6

      if (type == 'click' && /iP(?:hone|ad|od)/.test($userAgent)) {
        // Force Mobile Safari to trigger the click event on document by adding a pointer cursor to body

        var styleElement = document.createElement('style');
        styleElement.setAttribute('instantclick-mobile-safari-cursor', ''); // So that this style element doesn't surprise developers in the browser DOM inspector.
        styleElement.textContent = 'body { cursor: pointer !important; }';
        document.head.appendChild(styleElement);
      }
    }

    if (!(selector in $delegatedEvents[type])) {
      $delegatedEvents[type][selector] = [];
    }

    // Run removeEvent beforehand so that it can't be added twice
    removeEvent(selector, type, listener);

    $delegatedEvents[type][selector].push(listener);
  }

  function removeEvent(selector, type, listener) {
    var index = $delegatedEvents[type][selector].indexOf(listener);
    if (index > -1) {
      $delegatedEvents[type][selector].splice(index, 1);
    }
  }


  ////////////////////


  return {
    supported: supported,
    init: init,
    on: on,
    setTimeout: setTimeout,
    setInterval: setInterval,
    clearTimeout: clearTimeout,
    xhr: xhr,
    addPageEvent: addPageEvent,
    removePageEvent: removePageEvent,
    addEvent: addEvent,
    removeEvent: removeEvent
  }

}(document, location, navigator.userAgent);

return InstantClick;

})));


/***/ }),

/***/ "./node_modules/loading-attribute-polyfill/loading-attribute-polyfill.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/loading-attribute-polyfill/loading-attribute-polyfill.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * Loading attribute polyfill - https://github.com/mfranzke/loading-attribute-polyfill
 * @license Copyright(c) 2019 by Maximilian Franzke
 * Credits for the initial kickstarter / script to @Sora2455, and supported by @cbirdsong, @eklingen, @DaPo, @nextgenthemes, @diogoterremoto, @dracos, @Flimm, @TomS- and @vinyfc93 - many thanks for that !
 */
/*
 * A minimal and dependency-free vanilla JavaScript loading attribute polyfill.
 * Supports standard's functionality and tests for native support upfront.
 * Elsewhere the functionality gets emulated with the support of noscript wrapper tags.
 * Use an IntersectionObserver polyfill in case of IE11 support necessary.
 */

(function (noscriptClass, rootMargin) {
	'use strict';

	var config = {
		// Start download if the item gets within 256px in the Y axis
		rootMargin: rootMargin || '0px 0px 256px 0px',
		threshold: 0.01,
		lazyImage: 'img[loading="lazy"]',
		lazyIframe: 'iframe[loading="lazy"]'
	};

	// Device/browser capabilities object
	var capabilities = {
		loading:
			'loading' in HTMLImageElement.prototype &&
			'loading' in HTMLIFrameElement.prototype,
		scrolling: 'onscroll' in window
	};

	// Nodelist foreach polyfill / source: https://stackoverflow.com/a/46929259
	if (
		typeof NodeList !== 'undefined' &&
		NodeList.prototype &&
		!NodeList.prototype.forEach
	) {
		// Yes, there's really no need for `Object.defineProperty` here
		NodeList.prototype.forEach = Array.prototype.forEach;
	}

	// Define according to browsers support of the IntersectionObserver feature (missing e.g. on IE11 or Safari 11)
	var intersectionObserver;

	if ('IntersectionObserver' in window) {
		intersectionObserver = new IntersectionObserver(onIntersection, config);
	}

	// On using a browser w/o requestAnimationFrame support (IE9, Opera Mini), just run the passed function
	var rAFWrapper;

	if ('requestAnimationFrame' in window) {
		rAFWrapper = window.requestAnimationFrame;
	} else {
		rAFWrapper = function (func) {
			func();
		};
	}

	/**
	 * Put the source and srcset back where it belongs - now that the elements content is attached to the document, it will load now
	 * @param {Object} lazyItem Current item to be restored after lazy loading.
	 */
	function restoreSource(lazyItem) {
		var srcsetItems = [];

		// Just in case the img is the decendent of a picture element, check for source tags
		if (lazyItem.parentNode.tagName.toLowerCase() === 'picture') {
			removePlaceholderSource(lazyItem.parentNode);

			srcsetItems = Array.prototype.slice.call(
				lazyItem.parentNode.querySelectorAll('source')
			);
		}

		srcsetItems.push(lazyItem);

		// Not using .dataset within those upfollowing lines of code for polyfill independent compatibility down to IE9
		srcsetItems.forEach(function (item) {
			if (item.hasAttribute('data-lazy-srcset')) {
				item.setAttribute('srcset', item.getAttribute('data-lazy-srcset'));
				item.removeAttribute('data-lazy-srcset'); // Not using delete .dataset here for compatibility down to IE9
			}
		});

		lazyItem.setAttribute('src', lazyItem.getAttribute('data-lazy-src'));
		lazyItem.removeAttribute('data-lazy-src'); // Not using delete .dataset here for compatibility down to IE9
	}

	/**
	 * Remove the source tag preventing the loading of picture assets
	 * @param {Object} lazyItemPicture Current <picture> item to be restored after lazy loading.
	 */
	function removePlaceholderSource(lazyItemPicture) {
		var placeholderSource = lazyItemPicture.querySelector(
			'source[data-lazy-remove]'
		);

		if (placeholderSource) {
			lazyItemPicture.removeChild(placeholderSource); // Preferred .removeChild over .remove here for IE
		}
	}

	/**
	 * Handle IntersectionObservers callback
	 * @param {Object} entries Target elements Intersection observed changes
	 * @param {Object} observer IntersectionObserver instance reference
	 */
	function onIntersection(entries, observer) {
		entries.forEach(function (entry) {
			// Mitigation for EDGE lacking support of .isIntersecting until v15, compare to e.g. https://github.com/w3c/IntersectionObserver/issues/211#issuecomment-309144669
			if (entry.intersectionRatio === 0) {
				return;
			}

			// If the item is visible now, load it and stop watching it
			var lazyItem = entry.target;

			observer.unobserve(lazyItem);

			restoreSource(lazyItem);
		});
	}

	/**
	 * Handle printing the page
	 */
	function onPrinting() {
		if (typeof window.matchMedia === 'undefined') {
			return;
		}

		var mediaQueryList = window.matchMedia('print');

		mediaQueryList.addListener(function (mql) {
			if (mql.matches) {
				document
					.querySelectorAll(
						config.lazyImage +
							'[data-lazy-src],' +
							config.lazyIframe +
							'[data-lazy-src]'
					)
					.forEach(function (lazyItem) {
						restoreSource(lazyItem);
					});
			}
		});
	}

	/**
	 * Get and prepare the HTML code depending on feature detection for both image as well as iframe,
	 * and if not scrolling supported, because it's a Google or Bing Bot
	 * @param {String} lazyAreaHtml Noscript inner HTML code that src-urls need to get rewritten
	 */
	function getAndPrepareHTMLCode(noScriptTag) {
		// The contents of a <noscript> tag are treated as text to JavaScript
		var lazyAreaHtml = noScriptTag.textContent || noScriptTag.innerHTML;

		var getImageWidth = lazyAreaHtml.match(/width=['"](\d+)['"]/) || false;
		var temporaryImageWidth = getImageWidth[1] || 1;
		var getImageHeight = lazyAreaHtml.match(/height=['"](\d+)['"]/) || false;
		var temporaryImageHeight = getImageHeight[1] || 1;

		var temporaryImage =
			'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 ' +
			temporaryImageWidth +
			' ' +
			temporaryImageHeight +
			'%27%3E%3C/svg%3E';

		if (!capabilities.loading && capabilities.scrolling) {
			// Check for IntersectionObserver support
			if (typeof intersectionObserver === 'undefined') {
				// Attach abandonned attribute 'lazyload' to the HTML tags on browsers w/o IntersectionObserver being available
				lazyAreaHtml = lazyAreaHtml.replace(
					/(?:\r\n|\r|\n|\t| )src=/g,
					' lazyload="1" src='
				);
			} else {
				if (noScriptTag.parentNode.tagName.toLowerCase() === 'picture') {
					// Temporarily prevent expensive resource loading by inserting a <source> tag pointing to a simple one (data URI)
					lazyAreaHtml =
						'<source srcset="' +
						temporaryImage +
						'" data-lazy-remove="true"></source>' +
						lazyAreaHtml;
				}

				// Temporarily replace a expensive resource load with a simple one by storing the actual source and srcset for later and point src to a temporary replacement (data URI)
				lazyAreaHtml = lazyAreaHtml
					.replace(/(?:\r\n|\r|\n|\t| )srcset=/g, ' data-lazy-srcset=')
					.replace(
						/(?:\r\n|\r|\n|\t| )src=/g,
						' src="' + temporaryImage + '" data-lazy-src='
					);
			}
		}

		return lazyAreaHtml;
	}

	/**
	 * Retrieve the elements from the 'lazy load' <noscript> tag and prepare them for display
	 * @param {Object} noScriptTag noscript HTML tag that should get initially transformed
	 */
	function prepareElement(noScriptTag) {
		// Sticking the noscript HTML code in the innerHTML of a new <div> tag to 'load' it after creating that <div>
		var lazyArea = document.createElement('div');

		lazyArea.innerHTML = getAndPrepareHTMLCode(noScriptTag);

		// Move all children out of the element
		while (lazyArea.firstChild) {
			if (
				!capabilities.loading &&
				capabilities.scrolling &&
				typeof intersectionObserver !== 'undefined' &&
				lazyArea.firstChild.tagName &&
				(lazyArea.firstChild.tagName.toLowerCase() === 'img' ||
					lazyArea.firstChild.tagName.toLowerCase() === 'iframe')
			) {
				// Observe the item so that loading could start when it gets close to the viewport
				intersectionObserver.observe(lazyArea.firstChild);
			}

			noScriptTag.parentNode.insertBefore(lazyArea.firstChild, noScriptTag);
		}

		// Remove the empty element - not using .remove() here for IE11 compatibility
		noScriptTag.parentNode.removeChild(noScriptTag); // Preferred .removeChild over .remove here for IE
	}

	/**
	 * Get all the <noscript> tags on the page and setup the printing
	 */
	function prepareElements() {
		//
		var lazyLoadAreas = document.querySelectorAll('noscript.' + noscriptClass);

		lazyLoadAreas.forEach(prepareElement);

		// Bind for someone printing the page
		onPrinting();
	}

	// If the page has loaded already, run setup - if it hasn't, run as soon as it has.
	// Use requestAnimationFrame as this will propably cause repaints
	// document.readyState values: https://www.w3schools.com/jsref/prop_doc_readystate.asp
	if (/comp|inter/.test(document.readyState)) {
		rAFWrapper(prepareElements);
	} else if ('addEventListener' in document) {
		document.addEventListener('DOMContentLoaded', function () {
			rAFWrapper(prepareElements);
		});
	} else {
		document.attachEvent('onreadystatechange', function () {
			if (document.readyState === 'complete') {
				prepareElements();
			}
		});
	}
})('loading-lazy', '256px 0px');


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map