import ConfettiCannon from "components/UI/combined/Confetti/ConfettiCannon/ConfettiCannon"
import ConfettiGlitter from "components/UI/combined/Confetti/ConfettiGlitter/ConfettiGlitter"
import ConfettiGuideX from "components/UI/combined/Confetti/ConfettiGuides/ConfettiGuideX/ConfettiGuideX"
import ConfettiGuideY from "components/UI/combined/Confetti/ConfettiGuides/ConfettiGuideY/ConfettiGuideY"
import ConfettiGuides from "components/UI/combined/Confetti/ConfettiGuides/ConfettiGuides"
import ConfettiPaperPiece from "components/UI/combined/Confetti/ConfettiPaperPiece/ConfettiPaperPiece"

function Confetti(props) {
  return <ConfettiCannon {...props} />
}

Confetti.Glitter = ConfettiGlitter
Confetti.Guides = ConfettiGuides
Confetti.Guides.X = ConfettiGuideX
Confetti.Guides.Y = ConfettiGuideY
Confetti.PaperPiece = ConfettiPaperPiece

export default Confetti
