import { useCallback, useEffect, useState, memo } from "react"
import { useTimer, CmpDescription, BT } from "hub"
import {
  classes,
  iconExpandableProps,
  descItemsObject,
  scores,
  targetContentObj,
  initialGameState,
  setGameStOnTargetDestroyed,
  setGameStOnGameStart,
  setGameStOnGameReset
} from "./UseTimer.utils"

// NOTE: This is a render-heavy example, that's why we try to optimize
// re-renders as much as possible. Each new target will mandatory render
// '*BTField*' in '*BTGame*' two times, and we will be spawning lots of them.

export default function UseTimer() {
  // skip re-renders on '*CmpTest*' as it has no props (its children will
  // re-render though).
  const MemoizedCmpTest = memo(CmpTest)

  return (
    <div className={classes.container}>
      <CmpDescription
        descItems={descItemsObject}
        iconExpandableProps={iconExpandableProps}
        classNames={classes.cmpDesc}
      />
      <MemoizedCmpTest />
    </div>
  )
}

function CmpTest() {
  // global game state for '*BTGame*' and '*BTScoreboard*'. The logic exceeds
  // the example here that should focus on useTimer hook, so we externalized
  // it to *utils.js* and to their own components.
  const [gameSt, setGameSt] = useState(initialGameState)

  const handleTargetDestroyed = useCallback(
    (scoreArr, wasPlayerHit) =>
      setGameStOnTargetDestroyed(setGameSt, scoreArr, wasPlayerHit),
    []
  )
  const handleGameStart = useCallback(() => setGameStOnGameStart(setGameSt), [])
  const handleGameReset = useCallback(() => setGameStOnGameReset(setGameSt), [])

  return (
    <section className={classes.cmpTest} aria-label="component testing area">
      <BT.Scoreboard
        gameSt={gameSt}
        scores={scores}
        // '*Timer*', as is, will render inside a '*Text*'. Nothing else
        timerComponent={Timer}
        onGameReset={handleGameReset}
        onGameStart={handleGameStart}
      />
      <BT.Game
        isGameActive={gameSt.isGameActive}
        maxTargetsOnScreen={gameSt.maxTgtsOnScreen}
        // fine-tuned timeout for the game not to be hard, but still not easy
        spawnTargetTimeout={290}
        targetContent={targetContentObj}
        onTargetDestroyed={handleTargetDestroyed}
      />
    </section>
  )
}

/**
 * '*BTGame*' has its own dedicated "timer" component. But we use this one
 * here instead for the example to be more visible.
 */
function Timer({ isGameActive, bonusTime, points, onGameReset }) {
  const timer = useTimer({ initialTime: { secs: 30 }, tick: { ms: -59 } })
  // we do not want any of these useEffect to fire on timer changes, only to
  // `isGameActive` changes. So, disable warnings.
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isGameActive) timer.start()
    else timer.stop()
  }, [isGameActive])

  // we would normally listen to `bonusTime` changes here, but if we hit the
  // same time bonus two times, `bonusTime` will not change and useEffect will
  // only trigger once when we want it to fire twice. Thus, a workaround is to
  // listen to listen to changes in `points` instead, since they always rise up
  // on each target hit. Also, if we do not add `isGameActive` to the check,
  // game end will destroy all targets and substract/add time accodingly,
  // modifying the timer for next game.
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(
    () => bonusTime && isGameActive && timer.advance(bonusTime),
    [points]
  )

  // this useEffect fires when there is no time left (0ms === !timer.currentMs),
  // and triggers game reset logic
  useEffect(
    () => !timer.currentMs && onGameReset(),
    [timer.currentMs, onGameReset]
  )

  return (
    <>
      {timer.time.mins}m {timer.time.secs}s {timer.time.ms}ms
    </>
  )
}
