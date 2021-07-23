import Text from "components/UI/independent/Text/Text"
import TextWithLayout from "components/UI/combined/Text/TextWithLayout/TextWithLayout"
import TextWithRandomizedLayout from "components/UI/combined/Text/TextWithRandomizedLayout/TextWithRandomizedLayout"

const constants = {
  htmlElems: {
    span: "span",
    p: "p",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6"
  },
  types: {
    PRIMARY: "primary",
    "PRIMARY-1": "primary-1",
    "PRIMARY-2": "primary-2",
    "PRIMARY-3": "primary-3",
    SECONDARY: "secondary",
    "SECONDARY-1": "secondary-1",
    "SECONDARY-2": "secondary-2",
    "SECONDARY-3": "secondary-3",
    DANGER: "danger",
    "DANGER-1": "danger-1",
    "DANGER-2": "danger-2",
    "DANGER-3": "danger-3"
  }
}

function ComposedText(props) {
  return <Text {...props} />
}

ComposedText.WithLayout = TextWithLayout
ComposedText.WithRandomizedLayout = TextWithRandomizedLayout
ComposedText.constants = constants

export default ComposedText
