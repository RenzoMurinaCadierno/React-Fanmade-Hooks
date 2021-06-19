import styles from "./UseEffectOnce.module.css"

export const classes = {
  container: styles.Container,
  cmpDesc: {
    container: styles.CmpDescContainer,
    description: styles.CmpDescContent
  },
  cmpTest: styles.CmpTestContainer
}

export const descItems = {
  title: "useEffectOnce",
  paragraphs: [
    "useEffect but it only applies once.",
    "Try to guess the hidden digit. One useEffect is listening to all buttons. Tapping on them will trigger the game flow logic only once. Afterwards, useEffect disables and buttons will no longer work.",
    "Retrying will re-enable useEffect, thus restoring buttons' functionality."
  ]
}

export const metaTagsProps = {
  title: "RFH " + descItems.title,
  author: "Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>",
  description: descItems.title + " hook. " + descItems.paragraphs[0],
  keywords:
    "effect, once, useEffect, useEffectOnce, react, fanmade, hooks, react fanmade hooks"
}

export const codeMenuProps = {
  mqToAnchor: { pt: "top-right", default: "bottom-right" }
}

/**
 * Object with digit names as keys, and their number versions as values.
 */
const digitsObject = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
}

/**
 * Array of all digit names. ["zero", "one", "two", ...].
 */
const digits = Object.keys(digitsObject)

/**
 * Returns a random element in "digits" array.
 */
function getCorrectDigit() {
  return digits[Math.floor(Math.random() * digits.length)]
}

/**
 * Returns an array where the first element is a random digit chosen from
 * "digits" array, and the second element, a copy of such array.
 */
function getAnswerAndNewDigitArray() {
  return [getCorrectDigit(), [...digits]]
}

/**
 * Returns an object to pass to '*PhoneDial*' as `buttonProps`, with
 * "disabled: true", and "onClick: null" for each pressed button associated
 * with a wrong guess.
 *
 * @param {Array} availableDigits Array with the remaning digits to choose from.
 */
function getBtnProps(availableDigits) {
  // each digit that is not present in the full array (digits) is an already
  // wrong guess to disable. Include "hash" and "star" as they are never meant
  // to be active
  const disabledDigits = [
    "hash",
    "star",
    ...digits.filter((digit) => !availableDigits.includes(digit))
  ]
  // create an object where each digit name is a key, and the value another
  // object with "disabled: true" and "onClick: null". This will be passed to
  // '*PhoneDial*' as `buttonProps`.
  // E.g.: { "six": { onClick: null, disabled = true } }
  return disabledDigits.reduce((acc, curDigit) => {
    return { ...acc, [curDigit]: { disabled: true, onClick: null } }
  }, {})
}

function getSuccessPercentage(digitsLeft) {
  // fancy addition to curse our luck
  return Math.floor((1 / digitsLeft) * 100)
}

/**
 * Returns the object to use as initial game state, shaped:
 *
 * `availableDigits` (Array): ["zero", "one", "two", ...].
 *   NOT "hash" or "star".
 *
 * `answer` (string): anywhere between "zero" and "nine".
 *
 * `pressedBtnName` (string): '*PhoneDial*' button `name`.
 *
 * `disabledBtnProps` (object): Props to spread to digit buttons depending on
 *   them being already pressed.
 *
 * `text` (string): 'Help' text, with success probability.
 *
 * `ping` (boolean): state to ping on each button press to force an update.
 *
 * `disableRetry` (boolean): 'retry' button `disabled`.
 */
export function getInitialGameSt() {
  const [answer, availableDigits] = getAnswerAndNewDigitArray()
  return {
    availableDigits, // ["zero", "one", "two", ...]. NOT "hash" or "star"
    answer, // anywhere between "zero" and "nine"
    pressedBtnName: "",
    disabledBtnProps: getBtnProps(availableDigits), // check function
    text: `Guess! Success chance: ${getSuccessPercentage(10)}%`, // <Text /> children
    ping: false, // check handleDigitButtonClick()
    disableRetry: true // "Retry" button disabled state
  }
}

/**
 *  Sets "st.pressedBtnName" to the tapped button's name, enables "Retry"
 *  button and pings the state, forcing a re-render.
 *
 *  **The ping is important**, as if we only listened to name changes, then
 *  useEffect will NOT trigger on the same button click twice even if it is
 *  enabled, as "st.pressedBtnName" would equal its previous state.
 *
 * @param {string} name Tapped '*PhoneDial*' button's `name`.
 * @param {function} setGameSt "gameSt" setter function.
 */
export function setButtonDataBeforeProcessingAnswer(name, setGameSt) {
  setGameSt((prevSt) => ({
    ...prevSt,
    pressedBtnName: name,
    ping: !prevSt.ping,
    disableRetry: false
  }))
}

/**
 * Processes game logic once a digit button was pressed.
 *
 * This function is invoked by "useEffectOnce" hook only if its effect count
 * was not consumed already.
 *
 * @param {function} setGameSt "gameSt" setter function.
 */
export function handleGameLogicAfterDigitButtonClick(setGameSt) {
  // this setState is called by useEffectOnce hook.
  setGameSt((prevSt) => {
    // get a boolean to determine if the answer was correct
    const isWin = prevSt.answer === prevSt.pressedBtnName
    // a new answer and a fresh digits array in case we guessed the number
    const [newAnswer, availableDigits] = getAnswerAndNewDigitArray()
    // and the former digits array without the wrong guess if we failed
    const splicedDigitsArray = prevSt.availableDigits.filter(
      (d) => d !== prevSt.pressedBtnName
    )
    return {
      ...prevSt,
      availableDigits: isWin ? availableDigits : splicedDigitsArray,
      answer: isWin ? newAnswer : prevSt.answer,
      disabledBtnProps: getBtnProps(
        isWin ? availableDigits : splicedDigitsArray
      ),
      text: isWin
        ? `It was ${digitsObject[prevSt.answer]}! But buttons broke :/`
        : `Not ${digitsObject[prevSt.pressedBtnName]}! Buttons broken... :c`
    }
  })
}

/**
 * Updates 'help' text with the new success change and disables 'retry' button.
 *
 * @param {function} setGameSt "gameSt" setter function.
 */
export function resetGameState(setGameSt) {
  setGameSt((prevSt) => ({
    ...prevSt,
    text: `Guess! Success chance: ${getSuccessPercentage(
      prevSt.availableDigits.length
    )}%`,
    disableRetry: true
  }))
}
