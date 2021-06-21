import useLatency from "../useLatency"
import { CmpDescription, Spinner, Button } from "hub"
import plainCode from "./plain"
import { classes, descItems, metaTagsProps } from "./UseLatency.utils"
import { useEffect, useRef, useState } from "react"

export default function UseCount() {
  return (
    <>
      <CmpDescription {...{ descItems, plainCode, metaTagsProps }} />
      <CmpTest />
    </>
  )
}

function CmpTest() {
  const [isLoading, setIsLoading] = useState(false)
  const [st, setSt] = useState(0)

  const start = () => {
    setIsLoading(true)
    console.log("start!")
  }

  const show = (elapsedMs) => {
    setIsLoading(false)
    console.log("show!", elapsedMs)
  }

  const hide = (elapsedMs) => {
    setIsLoading(false)
    console.log("hide!", elapsedMs)
  }
  console.log(isLoading)
  const { trigger, release, abort, getElapsedMs } = useLatency({
    checkpointAtMs: 200,
    // onCheckpoint: (ms) => console.log(ms)
    // abortOn: [st, st2],
    // releaseOn: [st, st2],
    abortAtMs: 1500,
    triggerOn: st,
    duration: 2000,
    onStart: start,
    onRelease: show,
    onAbort: hide
  })

  const fire = () => trigger(2000, start).then(show).catch(hide)

  return (
    // <section className={classes.cmpTest} aria-label="component testing area">
    <section aria-label="component testing area">
      {/* <button onClick={() => release().then(() => console.log("a1111"))}> */}
      <button onClick={release}>release</button>
      <button onClick={abort}>abort</button>
      <button onClick={fire}>fire</button>
      <button onClick={() => setSt((s) => ++s)}>toggle</button>
      <Button.WithSpinner spinnerAnchor="asd" showSpinner={isLoading}>
        {isLoading ? "loading" : "ok!"}
      </Button.WithSpinner>
    </section>
  )
}
