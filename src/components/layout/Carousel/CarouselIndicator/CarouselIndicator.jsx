import { classes, propTypes } from "./CarouselIndicator.utils"

/**
 * Renders a single "active slide index" indicator (spot at bottom of
 * carousel).
 *
 * It is summoned by '*CarouselIndicators*' to form the array of indicators
 * that marks the current index position of the slide in the carousel.
 *
 * @param {object} props
 *
 * `name` (string): must match a name of a '*CarouselSlide*', passed as prop by
 *   '*CarouselIndicators*'.
 *
 * `isActive` (boolean): true will highlight it.
 *
 * `className?` (string): incoming className string, if needed.
 */
export default function CarouselIndicator({
  name,
  isActive,
  className,
  ...otherProps
}) {
  return (
    <div
      data-name={name}
      className={classes.container(isActive, className)}
      {...otherProps}
    />
  )
}

CarouselIndicator.propTypes = propTypes
