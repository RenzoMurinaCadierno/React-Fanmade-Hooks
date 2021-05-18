import { useCallback, useEffect, useRef } from "react"

/**
 * Triggers a callback each time passed dependencies change (or on each render
 * if no dependencies), but only up to the specified number in `times`.
 *
 * Once the callback was triggered that many times, useEffect stops working.
 *
 * @param {function} cb The callback to trigger when dependencies change.
 *
 * @param {Array?} dependencies useEffect's dependencies. Defaults to
 *   undefined (no dependencies).
 *
 * @param {number?} times The amount of times you wish useEffect to trigger, as
 *   an integer. Defaults to 1.
 *
 * @param {boolean?} ignoreMountPhase True will skip mount phase as a useEffect
 *   trigger (will not count as 1 time). Defaults to false.
 *
 * @returns {Array} An array with:
 * * `arg 0` (function): handler to reset `times` back to its initial state.
 * * `arg 1` (function): handler to set a new number of times with the number
 *     passed as argument.
 */
export default function useEffectXTimes(
  cb,
  dependencies,
  times = 1,
  ignoreMountPhase = false
) {
  // we need to add 1 as default for mount phase, as it will substract 1
  // automatically with no effect
  const timesUsed = useRef(ignoreMountPhase ? times + 1 : times)
  // save the confirmation boolean if we passed an array of dependencies, so as
  // not to re-evaluate it each time we apply useEffects below
  const isArrayDep = useRef(Array.isArray(dependencies))

  // callbacks to reset and to set a new count for the effect to trigger.
  // Notice they modify the value in useRef, so calling either of them will not
  // trigger a re-render
  const reset = useCallback(() => (timesUsed.current = times), [times])
  const setTimes = useCallback((newTimes) => (timesUsed.current = newTimes), [])

  const triggerCallback = useCallback(() => {
    // proceed only if we still have times to use the effect
    if (timesUsed.current) {
      // decrease them by 1
      timesUsed.current--
      // fire the callback on each render if we are including mount phase.
      // Ignore the first render if we are excluding mount phase.
      // ("timesUsed < times" check will throw false on this last scenario)
      if (
        !ignoreMountPhase ||
        (ignoreMountPhase && timesUsed.current < times)
      ) {
        cb(timesUsed.current) // pass times left on the event if it's needed
      }
    }
  }, [ignoreMountPhase, times, cb]) // DO NOT modify these ones externally

  // This useEffect will trigger on each render if we passed anything
  // that's not an array as dependencies. Normally on null or undefined
  useEffect(() => !isArrayDep.current && triggerCallback())

  // And this one will fire each time passed dependencies change.
  // We are forced not to use an array literal for them, which will
  // throw a warning in console. That's why we use this flag to disable it.
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => isArrayDep.current && triggerCallback(), dependencies)

  // return the callbacks to reset and set times to use the effect
  return [reset, setTimes]
}
