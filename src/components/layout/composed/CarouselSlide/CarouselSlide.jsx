import { useEffect, useState, useContext } from "react"
import { useClassNameToggle, useMountFlag, Carousel } from "hub"
import { classes, carouselSlidePropTypes } from "./CarouselSlide.utils"

/**
 * Use this component to render '*CarouselSlide*'(s) for '*Carousel*', as its
 * children.
 *
 * @param {object} props
 *
 * `name` (string): must be defined and unique for each '*CarouselSlide*'.
 *
 * `children?` (React.node): anything React can render.
 *
 * `timeout?` (number): component mounting and unmounting transition animation
 *   timeout. Defaults to 400, which is 30ms less than *animation-duration*
 *   assigned in CSS (30ms of handicap for component to render).
 * * **Note:** If you change this prop, you must also provide an animation
 *     className to both `className.animateMount`, `className.animateUnmount`,
 *     and their respective keyframes (check `classNames` below). Life cycles
 *     will not behave correctly if you do not take this into consideration.
 *
 * `classNames?` (object): className strings for JSX rendered here AND for
 *   "useClassNameToggle" classNames if you choose to use a timeout different
 *   to the default one. Check *utils.js* for `classNames` object's
 *   constitution, and *module.css* for animation className and keyframes
 *   models.
 */
export default function CarouselSlide({
  name,
  children,
  timeout = 400,
  classNames = {},
  ...otherProps
}) {
  // grab the slide name and direction to transition from parent's context
  const { transitionDirection, activeName } = useContext(Carousel.context)
  // slide "on screen" state, which triggers when parent's context
  // active name matches this slide's name
  const [activeSt, setActiveSt] = useState(activeName === name)
  // mount state flag for this component for useEffect below
  const isMounted = useMountFlag()
  // className toggler hook to animate mount phase
  const [mountCN, triggerMountCN] = useClassNameToggle({
    className:
      classNames.animateMount ??
      classes["animate-mount-" + transitionDirection],
    timeout
  })
  // className toggler hook to animate unmount phase
  const [unmountCN, triggerUnmountCN] = useClassNameToggle({
    className:
      classNames.animateUnmount ??
      classes["animate-unmount-" + transitionDirection],
    timeout
  })

  /**
   * Triggers each time parent's context "activeName" changes, and if the new
   * name matches this component's `name`, it mounts it on screen.
   * If it was already mounted and parent's "activeName" changes, then it
   * unmounts it.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const isActive = activeName === name
    let unmountingTimeout
    // if slide is no longer active and it was already mounted (note we use
    // "isMounted" flag to prevent instant unmount when becoming active)
    if (!isActive && isMounted) {
      // trigger unmounting animation
      triggerUnmountCN()
      // schedule unmount for when animation ends
      unmountingTimeout = setTimeout(() => setActiveSt(false), timeout)
      // otherwise, if it just became active, trigger its mounting animation
      // and its active state
    } else if (isActive) {
      setActiveSt(true)
      triggerMountCN()
    }
    return () => clearTimeout(unmountingTimeout)
  }, [activeName])

  return (
    activeSt && (
      <div
        className={
          classes.container(classNames.container) +
          " " +
          mountCN +
          " " +
          unmountCN
        }
        {...otherProps}
      >
        {children}
      </div>
    )
  )
}

CarouselSlide.propTypes = carouselSlidePropTypes
