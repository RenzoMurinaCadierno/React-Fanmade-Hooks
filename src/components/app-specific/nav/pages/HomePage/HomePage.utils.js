import { Text } from "hub"
import { urls } from "app.configs.json"
import mail from "assets/icons/mail.svg"
import linkedin from "assets/icons/linkedin.svg"
import github from "assets/icons/github.svg"
import styles from "./HomePage.module.css"

export const classes = {
  container: styles.Container,
  title: styles.Title,
  subtitle: styles.Subtitle,
  instructions: styles.Instructions
}

export const metaTagsProps = {
  title: "React Fanmade Hooks",
  author: "Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>",
  description: "Hooks for many needs made by React enthusiasts.",
  keywords: "react, fanmade, hooks, react fanmade hooks"
}

/**
 * Returns an object to pass to '*ExpandableMenu*'s
 * '*Icon.Expandable.WithToast*' on each `iconsProps.list` that triggers a
 * toast.
 *
 * Sets the correct `url` to open a new tab (github, linkedin) when tapping the
 * toast, as well as toast's `timeout` and `children` (rendered text)
 *
 * @param {string} text '*Toast*' `children`.
 * @param {string} url Link to open in a new tab when tapping '*Toast*' content.
 *
 * @returns {object} '*Icon.Expandable.WithToast*' inner '*Toast*' `props`.
 */
function getToastProps(text, url) {
  return {
    timeout: 4000,
    contentProps: { onClick: () => url && window.open(url, "_blank") },
    children: <Text type="primary">{text}</Text>
  }
}

/**
 * Sets some props for `iconsProps.aura` in '*ExpandableMenu*'
 */
export const menuIconProps = { aura: { size: "small", interval: "long" } }

/**
 * Sets props for `iconsProps.list` in '*ExpandableMenu*'. Github and linkedIn
 * icons will render an '*Icon.Expandable.WithToast*', and contact, a basic
 * '*Icon.Expandable*'.
 */
export const iconsProps = {
  list: [
    {
      icon: <img src={mail} alt="mail" />,
      content: "Contact",
      toastProps: getToastProps("Contact us at nmcadierno@gmail.com")
    },
    {
      icon: <img src={linkedin} alt="linkedin" />,
      content: "LinkedIn",
      toastProps: getToastProps(
        "Tap here to open author's LinkedIn",
        urls.linkedin
      )
    },
    {
      icon: <img src={github} alt="github" />,
      content: "Repository",
      toastProps: getToastProps(
        "Tap here to open Github's repository",
        urls.github.repo
      )
    }
  ]
}
