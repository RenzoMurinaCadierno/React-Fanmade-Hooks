import { useState, useCallback } from "react"

/**
 * Creates an integer counter state and returns it, along its handlers
 * to increase, decrease, reset and set its count step.
 *
 * @param {number?} initialNum The counter's starting integer
 *
 * @param {number?} step The amount to increase/decrease the state.
 *
 * @returns {object} An object shape:
 * * `count` (number): The current count state.
 *
 * * `step` (number): The current counter step state (the amount
 *     it will be increased or decreased when calling the handlers).
 *
 * * `inc` (function): handler to increase the counter. Accepts a number
 *     as argument, in which case the counter will be increased by that
 *     argument's value. Any other case will increase it by the current
 *     step state.
 *
 * * `dec` (function): handler to decrease the counter. Accepts a number
 *     as argument, in which case the counter will be decreased by that
 *     argument's value. Any other case will decrease it by the current
 *     step state.
 *
 * * `reset` (function): handler to reset the counter back to its
 *     initial state. Accepts a number as argument, in which case the
 *     counter will be set to it.
 *
 * * `setStep` (function): takes a number as argument and sets the
 *     current step state to it.
 */
export default function useCount(initialNum = 0, step = 1) {
  const [count, setCount] = useState(initialNum)
  const [stepSt, setStepSt] = useState(step)

  const inc = useCallback(
    (qty) => setCount((cnt) => cnt + getDeltaValue(qty, stepSt)),
    [setCount, stepSt]
  )

  const dec = useCallback(
    (qty) => setCount((cnt) => cnt - getDeltaValue(qty, stepSt)),
    [setCount, stepSt]
  )

  const reset = useCallback(
    (resVal) => setCount(getDeltaValue(resVal, initialNum) ?? 0),
    [setCount, initialNum]
  )

  const setStep = useCallback(
    (step) => typeof step === "number" && setStepSt(step),
    [setStepSt]
  )

  return { count, inc, dec, step: stepSt, reset, setStep }
}

function getDeltaValue(argValue, fallbackValue) {
  return typeof argValue === "number" ? argValue : fallbackValue
}
