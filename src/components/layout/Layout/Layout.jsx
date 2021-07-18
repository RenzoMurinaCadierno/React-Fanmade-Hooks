import Animation from "./Animation/Animation"
import Orientation from "./Orientation/Orientation"
import { constants, defaultProps, propTypes } from "./Layout.utils"

export default function Layout({ children, anchor, rotate, classNames }) {
  return (
    <Orientation {...{ anchor, rotate }} className={classNames.orientation}>
      {children}
    </Orientation>
  )
}

Layout.defaultProps = defaultProps
Layout.propTypes = propTypes

Layout.Animation = Animation
Layout.Orientation = Orientation
Layout.constants = constants
