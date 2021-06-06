import { useEffect } from "react"
import { useTimer } from "hub"
import { defaultProps, propTypes } from "./BTTimer.utils"

export default function BTTimer({
  initialTime,
  tick,
  isGameActive,
  bonusTime,
  points,
  onGameReset
}) {
  const timer = useTimer({ initialTime, tick })

  // we do not want any of these useEffect to fire on "timer" changes, only to
  // what is specified in the dependencies array. So, disable eslint warnings.
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isGameActive) timer.start()
    else timer.stop()
  }, [isGameActive])

  // we would normally listen to `bonusTime` changes here, but if we hit the same
  // time bonus two times, `bonusTime` will not change and thus useEffect will only
  // trigger once when we want it to fire twice. Thus, a workaround is to listen
  // to changes in `points` instead, since they always rise up on each target hit.
  // Also, if we do not add `isGameActive` to the check, game end will destroy all
  // targets and substract/add time accodingly, modifying the timer for next game.
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(
    () => bonusTime && isGameActive && timer.advance(bonusTime),
    [points]
  )

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => !timer.currentMs && onGameReset(), [timer.currentMs])

  return (
    <>
      {timer.time.mins}m {timer.time.secs}s {timer.time.ms}ms
    </>
  )
}

BTTimer.defaultProps = defaultProps
BTTimer.propTypes = propTypes
