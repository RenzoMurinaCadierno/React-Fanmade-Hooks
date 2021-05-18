import { Backdrop, Slots, Button } from "hub"
import { classes, slotsResultScreenPropTypes } from "./SlotsResultScreen.utils"

/**
 * Renders the "final results" screen UI, triggered when all scores for each
 * "slot" types are obtained, or when no lives are left.
 *
 * Displays the scores obtained for each "slot", as well as the sum of all of
 * them once processed through their respective multipliers. This sum is the
 * total "star"s (points). This component also shows the amount of lives left
 * at game over.
 *
 * @param {object} props
 *
 * `show?` (boolean): true mounts the component, showing the backdrop and
 *   results sections for both "slots" and "stats".
 *
 * `imagesObj` (object): An object with keys "scores" and "stats", with their
 *  values being an array of sub-arrays, each one shape:
 * > * (element 1): either "slot" name ("apple", "cherry", "lemon", "berry")
 *   or "stat" name ("heart", "star").
 * > * (element 2): path to its svg image.
 * > * (element 3): image alt.
 *
 * **Note:** One '*SlotsResultSection*' will be rendered for "scores" array
 *   and another one for "stats".
 *
 * `scoreData?` (object): An object with keys matching the "slot" item's name
 *   ("apple", "cherry", "lemon", "berry"), and an object as their values,
 *   shape:
 * > * "1": <number>: quantity of "score" badges with "1" on its content,
 * > * "2": <number>: quantity of "score" badges with "2" on its content,
 * > * "3": <number>: quantity of "score" badges with "3" on its content,
 * > * "multiplier": <number> the multiplier to factor when a score was hit.
 *
 * **Note:** It correlates to "scoreData" object in *slotGame.reducer*'s state.
 *
 * `scoresBadgesProps` (object): Object with keys matching "score" items' names
 *   (they correlate to "slot" names: "apple", "cherry", "lemon", "berry").
 *   Their values must be one array containing from 1 to 4 plain objects with
 *   '*Badge*' props generate `badgeContent` to pass to '*SlotsResultSection*'.
 *
 * `statsBadgesProps` (object): Object with keys matching "stat" items' names
 *   (they correlate to "stat" names: "heart", "star"). Their values must be
 *   one array containing from 1 to 4 plain objects with '*Badge*' props
 *   generate `badgeContent` to pass to '*SlotsResultSection*'.
 *
 * `onRestartButtonClick?` (function): callback to assign to "Restart"
 *   '*Button*'.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 */
export default function SlotsResultScreen({
  show,
  imagesObj,
  scoreData,
  scoresBadgesProps,
  statsBadgesProps,
  onRestartButtonClick,
  classNames = {}
}) {
  return (
    // wrapper. Covers 100% of visible screen
    <Backdrop show={show} className={classes.container(classNames.container)}>
      <div className={classes.resultsContainer(classNames.resultsContainer)}>
        {/* "Slot results" component (apple, cherry, lemon, berry) */}
        <Slots.ResultSection
          imageArrays={imagesObj.scores}
          multiplierImageArray={imagesObj.stats[1]}
          scoreData={scoreData}
          badgesProps={scoresBadgesProps}
          className={classes.scoresSection(classNames.scoresSection)}
        />
        {/* "Final stats" component (heart, star) */}
        <Slots.ResultSection
          isStatsSection
          imageArrays={imagesObj.stats}
          badgesProps={statsBadgesProps}
          className={classes.statsSection(classNames.statsSection)}
        />
      </div>
      {/* Restart game button */}
      <Button
        onClick={onRestartButtonClick}
        type="primary"
        coloredBg
        className={classes.button(classNames.button)}
      >
        Retry
      </Button>
    </Backdrop>
  )
}

SlotsResultScreen.propTypes = slotsResultScreenPropTypes
