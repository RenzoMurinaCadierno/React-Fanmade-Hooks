const plainCode = `/******************************************************************************
 * **WARNING!** This code is written in ES2020! 
 * You will need a babel transpiler that fits it.
 * Or you can use Create-React-App ^3.3.0, since it is already implemented there
 ******************************************************************************/

import { useCallback, useState, useRef, useEffect } from "react"

/**
 * Generates a timer with the stated initial time, capable of ticking up/down.
 *
 * @param {object} configs A configuration object with keys:
 *
 * \`initialTime?\` (Number|object): either:
 * * the amount of ms the starting timer will be set to, as a Number.
 * * a timer object, also for such task, in a readable format. E.g.:
 * > { days: 5, hours: 23, mins: 30, secs: 00, ms: 125 }.
 * > * Valid keys are: "years", "months", "weeks", "days", "hours", "mins",
 *       "secs", "ms".
 * > * You only specify keys you desire, no need to use all of them.
 * > * At least one key must be declared.
 * > * Check "_inMs" object for the full available format.
 * > * Defaults to { days: 0, hours: 0, mins: 0, secs: 0, ms: 0 }.
 *
 * \`tick?\` (Number|object): The tick interval in which the timer will update
 *   its state.
 * * Accepts the same value format as \`initialTime\`.
 * * Accepts negative values for both Number or any keys inside timer object
 *   passed as argument, in which case the timer will tick downwards,
 *   functioning as a countdown.
 * * Defaults to 1000 (standard 1 second tick).
 *
 * \`fillWithZeroes?\` (boolean): returned "time" object will contain numbers as
 *   keys, and if those numbers are a single digit, they will not have leading
 *   zeroes (e.g.: 7 seconds will be expressed as 7, not 07).
 * * Setting this value to true will stringify the returned value for each key
 *     and will add a leading zero for all keys in "time" object if
 *     they would result in a single digit, and two leading zeroes for "ms"
 *     given the same condition.
 * * Defaults to true.
 *
 * @returns {object} An object with keys:
 *
 * \`time\` (object): the timer object containing the current time spreaded as
 *   valid time keys.
 * * E.g.: { days: 5, hours: 23, mins: 30, secs: 00, ms: 125}.
 * * Check "_inMs" object for the full format.
 *
 * \`state\` (string): current state. Either "stopped", "running" or "paused".
 *
 * \`start\` (function): starts the timer if its state is "stopped".
 *
 * \`pause\` (function): pauses the timer if its state is "running".
 *
 * \`stop\` (function): stops the timer if its state is "running" or "paused".
 *
 * \`advance\` (function): takes an amount of ms as a parameter (type Number) or
 *   a "time" object in the format of "_inMs" and advances the timer by that
 *   amount.
 *   * It accepts negative values for the Number paramenter or any of the "time"
 *     object's keys. Such case decreases the time by that amount instead.
 *
 * \`setTick\` (function): takes an amount of ms as a parameter (type Number) or
 *   a "time" object in the format of "_inMs" and sets the timer's tick interval
 *   to that value.
 *   * It accepts negative values for the Number paramenter or any of the "time"
 *     object's keys. Such case will make "timer" tick down, as a countdown.
 *
 * \`setTimer\` (function): takes an amount of ms asa parameter (type Number) or
 *   a "time" object in the format of "_inMs" and sets the timer to that value.
 *
 * @author Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>
 */
export default function useTimer({
  initialTime = { days: 0, hs: 0, secs: 0, ms: 0 },
  tick = 1000,
  fillWithZeros = true
} = {}) {
  // global timer state
  const [timerSt, setTimerSt] = useState(() => {
    // get the equivalent in ms if a "time" object was passed as \`initialTime\`
    const startingMs = _getMs(initialTime, "initialTime")
    return {
      // save "prevTime" to re-set to the initial starting time when timer stops
      prevTime: startingMs,
      time: startingMs, // "time" tracks the actual timer status
      state: "stopped", // "stopped", "running", "paused"
      tick: _getMs(tick, "tick") // tick interval used to advance timer
    }
  })
  // since "setInterval" used to tick the timer will be modified through the
  // whole hook, it is better to keep it global. We do not want "setInterval"
  // changes to re-render the component, so we keep it in a ref
  const interval = useRef(null)

  const tickTimer = useCallback(() => {
    // advance "time" state by the amount in "tick" state
    setTimerSt((prevSt) => {
      const timeDelta = prevSt.time + prevSt.tick
      return {
        ...prevSt,
        // if the next time state is <= 0, set it to 0
        time: timeDelta > 0 ? timeDelta : 0,
        // same as above, stop the timer
        state: timeDelta > 0 ? prevSt.state : "stopped"
      }
    })
  }, [setTimerSt])

  const start = useCallback(() => {
    // do nothing if timer is "running" or "paused"
    if (timerSt.state !== "stopped") return
    setTimerSt((prevSt) => ({
      ...prevSt,
      // update "prevTime" to the current time. When timer stops afterwards, it
      // will be automatically set to this stated time
      prevTime: prevSt.time,
      state: "running"
    }))
  }, [timerSt.state, setTimerSt])

  const pause = useCallback(() => {
    if (timerSt.state === "stopped") return // do nothing if timer is stopped
    setTimerSt((prevSt) => ({
      ...prevSt,
      // if timer is currently paused, make it run again. If it is running,
      // pause it
      state: prevSt.state === "paused" ? "running" : "paused"
    }))
  }, [timerSt.state, setTimerSt])

  const stop = useCallback(() => {
    // cannot block state update here if state is "stopped". Even though it
    // will work on a manual stop while timer is "running" with time left, it
    // will not update when "tickTimer" automatically sets it to "stopped".
    setTimerSt((prevSt) => ({
      ...prevSt,
      time: prevSt.prevTime, // set time to the last time it was started at
      state: "stopped"
    }))
  }, [setTimerSt])

  const advance = useCallback(
    // time arg can be a number (amount of ms) or a "time" object as stated in
    // \`initialTime\`
    (timeAsNumOrObj) => {
      // if a "time" object was passed, get its equivalent in ms
      const msToAdvance = _getMs(timeAsNumOrObj, "advance()")
      setTimerSt((prevSt) => {
        // if "time" would be negative upon addition, do nothing
        if (prevSt.time + msToAdvance < 0) {
          console.error(
            \`<useTimer> Cannot substract time if the resulting time would be a negative value.\`
          )
          return prevSt
        }
        return {
          ...prevSt,
          time: prevSt.time + msToAdvance, // advance the timer
          // modify prevTime only if timer is not running or paused.
          prevTime:
            prevSt.state === "stopped"
              ? prevSt.prevTime + msToAdvance
              : prevSt.prevTime
        }
      })
    },
    [setTimerSt]
  )

  const setTick = useCallback(
    // "newTickAsNumOrObj" can be a number (amount of ms) or a "time" object as
    // stated in \`initialTime\`
    (newTickAsNumOrObj) =>
      _validateArgAndSetTimerSt(
        newTickAsNumOrObj,
        "setTick",
        "tick",
        setTimerSt
      ),
    [setTimerSt]
  )

  const setTime = useCallback(
    // same as "setTick" but for timer state
    (newTickAsNumOrObj) =>
      _validateArgAndSetTimerSt(
        newTickAsNumOrObj,
        "setTime",
        "time",
        setTimerSt
      ),
    [setTimerSt]
  )

  // this is the only useEffect to control the timer interval's ticks. It MUST
  // only listen to changes on "timerSt.state" to start/stop itself, and to
  // "timerSt.tick" to know the length of the interval. It should not be fired
  // by anything else, so disable eslint warnings
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    // if timer was started, create an interval that fires "tickTimer" on eack
    // tick. It is important to calculate the absolute value of "timerSt.tick",
    // as we can pass negative ones (for countdown), but "timerSt.tick" must
    // always be positive. Otherwise, "setInterval" would default to 0ms.
    if (timerSt.state === "running") {
      interval.current = setInterval(tickTimer, Math.abs(timerSt.tick))
    }
    return () => clearInterval(interval.current)
  }, [timerSt.state, timerSt.tick])

  // hook's return value
  return {
    time: _getTimerObject(timerSt.time, fillWithZeros),
    state: timerSt.state,
    currentMs: timerSt.time,
    start,
    pause,
    stop,
    advance,
    setTick,
    setTime
  }
}

/*******************************************************************************
 ************************ HELPER VARIABLES AND FUNCTIONS ***********************
 ******************************************************************************/

// each time span used throughout the hook, measured in milliseconds.
// This is the shape of the "time" objects mentioned throughout this file. Keys
// can be avoided when passing such object, but if they exist, their names must
// match, and values should always be type number
const _inMs = {
  years: 31536000000,
  months: 2592000000,
  weeks: 604800000,
  days: 86400000,
  hs: 3600000,
  mins: 60000,
  secs: 1000,
  ms: 1
}

// those time spans' names in an array
const _validTimeSpans = Object.keys(_inMs)

/**
 * Takes a numeric value (representing ms) and returns a "time" object shaped
 * like "_inMs".
 *
 * @param {number} curMs Time measured in milliseconds
 * @param {boolean} fillWithZeros True will fill each entry with one additional
 *   0 if needed.
 * > * E.g.: { hs: 1 } > { hs: 01 }
 * > * E.g.: { ms: 15 } > { ms: 015 }
 * > * E.g.: { days: 14 } > { days: 14 } // no change, days wont go above 31.
 */
function _getTimerObject(curMs, fillWithZeros) {
  let residue = curMs
  return _validTimeSpans.reduce((acc, timeSpan) => {
    // divide the remaining ms by the ms equivalent of the time span and round
    // it down. The result is the amount of units for that time span
    const timeSpanVal = Math.floor(residue / _inMs[timeSpan])
    // multiply that rounded down value by the equivalent in ms for that time
    // span, which will now be the ms to use for next time span iteration.
    // Basically, we are passing the reminder of this operation to the next
    // time span calculation
    residue -= timeSpanVal * _inMs[timeSpan]
    // add the calculated time span value the result object (fill with zeroes
    // if needed)
    return {
      ...acc,
      [timeSpan]: fillWithZeros
        ? _addZerosToFront(timeSpanVal, timeSpan === "ms" ? 3 : 2)
        : timeSpanVal
    }
  }, {})
}

/**
 * Takes a number and appends leading zeroes up to the specified number's
 * length.
 * > * E.g.: numToFill = 3, desiredLength = 6 > result = 000003
 * > * E.g.: numToFill = 518, desiredLength = 2 > result = 518
 *
 * @param {number} numToFill The number to add leading zeroes
 * @param {number} desiredLength The final length of the number
 */
function _addZerosToFront(numToFill, desiredLength) {
  for (let i = 0; i <= desiredLength; i++) {
    numToFill = "0" + numToFill
  }
  return numToFill.slice(-desiredLength)
}

/**
 * Validates time span keys in "time" objects. If they ressemmble the shape they
 * hold in "_inMs", this functions returns true. Otherwise, it shows a
 * console.error and returns false.
 *
 * @param {string} timeSpan The name of the time span ("years", "months",
 *   "mins", "ms" and so on)
 * @param {object} timeObj A "time" object in shape of "_inMs"
 * @param {Array} validKeys The names of all valid time span keys
 * @param {string} caller The name of the arg/function/param that triggered
 *   this check
 */
function _isValidTimeSpan(timeSpan, timeObj, validKeys, caller) {
  // on a time span key that does not match a valid one, warn and return false
  if (!validKeys.includes(timeSpan)) {
    console.error(
      "<useTimer> Invalid key \`" +
        timeSpan +
        "\` supplied to \`" +
        caller +
        "\`. Must be one of" +
        _validTimeSpans.map((k) => "\`" + k + "\`") +
        "."
    )
    return false
  }
  // on a value for that key that is not a number, warn and return false
  if (typeof timeObj[timeSpan] !== "number") {
    console.error(
      "<useTimer> Key \`" +
        timeSpan +
        "\` supplied to \`" +
        caller +
        "\` is type " +
        typeof timeObj[timeSpan] +
        ". Must be a number."
    )
    return false
  }
  // check passed, return true
  return true
}

/**
 * Validates the "time" object or number passed as argument and if they pass,
 * the global state is set targetting \`keyToSetVal\` as key, and the "time"
 * object or number as value.
 *
 * @param {number|object} timeAsNumOrObj Time as number (ms), or "time" object
 *   ressembling "_inMs" shape
 * @param {string} caller The name of the function that invoked this one
 * @param {string} keyToSetVal The respective key in global state to set the
 *   new value to
 * @param {function} setTimerSt Global timer state setter function
 */
function _validateArgAndSetTimerSt(
  timeAsNumOrObj,
  caller,
  keyToSetVal,
  setTimerSt
) {
  // get the equivalent in ms of the time object passed as argument
  const timeInMs = _getMs(timeAsNumOrObj, keyToSetVal)
  // if it is invalid, warn in console and do not update state
  if (!timeInMs) {
    return console.error(
      "<useTimer> Invalid argument supplied to \`" +
        caller +
        "()\`. Must be higher than 0 ms."
    )
  }
  // the time value is correct, update the stated key with it
  setTimerSt((prevSt) => ({ ...prevSt, [keyToSetVal]: timeInMs }))
}

/**
 * Takes a time value as a number (representing milliseconds) or a "time" object
 * ressembling the shape of "_inMs" as argument.
 * If the argument was a number value, it is returned as is.
 * A "time" object is validated before being converted to its number (ms)
 * equivalent to be returned.
 *
 * @param {number|object} timeAsNumOrObj Time as number (ms), or "time" object
 *   ressembling "_inMs"
 * @param {string} caller The name of the function that invoked this one
 */
function _getMs(timeAsNumOrObj, caller) {
  // if a number was passed, we assume it represents ms. Return it as is
  if (typeof timeAsNumOrObj === "number") return timeAsNumOrObj
  // given the case we passed anything that's not a plain JS object, warn in
  // console and return 0 (0ms)
  if (typeof timeAsNumOrObj !== "object" || Array.isArray(timeAsNumOrObj)) {
    console.error(
      "<useTimer> Invalid parameter \`" +
        timeAsNumOrObj +
        "\` of type " +
        typeof timeAsNumOrObj +
        " supplied to \`" +
        caller +
        "\`. Must be a number (representing ms) or an object with keys" +
        _validTimeSpans.map((k) => " \`" + k + "\`") +
        "."
    )
    return 0
  }
  // we are dealing with a potential "time" object. Perform validation on its
  // keys, and add up their equivalent in ms if they pass the test. For those
  // that fails, warn in console and add 0 to the total to return
  return Object.keys(timeAsNumOrObj).reduce(
    (acc, timeSpan) =>
      _isValidTimeSpan(timeSpan, timeAsNumOrObj, _validTimeSpans, caller)
        ? (acc += timeAsNumOrObj[timeSpan] * _inMs[timeSpan])
        : 0,
    0
  )
}`

export default plainCode
