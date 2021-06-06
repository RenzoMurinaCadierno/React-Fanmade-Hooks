import { useCallback, useState, useEffect, memo } from "react"
import {
  classes,
  defaultProps,
  propTypes,
  timeouts,
  closeIconSVG
} from "./Modal.utils"

/**
 * Renders a secondary screen that functions as a modal and its backdrop, as
 * well as a close icon if stated.
 *
 * Handles all of its animation logic, and uses an outer boolean state to
 * indicate when it should open or close.
 *
 * @param {object} props
 *
 * `children?` (React.Node): anything React can render, to display inside the
 *   modal's body.
 *
 * `open` (boolean): true will mount this component in the DOM. A variable that
 *   updates is recommended to be assigned here, as `open` acts as a listener.
 *   This means that once it is set to true and the modal mounts, it will need
 *   to switch to false to close the modal before toggling back to true to
 *   re-open it.
 *
 * `type?` (string): This app's theme types. Can be one of 'primary',
 *   'primary-1', 'secondary' or 'secondary-1'. Defaults to 'primary'.
 *
 * `size?` (boolean): Standard width and height dimensions. Can be one of
 *   'small', 'medium' or 'large'. Defaults to 'large'.
 *
 * `scrollable?` (boolean): true will add 'overflow: hidden' to the outer
 *   '*div*'s styles, thus locking content on screen. Defaults to true.
 *
 * `closeIcon?` (boolean | string): defining this prop will render an icon to
 *   close the modal at its top-right corner. To define it, either use a:
 * * (boolean) true renders a default cross icon ('X').
 * * (string) the path to an SVG image to render instead of the default icon.
 *
 * `onOpen?` (function): callback to trigger when modal opens.
 *
 * `onClose?` (function): callback to trigger when modal closes (either by
 *   clicking on the backdrop or on the close icon).
 *
 * `onBackdropClick?` (function): callback to trigger when the modal's
 *   backdrop is clicked.
 * > **Note:** It is advised to pass the handler to toggle the outer boolean
 *     state assigned to `open` back to false here, which will sync with the
 *     internal state in this component, closing it on the process.
 *
 * `onCloseIconClick?` (function): callback to trigger when the modal's close
 *   icon is clicked.
 * > **Note:** Same recommendation as `onBackdropClick` applies here.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *     Check *utils.js* for its constitution.
 */
function Modal({
  children,
  open,
  type,
  size,
  scrollable,
  closeIcon,
  onOpen,
  onClose,
  onBackdropClick,
  onCloseIconClick,
  classNames,
  ...otherProps
}) {
  // "isClosing" becomes true when `open` toggles to false. When so, it
  //   triggers a timeout before unmounting '*Modal*', necessary for its
  //   animation to play.
  // "isOpen" controls the returned JSX. Will be true provided `open` is also
  //   true, and toggles to false once the unmounting animation finishes
  //   playing (controlled by "isClosing")
  const [st, setSt] = useState({ isClosing: false, isOpen: false })

  // prevents function regeneration on subsequent re-renders
  const stopPropagation = useCallback((e) => e.stopPropagation(), [])

  // listening to any dependency that is not the external `open` will trigger
  // this useEffect, thus breaking the state and animation chain. So, disable
  // console warnings, we can only include `open` in the array
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let animationTimeout
    if (!open) {
      // outer `open` is or has toggled to false. Set "isClosing" to true,
      // which adds the unmounting animation className
      setSt((prevSt) => ({ ...prevSt, isClosing: true }))
      // set the timeout to unmount JSX once animation finishes playing.
      // Also, trigger "onClose" callback if any
      animationTimeout = setTimeout(() => {
        setSt(() => ({ isClosing: false, isOpen: false }))
        st.isOpen && onClose?.()
      }, timeouts.closeAnimation)
    } else if (!st.isOpen) {
      // `open` is true. Set "isOpen" to true, which mounts JSX. Call for
      // `onOpen`, if defined.
      // !"st.isOpen" gate stops this from happening if the component
      // re-renders while '*Modal*' is active.
      setSt(() => ({ isClosing: false, isOpen: true }))
      onOpen?.()
    }
    // timeout cleanup on unmounting or retriggering useEffect
    return () => clearTimeout(animationTimeout)
  }, [open])

  return (
    <>
      {st.isOpen && (
        <div
          onClick={onBackdropClick}
          role="none"
          className={classes.backdrop(classNames.backdrop)}
        >
          <section
            onClick={stopPropagation} // do not bubble to backdrop
            role="dialog"
            className={classes.container(
              st.isClosing,
              type,
              size,
              scrollable,
              classNames.container
            )}
            {...otherProps}
          >
            {closeIcon && (
              // default 'dismiss' icon, or custom one if svg string was passed
              <div className={classes.iconContainer(classNames.iconContainer)}>
                <img
                  src={typeof closeIcon === "string" ? closeIcon : closeIconSVG}
                  alt="dismiss"
                  onClick={onCloseIconClick}
                  className={classes.closeIcon(classNames.closeIcon)}
                />
              </div>
            )}
            {children}
          </section>
        </div>
      )}
    </>
  )
}

Modal.defaultProps = defaultProps
Modal.propTypes = propTypes

export default memo(Modal)
