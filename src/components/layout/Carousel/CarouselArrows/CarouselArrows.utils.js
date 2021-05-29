import PropTypes from "prop-types"

export const classes = {
  arrowComponent: (classNames) => classNames
}

export const carouselArrowsPropTypes = {
  show: PropTypes.bool,
  directions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    arrow: PropTypes.string
  })
}
