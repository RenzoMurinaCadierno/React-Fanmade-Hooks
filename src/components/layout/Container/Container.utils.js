import PropTypes from "prop-types"
import styles from "./Container.module.css"

export const classes = {
  container: (
    type,
    flexDirection,
    alignItems,
    justifyContent,
    roundBorders,
    circle,
    className
  ) =>
    (
      (className ?? "") +
      " " +
      styles.Container +
      " " +
      (type ? styles[type.toLowerCase()] : "") +
      " " +
      (flexDirection ? styles[flexDirection.toLowerCase()] : "") +
      " " +
      (alignItems ? styles["align-" + alignItems.toLowerCase()] : "") +
      " " +
      (justifyContent
        ? styles["justify-" + justifyContent.toLowerCase()]
        : "") +
      " " +
      (roundBorders ? styles.RoundBorders : "") +
      " " +
      (circle ? styles.Circle : "")
    ).trim()
}

export const defaultProps = { htmlElem: "div" }

export const propTypes = {
  component: PropTypes.string,
  type: PropTypes.oneOf(["primary", "secondary", "danger"]),
  flexDirection: PropTypes.string,
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
  roundBorders: PropTypes.bool,
  circle: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node
}
