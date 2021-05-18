import {
  PROCESS_SLOTS_RESULTS,
  RESTART_GAME,
  TOGGLE_SLOTS_ACTIVE
} from "./slotsGame.action.types"
import {
  dynamicBadgeProps,
  staticBadgeProps,
  getSlotsResultsObj,
  getUpdatedScores,
  getUpdatedBadgePropsAndMaxPossibleStars
} from "./slotsGame.utils"

/**
 * Given the amount of lives before triggering game over, and an initial object
 * with "slots" and "stats" names as keys, and an array of names as their values,
 * it creates and returns the initial state of `slotsGame.reducer`.
 *
 * @param {object} slotAndScoreNamesObj An object with keys "scores" (for slot
 *   names)  and "stats" (for stats component names), and their values being
 *   arrays containing one string for each of those names. For instance, in the
 *   default game, this object would be:
 * * { 'scores': ['apple', 'lemon', ...], 'stats': ['stars', 'heart'] }
 *
 * @param {number} lives The amount of times a slot roll can be failed before
 *   triggering a game over.
 *
 * @returns {object} `slotsGame.reducer`'s initial state.
 */
export function getReducerInitialState(slotAndScoreNamesObj, lives) {
  const badgesInitSt = {}
  // for each "stats" and "scores" key inside `slotAndScoreNamesObj`
  for (const itemKey in slotAndScoreNamesObj) {
    // create that key and assign an empty object to it
    badgesInitSt[itemKey] = {}
    // map the array assigned as value of the key in `slotAndScoreNamesObj`
    slotAndScoreNamesObj[itemKey].forEach((keyName, i) => {
      // if that name does not exist inside the respective key of `badgesInitSt`,
      // initialize it to an empty array
      if (!badgesInitSt[itemKey][keyName]) badgesInitSt[itemKey][keyName] = []
      // populate the array with the respective static and dynamic 'Badge' props
      dynamicBadgeProps[itemKey].forEach((dynProp, j) => {
        badgesInitSt[itemKey][keyName].push({
          ...dynProp,
          ...staticBadgeProps[itemKey][j]
        })
        // manually set the amount of lives in badgesInitSt.stats.heart[0].content
        if (itemKey === "stats" && !i) {
          badgesInitSt[itemKey][keyName][0].content = lives
        }
      })
    })
  }
  // calculate the initial state to use as `state.scoreData`, which will hold an
  // object with each `state.scores` slot names as keys, and values an object
  // shape: { 1: number, 2: number, 3: number, multiplier: number }.
  // * Each numeric key is the content of a badge, and its assigned numeric value
  //     is the amount of bades with that content with "show" prop being true.
  // * multiplier key relates to the score being added when hitting the
  //     related slot. It would be the badge content (1, 2 or 3) * multiplier
  const scoreData = slotAndScoreNamesObj.scores.reduce(
    (acc, slotName, i) => ({
      ...acc,
      [slotName]: {
        1: 2,
        2: 1,
        3: 1,
        multiplier: i + 1
      }
    }),
    {}
  )
  // grab initial scores, stats and maxPossibleStars' state
  const [
    scores,
    stats,
    maxPossibleStars
  ] = getUpdatedBadgePropsAndMaxPossibleStars(
    badgesInitSt.scores,
    scoreData,
    badgesInitSt.stats,
    null
  )
  // return the initial state to use in reducer
  return {
    scores,
    stats,
    maxPossibleStars,
    scoreData,
    activeSlotNames: [],
    areSlotsActive: false
  }
}

export function slotsGameReducer(state, action) {
  switch (action.type) {
    case TOGGLE_SLOTS_ACTIVE:
      // change active state handler for all slots depending on incoming
      // action.payload boolean, or switch its state if !action.payload
      return {
        ...state,
        areSlotsActive: action.payload ?? !state.areSlotsActive
      }

    case PROCESS_SLOTS_RESULTS:
      // push the incoming slotName to already "stopped" slots
      const updatedActiveNames = [...state.activeSlotNames, action.payload]
      // length < 3 means there are slots yet to stop. So just update names
      if (updatedActiveNames.length < 3) {
        return { ...state, activeSlotNames: updatedActiveNames }
      }
      // all 3 slots were stopped. From here on, we handle the logic to update
      // 'Badge' props in state (scores, stars), to pass to each 'Badge' component
      // First, calculate the new state.scoreData object
      const scoreData = getUpdatedScores(
        state.scoreData,
        getSlotsResultsObj(updatedActiveNames)
      )
      // generate the updated, stats and maxPossibleStars' state
      const [
        scores,
        stats,
        maxPossibleStars
      ] = getUpdatedBadgePropsAndMaxPossibleStars(
        state.scores,
        scoreData,
        state.stats,
        state.maxPossibleStars
      )
      // return updated state
      return {
        ...state,
        scores,
        stats,
        scoreData,
        maxPossibleStars,
        areSlotsActive: false,
        activeSlotNames: []
      }

    case RESTART_GAME:
      // reset reducer to its initial state
      const { reducerItems, lives } = action.payload
      return getReducerInitialState(reducerItems, lives)

    default:
      return state
  }
}
