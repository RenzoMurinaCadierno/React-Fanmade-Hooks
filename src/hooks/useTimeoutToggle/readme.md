# useTimeoutToggle

- [Working example here](https://react-fanmade-hooks.netlify.app/use-class-name-toggle)

## Description

Offers a boolean `false` that, when set to `true` by its handler, it automatically resets back to `false` after a specified timeout.

## Parameters

- `timeout` (number)

  The time active boolean state takes to switch back to `false` once it was toggled, represented in milliseconds as integer higher than 0. Defaults to `1000`.

- `onToggle?` (function)

  Callback to trigger each time active state toggles, regardless its state. Passes active state as argument.

## Return

An `array` with:

- `elem 0` (boolean)

  Toggler's current active state.

- `elem 1` (boolean)

  Timeout toggle trigger.

  - When invoked, active state is set to `true`, and resets to `false` after `timeout`.

  - Accepts a boolean as argument, in which case, active state is set to that boolean. Use this if you need to force active state to `false` while currently being `true`, which aborts the timeout that switches it back.
