import { Container, Slots, Text } from "hub"
import {
  classes,
  defaultProps,
  propTypes,
  getBadgeContent
} from "./SlotsResultSection.utils"

/**
 * Renders the UI for "final results" section once slot game ends (all
 * scores obtained or all lives lost).
 *
 * It can either display:
 *
 * * "slot results" section, with "slot" items ("apple", "lemon", "cherry",
 *   "berry"), their in-game obtained scores and their multiplier UI.
 *
 * * "stat results" section, with "stat" items ("heart", "star"), and a
 *   badge for each one containing the amount of lives left for "heart" and
 *   the added final score for "star".
 *
 * @param {object} props
 *
 * `isStatsSection?` (boolean): determines the section's title and
 *   '*SlotsResultItem*' `badgeContent` (the content for each "slot"/"stat"
 *   item). True makes this component behave as a "stat results" section,
 *   and false as a "slot results" one.
 *
 * `imageArrays` (Array): Array of sub-arrays, each one shape:
 * > * (element 1): either "slot" name ("apple", "cherry", "lemon", "berry")
 *   or "stat" name ("heart", "star").
 * > * (element 2): path to its svg image.
 * > * (element 3): image alt.
 *
 * `multiplierImageArray?` (Array): Defined only if this component is a
 *   "slot" result section. An array '*SlotsResultItem*' will use to render
 *   the UI for "slot" item multipliers, shaped:
 * > * (element 1): "multiplier" image name.
 * > * (element 2): path to its svg image.
 * > * (element 3): image alt.
 *
 * `scoreData?` (object): Defined only if this component is a "slot" result
 *   section. It is an object with keys matching the "slot" item's name
 *   ("apple", "cherry", "lemon", "berry"), and an object as their values,
 *   shape:
 * > * "1": <number>: quantity of "score" badges with "1" on its content,
 * > * "2": <number>: quantity of "score" badges with "2" on its content,
 * > * "3": <number>: quantity of "score" badges with "3" on its content,
 * > * "multiplier": <number> the multiplier to factor when a score was hit.
 *
 * **Note:** `scoreData` shape and functionality is further explained in
 *   'slotsGame.reducer' and 'slotsGame.utils' in "../store" folder.
 *
 * `badgesProps` (object): object with keys matching "slot"s names ("apple",
 *   "cherry", "lemon", "berry") or "stat"s names ("heart", "star"). Values
 *   for those keys must be one array containing from 1 to 4 plain objects
 *   with '*Badge*' props generate `badgeContent` to pass to
 *   '*SlotsResultItem*', using "getBadgeContent" function in *utils.js*.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 */
export default function SlotsResultSection({
  isStatsSection,
  imageArrays,
  multiplierImageArray,
  scoreData,
  badgesProps,
  classNames
}) {
  return (
    // wrapper container
    <Container
      type="secondary"
      roundBorders
      className={classes.container(classNames.container)}
    >
      {/* title */}
      <Text
        htmlElem="h5"
        type="secondary"
        textShadow
        bold
        italic
        className={classes.title(classNames.title)}
      >
        {isStatsSection ? "Final stats" : "Slots results"}
        {/* oblique background effect */}
        <div className={classes.titleBackground(classNames.titleBackground)} />
      </Text>
      {/* one '*SlotsResultItem*' for each prop object in 
        badgesProps[slotName] */}
      {imageArrays.map((imgArr) => {
        const [slotName, imgSrc, imgAlt] = imgArr
        const badgeContent = getBadgeContent(
          badgesProps[slotName],
          isStatsSection
        )
        return (
          <Slots.ResultItem
            key={slotName}
            badgeContent={badgeContent}
            imgSrc={imgSrc}
            imgAlt={imgAlt}
            // only "slot" badge props have `multiplier` defined
            multiplier={scoreData?.[slotName]?.multiplier}
            // and only them require `multiplierImageArray`
            multiplierImgSrc={multiplierImageArray?.[1]}
            multiplierImgAlt={multiplierImageArray?.[2]}
            classNames={classes.item(classNames.item)}
          />
        )
      })}
    </Container>
  )
}

SlotsResultSection.propTypes = propTypes
SlotsResultSection.defaultProps = defaultProps
