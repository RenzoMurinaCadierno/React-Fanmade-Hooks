import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./Input.module.css"

export const classes = {
  container: (className) => styles.Container + cn.get(className)
}

export const inputPropTypes = {
  className: PropTypes.string
}
