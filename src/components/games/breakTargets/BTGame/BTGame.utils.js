import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./BTGame.module.css"

export const classes = {
  container: (className) => cnp.default(styles.Container, className)
}

export const defaultProps = {
  spawnTargetTimeout: 300,
  maxTargetsOnScreen: 5,
  classNames: {}
}

export const propTypes = {
  isGameActive: PropTypes.bool.isRequired,
  spawnTargetTimeout: validateSpawnTargetTimeout,
  maxTargetsOnScreen: PropTypes.number,
  // NOTE: `targetContent` logic check is more specific, but it will be
  // handled in detail by '*BTTarget*' itself
  targetContent: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onTargetDestroyed: PropTypes.func,
  classNames: PropTypes.shape({
    container: PropTypes.string,
    field: PropTypes.string,
    target: PropTypes.string
  })
}

/**
 * Prop type check will fail if `spawnTargetTimeout` is not a number equal or
 * higher than 200
 */
function validateSpawnTargetTimeout(props, propName, componentName) {
  if (!props[propName]) return
  if (typeof props[propName] !== "number" || props[propName] < 200) {
    return new Error(
      `Invalid prop \`${propName}\` with value \`${props[propName]}\` supplied to \`${componentName}\`. Expected a number equal to or higher than 200.`
    )
  }
}

/**
 * Takes a minimum and maximum value for X and Y coords, and returns a random
 * number between those for both coords that will be used to spawn a '*BTTarget*'
 * It also returns a unique index for React to use as `key` when rendering targets
 * in an array.
 *
 * @param {number} minX Minimum value for X spawn coordinate (interal 0 - 100)
 * @param {number} maxX Maximum value for X spawn coordinate (interal 0 - 100)
 * @param {number} minY Minimum value for Y spawn coordinate (interal 0 - 100)
 * @param {number} maxY Maximum value for Y spawn coordinate (interal 0 - 100)
 */
export function getNewCoords(minX, maxX, minY, maxY) {
  const x = (Math.random() * (maxX - minX) + minX).toFixed(2)
  const y = (Math.random() * (maxY - minY) + minY).toFixed(2)
  const idx = "tgt:x" + x + "y:" + y + "i:" + index.get()
  return { x, y, idx }
}

/**
 * Returns a new index each time get() is called. Reverts to index 0 on reset().
 */
export const index = (() => {
  let index = 0
  return {
    get: () => ++index,
    reset: () => (index = 0)
  }
})()
