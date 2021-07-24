import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./AppbarLink.module.css"

export const classes = {
  container: (isActive, longString, className) =>
    styles.Container +
    cn.get(className) +
    cn.if(isActive, styles.Active) +
    cn.if(longString, styles.LongString)
}

export const propTypes = {
  isActive: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}
