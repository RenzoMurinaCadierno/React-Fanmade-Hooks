import { useState, useCallback } from "react"

/**
 * Returns a boolean state and its handler to toggle it.
 *
 * @param {boolean?} initialState the initial state of the boolean.
 *
 * @returns {Array} [ booleanState, togglerFunction ]
 */
export default function useToggle(initialState = false) {
  const [state, setState] = useState(initialState)

  const toggle = useCallback(
    () => setState((prevState) => !prevState),
    [setState]
  )

  return [state, toggle]
}
