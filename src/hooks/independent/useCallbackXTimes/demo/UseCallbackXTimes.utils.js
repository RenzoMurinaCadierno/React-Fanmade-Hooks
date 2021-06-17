import styles from "./UseCallbackXTimes.module.css"

/**
 * Controls the times the callback passed to the hook will trigger. It is
 * hard-coded to 3 as an example, but use any positive integer you like.
 *
 * The hook will automatically fall back to 1 if anything that's not a positive
 * is used.
 */
export const tosses = 3

export const classes = {
  cmpDesc: {
    container: styles.CmpDescContainer,
    description: styles.CmpDescDescription
  },
  cmpTest: styles.CmpTest,
  animatedText: styles.AnimatedText,
  coin: { container: styles.CoinContainer }
}

export const descItems = {
  title: "useCallbackXTimes",
  paragraphs: [
    "Triggers an assigned callback the specified amount of times.",
    `Try tapping coins below. "Updated!" text's mount state is triggered by the hook, which fires up to ${tosses} time${
      tosses === 1 ? "" : "s"
    }.`,
    `Once any coin reaches ${tosses} tosses, tap its "Coin toss" text to reset its callback's count.`
  ]
}

export const metaTagsProps = {
  title: "RFH " + descItems.title,
  author: "Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>",
  description: descItems.title + " hook. " + descItems.paragraphs[0],
  keywords:
    "callback, useCallbackXTimes, react, fanmade, hooks, react fanmade hooks"
}
