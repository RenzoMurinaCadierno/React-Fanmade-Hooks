import cnp from "styles/classNameProcessor"
import linkedin from "assets/icons/linkedin.svg"
import twitter from "assets/icons/twitter.svg"
import facebook from "assets/icons/facebook.svg"
import instagram from "assets/icons/instagram.svg"
import styles from "./UseMediaQuery.module.css"

export const classes = {
  container: (mqView) =>
    cnp.join(styles.Container, styles[`Container-${mqView}`]),
  header: (mqView) => cnp.join(styles.Header, styles[`Header-${mqView}`]),
  descAndMQs: (mqView) =>
    cnp.join(styles.DescAndMQs, styles[`DescAndMQs-${mqView}`]),
  cmpDesc: (mqView) => ({
    container: styles.CmpDescContainer,
    description: cnp.join(
      styles.CmpDescContent,
      styles[`CmpDescContent-${mqView}`]
    )
  }),
  currentMQs: styles.CurrentMQs,
  mqSeparation: (mqView) =>
    cnp.join(styles[`MQSeparation-${mqView}`], styles.MQSeparation)
}

export const descItems = {
  title: "useMediaQuery",
  paragraphs: [
    "Grants access to default and custom media queries' states.",
    "Try resizing the screen. Icons disable in portrait view. In landscape view, they change color to blue on width <600px, light blue on width >600px and to orange on width >1234px.",
    'This example does not use "@media" rules in CSS files.'
  ]
}

export const metaTagsProps = {
  title: "RFH " + descItems.title,
  author: "Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>",
  description: descItems.title + " hook. " + descItems.paragraphs[0],
  keywords:
    "media, query, media query, useMediaQuery, react, fanmade, hooks, react fanmade hooks"
}

export const socialMediaNamesAndJSXs = [
  ["Linkedin", <img src={linkedin} alt="linkedin" />],
  ["Twitter", <img src={twitter} alt="twitter" />],
  ["Facebook", <img src={facebook} alt="facebook" />],
  ["Instagram", <img src={instagram} alt="instagram" />],
  ["Icon as...", "ia"],
  ["...plain text", "pt"]
]
