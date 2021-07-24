import { Text } from "hub"
import { useEffect, useState } from "react"

/**
 * Renders '*Text.WithRandomizedLayout*' containing flavor text, with random
 * layout props (for animation and orientation, as stated in '*Layout*').
 *
 * @param {object} props
 *
 * `delayBeforeFirstRender?` (number): Timeout before flavor text becomes active
 *   (renders).
 *
 * `...otherProps?` (object): Props to spread in '*Text.WithRandomizedLayout*'.
 */
export default function FlavorText({ delayBeforeFirstRender, ...otherProps }) {
  // controls JSX rendering in DOM.
  const [show, setShow] = useState(false)

  /**
   * Renders JSX after `delayBeforeFirstRender` ms.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const showTimeoutId = setTimeout(
      () => setShow(true),
      delayBeforeFirstRender
    )

    return () => clearTimeout(showTimeoutId)
  }, [])

  // render '*Text.WithRandomizedLayout*' when "show" is true
  return show && <Text.WithRandomizedLayout {...otherProps} />
}
