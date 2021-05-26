import { useCallback, useState } from "react"

/**
 * Takes a callback and returns a handler that will invoke it, but that handler
 * will stop working after the number of calls specified in `times`.
 *
 * This means that, for instance, if `times` is set to 3, the handler will
 * invoke the callback only 3 times. It deactivates on further invocations.
 *
 * @param {function} callback The function to be assigned to the invoker.
 *
 * @param {number?} times The maximum amount of times the invoker can be
 *   triggered before deactivating. Defaults to 1 and automatically fallbacks
 *   to 1 if anything but a positive integer is declared.
 *
 * @returns {Array} An array with:
 *
 * `elem 0` (function): The invoker which will trigger `callback`.
 *
 * `elem 1` (number): The remaining amount of times the invoker can be called
 *   before deactivating.
 *
 * `elem 2` (function): Resets the amount of times to invoke `callback` back to
 *   its original state provided in `times`. It accepts a number as argument, in
 *   which case the new amount of times to trigger `callback` will be set to it.
 */
export default function useCallbackXTimes(callback, times = 1) {
  const [callsLeft, setCallsLeft] = useState(getValidTimeValue(times, 1))

  const trigger = useCallback(
    (...args) => {
      if (callsLeft > 0) {
        setCallsLeft((callsLeft) => callsLeft - 1)
        callback(...args)
      }
    },
    [callsLeft, setCallsLeft, callback]
  )

  /**
   * Resets the amount of times to invoke `callback` back to its original state.
   * It accepts a number as argument, in which case the new amount of times to
   * trigger `callback` will be set to it.
   */
  const reset = useCallback(
    (newTimes) => {
      setCallsLeft(getValidTimeValue(newTimes, getValidTimeValue(times, 1)))
    },
    [setCallsLeft, times]
  )

  return [trigger, callsLeft, reset]
}

/**
 * Returns `times` as is if it is an integer equal or higher than 0, `fallback`
 * otherwise.
 *
 * @param {number} times The number to validate
 *
 * @param {number} fallback Fallback if `times` is not an integer >= 0.
 */
function getValidTimeValue(times, fallback) {
  return Number.isInteger(times) && times >= 0 ? times : fallback
}
