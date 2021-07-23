import Animation from "./Animation/Animation"
import Orientation from "./Orientation/Orientation"
import { propTypes } from "./Layout.utils"

/**
 * Wraps `props.children` around '*Orientation*' and '*Animation*', granting
 * it rotation and relative positioning on X and Y axis, and animations for
 * 'mount', 'idle' and/or 'unmount' phases.
 *
 * @param {object} props
 *
 * `children?` (React.Node): Anything React can render, to which this component
 *   will grant 'orientation' and 'animation' capabilities.
 *
 * `animationProps?` (object): Props to spread in '*Animation*'.
 *
 * `orientationProps?` (object): Props to spread in '*Orientation*'.
 */
export default function Layout({ children, animationProps, orientationProps }) {
  return (
    <Orientation {...orientationProps}>
      <Animation {...animationProps}>{children}</Animation>
    </Orientation>
  )
}

// Layout.defaultProps = defaultProps
Layout.propTypes = propTypes

Layout.Animation = Animation
Layout.Orientation = Orientation
