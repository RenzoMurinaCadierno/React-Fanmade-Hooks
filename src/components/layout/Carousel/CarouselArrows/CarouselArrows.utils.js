import PropTypes from "prop-types"

export const classes = { arrowComponent: (classNames) => classNames }

export const defaultProps = { classNames: {} }

export const propTypes = {
  show: PropTypes.bool,
  directions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    arrow: PropTypes.string
  })
}
