import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./ConfettiGuideX.module.css"

export const classes = {
  container: (anchor, distance, className) =>
    cnp.default(styles.Container, className) +
    cnp.if(anchor, styles["anchor-" + anchor?.toLowerCase()]) +
    cnp.if(distance, styles["distance-" + distance])
}

export const defaultProps = { anchor: "right", distance: 5 }

export const propTypes = {
  children: PropTypes.node.isRequired,
  anchor: PropTypes.oneOf(["left", "right"]),
  distance: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9]),
  className: PropTypes.string
}
