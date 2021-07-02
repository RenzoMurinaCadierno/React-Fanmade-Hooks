import { createContext } from "react"
import CarouselArrow from "./CarouselArrow/CarouselArrow"
import CarouselArrows from "./CarouselArrows/CarouselArrows"
import CarouselIndicator from "./CarouselIndicator/CarouselIndicator"
import CarouselIndicators from "./CarouselIndicators/CarouselIndicators"
import CarouselRoot from "./CarouselRoot/CarouselRoot"
import CarouselSlide from "./CarouselSlide/CarouselSlide"
import CarouselSlideUnidirectional from "./CarouselSlideUnidirectional/CarouselSlideUnidirectional"

// simpler version of '*CarouselSlide*'. It only animates from one direction
// to the other (not reverse). Created for performance issues.
CarouselSlide.Unidirectional = CarouselSlideUnidirectional

const directions = ["left", "right"]

const defaultCtx = {
  // array of two elements used as valid directions to calculate which slide to
  // render next, and the animations to trigger.
  directions,
  // 'scrolling animation' orientation used by '*CarouselSlide*'(s) and
  // '*CarouselSlideUnidirectional*'
  direction: directions[0],
  // determines 'mount' and 'unmount' animations only in '*CarouselSlide*'.
  // Check the comments in "useEffect" there..
  directionBool: false,
  // currently active '*CarouselSlide*'(s) and '*CarouselSlideUnidirectional*'
  // `name`.
  activeName: "",
  // an array with all '*CarouselSlide*'(s) and '*CarouselSlideUnidirectional*'
  // `name`s
  names: [],
  // '*CarouselSlide*' "jumpToSlide" callback
  jumpToSlide: () => {},
  // '*CarouselSlide*' "scrollSlide" callback
  scrollSlide: () => {}
}

/**
 * Context to pass to '*CarouselSlide*'(s) or '*CarouselSlideUnidirectional*'
 * rendered as `children` of '*CarouselRoot*'
 */
const context = createContext(defaultCtx)

function ComposedCarousel(props) {
  return <CarouselRoot {...props} />
}

ComposedCarousel.Arrow = CarouselArrow
ComposedCarousel.Arrows = CarouselArrows
ComposedCarousel.Indicator = CarouselIndicator
ComposedCarousel.Indicators = CarouselIndicators
ComposedCarousel.Slide = CarouselSlide
ComposedCarousel.defaultCtx = defaultCtx
ComposedCarousel.Context = context

export default ComposedCarousel
