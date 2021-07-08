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

export default function UseCount() {
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
  const [second, setSecond] = useState(6)
  const [isTimeoutToggled, triggerTimeoutToggle] = useTimeoutToggle(6000)

  const currentType = getType(second)

  useEffect(() => {
    let intervalId = 0
    if (isTimeoutToggled) {
      intervalId = setInterval(
        () => setSecond((prevSt) => (prevSt <= 0 ? 0 : --prevSt)),
        1000
      )
    }
    return () => clearInterval(intervalId)
  }, [isTimeoutToggled])

  useEffect(() => {
    let restartTimeoutId = 0
    if (!second) {
      restartTimeoutId = setTimeout(() => setSecond(6), 2000)
    }
  }, [second])

  return (
    <section className={classes.cmpTest} aria-label="component testing area">
      <div
        className={classes.spinnerContainer}
        onClick={!second ? null : triggerTimeoutToggle}
      >
        <Spinner size="xl" type={currentType} disabled={!second} />
        <Text
          htmlElem="h4"
          absoluteFill
          flex
          type={currentType}
          disabled={!second}
        >
          {second}
        </Text>
        <Confetti quantity={1} />
      </div>
    </section>
  )
}
