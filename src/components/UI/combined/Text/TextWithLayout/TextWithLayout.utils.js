import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./TextWithLayout.module.css"

export const classes = {
  text: (className) => styles.Text + cn.get(className)
}

// export const defaultProps = {}

export const propTypes = {
  children: PropTypes.node,
  animationProps: PropTypes.object,
  orientationProps: PropTypes.object
}
