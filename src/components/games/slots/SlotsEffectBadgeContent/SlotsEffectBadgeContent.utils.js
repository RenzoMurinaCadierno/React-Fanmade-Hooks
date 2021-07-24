import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./SlotsEffectBadgeContent.module.css"

export const classes = {
  container: (type, className) =>
    styles.Container +
    cn.get(className) +
    cn.if(type, styles[type?.toLowerCase()]),
  content: (className) => styles.Content + cn.get(className),
  image: (className) => styles.Image + cn.get(className)
}

export const defaultProps = { classNames: {} }

export const propTypes = {
  content: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["primary", "secondary"]),
  classNames: PropTypes.exact({
    container: PropTypes.string,
    content: PropTypes.string,
    image: PropTypes.string
  })
}
