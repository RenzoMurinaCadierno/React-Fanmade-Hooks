import styles from "./Input.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container
}
