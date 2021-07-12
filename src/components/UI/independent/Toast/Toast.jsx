import { useState, useEffect, useCallback } from "react"
import { classes, defaultProps, propTypes } from "./Toast.utils"

/**
 * Renders a "Toast" notification component while also handling its logic.
 *
 * @param {object} props
 *
 * `show` (boolean): The boolean this component will observe to trigger the
 *   internal state change to render itself. True will show the '*Toast*',
 *   which then will automatically hide after `timeout`.
 *
 * `position?` (string): The '*Toast*' anchor relative to its parent. Can be
 *   one of "bottom", "top", "left", "right". Defaults to "bottom".
 *
 * `timeout?` (number): Time the '*Toast*' will remain active before
 *   auto-hiding, measured in milliseconds. Defaults to 2000.
 *
 * `onOpen?` (function): callback triggered when '*Toast*' becomes active.
 *
 * `onClose?` (function): callback triggered when '*Toast*' hides after
 *   becoming active and `timeout` expires.
 * * **Note**: it is recommended to toggle outer boolean's state assigned to
 *    `show` back to false here.
 *
 * `children?` (String | React.Node): Anything React can render, though it is
 *   recommended to be a short string due to default stylings.
 *
 * `classNames?` (object): classNames object for all JSXs rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `contentProps?` (object): Props to spread in 'content' '*div*'.
 *
 * `togglerProps?` (object): Props to spread in 'close icon' '*div*'.
 *
 * `...otherProps?` (object): Props to spread in wrapper '*div*'.
 */
export default function Toast({
  show,
  position,
  timeout,
  onOpen,
  onClose,
  children,
  classNames,
  contentProps,
  togglerProps,
  ...otherProps
}) {
  const [st, setSt] = useState({ isOpen: false, animation: null })
  test TOAST's useCallback to see renders, then preload links, then pwa
  const changeAnimationSt = useCallback(
    (animationState) => setSt({ isOpen: true, animation: animationState }),
    [setSt]
  )

  // if `show` becomes true, change animation state to "open". This triggers
  // useEffect chain below
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => show && changeAnimationSt("open"), [show])

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let animationTimeout
    if (st.animation === "open") {
      // animation state became "open" due to `show` becoming true. Trigger
      // callback and switch animation state to "active" after timeout
      animationTimeout = setTimeout(() => changeAnimationSt("active"), 125)
      onOpen?.()
    } else if (st.animation === "active") {
      // animation state became "active" from 'if' clause above. Schedule it to
      // change to "close" after `timeout`
      animationTimeout = setTimeout(() => changeAnimationSt("close"), timeout)
    } else if (st.animation === "close") {
      // animation state became "close" from 'else if' clause above. Schedule
      // it to be set to null, and "isOpen" to false, which will unmount JSX
      animationTimeout = setTimeout(() => {
        setSt({ isOpen: false, animation: null })
        onClose?.()
      }, 125)
    }
    return () => clearTimeout(animationTimeout)
  }, [st.animation])

  return (
    // render only if "st.isOpen" is true
    st.isOpen && (
      // container
      <div
        className={classes.container(
          st.animation,
          position,
          classNames?.container
        )}
        {...otherProps}
      >
        {/* content. Where children are rendered */}
        <div className={classes.content(classNames?.content)} {...contentProps}>
          {children}
        </div>
        {/* 'dismiss' clickable '*div*' */}
        <div
          onClick={() => changeAnimationSt("close")}
          className={classes.toggler(classNames?.toggler)}
          {...togglerProps}
        />
      </div>
    )
  )
}

Toast.defaultProps = defaultProps
Toast.propTypes = propTypes
