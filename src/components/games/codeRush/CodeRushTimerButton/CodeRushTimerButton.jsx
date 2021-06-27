import { useState, useCallback, useEffect } from "react"
import { useLatency, Button } from "hub"
import {
  classes,
  defaultProps,
  propTypes,
  getButtonText
} from "./CodeRushTimerButton.utils"

export default function CodeRushTimerButton({
  timeout,
  livesLeft,
  maxLives,
  score,
  onGameStart,
  onLifeLost,
  onGameOver,
  classNames,
  ...otherProps
}) {
  const [elapsedMs, setElapsedMs] = useState(0)
  const [promptRestart, setPromptRestart] = useState(false)

  const latency = useLatency({
    checkpointInterval: 187,
    onCheckpoint: (ms) => setElapsedMs(ms)
    // abortAtMs: 500,
    // releaseAtMs: 200
    // doNotReRenderOnAction: true
  })

  // on score change, on livesLeft change when its not game start, on no
  // lives left and game is on (elapsedMs !== 0)
  useEffect(() => {
    if (
      score ||
      (livesLeft && livesLeft !== maxLives) ||
      (!livesLeft && elapsedMs)
    ) {
      restartCountdown()
      // latency.abort()
    }
  }, [score, livesLeft])

  function restart() {
    setElapsedMs(0)
    latency.fire(timeout).then(onLifeLost).catch(restartCountdown)
  }

  useEffect(() => {
    let promptTimeout
    if (promptRestart) {
      promptTimeout = setTimeout(() => setPromptRestart(false), 2000)
    }
    return () => clearTimeout(promptTimeout)
  }, [promptRestart])

  const startCountdown = useCallback(() => {
    latency.fire(timeout, onGameStart).then(onLifeLost).catch(restartCountdown)
  }, [])
  check this logic, its flawed. Then code with same effect as score
  function restartCountdown() {
    // latency.abort()
    setElapsedMs(0)
    if (!livesLeft) {
      setPromptRestart(false)
      onGameOver?.()
    } else {
      latency.fire(timeout).then(onLifeLost).catch(restartCountdown)
    }
  }

  function restartGame() {
    latency.release()
    setElapsedMs(0)
    setPromptRestart(false)
    onGameOver?.()
  }

  function handleButtonClick() {
    if (latency.isActive) {
      if (promptRestart) return restartGame()
      else return setPromptRestart(true)
    }
    startCountdown()
  }

  return (
    <Button.WithProgress
      min={0}
      value={elapsedMs}
      max={timeout}
      showSpinner={latency.isActive}
      type={promptRestart ? "secondary" : "primary"}
      onClick={handleButtonClick}
      classNames={classes.timerButton(classNames)}
      {...otherProps}
    >
      {getButtonText(promptRestart, latency.isActive, elapsedMs, timeout)}
    </Button.WithProgress>
  )
}

CodeRushTimerButton.defaultProps = defaultProps
CodeRushTimerButton.propTypes = propTypes
