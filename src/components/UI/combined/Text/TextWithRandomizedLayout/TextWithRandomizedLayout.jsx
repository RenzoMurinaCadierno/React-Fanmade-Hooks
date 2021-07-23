import { useRef, useState, useEffect } from "react"
import { Text, Layout } from "hub"
import {
  defaultProps,
  propTypes,
  PropsRandomizer
} from "./TextWithRandomizedLayout.utils"

/**
 * Guess how many times the word 'random' appears here an in utils.js :p
 */

/**
 * Renders a '*Text*' wrapped in '*Layout*', capable of controlling its
 * orientation, rotation and animation.
 *
 * It mounts at a random orientation `anchor` with a random `rotation` when
 * 'mount' animation starts and unmounts when 'unmount' animation ends.
 *
 * The cycle triggers again after `delayBetweenIterations` ms has passed since
 * 'unmount' animation finished.
 *
 * @param {object} props
 *
 * `texts?` (String[]): An array with texts this component will randomly select
 *   to render on each iteration.
 * * Defaults to one containing texts to be displayed in this app's home page.
 *
 * `delayBetweenIterations?` (number): The time between cycles (couting from
 *   current 'unmount' animation finish to next 'mount' animation start).
 * * Measured in milliseconds.
 * * Defaults to 5000.
 *
 * `...otherProps?` (object): Props to spread in '*Text*'.
 */
export default function TextWithRandomizedLayout({
  texts,
  delayBetweenIterations,
  animationProps,
  orientationProps,
  ...otherProps
}) {
  /**
   * Instance of "PropsRandomizer", which generates random `animationProps` and
   * `orientationProps` for '*Layout*', as well as `type` and `children` for
   * '*Text*'.
   */
  const randomizer = useRef(
    new PropsRandomizer(animationProps, orientationProps)
  )

  // controls the component mounting and unmounting from DOM
  const [show, setShow] = useState(false)
  // stores an object containing "layoutProps" (random props to spread in
  // '*Layout*'), and "text" (the randomly selected text from `texts`).
  const [randomProps, setRandomProps] = useState(
    randomizer.current.getRandomProps(texts)
  )

  /**
   * Sets a random text and layout props and renders the JSX if triggered when
   * "show" is false.
   *
   * Otherwise, if it fired when "show" is true, it sets a timeout to unmount
   * the JSX rendered in DOM. The timeout equals the sum of 'mount', 'active
   * state' and 'unmount' durations, plus `delayBetweenIterations`.
   *
   * 'active state' is how long 'idle' animation takes before triggering
   * 'unmount' one. It equals `animationProps.timeout`, and if undefined, it
   * defaults to `Layout.Animation.constants.timeouts.IDLE`.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let iterationIntervalId

    if (!show) {
      setRandomProps(() => randomizer.current.getRandomProps(texts))
      setShow(true)
    } else {
      const { MOUNT, UNMOUNT, IDLE } = Layout.Animation.constants.timeouts

      const iterationTimeout =
        MOUNT +
        UNMOUNT +
        (animationProps?.timeout || IDLE) +
        delayBetweenIterations

      iterationIntervalId = setTimeout(() => setShow(false), iterationTimeout)
    }

    return () => clearTimeout(iterationIntervalId)
  }, [show])

  return (
    // render JSX only when "show" is true. This is such to automatically
    // fire 'mount' animation when component mounts in DOM.
    show && (
      <Layout {...randomProps.layoutProps}>
        <Text
          italic
          textShadow
          type={randomProps.textProps.type}
          {...otherProps}
        >
          {randomProps.textProps.text}
        </Text>
      </Layout>
    )
  )
}

TextWithRandomizedLayout.defaultProps = defaultProps
TextWithRandomizedLayout.propTypes = propTypes
