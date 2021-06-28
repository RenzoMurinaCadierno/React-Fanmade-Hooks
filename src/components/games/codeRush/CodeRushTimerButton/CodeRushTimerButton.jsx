import { useState, useEffect } from "react"
import { useLatency, useTimeoutToggle, Button } from "hub"
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
  const [promptRestart, togglePromptRestart] = useTimeoutToggle(1000)

  const latency = useLatency({
    checkpointInterval: 187,
    onCheckpoint: (ms) => setElapsedMs(ms)
    // abortAtMs: 500,
    // releaseAtMs: 200
    // doNotReRenderOnAction: true
  })

  // on each score change but not on the last life
  useEffect(() => score && livesLeft && latency.abort(), [score])

  useEffect(() => {
    // on each life change except at game start
    if (livesLeft && livesLeft !== maxLives) countdown()
    // on last life when game is running (elapsedMs !== 0)
    else if (!livesLeft && elapsedMs) restartGame()
  }, [livesLeft])

  function countdown(onStart = () => setElapsedMs(0)) {
    latency.fire(timeout, onStart).then(onLifeLost).catch(countdown)
  }

  function restartGame() {
    latency.release()
    setElapsedMs(0)
    togglePromptRestart(false)
    onGameOver?.()
  }

  function handleButtonClick() {
    if (latency.isActive) {
      if (promptRestart) return restartGame()
      return togglePromptRestart(true)
    }
    countdown(onGameStart)
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

// import { useState, useCallback, useEffect } from "react"
// import { useLatency, Button } from "hub"
// import {
//   classes,
//   defaultProps,
//   propTypes,
//   getButtonText
// } from "./CodeRushTimerButton.utils"

// export default function CodeRushTimerButton({
//   timeout,
//   livesLeft,
//   maxLives,
//   score,
//   onGameStart,
//   onLifeLost,
//   onGameOver,
//   classNames,
//   ...otherProps
// }) {
//   const [elapsedMs, setElapsedMs] = useState(0)
//   const [promptRestart, setPromptRestart] = useState(false)

//   const latency = useLatency({
//     checkpointInterval: 187,
//     onCheckpoint: (ms) => setElapsedMs(ms)
//     // abortAtMs: 500,
//     // releaseAtMs: 200
//     // doNotReRenderOnAction: true
//   })

//   // on each score change but not on the last life
//   useEffect(() => score && livesLeft && latency.abort(), [score])

//   useEffect(() => {
//     // on each life change except at game start
//     if (livesLeft && livesLeft !== maxLives) countdown()
//     // on last life when game is running (elapsedMs !== 0)
//     else if (!livesLeft && elapsedMs) restartGame()
//   }, [livesLeft])

//   useEffect(() => {
//     let promptTimeout
//     if (promptRestart) {
//       promptTimeout = setTimeout(() => setPromptRestart(false), 2000)
//     }
//     return () => clearTimeout(promptTimeout)
//   }, [promptRestart])

//   function countdown(gameStartCb = () => setElapsedMs(0)) {
//     latency.fire(timeout, gameStartCb).then(onLifeLost).catch(countdown)
//   }

//   function restartGame() {
//     latency.release()
//     setElapsedMs(0)
//     setPromptRestart(false)
//     onGameOver?.()
//   }

//   function handleButtonClick() {
//     if (latency.isActive) {
//       if (promptRestart) return restartGame()
//       else return setPromptRestart(true)
//     }
//     countdown(onGameStart)
//   }

//   return (
//     <Button.WithProgress
//       min={0}
//       value={elapsedMs}
//       max={timeout}
//       showSpinner={latency.isActive}
//       type={promptRestart ? "secondary" : "primary"}
//       onClick={handleButtonClick}
//       classNames={classes.timerButton(classNames)}
//       {...otherProps}
//     >
//       {getButtonText(promptRestart, latency.isActive, elapsedMs, timeout)}
//     </Button.WithProgress>
//   )
// }

// CodeRushTimerButton.defaultProps = defaultProps
// CodeRushTimerButton.propTypes = propTypes
