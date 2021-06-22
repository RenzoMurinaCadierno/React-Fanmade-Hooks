import PropTypes from "prop-types"

export const classes = {
  container: (className) => className,
  code: (className) => className,
  numPad: (classNames) => classNames,
  timerButton: (classNames) => classNames
}

export const defaultProps = { classNames: {} }

export const propTypes = {
  container: PropTypes.string,
  code: PropTypes.string,
  numPad: PropTypes.exact({
    container: PropTypes.string,
    buttons: PropTypes.string
  }),
  timerButton: PropTypes.exact({
    button: PropTypes.string,
    spinner: PropTypes.exact({
      container: PropTypes.string,
      dot: PropTypes.string
    }),
    progress: PropTypes.string
  })
}
go on