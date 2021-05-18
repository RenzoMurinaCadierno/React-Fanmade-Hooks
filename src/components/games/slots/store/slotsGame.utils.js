/**
 * Props to spread on each '*Badge*', which do not mutate.
 */
export const staticBadgeProps = {
  scores: [
    {
      key: "res1",
      type: "secondary",
      anchor: "top-left-farthest",
      size: "large"
    },
    {
      key: "res2",
      type: "secondary",
      anchor: "top-right-farthest",
      size: "large"
    },
    {
      key: "res3",
      type: "secondary",
      anchor: "bottom-left-farthest",
      size: "large"
    },
    {
      key: "res4",
      type: "secondary",
      anchor: "bottom-right-farthest",
      size: "large"
    }
  ],
  stats: [
    {
      key: "stat1",
      anchor: "bottom-right-far",
      size: "largest",
      animateOn: 0
      // noBorder: true
    }
  ]
}

/**
 * Props to spread on each '*Badge*', mutated by reducer actions.
 */
export const dynamicBadgeProps = {
  scores: [
    { content: 1, show: true },
    { content: 1, show: true },
    { content: 2, show: true },
    { content: 3, show: true }
  ],
  stats: [{ content: 0, show: true, previousContent: 0 }]
}

/**
 * Adds the first element of yield's incoming array to `score` local scope
 * variable, up until yielded array's second element is true.
 *
 * Such case returns the accumulted score, ending the generator process.
 *
 * @param {number} initialScore Starting score
 *
 * @returns {number} The accumulated score
 */
function* sumScoreOfVisibleBadges() {
  let score = 0
  let done = false

  while (true) {
    if (done) return score
    const [scoreToAdd, doneAdding] = yield
    score += scoreToAdd
    done = doneAdding
  }
}

/**
 * Finishes resolving the instance of `sumScoreOfVisibleBadges` invoked
 * by the current iteration of reducer's "UPDATE_BADGE_PROPS" action.
 *
 * @param {function} sumScore `sumScoreOfVisibleBadges` instance
 *
 * @returns {number} The final score of all '*Badge*'s with show = true
 */
function getSumOfPointsOfVisibleBadges(sumScore) {
  let sumOfPointsOfVisibleBadges = sumScore.next([0, true])
  // if there were less active badges than "scoreObj" keys in the last "for"
  // loop above, then the loop would not have been invoked. Thus, "sumScore"
  // in its body would not have ran, so its value would be undefined, stuck
  // on its yield. As a failsafe in such case, call "sumScore" once more to
  // let it reach its return value
  if (!sumOfPointsOfVisibleBadges.done) {
    sumOfPointsOfVisibleBadges = sumScore.next([0, true])
  }
  return sumOfPointsOfVisibleBadges
}

/**
 * Generates an object with keys being the string elements in
 * `slotNamesArray` and values the amount of times those names are
 * repeated there.
 * @param {Array} slotNamesArray All 3 player stopped slots' names
 * @returns {object} An object with keys being the string elements in
 * `slotNamesArray` and values the amount of times those names are
 * repeated there. For instance:
 * * ['apple', 'lemon', 'cherry'] -> { apple: 1, lemon 1, cherry: 1 }
 * * ['apple', 'apple', 'lemon'] -> { apple: 2, lemon 1 }
 * * ['cheery', 'cheery', 'cherry'] -> { cherry: 3 }
 */
export function getSlotsResultsObj(slotNamesArray) {
  return slotNamesArray.reduce((acc, name) => {
    !acc[name] ? (acc[name] = 1) : ++acc[name]
    return acc
  }, {})
}

