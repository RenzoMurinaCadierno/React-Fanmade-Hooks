import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./Container.module.css"

export const classes = {
  container: (
    type,
    flexDirection,
    alignItems,
    justifyContent,
    roundBorders,
    circle,
    className
  ) =>
    styles.Container +
    cn.get(className) +
    cn.if(type, styles[type?.toLowerCase()]) +
    cn.if(flexDirection, styles[flexDirection?.toLowerCase()]) +
    cn.if(alignItems, styles["align-" + alignItems?.toLowerCase()]) +
    cn.if(justifyContent, styles["justify-" + justifyContent?.toLowerCase()]) +
    cn.if(roundBorders, styles.RoundBorders) +
    cn.if(circle, styles.Circle)
}

export const defaultProps = { htmlElem: "div" }

export const propTypes = {
  component: PropTypes.string,
  type: PropTypes.oneOf(["primary", "secondary", "danger"]),
  flexDirection: PropTypes.string,
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
  roundBorders: PropTypes.bool,
  circle: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node
}
