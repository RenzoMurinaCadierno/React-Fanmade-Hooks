import PropTypes from "prop-types"

export const defaultProps = { content: 0 }

export const propTypes = {
  content: PropTypes.number.isRequired,
  hookConfigs: PropTypes.shape({
    timeout: PropTypes.number,
    step: PropTypes.number,
    iterations: PropTypes.number,
    toFixed: PropTypes.number,
    roundDecimals: PropTypes.bool,
    returnType: PropTypes.oneOf(["number", "string"]),
    lastIterationPrecision: PropTypes.number,
    toFixedProgress: PropTypes.number,
    onStart: PropTypes.func,
    onIteration: PropTypes.func,
    onFinish: PropTypes.func,
    onAbort: PropTypes.func
  }),
  otherProps: PropTypes.object
}