/**
 * Returns a modified copy of `state.scores`, with each slotName key updated
 * by the stated results in `slotsResultsObj`.
 *
 * For example, notice how apple's "2" and lemon's "1" value change given
 * `slotsResultsObj`:
 *
 * * `currentScoresState` :
 * > { { apple: { 1: 1, 2: 1, 3: 1 }, { lemon: { 1: 2, 2: 1, 3: 1 } } }
 *
 * * `slotsResultsObj` :
 * > { apple: 2, lemon: 1 }
 *
 * * `return value` :
 * > { { apple: { 1: 1, 2: 0, 3: 1 } }, { lemon: 1: 1, 2: 1, 3: 1 } }
 *
 * Note that if the the return value matches `currentScoresState`, it means
 * the current slots iteration did not modify results (stars were not gained,
 * score did not change). Thus, a life will be substracted when the function
 * that called this one resolves.
 *
 * @param {object} currentScoresState `state.scores` object in `slots.reducer`
 * @param {object} slotsResultsObj Object with keys being slot names and
 *   values the amount of times they repeat themselves on stopped slots.
 *   It correlates to the return value of `getSlotsResultsObj()`
 *
 * @returns {object} An updated copy of `state.scores`, where each slot name
 *   key has its respective quantities substracted by `slotsResultsObj`
 */
export function getUpdatedScores(currentScoresState, slotsResultsObj) {
  const stateScoresCopy = { ...currentScoresState }

  for (const slotName in slotsResultsObj) {
    let i = slotsResultsObj[slotName]
    while (i) {
      if (stateScoresCopy[slotName][i]) {
        stateScoresCopy[slotName][i] -= 1
        break
      } else {
        i--
      }
    }
  }

  return stateScoresCopy
}

/**
 * Starting from current `state.scores` and by using the updated version of
 * `scoreDataState`, it generates and returns a new `state.scores` object
 * containing all updated "scores" '*Badge*'s' props.
 *
 * @param {object} scoresState "slotGame.reducer" current `state.scores`
 * @param {object} scoreDataState "slotGame.reducer" current `state.scoreData`
 * @param {function} sumScore `sumScoreOfVisibleBadges` generator's instance
 *
 * @returns {object} An updated version of `state.scores`
 */
function getUpdatedScoreBadgesProps(scoresState, scoreDataState, sumScore) {
  // copy scoresState since we will heavily modify it
  const scoresBadgeProps = { ...scoresState }
  // for each entry coming from slotReducer's scoresState
  // -shape: { apple: { 1: 2, 2: 1, 3: 1, multiplier: 1 }, ...}-
  Object.entries(scoreDataState).forEach(([slotName, scoreObj]) => {
    // turn off each '*Badge*'s "show" prop on current "slotName" key
    // in "scoresBadgeProps"
    scoresBadgeProps[slotName].forEach((badgeProp) => (badgeProp.show = false))
    // loop current "slotName" key of slotReducer's scoresState
    //   -shape: { 1: 2, 2: 1, 3: 1, multiplier: 1 }, where numeric keys
    //    equal '*Badge*'s "content" prop, and their values equal how many
    //    badges with that content should have "show" prop === true
    for (const badgeContentKey in scoreObj) {
      // "multiplier" key will be NaN, thus avoided in check below
      const key = Number.parseInt(badgeContentKey)
      if (!isNaN(key)) {
        // for all numeric keys
        for (let i = 0; i < scoreObj[key]; i++) {
          // calculate "scoresBadgeProps" accurate item index to set
          // "show" prop to true. Index will be the current iterating
          // key, unless it is 1, in which case there are two badges
          // with that content. Such case will offset index by 1
          const badgeIdxOffset = key === 1 ? i - 1 : i
          scoresBadgeProps[slotName][key + badgeIdxOffset].show = true
          // add (content * multiplier) to the final score of all
          // visible badges. It will be substracted from the maximum
          // possible score to set `scoresState.star` content later
          sumScore.next([
            scoresBadgeProps[slotName][key + badgeIdxOffset].content *
              scoreObj.multiplier,
            false
          ])
        }
      }
    }
  })
  // return the new object to assign to state.scores
  return scoresBadgeProps
}

/**
 * Starting from current `statsSt` it generates and by using the
 * accumulated sum of scores of all visible badges stored in `sumScore`,
 * it creates and returns a new object containing all updated "stats"
 * '*Badge*' props.
 *
 * @param {object} statsState "slotGame.reducer" current `state.stats`
 * @param {function} sumScore `sumScoreOfVisibleBadges` generator's instance
 *
 * @returns {Array} An array where the first element is the updated version of
 *   `state.stats`, and the second one the updated maximum amount of possible
 *   "stars" (max possible score) to assign to `state.maxPossibleStars`
 */
