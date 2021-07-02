import { useState, useEffect, useCallback } from "react"
import { CodeRush } from "hub"
import { haveExactValues, getCode } from "./CodeRushStateContainer.utils"
go on commenting
export default function CodeRushStateContainer({
  maxLives = CodeRush.constants.MAX_LIVES,
  difficulty = CodeRush.constants.difficulty.HARD,
  timePenalty = CodeRush.constants.TIME_PENALTY,
  ...otherProps
}) {
  const [code, setCode] = useState([CodeRush.constants.texts.code.START_GAME])
  const [attempt, setAttempt] = useState([])
  const [score, setScore] = useState(0)
  const [hiScores, setHiScores] = useState({
    [CodeRush.constants.difficulty.EASY]: 0,
    [CodeRush.constants.difficulty.NORMAL]: 0,
    [CodeRush.constants.difficulty.HARD]: 0
  })
  const [livesLeft, setLivesLeft] = useState(0)
  const [mode, setMode] = useState(difficulty)

  const setupIteration = useCallback(
    ({ score, isNewGame }) => {
      setCode(getCode(score, mode))
      setScore((prevSt) => (isNewGame ? 0 : ++prevSt))
      setAttempt([])
      isNewGame && setLivesLeft(maxLives)
    },
    [mode, maxLives]
  )

  /* eslint-disable react-hooks/exhaustive-deps */
  const handleGameStart = useCallback(() => {
    setupIteration({ score: 0, isNewGame: true })
  }, [])

  /* eslint-disable react-hooks/exhaustive-deps */
  const handleGameOver = useCallback(() => {
    setCode([CodeRush.constants.texts.code.GAME_OVER])
    setAttempt([])
    loseLife("all")
  }, [])

  const updateAttempt = useCallback((value) => {
    setAttempt((prevSt) => {
      return prevSt.includes(value)
        ? prevSt.filter((digit) => digit !== value)
        : [...prevSt, value]
    })
  }, [])

  const loseLife = useCallback((amount) => {
    setLivesLeft((prevSt) =>
      amount === "all" ? 0 : prevSt ? --prevSt : prevSt
    )
  }, [])

  const switchMode = useCallback(() => {
    setMode((prevSt) => (prevSt >= 3 ? 1 : ++prevSt))
  }, [])

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (haveExactValues(attempt, code)) {
      setupIteration({ score, isNewGame: false })
    }
  }, [attempt])

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (score >= hiScores[mode]) {
      setHiScores((prevSt) => ({ ...prevSt, [mode]: score }))
    }
  }, [score])

  return (
    <CodeRush.Root
      {...{
        code,
        attempt,
        score,
        hiScores,
        maxLives,
        livesLeft,
        timePenalty,
        mode,
        handleGameStart,
        handleGameOver,
        updateAttempt,
        loseLife,
        switchMode,
        ...otherProps
      }}
    />
  )
}
