import { memo, useCallback, useEffect, useState } from "react"
import { BT } from "hub"
import {
  classes,
  defaultProps,
  propTypes,
  getNewCoords,
  index
} from "./BTGame.utils"

function BTGame({
  isGameActive, // <boolean> true determines if the game logic is flowing
  spawnTargetTimeout, // <number> time in ms a new '*BTTarget*' will spawn
  maxTargetsOnScreen, // <number> the maximum amount of targets on '*BTField*' at once
  targetContent, // <string|object> '*BTTarget*' content to display on hit
  onTargetDestroyed, // <function> callback to trigger on target hit, self-destruct and accuracyTimeout
  classNames // <object> classNames object. Check *utils.js* for its constitution
}) {
  // an array containing the active coordinate sets on each render. Most game logic
  // listeners are attached to changes on this set. Including '*BTTarget*' rendering
  const [coordsCache, setCoordsCache] = useState([])
  // a copy of coordsCache at given intervals specifically used to render '*BTTarget*'s.
  // The reason it is independent from coordsCache is to delay target painting on screen
  // -they have spawn and destroy timeouts- without affecting animation transition UX
  const [coordsToRenderTgts, setCoordsToRenderTgts] = useState([])
  // selfDestruct state for all '*BTTarget*'s `selfDestruct`.
  const [selfDestruct, setSelfDestruct] = useState(false)

  const handleTargetDestroyed = useCallback(
    (tgtRef, scoreArr, wasPlayerHit) => {
      // filter coordsCache to remove the destroyed '*BTTarget*'. We need to pass its
      // "tgtRef" as arg because we identify the target by its `data-idx`
      setCoordsCache((prevSt) =>
        prevSt.filter((c) => c.idx !== tgtRef.dataset.idx)
      )
      // trigger `onTargetDestroyed` if defined. Pass the score related to the time
      // delta between target spawning and its destruction, and a boolean indicating
      // if the target was destroyed by the player (true), or self-destroyed (false)
      onTargetDestroyed?.(scoreArr, wasPlayerHit)
    },
    [setCoordsCache, onTargetDestroyed]
  )

  const handleSelfDestruct = useCallback(() => {
    // set `selfDestruct` of all '*BTTarget*'s to true, and clean all coords in
    // cache, effectively removing all targets from screen
    setSelfDestruct(true)
    setCoordsCache([])
  }, [setSelfDestruct, setCoordsCache])

  // We need to set "selfDestruct" to false here only if it was false at the time of
  // calling, to dodge an extra re-render on every call. However, that would imply
  // an eslint warning in console to add it as dependency. So just disable it
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let newTgtRenderTimeout
    // handle this logic only if game is on
    if (isGameActive) {
      // each time "coordsCache" changes, set a new spawn timeout to render all
      // coordinates there as '*BTTargets*' (handled by "coordsToRenderTgts").
      // Also, if coordsCache was cleared due to self-destruction, reset that
      // state to false (so that next targets do not blow up instantly)
      newTgtRenderTimeout = setTimeout(() => {
        selfDestruct && setSelfDestruct(false)
        setCoordsToRenderTgts(coordsCache)
      }, spawnTargetTimeout - 25)
    }
    return () => clearTimeout(newTgtRenderTimeout)
  }, [coordsCache, isGameActive])

  // eslint will want us to add `maxTargetsOnScreen` and `spawnTargetTimeout` as
  // dependencies, but we do not want to listen to them since those will conflict
  // with spawning interval, solely dependent on "coordsCache". Disable warnings
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let spawnInterval
    // handle this logic only if game is on
    if (isGameActive) {
      // each time we reach a target spawn interval, add a new set of coords to
      // "coordsCache", which will fire '*BTTarget*' rendering in useEffect above.
      // This, provided we do not exceed the maximum amount of targets to render.
      // Also, if "coordsCache" is empty, clean the index so it does not go too high.
      spawnInterval = setInterval(() => {
        if (coordsCache.length >= maxTargetsOnScreen) return
        !coordsCache.length && index.reset()
        setCoordsCache((prevSt) => [...prevSt, getNewCoords(15, 85, 15, 85)])
      }, spawnTargetTimeout)
    }
    return () => clearInterval(spawnInterval)
  }, [coordsCache, isGameActive])

  // Same as previous useEffect, but this time we only want to listen to
  // `isGameActive` to trigger the 'game end' effect. We cannot trigger it on
  // any other change but that variable. Again, disable warnings.
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let cleanTgtsOnGameEndTimeout
    // handle this logic if game ended and there are still coords in
    // "coordsCache"
    if (coordsCache.length && !isGameActive) {
      // destroy all '*BTTarget*'s on screen
      handleSelfDestruct()
      // let destroy animation play and set "selfDestruct" state to false for the
      // new game. Perform a cleanup on "coordsToRenderTgts" as a failsafe too.
      cleanTgtsOnGameEndTimeout = setTimeout(() => {
        setSelfDestruct(false)
        setCoordsToRenderTgts([])
      }, spawnTargetTimeout)
    }
    return () => clearTimeout(cleanTgtsOnGameEndTimeout)
  }, [isGameActive])

  return (
    <div className={classes.container(classNames.container)}>
      <BT.Bombs
        bombs={3}
        show={isGameActive}
        // disabled when game is not active or when targets are self-destroying
        disabled={selfDestruct || !isGameActive}
        onClick={handleSelfDestruct}
      />
      <BT.Field disabled={!isGameActive} className={classNames?.field}>
        {coordsToRenderTgts.map((coord) => (
          <BT.Target
            key={coord.idx}
            data-idx={coord.idx} // used to filter "coordsCache"
            x={coord.x}
            y={coord.y}
            content={targetContent}
            selfDestruct={selfDestruct} // universal "selfDestruct"
            onHit={handleTargetDestroyed}
            destroyOnAccuracyTimeout // when its life timeout ends, self-destroy them
            onAccuracyTimeout={handleTargetDestroyed}
            classNames={classNames?.target}
          />
        ))}
      </BT.Field>
    </div>
  )
}

BTGame.defaultProps = defaultProps
BTGame.propTypes = propTypes

export default memo(BTGame)
