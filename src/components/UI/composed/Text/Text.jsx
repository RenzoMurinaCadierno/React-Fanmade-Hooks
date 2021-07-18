import Text from "components/UI/independent/Text/Text"
import TextWithOrientation from "components/UI/combined/Text/TextWithOrientation/TextWithOrientation"

function ComposedText(props) {
  return <Text {...props} />
}

ComposedText.WithOrientation = TextWithOrientation

export default ComposedText
