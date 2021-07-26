# React Fanmade Hooks

Hooks for all needs made by React enthusiasts.

## Description

A compilation of React custom hooks for multiple purposes, each with an example of their functionality.

## Live examples

In [this website](https://react-fanmade-hooks.netlify.app).

## Hooks

Here's the list of all hooks this library currently holds.

Descriptions here are basic, so do not hesitate to check the complete ones at each hook's individual READMEs ;)

<br />

### Animations, UI & UX

---

- **_useAnimatedNumber_**

  - [Working example](https://react-fanmade-hooks.netlify.app/use-animated-number)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/useAnimatedNumber)

  Given a `number` state passed as first argument, when it updates (by `setState`), this hook animates the increase/decrease until the previous state matches the new one.

  It has configurable

  - animation time
  - amount of iterations
  - step's length
  - amount of decimals

  It also accepts callbacks to be triggered on different animation stages.

  <br />

- **_useMediaQuery_**

  - [Working example](https://react-fanmade-hooks.netlify.app/use-media-query)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/useMediaQuery)

  Tracks stated media queries, re-rendering each time one of them changes.

  By default it applies regular bootstrap rules, but also accepts any custom media queries you specify.

  <br />

- **_useTimer_**

  - [Working example](https://react-fanmade-hooks.netlify.app/use-timer)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/useTimer)

  Generates a customizable timer with the stated initial time, capable of ticking up/down.

  <br />

### Form handlers

---

- **_useInputHandlers_**

  - [Working example](https://react-fanmade-hooks.netlify.app/use-input-handlers)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/useInputHandlers)

  Recieves an input reference alongside its props and an optional configuration object, and takes control of that input.

  It returns its value and setValue functions, as well as React and DOM handlers, validation on its value and "form submission"-like functionality.

  <br />

### State managers

---

- **_useCount_**

  - [Working example](https://react-fanmade-hooks.netlify.app/use-count)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/useCount)

  Creates an integer counter state and returns it, along its handlers to increase, decrease, reset and set its count step.

  <br />

- **_useLocalStorage_**

  - [Working example](https://react-fanmade-hooks.netlify.app/use-local-storage)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/useLocalStorage)

  Targets a key in local storage and offers handlers to **set**, **get**, **delete** and **reset** it as a whole, or to target single or multiple nested keys instead to perform those operations on, given local storage item is a plain object.

  It also offers reactive functionality. In such case, this hook will listen to the specified value in the configuration object. When it changes, it can either override the whole local storage item with it, or one/many of its keys or nested keys instead if it is a plain object and we wish to do so.

  Manual or reactive **set** and **del** functions are also flexible if you wish to use current values to determine what to set local storage or any of its nested keys with, or if you with to abort their deletion.

  <br />

- **_usePreviousValue_**

  - [Working example](https://react-fanmade-hooks.netlify.app/use-previous-value)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/usePreviousValue)

  Listens to the value passed as parameter and returns its previous version each time it changes.

  <br />

- **_useToggle_**

  - [Working example](https://react-fanmade-hooks.netlify.app/use-toggle)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/useToggle)

  Returns a boolean state and its handler to toggle it.

  <br />

  - **_useTimeoutToggle_**

  - [Working example](https://react-fanmade-hooks.netlify.app/use-timeout-toggle)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/useTimeoutToggle)

  Offers a boolean `false` that, when set to `true` by its handler, it automatically resets back to `false` after a specified timeout.

  <br />

  - **_useValueToggle_**

  - [Working example](https://react-fanmade-hooks.netlify.app/use-value-toggle)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/useValueToggle)

  Toggles a value related to _"on"_ state when invoked by the returned handler, which automatically turns back to another value assigned to _"off"_ state after a specified timeout.

  <br />

### Effect controllers

---

- **_useCallbackOnce_**

  - [Working example](https://react-fanmade-hooks.netlify.app/use-callback-once)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/useCallbackOnce)

  Takes a callback and returns a handler that invokes it, but that handler will stop working after it triggers. It deactivates on further invocations.

  <br />

- **_useCallbackXTimes_**

  - [Working example](https://react-fanmade-hooks.netlify.app/use-callback-x-times)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/useCallbackXTimes)

  Takes a callback and returns a handler that invokes it, but that handler will stop working after the number of calls specified in `times` argument.

  This means that, for instance, if `times` is set to 3, the handler will invoke the callback only up to 3 times. It deactivates on further invocations.

  <br />

- **_useEffectOnce_**

  - [Working example](https://react-fanmade-hooks.netlify.app/use-effect-once)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/useEffectOnce)

  Triggers a callback when elements in dependencies array change (or on each render if no dependencies were provided), but only once.

  Once the callback was fired, _useEffect_ stops working.

  <br />

- **_useEffectXTimes_**

  - [Working example](https://react-fanmade-hooks.netlify.app/use-effect-x-times)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/useEffectXTimes)

  Triggers a callback each time passed dependencies array change (or on each render if no dependencies), but only up to the specified number in `times` argument.

  Once the callback was triggered that many times, _useEffect_ stops working.

  <br />

- **_useLatency_**

  - [Working example](https://react-fanmade-hooks.netlify.app/use-latency)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/useLatency)

  Simulates latency by a promise which resolves at a specified amount of milliseconds.

  Returns the latency's active state and imperative handlers to `fire` it, as well as to prematurely `release` (resolve) it or `abort` (reject) it.

  Checkpoint intervals can be set, in which case the declarative logic to release or abort the process at a set amount of milliseconds will be invoked on each checkpoint across the whole latency timeout, and a callback on each loop will also trigger, if defined.

  <br />

- **_useReRender_**

  - [Working example](https://react-fanmade-hooks.netlify.app/use-re-render)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/useReRender)

  Returns a function that upon calling it, the component will re-render.

  <br />
