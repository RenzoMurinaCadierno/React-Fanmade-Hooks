import React from "react"
import useCount from "../useCount"
import { CmpDescription, Text, CountBar } from "../../../../hub"
import { classes, descItemsObject } from "./UseCount.utils"

export default function UseCount() {
  const { count, step, inc, dec, reset, setStep } = useCount()

  return (
    <>
      <CmpDescription descItems={descItemsObject} />
      <section className={classes.cmpTest} aria-label="component testing area">
        <Text htmlElem="h6" type="primary-2" italic>
          Decrease/increase count
        </Text>
        <CountBar
          value={count}
          min={0}
          addText={step >= 0 ? "+" + step : step.toString()}
          subText={step >= 0 ? "-" + step : step.toString()}
          onAdd={inc}
          onSub={dec}
          classNames={classes.countBar}
        />
        <Text htmlElem="h6" type="primary-2" italic>
          Decrease/increase count step and reset count
        </Text>
        <CountBar
          value={step}
          min={0}
          max={20}
          addText="^"
          subText="v"
          onAdd={() => setStep(step + 1)}
          onSub={() => setStep(step - 1)}
          progressText="reset"
          disableProgressbar={!count}
          onClick={reset}
          classNames={classes.stepCountBar}
        />
      </section>
    </>
  )
}
