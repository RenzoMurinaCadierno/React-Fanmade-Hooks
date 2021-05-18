import styles from "./UsePreviousValue.module.css"

export const classes = {
  prevRolls: styles.PrevRolls,
  diceRoll: styles.DiceRoll,
  division: styles.Division,
  border: styles.Border
}

export const descItemsObject = {
  title: "usePreviousValue",
  paragraphs: ["Saves the former value.", "Try rolling the die."]
}

/**
 * Props to spread on "die" '*Container*' in '*PrevRollContainer*'. Fixed here
 * as not to recalculate them each time '*PrevRollContainer*' re-renders
 */
export const prevRollContainerProps = {
  alignItems: "flex-start",
  roundBorders: true,
  type: "secondary",
  className: classes.border
}
