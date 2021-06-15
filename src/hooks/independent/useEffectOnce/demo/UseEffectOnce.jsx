import { useCallback, useState } from "react"
import useEffectOnce from "../useEffectOnce"
import { Container, CmpDescription, Text, Button, PhoneDial } from "hub"
import plainCode from "../utils/plain"
import {
  classes,
  descItemsObject,
  codeMenuProps,
  getInitialGameSt,
  handleGameLogicAfterDigitButtonClick,
  resetGameState,
  setButtonDataBeforeProcessingAnswer
} from "./UseEffectOnce.utils"

export default function UseEffectOnce() {
  const [gameSt, setGameSt] = useState(getInitialGameSt())

  /**
   * Controls game logic when a button is clicked. Will resolve provided
   * "useEffectOnce" has not triggered already.
   */
  const processAnswer = useCallback(
    () => handleGameLogicAfterDigitButtonClick(setGameSt),
    [setGameSt]
  )

  /**
   * "useEffectOnce" hook call. Triggers on each button click ("gameSt.ping"
   * toggling), but resolves only the first time it was invoked.
   */
  const resetEffectUsage = useEffectOnce(processAnswer, [gameSt.ping], true)

  /**
   * Re-enables "useEffectOnce". Also disables 'retry' button and resets text.
   */
  const retry = useCallback(() => {
    resetGameState(setGameSt)
    resetEffectUsage()
  }, [setGameSt, resetEffectUsage])

  /**
   * Sets updates the pressed button's name in state and toggles "gameSt.ping",
   * invoking "useEffectOnce".
   */
  const handleDigitButtonClick = useCallback(
    (_, name) => setButtonDataBeforeProcessingAnswer(name, setGameSt),
    [setGameSt]
  )

  return (
    <Container htmlElem="main" className={classes.container}>
      <CmpDescription
        descItems={descItemsObject}
        plainCode={plainCode}
        isCodeMenuAnchorHandledByMediaQuery
        codeMenuProps={codeMenuProps}
        classNames={classes.cmpDesc}
      />
      <section className={classes.cmpTest} aria-label="component testing area">
        {/* 'help' text */}
        <Text htmlElem="h6" type="secondary-2" italic bold>
          {gameSt.text}
        </Text>
        {/* all phone buttons */}
        <PhoneDial
          aria-label="Tap the buttons to guess the number"
          onButtonClick={handleDigitButtonClick}
          buttonProps={gameSt.disabledBtnProps}
        />
        {/* 'retry' button (resets "useEffectOnce") */}
        <Button type="primary-1" disabled={gameSt.disableRetry} onClick={retry}>
          Retry (fix buttons)
        </Button>
      </section>
    </Container>
  )
}
