import PropTypes from "prop-types"
import styles from "./CarouselSlide.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  "animate-mount-left": styles.AnimateMountLeft,
  "animate-unmount-left": styles.AnimateUnmountLeft,
  "animate-mount-right": styles.AnimateMountRight,
  "animate-unmount-right": styles.AnimateUnmountRight
}

export const carouselSlidePropTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  timeout: PropTypes.number,
  classNames: PropTypes.shape({
    container: PropTypes.string,
    animateMount: PropTypes.string,
    animateUnmount: PropTypes.string
  })
}
