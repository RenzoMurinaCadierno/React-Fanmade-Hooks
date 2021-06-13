import { forwardRef } from "react"
import Input from "components/UI/independent/Input/Input"
import InputWithState from "components/UI/combined/Input/InputWithState/InputWithState"
import InputStyled from "components/UI/combined/Input/InputStyled/InputStyled"
import InputWithValidation from "components/UI/combined/Input/InputWithValidation/InputWithValidation"
import InputWithValidationBubbles from "components/UI/combined/Input/InputWithValidationBubbles/InputWithValidationBubbles"

// must be spreaded as an object since it is wrapped in forwardRef.
// Thus, object is not extensible
const ComposedInput = { ...Input }

const InputStyledWithState = forwardRef(function (props, ref) {
  return <InputWithState {...props} isStyled ref={ref} />
})

function InputStyledWithValidation(props) {
  return <InputWithValidation {...props} isStyled />
}

function InputStyledWithValidationBubbles(props) {
  return <InputWithValidationBubbles {...props} isStyled />
}

ComposedInput.WithState = InputWithState
ComposedInput.WithValidation = InputWithValidation
ComposedInput.WithValidationBubbles = InputWithValidationBubbles
ComposedInput.Styled = InputStyled
ComposedInput.Styled.WithState = InputStyledWithState
ComposedInput.Styled.WithValidation = InputStyledWithValidation
ComposedInput.Styled.WithValidationBubbles = InputStyledWithValidationBubbles

export default ComposedInput
