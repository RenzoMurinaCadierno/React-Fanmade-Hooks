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

  const setupIteration = useCallback(({ score, isNewGame }) => {
    setCode(getCode(score))
    setScore((prevSt) => (isNewGame ? 0 : ++prevSt))
    setAttempt([])
    isNewGame && setLivesLeft(maxLives)
  }, [])

  const handleGameStart = useCallback(() => {
    setupIteration({ score: 0, isNewGame: true })
  }, [])

  const handleGameOver = useCallback(() => {
    setCode([`Game over! Again?`])
    setAttempt([])
    loseLife("all")
  }, [])

  const loseLife = useCallback((amount) => {
    setLivesLeft((prevSt) =>
      amount === "all" ? 0 : prevSt ? --prevSt : prevSt
    )
  }, [])

  useEffect(() => {
    if (haveExactValues(attempt, code)) {
      setupIteration({ score, isNewGame: false })
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
        timeout={5000}
        {...{ score, livesLeft, maxLives }}
        onGameStart={handleGameStart}
        onLifeLost={loseLife}
        onGameOver={handleGameOver}
        {...timerButtonProps}
      />
    </div>
  )
}

CodeRushRoot.defaultProps = defaultProps
CodeRushRoot.propTypes = propTypes
