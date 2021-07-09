import PropTypes from "prop-types"
import styles from "./ConfettiGuideX.module.css"

export const classes = {
  container: (anchor, distance, className) =>
    (className ?? "") +
    " " +
    (anchor ? styles["anchor-" + anchor.toLowerCase()] : "") +
    " " +
    (distance ? styles["distance-" + distance.toLowerCase()] : "") +
    " " +
    styles.Container
}

export const defaultProps = {
  anchor: "right",
  distance: "medium"
}

export const propTypes = {
  anchor: PropTypes.oneOf(["left", "right"]),
  distance: PropTypes.oneOf(["shortest", "short", "medium", "far", "farthest"]),
  className: PropTypes.string
}
