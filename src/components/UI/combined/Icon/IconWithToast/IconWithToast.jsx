import { useState } from "react"
import { Icon, Toast } from "hub"
import { classes, defaultProps, propTypes } from "./IconWithToast.utils"

/**
 * Renders either and '*Icon*' or an '*IconExpandable*', both capable of
 * triggering a '*ToastWithPortal*'. '*Icon*' does it when it is tapped, and
 * '*IconExpandable*', when its content is clicked ().
 *
 * The '*ToastWithPortal*' is portal-linked to App's root '*div*' by default.
 *
 * @param {object} props
 *
 * `isExpandable?` (boolean): true will render an '*IconExpandable*', false
 *   calls for an '*Icon*'.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `toastProps?` (object): Props to spread in '*ToastWithPortal*'. Mind they
 *   should include `children` to render toast's content.
 *
 * `...iconProps?` (object): Props to spread in either '*Icon*' or
 *   '*Icon.Expandable*'.
 *
 * > **Keep in mind** the icon image is passed in `iconProps.children` (if
 *   rendering '*Icon*') or `iconProps.icon` (if rendering '*Icon.Expandable*').
 */
export default function IconWithToast({
  isExpandable,
  classNames,
  toastProps,
  ...iconProps
}) {
  const [showToast, setShowToast] = useState(false)

  /**
   * Sets "show" to true which triggers '*ToastWithPortal*'. Also fires
   * '*IconExpandable*' `onContentClick` or '*Icon*' `onClick`, if any (since
   * this function overrides the incoming one in props).
   */
  const triggerToastAndIconClick = () => {
    setShowToast(true)
    iconProps?.[isExpandable ? "onContentClick" : "onClick"]?.()
  }

  /**
   * Sets "show" back to false which closes the Toast. Fires Toast's `onClose`,
   * if any (since this function overrides the incoming one in props).
   */
  const closeToastAndTriggerToastOnClose = () => {
    setShowToast(false)
    toastProps?.onClose?.()
  }

  return (
    <>
      {/* if an expandable icon is rendered, tapping its content triggers 
      '*ToastWithPortal*'. If it is a regular icon, tapping itself does it */}
      {isExpandable ? (
        <Icon.Expandable
          classNames={classes.expandableIcon(classNames.expandableIcon)}
          {...iconProps}
          onContentClick={triggerToastAndIconClick}
        />
      ) : (
        <Icon
          className={classes.icon(classNames.icon)}
          {...iconProps}
          onClick={triggerToastAndIconClick}
        >
          {iconProps?.children}
        </Icon>
      )}
      {/* toast linked to app's root node */}
      <Toast.WithPortal
        classNames={classes.toast(classNames.toast)}
        {...toastProps}
        show={showToast}
        onClose={closeToastAndTriggerToastOnClose}
      >
        {toastProps.children}
      </Toast.WithPortal>
    </>
  )
}

IconWithToast.defaultProps = defaultProps
IconWithToast.propTypes = propTypes
