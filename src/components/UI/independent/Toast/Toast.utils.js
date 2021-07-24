import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./Toast.module.css"

export const classes = {
  container: (animation, position, className) =>
    styles.Container +
    cn.get(className) +
    cn.or(
      animation === "open",
      styles[(position?.toLowerCase() || "bottom") + "-open"],
      cn.if(
        animation === "close",
        styles[(position?.toLowerCase() || "bottom") + "-close"]
      )
    ) +
    cn.or(position, styles[position?.toLowerCase()], styles.bottom),
  content: (className) => styles.Content + cn.get(className),
  toggler: (className) => styles.Toggler + cn.get(className)
}

export const defaultProps = {
  show: false,
  position: "bottom",
  timeout: 2000,
  classNames: {},
  contentProps: {},
  togglerProps: {}
}

export const propTypes = {
  show: PropTypes.bool.isRequired,
  position: PropTypes.oneOf(["center", "bottom", "left", "top", "right"]),
  timeout: PropTypes.number,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.node,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    content: PropTypes.string,
    toggler: PropTypes.string
  })
}
