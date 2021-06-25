import { useState, useEffect, useCallback } from "react"
import { CodeRush } from "hub"
import {
  classes,
  defaultProps,
  propTypes,
  getCode,
  haveExactValues
} from "./CodeRushRoot.utils"

export default function CodeRushRoot({
  classNames,
  codeProps,
  numPadAndStatsProps,
  numPadProps,
  statsProps,
  timerButtonProps,
  ...otherProps
}) {
  const [code, setCode] = useState([`Tap to start game`])
  const [attempt, setAttempt] = useState([])
  const [score, setScore] = useState(0)

  const setNewCodeAndClearAttempt = useCallback(() => {
    setCode(getCode())
    setAttempt([])
  }, [])

  useEffect(() => {
    if (haveExactValues(attempt, code)) {
      setNewCodeAndClearAttempt()
      setScore((prevSt) => ++prevSt)
    }
  }, [attempt])

  const triggerGameOver = useCallback((elapsedMs) => {
    console.log("end!", elapsedMs)
    setCode([`Time! Score: 999`])
    setAttempt([])
  }, [])

  return (
    <div className={classes.container(classNames.container)} {...otherProps}>
      <CodeRush.Code
        className={classes.code(classNames.code)}
        {...{ code, ...codeProps }}
      />
      <div
        className={classes.numPadAndStats(classNames.numPadAndStats)}
        {...numPadAndStatsProps}
      >
        <CodeRush.NumPad
          classNames={classes.numPad(classNames.numPad)}
          {...{ code, attempt, setAttempt, ...numPadProps }}
        />
        <CodeRush.Stats {...statsProps} />
      </div>
      <CodeRush.TimerButton
        classNames={classes.timerButton(classNames.timerButton)}
        timeout={2000}
        onGameStart={setNewCodeAndClearAttempt}
        onGameOver={triggerGameOver}
        {...timerButtonProps}
      />
    </div>
  )
}

CodeRushRoot.defaultProps = defaultProps
CodeRushRoot.propTypes = propTypes
