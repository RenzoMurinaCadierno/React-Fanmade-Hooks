import PropTypes from "prop-types"
import styles from "./Orientation.module.css"

export const classes = {
  container: (anchor, rotate, className) =>
    (className ?? "") +
    " " +
    (anchor ? styles[anchor.toLowerCase()] : "") +
    " " +
    (rotate ? getRotationClasses(rotate, anchor) : "") +
    " " +
    styles.Container
}

export const defaultProps = { anchor: "bottom" }

export const propTypes = {
  children: PropTypes.node.isRequired,
  anchor: PropTypes.oneOf(["center", "top", "right", "bottom", "left"]),
  rotate: PropTypes.oneOf(["forwards", "backwards"]),
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
  if (anchor === "left" || anchor === "right") {
    return rotate === "forwards" ? styles.RotatePlus90 : styles.RotateMinus90
  }

  return styles.Rotate180
}
