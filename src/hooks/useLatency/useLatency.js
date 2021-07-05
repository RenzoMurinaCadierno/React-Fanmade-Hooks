import { useCallback, useEffect, useRef, useState } from "react"

/**
 * Simulates latency by a promise which resolves at a specified amount of
 * milliseconds.
 *
 * Returns the latency's active state and imperative handlers to `fire` it, as
 * well as to prematurely `release` (resolve) it or `abort` (reject) it.
 *
 * Checkpoint intervals can be set, in which case the declarative logic to
 * release or abort the process at a set amount of milliseconds will be invoked
 * on each checkpoint across the whole latency timeout, and a callback on each
 * loop will also trigger, if defined.
 *
 * @param {object?} configs A configuration object, shaped:
 *
 * `checkpointInterval?` (number): An integer higher than 0 used to divide
 *   latency's `duration` (set when invoking "fire" handler) into intervals.
 *   Each of those intervals will perform declarative calls in a "useEffect"
 *   instance, using `configs.abortAtMs`, `configs.releaseAtMs` and/or
 *   `configs.onCheckpoint`.
 *
 * `onCheckpoint?` (function): Callback triggered on each interval iteration
 *   determined by `configs.checkpointInterval`.
 *
 * `abortAtMs?` (number): If `configs.checkpointInterval` is defined, latency
 *   will automatically abort at `abortAtMs` milliseconds. Must be an integer
 *   higher than 0.
 *
 * `releaseAtMs?` (number): If `configs.checkpointInterval` is defined, latency
 *   will automatically release at `releaseAtMs` milliseconds. Must be an
 *   integer higher than 0.
 *
 * `doNotReRenderOnAction?` (boolean): If `true`, this hook will not re-render
 *   the component it is called from on any action ("fire", "checkpoint",
 *   "abort" and "release").
 *
 *   > **_Warning!_** By doing so, latency's "isActive" state will not update,
 *   callbacks will not be re-constructed, and anything defined in `configs`
 *   will be ignored.
 *
 *   > **_Note:_** Only use this parameter when you need a non-functional
 *   latency visual indicator or latency that runs in the background that does
 *   not interact with states.
 *
 * @returns {object} An object shaped:
 *
 * `isActive` (boolean): Latency's active state. `true` means it was fired,
 *   while `false` indicates it is inactive (not fired, released or aborted).
 *
 * `fire` (function): Latency's trigger, which when invoked, initiates the
 *   timer. It returns the latency Promise, and its arguments are:
 * * `duration` (number): Latency's timeout in ms, as an integer >= 0.
 * * `onStart?` (function): Callback triggered when latency fires.
 *
 * `release` (function): Resolves the timer promise upon invocation, falling
 *   in `fire` resolve clause. Gets elapsed milliseconds as argument.
 *
 * `abort` (function): Aborts the timer promise upon invocation, falling in
 *   `fire` reject clause. Gets elapsed milliseconds as argument.
 *
 * `getElapsedMs` (function): Returns the elapsed milliseconds from latecy being
 *   fired up until this function's invocation.
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

  /**
   * Latency's active state, which also serves as useEffect's logic gate.
   */
  const [isActive, setIsActive] = useState(null)

  /**
   * References to:
   * * "timeout": setTimeout pointer set when firing latency.
   * * "initTime": initial time when firing latency, in milliseconds.
   * * "duration": interval/timeout full length, in milliseconds.
   * * "resolve": Promise's "resolve" pointer, used to release latency.
   * * "reject": Promise's "reject" pointer, used to abort latency.
   *
   * Kept as refs due to many methods requiring access to them, while not
   * provoking a re-render at the same time.
   */
  const refs = useRef({
    timeout: 0,
    initTime: 0,
    duration: 0,
    resolve: null,
    reject: null
  })

  /**
   * "reRenderOnAction" becomes true if `configs.checkpointInterval` is not
   * defined or `configs.doNotRerenderOnAction` is truthy.
   *
   * If this variable is true, this hook will not re-render the component
   * it is called from on any action ("fire", "checkpoint", "abort" and
   * "release").
   *
   * **_Warning!_** By doing so, "isActive" state will not update, callbacks in
   * this file will not be re-constructed and anything defined in `configs`
   * will be ignored.
   */
  const reRenderOnAction = !!(checkpointInterval || !doNotReRenderOnAction)

  /**
   * Fires a promise-based timeout which replicates latency, and automatically
   * resolves once the amount of milliseconds specified in `duration` expires.
   *
   * It can be prematurely 'released' (resolve) or 'aborted' (reject) by calling
   * for the related methods in this hook, imperatively (`release` and `abort`).
   *
   * If `checkpointInterval` is defined as an integer higher than 0, instead of
   * a timeout, latency will be controlled by an interval in useEffect, which
   * enables declarative 'abort' and 'release'. They can be set in
   * `configs.abortAtMs` and `configs.releaseAtMs`, also as integers higher than
   * 0. If defined, latency will abort or release automatically once the
   * stated milliseconds counting from latency firing pass by.
   *
   * @params
   * `duration` (number): How long latancy will last, in milliseconds.
   *
   * `onStart?` (function): Callback triggered when latency fires.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  const fire = useCallback(
    async (duration, onStart) => {
      // if any latency instance is running, abort it before continuing
      await abort()
      // set global initial time and latency duration
      refs.current.initTime = new Date().getTime()
      refs.current.duration = duration
      // call for onStart if defined
      typeof onStart === "function" && onStart(duration)
      // return a reference to the latency promise
      return new Promise((resolve, reject) => {
        // `configs.reRenderOnAction` fires useEffect interval control below
        reRenderOnAction && setIsActive(true)
        // make resolve and reject available outside, they are needed by
        // external methods
        refs.current.resolve = resolve
        refs.current.reject = reject
        // `configs.checkpointInterval` will need this component to re-render
        // on each iteration, so if true, ignore the timeout-handled promise.
        // It will be controlled by an interval in useEffect below.
        if (!checkpointInterval) {
          // no `configs.checkpointInterval` creates a timeout which
          // automatically releases after `duration` ms. useEffect below is
          // ignored in this case
          refs.current.timeout = setTimeout(
            () => release(null, duration),
            duration
          )
        }
      })
    },
    [checkpointInterval]
  )

  /**
   * Releases active latency, which falls to Promise's resolve clause.
   *
   * It passes elapsed milliseconds from start until release as argument.
   *
   * @params
   * `_` (object?): The event object, if any. It is defined when `release` is
   *   imperatively triggered from any event-emitting element. It is ignored.
   *
   * `elapsedMs` (number?): The elapsed milliseconds from latency start to
   *   `release` call. If undefined, it is set to the return of "getElapsedMs".
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  const release = useCallback(async (_, elapsedMs) => {
    // proceed only if an instance of latency is active (outer resolve ref is
    // defined)
    if (refs.current.resolve) {
      // truthy "reRenderOnAction" means useEffect below handled the promise
      // interval. Set "isActive" to false to disable its logic gate
      reRenderOnAction && setIsActive(false)
      // call "_terminate" to perform cleanup and to fall to "resolve" clause
      await _terminate("resolve", refs.current, elapsedMs ?? getElapsedMs())
    }
  }, [])

  /**
   * Aborts active latency, which falls to Promise's reject clause.
   *
   * It passes elapsed milliseconds from start until abort as argument.
   *
   * @params
   * `_` (object?): The event object, if any. It is defined when `abort` is
   *   imperatively triggered from any event-emitting element. It is ignored.
   *
   * `elapsedMs` (number?): The elapsed milliseconds from latency start to
   *   `abort` call. If undefined, it is set to the return of "getElapsedMs".
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  const abort = useCallback(async (_, elapsedMs) => {
    // proceed only if an instance of latency is active (outer abort ref is
    // defined)
    if (refs.current.reject) {
      // truthy "reRenderOnAction" means useEffect below handled the promise
      // interval. Set "isActive" to false to disable its logic gate
      reRenderOnAction && setIsActive(false)
      // call "_terminate" to perform cleanup and to fall to "reject" clause
      await _terminate("reject", refs.current, elapsedMs ?? getElapsedMs())
    }
  }, [])

  /**
   * Calculates and returns difference between the time latency was fired and
   * the time this method was called at, as a positive integer. All measured in
   * milliseconds.
   *
   * If `configs.checkpointInterval` is defined, the time difference will be
   * rounded down to the nearest multiple of `configs.checkpointInterval` for
   * each checkpoint.
   */
  const getElapsedMs = useCallback(() => {
    // calculate the difference between time now and time when "fire" triggered
    const delta = new Date().getTime() - refs.current.initTime
    // if this is a timeout-handled promise, this function was called at the
    // end. So, return the difference as is
    if (!checkpointInterval) return delta
    // otherwise, setInterval from useEffect triggered it. Return the difference
    // rounded down to the closest multiple of `configs.checkpointInterval`
    return Math.floor(delta / checkpointInterval) * checkpointInterval
  }, [checkpointInterval])

  /**
   * If `configs.checkpointInterval` is defined, this useEffect controls latency
   * with an interval which will fire each `configs.checkpointInterval` ms.
   *
   * On each iteration, `configs.onCheckpoint` callback is triggered if defined,
   * passing currently elapsed milliseconds as argument.
   *
   * On last iteration, "release" will be called, ending the cycle.
   *
   * If defined, `configs.releaseAtMs` and `configs.abortAtMs` will end the
   * interval prematurely, calling for "release" and "abort" respectively.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let interval = 0
    // process logic if latency was triggered
    if (isActive) {
      // a `configs.checkpointInterval` >= 0 is required. Crash if invalid.
      _crashOnInvalidCheckpointInterval(checkpointInterval)
      // perform type checks on defined `configs.abortAtMs` and
      // `configs.releaseAtMs`
      const isValidAbortAtMs = _validateType(abortAtMs, "number")
      const isValidReleaseAtMs = _validateType(releaseAtMs, "number")
      // define the interval which controls each iteration (checkpoint)
      interval = setInterval(async () => {
        // get currently elapsed milliseconds from start up until this time
        const elapsedMs = getElapsedMs()
        // if "elapsedMs" >= latency duration, flag end of interval due to
        // reaching its last iteration
        const isEndTime = elapsedMs >= refs.current.duration
        // if `configs.abortAtMs` is valid, flag end of interval by aborting
        const isAbort = isValidAbortAtMs && abortAtMs <= elapsedMs
        // if `configs.releaseAtMs` is valid, flag end of interval by releasing
        const isRelease =
          (isValidReleaseAtMs && releaseAtMs <= elapsedMs) || isEndTime
        // on aborting or releasing, clear interval and call for the proper
        // terminator passing "elapsedMs" as argument
        if (isAbort || isRelease) {
          clearInterval(interval)
          if (isAbort) await abort(null, elapsedMs)
          else
            await release(null, isEndTime ? refs.current.duration : elapsedMs)
          // otherwise, process did not end yet, meaning we are in an interval
          // iteration. Trigger `configs.onCheckpoint` if defined, passing
          // "elapsedMs" as argument
        } else if (typeof onCheckpoint === "function") {
          onCheckpoint(elapsedMs)
        }
      }, checkpointInterval)
    }
    return () => clearInterval(interval)
  }, [isActive])

  return { isActive, fire, release, abort, getElapsedMs }
}

/**
 * Performs cleanup on outer variables, resetting them to their initial states.
 *
 * It also calls for the current latency Promise's "resolve" or "reject"
 * terminators, passing currently elapsed milliseconds as argument.
 *
 * This method is called by "release" and "abort" functions.
 *
 * @param {string} terminator Either "resolve" or "reject".
 *
 * @param {object} refsCurrent `refs.current` reference object.
 *
 * @param {number} elapsedMs Currently elapsed time from Promise firing until
 *   it was fulfilled, in milliseconds.
 */
async function _terminate(terminator, refsCurrent, elapsedMs) {
  clearTimeout(refsCurrent.timeout)
  await refsCurrent[terminator](elapsedMs)
  refsCurrent.resolve = null
  refsCurrent.reject = null
}

/**
 * Validates `variable` being defined and type `type`.
 *
 * Returns true if so, false otherwise.
 *
 * @param {any} variable The variable to check.
 *
 * @param {string} type The type to perform type checking.
 */
function _validateType(variable, type) {
  return variable && typeof variable === type
}

/**
 * Throws a TypeError with the intention of crashing early if
 * `checkpointInterval` is not an integer higher than 0.
 *
 * @param {number} checkpointInterval `configs.checkpointInterval`
 */
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
