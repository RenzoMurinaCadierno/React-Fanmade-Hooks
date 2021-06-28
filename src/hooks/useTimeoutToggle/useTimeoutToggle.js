import { useState, useEffect, useCallback } from "react"

export default function useTimeoutToggle(timeout = 1000, onToggle) {
  const [state, setState] = useState(false)

  const toggleTimeout = useCallback(
    (st) => setState(typeof st === "boolean" ? !!st : true),
    []
  )

  useEffect(() => _crashOnInvalidArgs(timeout, onToggle), [timeout, onToggle])

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let togglerTimeout

    if (state) togglerTimeout = setTimeout(() => setState(false), timeout)

    onToggle?.(state)

    return () => clearTimeout(togglerTimeout)
  }, [state])

  return [state, toggleTimeout]
}

function _crashOnInvalidArgs(timeout, onToggle) {
  if (!timeout || !Number.isInteger(timeout) || timeout <= 0) {
    throw new Error(
      "Invalid argument `timeout` with value `" +
        timeout +
        "` supplied to `useTimeoutToggle`.\n\nExpected an integer higher than 0."
    )
  }

  if (onToggle && typeof onToggle !== "function") {
    throw new Error(
      "Invalid argument `onToggle` with value `" +
        onToggle +
        "` supplied to `useTimeoutToggle`.\n\nExpected a function."
    )
  }
}
