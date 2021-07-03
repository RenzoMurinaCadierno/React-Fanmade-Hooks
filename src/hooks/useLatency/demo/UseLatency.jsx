import { CmpDescription, Container, CodeRush } from "hub"
import plainCode from "../utils/plain"
import { classes, descItems, metaTagsProps } from "./UseLatency.utils"

export default function UseCount() {
  return (
    <Container htmlElem="main" className={classes.container}>
      <CmpDescription {...{ descItems, plainCode, metaTagsProps }} />
      <CodeRush classNames={classes.cmpTest} />
    </Container>
  )
}

// function CmpTest() {
//   // const [isLoading, setIsLoading] = useState(false)
//   const [st, setSt] = useState(0)
//   const [elapsed, setElapsed] = useState(0)

//   const start = () => {
//     // setIsLoading(true)
//     console.log("start!")
//   }

//   const show = (elapsedMs) => {
//     // setIsLoading(false)
//     setElapsed(elapsedMs)
//     console.log("show!", elapsedMs)
//   }

//   const hide = (elapsedMs) => {
//     // setIsLoading(false)
//     setElapsed(elapsedMs)
//     console.log("hide!", elapsedMs)
//   }

//   const { isActive, trigger, release, abort, getElapsedMs } = useLatency({
//     checkpointInterval: 200,
//     onCheckpoint: (ms) => setElapsed(ms)
//     // abortAtMs: 1500
//     // releaseAtMs: 200
//     // doNotReRenderOnAction: true
//   })

//   const timeout = 5000
//   const [code, setCode] = useState(getCode())
//   const [gameSt, setGameSt] = useState({ curIdx: 0 })
//   const [buttonProps, setButtonProps] = useState({})

//   const fire = () => trigger(timeout, start).then(show).catch(hide)

//   const onPhoneButtonClick = useCallback(
//     (_, name, value) => {
//       if (code.includes(value)) {
//         setButtonProps((prevSt) => ({
//           ...prevSt,
//           [name]: { onClick: null, type: "secondary" }
//         }))
//       }
//     },
//     [code]
//   )

//   const MemoizedPhoneDial = memo(
//     () => (
//       <PhoneDial
//         onButtonClick={onPhoneButtonClick}
//         buttonProps={buttonProps}
//         genericButtonProps={{ disabled: !isActive }}
//       />
//     ),
//     [buttonProps, isActive]
//   )

//   return (
//     // <section className={classes.cmpTest} aria-label="component testing area">
//     <section aria-label="component testing area" className={classes.cmpTest}>
//       <Text htmlElem="h4">{code.join(" ")}</Text>
//       <MemoizedPhoneDial />
//       <Button.WithProgress
//         min={0}
//         max={timeout}
//         value={elapsed}
//         showSpinner={isActive}
//         // onClick={fire}
//         onClick={getCode}
//       >
//         {isActive ? getFormattedCountdown(elapsed, timeout) : "ok!"}
//       </Button.WithProgress>
//     </section>
//   )
// }

// return (
//   // <section className={classes.cmpTest} aria-label="component testing area">
//   <section aria-label="component testing area">
//     {/* <button onClick={() => release().then(() => console.log("a1111"))}> */}
//     <button onClick={release}>release</button>
//     <button onClick={abort}>abort</button>
//     <button onClick={fire}>fire</button>
//     {/* <button onClick={() => setSt((s) => ++s)}>toggle</button> */}
//     <Button.WithProgress
//       min={0}
//       max={2000}
//       value={elapsed}
//       type="primary-1"
//       showSpinner={isActive}
//     >
//       {isActive ? getFormattedCountdown(elapsed, 2000) : "ok!"}
//     </Button.WithProgress>
//   </section>
