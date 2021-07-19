import PropTypes from "prop-types"
import styles from "./Animation.module.css"

export const classes = {
  container: (className) => (className ? className + " " : ""),
  mount: (from) => styles[`animate-mount-${from}`],
  idle: (animation) => styles[`animate-idle-${animation}`],
  unmount: (to) => styles[`animate-unmount-${to}`]
}

export const defaultProps = {
  mount: "right",
  idle: "scale",
  unmount: "right",
  timeout: 1000
}

const validMountAndUnmountAnimations = [
  "top",
  "right",
  "bottom",
  "left",
  "grow",
  "shrink"
]

export const propTypes = {
  chidren: PropTypes.node,
  mount: PropTypes.oneOf(validMountAndUnmountAnimations),
  idle: PropTypes.oneOf(["scale", "fade", "scale-fade"]),
  unmount: PropTypes.oneOf(validMountAndUnmountAnimations),
  timeout: PropTypes.number,
  onMountStart: PropTypes.func,
  onMountFinish: PropTypes.func,
  onIdleStart: PropTypes.func,
  onUnmountStart: PropTypes.func,
  onUnmountFinish: PropTypes.func,
  className: PropTypes.string
}

export function getOnOffAndTimeout(
  animationName,
  animationPhase,
  animationTimeout
) {
  return {
    on: classes[animationPhase](animationName),
    off: "",
    timeout: animationTimeout
  }
}
