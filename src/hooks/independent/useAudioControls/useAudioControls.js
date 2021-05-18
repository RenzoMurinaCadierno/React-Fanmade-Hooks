import React, { useState, useCallback } from "react"

/**
 * TODO - Work in progress
 */
export default function useAudioControls(audioRef, { playbackRate }) {
  const [onOffState, setOnOffState] = useState(true)

  const toggleOnOff = useCallback(
    () => setOnOffState((onOffState) => !onOffState),
    [setOnOffState]
  )

  const play = useCallback(() => {
    onOffState && audioRef?.current?.play()
  }, [onOffState, audioRef])

  const pause = useCallback(() => onOffState && audioRef?.current?.stop(), [
    onOffState,
    audioRef
  ])

  const stop = useCallback(() => {
    if (onOffState) {
      audioRef?.current?.pause()
      audioRef.current.currentTime = 0
    }
  }, [onOffState, audioRef])

  return <div></div>
}
