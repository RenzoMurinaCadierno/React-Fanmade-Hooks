import { useState, useEffect, useCallback } from "react"
import { CodeRush } from "hub"
import { haveExactValues, getCode } from "./CodeRushStateContainer.utils"

export default function CodeRushStateContainer({
  maxLives = CodeRush.constants.setup.MAX_LIVES,
  difficulty = CodeRush.constants.difficulty.NORMAL,
  timePenalty = CodeRush.constants.setup.TIME_PENALTY,
  ...otherProps
}) {
  /**
   * Array that holds the digits to replicate using the buttons in
   * '*PhoneDial*', in '*CodeRush.NumPad*'. It also stores the messages for
   * 'game start' and 'game over'.
   */
  const [code, setCode] = useState([CodeRush.constants.texts.code.START_GAME])

  /**
   * Array that stores the values of currently pressed buttons. Each change is
   * tested versus the digits held in "code". If they match, the logic to
   * advance to the next iteration of "code" triggers.
   */
  const [attempt, setAttempt] = useState([])

  /**
   * Current score. Increases by 1 when "code" and "attempt" share the same
   * values. Resets on a new game instance.
   */
  const [score, setScore] = useState(0)

  /**
   * High scores for each "mode" (difficulty level). They always match the
   * highest obtained "score" for the given "mode" on previous game instances,
   * and will only update when the current "score" on an active game exceeds
   * the previous score of the "mode" that game instance is on.
   */
  const [hiScores, setHiScores] = useState(() => {
    const { EASY, NORMAL, HARD } = CodeRush.constants.difficulty
    return { [EASY]: 0, [NORMAL]: 0, [HARD]: 0 }
  })

  /**
   * The amount of lives left. Starts at `maxLives` upon game start, and
   * decreases by one each time latency (timer) in '*CodeRush.TimerButton*'
   * hits 0.
   *
   * When "livesLeft" hits 0 while game is active, 'game over' logic triggers.
   *
   * While game is inactive or at a game reset, "livesLeft" is set to 0.
   */
  const [livesLeft, setLivesLeft] = useState(0)

  /**
   * The game's difficulty level, as an integer. Can be 1 (easy), 2 (normal)
   * or 3 (hard).
   */
  const [mode, setMode] = useState(difficulty)

  /**
   * Sets up game-related state variables upon a game start and when "attempt"
   * holds the same values as "code" (meaning the answer was correct).
   *
   * It sets a new "code" depending on "mode", updates "score", clears "attempt"
   * and restores all lives to its maximum a new game was triggered.
   */
  const setupIteration = useCallback(
    ({ score, isNewGame }) => {
      setCode(getCode(score, mode))
      setScore((prevSt) => (isNewGame ? 0 : ++prevSt))
      setAttempt([])
      isNewGame && setLivesLeft(maxLives)
    },
    [mode, maxLives]
  )

  /**
   * Fires "setupIteration" on a new game, which clears "attempt", sets a new
   * "code" depending on "mode", "score" to 0 and "livesLeft" to `maxLives`.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  const handleGameStart = useCallback(() => {
    setupIteration({ score: 0, isNewGame: true })
  }, [])

  /**
   * Sets a 'game over' message in "code", clears "attempt" and sets "livesLeft"
   * to 0.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  const handleGameOver = useCallback(() => {
    setCode([CodeRush.constants.texts.code.GAME_OVER])
    setAttempt([])
    loseLife("all")
  }, [])

  /**
   * Fires on each '*PhoneDial*' button press, in '*CodeRush.NumPad*'.
   *
   * If that button's "value" matches one in "attempt", it removes it from
   * there. Otherwise, it is added to it.
   */
  const updateAttempt = useCallback((value) => {
    setAttempt((prevSt) => {
      return prevSt.includes(value)
        ? prevSt.filter((digit) => digit !== value)
        : [...prevSt, value]
    })
  }, [])

  /**
   * Decreases "livesLeft" by 1 provided it is not already 0.
   *
   * If "amount" parameter is 'all', "livesLeft" is set to 0 regardless of its
   * state.
   */
  const loseLife = useCallback((amount) => {
    setLivesLeft((prevSt) =>
      amount === "all" ? 0 : prevSt > 0 ? --prevSt : prevSt
    )
  }, [])

  /**
   * Toggles "mode" in sequence (1 -> 2 -> 3 -> repeat).
   */
  const switchMode = useCallback(() => {
    setMode((prevSt) => (prevSt >= 3 ? 1 : ++prevSt))
  }, [])

  /**
   * On "attempt" change, it checks if its currently held values matches the
   * ones in "code". If so, a correct answer is assumed, which triggers
   * "setupIteration" to set up the next game loop.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (haveExactValues(attempt, code)) {
      setupIteration({ score, isNewGame: false })
    }
  }, [attempt])

  /**
   * On "score" change, it checks if "score" is higher than "hiScore" for the
   * current "mode". If so, "hiScore" is updated to match "score".
   */
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
