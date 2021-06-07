# useAnimatedNumber

- [Working example here](https://rfh.netlify.app/use-animated-number)

<br />

## Description

Given a `number` state passed as first argument, when it updates (by `setState`), this hook animates the increase/decrease until the previous state matches the new one.

It has configurable

- animation time
- amount of iterations
- step's length
- amount of decimals

It also accepts callbacks to be triggered on different animation stages.

Check `configs` parameter for info on all this.
<br /> <br />

## Parameters

- `value` (number)

  A number state this hook will listen at to trigger the animation. When `value` changes, inner state triggers the animation process and increases/decreases its value up until it matches `value` when animation ends.
  <br />
  <br />

- `configs` (object)

  A configuration object, shaped:

    <br />

  - `timeout?` (number):

    Approximated amount of milliseconds the animation will last. Defaults to **1000**.

    > **Note:** it is not perfectly accurate, as it varies some milliseconds depending on the device's and browser's capabilities.

    <br />

  - `step?` (number)

    Step's length between changes. Defaults to the difference between current value and `value`, both over `iterations`.

    > **Note:** if defined, `step` will take precedence before `timeout`. This means that if `timeout` is not long enough to perform all necessary `step` iterations to cover the distance between limits, then `timeout` will automatically be extended until all iterations are completed.

    <br />

  - `iterations?` (number)

    Amount of iterations it takes to reach from the start limit to the end one. Defaults to **19** for `timeout` < 1000, and to **8.9** for `timeout` >= 1000.

    Odd numbers assure the formula used to calculate steps result in odd numbers too, thus preventing the animation from locking into even ones (a bit more chaotic).

    > **Note (1):** like `step`, this will take precedence before `timeout`, and must be present (at least by its default) to perform calculations. Because of this, mind that a high `iterations` value will result in a long overall process.

    > **Note (2):** since the formula to calculate steps is designed to divide positive intervals, `iterations` **must be defined** and **be a non-zero integer**.

    <br />

  - `toFixed?` (number)

    Desired amount of decimals. Defaults to **0**.

    > **Note**: if `returnType` is `number`, trailing zeroes on decimals will always be removed.

    <br />

  - `initialValue?` (number)

    If defined, at mount phase a startup count animation from `initialValue` up to `value` will occur. Defaults to `value`, thus provoking no effect at mount.

    <br />

  - `roundDecimals?` (boolean)

    If `toFixed` is lower than the amount of resulting decimals after calculations, then they will be rounded to the nearest `toFixed` decimals. Setting this parameter to `false` will prevent that rounding. Defaults to `true`.

    ```javascript
    // Example 1:
    tofixed = 2
    val = 1.799 // target value
    roundDecimals = true

    // returns 1.8 (round value)

    // Example 2:
    tofixed = 2
    val = 1.799
    roundDecimals = false

    // returns 1.79 (non-round value)
    ```

    > **Note** This parameter only works if `returnType` is `string`, since type `number` will always round to nearest decimal.

    <br />

  - `returnType?` (string)

    Sets the type of the number returned by the hook, as well as its current value in args passed to callbacks. It can either be `number` or `string`. Defaults to `number`.

    > **Note**: even though `toFixed` is configured to work on both types, trailing zeroes will always be removed on `number` types. Thus, if decimal precision is required, this parameter must be set to `string` for `toFixed` to work correctly.

    <br />

  - `lastIterationPrecision?` (number)

    When the calculated step is being added or substracted from the current value on each iteration, the result is a `float` number, and as such, the decimal portion's length will frequently be very large.

    Such scenarios affect the last iteration, since the small differences between decimals carried over on each step prevent the final state to match the desired `value`, resulting in one extra iteration for that tiny amount only.

    To avoid this, `lastIterationPrecision` is added to provoke an overflow that skips over the extra iteration at the end of the process.

    Defaults to **0.00000001**

    > **Note:** Do not change unless you are working with really small decimal precision values (like 10^-6 or lower), where that tiny amount turns to be huge. If you do, then just add extra zeros as needed to perform the last iteration skip.

    <br />

  - `toFixedProgress?` (number)

    Amount of decimals of `progress` property in `args` object passed to callbacks below. Defaults to **2**.

    <br />

  - `onStart?` (function)

    Callback fired after setup and before entering the `setInterval` that controls iterations.

    When triggered, it passes an `object` as arguments, containing the current number in inner state, current progress, iteration number, starting value and target value.

    If it returns a **truthy** value, _the process is aborted_ (number state stops changing and interval is cleared). Also, `onAbort` is called.

    <br />

  - `onIteration?` (function)

    Callback fired at the end of each `setInterval` iteration (meaning, between each number animation, also counting the last one correlated to `onFinish`).

    When triggered, it passes an `object` as arguments, containing the current number in inner state, current progress, iteration number, starting value and target value.

    If it returns a **truthy** value, _the process is aborted_ (number state stops changing and interval is cleared). Also, `onAbort` is called.

    <br />

  - `onFinish?` (function)

    Callback fired at the end of the animation process (once last iteration finishes).

    When triggered, it passes an `object` as arguments, containing the current number in inner state, current progress, iteration number, starting value and target value.

    <br />

  - `onAbort?` (function)

    Callback fired when the process is aborted by returning `true` at `onStart` or `onIteration`. It clears the interval that controls iterations, effectively terminating the animation.

    When triggered, it passes an `object` as arguments, containing the current number in inner state, current progress, iteration number, starting value and target value.
    <br />
    <br />

## Return

The **number** being animated.
