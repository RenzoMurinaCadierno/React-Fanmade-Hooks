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

const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "#", "*"]

export function getCode() {
  let code = []
  while (code.length < 2) {
    const digit = digits[Math.floor(Math.random() * digits.length)]
    if (!code.includes(digit)) code = [...code, digit]
  }
  return code
}

export function haveExactValues(attempts, code) {
  if (!attempts.length || attempts.length !== code.length) return false
  if (attempts.some((value) => !code.includes(value))) return false
  return true
}
