import { useState, useEffect, useCallback } from "react"

/**
 * Offers a boolean `false` that, when set to `true` by its handler, it resets
 * back to `false` after `timeout`.
 *
 * @param {number} timeout The time active boolean state takes to switch back to
 *   `false` once it was toggled, represented in milliseconds as integer higher
 *   than 0.
 *
 * @param {function} onToggle Callback to trigger each time active state
 *   toggles, regardless its state. Passes active state as argument.
 *
 * @returns {Array} An array with:
 *
 * `elem 0` (boolean): Toggler's current active state.
 *
 * `elem 1` (function): Timeout toggle trigger.
 * * When invoked, active state is set to `true`, and resets to `false` after
 *   `timeout`.
 * * Accepts a boolean as argument, in which case, active state is set to that
 *   boolean. Use this if you need to force active state to `false` while
 *   currently being `true`, which aborts the timeout that switches it back.
 *
 * @author Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>
 */
export default function useTimeoutToggle(timeout = 1000, onToggle) {
  const [state, setState] = useState(false)

  /**
   * Sets state to the boolean passed as argument, or `true` by default.
   *
   * `true` enables setting state to `false` after `timeout`, while `false`
   * aborts "useEffect" timeout, if any.
   */
  const toggleTimeout = useCallback(
    (st) => setState(() => (typeof st === "boolean" ? !!st : true)),
    []
  )

  /**
   * At mount phase or any time hook's args change, check if they are valid.
   *
   * Crash the app with tracing console errors if validation fails.
   */
  useEffect(() => _crashOnInvalidArgs(timeout, onToggle), [timeout, onToggle])

  /**
   * When "state" is set to `true`, set it back to `false` aftet `timeout`.
   *
   * Regardless state, it trigger `onToggle` if defined.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let togglerTimeout

    if (state) togglerTimeout = setTimeout(() => setState(false), timeout)

    onToggle?.(state)

    return () => clearTimeout(togglerTimeout)
  }, [state])

  // return toggler boolean state and its trigger
  return [state, toggleTimeout]
}

/**
 * Crashes the app if hook's args are invalid, logging errors in console.
 *
 * @param {number} timeout "useTimeoutToggle" `timeout`.
 *
 * @param {function} onToggle "useTimeoutToggle" `onToggle`.
 */
function _crashOnInvalidArgs(timeout, onToggle) {
  if (!timeout || !Number.isInteger(timeout) || timeout <= 0) {
    throw new Error(
      "Invalid argument `timeout` with value `" +
        timeout +
        "` supplied to `useTimeoutToggle`.\n\nExpected an integer higher than 0."
    )
  }

  if (onToggle && typeof onToggle !== "function") {
    throw new Error(
      "Invalid argument `onToggle` with value `" +
        onToggle +
        "` supplied to `useTimeoutToggle`.\n\nExpected a function."
    )
  }
}
