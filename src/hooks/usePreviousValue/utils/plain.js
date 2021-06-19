const plainCode = `/******************************************************************************
 * **WARNING!** This code is written in ES2020! 
 * You will need a babel transpiler that fits it.
 * Or you can use Create-React-App ^3.3.0, since it is already implemented there
 ******************************************************************************/

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
}`

export default plainCode
