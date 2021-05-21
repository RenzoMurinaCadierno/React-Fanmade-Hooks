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

export const slotsEffectBadgeContentPropTypes = {
  content: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["primary", "secondary"]),
  classNames: PropTypes.shape({
    container: PropTypes.string,
    content: PropTypes.string,
    image: PropTypes.string
  })
}