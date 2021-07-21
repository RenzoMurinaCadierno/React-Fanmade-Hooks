import Text from "components/UI/independent/Text/Text"
import TextWithLayout from "components/UI/combined/Text/TextWithLayout/TextWithLayout"
import TextWithRandomizedLayout from "components/UI/combined/Text/TextWithRandomizedLayout/TextWithRandomizedLayout"

function ComposedText(props) {
  return <Text {...props} />
}

ComposedText.WithLayout = TextWithLayout
ComposedText.WithRandomizedLayout = TextWithRandomizedLayout

export default ComposedText
