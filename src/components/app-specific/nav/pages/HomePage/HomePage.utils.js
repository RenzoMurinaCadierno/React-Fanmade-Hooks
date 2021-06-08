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

function getToastProps(text, url) {
  return {
    timeout: 4000,
    contentProps: { onClick: () => url && window.open(url, "_blank") },
    children: <Text type="primary">{text}</Text>
  }
}

export const menuIconProps = { aura: { size: "small", interval: "long" } }

export const iconsProps = {
  list: [
    {
      icon: <img src={mail} alt="mail" />,
      content: "Contact",
      toastProps: getToastProps("Contact us at nmcadierno@gmail.com")
      // onClick: null
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
      // onClick: () => window.open(urls.github.repo)
    }
  ]
  // noId: {
  // content: "Either null pointer or easter egg. I'd rather the latter ;)",
  // onClick: null
  // }
}

// /**
//  * Object with keys 'mail', 'linkedin' and 'github', each with an object
//  * as value containing '*ToastWithPortal*' `content` and `onClick`.
//  */
// export const toastData = {
//   mail: {
//     content: "Contact us at nmcadierno@gmail.com",
//     // onClick: null
//   },
//   linkedin: {
//     content: "Tap here to open author's LinkedIn",
//     toastProps: getToastProps(urls.linkedin, "Contact us at nmcadierno@gmail.com")
//   },
//   github: {
//     content: "Tap here to open Github's repository",
//     toastProps: getToastProps(urls.github.repo)
//     // onClick: () => window.open(urls.github.repo)
//   },
//   noId: {
//     content: "Either null pointer or easter egg. I'd rather the latter ;)",
//     // onClick: null
//   }
// }
