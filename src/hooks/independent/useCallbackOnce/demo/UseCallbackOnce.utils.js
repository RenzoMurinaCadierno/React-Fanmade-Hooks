import styles from "./UseCallbackOnce.module.css"

export const classes = {
  cmpTitle: { container: styles.CmpTitle },
  cmpDesc: styles.Grid,
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
