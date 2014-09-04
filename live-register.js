// LiveRegister v0.1
// =================
//
// Copyright 2014 George Pantazis
// Released under the MIT license

(function() {

  'use strict';

  var initMarker = 'data-liveload-initialized';
  var watches = {};

  // For browsers that don't support Mutation events, do a 1-second ping to
  // see if any new elements have been created.

  // Also use this path if the browser does not support stopImmediatePropagation,
  // which is a requirement of the MutationObserver polyfill. This is mainly an
  // issue for Android 2.x.

  if (!window.MutationEvent || !window.Event.prototype.stopImmediatePropagation) {

    setInterval(function() {

      for (var tagName in watches) {

        var matches = document.documentElement.getElementsByTagName(tagName);
        var callback = watches[tagName];

        for (var i = 0; i < matches.length; i++) {
          var match = matches[i];

          if (!match.getAttribute(initMarker)) {
            match.setAttribute(initMarker, true);
            callback(match);
          }
        }
      }
    }, 1000);

  } else {

    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {

        if (mutation.addedNodes && mutation.addedNodes[0]) {

          var addedNode = mutation.addedNodes[0];
          var callback = watches[addedNode.tagName];

          if (callback) {
            addedNode.setAttribute(initMarker, true);
            callback(addedNode);
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      subtree: true,
      childList: true
    });

  }

  var LiveRegister = function(tagName, callback) {

    var matches = document.documentElement.getElementsByTagName(tagName);
    var matchArray = [];

    // Transform DOM Array into standard Array.
    for (var i = 0; i < matches.length; i++) {
      matchArray.push(matches[i]);
    }

    matchArray.forEach(function(match) {
      match.setAttribute(initMarker, true);
      callback(match);
    });

    watches[tagName.toUpperCase()] = callback;

  };

  // Browserify / CommonJS
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = LiveRegister;

    // RequireJS / AMD
  } else if (typeof define === 'function' && define.amd) {
    define('LiveRegister', [], LiveRegister);

    // Old Skool
  } else {
    window.LiveRegister = LiveRegister;
  }

})();
