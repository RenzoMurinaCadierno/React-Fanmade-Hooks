import { useState, useEffect, useRef } from "react"
import useCallbackXTimes from "../useCallbackXTimes"
import { CmpDescription, Text, Coin } from "hub"
import plainCode from "../utils/plain"
import {
  tosses,
  classes,
  descItems,
  metaTagsProps
} from "./UseCallbackXTimes.utils"

export default function UseCallbackXTimes() {
  return (
    <>
      <CmpDescription
        {...{ descItems, plainCode, metaTagsProps }}
        classNames={classes.cmpDesc}
      />
      <section className={classes.cmpTest} aria-label="component testing area">
        <TextAndCoin />
        <TextAndCoin />
        <TextAndCoin />
      </section>
    </>
  )
}

function TextAndCoin() {
  const [isAnimatingText, setIsAnimatingText] = useState(true)
  const isMounted = useRef(false) // blocks "Update!" text rendering at mount

  const [triggerCb, callsLeft, resetCbCount] = useCallbackXTimes(
    () => setIsAnimatingText(true), // each call mounts "Update!" text
    tosses // times the cb will fire before blocking itself. Example uses 3.
  )

  // triggered by "useCallbackXTimes". Unmounts "Updated!" text after 700ms.
  useEffect(() => {
    let hideAnimatedTextTimeout
    if (isAnimatingText) {
      hideAnimatedTextTimeout = setTimeout(() => setIsAnimatingText(false), 700)
    } else {
      isMounted.current = true
    }
    return () => clearTimeout(hideAnimatedTextTimeout)
  }, [isAnimatingText])

  return (
    <>
      <Text
        htmlElem="h6"
        italic
        type={callsLeft ? "primary-3" : "primary-0"}
        onClick={callsLeft ? null : resetCbCount}
      >
        {isAnimatingText && isMounted.current && (
          // animated text with rendered managed by "useCallbackXTimes"
          <span className={classes.animatedText}>Updated!</span>
        )}
        Coin toss #{tosses - callsLeft}
      </Text>
      <Coin changeColor onBeforeToss={triggerCb} classNames={classes.coin} />
    </>
  )
}
