import React from "react"
import PropTypes from "prop-types"
import styles from "./Carousel.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  screen: (className) => (className ?? "") + " " + styles.Screen,
  slidesContainer: (className) =>
    (className ?? "") + " " + styles.SlidesContainer,
  arrowComponent: (containerClassName, arrowClassName) => ({
    container: containerClassName ?? "",
    arrow: arrowClassName ?? ""
  }),
  carouselIndicators: (containerClassName, indicatorClassName) => ({
    container: containerClassName ?? "",
    indicator: indicatorClassName ?? ""
  })
}

export const arrowDirections = ["left", "right"]

export const defaultCtx = {
  transitionDirection: "left",
  activeName: "",
  names: [],
  jumpToSlide: () => {},
  scrollSlide: () => {}
}

export const carouselPropTypes = {
  children: validateChildren,
  autoScroll: PropTypes.bool,
  autoScrollInterval: PropTypes.number,
  autoScrollDirection: PropTypes.oneOf(["left", "right"]),
  resumeAutoScrollTimeout: PropTypes.number,
  disableAutoScrollWhileActive: PropTypes.bool,
  pauseAutoScrollOnInteraction: PropTypes.bool,
  resumeAutoScrollOn: PropTypes.bool,
  showArrow: PropTypes.bool,
  showIndicators: PropTypes.bool,
  onSlideClick: PropTypes.func,
  classNames: PropTypes.shape({
    container: PropTypes.string,
    screen: PropTypes.string,
    slidesContainer: PropTypes.string,
    arrowContainer: PropTypes.string,
    arrow: PropTypes.string,
    indicatorsContainer: PropTypes.string
  })
}

/**
 * Validates that children is a '*CarouselSlide*' React element or an array of
 * them. Throws a PropType error if validation fails.
 *
 * @param {object} props '*Carousel*'s props
 * @param {string} propName "children"
 * @param {string} componentName 'Carousel'
 */
function validateChildren(props, propName, componentName) {
  const children = props[propName]
  // if there is nothing to validate, skip the process
  if (!children) return

  const isArrayOfJSX = Array.isArray(children)
  const isCarouselSlide = isCarouselSlideJSX(children)

  // given the case children is not one '*CarouselSlide*' or multiple React
  // elements, throw a PropType error directly.
  if (!isArrayOfJSX && !isCarouselSlide) {
    return new TypeError(
      `Invalid prop "${propName}" of type ${typeof children} supplied to <${componentName} />. Expected a <CarouselSlide /> React component or an array of them.`
    )
  }
  // if there are one or more React elements as children, we must validate they
  // are '*CarouselSlide*'s
  if (isArrayOfJSX) {
    const usedNames = []
    const invalidElements = []
    // for each of those items rendered in children
    children.forEach((item, i) => {
      // if the element is a '*CarouselSlide*', it has a prop `name` type
      // string, and that prop is not equal to the other '*CarouselSlide*'s
      if (
        isCarouselSlideJSX(item) &&
        typeof item.props.name === "string" &&
        usedNames.findIndex((name) => name === item.props.name) === -1
      ) {
        // push that name to the array that checks for repeated instances
        usedNames.push(item.props.name)
      } else {
        // otherwise, the element is invalid, push it to the array that
        // collects elements to throw the PropType error
        invalidElements.push([i, item.props.name])
      }
    })
    // if there is at least one name in "invalidElements" array, throw a
    // PropType error for each name there
    if (invalidElements.length) {
      const [indexes, names] = invalidElements.reduce(
        (acc, arr) => {
          acc[0].push(arr[0])
          acc[1].push("`" + arr[1] + "`")
          return acc
        },
        [[], []]
      )
      return new TypeError(
        `Invalid React node(s) supplied as children to <${componentName} /> (@ children index(es): ${indexes.join(
          ", "
        )}).\n\nChildren must be one or more <CarouselSlide /> component(s).\n\nThey must also have the prop "name" of type string and unique for each one (repeated/invalid found names: ${
          names.join(", ") || "<none found>"
        }).\n`
      )
    }
  }
}

/**
 * Validates that the item is a '*CarouselSlide*' React element.
 *
 * @param {function} item React.Element to validate
 */
function isCarouselSlideJSX(item) {
  return React.isValidElement(item) && item?.type?.name === "CarouselSlide"
}
