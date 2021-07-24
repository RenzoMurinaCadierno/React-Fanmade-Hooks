import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./Label.module.css"

export const classes = {
  container: (isActive, targetInputType, className) =>
    styles.Container +
    cn.get(className) +
    cn.if(targetInputType, styles[targetInputType?.toLowerCase()]) +
    cn.if(
      targetInputType && isActive,
      styles[targetInputType?.toLowerCase() + "Active"]
    )
}

export const defaultProps = { targetInputType: "text" }

export const propTypes = {
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
  const targetInputType = props[propName]

  if (typeof targetInputType === "undefined") return

  if (!inputTypes.includes(targetInputType)) {
    return new TypeError(
      `Invalid prop "${propName}" with value \`${targetInputType}\` supplied to "${componentName}". Expected one of these strings (case-sensitive): "checkbox", "color", "date", "datetime-local", "email", "file", "month", "number", "password", "radio", "range", "search", "tel", "text", "time", "url", "week".`
    )
  }
}
