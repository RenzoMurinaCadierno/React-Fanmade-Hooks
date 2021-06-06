import { useCallback, useState } from "react"

/**
 * Returns a function that upon calling it, the component will re-render.
 */
export default function useReRender() {
  const setRenderCount = useState(0)[1]

  /* eslint-disable react-hooks/exhaustive-deps */
  const reRender = useCallback(() => setRenderCount((cnt) => ++cnt), [])

  return reRender
}
