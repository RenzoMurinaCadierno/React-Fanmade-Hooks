import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./ConfettiGuideX.module.css"

export const classes = {
  container: (anchor, distance, className) =>
    styles.Container +
    cn.get(className) +
    cn.if(anchor, styles["anchor-" + anchor?.toLowerCase()]) +
    cn.if(distance, styles["distance-" + distance])
}

export const defaultProps = { anchor: "right", distance: 5 }

export const propTypes = {
  children: PropTypes.node.isRequired,
  anchor: PropTypes.oneOf(["left", "right"]),
  distance: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9]),
  className: PropTypes.string
}
