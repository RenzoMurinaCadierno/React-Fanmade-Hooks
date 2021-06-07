# React Fanmade Hooks

Hooks for all needs made by React enthusiasts.

## Description

A compilation of React custom hooks for multiple purposes, each with an example of their functionality.

## Live examples

In [this website](https://rfh.netlify.app).

## Hooks

Here's the list of all hooks this library currently holds.

Descriptions here are basic, so do not hesitate to check the complete ones at each hook's individual READMEs ;)

</br />

### Animations, UI & UX

---

- **_useAnimatedNumber_**

  - [Working example](https://rfh.netlify.app/use-animated-number)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/independent/useAnimatedNumber)

  Given a `number` state passed as first argument, when it updates (by `setState`), this hook animates the increase/decrease until the previous state matches the new one.

  It has configurable

  - animation time
  - amount of iterations
  - step's length
  - amount of decimals

  It also accepts callbacks to be triggered on different animation stages.

  <br />

- **_useClassNameToggle_**

  - [Working example](https://rfh.netlify.app/use-class-name-toggle)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/independent/useClassNameToggle)

  Toggles a className _on_ when invoked by the returned handler, which automatically turns back _off_ after a specified timeout.

  <br />

- **_useMediaQuery_**

  - [Working example](https://rfh.netlify.app/use-media-query)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/independent/useMediaQuery)

  Tracks stated media queries, re-rendering each time one of them changes.

  By default it applies regular bootstrap rules, but also accepts any custom media queries you specify.

  <br />

- **_useTimer_**

  - [Working example](https://rfh.netlify.app/use-timer)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/independent/useTimer)

  Generates a customizable timer with the stated initial time, capable of ticking up/down.

  <br />

### Form handlers

---

- **_useInputHandlers_**

  - [Working example](https://rfh.netlify.app/use-input-handlers)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/independent/useInputHandlers)

  Recieves an input reference alongside its props and an optional configuration object, and takes control of that input.

  It returns its value and setValue functions, as well as React and DOM handlers, validation on its value and "form submission"-like functionality.

  <br />

### State managers

---

- **_useCount_**

  - [Working example](https://rfh.netlify.app/use-count)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/independent/useCount)

  Creates an integer counter state and returns it, along its handlers to increase, decrease, reset and set its count step.

  <br />

- **_useLocalStorage_**

  - [Working example](https://rfh.netlify.app/use-local-storage)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/independent/useLocalStorage)

  Targets a key in local storage and offers handlers to **set**, **get**, **delete** and **reset** it as a whole, or to target single or multiple nested keys instead to perform those operations on, given local storage item is a plain object.

  It also offers reactive functionality. In such case, this hook will listen to the specified value in the configuration object. When it changes, it can either override the whole local storage item with it, or one/many of its keys or nested keys instead if it is a plain object and we wish to do so.

  Manual or reactive **set** and **del** functions are also flexible if you wish to use current values to determine what to set local storage or any of its nested keys with, or if you with to abort their deletion.

  <br />

- **_usePreviousValue_**

  - [Working example](https://rfh.netlify.app/use-previous-value)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/independent/usePreviousValue)

  Listens to the value passed as parameter and returns its previous version each time it changes.

  <br />

- **_useReRender_**

  - [Working example](https://rfh.netlify.app/use-re-render)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/independent/useReRender)

  Returns a function that upon calling it, the component will re-render.

  <br />

- **_useToggle_**

  - [Working example](https://rfh.netlify.app/use-toggle)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/independent/useToggle)

  Returns a boolean state and its handler to toggle it.

  <br />

### Effect controllers

---

- **_useCallbackOnce_**

  - [Working example](https://rfh.netlify.app/use-callback-once)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/independent/useCallbackOnce)

  Takes a callback and returns a handler that invokes it, but that handler will stop working after it triggers. It deactivates on further invocations.

  <br />

- **_useCallbackXTimes_**

  - [Working example](https://rfh.netlify.app/use-callback-x-times)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/independent/useCallbackXTimes)

  Takes a callback and returns a handler that invokes it, but that handler will stop working after the number of calls specified in `times` argument.

  This means that, for instance, if `times` is set to 3, the handler will invoke the callback only up to 3 times. It deactivates on further invocations.

  <br />

- **_useEffectOnce_**

  - [Working example](https://rfh.netlify.app/use-effect-once)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/independent/useEffectOnce)

  Triggers a callback when elements in dependencies array change (or on each render if no dependencies were provided), but only once.

  Once the callback was fired, _useEffect_ stops working.

  <br />

- **_useEffectXTimes_**

  - [Working example](https://rfh.netlify.app/use-effect-x-times)
  - [Hook folder](https://github.com/RenzoMurinaCadierno/React-Fanmade-Hooks/tree/master/src/hooks/independent/useEffectXTimes)

  Triggers a callback each time passed dependencies array change (or on each render if no dependencies), but only up to the specified number in `times` argument.

  Once the callback was triggered that many times, _useEffect_ stops working.
