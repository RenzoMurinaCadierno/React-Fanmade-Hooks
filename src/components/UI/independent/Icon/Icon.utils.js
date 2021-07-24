import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./Icon.module.css"

export const classes = {
  container: (type, className) =>
    styles.Container + cn.get(className) + cn.if(type, styles[type])
}

export const defaultProps = { type: "primary" }

export const propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf([
    "primary",
    "primary-0",
    "primary-1",
    "secondary",
    "secondary-0",
    "secondary-1",
    "danger",
    "danger-0",
    "danger-1"
  ]),
  className: PropTypes.string
}
