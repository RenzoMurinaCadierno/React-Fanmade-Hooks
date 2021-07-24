import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./Orientation.module.css"

export const classes = {
  container: (anchor, rotate, className) =>
    cn.get(className) +
    cn.if(anchor, styles[anchor?.toLowerCase()]) +
    cn.if(rotate, getRotationClasses(rotate, anchor))
}

// export const defaultProps = {}

/**
 * Valid orientation anchors and rotations to use in '*Layout.Orientation*'
 */
export const constants = {
  anchors: {
    CENTER: "center",
    TOP: "top",
    RIGHT: "right",
    BOTTOM: "bottom",
    LEFT: "left"
  },
  rotations: { FORWARDS: "forwards", BACKWARDS: "backwards" }
}

export const propTypes = {
  children: PropTypes.node.isRequired,
  anchor: PropTypes.oneOf(Object.values(constants.anchors)),
  rotate: PropTypes.oneOf(Object.values(constants.rotations)),
  className: PropTypes.string
}

/**
 * Returns a className that rotates `children` wrapper container '*div*'.
 *
 * If `anchor` is 'left' or 'right', it rotates it -90 or 90 degrees on
 * `rotate === 'forwards'` and `rotate === 'reverse'` respectively.
 *
 * If `anchor` is 'bottom' or 'top', it rotates it 180 degress, regardless
 * `rotate` value.
 *
 * @param {string} rotate Rotation direction. One of 'forwards' or 'reverse'.
 *
 * @param {string} anchor `children` anchor. Can be one of 'top', 'right',
 *   'bottom' or 'left'
 */
function getRotationClasses(rotate, anchor) {
  if (anchor === constants.anchors.LEFT || anchor === constants.anchors.RIGHT) {
    return rotate === constants.rotations.FORWARDS
      ? styles.RotatePlus90
      : styles.RotateMinus90
  }

  return styles.Rotate180
}
