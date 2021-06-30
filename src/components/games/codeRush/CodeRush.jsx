import CodeRushRoot from "./CodeRushRoot/CodeRushRoot"
import CodeRushCode from "./CodeRushCode/CodeRushCode"
import CodeRushLives from "./CodeRushLives/CodeRushLives"
import CodeRushNumPad from "./CodeRushNumPad/CodeRushNumPad"
import CodeRushCounter from "./CodeRushCounter/CodeRushCounter"
import CodeRushStateContainer from "./CodeRushStateContainer/CodeRushStateContainer"
import CodeRushStats from "./CodeRushStats/CodeRushStats"
import CodeRushTimerButton from "./CodeRushTimerButton/CodeRushTimerButton"

const constants = {
  MAX_LIVES: 5,
  difficulty: { EASY: 1, NORMAL: 2, HARD: 3 },
  texts: {
    code: {
      START_GAME: "Tap button to start",
      GAME_OVER: "Game over! Again?"
    },
    timer: {
      START_GAME: "Start game",
      PROMPT_RESTART: "Tap to restart",
      BONUS_TIME: "Bonus time!"
    }
  }
}

function CodeRush(props) {
  return <CodeRushStateContainer {...props} />
}

CodeRush.Root = CodeRushRoot
CodeRush.Code = CodeRushCode
CodeRush.Lives = CodeRushLives
CodeRush.NumPad = CodeRushNumPad
CodeRush.Counter = CodeRushCounter
CodeRush.Stats = CodeRushStats
CodeRush.TimerButton = CodeRushTimerButton
CodeRush.constants = constants

export default CodeRush
