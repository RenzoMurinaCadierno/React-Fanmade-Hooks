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
  classNames,
  ...otherProps
}) {
  const { isActive, trigger, abort, release, getElapsedMs } = useLatency({
    checkpointInterval: 87,
    onCheckpoint: (ms) => setElapsed(ms)
    // abortAtMs: 1500
    // releaseAtMs: 200
    // doNotReRenderOnAction: true
  })
  wire with root
  const [elapsed, setElapsed] = useState(0)

  const _null = () => {}

  const startCountDown = () => trigger(timeout).then(_null).catch(_null)

  return (
    <Button.WithProgress
      min={0}
      max={timeout}
      value={elapsed}
      value={elapsed}
      showSpinner={isActive}
      onClick={startCountDown}
      classNames={classes.button(classNames)}
      {...otherProps}
    >
      {isActive ? getFormattedCountdown(elapsed, timeout) : "ok!"}
    </Button.WithProgress>
  )
}

CodeRushTimerButton.defaultProps = defaultProps
CodeRushTimerButton.propTypes = propTypes
