import CodeRushRoot from "./CodeRushRoot/CodeRushRoot"
import CodeRushCode from "./CodeRushCode/CodeRushCode"
import CodeRushLives from "./CodeRushLives/CodeRushLives"
import CodeRushNumPad from "./CodeRushNumPad/CodeRushNumPad"
import CodeRushCounter from "./CodeRushCounter/CodeRushCounter"
import CodeRushStats from "./CodeRushStats/CodeRushStats"
import CodeRushTimerButton from "./CodeRushTimerButton/CodeRushTimerButton"

const constants = {
  MAX_LIVES: 5,
  difficulty: { EASY: 1, NORMAL: 2, HARD: 3 }
}

function CodeRush(props) {
  return <CodeRushRoot {...props} />
}

CodeRush.Code = CodeRushCode
CodeRush.Lives = CodeRushLives
CodeRush.NumPad = CodeRushNumPad
CodeRush.Counter = CodeRushCounter
CodeRush.Stats = CodeRushStats
CodeRush.TimerButton = CodeRushTimerButton
CodeRush.constants = constants

export default CodeRush
