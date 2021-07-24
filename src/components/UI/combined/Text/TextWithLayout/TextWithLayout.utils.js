import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./TextWithLayout.module.css"

export const classes = {
  text: (className) => cnp.default(styles.Text, className)
}

// export const defaultProps = {}

export const propTypes = {
  children: PropTypes.node,
  animationProps: PropTypes.object,
  orientationProps: PropTypes.object
}
