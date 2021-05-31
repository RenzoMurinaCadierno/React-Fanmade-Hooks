# useCount

## Description

---

Creates an integer counter state and returns it, along its handlers to increase, decrease, reset and set its count step.
<br />
<br />

## Parameters

---

- `initialNum` (number)

  The counter's starting integer. Defaults to **0**.
  <br />
  <br />

- `step` (number)

  The amount to increase/decrease the state. Defaults to **1**.
  <br />
  <br />

## Return

---

An **object** shape:
<br />
<br />

- `count` (number)

  Current count state.
  <br />
  <br />

- `step` (number)

  Current 'step counter' state (the amount it will be increased or decreased when calling the handlers).
  <br />
  <br />

- `inc` (function)

  Handler to increase the counter. Accepts a **number** as argument, in which case the counter will be increased by that argument's value. Any other case will increase it by the current `step` state.
  <br />
  <br />

- `dec` (function)

  Handler to decrease the counter. Same condition as `inc` for its argument, but will decrease instead.
  <br />
  <br />

- `reset` (function)

  Handler to reset the counter back to its initial state. Accepts a **number** as argument, in which case the counter will be set to it.
  <br />
  <br />

- `setStep` (function):

  Takes a **number** as argument and sets the current `step` state to it.
