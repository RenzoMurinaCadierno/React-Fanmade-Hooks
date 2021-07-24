import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./Underline.module.css"

export const classes = {
  container: (className, isFocused) =>
    styles.Container + cn.get(className) + cn.if(isFocused, styles.Focused)
}

export const propTypes = {
  isFocused: PropTypes.bool,
  className: PropTypes.string
}
