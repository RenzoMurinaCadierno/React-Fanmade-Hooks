import styles from "./UseEffectOnce.module.css"

export const classes = {
  container: styles.Container,
  cmpDesc: {
    container: styles.CmpDescContainer,
    description: styles.CmpDescContent
  },
  cmpTest: styles.CmpTestContainer
}

export const descItemsObject = {
  title: "useEffectOnce",
  paragraphs: [
    "useEffect but it only applies once.",
    "Try to guess the hidden digit. One useEffect is listening to all buttons. Tapping on them will trigger the game flow logic only once. Afterwards, useEffect disables and buttons will no longer work.",
    "Retrying will re-enable useEffect, thus restoring buttons' functionality."
  ]
}

export const digitsObject = {
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

const digits = Object.keys(digitsObject) // ["zero", "one", "two", ...]

function getCorrectDigit() {
  // gets one digit name at random
  return digits[Math.floor(Math.random() * digits.length)]
}

export function getAnswerAndNewDigitArray() {
  // [new digit name, a complete digit name array]
  return [getCorrectDigit(), [...digits]]
}

/**
 * Returns an object to pass to <PhoneDial /> as buttonProps, with props of
 * disabled = true, and onClick = null for each wrong guess' associated button
 * @param {array} availableDigits array with remaning digits to choose from
 */
export function getBtnProps(availableDigits) {
  // each digit that is not present in the full array (digits) is an already
  // wrong guess to disable. Include "hash" and "star" as they are meant to
  // never be active
  const disabledDigits = [
    "hash",
    "star",
    ...digits.filter((d) => !availableDigits.includes(d))
  ]
  // create an object where each digit name is a key, and the value another
  // object with disabled = true and onClick = null. This will be passed to
  // <PhoneDial /> as buttonProps.
  // E.g.: {"six": {onClick: null, disabled = true}}
  return disabledDigits.reduce((acc, curDigit) => {
    return { ...acc, [curDigit]: { disabled: true, onClick: null } }
  }, {})
}

export function getSuccessPercentage(digitsLeft) {
  // fancy addition to curse our luck
  return Math.floor((1 / digitsLeft) * 100)
}
