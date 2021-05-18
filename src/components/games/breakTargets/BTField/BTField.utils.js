import PropTypes from "prop-types"
import styles from "./BTField.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container
}

export const btFieldPropTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(["primary", "secondary"]),
  className: PropTypes.string
}
