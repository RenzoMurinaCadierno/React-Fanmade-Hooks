import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./ConfettiGuideY.module.css"

export const classes = {
  container: (altitude, className) =>
    cnp.default(styles.Container, className) +
    cnp.if(altitude, styles["altitude-" + altitude])
}

export const defaultProps = { altitude: 5 }

export const propTypes = {
  children: PropTypes.node.isRequired,
  altitude: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9]),
  className: PropTypes.string
}
