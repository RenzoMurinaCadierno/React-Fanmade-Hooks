import PropTypes from "prop-types"
// import sytles from './CodeRushCode.module.css'

export const classes = { container: (className) => className }

export const defaultProps = { code: [] }

export const propTypes = {
  code: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string
}
