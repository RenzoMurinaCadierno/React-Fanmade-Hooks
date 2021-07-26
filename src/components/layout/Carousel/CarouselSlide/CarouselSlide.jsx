import { useEffect, useState, useContext } from "react"
import { useValueToggle, useMountFlag, Carousel } from "hub"
import cnp from "styles/classNameProcessor"
import {
  classes,
  defaultProps,
  propTypes,
  getReverseDirection
} from "./CarouselSlide.utils"

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
 *   "useValueToggle" classNames if you choose to use a timeout different
 *   to the default one. Check *utils.js* for `classNames` object's
 *   constitution, and *module.css* for animation className and keyframes
 *   models.
 */
export default function CarouselSlide({
  name,
  children,
  timeout,
  classNames,
  ...otherProps
}) {
  // grab the slide name and direction to transition from parent's context
  const { direction, activeName, directionBool } = useContext(Carousel.Context)
  // slide "on screen" state, which triggers when parent's context
  // active name matches this slide's name
  const [activeSt, setActiveSt] = useState(activeName === name)
  // mount state flag for this component for useEffect below
  const isMounted = useMountFlag()
  // className toggler hook to animate mount phase
  const [mountCN, triggerMountCN] = useValueToggle({
    on: classNames.animateMount ?? classes["animate-mount-" + direction],
    off: "",
    timeout
  })
  // className toggler hook to animate unmount phase
  const [unmountCN, triggerUnmountCN] = useValueToggle({
    on: classNames.animateUnmount ?? classes["animate-unmount-" + direction],
    off: "",
    timeout
  })
  // className toggler hook to animate mount phase in opposite direction
  const [mountRevCN, triggerMountReverseCN] = useValueToggle({
    on:
      classNames.animateMountReverse ??
      classes["animate-mount-" + getReverseDirection(direction)],
    off: "",
    timeout
  })
  // className toggler hook to animate unmount phase in opposite direction
  const [unmountRevCN, triggerUnmountReverseCN] = useValueToggle({
    on:
      classNames.animateUnmountReverse ??
      classes["animate-unmount-" + getReverseDirection(direction)],
    off: "",
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
      // trigger unmounting animation depending on boolean state (read 'else if'
      // clause first). If "directionBool" here is the same as when this
      // component mounted, then the same animation direction is used for its
      // unmounting (as the next slide is visually on the same direction as this
      // one at render). However, if "directionBool" changed, it means the slide
      // to render is visually to the other side the initial animation flow
      // (e.g.: mount was from left to right, and the next slide to render is
      // one that came before, thus needing a 'reverse' animation - from right
      // to left).
      directionBool ? triggerUnmountCN() : triggerUnmountReverseCN()
      // schedule unmount for when animation ends
      unmountingTimeout = setTimeout(() => setActiveSt(false), timeout)
    } else if (isActive) {
      // if it just became active, trigger its mounting animation and its active
      // state. One "directionBool" state is assigned to entering animation from
      // one side, and the other, from the other side (e.g.: true = 'left',
      // false = 'right')
      directionBool ? triggerMountCN() : triggerMountReverseCN()
      setActiveSt(true)
    }
    return () => clearTimeout(unmountingTimeout)
  }, [activeName])

  return (
    activeSt && (
      <div
        className={
          classes.container(classNames.container) +
          cnp.get(mountCN) +
          cnp.get(unmountCN) +
          cnp.get(mountRevCN) +
          cnp.get(unmountRevCN)
        }
        {...otherProps}
      >
        {children}
      </div>
    )
  )
}

CarouselSlide.defaultProps = defaultProps
CarouselSlide.propTypes = propTypes
