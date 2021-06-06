import PropTypes from "prop-types"
import styles from "./SlotsEffectBadgeContent.module.css"

export const classes = {
  container: (type, className) =>
    (className ?? "") +
    " " +
    (type ? styles[type.toLowerCase()] : "") +
    " " +
    styles.Container,
  content: (className) => (className ?? "") + " " + styles.Content,
  image: (className) => (className ?? "") + " " + styles.Image
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
