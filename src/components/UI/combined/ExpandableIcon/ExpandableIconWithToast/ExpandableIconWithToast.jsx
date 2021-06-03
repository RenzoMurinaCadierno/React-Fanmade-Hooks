import { useState } from "react"
import { Icon, Toast } from "hub"
import {
  classes,
  expandableIconWithToastPropTypes
} from "./ExpandableIconWithToast.utils"

/**
 * Renders an '*ExpandableIcon*' that triggers a '*ToastWithPortal*'
 * when its expanded content is clicked.
 *
 * The '*ToastWithPortal*' is portal-linked to App's root '*div*' by default.
 *
 * @param {object} props
 *
 * `children` (React.Node): '*ToastWithPortal*' `children` (content to display).
 *   Accepts anything React can render but expects the same limitiations as
 *   '*Toast*' `children`.
 *
 * `classNames` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `expandableIconProps?` (object): Props to spread in '*ExpandableIcon*'.
 *
 * `toastProps?` (object): Props to spread in '*ToastWithPortal*'.
 */
export default function ExpandableIconWithToast({
  children,
  classNames = {},
  expandableIconProps = {},
  toastProps = {}
}) {
  const [showToast, setShowToast] = useState(false)

  /**
   * Sets "show" to true which triggers the Toast. Fires '*ExpandableIcon*'
   * `onContentClick`, if any (since this function overrides the incoming one
   * in props).
   */
  const triggerToastAndContentClick = () => {
    setShowToast(true)
    expandableIconProps?.onContentClick?.()
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
      {/* expandable icon. Tapping its content triggers '*ToastWithPortal*' */}
      <Icon.Expandable
        classNames={classes.expandableIcon(classNames.expandableIcon)}
        {...expandableIconProps}
        onContentClick={triggerToastAndContentClick}
      />
      {/* toast linked to app's root node */}
      <Toast.WithPortal
        classNames={classes.toast(classNames.toast)}
        {...toastProps}
        show={showToast}
        onClose={closeToastAndTriggerToastOnClose}
      >
        {children}
      </Toast.WithPortal>
    </>
  )
}

ExpandableIconWithToast.propTypes = expandableIconWithToastPropTypes
