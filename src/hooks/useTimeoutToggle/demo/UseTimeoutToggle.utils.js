import styles from "./UseTimeoutToggle.module.css"

export const classes = {
  cmpDesc: {
    description: styles.CmpDescDescription
  },
  cmpTest: styles.CmpTest,
  spinnerContainer: styles.SpinnerContainer
}

export const descItems = {
  title: "useTimeoutToggle",
  paragraphs: [
    "Offers a boolean state and a trigger that, when invoked, sets the state to `true`. Then, after a specified timeout expires, the state is automatically set back to `false`.",
    "Tap the spinner. Its active state will toggle to `true`, enabling a countdown. Then, after 11 seconds, state switches back to `false`, which allows the countdown to be triggered again."
  ]
}

export const metaTagsProps = {
  title: "RFH " + descItems.title,
  author: "Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>",
  description: descItems.title + " hook. " + descItems.paragraphs[0],
  keywords:
    "timeout, toggle, timeout toggle, useTimeoutToggle, react, fanmade, hooks, react fanmade hooks"
}

/**
 * Returns an app's theme `type` to spread as props in '*Spinner*' and '*Text*'
 * inside '*CmpTest*'.
 *
 * @param {number} second "second" in '*UseTimeoutToggle*'. An integer between 0
 *   and 9.
 */
export function getType(second) {
  switch (second) {
    case 1:
      return "danger-2"
    case 2:
      return "danger-1"
    case 3:
      return "danger"
    case 4:
      return "secondary-2"
    case 5:
      return "secondary-1"
    case 6:
      return "secondary"
    case 7:
      return "primary-2"
    case 8:
      return "primary-1"
    default:
      return "primary"
  }
}
