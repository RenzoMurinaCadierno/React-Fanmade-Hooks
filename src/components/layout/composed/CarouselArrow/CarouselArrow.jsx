import { useCallback, memo } from "react"
import { Container, useClassNameToggle } from "hub"
import { classes, carouselArrowPropTypes } from "./CarouselArrow.utils"

/**
 * Renders the circle container with the arrow that controls sliding
 * '*CarouselSlides*' left or right. It also handles the arrow
 * animation logic.
 *
 * @param {object} props
 *
 * `direction` (string): "left" or "right". Where arrows point to.
 *
 * `onClick?` (function): "scrollSlide" handler coming from '*Carousel*'.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its consitution.
 */
function CarouselArrow({ direction, onClick, classNames = {}, ...otherProps }) {
  // className toggling class, triggerer and animation state boolean
  const [swingCN, triggerSwingCN, isSwinging] = useClassNameToggle({
    className: classes["animate-arrow-" + direction],
    timeout: 400
  })

  /* eslint-disable react-hooks/exhaustive-deps */
  const handleClick = useCallback(() => {
    // add animation className (triggers animation)
    triggerSwingCN()
    // trigger parent's "scrollSlide". Pass direction to target next active
    // slide name (the one on the left or right of slide names array), and a
    // boolean true to stun (freeze) scrolling.
    onClick?.(direction, true)
  }, [])

  return (
    // wrapper container (the circle wrapping the arrow)
    <Container
      type="primary"
      onClick={isSwinging ? null : handleClick}
      className={classes.container(direction, classNames.container)}
      {...otherProps}
    >
      {/* '*div*' and its ::after to create an 'arrow' shape */}
      <div
        className={classes.arrow(direction, classNames.arrow) + " " + swingCN}
      />
    </Container>
  )
}

CarouselArrow.propTypes = carouselArrowPropTypes

export default memo(CarouselArrow)
