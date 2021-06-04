import styles from "./UseTimer.module.css"

export const descItemsObject = {
  title: "useTimer",
  paragraphs: [
    "Generates and ticks a timer or countdown.",
    "Try breaking the targets. The countdown will tick from 30 seconds to 0, where game ends.",
    "The faster you tap a target, the more points you get. Quick taps add extra time as bonus, slow ones substract as penalty.",
    "Tap a bomb to destroy all targets (without time bonus or penalty)."
  ]
}

export const classes = {
  container: styles.Container,
  cmpDesc: {
    container: styles.CmpDescContainer,
    description: styles.CmpDescContent,
    codeIcon: {
      expandableIcon: {
        container: styles.CmpDescCodeIconContainer,
        content: styles.CmpDescCodeIconContent
      }
    }
  },
  cmpTest: styles.CmpTest,
  scoreBoard: styles.ScoreBoard
}

/**
 * "scores" object to be passed to '*BTScoreboard*' and to '*BTGame*' (this
 * last one after a conversion to make it a valid object for `content`)
 */
export const scores = {
  BAD: {
    minAccuracy: 0,
    bonusTime: -100,
    points: 5
  },
  GOOD: {
    minAccuracy: 15,
    bonusTime: 0,
    points: 10
  },
  NICE: {
    minAccuracy: 30,
    bonusTime: 0,
    points: 20
  },
  GREAT: {
    minAccuracy: 50,
    bonusTime: 0,
    points: 30
  },
  EXCELLENT: {
    minAccuracy: 75,
    bonusTime: 500,
    points: 60
  },
  PERFECT: {
    minAccuracy: 85,
    bonusTime: 1000,
    points: 120
  },
  GODLIKE: {
    minAccuracy: 95,
    bonusTime: 2000,
    points: 240
  }
}

/**
 * Creates a valid object to use as `content` for '*BTTarget*'s in '*BTGame*'.
 * Its shape is: { (number) minAccuracy: (string) msgToShowWhenHit }
 * > * E.g.: { 0: "BAD", 15: "GOOD", 75: "EXCELLENT", ...}
 */
export const targetContentObj = Object.entries(scores).reduce(
  (acc, keyValArr) => ({ ...acc, [keyValArr[1].minAccuracy]: keyValArr[0] }),
  {}
)

/**
 * Initial game state to complement '*BTGame*'s logic
 */
export const initialGameState = {
  // flag to start/stop the game
  isGameActive: false,
  // '*BTTarget*' content to show when hit. Correlates to values in
  // "targetContentObj" above
  text: "",
  // the max amount of '*BTTarget*'s to render in '*BTField*'
  maxTgtsOnScreen: 1,
  // the speed accuracy of last hit target (delta from spawn to destruction)
  speed: 0,
  // the amount of player destroyed '*BTTarget*'s
  hits: 0,
  // the sum of all speed accuracy, to be further devided to get the avg speed
  accSpeed: 0,
  // the sum of points given when breaking a '*BTTarget*'. Correlates to points
  // in "scores" object above
  points: 0,
  // the highest amount of points gained out of all played games
  highScore: 0
}
/**
 * Handles the game logic when a target is destroyed (by the player or by self
 * destructing).
 *
 * @param {function} setGameSt "gameSt" setter function
 * @param {Array} scoreArr the array produced by '*BTTarget*'s
 *   "getContentOnHit". Shape:
 * > * [
 * > * * (string) resultMsg,
 * > * * (number) delta%FromSpawnToHit,
 * > * * (number) closestLowestSpeedValue
 * > * ]
 * @param {boolean} wasPlayerHit True indicates the player destroyed the target.
 *   False is a target being self destructed.
 */
export function setGameStOnTargetDestroyed(setGameSt, scoreArr, wasPlayerHit) {
  setGameSt((prevSt) => {
    // player hit grants the respective points. Target self destructing, 1.
    // We cannot assign 0 points as `bonusTime` useEffect in '*Timer*' as
    // it must listen to all of its changes. 0 is falsy, thus useEffect will
    // ignore it due to React performance. We need it to trigger on each target
    // destruction, even if it was not a player hit (no score). That's why we
    // assigned 1 as a minimum default score. Truthy value, always re-renders
    const newPoints =
      prevSt.points + (wasPlayerHit ? scores[scoreArr[0]].points : 1)
    // only player destructions count towards "hits" total
    const newHitCounter = prevSt.hits + (wasPlayerHit ? 1 : 0)
    // player destructions assigns the proper delta speed. Target
    // self-destructing is 0
    const newSpeed = wasPlayerHit ? scoreArr[1] : 0
    return {
      ...prevSt,
      text: scoreArr[0],
      // an additional target will spawn each 3 targets destroyed by the player
      // (max: 10)
      maxTgtsOnScreen:
        prevSt.maxTgtsOnScreen +
        (wasPlayerHit && !!!(newHitCounter % 3) && prevSt.maxTgtsOnScreen < 10
          ? 1
          : 0),
      speed: newSpeed,
      hits: newHitCounter,
      // sum all delta speeds. They will be used for calculating the average
      // speed in '*Timer*'
      accSpeed: prevSt.accSpeed + newSpeed,
      points: newPoints,
      // update "highScore" when current points exceed the previous high score
      highScore: newPoints > prevSt.highScore ? newPoints : prevSt.highScore
    }
  })
}

/**
 * Handles the game logic when game starts.
 *
 * @param {function} setGameSt "gameSt" setter function
 */
export function setGameStOnGameStart(setGameSt) {
  setGameSt((prevSt) => ({
    ...initialGameState,
    isGameActive: true, // flag the game as started
    highScore: prevSt.highScore // keep high score (else it would be set to 0)
  }))
}

/**
 * Handles the game logic when game ends.
 *
 * @param {function} setGameSt "gameSt" setter function
 */
export function setGameStOnGameReset(setGameSt) {
  setGameSt((prevSt) => ({
    ...prevSt,
    // flag the game as having ended
    isGameActive: false,
    // reset max targets to 1 here, so that no new targets spawn
    maxTgtsOnScreen: 1,
    // reset speed here, so that '*BTScoreboard*' shows 0.00%
    speed: 0
  }))
}
