import { useState, useEffect } from "react"

/**
 * When the number passed as first argument changes, it animates the returned
 * number's increase/decrease state until it matches that first argument.
 *
 * The animation time, number of iterations, step between animated numbers'
 * length and number of decimals are configurable, and it accepts callbacks
 * to be triggered on different animation stages. Check `configs` for info.
 *
 * @param {number} value A number state this hook will listen at to trigger
 *   the animation. When `value` changes, inner state triggers the animation
 *   process and increases/decreases its value to match `value` when
 *   animation ends.
 *
 * @param {object?} configs
 *
 * `timeout?` (number): Approximated amount of milliseconds the animation
 *   will last. Defaults to 1000.
 *   * **Note:** it is not perfectly accurate, as it varies some ms
 *     depending on the device's and browser's capabilities.
 *
 * `step?` (number): Step's length between changes. Defaults to the
 *   difference between current value and `value`, both over `iterations`.
 *   * **Note:** if defined, `step` will take precedence before `timeout`.
 *     This means that if `timeout` is not long enough to perform all
 *     necessary iterations for `step`s to cover the distance between limits,
 *     then `timeout` will automatically be extended until all iterations are
 *     completed.
 *
 * `iterations?` (number): Amount of iterations it takes to reach from the
 *   start limit to the end one. Defaults to 19 for `timeout`s < 1000, and
 *   to 8.9% for `timeout`s >= 1000. Odd numbers assure the formula used to
 *   calculate steps result in odd numbers too, thus preventing the animation
 *   from locking in even ones (a bit more chaotic).
 *   * **Note (1):** like `step`, this will take precedence before `timeout`,
 *     and must be present (at least by its default) to perform calculations.
 *     Because of this, mind that a high `iterations` value will result in
 *     a long overall process.
 *   * **Note (2):** Since steps formula is designed to divide positive
 *     intervals, `iterations` must be defined and be a non-zero integer.
 *
 * `toFixed?` (number): Desired amount of decimals. Defaults to 0.
 *   * **Note**: if `returnType` is "number", trailing zeroes on decimals
 *     will always be removed.
 *
 * `initialValue?` (number): If defined, at mount phase a startup count
 *   animation from `initialValue` up to `value` will occur. Defaults to
 *   `value`, thus provoking no effect at mount phase.
 *
 * `roundDecimals?` (boolean): If `toFixed` is lower than the amount of
 *   resulting decimals after calculations, then they will be rounded to the
 *   nearest `toFixed` decimals. Setting this parameter to false will
 *   prevent that rounding. Defaults to true.
 *   * E.g. 1: `toFixed` = 2, "val" = 1.799, `roundDecimals` = true
 *     * returns 1.80
 *   * E.g. 2: `toFixed` = 2, "val" = 1.799, `roundDecimals` = false
 *     * returns 1.79
 *   * **Note** This parameter only works if `returnType` is "string", since
 *     type number will always round to nearest decimal.
 *
 * `returnType?` (string): Sets the type of the number returned by the hook,
 *   as well as its current value in args passed to callbacks. It can
 *   either be "number" or "string". Defaults to "number".
 *   * **Note**: even though `toFixed` is configured to work on both types,
 *     trailing zeroes will always be removed on "number" types. Thus, if
 *     decimal precision is required, this parameter must be set to
 *     "string" for `toFixed` to work correctly.
 *
 * `lastIterationPrecision?` (number): When the calculated step is being
 *   added or substracted from the current value on each iteration, the
 *   result is a float number, and as such, the decimal portion's length
 *   will frequently be very large. Such scenarios affect the last iteration,
 *   since the small differences between decimals carried over on each step
 *   prevent the final state to match the desired `value`, resulting in one
 *   extra iteration for that tiny amount only. To avoid this,
 *   `lastIterationPrecision` is added to provoke an overflow that skips
 *   over the extra iteration at the end of the process.
 *   * Defaults to 0.00000001
 * * **Note:** Do not change unless you are working with really small decimal
 *     precision values (like 10^-6 or lower), where that tiny amount turns
 *     to be huge. If you do, then just add extra zeros as needed to perform
 *     the last iteration skip.
 *
 * `toFixedProgress?` (number): Amount of decimals of "progress" property in
 *   "args" object passed to callbacks. Defaults to 2.
 *
 * `onStart?` (function): Callback triggered after setup and before entering
 *   the "setInterval" that controls iterations.
 *   * Gets an object as its args, with the current number in inner state,
 *     current progress, iteration number, starting value and target value.
 *   * If it returns a truthy value, the process is aborted (number state
 *     stops changing and interval is cleared). Also, `onAbort` is called.
 *
 * `onIteration?` (function): Callback triggered at the end of each
 *   "setInterval" iteration (meaning, between each number animation, also
 *   counting the last one correlated to `onFinish`).
 *   * Gets an object as its args, with the current number in inner state,
 *     current progress, iteration number, starting value and target value.
 *   * If it returns a truthy value, the process is aborted (number state
 *     stops changing and interval is cleared). Also, `onAbort` is called.
 *
 * `onFinish?` (function): Callback triggered at the end of the animation
 *   process (once last iteration finishes).
 *   * Gets an object as its args, with the current number in inner state,
 *     current progress, iteration number, starting value and target value.
 *
 * `onAbort?` (function): Callback triggered when the process is aborted by
 *   returning true at `onStart` or `onIteration`. It clears the interval
 *   that controls iterations, effectively terminating the animation.
 *   * Gets an object as its args, with the current number in inner state,
 *     current progress, iteration number, starting value and target value.
 *
 * @returns {number} The number being animated (hook's inner state).
 */
