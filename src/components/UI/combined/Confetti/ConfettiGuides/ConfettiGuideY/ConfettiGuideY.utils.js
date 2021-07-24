import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./ConfettiGuideY.module.css"

export const classes = {
  container: (altitude, className) =>
    styles.Container +
    cn.get(className) +
    cn.if(altitude, styles["altitude-" + altitude])
}

export const defaultProps = { altitude: 5 }

export const propTypes = {
  children: PropTypes.node.isRequired,
  altitude: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9]),
  className: PropTypes.string
}
