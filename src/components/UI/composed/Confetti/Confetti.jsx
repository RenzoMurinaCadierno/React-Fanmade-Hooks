import ConfettiContainer from "components/UI/combined/Confetti/ConfettiContainer/ConfettiContainer"
import ConfettiGlitter from "components/UI/combined/Confetti/ConfettiGlitter/ConfettiGlitter"
import ConfettiGuides from "components/UI/combined/Confetti/ConfettiGuides/ConfettiGuides"

function Confetti(props) {
  return <ConfettiContainer {...props} />
}

Confetti.Glitter = ConfettiGlitter
Confetti.Guides = ConfettiGuides

export default Confetti
