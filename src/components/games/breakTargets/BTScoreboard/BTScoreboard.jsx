import { Text, Button, BT } from "hub"
import { classes, propTypes } from "./BTScoreboard.utils"

export default function BTScoreboard({
  gameSt, // <object> '*BTGame*' game state. Check PropTypes in *utils.js* for its consitution
  scores, // <object> Scores object for '*BTTargets*'. Check PropTypes in *utils.js*
  timerComponent, // <React.element> This is here for '*UseTimer*' demo. Leave it undefined, it will default to <BTTimer />
  onGameStart, // <function> callback to trigger on game start
  onGameReset, // <function> callback to trigger when game ends
  className // <string> className to attach to container <div /> here
}) {
  const { isGameActive, text, hits, points, speed, accSpeed, highScore } =
    gameSt
  const Timer = timerComponent ?? BT.Timer

  return (
    <div className={classes.container(className)}>
      <Text disabled={!isGameActive}>
        Hits: <span>{hits}</span>
      </Text>
      <Text disabled={!isGameActive}>
        Score: <span> {points} </span>
      </Text>
      <Text type="secondary" style={{ textAlign: "center" }}>
        High: <span> {highScore} </span>
      </Text>
      <Text disabled={!isGameActive}>Speed:</Text>
      <Text htmlElem="span" disabled={!isGameActive}>
        current {speed.toFixed(2)}%
      </Text>
      <Text htmlElem="span" disabled={!isGameActive}>
        avg {hits ? (accSpeed / hits).toFixed(2) : "0.00"}%
      </Text>
      <Text disabled={!isGameActive}>Time:</Text>
      <Text htmlElem="span" disabled={!isGameActive}>
        <Timer
          isGameActive={isGameActive}
          bonusTime={scores[text]?.bonusTime}
          points={points}
          onGameReset={onGameReset}
        />
      </Text>
      <Button
        onClick={isGameActive ? onGameReset : onGameStart}
        type={isGameActive ? "secondary" : "primary"}
      >
        {isGameActive ? "Reset" : "Start"}
      </Button>
    </div>
  )
}

BTScoreboard.propTypes = propTypes
