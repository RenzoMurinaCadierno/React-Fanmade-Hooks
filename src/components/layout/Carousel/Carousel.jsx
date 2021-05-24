import { createContext } from "react"
import CarouselArrow from "./CarouselArrow/CarouselArrow"
import CarouselIndicator from "./CarouselIndicator/CarouselIndicator"
import CarouselIndicators from "./CarouselIndicators/CarouselIndicators"
import CarouselRoot from "./CarouselRoot/CarouselRoot"
import CarouselSlide from "./CarouselSlide/CarouselSlide"

const defaultCtx = {
  transitionDirection: "left",
  activeName: "",
  names: [],
  jumpToSlide: () => {},
  scrollSlide: () => {}
}

// context to pass to '*CarouselSlide*'(s) rendered as `children` of
// '*CarouselRoot*'
const context = createContext(defaultCtx)

const Carousel = {
  Root: CarouselRoot,
  Arrow: CarouselArrow,
  Indicator: CarouselIndicator,
  Indicators: CarouselIndicators,
  Slide: CarouselSlide,
  defaultCtx,
  context
}

export default Carousel
