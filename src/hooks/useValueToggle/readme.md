# useValueToggle

- [Working example here](https://react-fanmade-hooks.netlify.app/use-class-name-toggle)

## Description

Toggles a value related to _"on"_ state when invoked by the returned handler, which automatically turns back to another value assigned to _"off"_ state after a specified timeout.

## Parameters

A configuration `object` shaped:
<br /> <br />

- `on?` (any)

  Active value (assiged to "on" state). Defaults to `true`.
  <br />
  <br />

- `off?` (any)

  Inactive value (assigned to "off" state). Defaults to `false`.
  <br />
  <br />

- `timeout` (number)

  Delay to set `on` back to `off` once it was toggled, measured in milliseconds. Defaults to `1000`.
  <br />
  <br />

- `onStart?` (function)

  Callback triggered when `on` is toggled from `off`.
  <br />
  <br />

- `onFinish?` (function)

  Callback triggered when `off` is toggled back from `on`.
  <br />
  <br />

## Return

An `array` with:
<br />

- `elem 0` (any)

  Either `on` or `off`, depending on which one is currently toggled.
  <br />

- `elem 1` (function)

  Handler that, when triggered, toggles the value from `off` to `on`.

  Once toggled, `off` will be set back after `timeout`.  
  <br />

- `elem 2` (boolean)

  Toggler state. It is `true` if `on` is toggled, `false` otherwise.
