import { PhoneDial } from "hub"

/**
 * Array of string values of all '*PhoneDial*' buttons.
 *
 * ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '#', '*'].
 */
const digits = PhoneDial.constants.VALUES

/**
 * Generates and returns an array containing an amount of random '*PhoneDial*'
 * digits, calculated given current game's `score` and `mode`.
 *
 * @param {number} score Current game instance's `score`.
 * @param {number} mode Current game instance's `mode`.
 */
export function getCode(score, mode = 2) {
  let code = []

  // "mode" can be 1, 2 and 3. "code" starts with 2 digits and adds one for
  // each level.
  // This function triggers before "score" state increases, but we need the
  // increased value to perform calculations. So, instead of "score" as is, we
  // use "score" + 1
  let amountOfDigitsInCode = Math.floor((score + 1) / (5 - mode)) + 2

  // 11 digits in "code" is the maximum. If exceeded, set it to 11.
  amountOfDigitsInCode = amountOfDigitsInCode >= 12 ? 11 : amountOfDigitsInCode

  // push random unrepeated digits to "code" until we hit "amountOfDigitsInCode"
  while (code.length < amountOfDigitsInCode) {
    const digit = digits[Math.floor(Math.random() * digits.length)]
    if (!code.includes(digit)) code = [...code, digit]
  }
  // return the array to set as "code" state
  return code
}

/**
 * Tests for "attempt" being non-empty array, having the same `length` and the
 * exact same values.
 *
 * Returns `true` if both conditions are met, `false` otherwise.
 *
 * @param {String[]} attempt "attempt" state.
 * @param {String[]} code "code" state.
 */
export function haveExactValues(attempt, code) {
  if (!attempt.length || attempt.length !== code.length) return false

  if (attempt.some((value) => !code.includes(value))) return false

  return true
}
