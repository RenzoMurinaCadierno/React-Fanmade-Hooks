import { createPortal } from "react-dom"
import { Toast, useMountFlag } from "hub"
import { toastWithPortalPropTypes } from "./ToastWithPortal.utils"

/**
 * Renders a '*Toast*' at `portalNode`.
 *
 * **Warning:** a true `show` passed to `toastProps` will be ignored at mount
 *   phase since "createPortal" finds the target node there. If we attempt to
 *   render '*Toast*' (by `toastProps.show` === true) at mount, "createPortal"
 *   will fail and this component will crash.
 *
 * @param {object} props
 *
 * `portalNode` (function | React.Element | React.ref): The node to render the
 *   backdrop component at.
 *
 * By default, it targets the '*div*' with className 'App', below root node in
 *   *index.js*.
 *
 * This prop can be a:
 * * **React reference** to a virtual DOM node.
 * * **React.Element** targetting a real DOM node (the ones you query traditionally
 *     by "getElementById", "querySelector"), and such.
 * * **function**, only if it returns one of the previous two.
 *
 * `toastProps` (object): Props to pass to '*Toast*'.
 */
export default function ToastWithPortal({
  portalNode = document.querySelector(".App"),
  ...toastProps
}) {
  const isMounted = useMountFlag()

  return (
    isMounted &&
    createPortal(<Toast {...toastProps} />, portalNode?.current ?? portalNode)
  )
}

ToastWithPortal.propTypes = toastWithPortalPropTypes
