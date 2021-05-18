import { useCallback, useState } from "react"

/**
 * Returns a function that upon calling it, the component will re-render.
 */
export default function useReRender() {
  const setRenderCount = useState(0)[1]

  const reRender = useCallback(() => setRenderCount((cnt) => ++cnt), [
    setRenderCount
  ])

  return reRender
}
