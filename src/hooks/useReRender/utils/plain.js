const plainCode = `/******************************************************************************
 * **WARNING!** This code is written in ES2020! 
 * You will need a babel transpiler that fits it.
 * Or you can use Create-React-App ^3.3.0, since it is already implemented there
 ******************************************************************************/

import { useCallback, useState } from "react"

/**
 * Returns a function that upon calling it, the component will re-render.
 *
 * @author Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>
 */
export default function useReRender() {
  const setRenderCount = useState(0)[1]

  /* eslint-disable react-hooks/exhaustive-deps */
  const reRender = useCallback(() => setRenderCount((cnt) => ++cnt), [])

  return reRender
}`

export default plainCode
