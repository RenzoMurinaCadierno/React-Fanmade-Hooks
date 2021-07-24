import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./CarouselArrow.module.css"

export const classes = {
  container: (direction, className) =>
    cnp.default(styles.Container, className) +
    cnp.if(direction, styles[capitalize(direction)]),
  arrow: (direction, className) =>
    cnp.default(styles.Arrow, className) +
    cnp.if(direction, styles[capitalize(direction)]),
  "animate-arrow-left": styles.AnimateArrowLeft,
  "animate-arrow-right": styles.AnimateArrowRight
}

function capitalize(word) {
  return word?.[0].toUpperCase() + word?.slice(1).toLowerCase()
}

export const defaultProps = { classNames: {}, arrowImgProps: {} }

export const propTypes = {
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
