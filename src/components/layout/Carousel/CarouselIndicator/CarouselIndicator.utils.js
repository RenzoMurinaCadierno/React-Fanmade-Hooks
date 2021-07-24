import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./CarouselIndicator.module.css"

export const classes = {
  container: (isActive, className) =>
    cnp.default(styles.Container, className) +
    cnp.if(isActive, styles.ContainerActive)
}

export const propTypes = {
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  className: PropTypes.string
}
