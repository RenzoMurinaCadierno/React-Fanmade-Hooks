import { useRef, useState, useEffect } from "react"
import { Text, Layout } from "hub"
import {
  defaultProps,
  propTypes,
  RandomLayoutProps,
  getRandomValueFromArray
} from "./TextWithRandomizedLayout.utils"

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
  ...otherProps
}) {
  /**
   * Instance of "RandomLayoutProps", which generates random `animationProps`
   * and `orientationProps`.
   */
  const randomizer = useRef(new RandomLayoutProps())

  // controls the component mounting and unmounting from DOM
  const [render, setRender] = useState(false)
  // stores an object containing "layoutProps" (random props to spread in
  // '*Layout*'), and "text" (the randomly selected text from `texts`).
  const [randomValues, setRandomValues] = useState(getRandomValues())

  /**
   * Returns an object containing random layout props and a randomly selected
   * text from `texts`.
   *
   * Meant to be passed as argument to "setRandomValues" calls.
   */
  function getRandomValues() {
    return {
      layoutProps: randomizer.current.getRandomProps(),
      text: getRandomValueFromArray(texts)
    }
  }

  /**
   * Sets a random text and layout props and renders the JSX if triggered when
   * "render" is false.
   *
   * Otherwise, if it fired when "render" is true, it sets a timeout to unmount
   * the JSX rendered in DOM. The timeout equals the sum of 'mount', 'active
   * state' and 'unmount' durations, plus `delayBetweenIterations`.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let iterationIntervalId

    if (!render) {
      setRandomValues(getRandomValues)
      setRender(true)
    } else {
      const { MOUNT, UNMOUNT, TRIGGER_UNMOUNT } =
        Layout.Animation.constants.timeouts

      const iterationTimeout =
        MOUNT + UNMOUNT + TRIGGER_UNMOUNT + delayBetweenIterations

      iterationIntervalId = setTimeout(() => setRender(false), iterationTimeout)
    }

    return () => clearTimeout(iterationIntervalId)
  }, [render])

  return (
    // render JSX only when "render" is true. This is such to automatically
    // fire 'mount' animation when component mounts in DOM.
    render && (
      <Layout {...randomValues.layoutProps}>
        <Text htmlElem="h6" italic textShadow {...otherProps}>
          {randomValues.text}
        </Text>
      </Layout>
    )
  )
}

TextWithRandomizedLayout.defaultProps = defaultProps
TextWithRandomizedLayout.propTypes = propTypes
