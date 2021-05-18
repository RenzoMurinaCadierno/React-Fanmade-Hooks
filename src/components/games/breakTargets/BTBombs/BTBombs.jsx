import { useCallback, useState, memo, useEffect } from "react"
import { classes, btBombsPropTypes } from "./BTBombs.utils"
import bomb from "../assets/bomb.svg"

function BTBombs({
  bombs,
  disabled,
  show = true,
  onClick,
  classNames = {},
  ...otherProps
}) {
  // array state with length === `bombs`
  const [bombQty, setBombQty] = useState(new Array(bombs).fill(null))

  const handleClick = useCallback(() => {
    // remove one bomb from the array and trigger `onClick`
    setBombQty((prevSt) => prevSt.slice(0, -1))
    onClick?.()
  }, [setBombQty, onClick])

  useEffect(() => {
    // on each new game, refill bombs array if there are less than `bombs`
    setBombQty((prevSt) =>
      show && prevSt.length < bombs ? new Array(bombs).fill(null) : prevSt
    )
  }, [show, bombs])

  return (
    <div className={classes.container(classNames.container)}>
      {show &&
        bombQty.map((_, i) => (
          <img
            key={i}
            src={bomb}
            alt="💣"
            disabled={disabled}
            onClick={disabled ? null : handleClick}
            className={classes.bomb(classNames.bomb)}
            {...otherProps}
          />
        ))}
    </div>
  )
}

BTBombs.propTypes = btBombsPropTypes

export default memo(BTBombs)
