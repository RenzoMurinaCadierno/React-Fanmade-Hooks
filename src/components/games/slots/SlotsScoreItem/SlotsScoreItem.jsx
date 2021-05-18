import React from "react"
import { Slots } from "hub"
import { classes, slotsScoreItemPropTypes } from "./SlotsScoreItem.utils"

/**
 * Renders a *'SlotsBadgeWithScoreAnimation'* for each `badgesProps`, and
 * leaves children free to render an '*img*' on parent component,
 * representing the slot/stat.
 *
 * In other words:
 * * For "slots" (apple, cherry, lemon, berry), it adds all '*Badge*'s of
 *   availabe scores yet to hit in slots (1, 1, 2, 3) and their effects
 *   when one of those scores is archieved.
 * * For "stats" (star, heart), it adds one '*Badge*' representing the
 *   amount of lives and current score, and one '*Badge*' with their
 *   effects when their contents change.
 *
 * @param {object} props
 *
 * `children` (React.node): anything to visually display as a slot/stat
 *   image (normally an '*img*' tag). '*SlotsBadgeWithScoreAnimation*'
 *   are designed to be visually rendered around this node.
 *
 * `name` (string): slot's/stat's name ("apple", "lemon", "star", "heart").
 *
 * `badgesProps` (Array): array containing 1 to 4 plain objects with props
 *   to pass to each '*SlotsBadgeWithScoreAnimation*'. Correlates to
 *   incoming '*Badge*' props from 'slotsGame.reducer' state.
 *
 * `badgeEffectImgArray` (Array): array used to render "effect badge"
 *   '*img*' in '*SlotsBadgeWithScoreAnimation*'. It must be shape:
 *   * (element 1) Slot/Stat name ("apple", "lemon", "star", "heart", ...)
 *   * (element 2) Slot/Stat path to svg file.
 *   * (element 3) Slot/Stat img "alt".
 *
 * `scoreMultiplier?` (number): Defined only for slot badges ("apple",
 *   "cherry", "lemon", "berry"). It is the number each amount of
 *   hit scores will be multiplied by for each slot.
 *   * E.g.: `scoreMultiplier` for "apple" is 1. If "apple" was hit on its
 *      1x and 3x scores, then: 1 * (1 + 3) = 4, where multiplier is 1.
 *   * E.g.: `scoreMultiplier` for "berry" is 4. If "berry" was hit on its
 *      2x and 3x scores, then: 4 * (2 + 3) = 20, where multiplier is 4.
 *
 * `propThatTriggersScoreEffect` (number|boolean) A value
 *   '*SlotsBadgeWithScoreAnimation*' will listen at to trigger effect
 *   '*Badge*'. Further explained in '*SlotsBadgeWithScoreAnimation*'.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `otherBadgeProps?` (object): other additional badge props to pass to
 *   each rendered '*SlotsBadgeWithScoreAnimation*', besides the ones
 *   already stated in `badgesProps`.
 *
 * `otherContainerProps?` (object): additional props to pass to wrapper
 *   '*div*'.
 */
export default function SlotsScoreItem({
  children,
  name,
  badgesProps = [],
  badgeEffectImgArray, // prop drill to avoid 1 import for each badge
  scoreMultiplier,
  propThatTriggersScoreEffect,
  classNames = {},
  otherBadgeProps = {},
  ...otherContainerProps
}) {
  return (
    <div
      className={classes.container(classNames.container)}
      {...otherContainerProps}
    >
      {badgesProps.map((badgeProps) => (
        <Slots.BadgeWithScoreAnimation
          name={name}
          badgeEffectImgSrc={badgeEffectImgArray[1]} // path to svg
          badgeEffectImgAlt={badgeEffectImgArray[2]} // "alt"
          scoreMultiplier={scoreMultiplier}
          triggerScoreEffectOn={badgeProps[propThatTriggersScoreEffect]}
          {...badgeProps}
          classNames={classes.badge(classNames.badge)}
          {...otherBadgeProps}
        />
      ))}
      {children}
    </div>
  )
}

SlotsScoreItem.propTypes = slotsScoreItemPropTypes
