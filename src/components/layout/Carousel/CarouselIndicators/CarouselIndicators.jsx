import { Carousel } from "hub"
import { classes, propTypes, defaultProps } from "./CarouselIndicators.utils"

/**
 * Container element to wrap all '*CarouselIndicator*'s. It renders one of them
 * for each '*CarouselSlide*' inside '*Carousel*'.
 *
 * Keep in mind each '*CarouselSlide*' must have a defined `name`, and it must
 * match the ones inside `indicatorNames` here.
 *
 * @param {object} props
 *
 * `show` (boolean): true will mount the component, displaying the indicators.
 *
 * `indicatorNames` (String[]): the names of all '*CarouselSlides*'(s)
 *   rendered as children of '*Carousel*'.
 *
 * `activeName` (string): the name of the active slide.
 *
 * `onIndicatorClick?` (function): "onClick" callback for each '*Indicator*'.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 */
export default function CarouselIndicators({
  show,
  indicatorNames,
  activeName,
  onIndicatorClick,
  classNames,
  ...otherProps
}) {
  function handleIndicatorClick(e) {
    onIndicatorClick(e.target.dataset.name)
  }

  return (
    show && (
      <div
        className={classes.container(classNames.container)}
        // calculate width depending on how many '*CarouselSlides*' are
        // rendered as '*Carousel*' children
        style={{ width: `${indicatorNames.length * 9}%` }}
        {...otherProps}
      >
        {indicatorNames.map((name) => (
          <Carousel.Indicator
            key={name}
            name={name}
            isActive={name === activeName}
            onClick={handleIndicatorClick}
            className={classNames.indicator}
          />
        ))}
      </div>
    )
  )
}

CarouselIndicators.defaultProps = defaultProps
CarouselIndicators.propTypes = propTypes
