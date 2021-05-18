import { useEffect, useRef, useState } from "react"
import { Badge, BadgeWithAnimatedNumber, Slots, useMountFlag } from "hub"
import {
  classes,
  hookConfigs,
  slotsBadgeWithScoreAnimationPropTypes
} from "./SlotsBadgeWithScoreAnimation.utils"

/**
 * Renders a score '*Badge*' and its "score effect" for each "slot" (apple,
 *   cherry, lemon, berry) and for each "stat" (heart, star) on game screen.
 *
 * It returns one of:
 *
 * * a '*BadgeWithAnimatedNumber*' to display the available score yet to
 *     obtain for each "slot" (1, 1, 2, 3), and a '*SlotsEffectBadgeContent*'
 *     which triggers when that score is hit. (E.g.: if "2" is available for
 *     "apple" and you get "apple cherry apple" on slots, it fires off).
 *
 * * a '*BadgeWithAnimatedNumber*' to display the current value of "heart"
 *     and "star" (remaning lives and current score), and a
 *     '*SlotsEffectBadgeContent*' which triggers each time value changes
 *     (a life is lost or score increases/decreases).
 *
 * @param {object} props
 *
 * `name` (string): "Slot" or "stat" name. Example uses "apple", "cherry",
 *   "lemon", "berry" for slots, and "heart" and "star" for stats.
 *
 * `badgeEffectImgSrc` (string): Path to svg image to pass as `src` to
 *   '*SlotsEffectBadgeContent*' (the effect badge).
 *
 * `badgeEffectImgAlt` (string): image's "alt" prop to pass as `alt` to
 *   '*SlotsEffectBadgeContent*' (the effect badge).
 *
 * `scoreMultiplier?` (number): defined only for "slot" badges, as it
 *   correlates to `scoreMultiplier` in their `badgeProps` ("stat"
 *   badges lack this prop). It is used to calculate the number passed
 *   as `content` to '*SlotsEffectBadgeContent*'.
 *
 * `triggerScoreEffectOn?` (boolean|number): A value this component will
 *   listen at to trigger effect '*Badge*'. This example uses "show"
 *   boolean prop for "slot" badges (effect triggers when "show" is false,
 *   alas, when the related score is obtained), and "content" number prop
 *   for "stat" badges (fires each time their content changes: a life lost
 *   or star gain/loss).
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `badgeProps` (object): current badge's prop object. Used to delete
 *   `previousContent` from "star" stat badge. If this action is not
 *   taken, then `previousContent` will be passed as an invalid DOM
 *   property.
 */
export default function SlotsBadgeWithScoreAnimation({
  name,
  badgeEffectImgSrc,
  badgeEffectImgAlt,
  scoreMultiplier,
  triggerScoreEffectOn,
  classNames = {},
  ...badgeProps
}) {
  // state to trigger when to show "score effect" badge. It remains
  // hidden when slots are running, and shows when slots are stopped
  // and the main 'Badge' they are assigned to has its content changed
  const [isShowingScore, setIsShowingScore] = useState(false)

  // each 'Badge' that is not "star" badge (points) will trigger its
  // change animation instantly when their contents change. However,
  // we have to delay that animation for "star" badge when "show score
  // effect" respective badge finishes its animation. We manipulate that
  // with this setState here and on each useEffect below
  const [starContent, setStarContent] = useState(0)

  // "heart" and "star" badges remain the same on each render
  const isHeartBadge = useRef(name === "heart")
  const isStarBadge = useRef(name === "star")

  // flag mount phase to later avoid showing "score effect" unless mounted
  const isMounted = useMountFlag()

  // "heart" and "star" badges have an additional "previousContent" prop
  // to calculate their contents. If left as is, it would be assigned to
  // an invalid DOM prop, so remove it before spreading props in 'Badge'
  const filteredProps = { ...badgeProps }
  const isStatsBadge = filteredProps.hasOwnProperty("previousContent")

  if (isStatsBadge) delete filteredProps.previousContent

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    // first things first, do not do anything here before mounting
    if (isMounted) {
      // this useEffect controls "show" state of "score effect" badges.
      // Setting state to false will trigger their render on screen, as well
      // as setting main badge's content prop to false, thus hiding it.
      if (typeof triggerScoreEffectOn === "boolean") {
        // "score" badges' "score effect" "show" state are handled by booleans
        !triggerScoreEffectOn && setIsShowingScore(true)
      } else {
        // "stats" badges are controlled by an incremental integer. This is
        // such to trigger main badge animation state on each "content" change
        // and to leave their "show" prop intact
        setIsShowingScore(true)
        // "star" stat's "content" badge will keep its previous state here,
        // and change on next useEffect. This is to let "score effect" play
        // before changing "content", for a better UX
        isStarBadge.current && setStarContent(badgeProps.previousContent)
      }
    }
  }, [triggerScoreEffectOn])

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let endAnimationTimeout = 0
    // if the previous useEffect triggered "show" state of "score effect"
    // badge, let its animation play and schedule a its unmount for when
    // it finishes. If the animated main badge is the star (score), change
    // its "content" after "score effect"'s animation ends
    if (isShowingScore) {
      endAnimationTimeout = setTimeout(() => {
        setIsShowingScore(false)
        isStarBadge.current && setStarContent(badgeProps.content)
      }, 1050)
    }
    return () => clearTimeout(endAnimationTimeout)
  }, [isShowingScore])

  return (
    <>
      {isShowingScore && (
        <Badge
          anchor={badgeProps.anchor}
          type="primary-1"
          noBorder
          content={
            <Slots.EffectBadgeContent
              src={badgeEffectImgSrc}
              alt={badgeEffectImgAlt}
              // "star" badge (at game reset) and "heart" badge (always) have
              // their types inverted to indicate score substraction
              type={
                isHeartBadge.current ||
                (isStarBadge.current && !badgeProps.content)
                  ? "secondary"
                  : "primary"
              }
              // scoreMultiplier is defined for "score" badges, whose
              // content will equal prop.content * multiplier. It is
              // undefined for "stats" badges, whose content will always
              // be their current content minus the previous one
              content={
                scoreMultiplier
                  ? badgeProps.content * scoreMultiplier
                  : badgeProps.content - badgeProps.previousContent
              }
            />
          }
          // "star" badge has its animation reversed, meaning "score effect"
          // badge translateY downwards and all others, upwards. However, upon
          // game reset, "star" badge will animate upwards to visually indicate
          // score substraction
          classNames={classes.animated(
            isStarBadge.current && badgeProps.content,
            classNames.animated
          )}
        />
      )}
      <BadgeWithAnimatedNumber
        {...filteredProps}
        // "star" badge has its content handled by state, all others by props
        content={isStarBadge.current ? starContent : filteredProps.content}
        hookConfigs={hookConfigs}
        // "star" badge has its animation triggered later, when state changes.
        // All others' trigger instantly
        animateOn={isStarBadge.current && starContent}
        classNames={classes.main(classNames.main)}
      />
    </>
  )
}

SlotsBadgeWithScoreAnimation.propTypes = slotsBadgeWithScoreAnimationPropTypes
