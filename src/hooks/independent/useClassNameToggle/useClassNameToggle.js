import { useCallback, useState, useEffect } from "react"

/**
 * Toggles a className on when invoked by the returned handler, which
 *   automatically toggles it back off after the specified timeout.
 *
 * @param {object} configs An object with:
 * * `className` (string): the className to be controlled by the
 *     "trigger" handler.
 *
 * * `timeout` (number): the delay to turn the className back off once
 *     it was toggled on, measured in milliseconds.
 *
 * * `onStart?` (function) cb to trigger when className is toggled on.
 *
 * * `onFinish?` (function) cb to trigger when className is toggled off.
 *
 * @returns {Array} An array with these elements:
 * * `0: className string` (string): The className to add to target
 *     component's className prop.
 * * `1: "trigger" handler` (function): The handler that, when triggered,
 *     it toggles the className on (renders its string to target
 *     component's className prop).
 * * `2: className state` (boolean): The className state. True means it
 *     is being rendered in the className string, false indicates it is
 *     not present.
 */
export default function useClassNameToggle({
  className,
  timeout = 0,
  onStart,
  onFinish
}) {
  const [classNameSt, setClassNameSt] = useState({
    cn: "",
    isActive: false
  })

  const trigger = useCallback(() => {
    if (classNameSt.isActive) return
    setClassNameSt({ cn: className, isActive: true })
    onStart?.()
  }, [setClassNameSt, onStart, classNameSt.isActive, className])

  useEffect(() => {
    let animationTimeout
    if (classNameSt.isActive) {
      animationTimeout = setTimeout(() => {
        setClassNameSt({ cn: "", isActive: false })
        onFinish?.()
      }, timeout)
    }
    return () => clearTimeout(animationTimeout)
  }, [classNameSt, setClassNameSt, timeout, onFinish])

  return [classNameSt.cn, trigger, classNameSt.isActive]
}
