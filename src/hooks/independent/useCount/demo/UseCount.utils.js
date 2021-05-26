import styles from "./UseCount.module.css"

export const descItemsObject = {
  title: "useCount",
  paragraphs: [
    "Gets a count state and its increase, decrease, reset and step handlers, as well as its step's state.",
    "Try increasing/decreasing count below, resetting it and setting its step."
  ]
}

export const classes = {
  cmpTest: styles.CmpTest,
  countBar: {
    container: styles.CountContainer
  },
  stepCountBar: {
    container: styles.StepCountContainer,
    minusButton: styles.StepCountBarButton,
    plusButton: styles.StepCountBarButton
  }
}
