import { useRef, useEffect } from "react"

/**
 * Listens to the value passed as parameter and returns its previous version
 * each time it changes.
 *
 * @param {any} value The value to keep track of.
 *
 * @returns {any} the previous value for the current state of the one this
 *   hook is keeping track of.
 *
 * @author Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>
 */
export default function usePreviousValue(value) {
  const prevValue = useRef()

  useEffect(() => {
    prevValue.current = value
  }, [value])

  return prevValue.current
}
