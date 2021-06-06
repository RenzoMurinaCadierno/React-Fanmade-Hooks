import PropTypes from "prop-types"
import styles from "./Coin.module.css"

export const classes = {
  container: (isTossing, isFrozen, isColorInverted, className) =>
    (className ?? "") +
    " " +
    (isTossing ? styles.Toss : "") +
    " " +
    (isFrozen ? styles.Frozen : "") +
    " " +
    (isColorInverted ? styles.InvertColor : "") +
    " " +
    styles.Container,
  result: (className) => (className ?? "") + " " + styles.Result
}

export const defaultProps = {
  head: "O",
  tails: "X",
  toss: "?",
  successChance: 0.5,
  classNames: {},
  resultProps: {}
}

export const propTypes = {
  isFrozen: PropTypes.bool,
  head: validateStringOrImgElem,
  tails: validateStringOrImgElem,
  toss: validateStringOrImgElem,
  successChance: validateSuccessRange,
  onBeforeToss: PropTypes.func,
  onAfterToss: PropTypes.func,
  changeColor: PropTypes.bool,
  classNames: PropTypes.shape({
    container: PropTypes.string,
    result: PropTypes.string
  }),
  resultProps: PropTypes.object,
  otherProps: PropTypes.object
}

function validateStringOrImgElem(props, propName, cmpName) {
  const targetProp = props[propName]
  // undefined fails silently (otherwise, first render will always throw error)
  if (!targetProp || targetProp?.type === "undefined") return
  // if the prop is not a React element, it must be a plain string
  if (typeof targetProp !== "string" && !targetProp.type) {
    return throwTypeError(propName, targetProp, cmpName)
    // otherwise, it must be an '*img*'
  } else if (targetProp.type && targetProp.type !== "img") {
    return throwTypeError(propName, targetProp.type, cmpName, true)
  }
}

function throwTypeError(propName, targetPropType, cmpName, isJSX) {
  return new TypeError(
    `Invalid prop "${propName}" of type ${
      isJSX
        ? `React.node \`${targetPropType}\``
        : `\`${typeof targetPropType}\` with value \`${targetPropType}\``
    } supplied to "${cmpName}". Expected \`string\` or React Element type \`img\`.`
  )
}

function validateSuccessRange(props, propName, componentName) {
  const targetProp = props[propName]
  if (!targetProp) return
  if (typeof targetProp !== "number" || targetProp < 0 || targetProp > 1) {
    return new TypeError(
      `Invalid prop "${propName}" with value ${targetProp} supplied to "${componentName}". You must pass a number higher or equal to 0 and lower or equal to 1.`
    )
  }
}
