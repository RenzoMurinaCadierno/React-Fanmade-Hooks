import { Carousel } from "hub"
import { classes, defaultProps, propTypes } from "./CarouselArrows.utils"

/**
 * Container element to wrap all '*CarouselArrow*'s, which serves as controls
 * to scroll slides. It renders two of them, one to scroll to each side.
 *
 * @param {object} props
 *
 * `show` (boolean): true will mount the component, displaying the arrows.
 *
 * `directions` (Array): An array of two elements type string, , to use as
 *   valid transition directions in '*CarouselArrow*' `direction`.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 */
export default function CarouselArrows({
  show,
  directions,
  classNames,
  ...otherProps
}) {
  return (
    show &&
    directions.map((direction, i) => (
      <Carousel.Arrow
        key={direction}
        direction={direction}
        circle
        tabIndex={i + 1}
        classNames={classes.arrowComponent(classNames)}
        {...otherProps}
      />
    ))
  )
}

CarouselArrows.defaultProps = defaultProps
CarouselArrows.propTypes = propTypes
