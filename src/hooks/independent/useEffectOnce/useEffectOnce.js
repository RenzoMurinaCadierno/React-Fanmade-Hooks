import { useCallback, useEffect, useRef } from "react"

/**
 * Triggers a callback when passed dependencies change (or on each
 * render if no dependencies), but only once. Once the callback was
 * triggered, useEffect stops working.
 *
 * @param {function} cb The callback to trigger when dependencies change.
 *
 * @param {Array?} dependencies useEffect's dependencies. Defaults to
 *   undefined, meaning no dependencies array in useEffect.
 *
 * @param {boolean?} ignoreMountPhase True will skip mount phase as a
 *   useEffect trigger. Defaults to false.
 *
 * @returns {function} handler to restore useEffect's functionality.
 */
export default function useEffectOnce(
  cb,
  dependencies,
  ignoreMountPhase = false
) {
  // we need + 1 for mount phase, as it will substract 1
  // automatically with no effect
  const timesUsed = useRef(ignoreMountPhase ? 2 : 1)

  // save the confirmation boolean if we passed an array of dependencies,
  // so as not to re-evaluate it each time we apply useEffects below
  const isArrayDep = useRef(Array.isArray(dependencies))

  // callbacks to reset and to set a new count for the effect to trigger.
  // Notice they modify the value in useRef, so calling for either of them
  // will not trigger a re-render
  const reset = useCallback(() => (timesUsed.current = 1), [])

  const triggerCallback = useCallback(() => {
    // proceed only if we still have times to use the effect
    if (timesUsed.current) {
      // decrease them by 1
      timesUsed.current--
      // fire the callback on each render if we are including mount phase.
      // Ignore the first render if we are excluding mount phase
      // (timesUsed < times check will throw false on this last scenario)
      if (!ignoreMountPhase || (ignoreMountPhase && timesUsed.current < 1)) {
        cb(timesUsed.current) // pass times left on the event if it's needed
      }
    }
  }, [ignoreMountPhase, cb]) // DO NOT modify these ones externally

  // This useEffect will trigger on each render if we passed anything
  // that's not an array as dependencies. Normally on null or undefined
  useEffect(() => !isArrayDep.current && triggerCallback())

  // And this one will fire each time passed dependencies change.
  // We are forced not to use an array literal for them, which will
  // throw a warning in console. That's why we use this flag to disable it.
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => isArrayDep.current && triggerCallback(), dependencies)

  // return the callbacks to reset and set times to use the effect
  return reset
}
