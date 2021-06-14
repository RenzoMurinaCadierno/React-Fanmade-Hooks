const plainCode = `/******************************************************************************
 * **WARNING!** This code is written in ES2020! 
 * You will need a babel transpiler that fits it.
 * Or you can use Create-React-App ^3.3.0, since it is already implemented there
 ******************************************************************************/

import { useRef, useEffect } from "react"

/**
 * TODO - Work in progress (needs testing and example component)
 * 
 * @author Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>
 */
export default function useMountFlag() {
  const isMounted = useRef(false)

  useEffect(() => (isMounted.current = true), [])

  return isMounted.current
}`

export default plainCode
