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
  maxLives,
  classNames,
  codeProps,
  numPadAndStatsProps,
  numPadProps,
  statsProps,
  timerButtonProps,
  ...otherProps
}) {
  const [code, setCode] = useState([`Tap button to start`])
  const [attempt, setAttempt] = useState([])
  const [score, setScore] = useState(0)
  const [livesLeft, setLivesLeft] = useState(0)

  const setNewCodeAndClearAttempt = useCallback(() => {
    setCode(getCode())
    setAttempt([])
  }, [])

  const startGame = useCallback(() => {
    setNewCodeAndClearAttempt()
    setScore(0)
    setLivesLeft(maxLives)
  }, [])

  const triggerGameOver = useCallback((elapsedMs) => {
    setCode([`Game over! Again?`])
    setAttempt([])
    loseLife(true)
  }, [])

  const loseLife = useCallback(
    (loseAll) =>
      setLivesLeft((prevSt) =>
        loseAll === true ? 0 : prevSt ? --prevSt : prevSt
      ),
    []
  )

  useEffect(() => {
    if (haveExactValues(attempt, code)) {
      setNewCodeAndClearAttempt()
      setScore((prevSt) => ++prevSt)
    }
  }, [attempt])

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
        <CodeRush.Stats {...{ score, livesLeft, maxLives }} {...statsProps} />
      </div>
      <CodeRush.TimerButton
        classNames={classes.timerButton(classNames.timerButton)}
        timeout={500}
        {...{ score, livesLeft, maxLives }}
        onGameStart={startGame}
        onLifeLost={loseLife}
        onGameOver={triggerGameOver}
        {...timerButtonProps}
      />
    </div>
  )
}

CodeRushRoot.defaultProps = defaultProps
CodeRushRoot.propTypes = propTypes
