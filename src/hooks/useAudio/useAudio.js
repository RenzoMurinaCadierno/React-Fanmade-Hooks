import React, { useRef } from "react"

/**
 * TODO - Work in progress
 */
export default function useAudio({
  src,
  type,
  otherAudioProps,
  controlsConfigs
}) {
  const audioRef = useRef()
  const audioJSX = (
    <audio
      src={src}
      type={type || "audio.mp3"}
      ref={audioRef}
      {...otherAudioProps}
    />
  )

  return [audioJSX, audioRef]
}
