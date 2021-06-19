import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { defaultProps, propTypes } from "./WarpPortal.utils"

/**
 * Mounts one or many React nodes passed as `children` in the given target node
 * reference set in `portalNode`.
 *
 * @param {object} props
 *
 * `children` (React.Node): Anything React can render, which will be mounted
 *   in `portalNode` via ReactDOM's "createPortal" function.
 *
 * `portalNode?` (function | React.Element | React.ref): The node to mount
 *   `children` in.
 *
 * By default, it returns `children` as is, which will render them in the spot.
 *
 * This prop can be a:
 * * **React reference** to a virtual DOM node.
 * * **React element** targetting a real DOM node (the ones you query
 *     traditionally by "getElementById", "querySelector"), and such.
 * * **function**, only if it returns one of the previous two.
 */
export default function WarpPortal({ children, portalNode }) {
  // DOM needs to be mounted before attaching anything to a node. We can flag
  // this with a boolean state linked to mount phase of this component
  const [isDOMReady, setIsDOMReady] = useState(false)

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => portalNode && setIsDOMReady(true), [])

  // render children where '*WarpPortal*' was called from if no `portalNode`
  // was supplied. This is a failsafe.
  if (!portalNode) return children

  return (
    // when this component mounted (DOM ready), mount `children` on `portalNode`
    isDOMReady &&
    createPortal(children, portalNode?.current ?? portalNode ?? document.body)
  )
}

WarpPortal.propTypes = propTypes
WarpPortal.defaultProps = defaultProps
