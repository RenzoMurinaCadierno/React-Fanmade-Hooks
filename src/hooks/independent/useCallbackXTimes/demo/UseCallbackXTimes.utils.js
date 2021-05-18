import styles from "./UseCallbackXTimes.module.css"

// This const controls the times the callback passed to the hook will trigger.
// Use any positive integer you wish. Negative values will fall back to 1 in
// the hook, but will break the UI.
export const tosses = 3

export const classes = {
  cmpTitle: { container: styles.CmpTitleContainer },
  cmpDesc: styles.Grid,
  coin: { container: styles.CoinContainer }
}

export const descItemsObject = {
  title: "useCallbackXTimes",
  paragraphs: [
    "Triggers an assigned callback the specified amount of times.",
    `Try tapping coins below. Each toss is registered ${tosses} time${
      tosses === 1 ? "" : "s"
    }.`,
    "At the last time, tap its text to reset callback's count."
  ]
}
