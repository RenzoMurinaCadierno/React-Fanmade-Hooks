import { useState, useEffect } from "react"
import { classes, diePropTypes } from "./Die.utils"

/**
 * Renders a functional 'die' UI, with adjustable minimum and maximum roll
 * ranges.
 *
 * @param {object} props
 *
 * `min?` (number): the minimum possible value to roll. Defaults to 1.
 *
 * `max?` (number): the maximum possible value to roll. Defaults to 6.
 *
 * `isFrozen?` (boolean): true prevents "onClick" callbacks and applies
 *   disabled stylings.
 *
 * `onBeforeRoll?` (function): callback triggered when die starts rolling.
 *   Gets the previous roll result as argument.
 *
 * `onAfterRoll?` (function): callback triggered when die stops rolling.
 *   Gets the rolled result as callback.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *     Check *utils.js* for its constitution.
 */
export default function Die({
  min = 1,
  max = 6,
  isFrozen,
  onBeforeRoll,
  onAfterRoll,
  classNames = {}
}) {
  // "res" is the number that appears on die, "isRolling" is the rolling state
  const [dieSt, setDieSt] = useState({ res: min, isRolling: false })

  function performRoll() {
    // `isFrozen` prevents coin state from changing. Alas, die will not roll
    if (!isFrozen) {
      // set `isTossing` to true to add tossing animation className and to
      // trigger useEffect below. Call for `onBeforeToss` with previous "res"
      setDieSt((prevSt) => ({ ...prevSt, isRolling: true }))
      onBeforeRoll?.(dieSt.res)
    }
  }

  // eslint will warn us to add `min` and `max` as dependencies, but if we do
  // so and those props change while rolling animation is playing, then the
  // result would turn to be inconsistent. So, disable warnings.
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let setDigitTimeout
    let setIsRollingTimeout
    if (dieSt.isRolling) {
      // set a timeout to calculate the new "res". The whole die animation is
      // set to 500ms, so change to the new result at 250ms which relates to
      // the animation state where the die is scaled to 0 (invisible)
      setDigitTimeout = setTimeout(() => {
        // calculate the new random result between `min` and `max`, and set
        // state with it
        const newRes = Math.ceil(Math.random() * (max - min)) + min
        setDieSt((prevSt) => ({ ...prevSt, res: newRes }))
        // after 250ms, call for `onAfterRoll` with the new "res" and set
        // rolling state back to false
        setIsRollingTimeout = setTimeout(() => {
          onAfterRoll?.(newRes)
          setDieSt((prevSt) => ({ ...prevSt, isRolling: false }))
        }, 250)
      }, 250)
    }
    return () => {
      clearTimeout(setDigitTimeout)
      clearTimeout(setIsRollingTimeout)
    }
  }, [dieSt.isRolling])

  return (
    // wrapper container
    <div
      className={classes.container(
        dieSt.isRolling,
        isFrozen,
        classNames.container
      )}
      // prevent click events if die is rolling or is frozen by props
      onClick={dieSt.isRolling || isFrozen ? null : performRoll}
    >
      {/* result */}
      <span className={classes.digit(classNames.digit)}> {dieSt.res} </span>
    </div>
  )
}

Die.propTypes = diePropTypes
