import React, { useState, useEffect } from "react"
import { useLatency, useTimeoutToggle, Button, CodeRush } from "hub"
import {
  classes,
  defaultProps,
  propTypes,
  getTimeoutForLevel,
  getButtonText,
  getButtonType
} from "./CodeRushTimerButton.utils"

/**
 * This component holds '*useLatency*' hook's demo.
 *
 * It calls for an instance of that hook configured with:
 *
 * * `checkpointInterval = 87`, causing one latency update each 87 milliseconds.
 *   This number is arbitrary to render chaotic values to display on each loop.
 *
 * * `onCheckPoint = (ms) => setElapsedMs(ms)`, which will set inner "elapsedMs"
 *   state to the updated elapsed milliseconds calculated by hook's
 *   "getElapsedMs" method.
 *
 * @returns {React.Element} A '*Button.WithProgress*' with an instance of
 *   '*useLatency*' set up with the configurations above, which:
 *
 * * **1.** Calls for its "_fire_" method (with `timeout` as its _duration_,
 *   'lose life' logic as _resolve_ and re-trigger "_fire_" as _reject_) on
 *   '*Button.WithProgress*' press when game is inactive. This sets the app to
 *   a timeout (latency) which controls the game's active state.
 *
 * * **2.** Substracts a life from game state when latency timeout reaches 0
 *   (a.k.a. "_releases_"), and calls for "_fire_" again, triggering a new latency
 *   loop which keeps game active.
 *
 * * **3.** _Releases_ (a.k.a. timeout promise resolves) when latency timeout
 *   reaches 0 and there are no lives left to substract in game state. "_fire_"
 *   method is not re-called, thus the game is released from its latency
 *   timeout state, becoming inactive (thus, triggering 'game over' state).
 *
 * * **4.** _Aborts_ (a.k.a. timeout promise rejects) when score increases (a
 *   correct answer was given). This falls into latency "_fire_" method again
 *   without provoking a life lost.
 *
 * * **5.** _Releases_ without re-triggering "_fire_" when 'game restart' prompt
 *   is confirmed, triggering 'game over' state.
 */
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
    checkpointInterval: 87, // update inner state in '*useLatency*' each 87 ms.
    onCheckpoint: (ms) => setElapsedMs(ms) // update "elapsedMs" on checkpoints
    // uncomment the options below one at a time to test their logic:
    // abortAtMs: 1000 // re-triggers countdown at 1000ms, regardless `timeout`
    // releaseAtMs: 1000 // loses life at 1000ms, regardless `timeout`
    // doNotReRenderOnAction: true // ignores re-renders. WILL NOT UPDATE elapsedMs!
  })

  /**
   * Returns the timeout in milliseconds to use as "latency" duration and to
   * calculate '*Button.WithProgress*' props.
   *
   * Will be higher depending on lower game's `mode` (lower difficulty), and
   * is reduced by `timePenalty` * the current level (from level 3 upwards).
   */
  const _timeout = getTimeoutForLevel(timeout, score, mode, timePenalty)

  /**
   * Calls for "latency" `fire` method, with the updated "_timeout" as duration.
   *
   * Sets `onLifeLost` as its "release" callback (when latency promise resolves,
   * on `duration = 0`), which handles the logic of substracting one life from
   * current game state.
   *
   * Sets `triggerCountdown` as its "abort" callback (on latency promise
   * reject), which resets and fires "latency" countdown again.
   *
   * @param {function} onStart callback to trigger when latency fires. Defaults
   *   to `() => setElapsedMs(0)`, which re-sets inner "elapsedMs" state each
   *   time a life is lost or score increases.
   */
  function triggerCountdown(onStart = () => setElapsedMs(0)) {
    latency.fire(_timeout, onStart).then(onLifeLost).catch(triggerCountdown)
  }

  /**
   * Handles 'game over' logic.
   *
   * It releases "latency", ending its active state, which sets the app back to
   * inactive. It also sets "elapsedMs" to 0, and "isPromptingRestart" to false.
   *
   * Afterwards, `onGameOver` is called, if defined.
   */
  function endGame() {
    latency.release()
    setElapsedMs(0)
    toggleIsPromptingRestart(false)
    onGameOver?.()
  }

  /**
   * '*Button.WithProgress*' `onClick`.
   *
   * Fires "triggerCountdown" if game is inactive, or prompts for a game reset
   * when it is. It is also used to confirm that prompt, which when done,
   * "endGame" is executed.
   */
  function handleClick() {
    if (latency.isActive) {
      if (isPromptingRestart) return endGame()
      return toggleIsPromptingRestart(true)
    }
    triggerCountdown(onGameStart)
  }

  /**
   * On each score change when game is active, abort current latency instance.
   * This falls back to catch block, which re-triggers "triggerCountdown"
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => score && livesLeft && latency.abort(), [score])

  /**
   * On each life change except at game start, re-trigger "triggerCountdown".
   * Otherwise, when there are no lives left while game is active, call for
   *   "endGame", placing the game back at inactive state.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    // on each life change except at game start
    if (livesLeft && livesLeft !== maxLives) triggerCountdown()
    // on last life when game is running (elapsedMs !== 0)
    else if (!livesLeft && elapsedMs) endGame()
  }, [livesLeft])

  return (
    <Button.WithProgress
      min={0}
      // higher values result in bonus time, but set progress' value to its max
      // to avoid prop-type errors
      value={elapsedMs > _timeout ? _timeout : elapsedMs}
      max={_timeout}
      showSpinner={latency.isActive} // show spinner when latency is running
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
