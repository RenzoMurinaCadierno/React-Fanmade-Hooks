import React, { useState } from "react"
import useCallbackXTimes from "../useCallbackXTimes"
import { CmpDescription, Text, Coin } from "../../../../hub"
import { tosses, classes, descItemsObject } from "./UseCallbackXTimes.utils"

export default function UseCallbackXTimes() {
  const [, setTossSt] = useState({
    coin1: tosses, // tosses = times the cb will fire before blocking itself.
    coin2: tosses, // Customizable from utils.js
    coin3: tosses
  })

  const [triggerCb1, cb1CallsLeft, resetCb1] = useCallbackXTimes(
    () => setTossSt((prevSt) => ({ ...prevSt, coin1: prevSt.coin1 - 1 })),
    tosses
  )
  const [triggerCb2, cb2CallsLeft, resetCb2] = useCallbackXTimes(
    () => setTossSt((prevSt) => ({ ...prevSt, coin2: prevSt.coin2 - 1 })),
    tosses
  )
  const [triggerCb3, cb3CallsLeft, resetCb3] = useCallbackXTimes(
    () => setTossSt((prevSt) => ({ ...prevSt, coin3: prevSt.coin3 - 1 })),
    tosses
  )

  return (
    <>
      <CmpDescription
        classNames={classes.cmpTitle}
        descItems={descItemsObject}
      />
      <section className={classes.cmpDesc} aria-label="component testing area">
        <TextAndCoin
          tossesLeft={cb1CallsLeft}
          onTextClick={resetCb1}
          onAfterToss={triggerCb1}
        />
        <TextAndCoin
          tossesLeft={cb2CallsLeft}
          onTextClick={resetCb2}
          onAfterToss={triggerCb2}
        />
        <TextAndCoin
          tossesLeft={cb3CallsLeft}
          onTextClick={resetCb3}
          onAfterToss={triggerCb3}
        />
      </section>
    </>
  )
}

function TextAndCoin({ tossesLeft, onTextClick, onAfterToss }) {
  return (
    <>
      <Text
        htmlElem="h6"
        italic
        type={tossesLeft ? "primary-3" : "primary-0"}
        onClick={tossesLeft ? null : onTextClick}
      >
        Coin toss #{tosses - tossesLeft}
      </Text>
      <Coin changeColor onAfterToss={onAfterToss} classNames={classes.coin} />
    </>
  )
}