function getUpdatedStatsBadgesPropsAndMaxPossibleStars(
  statsState,
  maxPossibleStarsState,
  sumScore
) {
  // copy statsState since we will modify it
  const statsBadgeProps = { ...statsState }
  // get the final sum of points relative to all badges with show = true
  const sumOfPointsOfVisibleBadges = getSumOfPointsOfVisibleBadges(sumScore)
  // on each game load, the max stars possible will be set to null, we catch
  // that and set it to the true max value (max points possible to get in
  // the game). If the value is not 0, we keep it. It was already updated
  const maxPossibleStars = maxPossibleStarsState
    ? maxPossibleStarsState
    : sumOfPointsOfVisibleBadges.value
  // grab key names for "heart" and "star". They MUST be in that order
  const [heart, star] = Object.keys(statsBadgeProps)
  const heartProps = statsBadgeProps[heart][0]
  const starProps = statsBadgeProps[star][0]
  // assign current stars (points) to its previous value before modifying
  starProps.previousContent = starProps.content
  // now, update star '*Badge*' "content" prop (player's new "points" value).
  // they equal the max possible stars minus the sum of all stars relative
  // to current visible '*Badge*'s for each slot in 'scores'
  starProps.content = maxPossibleStars - sumOfPointsOfVisibleBadges.value
  // "if" clause to control life substraction and points animation process
  if (!starProps.content || starProps.content !== starProps.previousContent) {
    // at initial game state (stats.star's content === 0) or at points increase
    // (stats.star's content !== its previous value), modify value on its
    // "animateOn" prop, which triggers '*Badge*' animation
    ++starProps.animateOn
  } else {
    // assign current hearts (lives) to its previous value before modifying
    heartProps.previousContent = heartProps.content
    // stats.star's content > 0 and is === the previous content, which means
    // this iteration did not modified stars (score). We lost one life, so
    // decrease "stats.heart" content by 1.
    heartProps.content--
    // hide its '*Badge*' if content reaches 0, or modify value on its "animateOn"
    // prop otherwise (to trigger its animation)
    if (!heartProps.content) heartProps.show = false
    else ++heartProps.animateOn
  }
  // return the new object to assign to state.stats
  return [statsBadgeProps, maxPossibleStars]
}

/**
 * Entry point to calculate the updated state of slotGame's reducer's:
 * * `state.scores`: props to pass to "Score" '*Badge*' components,
 * * `state.stats`: props to pass to "Stats" '*Badge*' components,
 * * `maxPossibleStars`: the sum of points (stars) of all visible
 *     badges' contents at the time this function gets called.
 *
 * @param {object} scoresState `state.scores`
 * @param {object} scoreDataState `state.scoreData`
 * @param {object} statsState `state.stats`
 * @param {object} maxPossibleStarsState `state.maxPossibleStars`
 *
 * @returns {Array} An array whose elements are the updated `state.scores`,
 *   `state.stats` and `state.maxPossibleStars`, in that order.
 */
export function getUpdatedBadgePropsAndMaxPossibleStars(
  scoresState,
  scoreDataState,
  statsState,
  maxPossibleStarsState
) {
  // instantiate the generator to accumulate visible badges' score
  const sumScore = sumScoreOfVisibleBadges()
  // advance to its first yield
  sumScore.next([0, false])
  // create the new object to update `state.scores` with
  const scoresBadgeProps = getUpdatedScoreBadgesProps(
    scoresState,
    scoreDataState,
    sumScore
  )
  // create the new object to update `state.stats` with
  const [
    statsBadgeProps,
    maxPossibleStars
  ] = getUpdatedStatsBadgesPropsAndMaxPossibleStars(
    statsState,
    maxPossibleStarsState,
    sumScore
  )
  // return the updated state scores, stats and maxPossibleStars
  return [scoresBadgeProps, statsBadgeProps, maxPossibleStars]
}
