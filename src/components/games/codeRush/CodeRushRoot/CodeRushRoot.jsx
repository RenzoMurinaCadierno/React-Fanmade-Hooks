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
  timeout,
  maxLives = CodeRush.constants.MAX_LIVES,
  difficulty = CodeRush.constants.difficulty.HARD,
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
    setCode(getCode(score, difficulty))
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
        <CodeRush.Stats
          {...{ difficulty, score, livesLeft, maxLives, ...statsProps }}
        />
      </div>
      <CodeRush.TimerButton
        // easy: 6000, normal: 5000, hard: 4000
        timeout={timeout || (7 - difficulty) * 1000}
        onGameStart={handleGameStart}
        onLifeLost={loseLife}
        onGameOver={handleGameOver}
        classNames={classes.timerButton(classNames.timerButton)}
        {...{ difficulty, score, livesLeft, maxLives, ...timerButtonProps }}
      />
    </div>
  )
}

CodeRushRoot.defaultProps = defaultProps
CodeRushRoot.propTypes = propTypes
