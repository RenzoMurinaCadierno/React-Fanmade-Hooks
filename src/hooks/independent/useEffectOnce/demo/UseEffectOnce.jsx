import React, { useCallback, useState } from "react"
import useEffectOnce from "../useEffectOnce"
import {
  Container,
  CmpDescription,
  Text,
  Button,
  PhoneDial
} from "../../../../hub"
import {
  classes,
  descItemsObject,
  digitsObject,
  getAnswerAndNewDigitArray,
  getBtnProps,
  getSuccessPercentage
} from "./UseEffectOnce.utils"

export default function UseEffectOnce() {
  const [gameSt, setGameSt] = useState(() => {
    const [answer, availableDigits] = getAnswerAndNewDigitArray()
    return {
      availableDigits, // ["zero", "one", "two", ...]. NOT "hash" or "star"
      answer, // anywhere between "zero" and "nine"
      pressedBtnName: "",
      disabledBtnProps: getBtnProps(availableDigits), // check function
      text: `Guess! Success chance: ${getSuccessPercentage(10)}%`, // <Text /> children
      ping: false, // check handleDigitButtonClick()
      disabledRetry: true // "Retry" button disabled state
    }
  })

  const handleGameFlow = useCallback(() => {
    // this setState is called by useEffectOnce hook.
    setGameSt((prevSt) => {
      // get a boolean to determine if the answer was correct
      const isWin = prevSt.answer === prevSt.pressedBtnName
      // a new answer and a fresh digits array in case we guessed the number
      const [newAnswer, availableDigits] = getAnswerAndNewDigitArray()
      // and the former digits array without the wrong guess if we failed
      const splicedDigitsArray = prevSt.availableDigits.filter(
        (d) => d !== prevSt.pressedBtnName
      )
      return {
        ...prevSt,
        availableDigits: isWin ? availableDigits : splicedDigitsArray,
        answer: isWin ? newAnswer : prevSt.answer,
        disabledBtnProps: getBtnProps(
          isWin ? availableDigits : splicedDigitsArray
        ),
        text: isWin
          ? `It was ${digitsObject[prevSt.answer]}! But buttons broke :/`
          : `Not ${digitsObject[prevSt.pressedBtnName]}! Buttons broken... :c`
      }
    })
  }, [setGameSt])

  // useEffectOnce hook, listening to each button click (change on ping state)
  const resetEffectUsage = useEffectOnce(handleGameFlow, [gameSt.ping], true)

  const resetGame = useCallback(() => {
    // Retry button's onClick. Disables itself, resets the text and...
    setGameSt((prevSt) => ({
      ...prevSt,
      text: `Guess! Success chance: ${getSuccessPercentage(
        prevSt.availableDigits.length
      )}%`,
      disabledRetry: true
    }))
    // ...re-enables useEffectOnce.
    resetEffectUsage()
  }, [setGameSt, resetEffectUsage])

  const handleDigitButtonClick = useCallback(
    (_, name) => {
      // dial buttons' universal onClick handler. It sets the associated
      // button's name on state and enables the Retry button.
      // It also pings the state, forcing a re-render. THIS IS IMPORTANT!
      // If we only listened to name changes, then useEffect will NOT
      // trigger on the same button click twice even if it is enabled, as
      // button name state would be === than previous state.
      setGameSt((prevSt) => ({
        ...prevSt,
        pressedBtnName: name,
        ping: !prevSt.ping,
        disabledRetry: false
      }))
    },
    [setGameSt]
  )

  return (
    <Container htmlElem="main" className={classes.container}>
      <CmpDescription
        descItems={descItemsObject}
        classNames={classes.cmpDesc}
      />
      <section className={classes.cmpTest} aria-label="component testing area">
        <Text htmlElem="h6" type="secondary-2" italic bold>
          {gameSt.text}
        </Text>
        <PhoneDial
          aria-label="Tap the buttons to guess the number"
          onButtonClick={handleDigitButtonClick}
          buttonProps={gameSt.disabledBtnProps}
        />
        <Button
          type="primary-1"
          disabled={gameSt.disabledRetry}
          onClick={resetGame}
        >
          Retry (fix buttons)
        </Button>
      </section>
    </Container>
  )
}
