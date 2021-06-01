# useTimer

## Description

Generates a timer with the stated initial time, capable of ticking up/down.

<br />

## Parameters

A single configuration **object** shaped:

<br />

- `initialTime?` (Number|object):

  Either:

  - The amount of ms the starting timer will be set to, as a Number.

  - A timer object, also for such task, in a readable format.

    - _Timer object example 1_\
      `{ days: 5, hours: 23, mins: 30, secs: 00, ms: 125 }`

    - _Timer object example 2_\
      `{ mins: 30 }`

    - _Timer object example 3_\
      `{ days: 10 } // translates to { weeks: 1, days: 3}`

  > - Valid keys are **"years"**, **"months"**, **"weeks"**, **"days"**, **"hours"**, **"mins"**, **"secs"**, **"ms"**.\
  > - Defaults to `{ days: 0, hours: 0, mins: 0, secs: 0, ms: 0 }`.\
  > - You only specify keys you desire, no need to use all of them.\
  > - At least one key must be declared.\
  > - Check _"\_inMs"_ object in the file for the full available format.\

<br />

- `tick?` (Number|object)

  The tick interval in which the timer will update its state.

  - Accepts the same value format as `initialTime`.
  - Accepts negative values for both Number or any keys inside timer object passed as argument, in which case the timer will tick downwards, functioning as a countdown.
  - Defaults to **1000** (standard 1 second tick).

<br />

- `fillWithZeroes?` (boolean)

  Returned "time" object will contain numbers as keys, and if those numbers are a single digit, they will not have leading zeroes (e.g.: 7 seconds will be expressed as 7, not 07).

  - Setting this value to true will stringify the returned value for each key and will add a leading zero for all keys in "time" object if they would result in a single digit, and two leading zeroes for "ms" given the same condition.

  - Defaults to `true`.

<br />

## Returns

An **object** shaped:

<br />

- `time` (object)

  The timer object containing the current time spreaded as valid time keys.

  - E.g.: `{ days: 5, hours: 23, mins: 30, secs: 00, ms: 125}`.

  - Check _"\_inMs"_ object in the file for the full available format.

<br />

- `state` (string)

  Current state. Either "stopped", "running" or "paused".

<br />

- `start` (function)

  Starts the timer if its state is "stopped".

<br />

- `pause` (function)

  Pauses the timer if its state is "running".

<br />

- `stop` (function)

  Stops the timer if its state is "running" or "paused".

<br />

- `advance` (function)

  Takes an amount of ms as a parameter (type Number) or a "time" object in the format of _"\_inMs"_ and advances the timer by that amount.

  - It accepts negative values for the Number paramenter or any of the "time" object's keys. Such case decreases the time by that amount instead.

<br />

- `setTick` (function)

  Takes an amount of ms as a parameter (type Number) or a "time" object in the format of _"\_inMs"_ and sets the timer's tick interval to that value.

  - It accepts negative values for the Number paramenter or any of the "time" object's keys. Such case will make "timer" tick down, as a countdown.

<br />

- `setTimer` (function)

  Takes an amount of ms asa parameter (type Number) or a "time" object in the format of _"\_inMs"_ and sets the timer to that value.
