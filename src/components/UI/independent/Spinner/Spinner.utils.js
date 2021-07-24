import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./Spinner.module.css"

export const classes = {
  container: (size, className) =>
    styles.Container +
    cnp.get(className) +
    cnp.if(size, styles[size?.toLowerCase()]),
  dot: (type, className) =>
    styles.Dot + cnp.get(className) + cnp.if(type, styles[type?.toLowerCase()])
}

export const defaultProps = { classNames: {} }

const validTypes = [
  "primary",
  "secondary",
  "danger",
  "primary-1",
  "secondary-1",
  "danger-1",
  "primary-2",
  "secondary-2",
  "danger-2",
  "primary-3",
  "secondary-3",
  "danger-3"
]

export const propTypes = {
  size: PropTypes.oneOf(["xxs", "xs", "sm", "md", "lg", "xl", "xxl"]),
  type: PropTypes.oneOf(validTypes),
  classNames: PropTypes.exact({
    container: PropTypes.string,
    dot: PropTypes.string
  })
}
