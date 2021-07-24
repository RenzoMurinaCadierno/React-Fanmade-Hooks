import PropTypes from "prop-types"
import styles from "./Animation.module.css"

export const classes = {
  container: (className) => className,
  mount: (from) => styles[`animate-mount-${from}`],
  idle: (animation) => styles[`animate-idle-${animation}`],
  unmount: (to) => styles[`animate-unmount-${to}`]
}

/**
 * Animation names shared between `mount` and `unmount`.
 */
const sharedMountAndUnmountAnimationNames = {
  LEFT: "left",
  RIGHT: "right",
  TOP: "top",
  BOTTOM: "bottom",
  GROW: "grow",
  SHRINK: "shrink"
}

/**
 * Valid animation names, timeouts and intervals to use in '*Layout.Animation*'
 */
export const constants = {
  animationNames: {
    mount: sharedMountAndUnmountAnimationNames,
    unmount: sharedMountAndUnmountAnimationNames,
    idle: { SCALE: "scale", FADE: "fade", SCALE_FADE: "scale-fade" }
  },
  timeouts: {
    MOUNT: 250,
    UNMOUNT: 250,
    IDLE: 3000
  },
  intervals: { IDLE: 9999999999999 }
}

export const defaultProps = {
  timeout: constants.timeouts.IDLE
}

export const propTypes = {
  chidren: PropTypes.node,
  mount: PropTypes.oneOf(Object.values(constants.animationNames.mount)),
  idle: PropTypes.oneOf(Object.values(constants.animationNames.idle)),
  unmount: PropTypes.oneOf(Object.values(constants.animationNames.unmount)),
  timeout: validateTimeout,
  onMountStart: PropTypes.func,
  onMountFinish: PropTypes.func,
  onIdleStart: PropTypes.func,
  onUnmountStart: PropTypes.func,
  onUnmountFinish: PropTypes.func,
  className: PropTypes.string
}

/**
 * Validates `props.timeout` being an integer higher than 0.
 */
function validateTimeout(props, propName, cmpName) {
  const timeout = props[propName]

  if (timeout === undefined) return

  if (!Number.isInteger(timeout) || timeout <= 0) {
    throw new TypeError(
      `Invalid value \`${timeout}\` supplied to \`${propName}\` at \`${cmpName}\`.\n\nExpected an integer higher than 0.\n`
    )
  }
}

/**
 * Returns `on`, `off` and `timeout` to spread in "useValueToggle".
 *
 * @param {string} animationName A valid animation name for `animationPhase`
 *   (for example: 'left' or 'grow' for 'mount', 'scale' or 'fade' for 'idle').
 *
 * @param {string} animationPhase Either 'mount', 'idle' or 'unmount'.
 *
 * @param {number} animationTimeout Timeout from target animation's start until
 *   it finishes.
 */
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

export function onIdleFinish() {
  console.log("Nice easter egg hunting there! ;)")
}
