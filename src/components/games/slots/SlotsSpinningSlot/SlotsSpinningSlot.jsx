import { useState, useCallback, memo, useEffect } from "react"
import { Carousel } from "hub"
import { classes } from "./SlotsSpinningSlot.utils"

// stable timeouts: 500 300 200css
// cannot add PropTypes as it is a memoized component. However, they are
// available in *utils.js* if you wish to chech them up

/**
 * Renders one spinning slot and controls its on/off play state, as well
 * as its onClick callback.
 *
 * @param {object} props
 *
 * `slotsArray` (Array): an array of sub-arrays, each sub-array
 *   belonging to one single item in the spinning slot, shape:
 *   * (element 1) slot item name ("apple", "cherry", "lemon", "berry"),
 *   * (element 2): Path to its svg image,
 *   * (element 3): image alt.
 *  E.g.: given this `slotsArray`:
 * > [
 * >   ["apple", appleSvg, appleAlt], ["cherry", cherrySvg, cherryAlt],
 * >   ["lemon", lemonSvg, lemonAlt], ["berry", berrySvg, berryAlt],
 * >   ["cherry", cherrySvg, cherryAlt], ["lemon", lemonSvg, lemonAlt],
 * > ]
 * > The spinning slot will contain 1 apple, 2 cherries, 2 lemons and
 * >   1 berry as its items, and will continuously loop through them.
 *
 * `onSlotClick?` (function): callback triggered when clicking on the
 *   spinning slot. Recieves the landing slot item's name as argument.
 *
 * `areSlotsActive` (boolean): false disables the spinning slot, removing
 *   this component's ability to re-enable it by itself. True enables
 *   spinning again, returning this component the control of its spinning
 *   state.
 *
 * `renderIconInsteadOfSVGImg` (boolean): true renders default browser
 *   icons instead of an svg '*img*' component. Used for debugging or as
 *   image replacement if performance turns too slow due to the speed
 *   *'CarouselSlide'*s are rendering when slots are spinning.
 *   * **Note** Icons to render are taken from the second element of each
 *     sub-array in `slotsArray`.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 */
export default memo(function SlotsSpinningSlot({
  slotsArray,
  onSlotClick,
  areSlotsActive,
  renderIconInsteadOfSVGImg,
  classNames = {}
}) {
  // inner active (spinning) state. Defaults to parent's generic active
  // state for all slots. Fallbacks to false if undefined
  const [isActive, setIsActive] = useState(areSlotsActive ?? false)
  // on slot click, if it was spinning (active), stop it. Afterwards,
  // trigger `onSlotClick` passing the name of the landing slot item
  // as argument
  const handleStopSlot = useCallback(
    (_, { activeName }) => {
      if (isActive) {
        setIsActive(false)
        onSlotClick?.(activeName.slice(0, -2))
      }
    },
    [isActive, setIsActive, onSlotClick]
  )
  // enable or re-enable inner active (spinning) state only if parent's
  // state `areSlotsActive` is true
  useEffect(() => areSlotsActive && setIsActive(true), [areSlotsActive])

  return (
    // spinning slot, wrapper for all slot items it contains
    <Carousel.Root
      // allow scroll (spin) if parent's and inner state are both true
      autoScroll={areSlotsActive && isActive}
      // autoScrollInterval={310}
      autoScrollInterval={400}
      // no delay between slides (continuous spinning from one item to next)
      resumeAutoScrollTimeout={0}
      // if spinning is stopped, resume it when parent decides to
      resumeAutoScrollOn={areSlotsActive}
      showArrows={false} // remove '*Carousel*' default side arrows
      showIndicators={false} // remove '*Carousel*' default indicators
      disabled={!areSlotsActive} // disable when parent decides to
      onSlideClick={handleStopSlot}
      classNames={classes.slotCarousel(classNames.slotCarousel)}
    >
      {/* slot items inside spinning slot */}
      {slotsArray.map((itemArr) => (
        <Carousel.Slide
          key={itemArr[0]} // slot item's unique name (different for all slots)
          name={itemArr[0]}
          timeout={230}
          classNames={classes.slotSlide(classNames.slotSlide)}
        >
          {renderIconInsteadOfSVGImg ? (
            <div className={classes.slotIcon(classNames.slotIcon)}>
              {/* slot item's icon */}
              {itemArr[2]}
            </div>
          ) : (
            <img
              src={itemArr[1]} // slot item's svg path
              alt={itemArr[2]} // slot item's alt
              className={classes.slotImage(classNames.slotImage)}
            />
          )}
        </Carousel.Slide>
      ))}
    </Carousel.Root>
  )
})
