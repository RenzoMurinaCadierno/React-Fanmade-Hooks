// import { useCallback, useEffect, useRef, useState } from "react"

// /**
//  * Creates an integer counter state and returns it, along its handlers to
//  * increase, decrease, reset and set its count step.
//  *
//  * @param {number?} initialNum The counter's starting integer. Defaults to 0.
//  *
//  * @author Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>
//  */
// export default function useLatency(configs = {}) {
//   const {
//     checkpointInterval,
//     onCheckpoint,
//     abortAtMs,
//     releaseAtMs,
//     doNotReRenderOnAction
//   } = configs

//   const [isActive, setIsActive] = useState(null)
//   const refs = useRef({ timeout: 0, initTime: 0, resolve: null, reject: null })

//   // useCallbacks will not reconstruct when this variable changes
//   const reRenderOnAction = checkpointInterval || !doNotReRenderOnAction

//   /* eslint-disable react-hooks/exhaustive-deps */
//   const fire = useCallback(
//     async (duration, onStart) => {
//       await abort()
//       refs.current.initTime = new Date().getTime()
//       typeof onStart === "function" && onStart()
//       return new Promise((resolve, reject) => {
//         reRenderOnAction && setIsActive(true)
//         refs.current.resolve = resolve
//         refs.current.reject = reject
//         refs.current.timeout = setTimeout(release, duration)
//       })
//     },
//     [checkpointInterval]
//   )

//   /* eslint-disable react-hooks/exhaustive-deps */
//   const release = useCallback(async (_, elapsedMs) => {
//     if (refs.current.resolve) {
//       reRenderOnAction && setIsActive(false)
//       await _terminate("resolve", refs.current, elapsedMs ?? getElapsedMs())
//     }
//   }, [])

//   /* eslint-disable react-hooks/exhaustive-deps */
//   const abort = useCallback(async (_, elapsedMs) => {
//     if (refs.current.reject) {
//       reRenderOnAction && setIsActive(false)
//       await _terminate("reject", refs.current, elapsedMs ?? getElapsedMs())
//     }
//   }, [])

//   const getElapsedMs = useCallback(() => {
//     const delta = new Date().getTime() - refs.current.initTime
//     if (!checkpointInterval) return delta
//     return Math.floor(delta / checkpointInterval) * checkpointInterval
//   }, [checkpointInterval])

//   /* eslint-disable react-hooks/exhaustive-deps */
//   useEffect(() => {
//     let interval = 0
//     _crashOnInvalidCheckpointInterval(checkpointInterval)
//     if (isActive) {
//       const isValidAbortAtMs = _validateType(abortAtMs, "number")
//       const isValidReleaseAtMs = _validateType(releaseAtMs, "number")
//       interval = setInterval(async () => {
//         const elapsedMs = getElapsedMs()
//         const isAbort = isValidAbortAtMs && abortAtMs <= elapsedMs
//         const isRelease = isValidReleaseAtMs && releaseAtMs <= elapsedMs
//         if (isAbort) await abort(null, elapsedMs)
//         else if (isRelease) await release(null, elapsedMs)
//         else if (typeof onCheckpoint === "function") onCheckpoint(elapsedMs)
//       }, checkpointInterval)
//     }
//     return () => clearInterval(interval)
//   }, [isActive])

//   return { isActive, fire, release, abort, getElapsedMs }
// }

// async function _terminate(terminator, refsCurrent, elapsedMs) {
//   clearTimeout(refsCurrent.timeout)
//   refsCurrent.initTime = 0
//   await refsCurrent[terminator](elapsedMs)
//   refsCurrent.resolve = null
//   refsCurrent.reject = null
// }

// function _validateType(variable, type) {
//   return variable && typeof variable === type
// }

// function _crashOnInvalidCheckpointInterval(checkpointInterval) {
//   if (
//     checkpointInterval !== undefined &&
//     !(Number.isInteger(checkpointInterval) && checkpointInterval > 0)
//   ) {
//     throw new TypeError(
//       "Invalid value supplied to `checkpointInterval` at `configs` parameter in `useLatency` hook.\n\nIt must be a number higher than 0.\n"
//     )
//   }
// }

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
  const refs = useRef({
    timeout: 0,
    initTime: 0,
    endTime: 0,
    resolve: null,
    reject: null
  })

  // useCallbacks will not reconstruct when this variable changes
  // doNotRerenderOnAction will not enter useEffect below. This, abortAtMs
  // and releaseAtMs will not work
  const reRenderOnAction = !!(checkpointInterval || !doNotReRenderOnAction)

  /* eslint-disable react-hooks/exhaustive-deps */
  const fire = useCallback(
    async (duration, onStart) => {
      await abort()
      refs.current.initTime = new Date().getTime()
      refs.current.endTime = duration
      typeof onStart === "function" && onStart()
      return new Promise((resolve, reject) => {
        reRenderOnAction && setIsActive(true)
        refs.current.resolve = resolve
        refs.current.reject = reject
        // checkpointInterval will control the hook by a setInterval
        if (!checkpointInterval) {
          refs.current.timeout = setTimeout(
            () => release(null, duration),
            duration
          )
        }
      })
    },
    [checkpointInterval]
  )

  /* eslint-disable react-hooks/exhaustive-deps */
  const release = useCallback(async (_, elapsedMs) => {
    // _ is incoming event obj. elapsedMs is null on outer button click
    if (refs.current.resolve) {
      reRenderOnAction && setIsActive(false)
      await _terminate("resolve", refs.current, elapsedMs ?? getElapsedMs())
    }
  }, [])

  /* eslint-disable react-hooks/exhaustive-deps */
  const abort = useCallback(async (_, elapsedMs) => {
    if (refs.current.reject) {
      reRenderOnAction && setIsActive(false)
      await _terminate("reject", refs.current, elapsedMs ?? getElapsedMs())
    }
  }, [])

  const getElapsedMs = useCallback(() => {
    const delta = new Date().getTime() - refs.current.initTime
    if (!checkpointInterval) return delta
    return Math.floor(delta / checkpointInterval) * checkpointInterval
  }, [checkpointInterval])

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let interval = 0
    if (isActive) {
      _crashOnInvalidCheckpointInterval(checkpointInterval)
      const isValidAbortAtMs = _validateType(abortAtMs, "number")
      const isValidReleaseAtMs = _validateType(releaseAtMs, "number")
      interval = setInterval(async () => {
        const elapsedMs = getElapsedMs()
        const isEndTime = elapsedMs >= refs.current.endTime
        const isAbort = isValidAbortAtMs && abortAtMs <= elapsedMs
        const isRelease =
          (isValidReleaseAtMs && releaseAtMs <= elapsedMs) || isEndTime
        if (isAbort || isRelease) {
          clearInterval(interval) // finished counter, clear interval
          if (isAbort) await abort(null, elapsedMs)
          else await release(null, isEndTime ? refs.current.endTime : elapsedMs)
        } else if (typeof onCheckpoint === "function") {
          // we are not finised, trigger checkpoint
          onCheckpoint(elapsedMs)
        }
      }, checkpointInterval)
    }
    return () => clearInterval(interval)
  }, [isActive])

  return { isActive, fire, release, abort, getElapsedMs }
}

async function _terminate(terminator, refsCurrent, elapsedMs) {
  clearTimeout(refsCurrent.timeout)
  // refsCurrent.initTime = 0
  // refsCurrent.endTime = 0
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
