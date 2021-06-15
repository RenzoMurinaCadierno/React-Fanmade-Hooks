import { useCallback, useState } from "react"
import useEffectXTimes from "../useEffectXTimes"
import { Container, CmpDescription, Button, useToggle } from "hub"
import plainCode from "../utils/plain"
import {
  classes,
  descItemsObject,
  codeMenuProps,
  dealCardToBoard
} from "./UseEffectXTimes.utils"

export default function UseEffectXTimes() {
  // booleans "useEffectXTimes" will get as dependencies
  const [bool1, toggleBool1] = useToggle()
  const [bool2, toggleBool2] = useToggle()
  // array state to store dealt cards for both boards
  const [board1, setBoard1] = useState([])
  const [board2, setBoard2] = useState([])

  const [resetEff1Count] = useEffectXTimes(
    () => dealCardToBoard(board1, setBoard1), // `cb` triggered by useEffect
    [bool1], // `dependencies`
    5, // `times` callback will trigger before blocking
    true // `ignoreMountPhase`
  )
  const [resetEff2Count] = useEffectXTimes(
    () => dealCardToBoard(board2, setBoard2),
    [bool2],
    5,
    true
  )

  /**
   * Resets both "useEffectXTimes" callbacks count and clears both boards.
   */
  const resetExample = useCallback(() => {
    resetEff1Count()
    resetEff2Count()
    setBoard1([])
    setBoard2([])
  }, [resetEff1Count, resetEff2Count, setBoard1, setBoard2])

  /**
   * Toggles both boolean states.
   */
  const toggleBothBooleans = useCallback(() => {
    toggleBool1()
    toggleBool2()
  }, [toggleBool1, toggleBool2])

  return (
    <Container htmlElem="main" className={classes.container}>
      <CmpDescription
        descItems={descItemsObject}
        plainCode={plainCode}
        isCodeMenuAnchorHandledByMediaQuery
        codeMenuProps={codeMenuProps}
        classNames={classes.cmpDesc}
      />
      <section className={classes.cmpTest} aria-label="component testing area">
        {/* Boards, where cards are dealt */}
        <Board boardNumber={1} boardArray={board1} boolean={bool1} />
        <Board boardNumber={2} boardArray={board2} boolean={bool2} />
        {/* Buttons to toggle each boards' boolean state */}
        <Button onClick={toggleBool1}> Toggle board 1 boolean </Button>
        <Button onClick={toggleBool2}> Toggle board 2 boolean </Button>
        <Button onClick={toggleBothBooleans}> Toggle both booleans </Button>
        {/* master reset Button (useEffect reset and clear board) */}
        <Button onClick={resetExample}>Reset board and useEffect count</Button>
      </section>
    </Container>
  )
}

function Board({ boardNumber, boardArray, boolean }) {
  return (
    <Container type="secondary" roundBorders className={classes.board}>
      <span className={classes.boardName}>Board {boardNumber}</span>
      {boardArray.map((cardArr) => cardArr[1])}
      <span className={classes.boolean}>{boolean ? "True" : "False"}</span>
    </Container>
  )
}
