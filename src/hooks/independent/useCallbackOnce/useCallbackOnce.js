import { useCallback, useState } from "react"

/**
 * Takes a function and returns a handler that will invoke it only once.
 * After that, the invoker will deactivate, no longer calling for the
 * function.
 *
 * @param {function} callback The function to be assigned to the invoker.
 *
 * @returns {Array} An array with these elements:
 * * `0: trigger` (function): The invoker which will call for the
 *   function passed as callback.
 *
 * * `1: usage state` (boolean): True indicates if the invoker can be
 *   called. False means it is deactivated.
 *
 * * `2: reset` (function): Sets usage state back to true, allowing the
 *   invoker to call the function again.
 */
export default function useCallbackOnce(callback) {
  const [isCallbackUsed, setIsCallbackUsed] = useState(false)

  const trigger = useCallback(
    (params) => {
      if (!isCallbackUsed) {
        setIsCallbackUsed(true)
        callback(params)
      }
    },
    [isCallbackUsed, setIsCallbackUsed, callback]
  )

  const reset = useCallback(() => setIsCallbackUsed(false), [setIsCallbackUsed])

  return [trigger, isCallbackUsed, reset]
}
