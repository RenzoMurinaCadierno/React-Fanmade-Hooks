import PropTypes from "prop-types"
import styles from "./TextWithOrientation.module.css"

export const classes = {
  container: (anchor, rotate, className) =>
    (className ?? "") +
    " " +
    (anchor ? styles[anchor.toLowerCase()] : "") +
    " " +
    (rotate ? getRotationClasses(rotate, anchor) : "") +
    " " +
    styles.Container,
  text: (className) => (className ?? "") + " " + styles.Text
}

export const defaultProps = { anchor: "bottom", classNames: {}, textProps: {} }

export const propTypes = {
  children: PropTypes.node.isRequired,
  anchor: PropTypes.oneOf(["center", "top", "right", "bottom", "left"]),
  rotate: PropTypes.oneOf(["forwards", "backwards"]),
  classNames: PropTypes.exact({
    container: PropTypes.string,
    text: PropTypes.string
  }),
  textProps: PropTypes.object
}

/**
 * Returns a className that rotates '*Text*' wrapper container '*div*'.
 *
 * If `anchor` is 'left' or 'right', it rotates it -90 or 90 degrees on
 * `rotate === 'forwards'` and `rotate === 'reverse'` respectively.
 *
 * If `anchor` is 'bottom' or 'top', it rotates it 180 degress, regardless
 * `rotate` value.
 *
 * @param {string} rotate Rotation direction. One of 'forwards' or 'reverse'.
 *
 * @param {string} anchor '*Text*' container anchor. Can be one of 'top',
 *   'right', 'bottom' or 'left'
 */
function getRotationClasses(rotate, anchor) {
  if (anchor === "left" || anchor === "right") {
    return rotate === "forwards" ? styles.RotatePlus90 : styles.RotateMinus90
  }

  return styles.Rotate180
}
