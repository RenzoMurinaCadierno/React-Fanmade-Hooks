import { memo, useEffect, useState } from "react"
import { Confetti } from "hub"
go on commenting
function ConfettiStateContainer({ show, onStart, onFinish, ...otherProps }) {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (show && !isActive) {
      typeof onStart === "function" && onStart()
      setIsActive(true)
    }
  }, [show])

  useEffect(() => {
    let hideTimeoutId
    if (isActive) {
      hideTimeoutId = setTimeout(() => {
        setIsActive(false)
        typeof onFinish === "function" && onFinish()
      }, 2500)
    }
    return () => clearTimeout(hideTimeoutId)
  }, [isActive])

  return <Confetti.Cannon {...otherProps} show={isActive} />
}

export default memo(ConfettiStateContainer)
