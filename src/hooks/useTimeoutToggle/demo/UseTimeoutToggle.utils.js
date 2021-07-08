import styles from "./UseTimeoutToggle.module.css"

export const classes = {
  cmpDesc: { description: styles.CmpDescDescription },
  spinnerContainer: styles.SpinnerContainer
}

export const descItems = {
  title: "useValueToggle",
  paragraphs: [
    'Toggles a value related to "on" state when invoked by the returned handler, which automatically turns back to another value assigned to "off" state after a specified timeout.',
    'Try tapping the heart. A "heart-beating" animation className will be added to it, and removed after 2.5 seconds.'
  ]
}

export const metaTagsProps = {
  title: "RFH " + descItems.title,
  author: "Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>",
  description: descItems.title + " hook. " + descItems.paragraphs[0],
  keywords:
    "value, toggle, value toggle, useValueToggle, react, fanmade, hooks, react fanmade hooks"
}

export function getType(second) {
  switch (second) {
    case 1:
      return "danger-2"
    case 2:
      return "danger"
    case 3:
      return "secondary-2"
    case 4:
      return "secondary"
    case 5:
      return "primary-2"
    default:
      return "primary"
  }
}
