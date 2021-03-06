import { forwardRef, useState } from "react"
import { Input } from "hub"
// import styles from "./InputWithState.module.css"

/**
 * Renders a self-controlled '*Input*' or '*Input.Styled*'.
 *
 * @param {object} props
 *
 * `isStyled` (boolean): true renders '*Input.Styled*'. False, '*Input*'.
 *
 * `onChange?` (function): callback to trigger when input changes.
 *
 * `...otherProps?` (object): Props to spread in '*Input*'.
 *
 * @param {React.Ref} ref A reference to this input.
 */
function InputWithState({ isStyled, onChange, ...otherProps }, ref) {
  const [val, setVal] = useState("")

  const handleChange = (e) => {
    setVal(e.target.value)
    onChange?.(e)
  }

  return isStyled ? (
    <Input.Styled
      value={val}
      ref={ref}
      onChange={handleChange}
      {...otherProps}
    />
  ) : (
    <Input value={val} ref={ref} onChange={handleChange} {...otherProps} />
  )
}

export default forwardRef(InputWithState)
