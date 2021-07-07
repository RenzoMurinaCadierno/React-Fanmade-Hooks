import { useCallback, useState, useEffect } from "react"

/**
 * Toggles a value related to _"on"_ state when invoked by the returned handler,
 * which automatically turns back to another value assigned to _"off"_ state
 * after a specified timeout.
 *
 * @param {object} configs An object shaped:
 *
 * `on?` (any): Active value (assiged to "on" state). Defaults to `true`.
 *
 * `off?` (any): Inactive value (assigned to "off" state). Defaults to
 *   `false`.
 *
 * `timeout?` (number): Delay to set `on` back to `off` once it was toggled,
 *   measured in milliseconds. Defaults to 1000.
 *
 * `onStart?` (function): Callback triggered when `on` is toggled.
 *
 * `onFinish?` (function): Callback triggered when `off` is toggled back from
 *   `on`.
 *
 * @returns {Array} An array with:
 *
 * `elem 0` (any): `on` or `off` value, depending on which one is currently
 *   toggled.
 *
 * `elem 1` (function): Handler that, when triggered, toggles the value from
 *   `off` to `on`.
 *
 * `elem 2` (boolean): Toggler state. `true` if `on` is toggled, `false`
 *   otherwise.
 *
 * @author Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>
 */
export default function useValueToggle({
  on = true,
  off = false,
  timeout = 1000,
  onStart,
  onFinish
}) {
  const [valSt, setValSt] = useState({
    current: off, // `off` when inactive, `on` when toggled active.
    isActive: false // `false` when "valSt.current" if `off`, `true` otherwise.
  })

  /**
   * Sets value to `on` and fires `onStart` if defined. It also toggles
   * "isActive" to `true`.
   *
   * `on` will toggle to `off` after `timeout by a "useEffect".
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  const trigger = useCallback(() => {
    if (valSt.isActive) return

    setValSt(() => ({ current: on, isActive: true }))

    typeof onStart === "function" && onStart()
  }, [onStart])

  /**
   * If `on` is toggled, it sets it back to `off` after `timeout`. It also sets
   * "isActive" back to false and triggers `onFinish` if defined.
   *
   * If `timeout` is not an integer higher than 0, hook will crash the app with
   * a meaningful console error message.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let animationTimeout

    _crashOnInvalidTimeout(timeout)

    if (valSt.isActive) {
      animationTimeout = setTimeout(() => {
        setValSt({ current: off, isActive: false })
        typeof onFinish === "function" && onFinish()
      }, timeout)
    }

    return () => clearTimeout(animationTimeout)
  }, [valSt.isActive])

  return [valSt.current, trigger, valSt.isActive]
}

function _crashOnInvalidTimeout(timeout) {
  if (typeof timeout !== "number" || timeout <= 0) {
    throw new Error(
      "Invalid argument `timeout` supplied to `useValueToggle`. It must be an integer higher than 0."
    )
  }
}
