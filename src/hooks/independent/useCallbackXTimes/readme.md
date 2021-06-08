# useCallbackXTimes

- [Working example here](https://rfh.netlify.app/use-callback-x-times)

## Description

Takes a callback and returns a handler that invokes it, but that handler will stop working after the number of calls specified in `times`.

This means that, for instance, if `times` is set to 3, the handler will invoke the callback only up to 3 times. It deactivates on further invocations.
<br />
<br />

## Parameters

- `callback` (function)

  The function to be assigned to the invoker.
  <br />
  <br />

- `times` (number)

  The maximum amount of times the invoker can be triggered before deactivating. Defaults to **1** and automatically fallbacks to 1 if anything but a positive integer is declared.
  <br />
  <br />

## Return

An `array` with:

- `elem 0` (function): The invoker which will trigger `callback`.

- `elem 1` (number): The remaining amount of times the invoker can be called before deactivating.

- `elem 2` (function): A handler to reset the amount of times to invoke `callback` back to its original state provided in `times`. It accepts a number as argument, in which case the new amount of times to trigger `callback` will be set to it.
