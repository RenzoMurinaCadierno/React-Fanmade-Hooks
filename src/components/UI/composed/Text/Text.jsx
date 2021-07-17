import Text from "components/UI/independent/Text/Text"
import TextWithAnimation from "components/UI/combined/Text/TextWithAnimation/TextWithAnimation"
import TextWithOrientation from "components/UI/combined/Text/TextWithOrientation/TextWithOrientation"

const constants = {
  animation: { types: {
    translate: {
      HORIZONTAL_LEFT_TO_RIGHT: 'HORIZONTAL_LEFT_TO_RIGHT', 
      HORIZONTAL_RIGHT_TO_LEFT: 'HORIZONTAL_RIGHT_TO_LEFT', 
      VERTICAL_TOP_TO_DOWN: 'VERTICAL_TOP_TO_DOWN', 
      VERTICAL_DOWN_TO_TOP: 'VERTICAL_DOWN_TO_TOP', 
    },
    static: {
      HEART_BEAT: 'HEART_BEAT'
    },
    opacity: {
      SCALE_IN: 'SCALE_IN',
      SCALE_OUT: 'SCALE_OUT',
    }
  }}
}

function ComposedText(props) {
  return <Text {...props} />
}

ComposedText.WithAnimation = TextWithAnimation
ComposedText.WithOrientation = TextWithOrientation
ComposedText.constants = constants

export default ComposedText

start with constrants