import React from "react"
import PropTypes from "prop-types"
import { Carousel } from "hub"
import { cn } from "utils/utilityFunctions"
import styles from "./CarouselRoot.module.css"

export const classes = {
  container: (className) => styles.Container + cn.get(className),
  screen: (className) => styles.Screen + cn.get(className),
  slidesContainer: (className) => styles.SlidesContainer + cn.get(className),
  arrowComponent: (classNames) => classNames,
  indicatorsComponent: (classNames) => classNames
}

export const defaultProps = {
  autoScroll: true,
  autoScrollInterval: 3000,
  autoScrollDirection: "right",
  resumeAutoScrollTimeout: 3000,
  showArrows: true,
  showIndicators: true,
  classNames: {}
}

export const propTypes = {
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
  classNames: PropTypes.exact({
    container: PropTypes.string,
    screen: PropTypes.string,
    slidesContainer: PropTypes.string,
    arrowComponent: PropTypes.exact({
      container: PropTypes.string,
      arrow: PropTypes.string
    }),
    indicatorsComponent: PropTypes.exact({
      container: PropTypes.string,
      indicator: PropTypes.string
    })
  })
}

/**
 * Validates that children is a '*CarouselSlide*' or
 * '*CarouselSlideUnidirectional*' React element, or an array of them. Throws a
 * PropType error if validation fails.
 *
 * @param {object} props '*Carousel*'s props
 * @param {string} propName `children`
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
        )}).\n\nChildren must be one or more <CarouselSlide /> or <CarouselSlideUnidirectional /> component(s).\n\nThey must also have the prop "name" of type string and unique for each one (repeated/invalid found names: ${
          names.join(", ") || "<none found>"
        }).\n`
      )
    }
  }
}

const validCarouselSlideNames = ["CarouselSlide", "CarouselSlideUnidirectional"]

/**
 * Validates that the item is a '*CarouselSlide*' or a
 * '*CarouselSlideUnidirectional*' React element.
 *
 * @param {function} item React.Element to validate
 */
function isCarouselSlideJSX(item) {
  return (
    React.isValidElement(item) &&
    validCarouselSlideNames.includes(item?.type?.name)
  )
}

/**
 * Creates a closure holding a boolean variable with one state assigned to slide
 * transitioning from 'x-side'-to-'y-side' (e.g.: from left to right), and the
 * other state for the opposite direction ('y-side'-to-'x-side', right to left).
 *
 * It returns a function that needs to be called when a slide is being scrolled
 * manually (like when tapping an arrow or an indicator), passing the previously
 * applied transition direction and the next one (calculated depending on the
 * next slide's `name` index compared to the current one in `names` array).
 *
 * If the previous and next transition directions match, the boolean will be
 * returned as is. Otherwise, it toggles and returns the opposite state.
 *
 * This is used by '*CarouselSlide*' to determine which animation handler to
 * trigger at mount and unmount phases, since each pair of "useValueToggle"
 * are responsible for only one set of animations (e.g.: mount and unmount left,
 * mount and unmount right).
 */
const getTransitionOrientationBool = (function () {
  let switchState = false
  return function (prevDirection, nextDirection) {
    if (prevDirection !== nextDirection) switchState = !switchState
    return switchState
  }
})()

/**
 * Handles setting '*Carousel*' "context" for names array, next active name,
 * transition direction and transition direction boolean.
 */
export const setNameAndTransitionRelatedContext = {
  /**
   * Sets ctx's "activeName" string and "names" array which will be passed as
   * context to `children`. "activeName" will match the one of the first
   * '*CarouselSlide*'s `name`, and ctx "names" will equal the array of all
   * names of all '*CarouselSlide*' rendered as `children`.
   *
   * @param {React.Element[]|React.Element} children '*CarouselRoot*' `children`
   * @param {function} setCtx '*CarouselRoot*' "setCtx" (context setter)
   */
  fromMount: function (children, setCtx) {
    const getName = (children) => children?.props?.name || ""
    const childrenIsArray = Array.isArray(children)
    setCtx((ctx) => ({
      ...ctx,
      activeName: childrenIsArray ? getName(children[0]) : getName(children),
      names: childrenIsArray ? children.map(getName) : [getName(children)]
    }))
  },
  /**
   * Given the active '*CarouselSlide*' `name` in "ctx.activeName", it gets the
   * one at the previous index in "ctx.names" (if `direction` is "left"), or the
   * one at the next index (if `direction` is "right").
   *
   * The '*CarouselSlide*' with `name` equal to that gotten name will be set as
   * the newly active one.
   */
  fromScroll: function (direction, setCtx) {
    setCtx((ctx) => {
      const currIdx = ctx.names.findIndex((name) => name === ctx.activeName)
      let nextIdx = currIdx
      if (direction === Carousel.defaultCtx.directions[0]) {
        // "left"
        nextIdx = !currIdx ? ctx.names.length - 1 : currIdx - 1
      } else if (direction === Carousel.defaultCtx.directions[1]) {
        // "right"
        nextIdx = currIdx === ctx.names.length - 1 ? 0 : currIdx + 1
      }
      return {
        ...ctx,
        directionBool: getTransitionOrientationBool(ctx.direction, direction),
        activeName: ctx.names[nextIdx],
        direction
      }
    })
  },
  /**
   * Given `name` of the target '*CarouselSlide*' to scroll to, it sets ctx
   * object's "activeName" to that `name`.
   *
   * If that `name` belongs to a slide whose index is lower than the index of
   * the active slide, the scroll will be to the left. Right otherwise.
   *
   * @param {string} nextActiveName next '*CarouselSlide*' `name`
   * @param {function} setCtx '*CarouselRoot*' "setCtx" (context setter)
   */
  fromJump: function (nextActiveName, setCtx) {
    const [left, right] = Carousel.defaultCtx.directions
    // we need to take the previous state of context, since Provider will
    // not update on a normal setState. We have to force an object rebuild
    setCtx((ctx) => {
      const currIdx = ctx.names.findIndex((n) => n === ctx.activeName)
      const nextIdx = ctx.names.findIndex((n) => n === nextActiveName)
      const nextDirection = nextIdx > currIdx ? right : left
      return {
        ...ctx,
        activeName: nextActiveName,
        directionBool: getTransitionOrientationBool(
          ctx.direction,
          nextDirection
        ),
        direction: nextDirection
      }
    })
  }
}
