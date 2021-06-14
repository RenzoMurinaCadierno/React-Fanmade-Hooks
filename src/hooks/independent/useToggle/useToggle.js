import { useState, useCallback } from "react"

/**
 * Returns a boolean state and its handler to toggle it.
 *
 * @param {boolean?} initialState the initial state of the boolean.
 *
 * @returns {Array} An array shaped:
 *
 * `elem 0` (boolean): Current state.
 *
 * `elem 1` (function): Handler that toggles state when invoked.
 *
 * @author Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>
 */
export default function useToggle(initialState = false) {
  const [state, setState] = useState(initialState)

  const toggle = useCallback(
    () => setState((prevState) => !prevState),
    [setState]
  )

  return [state, toggle]
}
