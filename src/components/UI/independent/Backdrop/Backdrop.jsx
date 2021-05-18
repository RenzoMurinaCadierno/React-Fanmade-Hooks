import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { classes, backdropPropTypes } from "./Backdrop.utils"

/**
 * Renders a backdrop. Can be mounted on any DOM node.
 *
 * @param {object} props
 *
 * `show` (boolean!): True will display the backdrop.
 *
 * `htmlElem` (string): Element type for the backdrop React component. Defaults
 *   to "div".
 *
 * `portalNode` (function | React.Element | React.ref): The node to render the
 *   backdrop component at.
 *
 * By default, it targets the '*div*' with className 'App', below "root" node
 *   in *index.js*.
 *
 * This prop can be a:
 * * React reference to a virtual DOM node.
 * * React.Element targetting a real DOM node (the ones you query traditionally
 *     by "getElementById", "querySelector"), and such.
 * * function, only if it returns one of the previous two.
 *
 * `className` (string): className string to attach to rendered component.
 *
 * @returns {React.Element} The backdrop component to be mounted by a portal to
 *   any node stated in `portalNode`.
 */
export default function Backdrop({
  show,
  htmlElem = "div",
  portalNode = document.querySelector(".App"),
  children,
  className,
  ...otherProps
}) {
  const Component = htmlElem
  const isMounted = useRef(false)

  // set "isMounted" to true when component mounts. Prevents triggering
  // "createPortal" at mount
  useEffect(() => (isMounted.current = true), [])

  // if DOM is mounted and `show` === true, render on React Node reference, or
  // on a valid real DOM node
  return isMounted.current && show
    ? createPortal(
        <Component className={classes.container(className)} {...otherProps}>
          {children}
        </Component>,
        portalNode?.current ?? portalNode
      )
    : null
}

Backdrop.propTypes = backdropPropTypes
