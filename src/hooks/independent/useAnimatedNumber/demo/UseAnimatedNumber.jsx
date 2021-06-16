import { CmpDescription, Slots } from "hub"
import plainCode from "../utils/plain"
import {
  classes,
  descItemsObject,
  metaTagsProps
} from "./UseAnimatedNumber.utils"

/**
 * "useAnimatedNumber" hook example.
 *
 * Here, the hook is applied when:
 *
 *   * "star"s (game score units) change at "star" '*SlotScoreItem*', inside its
 *     '*SlotsBadgeWithScoreAnimation*', each time you score slots while playing
 *     the game.
 *
 *   * both "slot"s (slot units, like "apple", "lemon", "cherry", "berry"), and
 *     "stat"s ("heart" for lives left, and "star" for current score), are
 *     rendered on each '*SlotsBadgeWithScoreAnimation*' for each component
 *     inside '*SlotsResultSection*'. They appear when '*SlotsResultScreen*'
 *     triggers on game over.
 *
 * I kind of overdid it here, sorry. To keep it short, keep an eye on "star"
 * associated number changes when scoring slots, and check
 * '*SlotsBadgeWithScoreAnimation*' file as well as the hook in question.
 */
export default function UseAnimatedNumber() {
  return (
    <>
      <CmpDescription
        descItems={descItemsObject}
        {...{ plainCode, metaTagsProps }}
        classNames={classes.cmpDesc}
      />
      <Slots classNames={classes.cmpTest} />
    </>
  )
}
