import { Text } from "hub"
import { useEffect, useState } from "react"

export default function FlavorText({ delayBeforeFirstRender, ...otherProps }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const showTimeoutId = setTimeout(
      () => setShow(true),
      delayBeforeFirstRender
    )
    return () => clearTimeout(showTimeoutId)
  }, [])

  return show && <Text.WithRandomizedLayout {...otherProps} />
}
