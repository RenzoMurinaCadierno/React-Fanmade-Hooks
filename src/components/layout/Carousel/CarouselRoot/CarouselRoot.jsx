import React, { useCallback, useState, useEffect, useRef } from "react"
import { Carousel, Container } from "hub"
import {
  classes,
  carouselPropTypes,
  setNameAndTransitionRelatedContext
} from "./CarouselRoot.utils"

/**
 * Root component for '*Carousel*' UI. It handles scrolling logic and keeps the
 * global state for all of its inner components.
 *
 * This is the entry component you need to wrap one or more '*CarouselSlide*'s
 * with, as it will handle their manual and auto scrolling logic, and pass the
 * necessary state as context to them.
 *
 * This component also renders one '*CarouselIndicator*' for each
 * '*CarouselSlide*' passed as `children`, and two '*CarouselArrow*'s to
 * control slide scrolling to the left and right.
 *
 * @param {object} props
 *
 * `children` (React.Element | React.Element[]): One or more '*CarouselSlide*'s.
 *   Must be only that for scrolling behavior to work.
 *
 * `autoScroll?` (boolean): true will automatically scroll '*CarouselSlide*'s in
 *   `children` (if multiple). Defaults to true.
 *
 * `autoScrollInterval?` (number): delay between each slide's auto-scrolling, in
 *   milliseconds. Defaults to 3000.
 *
 * `autoScrollDirection?` (string): "left" or "right", to indicate the index of
 *   the next slide to auto-scroll to. Defaults to "right".
 *
 * `resumeAutoScrollTimeout?` (number): if `autoScroll` is true and scrolling
 *   state is frozen, an action that resumes auto-scrolling will take effect
 *   after this timeout (e.g.: blurring out of '*Carousel*' re-triggers
 *   auto-scroll state). Measured in milliseconds. Defaults to 3000.
 *
 * `pauseAutoScrollOnInteraction?` (boolean): true will prevent auto-scrolling
 *   from resuming once stopped any time the active '*CarouselSlide*' gets
 *   focused on. (this includes clicking on '*CarouselIndicator*' and
 *   '*CarouselArrow*').
 * * Focusing out of '*CarouselSlide*' will resume auto-scrolling after
 *    `resumeAutoScrollTimeout` ms.
 *
 * `resumeAutoScrollOn?` (boolean): value this component observes to resume
 *   auto-scrolling regardless its state, but provided `autoScroll` is true.
 * * If this prop changes from false to true, auto-scrolling is resumed.
 * * If it toggles from true to false, auto-scrolling stops.
 *
 * `showArrows?` (boolean): true will render '*CarouselArrow*'s to scroll slides
 *   forwards and backwards. Defaults to true.
 *
 * `showIndicators?` (boolean): true will render '*CarouseIndicators*', at the
 *   bottom of the carousel. Indicators are used to graphically display which
 *   slide index is currently active and to "jump" to a target slide by tapping
 *   its respective indicator. Defaults to true.
 *
 * `onSlideClick?` (funtion): callback triggered on '*CarouselSlide*' container
 *   click. Will get event object as first arg and the whole "ctx" object as the
 *   second one.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 */
