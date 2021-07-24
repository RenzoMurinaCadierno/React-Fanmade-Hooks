import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./CodeRushCounter.module.css"

export const classes = {
  container: (className) => cnp.default(styles.Container, className),
  text: (className) => className,
  value: (className) => cnp.default(styles.Value, className),
  valueAnimation: (axis, direction) =>
    styles[
      "ValueAnimation" +
        (axis?.toLowerCase() === "y" ? "Vertical" : "Horizontal") +
        (direction?.toLowerCase() === "reverse" ? "Reverse" : "")
    ]
}

export const defaultProps = {
  text: "Count",
  value: 0,
  type: "primary",
  classNames: {}
}

export const propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.oneOf(["primary", "secondary", "danger"]),
  transitionAxis: PropTypes.oneOf(["x", "y", "X", "Y"]),
  transitionDirection: PropTypes.oneOf(["reverse", "forwards"]),
  classNames: PropTypes.exact({
    container: PropTypes.string,
    text: PropTypes.string,
    value: PropTypes.string
  }),
  textProps: PropTypes.object,
  valueProps: PropTypes.object
}
