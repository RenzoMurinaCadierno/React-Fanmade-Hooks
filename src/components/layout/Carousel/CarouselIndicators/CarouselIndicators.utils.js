import PropTypes from "prop-types"
import styles from "./CarouselIndicators.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container
}

export const carouselIndicatorsPropTypes = {
  show: PropTypes.bool,
  indicatorNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeName: PropTypes.string.isRequired,
  onIndicatorClick: PropTypes.func,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    indicator: PropTypes.string
  })
}
