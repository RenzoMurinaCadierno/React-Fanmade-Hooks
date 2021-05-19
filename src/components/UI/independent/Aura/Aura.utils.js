import styles from "./Aura.module.css"

export const classes = {
  container: (isActive, type, forceCircularShape, noBorder, className) =>
    (className ?? "") +
    (isActive ? styles.Animate : "") +
    " " +
    (type ? styles[type.toLowerCase()] : "") +
    " " +
    (forceCircularShape ? styles.Circular : "") +
    " " +
    (noBorder ? styles.NoBorder : "") +
    " " +
    styles.Container
}