export default function CarouselRoot({
  children,
  autoScroll = true,
  autoScrollInterval = 3000,
  autoScrollDirection = "right",
  resumeAutoScrollTimeout = 3000,
  pauseAutoScrollOnInteraction,
  resumeAutoScrollOn,
  showArrows = true,
  showIndicators = true,
  onSlideClick,
  classNames = {},
  ...otherProps
}) {
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const resumeAutoScrollTimeoutRef = useRef(null)
  /**
   * Sets ctx's "activeName" string and "names" array which will be passed as
   *   context to `children`. "activeName" will match the one of the first
   *   '*CarouselSlide*'s `name`, and ctx "names" will equal the array of all
   *   names of all '*CarouselSlide*' rendered as `children`.
   * And just because we are at it, since this useEffect will run cleanup at
   *   unmount, clear "resumeAutoScrollTimeoutRef", if any.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setNameAndTransitionRelatedContext.fromMount(children, setCtx)
    return () => clearTimeout(resumeAutoScrollTimeoutRef.current)
  }, [])

  /**
   * If both `autoScroll` and "isAutoScrolling" state are true, this useEffect
   *  sets an interval to scroll the current slide automatically.
   * Will run each time "isAutoScrolling" state `autoScrollInterval`, or
   *  `autoScrollDirection` change. If `resumeAutoScrollOn` is truthy, this will
   *  run regardless inner "isAutoscrolling" state is false
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let autoScrollIntervalTimeout
    if (autoScroll && (isAutoScrolling || resumeAutoScrollOn)) {
      const [left, right] = Carousel.defaultCtx.directions
      autoScrollIntervalTimeout = setInterval(
        () => scrollSlide(autoScrollDirection === left ? left : right),
        autoScrollInterval
      )
    }
    return () => clearInterval(autoScrollIntervalTimeout)
  }, [
    autoScroll,
    isAutoScrolling,
    autoScrollInterval,
    autoScrollDirection,
    resumeAutoScrollOn
  ])

  /**
   * * Given `name` of the target '*CarouselSlide*' to scroll to, it sets ctx
   *     object's "activeName" to that `name`.
   * * If that `name` belongs to a slide whose index is lower than the index of
   *     the active slide, the scroll will be to the left. Right otherwise.
   * * This useEffect also stuns auto-scrolling on execution.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  const jumpToSlide = useCallback((nextActiveName) => {
    stunAutoScroll()
    setNameAndTransitionRelatedContext.fromJump(nextActiveName, setCtx)
  }, [])

  /**
   * * Given the active '*CarouselSlide*' `name` in "ctx.activeName", it gets
   *     the one at the previous index in "ctx.names" (if `direction` is
   *     "left"), or the one at the next index (if `direction` is "right").
   * * The '*CarouselSlide*' with `name` equal to that gotten name will be set
   *     as the newly active one.
   * * `stunScroll` === true will call for "stunAutoScroll", freezing
   *     auto-scrolling animation if it is active.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  const scrollSlide = useCallback((direction, stunScroll) => {
    stunScroll && stunAutoScroll()
    setNameAndTransitionRelatedContext.fromScroll(direction, setCtx)
  }, [])

  /**
   * * Dead stops slides' auto-scrolling.
   * * Clears global timeout in charge of auto-scrolling slides and sets
   *     "isAutoScrolling" state to false.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  const stopAutoScroll = useCallback(() => {
    clearTimeout(resumeAutoScrollTimeoutRef.current)
    setIsAutoScrolling(false)
  }, [])

  /**
   * * Restarts slides' auto-scrolling.
   * * Clears global timeout in charge of auto-scrolling (this is such as not to
   *     conflict with a possible ongoing one if scroll was already active), and
   *     re-sets "isAutoScrolling" to true, which fires the useEffect in charge
   *     of making '*CarouselSlide*'s scroll automatically.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  const resumeAutoScroll = useCallback(() => {
    clearTimeout(resumeAutoScrollTimeoutRef.current)
    if (autoScroll) {
      resumeAutoScrollTimeoutRef.current = setTimeout(() => {
        setIsAutoScrolling(true)
      }, resumeAutoScrollTimeout)
    }
  }, [resumeAutoScrollTimeout])

  /**
   * * Stops slides' auto-scrolling.
   * * Restarts it after `resumeScrollTimeout` ONLY if `autoScroll` is true
   *     (meaning 'Carousel' should automatically scroll slides) and if the
   *     currently active '*CarouselSlide*' is not focused (however, when
   *     `pauseAutoScrollOnInteraction` is true, this last scenario is ignored).
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  const stunAutoScroll = useCallback(() => {
    stopAutoScroll()
    if (autoScroll && !pauseAutoScrollOnInteraction) {
      resumeAutoScrollTimeoutRef.current = setTimeout(() => {
        setIsAutoScrolling(true)
      }, resumeAutoScrollTimeout)
    }
  }, [autoScroll, pauseAutoScrollOnInteraction, resumeAutoScrollTimeout])

  // Context Provider's value to pass to `children`. It needs to be defined
  // here before component's return, or else `jumpToSlide` and `scrollSlide`
  // functions will have been initialized, thus resulting in a null reference.
  const [ctx, setCtx] = useState({
    ...Carousel.defaultCtx,
    jumpToSlide,
    scrollSlide
  })

  /**
   * Handles '*CarouselSlide*' container click. Passes ctx as second arg
   */
  const handleSlideClick = useCallback(
    (e) => onSlideClick?.(e, ctx),
    [onSlideClick, ctx]
  )

  return (
    <div className={classes.container(classNames.container)}>
      {/* wrapper for everything but the indicators */}
      <Container
        type="primary"
        roundBorders
        onClick={handleSlideClick}
        className={classes.screen(classNames.screen)}
        {...otherProps}
      >
        {/* wrapper for `children` ( '*CarouselSlide*'(s) ) */}
        <div
          tabIndex={0}
          onFocus={stopAutoScroll}
          onBlur={resumeAutoScroll}
          className={classes.slidesContainer(classNames.slidesContainer)}
        >
          {/* context provider and `children` */}
          <Carousel.context.Provider value={ctx}>
            {children}
          </Carousel.context.Provider>
        </div>
        {/* left and right arrow components to scroll slides */}
        <Carousel.Arrows
          show={showArrows}
          directions={Carousel.defaultCtx.directions}
          disabled={!Array.isArray(children) || !children.length}
          onFocus={stunAutoScroll}
          onBlur={resumeAutoScroll}
          onClick={scrollSlide}
          classNames={classes.arrowComponent(classNames.arrowComponent)}
        />
      </Container>
      {/* indicators for currently active and inactive slides */}
      <Carousel.Indicators
        show={showIndicators}
        indicatorNames={ctx.names}
        activeName={ctx.activeName}
        onIndicatorClick={jumpToSlide}
        tabIndex={3}
        onFocus={stunAutoScroll}
        onBlur={resumeAutoScroll}
        classNames={classes.indicatorsComponent(classNames.indicatorsComponent)}
      />
    </div>
  )
}

CarouselRoot.propTypes = carouselPropTypes
