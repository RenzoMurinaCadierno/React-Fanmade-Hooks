import Button from "components/UI/independent/Button/Button"
import ButtonWithProgress from "components/UI/combined/Button/ButtonWithProgress/ButtonWithProgress"
import ButtonWithSpinner from "components/UI/combined/Button/ButtonWithSpinner/ButtonWithSpinner"

function ComposedButton(props) {
  return <Button {...props} />
}

ComposedButton.WithProgress = ButtonWithProgress
ComposedButton.WithSpinner = ButtonWithSpinner

export default ComposedButton
