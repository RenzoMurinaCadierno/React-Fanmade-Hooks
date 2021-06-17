import { useState, useCallback } from "react"
import usePreviousValue from "../usePreviousValue"
import { CmpDescription, Container, Text, Die } from "hub"
import plainCode from "../utils/plain"
import {
  classes,
  descItems,
  metaTagsProps,
  prevRollContainerProps
} from "./UsePreviousValue.utils"

export default function UseToggle() {
  return (
    <>
      <CmpDescription descItems={descItems} {...{ plainCode, metaTagsProps }} />
      <CmpTest />
    </>
  )
}

function CmpTest() {
  // we keep state as a single object to force a reconstruction when we roll
  // the die. This is to re-render the component so that all values update
  const [dieSt, setDieSt] = useState({ res: 1 })

  const lastDigit = usePreviousValue(dieSt.res)
  const secondToLastDigit = usePreviousValue(lastDigit)
  const thirdToLastDigit = usePreviousValue(secondToLastDigit)

  const handleAfterRoll = useCallback(
    // returning a new object out of a function callback for setState forces
    // a re-render even on the same result.
    (newRes) => setDieSt(() => ({ res: newRes })),
    [setDieSt]
  )

  return (
    <>
      {/* 'rollable' "die" component */}
      <Container htmlElem="section" className={classes.diceRoll}>
        <Text htmlElem="h5" italic type="primary">
          Roll die
        </Text>
        <Die onAfterRoll={handleAfterRoll} />
      </Container>
      {/* 1st, 2nd and 3rd to last rolls 'die' components */}
      <section className={classes.prevRolls}>
        <PrevRollContainer text="Last roll" digit={lastDigit} />
        <PrevRollContainer
          text="Second-to-last roll"
          digit={secondToLastDigit}
        />
        <PrevRollContainer text="Third-to-last roll" digit={thirdToLastDigit} />
      </section>
    </>
  )
}

function PrevRollContainer({ text, digit }) {
  return (
    <Container className={classes.division}>
      <Text italic type="primary">
        {text}
      </Text>
      <Container {...prevRollContainerProps}>{digit}</Container>
    </Container>
  )
}
