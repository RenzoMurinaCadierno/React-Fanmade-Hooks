import { memo } from "react"
import { Container, useClassNameToggle, Carousel } from "hub"
import pointer from "assets/icons/pointer.svg"
import { classes, defaultProps, propTypes } from "./CarouselArrow.utils"

/**
 * Renders the circle container with the arrow that controls sliding
 * '*CarouselSlides*' left or right. It also handles the arrow animation logic.
 *
 * @param {object} props
 *
 * `direction` (string): "left" or "right". Where arrows point to.
 *
 * `imgSrc?` (string): Path to svg image to use as arrow '*img*' "src". Defaults
 *   to a pointer one.
 *
 * `onClick?` (function): "scrollSlide" handler coming from '*Carousel*'.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its consitution.
 *
 * `arrowImgProps?` (object): Props to spread in arrow '*img*'.
 *
 * `...otherProps?` (object): Props to spread in wrapper '*Container*'.
 */
function CarouselArrow({
  direction,
  imgSrc,
  onClick,
  classNames,
  arrowImgProps,
  ...otherProps
}) {
  // className toggling class, triggerer and animation state boolean
  const [swingCN, triggerSwingCN, isSwinging] = useClassNameToggle({
    className: classes["animate-arrow-" + direction],
    timeout: 400
  })

  function handleClick() {
    // add animation className (triggers animation)
    triggerSwingCN()
    // trigger parent's "scrollSlide". Pass direction to target next active
    // slide name (the one on the left or right of slide names array), and a
    // boolean true to stun (freeze) scrolling.
    onClick?.(direction, true)
  }

  return (
    // wrapper container (the circle wrapping the arrow)
    <Container
      type="primary"
      role="button"
      onClick={isSwinging ? null : handleClick}
      className={classes.container(direction, classNames.container)}
      {...otherProps}
    >
      {/* pointer arrow '*img*' */}
      <img
        src={imgSrc ?? pointer}
        // Carousel.defaultCtx.directions[0] === 'left'
        alt={`${
          direction === Carousel.defaultCtx.directions[0] ? "previous" : "next"
        } slide`}
        className={classes.arrow(direction, classNames.arrow) + " " + swingCN}
        {...arrowImgProps}
      />
    </Container>
  )
}

CarouselArrow.defaultProps = defaultProps
CarouselArrow.propTypes = propTypes

export default memo(CarouselArrow)
