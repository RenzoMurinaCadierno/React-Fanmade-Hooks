import styles from "./UseAnimatedNumber.module.css"

export const classes = {
  cmpDesc: {
    container: styles.CmpDescContainer,
    description: styles.CmpDescContent
  },
  cmpTest: { container: styles.CmpTest }
}

export const descItemsObject = {
  title: "useAnimatedNumber",
  paragraphs: [
    "Animates a number when it changes. Accepts custom timeout, iterations and step, as well as decimal precision and callbacks on start/iteration/end.",
    "Try some slots. Scoring increases star's count with this hook's default effect."
  ]
}
