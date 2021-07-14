import styles from "./UseToggle.module.css"

export const classes = {
  container: styles.Container,
  cmpDesc: {
    title: styles.Title
  }
}

export const descItems = {
  title: "useToggle",
  paragraphs: [
    "Switches state between `true` and `false`.",
    "Try to toggle typing below."
  ]
}

export const metaTagsProps = {
  title: "RFH " + descItems.title,
  author: "Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>",
  description: descItems.title + " hook. " + descItems.paragraphs[0],
  keywords: "toggle, useToggle, react, fanmade, hooks, react fanmade hooks"
}
