import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./CarouselIndicators.module.css"

export const classes = {
  container: (className) => cnp.default(styles.Container, className)
}

export const defaultProps = {
  show: true,
  indicatorNames: [],
  classNames: {}
}

export const propTypes = {
  show: PropTypes.bool,
  indicatorNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeName: PropTypes.string.isRequired,
  onIndicatorClick: PropTypes.func,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    indicator: PropTypes.string
  })
}
