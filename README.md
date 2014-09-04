LiveRegister
============

An automagic instantiator for JavaScript components.

Why?
----

[Web Components](http://www.w3.org/TR/components-intro/) are maybe/probably/definitely our Brave New Future. But, as I write this, the spec is [a long way from being implemented](http://jonrimmer.github.io/are-we-componentized-yet/). The [Polymer Project](http://www.polymer-project.org/) is doing a great job of polyfilling it, but they have very aggressive browser requirements that, unfortunately, [are constantly shifting](http://stackoverflow.com/questions/23096243/how-up-to-date-is-the-polymer-browser-compatibility-page).

All that said, I'm in love with the concept of instant instantiation. I just want it today, with the browsers I actually have to support in the Real World. Or with libraries like [React](reactjs.com), that take a different tack altogether.

Requirements
------------

This module does use Mutation Observers if available, and as such needs the following shims:

* [WeakMap Shim](https://github.com/Polymer/WeakMap) from Polymer.
* [MutationObservers Shim](https://github.com/Polymer/MutationObservers) from Polymer.

Usage
-----

      // Define a super-complex component:

      var FooBarModule = function(elm) {
        elm.style.color = 'red'
      };

      // Watch for <foo-bar>s, instantiate them as they appear:

      LiveRegister('foo-bar', function(elm){
        new FooBarModule(elm);
      });

Caveats
-------

For browsers that cannot use the shims above, notably IE8 and Android 2.x, a fallback polling interval runs once per second to check for new elements.

For IE8, you will need to [declare any custom HTML elements](http://tatiyants.com/how-to-get-ie8-to-support-html5-tags-and-web-fonts/) in the header:

      <!--[if lte IE 8]>
        <script>
          document.createElement('foo-bar');
        </script>
      <![endif]-->


Browser Support
---------------

* IE 8+
* Chrome Stable
* Firefox Stable
* Safari Stable
* iOS 7.0
* Android 2.x+
* Chrome Mobile

Todos
-----

* Testing
