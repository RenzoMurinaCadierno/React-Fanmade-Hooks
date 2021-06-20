import useLatency from "../useLatency"
import { CmpDescription, Spinner, Button } from "hub"
import plainCode from "../utils/plain"
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
  const [showSpinner, setShowSpinner] = useState(false)
  const { trigger, release, abort, getElapsedMs } = useLatency()

  // useEffect(() => {
  //   async function fire() {
  //     try {
  //       await trigger(1000, false)
  //       setShowSpinner((st) => !st)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   fire()
  // }, [])

  const ref = useRef()

  const fire = () =>
    (ref.current = trigger(1000, { onRelease: () => console.log("assas") })
      .then(() => setShowSpinner(true))
      .catch(() => setShowSpinner(false)))

  console.log(ref.current)

  return (
    <section className={classes.cmpTest} aria-label="component testing area">
      {/* <button onClick={() => release().then(() => console.log("a1111"))}> */}
      <button onClick={release}>release</button>
      <button onClick={abort}>abort</button>
      <button onClick={fire}>fire</button>
      <Button.WithSpinner> helow </Button.WithSpinner>
      {showSpinner && <Spinner />}
    </section>
  )
}
finish buttonwithspinner. Remeber to add spinner position 'left' 'right'. 
then add time to enable when latency is up 2:000, 1:500, 0:500