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
    checkpointInterval,
    onCheckpoint,
    abortAtMs,
    releaseAtMs,
    doNotReRenderOnAction
  } = configs

  const [isActive, setIsActive] = useState(null)
  const refs = useRef({ timeout: 0, initTime: 0, resolve: null, reject: null })

  const reRenderOnAction = checkpointInterval || !doNotReRenderOnAction

  const trigger = useCallback(
    async (duration, onStart) => {
      await abort()
      refs.current.initTime = new Date().getTime()
      typeof onStart === "function" && onStart()
      return new Promise((resolve, reject) => {
        reRenderOnAction && setIsActive(true)
        refs.current.resolve = resolve
        refs.current.reject = reject
        refs.current.timeout = setTimeout(release, duration)
      })
    },
    [checkpointInterval]
  )

  const release = useCallback(async (_, elapsedMs) => {
    if (refs.current.resolve) {
      reRenderOnAction && setIsActive(false)
      await _terminate("resolve", refs.current, elapsedMs ?? getElapsedMs())
    }
  }, [])

  const abort = useCallback(async (_, elapsedMs) => {
    if (refs.current.reject) {
      reRenderOnAction && setIsActive(false)
      await _terminate("reject", refs.current, elapsedMs ?? getElapsedMs())
    }
  }, [])

  const getElapsedMs = useCallback(
    // () => new Date().getTime() - refs.current.initTime
    () => {
      const delta = new Date().getTime() - refs.current.initTime
      if (!checkpointInterval) return delta
      return Math.floor(delta / checkpointInterval) * checkpointInterval
    },
    []
  )

  useEffect(() => {
    let interval = 0
    _crashOnInvalidCheckpointInterval(checkpointInterval)
    if (isActive) {
      const isValidAbortAtMs = _validateType(abortAtMs, "number")
      const isValidReleaseAtMs = _validateType(releaseAtMs, "number")
      interval = setInterval(async () => {
        const elapsedMs = getElapsedMs()
        const isAbort = isValidAbortAtMs && abortAtMs <= elapsedMs
        const isRelease = isValidReleaseAtMs && releaseAtMs <= elapsedMs
        if (isAbort) await abort(null, elapsedMs)
        else if (isRelease) await release(null, elapsedMs)
        else if (typeof onCheckpoint === "function") onCheckpoint(elapsedMs)
      }, checkpointInterval)
    }
    return () => clearInterval(interval)
  }, [isActive])

  return { isActive, trigger, release, abort, getElapsedMs }
}

async function _terminate(terminator, refsCurrent, elapsedMs) {
  clearTimeout(refsCurrent.timeout)
  refsCurrent.initTime = 0
  await refsCurrent[terminator](elapsedMs)
  refsCurrent.resolve = null
  refsCurrent.reject = null
}

function _validateType(variable, type) {
  return variable && typeof variable === type
}

function _crashOnInvalidCheckpointInterval(checkpointInterval) {
  if (
    checkpointInterval !== undefined &&
    !(Number.isInteger(checkpointInterval) && checkpointInterval > 0)
  ) {
    throw new TypeError(
      "Invalid value supplied to `checkpointInterval` at `configs` parameter in `useLatency` hook.\n\nIt must be a number higher than 0.\n"
    )
  }
}
