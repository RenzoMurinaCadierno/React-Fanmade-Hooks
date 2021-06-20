import { useState, useCallback, useRef } from "react"

/**
 * Creates an integer counter state and returns it, along its handlers to
 * increase, decrease, reset and set its count step.
 *
 * @param {number?} initialNum The counter's starting integer. Defaults to 0.
 *
 * @author Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>
 */
export default function useLatency() {
  const timeRefs = useRef({ timeout: 0, initTime: 0 })
  const terminatorsRefs = useRef({ resolve: null, reject: null })

  const trigger = useCallback((ms, configs = {}) => {
    if (timeRefs.current.resolve) return
    const { onTrigger, onRelease, onAbort } = configs
    clearTimeout(timeRefs.current.timeout)
    timeRefs.current.initTime = new Date().getTime()
    onTrigger?.()
    return new Promise((resolve, reject) => {
      terminatorsRefs.current.resolve = () => {
        resolve()
        onRelease?.()
      }
      terminatorsRefs.current.reject = () => {
        reject()
        onAbort?.()
      }
      timeRefs.current.timeout = setTimeout(release, ms)
    })
  }, [])

  const release = useCallback(
    () => _terminate("resolve", terminatorsRefs.current, timeRefs.current),
    []
  )

  const abort = useCallback(
    () => _terminate("reject", terminatorsRefs.current, timeRefs.current),
    []
  )

  const getElapsedMs = useCallback(
    () => new Date().getTime() - timeRefs.current.initTime,
    []
  )

  return { trigger, release, abort, getElapsedMs }
}

async function _terminate(terminator, terminatorsRefsCurrent, timeRefsCurrent) {
  clearTimeout(timeRefsCurrent.timeout)
  timeRefsCurrent.initTime = 0
  if (terminatorsRefsCurrent[terminator]) {
    await terminatorsRefsCurrent[terminator]()
    terminatorsRefsCurrent.resolve = null
    terminatorsRefsCurrent.reject = null
    return Promise.resolve(terminator === "resolve" ? "released" : "aborted")
  }
}
