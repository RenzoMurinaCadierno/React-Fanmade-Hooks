import { useState, useCallback, useEffect } from "react"
import { useLatency, Button } from "hub"
import {
  classes,
  defaultProps,
  propTypes,
  getFormattedCountdown
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

  const { isActive, trigger, abort, release, getElapsedMs } = useLatency({
    checkpointInterval: 187,
    onCheckpoint: (ms) => setElapsedMs(ms)
    // abortAtMs: 500,
    // releaseAtMs: 200
    // doNotReRenderOnAction: true
  })

  useEffect(() => {
    if (score || (livesLeft && livesLeft !== maxLives)) {
      restartCountdown()
    }
  }, [score, livesLeft])

  const startCountdown = useCallback(() => {
    trigger(timeout, onGameStart).then(onLifeLost).catch(restartCountdown)
  }, [])
  check this logic, its flawed. Then add highScore and release on [3/2 attempts]
  function restartCountdown() {
    abort()
    setElapsedMs(0)
    if (!livesLeft) onGameOver()
    else trigger(timeout).then(onLifeLost).catch(restartCountdown)
  }

  return (
    <Button.WithProgress
      min={0}
      value={elapsedMs}
      max={timeout}
      showSpinner={isActive}
      onClick={startCountdown}
      classNames={classes.timerButton(classNames)}
      {...otherProps}
    >
      {isActive ? getFormattedCountdown(elapsedMs, timeout) : "ok!"}
    </Button.WithProgress>
  )
}

CodeRushTimerButton.defaultProps = defaultProps
CodeRushTimerButton.propTypes = propTypes
