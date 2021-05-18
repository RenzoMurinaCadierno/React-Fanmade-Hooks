import styles from "./Icon.module.css"

export const classes = {
  container: (type, className) =>
    (className ?? "") +
    " " +
    (type ? styles[type] : "") +
    " " +
    styles.Container
}
