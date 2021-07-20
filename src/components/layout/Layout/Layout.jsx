import Animation from "./Animation/Animation"
import Orientation from "./Orientation/Orientation"
import { propTypes } from "./Layout.utils"

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
