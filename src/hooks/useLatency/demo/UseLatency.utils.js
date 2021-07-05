import styles from "./UseLatency.module.css"

export const descItems = {
  title: "useCount",
  paragraphs: [
    "Simulates latency with a promise that resolves at a specified amount of ms. Can be prematurely resolved or rejected.",
    "Try replicating the code! Starting fires a latency that keeps game on.",
    "Upon expiration, a life is lost and latency fires again. Scoring aborts and re-triggers. On no lives left or when tapping the button twice, latency releases, ending the game."
  ]
}

export const classes = {
  container: styles.Container,
  cmpDesc: {
    container: styles.CmpDescContainer,
    title: styles.CmpDescTitle,
    description: styles.CmpDescDescription
  },
  cmpTest: { container: styles.CmpTest }
}

export const codeMenuProps = {
  mqToAnchor: { pt: "bottom-right", default: "top-right" }
}

export const metaTagsProps = {
  title: "RFH " + descItems.title,
  author: "Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>",
  description: descItems.title + " hook. " + descItems.paragraphs[0],
  keywords: "latency, useLatency, react, fanmade, hooks, react fanmade hooks"
}
