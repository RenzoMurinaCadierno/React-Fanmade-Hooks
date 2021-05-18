import React, { useState, useCallback } from "react"
import useCallbackOnce from "../useCallbackOnce"
import { CmpDescription, Text, Button, Switch } from "../../../../hub"
import { classes, descItemsObject } from "./UseCallbackOnce.utils"

export default function UseCallbackOnce() {
  const [count, setCount] = useState(0)
  const [isCbLimitActive, setIsCbLimitActive] = useState(false)

  const triggerUnlimitedCallback = useCallback(
    () => setCount((prevCount) => (prevCount >= 9 ? 0 : prevCount + 1)),
    [setCount]
  )

  const [triggerLimitedCb, isCbConsumed, resetLimitedCbCount] = useCallbackOnce(
    triggerUnlimitedCallback
  )

  const toggleHookHandler = useCallback(() => {
    !isCbLimitActive && resetLimitedCbCount()
    setIsCbLimitActive((prevSt) => !prevSt)
  }, [isCbLimitActive, resetLimitedCbCount, setIsCbLimitActive])

  return (
    <>
      <CmpDescription
        descItems={descItemsObject}
        classNames={classes.cmpTitle}
      />
      <section className={classes.cmpDesc} aria-label="component testing area">
        <Text htmlElem="h3" italic>
          {count}
        </Text>
        <Button
          onClick={
            isCbLimitActive ? triggerLimitedCb : triggerUnlimitedCallback
          }
          className={classes.button}
        >
          {!isCbLimitActive
            ? "I work every time"
            : isCbConsumed
            ? "I broke :c"
            : "One time use"}
        </Button>
        <Switch onSwitch={toggleHookHandler} />
      </section>
    </>
  )
}
