import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
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
    cnp.default(styles.Container, className) +
    cnp.if(component, styles[component]) +
    cnp.if(type, styles[type?.toLowerCase()]) +
    cnp.if(small, styles.Small) +
    cnp.if(italic, styles.Italic) +
    cnp.if(textShadow, styles["text-shadow-" + type?.toLowerCase()]) +
    cnp.if(bold, styles.Bold) +
    cnp.if(absoluteFill, styles.AbsoluteFill) +
    cnp.if(flex, styles.Flex) +
    cnp.if(noMargin, styles.NoMargin) +
    cnp.if(onClick, styles.Clickable)
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
