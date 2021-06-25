import { useState } from "react"
import { useLatency, Button } from "hub"
import {
  classes,
  defaultProps,
  propTypes,
  getFormattedCountdown
} from "./CodeRushTimerButton.utils"

export default function CodeRushTimerButton({
  timeout,
  onGameStart,
  onGameOver,
  classNames,
  ...otherProps
}) {
  const l = (...a) => console.log(...a)
  const setElaps = (time) => setElapsed(time)
  const res = (text, ms) => {
    l(text, ms)
    setElapsed(ms)
  }
  const { isActive, trigger, abort, release, getElapsedMs } = useLatency({
    checkpointInterval: 187,
    onCheckpoint: setElaps,
    // abortAtMs: 500,
    // releaseAtMs: 200
    doNotReRenderOnAction: true
  })
  // keep on testing hook. All of it. Abort/rlease/end on checkpoint or not
  // test phonedial CONSTANTS here and in useEffectOnce. Then wire with root
  const [elapsed, setElapsed] = useState(0)

  const _null = () => {}
  // console.log(elapsed)
  // const startCountDown = () => trigger(timeout).then(onGameOver).catch(_null)
  const startCountDown = () =>
    trigger(timeout, () => onGameStart())
      .then((ms) => res("release", ms))
      .catch((ms) => res("abort", ms))
  // console.log(elapsed, timeout, "aaaa")
  return (
    <Button.WithProgress
      min={0}
      value={elapsed}
      max={timeout}
      showSpinner={isActive}
      onClick={startCountDown}
      classNames={classes.timerButton(classNames)}
      {...otherProps}
    >
      {isActive ? getFormattedCountdown(elapsed, timeout) : "ok!"}
    </Button.WithProgress>
  )
}

CodeRushTimerButton.defaultProps = defaultProps
CodeRushTimerButton.propTypes = propTypes
