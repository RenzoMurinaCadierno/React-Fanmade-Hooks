# useEffectOnce

- [Working example here](https://rfh.netlify.app/use-effect-once)

## Description

Triggers a callback when elements in `dependencies` change (or on each render if no `dependencies` were provided), but only once.

Once the callback was fired, _useEffect_ stops working.
<br />

## Parameters

- `cb` (function)

  The callback to trigger when elements in `dependencies` change.
  <br />
  <br />

- `dependencies` (Array)

  _useEffect_ dependencies. Defaults to `undefined`, meaning no dependencies array in _useEffect_.
  <br />
  <br />

- `ignoreMountPhase?` (boolean)

  `true` will skip mount phase as a _useEffect_ trigger. Defaults to `false`.
  <br />
  <br />

## Return

A **function** that, when invoked, restores _useEffect_ functionality.
