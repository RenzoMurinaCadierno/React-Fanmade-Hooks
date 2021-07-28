import { useEffect, useState } from "react"
import useTimeoutToggle from "../useTimeoutToggle"
import { CmpDescription, Spinner, Text, Confetti } from "hub"
import plainCode from "../utils/plain"
import {
  classes,
  descItems,
  metaTagsProps,
  getType
} from "./UseTimeoutToggle.utils"

export default function UseTimeoutToggle() {
  return (
    <>
      <CmpDescription
        classNames={classes.cmpDesc}
        {...{ descItems, plainCode, metaTagsProps }}
      />
      <CmpTest />
    </>
  )
}

function CmpTest() {
  const [second, setSecond] = useState(9)
  const [isTimeoutToggled, triggerTimeoutToggle] = useTimeoutToggle(9000)

  /**
   * `type` for '*Spinner*' and '*Text*', depending on current "second".
   */
  const currentType = getType(second)

  /**
   * When "isTimeoutToggled" becomes `true`, sets an interval that ticks each
   * second, decreasing "second" by 1 on each tick.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let intervalId

    if (isTimeoutToggled) {
      intervalId = setInterval(() => {
        // clear interval if "second" === 0. Otherwise, decrease it by 1
        if (!second) return clearInterval(intervalId)
        setSecond((prevSt) => prevSt - 1)
      }, 1000)
    }

    return () => clearInterval(intervalId)
  }, [isTimeoutToggled])

  /**
   * When "second" hits 0, it fires a timeout that re-sets "second" to 9 after
   * 2000 milliseconds.
   */
  useEffect(() => {
    let restartTimeoutId

    if (!second) restartTimeoutId = setTimeout(() => setSecond(9), 2000)

    return () => clearTimeout(restartTimeoutId)
  }, [second])

  return (
    // wrapper container
    <section className={classes.cmpTest} aria-label="component testing area">
      {/* container for spinner and its text */}
      <div
        className={classes.spinnerContainer}
        onClick={!second ? null : triggerTimeoutToggle}
      >
        {/* spinner. Changes `type` each second. Disables when second is 0 */}
        <Spinner size="xl" type={currentType} disabled={!second} />
        {/* text. Shows current "second". `type` and `disabled` change too. */}
        <Text
          htmlElem="h4"
          absoluteFill
          flex
          type={currentType}
          disabled={!second}
        >
          {second}
        </Text>
      </div>
      {/* confetti effect, for funzies. */}
      <Confetti quantity={8} show={isTimeoutToggled && second % 2 === 0} />
      <Confetti quantity={8} show={isTimeoutToggled && second % 3 === 0} />
    </section>
  )
}
