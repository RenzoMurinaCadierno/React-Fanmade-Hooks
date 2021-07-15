# useCount

- [Working example here](https://react-fanmade-hooks.netlify.app/use-latency)

## Description

Simulates latency by a promise which resolves at a specified amount of
milliseconds.

Returns the latency's active state and imperative handlers to `fire` it, as
well as to prematurely `release` (resolve) it or `abort` (reject) it.

Checkpoint intervals can be set, in which case the declarative logic to
release or abort the process at a set amount of milliseconds will be invoked
on each checkpoint across the whole latency timeout, and a callback on each
loop will also trigger, if defined.
<br />

## Parameters

A single configuration object (which we call `configs`), shaped:

- `checkpointInterval?` (number)

  An integer higher than 0 used to divide latency's `duration` (set when invoking "fire" handler) into intervals.

  Each of those intervals will perform declarative calls in a "useEffect" instance, using `configs.abortAtMs`, `configs.releaseAtMs` and/or `configs.onCheckpoint`.
  <br />

- `onCheckpoint?` (function)

  Callback triggered on each interval iteration determined by `configs.checkpointInterval`.
  <br />

- `abortAtMs?` (number)

  If `configs.checkpointInterval` is defined, latency will automatically abort at `abortAtMs` milliseconds.

  Must be an integer higher than 0.
  <br />

- `releaseAtMs?` (number)

  If `configs.checkpointInterval` is defined, latency will automatically release at `releaseAtMs` milliseconds.

  Must be an integer higher than 0.
  <br />

- `doNotReRenderOnAction?` (boolean)

  If `true`, this hook will not re-render the component it is called from on any action ("fire", "checkpoint", "abort" and "release").

  > **_Warning!_** By doing so, latency's "isActive" state will not update, callbacks will not be re-constructed, and anything defined in `configs` will be ignored.

  > **_Note:_** Only use this parameter when you need a non-functional latency visual indicator or latency that runs in the background that does not interact with states.
  > <br />

## Return

An `object` shaped:
<br />

- `isActive` (boolean)

  Latency's active state. `true` means it was fired and running, while `false` indicates it is inactive (released, aborted or declared but not fired).
  <br />

- `fire` (function)

  Latency's trigger, which initiates the timer when invoked.

  Returns the latency timer's promise.

  Its arguments upon invocation are:

  - `duration` (number): Latency's timeout in ms, as an integer >= 0.

  - `onStart?` (function): Callback triggered when latency fires.
    <br />

- `release` (function)

  Resolves the timer promise upon invocation, falling in `fire` resolve clause.

  Gets elapsed milliseconds as argument.
  <br />

- `abort` (function)

  Aborts the timer promise upon invocation, falling in `fire` reject clause.

  Gets elapsed milliseconds as argument.
  <br />

- `getElapsedMs` (function)

  Returns the elapsed milliseconds from latecy being fired up until this function's invocation.
  <br />
