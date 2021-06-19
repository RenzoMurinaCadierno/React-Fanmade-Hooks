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
}
