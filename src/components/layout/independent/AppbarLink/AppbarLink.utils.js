import PropTypes from "prop-types"
import styles from "./AppbarLink.module.css"

export const classes = {
  container: (isActive, className) =>
    (className ?? "") +
    " " +
    (isActive ? styles.Active : "") +
    " " +
    styles.Container
}

export const appbarLinkPropTypes = {
  isActive: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}
