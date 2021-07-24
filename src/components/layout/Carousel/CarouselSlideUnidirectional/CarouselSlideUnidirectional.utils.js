import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./CarouselSlideUnidirectional.module.css"

export const classes = {
  container: (className) => styles.Container + cn.get(className),
  "animate-mount-left": styles.AnimateMountLeft,
  "animate-unmount-left": styles.AnimateUnmountLeft,
  "animate-mount-right": styles.AnimateMountRight,
  "animate-unmount-right": styles.AnimateUnmountRight
}

export const defaultProps = { timeout: 400, classNames: {} }

export const propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  timeout: PropTypes.number,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    animateMount: PropTypes.string,
    animateUnmount: PropTypes.string
  })
}
