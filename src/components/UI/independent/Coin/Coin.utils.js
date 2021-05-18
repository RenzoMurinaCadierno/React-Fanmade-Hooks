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

export const coinPropTypes = {
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
  })
}

function validateStringOrImgElem(props, propName, cmpName) {
  // undefined fails silently (otherwise, first render will always throw error)
  if (!props[propName] || props[propName]?.type === "undefined") return
  // if the prop is not a React element, it must be a plain string
  if (typeof props[propName] !== "string" && !props[propName].type) {
    return throwTypeError(propName, props[propName], cmpName)
    // otherwise, it must be an <img /> JSX
  } else if (props[propName].type && props[propName].type !== "img") {
    return throwTypeError(propName, props[propName].type, cmpName, true)
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
  if (!props[propName]) return
  if (
    typeof props[propName] !== "number" ||
    props[propName] < 0 ||
    props[propName] > 1
  ) {
    return new TypeError(
      `Invalid prop "${propName}" with value ${props[propName]} supplied to "${componentName}". You must pass a number higher or equal to 0 and lower or equal to 1.`
    )
  }
}
