import PropTypes from "prop-types"
import styles from "./Spinner.module.css"

export const classes = {
  container: (size, className) =>
    (className ?? "") +
    " " +
    (size ? styles[size.toLowerCase()] : "") +
    " " +
    styles.Container,
  dot: (type, className) =>
    (className ?? "") +
    " " +
    (type ? styles[type.toLowerCase()] : "") +
    " " +
    styles.Dot
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
  size: PropTypes.oneOf(["xxs", "xs", "md", "lg", "xl", "xxl"]),
  type: PropTypes.oneOf(validTypes),
  classNames: PropTypes.exact({
    container: PropTypes.string,
    dot: PropTypes.string
  })
}
