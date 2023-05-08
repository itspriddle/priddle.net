---
title:  TiFighter
period: Feb 2011
date:   2011-02-01
github: https://github.com/itspriddle/ti-fighter
tags:
  - Appcelerator Titanium
  - CoffeeScript
  - Git
  - Javascript
  - Ruby
  - RubyGems
project_type: oss
excerpt: |
  TiFighter is a jQuery-like library designed to help you wage intergalactic war
  on your Titanium Mobile applications. This was one of my first projects using
  CoffeeScript and I immediately fell in love.
---

TiFighter is a jQuery-like library designed to help you wage intergalactic war
on your Titanium Mobile applications.

## Setup

Copy `lib/ti-fighter.js` to your project, I usually keep it in
`Resources/includes`.

Include with `Ti.include('path/to/ti-fighter.js')`.

In app.js (or elsewhere):

    Ti.include('includes/ti-fighter.js');

If you want `$`:

    Ti.includes('includes/ti-fighter.js');
    var $ = TiFighter;

## TiFighter Usage

TiFighter was written to make it easier to select and manipulate the various
objects one would create in a Titanium Mobile project, eg: windows, buttons,
labels.

**Selecting Objects**

Select an object by passing it's name in JavaScript:

    var my_window = Ti.Ui.createWindow();

    var w = TiFighter('my_window')

**Manipulating Objects**

TiFighter instances include a number of methods similar to jQuery, such as
`attr()`, `show()`, and `hide()`.

    var my_window = Ti.Ui.createWindow();

    var w = TiFighter('my_window');
    w.attr('title', 'My Window');
    w.close();

## TiFighter Instance Methods

TiFighter instances include the methods defined below. Note that TiFighter
instances will be referred to as `el` (eg: `var el = TiFighter('my_window')`):

### el.bind

Binds `callback` to fire on `event`.

    el.bind('ehlo', function() {
      alert('ehlo bro');
    });

### el.unbind

