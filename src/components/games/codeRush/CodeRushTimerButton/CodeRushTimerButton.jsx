import { useState, useEffect } from "react"
import { useLatency, useTimeoutToggle, Button, CodeRush } from "hub"
import {
  classes,
  defaultProps,
  propTypes,
  getTimeoutForLevel,
  getButtonText,
  getButtonType
} from "./CodeRushTimerButton.utils"

export default function CodeRushTimerButton({
  timeout,
  mode,
  livesLeft,
  maxLives,
  timePenalty,
  score,
  onGameStart,
  onLifeLost,
  onGameOver,
  classNames,
  ...otherProps
}) {
  const [elapsedMs, setElapsedMs] = useState(0)
  const [isPromptingRestart, toggleIsPromptingRestart] = useTimeoutToggle(1500)

  const latency = useLatency({
    checkpointInterval: 87,
    onCheckpoint: (ms) => setElapsedMs(ms)
    // abortAtMs: _timeout
    // releaseAtMs: 200
    // doNotReRenderOnAction: true
  })

  const _timeout = getTimeoutForLevel(timeout, score, mode, timePenalty)

  function triggerCountdown(onStart = () => setElapsedMs(0)) {
    latency.fire(_timeout, onStart).then(onLifeLost).catch(triggerCountdown)
  }

  function endGame() {
    latency.release()
    setElapsedMs(0)
    toggleIsPromptingRestart(false)
    onGameOver?.()
  }

  function handleClick() {
    if (latency.isActive) {
      if (isPromptingRestart) return endGame()
      return toggleIsPromptingRestart(true)
    }
    triggerCountdown(onGameStart)
  }

  // on each score change but not on the last life
  useEffect(() => score && livesLeft && latency.abort(), [score])

  useEffect(() => {
    // on each life change except at game start
    if (livesLeft && livesLeft !== maxLives) triggerCountdown()
    // on last life when game is running (elapsedMs !== 0)
    else if (!livesLeft && elapsedMs) endGame()
  }, [livesLeft])

  return (
    <Button.WithProgress
      min={0}
      // higher values result in bonus time, but progress' value to max to
      // avoid prop-type errors
      value={elapsedMs > _timeout ? _timeout : elapsedMs}
      max={_timeout}
      showSpinner={latency.isActive}
      type={getButtonType(isPromptingRestart, elapsedMs, _timeout)}
      onClick={handleClick}
      classNames={classes.timerButton(classNames)}
      {...otherProps}
    >
      {getButtonText(
        isPromptingRestart,
        latency.isActive,
        elapsedMs,
        _timeout,
        CodeRush.constants.texts.timer
      )}
    </Button.WithProgress>
  )
}

CodeRushTimerButton.defaultProps = defaultProps
CodeRushTimerButton.propTypes = propTypes
