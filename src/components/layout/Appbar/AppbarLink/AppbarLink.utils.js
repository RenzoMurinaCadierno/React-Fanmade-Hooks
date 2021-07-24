import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./AppbarLink.module.css"

export const classes = {
  container: (isActive, longString, className) =>
    cnp.default(styles.Container, className) +
    cnp.if(isActive, styles.Active) +
    cnp.if(longString, styles.LongString)
}

export const propTypes = {
  isActive: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}
