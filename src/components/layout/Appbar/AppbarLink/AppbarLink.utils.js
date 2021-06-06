import PropTypes from "prop-types"
import styles from "./AppbarLink.module.css"

export const classes = {
  container: (isActive, longString, className) =>
    (className ?? "") +
    " " +
    (isActive ? styles.Active : "") +
    " " +
    (longString ? styles.LongString : "") +
    " " +
    styles.Container
}

export const propTypes = {
  isActive: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}
