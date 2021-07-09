import PropTypes from "prop-types"
import styles from "./ConfettiGuideY.module.css"

export const classes = {
  container: (altitude, className) =>
    (className ?? "") +
    " " +
    (altitude ? styles["altitude-" + altitude.toLowerCase()] : "") +
    " " +
    styles.Container
}

export const defaultProps = { altitude: "lowest" }

export const propTypes = {
  altitude: PropTypes.oneOf(["lowest", "low", "medium", "high", "highest"]),
  className: PropTypes.string
}
