import PropTypes from "prop-types"
// import styles from './CodeRushNumPad.module.css'

export const classes = { numPad: (classNames) => classNames }

export const defaultProps = { classNames: {} }

export const propTypes = {
  onButtonClick: PropTypes.func,
  disabled: PropTypes.bool,
  buttonProps: PropTypes.objectOf(PropTypes.object),
  classNames: PropTypes.exact({
    container: PropTypes.string,
    button: PropTypes.string
  })
}
