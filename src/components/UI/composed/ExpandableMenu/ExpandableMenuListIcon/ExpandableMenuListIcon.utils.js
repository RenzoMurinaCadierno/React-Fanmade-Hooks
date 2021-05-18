import styles from "./ExpandableMenuListIcon.module.css"

export const classes = {
  icon: (classNames = {}) => ({
    ...classNames,
    container: (classNames.container ?? "") + " " + styles.Icon
  })
}

export function getStyle(order, spread, show, amountOfIcons) {
  const translationAxis = spread === "right" || spread === "left" ? "X" : "Y"
  const topZeroIfAxisIsX = translationAxis === "X" ? { top: 0 } : {}
  const sign = spread === "left" || spread === "top" ? "-" : "+"

  return show
    ? {
        transform: `translate${translationAxis}(${sign + 150 * order}%)`,
        [spread]: "-160%",
        ...topZeroIfAxisIsX, // fix top = 0 (align to menu icon) for 'left' and 'right'
        opacity: 1,
        zIndex: amountOfIcons - order // overlay icons on 'left' and 'right'
      }
    : {
        transform: `translate${translationAxis}(0)`,
        [spread]: 0,
        ...topZeroIfAxisIsX,
        opacity: 0,
        visibility: "hidden"
      }
}
