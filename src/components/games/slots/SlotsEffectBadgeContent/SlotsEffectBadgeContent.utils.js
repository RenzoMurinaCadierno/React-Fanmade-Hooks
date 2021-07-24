import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./SlotsEffectBadgeContent.module.css"

export const classes = {
  container: (type, className) =>
    cnp.default(styles.Container, className) +
    cnp.if(type, styles[type?.toLowerCase()]),
  content: (className) => cnp.default(styles.Content, className),
  image: (className) => cnp.default(styles.Image, className)
}

export const defaultProps = { classNames: {} }

export const propTypes = {
  content: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["primary", "secondary"]),
  classNames: PropTypes.exact({
    container: PropTypes.string,
    content: PropTypes.string,
    image: PropTypes.string
  })
}
