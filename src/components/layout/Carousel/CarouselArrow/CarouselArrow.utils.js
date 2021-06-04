import PropTypes from "prop-types"
import styles from "./CarouselArrow.module.css"

export const classes = {
  container: (direction, className) =>
    (className ?? "") +
    " " +
    (direction ? styles[capitalize(direction)] : "") +
    " " +
    styles.Container,
  arrow: (direction, className) =>
    (className ?? "") +
    " " +
    (direction ? styles[capitalize(direction)] : "") +
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
  imgSrc: PropTypes.string,
  onClick: PropTypes.func,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    arrow: PropTypes.string
  }),
  arrowImgProps: PropTypes.object,
  otherProps: PropTypes.object
}
