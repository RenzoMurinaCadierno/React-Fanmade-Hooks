import Input from "components/UI/independent/Input/Input"
import InputWithState from "components/UI/combined/InputWithState/InputWithState"
import StyledInput from "components/UI/combined/StyledInput/StyledInput"
import StyledInputWithValidation from "components/UI/combined/StyledInputWithValidation/StyledInputWithValidation"

const ComposedInput = { ...Input }

ComposedInput.WithState = InputWithState
ComposedInput.Styled = StyledInput
ComposedInput.Styled.WithValidation = StyledInputWithValidation

export default ComposedInput
