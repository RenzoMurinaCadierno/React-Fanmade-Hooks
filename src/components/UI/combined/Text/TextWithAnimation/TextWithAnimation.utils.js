import PropTypes from "prop-types"
import styles from "./TextWithAnimation.module.css"

export const classes = {
  container: (className) => className
}

export const defaultProps = { textProps: {} }

export const propTypes = {
  chidren: PropTypes.node.isRequired,
  className: PropTypes.string,
  textProps: PropTypes.object
}
