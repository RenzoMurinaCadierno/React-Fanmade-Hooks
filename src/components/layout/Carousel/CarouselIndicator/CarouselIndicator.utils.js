import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./CarouselIndicator.module.css"

export const classes = {
  container: (isActive, className) =>
    styles.Container +
    cn.get(className) +
    cn.if(isActive, styles.ContainerActive)
}

export const propTypes = {
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  className: PropTypes.string
}
