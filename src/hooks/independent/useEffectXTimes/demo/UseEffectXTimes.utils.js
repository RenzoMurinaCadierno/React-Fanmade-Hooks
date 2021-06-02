import { PlayingCard } from "hub"
import styles from "./UseEffectXTimes.module.css"

export const classes = {
  container: styles.Container,
  cmpDesc: {
    container: styles.CmpDescContainer,
    description: styles.CmpDescContent,
    expIcon: {
      container: styles.CmpDescExpIconContainer,
      content: styles.CmpDescExpIconContent
    }
  },
  cmpTest: styles.Grid,
  board: styles.Board,
  boardName: styles.BoardName,
  card: { container: styles.Card },
  boolean: styles.Boolean
}

export const descItemsObject = {
  title: "useEffectXTimes",
  paragraphs: [
    "useEffect but it stops applying after the specified count.",
    "Try some Poker. Both boards will listen to 5 changes on their booleans to deal cards. After change 5, they will no longer deal.",
    "Resetting will clear the board and restore useEffect's listen count back to 5."
  ]
}

/**
 * Array for "suits" valid characters (spades, clubs, diamonds, hearts)
 */
const suits = ["s", "c", "d", "h"]

/**
 * Adds a rotation + translation css effect when dealing cards.
 *
 * @returns {object} "style" object with "rotate" and "translate" properties
 */
function getCardStyle() {
  const randAngle = Math.floor(Math.random() * 90) - 45
  const randTranslate = Math.floor(Math.random() * 30) - 15
  return {
    transform: `rotate(${randAngle}deg) translate(${randTranslate}%)`
  }
}

/**
 * Adds one "card" array to `board` state.
 *
 * A "card" array represents one card, shape:
 * * `elem 1` (string): suit name and value (e.g.: "c1", "d12", "h7")
 * * `elem 2` (React.Element): '*PlayingCard*' for that suit name and value
 *
 * @param {Array} board "board" array to set state to
 * @param {function} setBoard "board" state setter function
 */
export function dealCardToBoard(board, setBoard) {
  // safeguard. If we exceeded the max amount of cards, do nothing
  if (board.length >= 52) return
  // we need a loop given the case we got a repeated card out of randomizer
  // (that is, card is already dealt on board).
  while (true) {
    const suit = suits[Math.floor(Math.random() * 4)]
    const value = Math.ceil(Math.random() * 13)
    if (board.every((cardArr) => cardArr[0] !== suit + value)) {
      // we got a unique card. Construct a '*PlayingCard*' and append it to the
      // target "board" array state
      setBoard([
        ...board,
        [
          suit + value,
          <PlayingCard
            key={suit + value}
            isPokerCard
            suit={suit}
            value={value}
            classNames={classes.card}
            style={getCardStyle()}
          />
        ]
      ])
      break // done once a unique card was got
    }
  }
}
