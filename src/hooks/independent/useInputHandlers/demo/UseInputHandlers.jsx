import { useCallback, useState, useRef } from "react"
import useInputHandlers from "../useInputHandlers"
import {
  Modal,
  CmpDescription,
  Container,
  Text,
  StyledInput,
  Button,
  useToggle
} from "hub"
import {
  classes,
  descItemsObject,
  resetGameSt,
  changeHelpText,
  processAnswer,
  getTextsAndStyles,
  ResultsSummary
} from "./UseInputHandlers.utils"

export default function UseInputHandlers() {
  const [gameSt, setGameSt] = useState({
    words: [], // random words to type will be pushed here on each game
    answers: [], // and same for answers given by the player
    startTime: 0, // on game start, current time in ms will be stored here
    endTime: 1, // same for game end. 1 fakes game status in '*Modal*'
    helpText: "" // validation errors and "Correct!" messages stored here
  })
  const [isModalOpen, toggleModal] = useToggle(false) // '*Modal*' toggler
  const inputRef = useRef() // '*input*' reference passed to "useInputHandlers"

  const inputHandlers = useInputHandlers(
    // args: (1) '*input*' reference, (2) '*input*' props, (3) config object
    inputRef,
    {
      autoComplete: "off",
      onChange: (e) => changeHelpText(e, gameSt, setGameSt)
    },
    {
      // each key press triggers validation process
      validateOnChange: true,
      // "input.length" > 20 prevents value change
      preventChange: (e) => e.target.value.length > 20,
      // on submit, process input value versus current words to type
      onSubmit: (_, validation, inputRefCurrent, prevValue) => {
        processAnswer(validation, inputRefCurrent, prevValue, setGameSt)
      },
      // on submit, clear input
      clearOnSubmit: true,
      // process submission even with validation errors
      forceSubmit: true,
      // rule object to test input value
      validators: {
        // fully customized rule is shaped:
        //   ruleName: (inputVal <string>) => [
        //     <function> statement that evaluates to a valid input rule,
        //     <string> invalid rule message
        //   ],
        maxLength: (val) => [val.length < 20, "Word was too long! Try again!"],
        // using a string instead of an array takes the default rule for the
        // key (hereby: "required"), but overrides the message on failed rule
        required: "Type at least one character"
      }
    }
  )

  const startGame = useCallback(() => {
    // set "gameSt" to its default initial state
    resetGameSt(setGameSt)
    // clear the '*input*' and set focus on it
    inputHandlers.clear()
    inputHandlers.focus()
  }, [setGameSt, inputHandlers])

  // returns the styles and children strings to use for the game's UI. We
  // abstract the logic so as not to conflict with the custom hook example's
  // functionality
  const content = getTextsAndStyles(gameSt, inputHandlers.value, toggleModal)

  return (
    <>
      {/* Game results wrapper screen */}
      <Modal
        open={isModalOpen}
        closeIcon // add the default close icon
        onCloseIconClick={toggleModal} // close the '*Modal*' on close icon...
        onBackdropClick={toggleModal} // ... and backdrop click
      >
        {/* Game results inner UI */}
        <ResultsSummary gameSt={gameSt} />
      </Modal>
      <Container className={classes.container}>
        <CmpDescription
          descItems={descItemsObject}
          classNames={classes.cmpDesc}
        />
        <section
          className={classes.cmpTest}
          aria-label="component testing area"
        >
          <Text htmlElem="h4" disabled={content.words.disabled} bold italic>
            {content.words.text}
          </Text>
          <StyledInput /* just an uncontrolled '*input*' with some stylings */
            ref={inputRef} /* this ref is attached to that <input>... */
            {...inputHandlers.props} /* ...as well as all inputHandlers.props */
            label={content.inputLabel}
            classNames={classes.input}
          />
          {/* invisible text triggered by "useInputHandler" validations */}
          <Text type={content.helpText.type} italic>
            {content.helpText.text}
          </Text>
          {/* "start game"/"reset game" button */}
          <Button type={content.startBtn.type} onClick={startGame}>
            {content.startBtn.text}
          </Button>
          {/* "show results screen" button */}
          <Button
            disabled={content.resultsBtn.disabled}
            onClick={content.resultsBtn.onClick}
          >
            Check results
          </Button>
        </section>
      </Container>
    </>
  )
}
