import PropTypes from "prop-types"
import styles from "./TextWithLayout.module.css"

export const classes = {
  text: (className) => (className ? className + " " : "") + styles.Text
}

// export const defaultProps = {}

export const propTypes = {
  children: PropTypes.node,
  animationProps: PropTypes.object,
  orientationProps: PropTypes.object
}
