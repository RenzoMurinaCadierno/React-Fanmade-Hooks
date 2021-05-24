import PropTypes from "prop-types"
import styles from "./CarouselArrow.module.css"

export const classes = {
  container: (direction, className) =>
    (className ?? "") +
    " " +
    (direction ? styles["Container" + capitalize(direction)] : "") +
    " " +
    styles.Container,
  arrow: (direction, className) =>
    (className ?? "") +
    " " +
    (direction ? styles["Arrow" + capitalize(direction)] : "") +
    " " +
    styles.Arrow,
  "animate-arrow-left": styles.AnimateArrowLeft,
  "animate-arrow-right": styles.AnimateArrowRight
}

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase()
}

export const carouselArrowPropTypes = {
  direction: PropTypes.oneOf(["left", "right"]).isRequired,
  onClick: PropTypes.func,
  classNames: PropTypes.shape({
    container: PropTypes.string,
    arrow: PropTypes.string
  })
}
