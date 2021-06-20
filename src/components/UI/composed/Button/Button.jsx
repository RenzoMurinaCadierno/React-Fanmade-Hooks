import Button from "components/UI/independent/Button/Button"
import ButtonWithSpinner from "components/UI/combined/ButtonWithSpinner/ButtonWithSpinner"

function ComposedButton(props) {
  return <Button {...props} />
}

ComposedButton.WithSpinner = ButtonWithSpinner

export default ComposedButton
