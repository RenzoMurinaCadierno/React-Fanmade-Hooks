import styles from "./UseCallbackOnce.module.css"

export const classes = {
  cmpDesc: { container: styles.CmpTitle },
  cmpTest: styles.CmpTest,
  button: styles.Button
}

export const descItemsObject = {
  title: "useCallbackOnce",
  paragraphs: [
    "Triggers an assigned callback one time only.",
    "Try tapping the button below to modify the counter.",
    "Flipping the switch on will make the button work only once."
  ]
}

export function getButtonType(isCountLimitActive, wasCountInvoked) {
  return !isCountLimitActive
    ? "primary"
    : wasCountInvoked
    ? "secondary-1"
    : "secondary"
}

export function getButtonText(isCountLimitActive, wasCountInvoked) {
  return !isCountLimitActive
    ? "I work endlessly"
    : wasCountInvoked
    ? "I broke :c"
    : "Now I'm fragile"
}
