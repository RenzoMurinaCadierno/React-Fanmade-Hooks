import Input from "components/UI/independent/Input/Input"
import InputWithState from "components/UI/combined/Input/InputWithState/InputWithState"
import InputStyled from "components/UI/combined/Input/InputStyled/InputStyled"
import InputWithValidation from "components/UI/combined/Input/InputWithValidation/InputWithValidation"
import { forwardRef } from "react"

// must be spreaded as an object since it is wrapped in forwardRef.
// Thus, object is not extensible
const ComposedInput = { ...Input }

// function InputStyledWithState(props) {
//   return React.forwardRef(<InputWithState {...props} isStyled />)
// }
test inputWithState, check all comments related to components where input/icon
are used, then change InputField. Afterwards, add all plainCodes 
const InputStyledWithState = forwardRef(function (props, ref) {
  return <InputWithState {...props} isStyled ref={ref} />
})

function InputStyledWithValidation(props) {
  return <InputWithValidation {...props} isStyled />
}

ComposedInput.WithState = InputWithState
ComposedInput.WithValidation = InputWithValidation
ComposedInput.Styled = InputStyled
ComposedInput.Styled.WithState = InputStyledWithState
ComposedInput.Styled.WithValidation = InputStyledWithValidation

export default ComposedInput
