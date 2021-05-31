# useClassNameToggle

## Description

---

Toggles `className` _on_ when invoked by the returned handler, which automatically turns back _off_ after `timeout`.
<br />
<br />

## Parameters

---

A configuration **object** shaped:
<br /> <br />

- `className` (string)

  ClassName to be controlled by the returned handler.
  <br />
  <br />

- `timeout` (number)

  Delay to turn `className` back _off_ once it was toggled _on_, measured in milliseconds. Defaults to **0**.
  <br />
  <br />

- `onStart?` (function)

  Callback triggered when className is toggled _on_.
  <br />
  <br />

- `onFinish?` (function)

  Callback triggered when className is toggled _off_.
  <br />
  <br />

## Return

---

An **array** with:
<br />
<br />

- `elem 0` (string)

  The className to add to target component's `className`.
  <br /> <br />

- `elem 1` (function)

  The handler that, when invoked, toggles the className _on_ (adds `elem 0` to target component's `className`).
  <br /> <br />

- `elem 2` (boolean)

  The className's _on_/_off_ state. `true` means it is currently being rendered in target component's `className`, `false` indicates it is not present there.
