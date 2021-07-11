import PropTypes from "prop-types"
import styles from "./ConfettiGuideX.module.css"

export const classes = {
  container: (anchor, distance, className) =>
    (className ?? "") +
    " " +
    (anchor ? styles["anchor-" + anchor.toLowerCase()] : "") +
    " " +
    (distance ? styles["distance-" + distance] : "") +
    " " +
    styles.Container
}

export const defaultProps = { anchor: "right", distance: 5 }

export const propTypes = {
  children: PropTypes.node.isRequired,
  anchor: PropTypes.oneOf(["left", "right"]),
  distance: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9]),
  className: PropTypes.string
}
