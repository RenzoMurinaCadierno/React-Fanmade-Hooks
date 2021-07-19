import PropTypes from "prop-types"
import styles from "./IconExpandable.module.css"

export const classes = {
  container: (className) =>
    (className ? className + " " : "") + styles.Container,
  icon: (className) => (className ? className + " " : "") + styles.Icon,
  content: (isExpanded, expandDirection, className) =>
    (className ?? "") +
    " " +
    (isExpanded ? styles.ContentExpanded : "") +
    " " +
    (expandDirection ? styles[expandDirection] : "") +
    " " +
    styles.Content,
  barrier: (className) => (className ? className + " " : "") + styles.Barrier
}

export const defaultProps = {
  type: "primary",
  expandDirection: "right",
  classNames: {},
  iconProps: {},
  contentProps: {},
  barrierProps: {}
}

export const propTypes = {
  type: PropTypes.oneOf([
    "primary",
    "primary-0",
    "primary-1",
    "secondary",
    "secondary-0",
    "secondary-1",
    "danger",
    "danger-0",
    "danger-1"
  ]),
  icon: validateStringOrImgElem,
  content: PropTypes.node,
  expand: PropTypes.bool,
  expandDirection: PropTypes.oneOf(["left", "right"]),
  tabIndex: PropTypes.number,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onIconClick: PropTypes.func,
  onContentClick: PropTypes.func,
  disabled: PropTypes.bool,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    icon: PropTypes.string,
    content: PropTypes.string,
    barrier: PropTypes.string
  })
}

function validateStringOrImgElem(props, propName, cmpName) {
  // undefined fails silently (otherwise, first render will always throw error)
  if (!props[propName] || props[propName]?.type === "undefined") return
  // if the prop is not a React element, it must be a plain string
  if (typeof props[propName] !== "string" && !props[propName].type) {
    return throwTypeError(propName, props[propName], cmpName)
    // otherwise, it must be an '*img*'
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

export function typeOf(variable) {
  return {
    is: function (...types) {
      return types.some((type) => typeof variable === type)
    }
  }
}