export default function useAnimatedNumber(value = 100000, configs = {}) {
  const {
    timeout = 1000,
    step,
    iterations = timeout >= 1000 ? timeout * 0.089 : 19,
    toFixed = 0,
    initialValue = value,
    roundDecimals = true,
    returnType = "number",
    lastIterationPrecision = 0.00000001,
    toFixedProgress = 2,
    onStart,
    onIteration,
    onFinish,
    onAbort
  } = configs
  // inner state. Will match `value` when it changes and is also this hook's
  // return value once processed by "_fix()". if `initialValue` is defined,
  // at mount phase the animated number will trigger a cycle from it up
  // until `value`. Otherwise, it starts up at set `value`.
  const [num, setNum] = useState(initialValue)
  // We only need to listen to mount and `value` changes. Ignore warnings.
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    // interval reference kept outside condition to be cleared on return
    let stepInterval = 0
    // fire the whole process only if "num" (current state) and `value`
    // (new target state) are different. Nothing to do if they are the same
    if (num !== value) {
      // true if we increasing "num" to reach `value`, false otherwise
      const isAdd = value > num
      // get highest and lowest limits, and the distance between them
      const high = isAdd ? value : num
      const low = isAdd ? num : value
      const diff = high - low
      // `iterations` cannot be negative nor undefined
      const _iterations =
        Math.abs(iterations) || timeout >= 1000 ? timeout * 0.089 : 19
      // if `step` is defined, we use it. It must be positive and cannot be
      // higher than the distance between points. If `step` is undefined,
      // then we set it to the distance between points over the total amount
      // of iterations
      const _step = step
        ? Math.abs(step > diff ? diff : step)
        : diff / _iterations
      // this is the interval's second parameter. If `step` was defined, it
      // results in the full operation length over the covered length per
      // step. Otherwise, it simply results in the full length over the
      // amount of iterations. Also, timeout cannot be negative.
      const msPerIteration = step
        ? Math.abs(timeout) / (diff / _step)
        : Math.abs(timeout) / _iterations
      // a pointer to the callback function initialized to `onStart`. Will be
      // changed for iterations and when the operation finishes
      let cbFn = onStart
      // same for its arguments, in an object
      const cbArgs = {
        current: _fix(num, toFixed, returnType, roundDecimals), // `num`, fixed
        progress: 0, // current progress %. Always from 0 to 100.
        start: num, // starting number (`num` value in state)
        finish: value, // ending number (target) when `value` changes
        iteration: 0, // current iteration number
        elapsedMs: 0 // total amount of ms elapsed on each iteration
      }
      // trigger callback, already set up for `onStart`. If it returns a truthy
      // value, abort the process (skip to 'else' clause, triggering `onAbort`)
      if (!cbFn?.(cbArgs)) {
        // save current ms, will use them to calculate "cbArgs.elapsedMs" later
        const startTime = new Date().getTime()
        // "nextNum" will equal to "num" value for each iteration. Variable
        // declared outside the interval to use current state synchronously when
        // updating "cbArgs" (otherwise, increasing "cbArgs.iterations" fails)
        let nextNum
        // `onStart` callback already resolved, set the reference to `onIteration`
        cbFn = onIteration
        // all logic on startup is handled at this point, so we now move to
        // the interval, which fires each "msPerIteration" ms
        stepInterval = setInterval(() => {
          // interval will set inner state on each iteration
          setNum((n) => {
            // let nextNum
            if (value > n) {
              nextNum = n + _step
              // Now, "num" and "_step" are floating values, thus when added or
              // substracted together, the result is very decimal-specific. This
              // is a problem on the last iteration as "num" will not equal to
              // nor surpass `value` limit just by a tiny amount, thus resulting
              // in an additional iteration. To prevent it, we add
              // `lastIterationPrecision` to the mix, a manual tiny amount.
              if (nextNum + lastIterationPrecision >= value) {
                // if the adjusted num surpassed the limit, clear the interval,
                // set the callback pointer to `onFinish`, and set "num" to
                // `value` (preventing an overflow on higher limit)
                clearInterval(stepInterval)
                nextNum = value
                cbFn = onFinish
              }
              // otherwise, `value` is the lowest limit. We are substracting.
              // Use same logic as above, but decrease variables instead
            } else {
              nextNum = n - _step
              if (nextNum - lastIterationPrecision <= value) {
                clearInterval(stepInterval)
                nextNum = value
                cbFn = onFinish
              }
            }
            // set inner state with its updated value. No fix() here, as it
            // would conflict with next calculations. We fix() in hook's return
            return nextNum
          })
          // "nextNum" is now set to the value for "num" for this iteration, so
          // recalculate values in "cbArgs" to pass as parameters to callback.
          // > magnitude = relative portion already covered between limits
          const magnitude = isAdd ? nextNum - low : high - nextNum
          cbArgs.current = _fix(nextNum, toFixed, returnType, roundDecimals)
          cbArgs.progress = _fix((magnitude * 100) / diff, toFixedProgress)
          cbArgs.iteration += 1
          cbArgs.elapsedMs = new Date().getTime() - startTime
          // trigger current "cbFn". If it returns true, clear the interval
          // and fire `onAbort`, the process finishes prematurely. Else,
          // continue with the next iteration.
          if (cbFn?.(cbArgs)) {
            clearInterval(stepInterval)
            onAbort?.(cbArgs)
          }
        }, msPerIteration)
      } else {
        // `onStart` returned true, process was aborted. Trigger callback
        onAbort?.(cbArgs)
      }
    }
    // useEffect's return. Always clear the interval for the new one to begin
    return () => clearInterval(stepInterval)
  }, [value]) // useEffect's dependencies. Trigger at mount and value change

  // hook's return. The current "num" state, rounded as specified in params
  return _fix(num, toFixed, returnType, roundDecimals)
}

