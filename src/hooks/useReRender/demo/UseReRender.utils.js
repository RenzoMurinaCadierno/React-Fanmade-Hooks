import cnp from "styles/classNameProcessor"
import styles from "./UseReRender.module.css"

export const classes = {
  container: styles.Container,
  cmpDesc: { container: styles.CmpContainer, description: styles.CmpDesc },
  cmpTest: styles.Grid,
  arrow: (direction) =>
    styles.Arrow + cnp.if(direction, styles["arrow-" + direction]),
  button: styles.Button
}

export const descItems = {
  title: "useReRender",
  paragraphs: [
    "Forces the component to re-render.",
    "Try tapping an arrow first and the button in the middle afterwards.",
    "Notification bar's orientation and active states are stored in a useRef hook, which does not re-render the component when it changes.",
    "The button in the middle forces a re-render, thus triggering the notification with its new orientation."
  ]
}

export const metaTagsProps = {
  title: "RFH " + descItems.title,
  author: "Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>",
  description: descItems.title + " hook. " + descItems.paragraphs[0],
  keywords:
    "render, re-render, re render, useReRender, react, fanmade, hooks, react fanmade hooks"
}

/**
 * Strings to pass as "key", "data-direction" and "className" arguement to
 * rendered arrow images.
 */
export const directionStrings = ["top", "right", "left", "bottom"]

/**
 * '*Toast*' texts to render depending on "direction"
 */
export const toastTexts = {
  center: "Tap an arrow first! ._.",
  top: "A little vertigo @.@",
  right: "Flippin' righty >.>",
  left: "Turnin' lefty <.<",
  bottom: "Hello from down here! :D"
}
