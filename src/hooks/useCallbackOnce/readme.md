# useCallbackOnce

- [Working example here](https://react-fanmade-hooks.netlify.app/use-callback-once)

## Description

Takes a callback and returns a handler that invokes it, but that handler will stop working after it triggers. It deactivates on further invocations.
<br />
<br />

## Parameters

- `callback` (function):

  The function to be triggered by the invoker.
  <br />
  <br />

## Return

An **array** with:

- `elem 0` (function): The invoker which will trigger `callback`.

- `elem 1` (boolean): `true` means the invoker was not deactivated (`callback` can be invoked by it).

- `elem 2` (function): Resets the invoker, allowing it to trigger `callback` again.
