import styles from "./UseValueToggle.module.css"

export const classes = {
  cmpDesc: { description: styles.CmpDescDescription },
  cmpTest: styles.CmpTest,
  growText: styles.GrowText,
  heart: styles.Heart,
  heartbeat: styles.Heartbeat
}

export const descItems = {
  title: "useValueToggle",
  paragraphs: [
    'Toggles a value related to "on" state when invoked by the returned handler, which automatically turns back to another value assigned to "off" state after a specified timeout.',
    'Try tapping the heart. A "heart-beating" animation className will be added to it, and removed after 2.5 seconds.'
  ]
}

export const metaTagsProps = {
  title: "RFH " + descItems.title,
  author: "Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>",
  description: descItems.title + " hook. " + descItems.paragraphs[0],
  keywords:
    "value, toggle, value toggle, useValueToggle, react, fanmade, hooks, react fanmade hooks"
}
