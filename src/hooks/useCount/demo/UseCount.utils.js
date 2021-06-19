import styles from "./UseCount.module.css"

export const descItems = {
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

export const metaTagsProps = {
  title: "RFH " + descItems.title,
  author: "Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>",
  description: descItems.title + " hook. " + descItems.paragraphs[0],
  keywords: "count, useCount, react, fanmade, hooks, react fanmade hooks"
}
