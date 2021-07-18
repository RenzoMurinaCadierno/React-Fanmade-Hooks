import PropTypes from "prop-types"
import styles from "./Animation.module.css"

export const classes = {
  container: (className) => className ?? "",
  mount: (from) => styles[`animate-mount-${from}`],
  idle: (animation) => styles[`animate-idle-${animation}`],
  unmount: (to) => styles[`animate-unmount-${to}`]
}

export const defaultProps = {
  mount: "left",
  idle: "opacity",
  unmount: "scale-up"
}
test on rotated Text. Link with Layout.constants then comment
const validMountAndUnmountAnimations = [
  false,
  "left",
  "right",
  "top",
  "bottom",
  "scale-down",
  "scale-up"
]

export const propTypes = {
  mount: PropTypes.oneOf(validMountAndUnmountAnimations),
  idle: PropTypes.oneOf([false, "scale", "opacity"]),
  unmount: PropTypes.oneOf(validMountAndUnmountAnimations),
  chidren: PropTypes.node.isRequired,
  className: PropTypes.string
}
