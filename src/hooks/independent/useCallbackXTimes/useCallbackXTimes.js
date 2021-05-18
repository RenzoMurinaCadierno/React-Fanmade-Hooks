import { useCallback, useState } from "react"

/**
 * Takes a function and returns a handler that will invoke it, but
 * only up to the specified amount of times.
 *
 * This means that, for instance, if "times" is set to 3 the handler
 * will invoke the callback only 3 times. It deactivates for further
 * calls.
 *
 * @param {function} callback The function to be assigned to the invoker.
 *
 * @param {number} times The maximum amount of times the invoker can
 *   be triggered before deactivating.
 *
 * @returns {Array} An array with these elements:
 * * `0: trigger` (function): The invoker which will call for the
 *   function passed as callback.
 *
 * * `1: calls left` (number): The remaining amount of times the
 *   invoker can be called before deactivating.
 *
 * * `2: reset` (function): Resets the times to invoke the callback back
 *   to its original state. It accepts a number as argument, in which
 *   case the new quantity of times to trigger the invoker will be set
 *   to it.
 */
export default function useCallbackXTimes(callback, times = 1) {
  const [callsLeft, setCallsLeft] = useState(times <= 0 ? 1 : times)

  const trigger = useCallback(
    (props) => {
      if (callsLeft > 0) {
        setCallsLeft((callsLeft) => callsLeft - 1)
        callback(props)
      }
    },
    [callsLeft, setCallsLeft, callback]
  )

  const reset = useCallback(() => setCallsLeft(times), [setCallsLeft, times])

  return [trigger, callsLeft, reset]
}
