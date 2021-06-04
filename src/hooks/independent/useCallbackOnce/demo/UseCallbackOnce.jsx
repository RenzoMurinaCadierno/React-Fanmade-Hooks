import { useState } from "react"
import useCallbackOnce from "../useCallbackOnce"
import { CmpDescription, Text, Button, Switch } from "hub"
import {
  classes,
  descItemsObject,
  getButtonText,
  getButtonType
} from "./UseCallbackOnce.utils"

export default function UseCallbackOnce() {
  return (
    <>
      <CmpDescription
        descItems={descItemsObject}
        classNames={classes.cmpDesc}
      />
      <CmpTest />
    </>
  )
}

function CmpTest() {
  // "count": moves from 0 to 9, and rolls back to 0 afterwards.
  // "isCountLimitActive": true handles control of "countIndefinitely" to
  //   "useCallbackOnce"
  const [st, setSt] = useState({ count: 0, isCountLimitActive: false })

  // takes control of "countIndefinetly", allowing it to be invoked only once
  // using the handler it returns as first element.
  // Offers a state to check if it was already invoked as second element, and a
  // reset for the trigger limit as third element.
  const [countOnce, wasCountInvoked, resetInvocationLimit] =
    useCallbackOnce(countIndefinitely)

  /**
   * Increases "st.count" by 1. Rolls back to 0 after it reaches 9.
   */
  function countIndefinitely() {
    setSt({ ...st, count: st.count >= 9 ? 0 : st.count + 1 })
  }

  /**
   * Toggles "useCallbackOnce" control over setting "st.count". When
   * uncontrolled, count will always trigger. When controlled, "useCallbackOnce"
   * invocation count will restore back to one and will allow "st.count" to
   * me modified once.
   */
  function toggleCountHandler() {
    st.isCountLimitActive && resetInvocationLimit()
    setSt({ ...st, isCountLimitActive: !st.isCountLimitActive })
  }

  return (
    <section className={classes.cmpTest} aria-label="component testing area">
      {/* "count" state */}
      <Text htmlElem="h3" italic>
        {st.count}
      </Text>
      {/* button to trigger "count" change handler */}
      <Button
        onClick={st.isCountLimitActive ? countOnce : countIndefinitely}
        type={getButtonType(st.isCountLimitActive, wasCountInvoked)}
        className={classes.button}
      >
        {getButtonText(st.isCountLimitActive, wasCountInvoked)}
      </Button>
      {/* toggler to give control to, or take control away from, 
      "useCountOnce" */}
      <Switch onSwitch={toggleCountHandler} />
    </section>
  )
}
