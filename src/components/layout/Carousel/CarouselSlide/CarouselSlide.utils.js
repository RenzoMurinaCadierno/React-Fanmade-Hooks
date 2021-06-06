import PropTypes from "prop-types"
import { Carousel } from "hub"
import styles from "./CarouselSlide.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  "animate-mount-left": styles.AnimateMountLeft,
  "animate-unmount-left": styles.AnimateUnmountLeft,
  "animate-mount-right": styles.AnimateMountRight,
  "animate-unmount-right": styles.AnimateUnmountRight
}

export const defaultProps = { timeout: 400, classNames: {} }

export const propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  timeout: PropTypes.number,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    animateMount: PropTypes.string,
    animateMountReverse: PropTypes.string,
    animateUnmount: PropTypes.string,
    animateUnmountReverse: PropTypes.string
  })
}

/**
 * Given current "ctx.direction", it returns the opposite one.
 *
 * @param {string} currentDirection "ctx.direction" (e.g.: 'left' or 'right')
 */
export function getReverseDirection(currentDirection) {
  const [left, right] = Carousel.defaultCtx.directions
  return currentDirection === left ? right : left
}
