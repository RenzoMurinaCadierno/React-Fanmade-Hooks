import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
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
    cnp.default(styles.Container, className) +
    cnp.if(type, styles[type?.toLowerCase()]) +
    cnp.if(flexDirection, styles[flexDirection?.toLowerCase()]) +
    cnp.if(alignItems, styles["align-" + alignItems?.toLowerCase()]) +
    cnp.if(justifyContent, styles["justify-" + justifyContent?.toLowerCase()]) +
    cnp.if(roundBorders, styles.RoundBorders) +
    cnp.if(circle, styles.Circle)
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
