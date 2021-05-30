import React, { useState, useEffect } from "react"
import { classes, coinPropTypes } from "./Coin.utils"

/**
 * Renders a functional "coin" UI, with adjustable success probability as well
 * as customizable "heads", "tails" and "tossing" UI icons in it.
 *
 * @param {object} props
 *
 * `isFrozen?` (boolean): true prevents "onClick" callbacks and applies
 *   disabled stylings.
 *
 * `head?` (string | React.Element): a 1-character-long string (advisable) or
 *   a React.Element type '*img*', to be rendered on "success" (head). Defaults
 *   to "O".
 *
 * `tails?` (string | React.Element): a 1-character-long string (advisable) or
 *   a React.Element type '*img*', to be rendered on "failure" (tails).
 *   Defaults to "X".
 *
 * `toss?` (string | React.Element): a 1-character-long string (advisable) or
 *   a React.Element type '*img*', to be rendered on "tossing" state. Defaults
 *   to "?".
 *
 * `successChance?` (number): a number between 0 and 1, representing the chance
 *   of a toss resulting in "head". Defaults to 0.5 (50%).
 *
 * `changeColor?` (boolean): true will apply 'primary' theme styles to coins
 *   landing on 'head' and 'secondary' to the ones landing on 'tails'. False
 *   will keep 'primary' stylings regardless toss results.
 *
 * `onBeforeToss?` (function): callback triggered when coin is tossed. Gets the
 *   previous toss boolean as argument.
 *
 * `onAfterToss?` (function): callback triggered when coin lands. Gets the new
 *   toss boolean as argument.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *     Check *utils.js* for its constitution.
 */
export default function Coin({
  isFrozen,
  head = "O",
  tails = "X",
  toss = "?",
  successChance = 0.5,
  changeColor,
  onBeforeToss,
  onAfterToss,
  classNames = {},
  ...otherProps
}) {
  // "res" true is heads, false is tails. "isTossing" is the tossing state
  const [coinSt, setCoinSt] = useState({ res: false, isTossing: false })

  function performFlip() {
    // `isFrozen` prevents coin state from changing. Alas, coin will not toss
    if (!isFrozen) {
      // set "isTossing" to true to add tossing animation className and to
      // trigger useEffect below.
      setCoinSt((prevSt) => ({ ...prevSt, isTossing: true }))
      // call for `onBeforeToss` with previous result
      onBeforeToss?.(coinSt.res)
    }
  }

  // eslint will warn us to add `successChance` as a dependency, but if we do
  // so and it change while tossing animation is playing, then the result would
  // turn to be inconsistent. So, disable warnings.
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let coinTossTimeout
    if (coinSt.isTossing) {
      // let animation play (set to 700ms). Update state afterwards with a
      // random "res" weighted by `successChance`, and trigger `onAfterToss`
      // with this new "res"
      coinTossTimeout = setTimeout(() => {
        setCoinSt({ isTossing: false, res: Math.random() < successChance })
        onAfterToss?.(coinSt.res)
      }, 700)
    }
    return () => clearTimeout(coinTossTimeout)
  }, [coinSt.isTossing])

  return (
    <div
      disabled={coinSt.isTossing}
      // prevent click events if coin is tossing or is frozen by props
      onClick={coinSt.isTossing || isFrozen ? null : performFlip}
      className={classes.container(
        coinSt.isTossing,
        isFrozen,
        changeColor && !coinSt.res, // change color styles on heads/tails
        classNames.container
      )}
      {...otherProps}
    >
      <div className={classes.result(classNames.result)}>
        {coinSt.isTossing ? toss : coinSt.res ? head : tails}
      </div>
    </div>
  )
}

Coin.propTypes = coinPropTypes
