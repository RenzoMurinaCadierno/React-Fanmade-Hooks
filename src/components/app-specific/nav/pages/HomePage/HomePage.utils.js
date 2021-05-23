import styles from "./HomePage.module.css"
import { urls } from "app.configs.json"

export const classes = {
  container: styles.Container,
  title: styles.Title,
  subtitle: styles.Subtitle,
  instructions: styles.Instructions
}

/**
 * Object with keys 'mail', 'linkedin' and 'github', each with an object
 * as value containing '*ToastWithPortal*' `content` and `onClick`.
 */
export const toastData = {
  mail: {
    content: "Contact us at nmcadierno@gmail.com",
    onClick: null
  },
  linkedin: {
    content: "Tap here to open author's LinkedIn",
    onClick: () => window.open(urls.linkedin)
  },
  github: {
    content: "Tap here to open Github's repository",
    onClick: () => window.open(urls.github.repo)
  },
  noId: {
    content: "Either null pointer or easter egg. I'd rather the latter ;)",
    onClick: null
  }
}
