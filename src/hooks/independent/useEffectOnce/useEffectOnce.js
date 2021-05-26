import { useCallback, useEffect, useRef } from "react"

/**
 * Triggers a callback when elements in `dependencies` change (or on each render
 * if no `dependencies` were provided), but only once. Once the callback was
 * fired, "useEffect" stops working.
 *
 * @param {function} cb The callback to trigger when elements in `dependencies`
 *   change.
 *
 * @param {Array?} dependencies "useEffect" dependencies. Defaults to
 *   undefined, meaning no dependencies array in "useEffect".
 *
 * @param {boolean?} ignoreMountPhase True will skip mount phase as a
 *   "useEffect" trigger. Defaults to false.
 *
 * @returns {function} handler to restore "useEffect" functionality.
 */
export default function useEffectOnce(
  cb,
  dependencies,
  ignoreMountPhase = false
) {
  /**
   * "useEffect" trigger count. Will be 1 unless `ignoreMountPhase` is true,
   * in which case it is set to 2 for 1 substraction to take place without
   * invoking `cb`.
   */
  const timesUsed = useRef(ignoreMountPhase ? 2 : 1)

  /**
   * Boolean to indicate if `dependencies` is an array. Saved in ref as not to
   * re-evaluate it any time the hook is called.
   */
  const isArrayDep = useRef(Array.isArray(dependencies))

  /**
   * Sets "useEffect" trigger count back to 1.
   */
  const reset = useCallback(() => (timesUsed.current = 1), [])

  /**
   * If "useEffect" usage count is 1, it decreases it by 1 and fires `cb`.
   * Note `ignoreMountPhase` will substract 1 to the count automatically at
   * mount phase without triggering `cb`.
   */
  const triggerCallback = useCallback(() => {
    // proceed only if we still have times to use the effect
    if (timesUsed.current) {
      // decrease them by 1
      timesUsed.current--
      // fire `cb` on each render if we are including mount phase. Ignore the
      // first render if `ignoreMountPhase` is true.
      if (!ignoreMountPhase || (ignoreMountPhase && timesUsed.current < 1)) {
        cb(timesUsed.current) // pass usage count on the event if it's needed
      }
    }
  }, [ignoreMountPhase, cb]) // try not to modify these ones externally

  // This useEffect will trigger on each render if `dependencies` is not an
  // array. Normally on "undefined" or "null"
  useEffect(() => !isArrayDep.current && triggerCallback())

  // And this one will fire each time `dependencies` change. We are cannot use
  // an array literal for them here, since such array comes from this hooks'
  // arguments. Thus, eslint throws a warning in console. Disable it.
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => isArrayDep.current && triggerCallback(), dependencies)

  // return the callback to reset "useEffect" count
  return reset
}
