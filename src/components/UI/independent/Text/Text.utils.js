import PropTypes from "prop-types"
import styles from "./Text.module.css"

export const classes = {
  container: (
    component,
    type,
    small,
    italic,
    bold,
    textShadow,
    absoluteFill,
    flex,
    noMargin,
    onClick,
    className
  ) =>
    (className ?? "") +
    " " +
    styles.Container +
    " " +
    (component ? styles[component] : "") +
    " " +
    (type ? styles[type.toLowerCase()] : "") +
    " " +
    (small ? styles.Small : "") +
    " " +
    (italic ? styles.Italic : "") +
    " " +
    (textShadow ? styles["text-shadow-" + type.toLowerCase()] : "") +
    " " +
    (bold ? styles.Bold : "") +
    " " +
    (absoluteFill ? styles.AbsoluteFill : "") +
    " " +
    (flex ? styles.Flex : "") +
    " " +
    (noMargin ? styles.NoMargin : "") +
    " " +
    (onClick ? styles.Clickable : "")
}

export const defaultProps = { htmlElem: "p", type: "primary" }

const validHtmlElements = ["span", "p", "h1", "h2", "h3", "h4", "h5", "h6"]

const validTextTypes = [
  "primary",
  "primary-0",
  "primary-1",
  "primary-2",
  "primary-3",
  "secondary",
  "secondary-0",
  "secondary-1",
  "secondary-2",
  "secondary-3",
  "danger",
  "danger-0",
  "danger-1",
  "danger-2",
  "danger-3"
]

export const propTypes = {
  htmlElem: PropTypes.oneOf(validHtmlElements),
  type: PropTypes.oneOf(validTextTypes),
  italic: PropTypes.bool,
  bold: PropTypes.bool,
  small: PropTypes.bool,
  textShadow: PropTypes.bool,
  absolutefill: PropTypes.bool,
  flex: PropTypes.bool,
  noMargin: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string
}
