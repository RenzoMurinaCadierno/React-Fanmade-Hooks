import styles from "./ExpandableMenuMainIcon.module.css"

export const classes = {
  icon: (classNames = {}, open) => ({
    ...classNames,
    container:
      (classNames.container ?? "") +
      " " +
      (open ? styles.Open : "") +
      " " +
      styles.Icon
  }),
  aura: (className, open, type) =>
    (className ?? "") +
    " " +
    (open ? "" : styles.NotOpen) +
    " " +
    (type ? styles[type.toLowerCase()] : "") +
    " " +
    styles.Aura
}
