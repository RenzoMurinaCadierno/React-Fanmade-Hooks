import { useCallback, useEffect, useReducer, useState } from "react"
import { Slots, Button, useToggle } from "hub"
import { getReducerInitialState } from "../store/slotsGame.reducer"
import {
  classes,
  defaultProps,
  propTypes,
  slotsArrays,
  resultItems,
  reducerItems,
  lives,
  isGameOver
} from "./SlotsGameRootNode.utils"

/**
 * Reducer's initial state. Kept static to re-rendering useReducer
 */
const initialState = getReducerInitialState(reducerItems, lives)

/**
 * Root node for "Slots" game. Renders all necessary components and
 * handles game logic with *slotsGame.reducer*, some inner states and
 * effect, as well as helper functions in *utils.js*.
 *
 * Components rendered here are:
 *
 * * '*SlotsSlotMachine*': the three spinning slots. Each one stops
 *     when clicked on, and they reactivate once score is calculated
 *     after all three were stopped, or after a game reset.
 *
 * * '*SlotsScoreSide*' for "Scores": the left side of the screen,
 *     containing "slot"s score indicators ("apple", "lemon",
 *     "cherry", "berry").
 *
 * * '*SlotsScoreSide*' for "Stats": the right side of the screen,
 *     containing "stat"s indicators ("heart" for lives left, and
 *     "star" for currently obtained score).
 *
 * * '*Button*' for "Reset": forces a game restart.
 *
 * * '*Button*' for "Use SVGs/icon": constant spinning slots cause
 *     many re-renders on short periods of time. If performance
 *     becomes an issue, this button toggles from rendering svg images
 *     to plain icons, helping rendering speed.
 *
 * * '*SlotsResultScreen*': triggers on game over (no lives left or
 *     all slot scores obtanied). Includes its own "Reset" button.
 *
 * @param {object} props
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 */
export default function SlotsGameRootNode({ classNames }) {
  // reducer state and dispatch. Handles all game logic
  const [state, dispatch] = useReducer(Slots.reducer, initialState)
  // "final results" modal screen's toggler
  const [showResultsScreen, setShowResultsScreen] = useState(false)
  // slot's svg to icon toggler. If performance drops, use icons
  const [isSvgImg, toggleSvgToIcon] = useToggle(false)

  // callback fired on each '*SlotsSpinningSlot*' click
  const handleSlotClick = useCallback(
    (slotName) => dispatch(Slots.actions.processSlotsResults(slotName)),
    []
  )
  // callback fired on "retry" button click in '*SlotsResultScreen*',
  // and upon component's mount phase.
  const handleRestartGame = useCallback(() => {
    dispatch(Slots.actions.restartGame(reducerItems, lives))
    setShowResultsScreen(false)
  }, [])

  // Resets reducer to its initial state at mount. This restores reducer's
  // defaults when unmounting and re-mounting (like when switching between
  // hook examples in the app)
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(handleRestartGame, [])
  // each click on '*SlotsSpinningSlot*' will fill `state.activeSlotNames`
  // with the hit "slot"'s name. When three slots are hit, if there are no
  // lives left, show result screen. Otherwise, re-enable slots (let them
  // spin again)
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let timeout = 0
    // `state.activeSlotNames` array change means a "slot" name was added
    // to it via tapping a '*SlotsSpinningSlot*'. It will be empty only
    // after all 3 '*SlotsSpinningSlot*'s were stopped and reducer
    // calculated game logic (updated scores and lives left)
    if (!state.activeSlotNames.length) {
      timeout = setTimeout(() => {
        // are there no lives left or were all "stars" (points) obtained?
        isGameOver(state)
          ? setShowResultsScreen(true) // game is over. Show results
          : dispatch(Slots.actions.toggleSlotsActive()) // game still on, enable slots
      }, 1200)
    }
    return () => clearTimeout(timeout)
  }, [state.activeSlotNames])

  return (
    <>
      {/* "Final results" screen, triggered on game over */}
      <Slots.ResultScreen
        show={showResultsScreen}
        imagesObj={resultItems}
        scoreData={state.scoreData}
        statsBadgesProps={state.stats}
        scoresBadgesProps={state.scores}
        onRestartButtonClick={handleRestartGame}
      />
      <div className={classes.container(classNames.container)}>
        {/* svg to icon button toggler. If performance is an issue */}
        <Button
          onClick={toggleSvgToIcon}
          className={classes.imgToggleButton(classNames.imgToggleButton)}
        >
          {isSvgImg ? "Use icons" : "Use SVGs"}
        </Button>
        {/* premature game reset button */}
        <Button
          onClick={handleRestartGame}
          className={classes.resetButton(classNames.resetButton)}
        >
          Reset
        </Button>
        {/* "slot machine" containing 3 spinning slots */}
        <Slots.SlotMachine
          slotsArrays={slotsArrays}
          areSlotsActive={state.areSlotsActive}
          renderIconInsteadOfSVGImg={!isSvgImg}
          onSlotClick={handleSlotClick}
        />
        {/* "slot" items tracking side (left side) */}
        <Slots.ScoreSide
          items={resultItems.scores}
          badgesProps={state.scores}
          scoreData={state.scoreData}
          propThatTriggersScoreEffect="show"
          badgeEffectImgSrcArray={resultItems.stats}
          classNames={classes.scores(classNames.scores)}
        />
        {/* "score" items tracking side (right side) */}
        <Slots.ScoreSide
          items={resultItems.stats}
          badgesProps={state.stats}
          propThatTriggersScoreEffect="content"
          badgeEffectImgSrcArray={resultItems.stats}
          classNames={classes.stats(classNames.stats)}
        />
      </div>
    </>
  )
}

SlotsGameRootNode.defaultProps = defaultProps
SlotsGameRootNode.propTypes = propTypes
