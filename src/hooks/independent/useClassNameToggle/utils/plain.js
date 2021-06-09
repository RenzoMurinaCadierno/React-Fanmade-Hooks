export default `/******************************************************************************
 * **WARNING!** This code is written in ES2020! 
 * You will need a babel transpiler that fits it.
 * Or you can use Create-React-App ^3.3.0, since it is already implemented there
 ******************************************************************************/

import { useCallback, useState, useEffect } from "react"

/**
 * Toggles \`className\` 'on' when invoked by the returned handler, which
 *   automatically turns back 'off' after \`timeout\`.
 *
 * @param {object} configs An object shaped:
 *
 * \`className\` (string): the className to be controlled by the returned
 *   handler.
 *
 * \`timeout\` (number): the delay to turn \`className\` back 'off' once it was
 *   toggled 'on', measured in milliseconds. Defaults to 0.
 *
 * \`onStart?\` (function) callback triggered when className is toggled 'on'.
 *
 * \`onFinish?\` (function) callback triggered when className is toggled 'off'.
 *
 * @returns {Array} An array with:
 *
 * \`elem 0\` (string): The className to add to target component's \`className\`.
 *
 * \`elem 1\` (function): The handler that, when triggered, toggles the
 *   className 'on' (adds \`elem 0\` to target component's \`className\`).
 *
 * \`elem 2\` (boolean): The className's 'on'/'off' state. True means it is
 *   currently being rendered in target component's \`className\`, false indicates
 *   it is not present there.
 */
export default function useClassNameToggle({
  className,
  timeout = 0,
  onStart,
  onFinish
}) {
  const [classNameSt, setClassNameSt] = useState({
    cn: "", // className string. Empty when "isActive" is true
    isActive: false // true means the className is currently being rendered
  })

  /**
   * Renders \`className\` if it is not already toggled 'on' and fires \`onStart\`.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  const trigger = useCallback(() => {
    if (classNameSt.isActive) return
    setClassNameSt(() => ({ cn: className, isActive: true }))
    onStart?.()
  }, [onStart])

  /**
   * If "classNameSt.isActive" is true, it sets it back to false alongside
   * resetting "classNameSt.cn" to an empty string, both after \`timeout\`.
   * Afterwards, it triggers \`onFinish\`.
   *
   * Only "classNameSt.isActive" should trigger this useEffect, so, disable
   * eslint warnings.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let animationTimeout
    if (classNameSt.isActive) {
      animationTimeout = setTimeout(() => {
        setClassNameSt({ cn: "", isActive: false })
        onFinish?.()
      }, timeout)
    }
    return () => clearTimeout(animationTimeout)
  }, [classNameSt.isActive])

  return [classNameSt.cn, trigger, classNameSt.isActive]
}`