/**
 * Fixes a number to the declared amount of decimals.
 *
 * Return type can be string or number, trailing zeros can be added to the
 *   decimal portion and default decimal rounding can be avoided if stated.
 *   Check @params for all options.
 *
 * @param {number} num The number to fix.
 * @param {number} toFixed Desired amount of decimals.
 * @param {string} returnType Either "number" or "string". "number" will
 *   return fixed number as type number, which overrides the default return
 *   type string. **Note:** additional zeros to the right on decimals will be
 *   deleted on a return type number.
 * @param {boolean} roundDecimals
 * If `toFixed` is lower than the amount of resulting decimals in "num", "num"
 *   will be rounded to the nearest decimal. Setting this parameter to false
 *   will prevent rounding.
 * * E.g. 1: `toFixed` = 2, "num" = 1.799, `roundDecimals` = true
 *   * returns 1.80
 * * E.g. 2: `toFixed` = 2, "num" = 1.799, `roundDecimals` = false
 *   * returns 1.79
 *
 * **Important:** This parameter only works if `returnType` is "string", since
 *   type number will always round to nearest decimal.
 *
 * @returns {number} fixed "num" according to params.
 */
function _fix(num, toFixed, returnType = "number", roundDecimals) {
  if (!Number.isInteger(toFixed)) return num
  if (returnType === "number") {
    const pow = Math.pow(10, toFixed)
    return Math.round(num * pow) / pow
  }
  if (!roundDecimals && toFixed) {
    const intAndDecs = num.toString().split(".")
    if (intAndDecs.length > 1) {
      const truncatedDecimals = intAndDecs[1].slice(0, toFixed)
      const deltaDecimals = toFixed - truncatedDecimals.length
      const zerosToRight = deltaDecimals <= 0 ? 0 : deltaDecimals
      return intAndDecs[0] + "." + truncatedDecimals + "0".repeat(zerosToRight)
    }
    return intAndDecs[0] + "." + "0".repeat(toFixed)
  }
  return num.toFixed(toFixed)
}
