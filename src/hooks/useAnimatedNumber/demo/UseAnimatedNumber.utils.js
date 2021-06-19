import styles from "./UseAnimatedNumber.module.css"

export const classes = {
  cmpDesc: {
    container: styles.CmpDescContainer,
    description: styles.CmpDescContent
  },
  cmpTest: { container: styles.CmpTest }
}

export const descItems = {
  title: "useAnimatedNumber",
  paragraphs: [
    "Animates a number when it changes. Accepts custom timeout, iterations and step, as well as decimal precision and callbacks on start/iteration/end.",
    "Try some slots. Scoring increases star's count with this hook's default effect."
  ]
}

export const metaTagsProps = {
  title: "RFH " + descItems.title,
  author: "Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>",
  description: descItems.title + " hook. " + descItems.paragraphs[0],
  keywords:
    "animated, number, animated number, useAnimatedNumber, react, fanmade, hooks, react fanmade hooks"
}
