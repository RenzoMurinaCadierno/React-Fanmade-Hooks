import PropTypes from "prop-types"

export const classes = {
  arrowComponent: (classNames = {}) => ({
    container: classNames.container ?? "",
    arrow: classNames.arrow ?? ""
  })
}

export const carouselArrowsPropTypes = {
  show: PropTypes.bool,
  directions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  classNames: PropTypes.shape({
    container: PropTypes.string,
    indicator: PropTypes.string
  })
}
