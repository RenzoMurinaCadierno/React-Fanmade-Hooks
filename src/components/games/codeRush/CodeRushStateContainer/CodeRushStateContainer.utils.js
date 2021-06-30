import { PhoneDial } from "hub"

const digits = PhoneDial.constants.VALUES // ['1', '2', '3', ..., '*']

export function getCode(score, difficulty = 2) {
  let code = []
  // socre + 1 due to this function triggering before "score" state increases.
  // difficulty levels are 1, 2 and 3. Code starts at 2 digits, and adds one
  // extra digit after (level * correct answers)
  let amountOfDigitsInCode = Math.floor((score + 1) / (5 - difficulty)) + 2

  // 11 digits in code is max limit
  amountOfDigitsInCode = amountOfDigitsInCode >= 12 ? 11 : amountOfDigitsInCode

  while (code.length < amountOfDigitsInCode) {
    const digit = digits[Math.floor(Math.random() * digits.length)]
    if (!code.includes(digit)) code = [...code, digit]
  }

  return code
}

export function haveExactValues(attempts, code) {
  if (!attempts.length || attempts.length !== code.length) return false
  if (attempts.some((value) => !code.includes(value))) return false
  return true
}
