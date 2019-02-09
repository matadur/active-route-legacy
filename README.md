[![License Badge]][License]

## (deprecated) FORK WAS MAINTAINED FOR PERSONAL USE ONLY - and is no longer needed, as functionality was integrated by `ostrio:flow-router-extra` ##

# Active route helpers

This package provide helpers for figuring out if some route or path is or isn't
the currently active route.

## Install

```sh
meteor add matadur:active-route-legacy
```

## Supported routers

* [`ostrio:flow-router-extra`]
* [`staringatlights:flow-router`] (Deprecated)
* [`iron:router`] (Deprecated)
* [`kadira:flow-router`] (Deprecated)
* [`meteorhacks:flow-router`] (Deprecated)

Only the current version of `ostrio:flow-router-extra` is now supported.

## Template helpers

### Usage

Basic usage examples.

#### isActiveRoute

Template helper to check if the supplied route name matches the currently active
route's name.

Returns either a configurable `String`, which defaults to `'active'`, or
`false`.

```handlebars
<li class="{{isActiveRoute 'home'}}">...</li>
<li class="{{isActiveRoute name='home'}}">...</li>
<li class="{{isActiveRoute regex='home|dashboard'}}">...</li>
{{#if isActiveRoute 'home'}}
  <span>Show only if 'home' is the current route's name</span>
{{/if}}
{{#if isActiveRoute regex='^products'}}
  <span>Show only if the current route's name begins with 'products'</span>
{{/if}}

<li class="{{isActiveRoute class='is-selected' name='home'}}">...</li>
<li class="{{isActiveRoute 'home' class='is-selected'}}">...</li>
```

#### isActivePath

Template helper to check if the supplied path matches the currently active
route's path.

Returns either a configurable `String`, which defaults to `'active'`, or
`false`.

```handlebars
<li class="{{isActivePath '/home'}}">...</li>
<li class="{{isActivePath path='/home'}}">...</li>
<li class="{{isActivePath regex='home|dashboard'}}">...</li>
{{#if isActivePath '/home'}}
  <span>Show only if '/home' is the current route's path</span>
{{/if}}
{{#if isActivePath regex='^\\/products'}}
  <span>Show only if current route's path begins with '/products'</span>
{{/if}}

<li class="{{isActivePath class='is-selected' path='/home'}}">...</li>
<li class="{{isActivePath '/home' class='is-selected'}}">...</li>
```

#### isNotActiveRoute

Template helper to check if the supplied route name doesn't match the currently
active route's name.

Returns either a configurable `String`, which defaults to `'disabled'`, or
`false`.

```handlebars
<li class="{{isNotActiveRoute 'home'}}">...</li>
<li class="{{isNotActiveRoute name='home'}}">...</li>
<li class="{{isNotActiveRoute regex='home|dashboard'}}">...</li>
{{#if isNotActiveRoute 'home'}}
  <span>Show only if 'home' isn't the current route's name</span>
{{/if}}
{{#if isNotActiveRoute regex='^products'}}
  <span>
    Show only if the current route's name doesn't begin with 'products'
  </span>
{{/if}}

<li class="{{isNotActiveRoute class='is-disabled' name='home'}}">...</li>
<li class="{{isNotActiveRoute 'home' class='is-disabled'}}">...</li>
```

#### isNotActivePath

Template helper to check if the supplied path doesn't match the currently active
route's path.

Returns either a configurable `String`, which defaults to `'disabled'`, or
`false`.

```handlebars
<li class="{{isNotActivePath '/home'}}">...</li>
<li class="{{isNotActivePath path='/home'}}">...</li>
<li class="{{isNotActivePath regex='home|dashboard'}}">...</li>
{{#if isNotActivePath '/home'}}
  <span>Show only if '/home' isn't the current route's path</span>
{{/if}}
{{#if isNotActivePath regex='^\\/products'}}
  <span>Show only if current route's path doesn't begin with '/products'</span>
{{/if}}

<li class="{{isNotActivePath class='is-disabled' path='/home'}}">...</li>
<li class="{{isNotActivePath '/home' class='is-disabled'}}">...</li>
```

### Arguments

The following can be used by the template helpers as arguments.

* Data context, Optional. `String` or `Object` with `name`, `path` or `regex`
* `name`, Optional. `String`. Only available for `isActiveRoute` and
  `isNotActiveRoute`
* `path`, Optional. `String`. Only available for `isActivePath` and
  `isNotActivePath`
* `regex`, Optional. `String` or `RegExp`

At least one of Data context, `route` or `path` need to be supplied.

## Javascript helpers

### Usage

Basic usage examples.

#### ActiveRoute.name

Helper to check if the supplied route name matches the currently active route's
name.

Returns either `true` or `false`.

```js
ActiveRoute.name('home');
// Returns true if current route's name is 'home'.

ActiveRoute.name(new RegExp('home|dashboard'));
// Returns true if current route's name contains 'home' or 'dashboard'.

ActiveRoute.name(/^products/);
// Returns true if current route's name starts with 'products'.
```

#### ActiveRoute.path

Helper to check if the supplied path matches the currently active route's path.

Returns either `true` or `false`.

```js
ActiveRoute.path('/home');
// Returns true if current route's path is '/home'.

ActiveRoute.path(new RegExp('users'));
// Returns true if current route's path contains 'users'.

ActiveRoute.path(/\/edit$/i);
// Returns true if current route's path ends with '/edit', matching is
// case-insensitive
```

### Arguments

The javascript helpers accepts `String` or `RegExp` as an argument.

## Global options

* `activeClass`, Optional. Set to `String` to change the default
  `class` for `isActiveRoute` and `isActivePath`
* `caseSensitive`, Optional. Set to `false` to make matching case-insensitive
* `disabledClass`, Optional. Set to `String` to change the default
  `class` for `isNotActiveRoute` and `isNotActivePath`
* `regex`, Optional. Set to `true` to make template helpers use regex matching
  with the following syntax, `{{isActiveRoute '^home'}}`

```js
// Configure helpers globally
// The settings below are the package default settings
ActiveRoute.configure({
  activeClass: 'active',
  caseSensitive: true,
  disabledClass: 'disabled',
  regex: 'false'
});
```

## Notes

* SHOULD be backwards-compatible with `zimme:iron-router-active@1.0.4`
* `ActiveRoute.config` is an alias for `ActiveRoute.configure`
* `className` is an alias for `class` in template helpers
* This package supports javascript's `RegExp`, [here][Regexp]'s some good info

[License]: https://github.com/zimme/meteor-active-route/blob/master/LICENSE.md
[License Badge]: https://img.shields.io/badge/license-MIT-blue.svg
[Regexp]: https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions
