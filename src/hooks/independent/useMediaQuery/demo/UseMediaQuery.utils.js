import styles from "./UseMediaQuery.module.css"
import linkedin from "assets/icons/linkedin.svg"
import twitter from "assets/icons/twitter.svg"
import facebook from "assets/icons/facebook.svg"
import instagram from "assets/icons/instagram.svg"

export const classes = {
  container: (mqView) => styles[`Container-${mqView}`] + " " + styles.Container,
  header: (mqView) => styles[`Header-${mqView}`] + " " + styles.Header,
  descAndMQs: (mqView) =>
    styles[`DescAndMQs-${mqView}`] + " " + styles.DescAndMQs,
  cmpDesc: (mqView) => ({
    container: styles.CmpDescContainer,
    description:
      styles[`CmpDescContent-${mqView}`] + " " + styles.CmpDescContent
  }),
  currentMQs: styles.CurrentMQs,
  mqSeparation: (mqView) =>
    styles[`MQSeparation-${mqView}`] + " " + styles.MQSeparation
}

export const descItemsObject = {
  title: "useMediaQuery",
  paragraphs: [
    "Grants access to default and custom media queries' states.",
    "Try resizing the screen. Icons disable in portrait view. In landscape view, they change color to blue on width <600px, light blue on width >600px and to orange on width >1234px.",
    'This example does not use "@media" rules in CSS files.'
  ]
}

export const socialMediaNamesAndJSXs = [
  ["Linkedin", <img src={linkedin} alt="linkedin" />],
  ["Twitter", <img src={twitter} alt="twitter" />],
  ["Facebook", <img src={facebook} alt="facebook" />],
  ["Instagram", <img src={instagram} alt="instagram" />],
  ["Icon as...", "ia"],
  ["...plain text", "pt"]
]
