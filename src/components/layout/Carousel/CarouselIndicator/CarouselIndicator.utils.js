import PropTypes from "prop-types"
import styles from "./CarouselIndicator.module.css"

export const classes = {
  container: (isActive, className) =>
    (className ?? "") +
    " " +
    (isActive ? styles.ContainerActive : "") +
    " " +
    styles.Container
}

export const carouselIndicatorPropTypes = {
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  className: PropTypes.string
}
