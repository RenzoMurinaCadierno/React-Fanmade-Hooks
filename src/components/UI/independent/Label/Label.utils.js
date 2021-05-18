import PropTypes from "prop-types"
import styles from "./Label.module.css"

export const classes = {
  container: (isActive, targetInputType, className) =>
    (className ?? "") +
    " " +
    styles.Container +
    " " +
    (targetInputType ? styles[targetInputType.toLowerCase()] : "") +
    " " +
    (targetInputType && isActive
      ? styles[targetInputType.toLowerCase() + "Active"]
      : "")
}

export const labelPropTypes = {
  children: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  targetInputType: validateInputType,
  className: PropTypes.string
}

const inputTypes = [
  "checkbox",
  "color",
  "date",
  "datetime-local",
  "email",
  "file",
  "month",
  "number",
  "password",
  "radio",
  "range",
  "search",
  "tel",
  "text",
  "time",
  "url",
  "week"
]

function validateInputType(props, propName, componentName) {
  if (!props[propName]) return
  if (!inputTypes.includes(props[propName])) {
    return new TypeError(
      `Invalid prop "${propName}" with value \`${props[propName]}\` supplied to "${componentName}". Expected one of these strings (case-sensitive): "checkbox", "color", "date", "datetime-local", "email", "file", "month", "number", "password", "radio", "range", "search", "tel", "text", "time", "url", "week".`
    )
  }
}
