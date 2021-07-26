import { useEffect, useState, useRef, memo } from "react"
import { useValueToggle } from "hub"
import cnp from "styles/classNameProcessor"
import {
  classes,
  defaultProps,
  propTypes,
  getContentOnHit,
  getTextToShowOnHit
} from "./BTTarget.utils"

function BTTarget({
  content, // <string|object> What to show on target hit. Object shape {accuracy%: msgString, ...}
  type, // <string> "primary" or "secondary"
  x, // <number> spawn X coordinate relative to '*BlankField*' (parent)
  y, // <number> spawn Y coordinate relative to '*BlankField*' (parent)
  appearTimeout, // <number> "appear" animation timeout. Must match its CSS animation class
  destroyAnimationTimeout, // <number> target's destruction animation timeout. Must match its CSS animation class
  accuracyTimeout, // <number> target's timeout from delta accuracy 100% to 0%
  selfDestruct, // <boolean> true will destroy the target without player interaction
  destroyOnAccuracyTimeout, // <boolean> true will destroy the target at `accuracyTimeout`
  showOnBreak, // <string> "closest", "value" or "content"
  onSpawn, // <function> target 'spawn' callback
  onHit, // <function> target 'hit' callback
  onDestroy, // <function> target 'destruction' callback (after destroy animation)
  onSelfDestruct, // <function> target 'self destruction' callback
  onAccuracyTimeout, // <function> target 'accuracy timeout end' callback
  classNames = {}, // <object> classNames object. Check *utils.js* for its constitution
  contentProps = {}, // <object> extra props to add to content's '*span*'
  ...otherProps // <object> props to add to target's '*div*'
}) {
  // global component state
  const [st, setSt] = useState({
    active: true, // on true the target will render
    type, // handles font and border colors
    spawnTime: new Date().getTime(), // ms at the time of component mount
    res: typeof content === "string" ? content : "" // `content` object or string
  })
  // a ref pointing to target '*div*'. We will pass it as arg to callbacks
  const targetRef = useRef()
  // className toggler handlers for target destruction and content showing afterwards
  const [tgtDestroyedCN, triggerDestroyTgt, isDestroyed] = useValueToggle({
    on: classes.animateTargetDestroyed,
    off: "",
    timeout: destroyAnimationTimeout
  })
  const [showPtsCN, triggerShowPts] = useValueToggle({
    on: classes.animateScore,
    off: "",
    timeout: destroyAnimationTimeout
  })

  // trigger the addition of both classNames above
  const breakTarget = (isSelfDestruct, isAccuracyTimeout) => {
    triggerDestroyTgt()
    triggerShowPts()
    // calculate what to show as content when target is destroyed
    const newContent = getContentOnHit(
      content,
      st.spawnTime,
      new Date().getTime(),
      accuracyTimeout,
      appearTimeout
    )
    // set it as state's res
    setSt((prevSt) => ({ ...prevSt, res: newContent }))
    // trigger the respective callback depending on how the target was destroyed.
    // The boolan is a flag to determine if it was a target manually hit by the player
    if (isSelfDestruct) {
      onSelfDestruct?.(targetRef.current, newContent, false, x, y)
    } else if (isAccuracyTimeout) {
      onAccuracyTimeout?.(targetRef.current, newContent, false, x, y)
    } else onHit?.(targetRef.current, newContent, true, x, y)
  }

  // eslint will warn us to add `onSpawn` as dependencies, but we do not want this
  // useEffect to re-trigger if that callback changes. So, ignore warnings
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let unmountTimeout
    // if `selfDestruct` was set to true, trigger "breakTarget" indicating such
    selfDestruct && breakTarget(true)
    // "isDestroyed" is true on user's hit. Selfdestruct on its prop set to true
    if (isDestroyed || selfDestruct) {
      // set a timeout to hide this component's JSX after destroy animation plays.
      // Also, trigger `onDestroy` if defined
      unmountTimeout = setTimeout(() => {
        setSt((prevSt) => ({ ...prevSt, active: false }))
        onDestroy?.()
      }, destroyAnimationTimeout + 50)
    }
    return () => clearTimeout(unmountTimeout)
  }, [isDestroyed, selfDestruct, st.timeoutExpired])

  // same as above. We only want this to happen at mount phase
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    // on target spawn, change its type to the opposite one. CSS transition
    // will gradually modify target's color in a time === to `accuracyTimeout`
    setSt((prevSt) => ({
      ...prevSt,
      type: prevSt.type === "primary" ? "secondary" : "primary"
    }))
    // trigger `onSpawn` if defined
    onSpawn?.()
    // if the intention is to destroy the target once `accuracyTimeout` expires,
    // set the timeout to do so here, triggering "breakTarget" in consequence
    const lifeTimeout = setTimeout(
      () => destroyOnAccuracyTimeout && breakTarget(false, true),
      accuracyTimeout
    )
    return () => clearTimeout(lifeTimeout)
  }, [])

  return (
    <>
      {st.active && (
        <div
          className={classes.container(classNames.container)}
          style={{ top: y + "%", left: x + "%" }} // dynamically assign absolute coords
        >
          <div
            ref={targetRef}
            // on target click, trigger "breakTarget"
            onClick={() => !isDestroyed && breakTarget()}
            className={
              classes.target(st.type, isDestroyed, classNames?.target) +
              cnp.get(tgtDestroyedCN) // "useValueToggle" dynamically added class
            }
            // transition delay to modify `type` coloring as `accuracyTimeout` progresses
            style={{ transition: `all ${accuracyTimeout}ms ease-out` }}
            {...otherProps}
          />
          <span
            className={
              classes.content(st.type, isDestroyed, classNames?.content) +
              cnp.get(showPtsCN) // "useValueToggle" dynamically added class
            }
            style={{ transition: `all ${accuracyTimeout}ms ease-out` }}
            {...contentProps}
          >
            {isDestroyed && getTextToShowOnHit(showOnBreak, st.res)}
          </span>
        </div>
      )}
    </>
  )
}

BTTarget.defaultProps = defaultProps
BTTarget.propTypes = propTypes

export default memo(BTTarget)
