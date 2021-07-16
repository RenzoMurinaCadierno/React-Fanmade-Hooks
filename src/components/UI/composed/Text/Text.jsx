import Text from "components/UI/independent/Text/Text"
import TextWithLayout from "components/UI/combined/Text/TextWtihLayout/TextWtihLayout"

function ComposedText(props) {
  return <Text {...props} />
}

ComposedText.WithLayout = TextWithLayout

export default ComposedText