Removes `callback` previously bound to `event`.

    el.unbind('ehlo', function() {
      alert('ehlo' bro');
    });

### el.trigger

Triggers `event`.

    el.trigger('elho');

### el.click

Create or fire a `click` event:

    // Create
    el.click(function(e) {
      alert('You clicked me!');
    });

    // Fire
    el.click();

### el.focus

Create or fire a `focus` event (see `el.click` for usage).

### el.blur

Create or fire a `blur` event (see `el.click` for usage).

### el.add

Add child to element:

    var new_label = Ti.UI.createLabel({ text: 'Hi!' });
    el.add(new_label);

### el.remove

Remove child from element:

    el.remove(new_label);

### el.hide

Hide element:

    el.hide();

### el.show

Show element:

    el.show();

### el.animate

Animate element:

    el.animate({ opacity: 0, duration: 2 });

### el.attr

Get or set `attribute` for element:

    // Get
    el.attr('title');

    // Set
    el.attr('title', 'The new window title!');

### el.text

Get or set the `text` attribute for element:

    // Get
    el.text();

    // Set
    el.text('This is the new text');

## TiFighter Utility Functions

TiFighter includes several utility functions.

### TiFighter.console (aliased to TiFighter.log)

Shorthand for Ti.API logger methods. First argument is the message to be
written, second is the log level. JSON.stringifies message if it is not a
string.

    TiFighter.console(message);     // writes message to info log by default
    TiFighter.log(message, 'debug') // writes message to debug log

### TiFighter.alert

Shorthand for `alert()`, which JSON.stringifies message if it is not a string.
Useful for debugging.

    TiFighter.alert('Hey Josh!');
    TiFighter.alert({ name: 'Josh' });

### TiFighter.each

Iterate over elements in object and applies callback to each element.

    TiFighter.each([1, 2], function(i) {
      alert(i);
    });

### TiFighter.map

Iterate over elements in object and applies callback to each element. Returns
an array of elements returned by callback.

    TiFighter.map(object, callback, context)

    var even = TiFighter.map([1, 2, 3, 4, 5, 6], function(i) {
      if (i % 2 == 0) return i;
    }); // [2, 4, 6]

### TiFighter.extend

Adds attributes from source to destination, IE: merges two objects. Note this
does not work recursively as I've never needed it.

    TiFighter.extend(destination, source);

    var old = {name: 'Josh'}

    var user = TiFighter.extend({
      name: 'My new name'
    }, old); // {name: 'My new name'}

### TiFighter.config

A simple key/value store built around Ti.App.Properties. JSON.stringifies
value when writing. JSON.parses value when reading.

    TiFighter.config(key, value);

Set value:

    TiFighter.config('username', 'joshua');

Get value:

    TiFighter.config('username'); // "joshua"

Delete value:

    TiFighter.config('username', null);

### TiFighter.development

Returns true if the current device is a known simulator. Can be used with
or without callback.

Usage without callback:

    if (TiFighter.development()) {
      // do some code if development
    }

Usage with callback:

    TiFighter.development(function() {
      // do some code if development
    })

### TiFighter.production

Returns true if the current device is **NOT** a known simulator. Can be used
with or without callback.

Usage without callback:

    if (TiFighter.production()) {
      // do some code if production
    }

Usage with callback:

    TiFighter.production(function() {
      // do some code if production
    })

### TiFighter.iphone

Returns true if the current device is an iPhone (or iPhone simulator). Can be
used with or without callback.

Usage without callback:

    if (TiFighter.iphone()) {
      // do some code if iphone
    }

Usage with callback:

    TiFighter.iphone(function() {
      // do some code if iphone
    })

### TiFighter.ipad

Returns true if the current device is an iPad (or iPad simulator). Can be used
with or without callback.

Usage without callback:

    if (TiFighter.ipad()) {
      // do some code if ipad
    }

Usage with callback:

    TiFighter.ipad(function() {
      // do some code if ipad
    })

### TiFighter.android

Returns true if the current device is an Android device (or simulator). Can
be used with or without callback

Usage without callback:

    if (TiFighter.android()) {
      // do some code if android
    }

Usage with callback:

    TiFighter.android(function() {
      // do some code if android
    })

### TiFighter.strftime

Functions similarly to Ruby's `Time.strftime` function. Based on GitHub's
[jQuery Relatize Date](https://github.com/github/jquery-relatize_date).

    TiFighter.strftime(new Date(), '%Y-%m-%d'); // '2010-12-13'

### TiFighter.relatizeDate

Converts a date into a "relative" notation. Eg: 1 hour ago, 2 days ago, about
5 minutes ago.  Based on GitHub's
[jQuery Relatize Date](https://github.com/github/jquery-relatize_date).

    TiFighter.relatizeDate((new Date()).getTime() - 60000); // 'about 1 hour ago'

### TiFighter.trim

Trims leading/trailing whitespace from string.

    TiFighter.trim(' this string   '); // 'this string'

### TiFighter.isset

Returns `false` if element is `undefined` or a blank string ("").

    TiFighter.isset(object);

### TiFighter.ajax

Wrapper for `Ti.Network.createHTTPClient()`. Settings accept url, method,
headers, and callbacks invoked by `Ti.Network.createHTTPClient()`.

    TiFighter.ajax({
      url: '/pong',
      method: 'PUT',
      onload: function() {
        alert('It worked!');
      },
      onerror: function() {
        alert('Awww, it broke :(');
      },
      headers: {
        'X-My-Custom-Header': 'I like turtles!',
        'X-ZIBIT': 'Yo Dawg, I heard you like custom request headers...'
      }
    });

To run a synchronous call:

    var output = TiFighter.ajax({
      url: '/pong',
      method: 'GET',
      async: false
    });

Note that currently `Ti.Network.createHTTPClient()` does not support
synchronous operation on Android.

### TiFighter.get

Performs an HTTP GET request, returning output as JSON.

    TiFighter.get('/ping'); // 'pong'

### TiFighter.post

Performs an HTTP POST request, returning output as JSON.

    TiFighter.post('/ping, { name: 'Joshua' }); // 'Hello, Joshua'

### TiFighter.put

Performs an HTTP PUT request (sets X-HTTP-Method-Override header to 'PUT'),
returning output as JSON.

    TiFighter.put('/ping', { name: 'Priddle' }); // 'Updated Priddle'

### TiFighter.del

Performs an HTTP DELETE request (sets X-HTTP-Method-Override header to
'DELETE'), returning output as JSON.

    TiFighter.del('/delete/me');

### TiFighter.rater

Prompts user to rate your application in the iPhone App Store every 20
launches. Prompts stop if the user clicks "Rate Now" or "Don't Remind Me".
Based on this [gist](https://gist.github.com/470113).

    TiFighter.rater({
      appName:  'FooMobile',
      appURL:   'http://itunes.com/rate/me/foo',
      interval: 20,
      message:  'Thanks for using {app_name}, please rate us in the App Store!',
    });

### TiFighter.include

Includes a secondary Javascript file relative from your `Resources/`
directory. Usage is the same as `Ti.include()`. From
[Titanium Redux](https://github.com/dawsontoth/Appcelerator-Titanium-Redux/blob/5e3cb2a64fc45dcd67fe21562852c44d6737c27c/redux.js#L158-191).

    // Loads Resources/includes/file.js, Resources/vendor/another.js
    TiFighter.include('includes/file.js', 'vendor/another.js');

## Extending TiFighter

TiFighter objects can be extended similar to jQuery. For example, if you
wanted to add a `title()` function:

    TiFighter.fn.title = function(title) {
      if (title) {
        return this.attr('title', title);
      } else {
        return this.attr('title');
      }
    };

    var label = Ti.UI.createLabel({ title: "Hello!" });

    TiFighter(my_label).title()           // Hello
    TiFighter(my_label).title('Goodbye'); // label.title is now 'Goodbye'

Global helpers can be added to TiFighter as such:

    if ( ! TiFighter.my_helper) {
      TiFighter.my_helper = function() {
        // do something
      };
    }

    // Use it
    TiFighter.my_helper();

## Development

TiFighter is written in CoffeeScript. If you're hacking on it, you should make
changes to `src/ti-fighter.coffee` and then run `make`. The compiled
JavaScript will be available in `lib/ti-fighter.js`.

## License

MIT License - see [`MIT-LICENSE`](https://github.com/itspriddle/ti-fighter/blob/master/MIT-LICENSE) in this repo.
