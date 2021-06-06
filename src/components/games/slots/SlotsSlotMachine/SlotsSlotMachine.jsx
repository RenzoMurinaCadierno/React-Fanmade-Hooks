import { Slots } from "hub"
import { classes, defaultProps, propTypes } from "./SlotsSlotMachine.utils"

/**
 * Renders one '*SlotsSpinningSlot*' for each array element in
 *   `slotsArrays`. That is, one spinning slot of the slot machine.
 *
 * @param {object} props
 *
 * `slotsArrays` (Array): Array of "slot item" sub-arrays. Each sub-array
 *   is passed to '*SlotsSpinningSlot*' which renders a "slot" item
 *   consecutively when its '*Carousel*' slides (provoking a slot machine
 *   effect).
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 */
export default function SlotsSlotMachine({
  slotsArrays,
  classNames,
  ...otherProps
}) {
  return (
    <div className={classes.container(classNames.container)}>
      {slotsArrays.map((slotsArr, i) => (
        <Slots.SpinningSlot
          key={i}
          slotsArray={slotsArr}
          classNames={classes.spinningSlot(classNames.spinningSlot)}
          {...otherProps}
        />
      ))}
    </div>
  )
}

SlotsSlotMachine.propTypes = propTypes
SlotsSlotMachine.defaultProps = defaultProps
