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
  const { checkpointInterval, onCheckpoint, abortAtMs, releaseAtMs } = configs

  const [isCheckpointActive, setIsCheckpointActive] = useState(false)
  const refs = useRef({ timeout: 0, initTime: 0, resolve: null, reject: null })
test and create demo. see why so many re-renders on checkpointInterval
  const trigger = useCallback(
    async (duration, onStart) => {
      await abort()
      refs.current.initTime = new Date().getTime()
      typeof onStart === "function" && onStart()
      return new Promise((resolve, reject) => {
        checkpointInterval && setIsCheckpointActive(true)
        refs.current.resolve = resolve
        refs.current.reject = reject
        refs.current.timeout = setTimeout(release, duration)
      })
    },
    [checkpointInterval]
  )

  const release = useCallback(async () => {
    if (refs.current.resolve) {
      checkpointInterval && setIsCheckpointActive(false)
      await _terminate("resolve", refs.current)
    }
  }, [])

  const abort = useCallback(async () => {
    if (refs.current.reject) {
      checkpointInterval && setIsCheckpointActive(false)
      await _terminate("reject", refs.current)
    }
  }, [])

  const getElapsedMs = useCallback(
    () => new Date().getTime() - refs.current.initTime,
    []
  )

  useEffect(() => {
    let interval = 0
    _crashOnInvalidCheckpointInterval(checkpointInterval)
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
      }, checkpointInterval)
    }
    return () => clearInterval(interval)
  }, [isCheckpointActive])

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
