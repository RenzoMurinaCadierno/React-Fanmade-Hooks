# useEffectXTimes

## Description

Triggers a callback each time passed `dependencies` change (or on each render if no dependencies), but only up to the specified number in `times`.

Once the callback was triggered that many times, _useEffect_ stops working.

<br />

## Parameters

- `cb` (function)

  The callback to trigger when `dependencies` change.
  <br />
  <br />

- `dependencies` (Array)

  _useEffect_'s dependencies. Defaults to `undefined` (no dependencies).
  <br />
  <br />

- `times` (number)

  The amount of times you wish _useEffect_ to trigger, as an integer. Defaults to **1**.
  <br />
  <br />

- `ignoreMountPhase?` (boolean)

  `true` will skip mount phase as a _useEffect_ trigger (will not count as 1 time). Defaults to `false`.
  <br />
  <br />

## Return

An **array** with:

- `elem 0` (function)

  Handler to reset `times` back to its initial state.

- `elem 1` (function)

  `setTimes` setter. Takes a `number` as argument and sets it as `times` new value. _useEffect_ will now be able to trigger that amount of times.
