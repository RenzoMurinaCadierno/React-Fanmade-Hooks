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
}
