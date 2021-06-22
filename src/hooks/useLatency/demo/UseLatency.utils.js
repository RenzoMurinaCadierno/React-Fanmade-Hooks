import styles from "./UseLatency.module.css"

export const descItems = {
  title: "useCount",
  paragraphs: [
    "Gets a count state and its increase, decrease, reset and step handlers, as well as its step's state.",
    "Try increasing/decreasing count below, resetting it and setting its step."
  ]
}

export const classes = {
  container: styles.Container,
  cmpTest: styles.CmpTest
}

export const metaTagsProps = {
  title: "RFH " + descItems.title,
  author: "Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>",
  description: descItems.title + " hook. " + descItems.paragraphs[0],
  keywords: "count, useCount, react, fanmade, hooks, react fanmade hooks"
}

export function getFormattedCountdown(ms, limit) {
  const delta = limit - ms
  const rawRemaningMs = delta < 0 ? 0 : delta
  const remainingSecs = Math.floor(rawRemaningMs / 1000)
  const remainingMs = rawRemaningMs % 1000

  return remainingSecs + ":" + addTrailingZeros(remainingMs)
}

function addTrailingZeros(number) {
  let strNum = number.toString()
  while (strNum.length < 3) strNum += "0"
  return strNum
}

const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "#", "*"]

export function getCode() {
  let code = []
  while (code.length < 5) {
    const digit = digits[Math.floor(Math.random() * digits.length)]
    if (!code.includes(digit)) code = [...code, digit]
  }
  return code
}
