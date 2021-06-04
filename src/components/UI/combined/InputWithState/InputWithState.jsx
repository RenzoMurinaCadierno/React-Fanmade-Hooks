import { forwardRef, useCallback, useState } from "react"
import { Input } from "hub"
// import styles from "./InputWithState.module.css"

/**
 * Renders a self-controlled '*Input*'.
 *
 * @param {object} props
 *
 * * `onChange?` (function): callback to trigger when input changes.
 *
 * `...otherProps?` (object): Props to spread in '*Input*'.
 *
 * @param {React.Ref} ref A reference to this input.
 */
function InputWithState({ onChange, ...otherProps }, ref) {
  const [val, setVal] = useState("")

  const handleChange = useCallback(
    (e) => {
      setVal(e.target.value)
      onChange?.(e)
    },
    [onChange, setVal]
  )

  return <Input value={val} ref={ref} onChange={handleChange} {...otherProps} />
}

export default forwardRef(InputWithState)
