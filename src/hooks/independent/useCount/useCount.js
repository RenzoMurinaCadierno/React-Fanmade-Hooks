import { useState, useCallback } from "react"

/**
 * Creates an integer counter state and returns it, along its handlers to
 * increase, decrease, reset and set its count step.
 *
 * @param {number?} initialNum The counter's starting integer
 *
 * @param {number?} step The amount to increase/decrease the state.
 *
 * @returns {object} An object shape:
 *
 * `count` (number): The current count state.
 *
 * `step` (number): The current 'step counter' state (the amount it will be
 *   increased or decreased when calling the handlers).
 *
 * `inc` (function): handler to increase the counter. Accepts a number as
 *   argument, in which case the counter will be increased by that argument's
 *   value. Any other case will increase it by the current step state.
 *
 * `dec` (function): handler to decrease the counter. Same condition as `inc`
 *   for its argument, but will decrease instead.
 *
 * `reset` (function): handler to reset the counter back to its initial state.
 *   Accepts a number as argument, in which case the counter will be set to it.
 *
 * `setStep` (function): takes a number as argument and sets the current step
 *   state to it.
 */
export default function useCount(initialNum = 0, step = 1) {
  const [count, setCount] = useState(initialNum)
  const [stepSt, setStepSt] = useState(step)

  /**
   * Increases counter by `step`. Accepts an integer as argument, in such case,
   * counter will increase by it.
   */
  const inc = useCallback(
    (qty) => setCount((cnt) => cnt + getDeltaValue(qty, stepSt)),
    [setCount, stepSt]
  )

  /**
   * Decreases counter by `step`. Accepts an integer as argument, in such case,
   * counter will decrease by it.
   */
  const dec = useCallback(
    (qty) => setCount((cnt) => cnt - getDeltaValue(qty, stepSt)),
    [setCount, stepSt]
  )

  /**
   * Resets counter back to its original state. Accepts an integer as argument,
   * in such case, counter will be set to it.
   */
  const reset = useCallback(
    (resVal) => setCount(getDeltaValue(resVal, initialNum) ?? 0),
    [setCount, initialNum]
  )

  /**
   * Sets increase/decrease step to the provided integer argument.
   */
  const setStep = useCallback(
    (step) => typeof step === "number" && setStepSt(step),
    [setStepSt]
  )

  return { count, inc, dec, step: stepSt, reset, setStep }
}

/**
 * Returns `argValue` if it is a number, `fallbackValue` otherwise.
 *
 * @param {number} argValue The number to evaluate.
 * @param {number} fallbackValue Fallback if `argValue` is not type number.
 */
function getDeltaValue(argValue, fallbackValue) {
  return typeof argValue === "number" ? argValue : fallbackValue
}
