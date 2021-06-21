import { useCallback, useEffect, useRef, useState } from "react"

/**
 * Creates an integer counter state and returns it, along its handlers to
 * increase, decrease, reset and set its count step.
 *
 * @param {number?} initialNum The counter's starting integer. Defaults to 0.
 *
 * @author Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>
 */
export default function useLatency(configs = {}) {
  const {
    triggerOn,
    abortOn,
    releaseOn,
    duration,
    onStart,
    onAbort,
    onRelease,
    checkpointAtMs,
    onCheckpoint,
    abortAtMs,
    releaseAtMs
  } = configs

  const [isCheckpointActive, setIsCheckpointActive] = useState(false)
  const refs = useRef({ timeout: 0, initTime: 0, resolve: null, reject: null })

  const trigger = useCallback(
    async (duration, onStart) => {
      await abort()
      refs.current.initTime = new Date().getTime()
      typeof onStart === "function" && onStart()
      return new Promise((resolve, reject) => {
        checkpointAtMs && setIsCheckpointActive(true)
        refs.current.resolve = resolve
        refs.current.reject = reject
        refs.current.timeout = setTimeout(release, duration)
      })
    },
    [checkpointAtMs]
  )

  const release = useCallback(async () => {
    if (refs.current.resolve) {
      checkpointAtMs && setIsCheckpointActive(false)
      await _terminate("resolve", refs.current)
    }
  }, [])

  const abort = useCallback(async () => {
    if (refs.current.reject) {
      checkpointAtMs && setIsCheckpointActive(false)
      await _terminate("reject", refs.current)
    }
  }, [])

  const getElapsedMs = useCallback(
    () => new Date().getTime() - refs.current.initTime,
    []
  )

  useEffect(() => {
    let interval = 0
    _crashOnInvalidCheckpointAtMs(checkpointAtMs)
    if (isCheckpointActive && refs.current.resolve) {
      const isValidAbortAtMs = _validateType(abortAtMs, "number")
      const isValidReleaseAtMs = _validateType(releaseAtMs, "number")
      const isValidOnCheckpoint = _validateType(onCheckpoint, "function")
      interval = setInterval(async () => {
        const elapsedMs = getElapsedMs()
        const isAbort = isValidAbortAtMs && abortAtMs <= elapsedMs
        const isRelease = isValidReleaseAtMs && releaseAtMs <= elapsedMs
        if (isAbort) await abort()
        else if (isRelease) await release()
        else if (isValidOnCheckpoint) onCheckpoint(elapsedMs)
      }, checkpointAtMs)
    }
    return () => clearInterval(interval)
  }, [isCheckpointActive])

  useEffect(
    () =>
      triggerOn &&
      trigger(duration, onStart)
        .then((elapsedMs) => onRelease?.(elapsedMs))
        .catch((elapsedMs) => onAbort?.(elapsedMs)),
    [triggerOn]
  )

  useEffect(() => refs.timeout && abortOn && abort(), [abortOn])

  useEffect(() => refs.timeout && releaseOn && release(), [releaseOn])

  return { trigger, release, abort, getElapsedMs }
}

async function _terminate(terminator, refsCurrent) {
  const elapsedMs = new Date().getTime() - refsCurrent.initTime
  clearTimeout(refsCurrent.timeout)
  refsCurrent.initTime = 0
  await refsCurrent[terminator](elapsedMs)
  refsCurrent.resolve = null
  refsCurrent.reject = null
}

function _validateType(variable, type) {
  return variable && typeof variable === type
}

function _crashOnInvalidCheckpointAtMs(checkpointInMs) {
  if (
    checkpointInMs !== undefined &&
    !(Number.isInteger(checkpointInMs) && checkpointInMs > 0)
  ) {
    throw new TypeError(
      "Invalid value supplied to `checkpointInMs` at `configs` parameter in `useLatency` hook.\n\nIt must be a number higher than 0.\n"
    )
  }
}

// import { useCallback, useRef } from "react"

// /**
//  * Creates an integer counter state and returns it, along its handlers to
//  * increase, decrease, reset and set its count step.
//  *
//  * @param {number?} initialNum The counter's starting integer. Defaults to 0.
//  *
//  * @author Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>
//  */
// export default function useLatency() {
//   const refs = useRef({ timeout: 0, initTime: 0, resolve: null, reject: null })

//   const trigger = useCallback((ms, onStart) => {
//     !refs.current.resolve && typeof onStart === "function" && onStart()
//     abort()
//     refs.current.initTime = new Date().getTime()
//     return new Promise((resolve, reject) => {
//       refs.current.resolve = resolve
//       refs.current.reject = reject
//       refs.current.timeout = setTimeout(release, ms)
//     })
//   }, [])

//   const release = useCallback(() => _terminate("resolve", refs.current), [])

//   const abort = useCallback(() => _terminate("reject", refs.current), [])

//   const getElapsedMs = useCallback(
//     () => new Date().getTime() - refs.current.initTime,
//     []
//   )

//   return { trigger, release, abort, getElapsedMs }
// }

// function _terminate(terminator, refsCurrent) {
//   const elapsedMs = new Date().getTime() - refsCurrent.initTime
//   clearTimeout(refsCurrent.timeout)
//   refsCurrent.initTime = 0
//   if (refsCurrent[terminator]) {
//     refsCurrent[terminator](elapsedMs)
//     refsCurrent.resolve = null
//     refsCurrent.reject = null
//   }
// }
