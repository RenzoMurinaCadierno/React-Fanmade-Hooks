import React from "react"
import { Text } from "../../../../hub"
import styles from "./UseInputHandlers.module.css"

const amountOfWords = 5

export const classes = {
  container: styles.Container,
  cmpDesc: {
    container: styles.CmpDescContainer,
    description: styles.CmpDescContent
  },
  cmpTest: styles.CmpTest,
  summary: styles.Summary,
  answer: (isCorrect) =>
    (isCorrect ? styles.CorrectAnswer : "") + " " + styles.Answer,
  input: { container: styles.InputContainer }
}

export const descItemsObject = {
  title: "useInputHandlers",
  paragraphs: [
    "Takes control of an input, offering several handlers in return. It also adds validation on its state and mimics form submission.",
    `How fast do you type? Start the game and type the ${amountOfWords} sets of words that appear above the input. Hit "Enter" to submit each one.`,
    "This example input autofocuses when game starts and blurs when it ends. It does not submit if empty, clears on submit, caps at 20 characters, and tells you when you typed correctly."
  ]
}

/**
 * Handles logic to start or reset the game.
 *
 * @param {function} setGameSt "gameSt" state setter callback
 * @param {object} inputHandlers "useInputHandlers" returned object
 */
export function resetGameSt(setGameSt) {
  // modify the global game state by adding random words to words array,
  // clearing answers array, setting a new starting time, and clearing end time
  // and "helpText" messages
  setGameSt({
    words: getWordsArray(amountOfWords),
    answers: [],
    startTime: new Date().getTime(),
    endTime: 0,
    helpText: ""
  })
}

/**
 * Adds a 'Correct answer' helpText if the typed words match the current ones
 * to type, or clears "helpText" otherwise.
 *
 * @param {object} e event target object for input change
 * @param {object} gameSt "gameSt" state
 * @param {function} setGameSt "gameSt" state setter callback
 */
export function changeHelpText(e, gameSt, setGameSt) {
  const isCorrect = e.target.value === gameSt.words[gameSt.answers.length]
  setGameSt((prevSt) => ({
    ...prevSt,
    helpText: isCorrect ? "Correct! Hit Enter!" : ""
  }))
}

/**
 * '*input*' "onSubmit" callback. Modifies the current game state depending on
 * the answer given and the current word.
 *
 * Stops submission on errors and handles the logic on game end.
 *
 * @param {object} e "onSubmit" Keypress event object
 * @param {object} validation Validation object
 * @param {React.Ref} inputRefCurrent Reference to target input
 * @param {string} previousValue input's value before being cleared
 * @param {function} setGameSt "gameSt" state setter callback
 */
export function processAnswer(
  validation,
  inputRefCurrent,
  previousValue,
  setGameSt
) {
  // on a submission attempt while validation object holds errors, show the
  // error messages and abort
  if (!validation.isValid)
    return setGameSt((prevSt) => ({
      ...prevSt,
      helpText: validation.messages
    }))
  let gameHasEnded = false
  setGameSt((prevSt) => {
    // practice mode has either 0 as "startTime" (initial component state), or
    // "startTime" and "endTime" defined (to calculate results screen).
    // So, on any of those cases, return, Do not process game logic
    if (!prevSt.startTime || (prevSt.startTime && prevSt.endTime)) {
      return prevSt
    }
    // game has ended once the last proposed word was typed
    gameHasEnded = prevSt.words.length - 1 === prevSt.answers.length
    return {
      ...prevSt,
      // if the last answer was given, clear words array.
      // Otherwise, keep it as is
      words: gameHasEnded ? [] : prevSt.words,
      // append to answers array an array containing the current correct word,
      // the answer given and a boolean indicating if the answer was correct.
      // Notice we use "previousValue" instead of "e.target.value" or
      // "inputRef.value", as those will be cleared by `clearOnSubmit` in
      // "useInputHandlers" before we can calculate this logic
      answers: [
        ...prevSt.answers,
        [
          prevSt.words[prevSt.answers.length],
          previousValue,
          prevSt.words[prevSt.answers.length] === previousValue
        ]
      ],
      // if the last answer was given, set the end time. Use 0 otherwise.
      endTime: gameHasEnded ? new Date().getTime() : 0,
      // and clear helpText
      helpText: ""
    }
  })
  // if game has ended, lose focus on input
  gameHasEnded && inputRefCurrent.blur()
}

/**
 * Given current "gameSt" variables, it calculates the styles, props and texts
 * to pass to all children components.
 *
 * @param {object} gameSt "gameSt" state
 * @param {string} inputValue current input's value
 * @param {function} toggleModal '*Modal*' "open" state toggler
 */
export function getTextsAndStyles(gameSt, inputValue, toggleModal) {
  const gameIsActive = !gameSt.endTime
  const gameHasEnded = !gameSt.endTime || !gameSt.startTime
  const currentWord = gameSt.words[gameSt.answers.length]
  return {
    words: {
      disabled: !gameIsActive,
      text: gameIsActive ? currentWord : "Practice mode"
    },
    inputLabel: gameIsActive ? "Game is on, go!" : "Test typing here",
    helpText: {
      type: currentWord === inputValue ? "primary" : "secondary-1",
      text: gameSt.startTime ? gameSt.helpText : ""
    },
    startBtn: {
      type: gameIsActive ? "secondary-1" : "secondary",
      text: gameIsActive ? "Restart game" : "Start game"
    },
    resultsBtn: {
      disabled: gameHasEnded,
      onClick: gameIsActive ? null : toggleModal
    }
  }
}

/**
 * Returns an array with the specified amount of random words coming
 * from "wordList"
 *
 * @param {number} qtyOfWords The amount of words to return
 */
function getWordsArray(qtyOfWords = 10) {
  return new Array(qtyOfWords)
    .fill(null)
    .map(() => wordList[Math.floor(Math.random() * wordList.length)])
}

/**
 * Returns the quantity of correct answers calculated based on the boolean
 * that indicates if the answer given matches the correct word.
 *
 * @param {array} answersArray Array shaped:
 *   [correctWord <string>, answerGiven <string>, wasAnswerTrue <boolean>]
 */
function countCorrectAnswers(answersArray) {
  return answersArray.reduce((acc, item) => acc + (item[2] ? 1 : 0), 0)
}

/**
 * Returns the added lengths of all answers given on each item in
 * `answersArray`.
 *
 * The returned number will be divided among the sum of all answer strings
 * afterwards. This implies means that if that divisor is 0, the result would
 * be Infinity. In that case, return Infinity, so that the resulting division
 * is 0.
 *
 * @param {array} answersArray Array shaped:
 *   [correctWord <string>, answerGiven <string>, wasAnswerTrue <boolean>]
 */
function getKeyPresses(answersArray) {
  const timePerKeyPress = answersArray.reduce(
    (acc, item) => acc + item[1].length,
    0
  )
  return timePerKeyPress ? timePerKeyPress : Infinity
}

/**
 * Returns a component to display as '*Modal*' children. We place it here to
 * unclog the main .jsx file, which must serve as an example of the custom hook.
 *
 * We will not use it anywhere else across the whole app due to its specificity,
 * so it makes no sense to create its own file.
 *
 * @param {object} gameSt "gameSt" state
 */
export function ResultsSummary({ gameSt }) {
  const elapsedTime = (gameSt.endTime - gameSt.startTime) / 1000
  return (
    <>
      <div className={classes.summary}>
        <Text htmlElem="h4" type="primary-1" italic bold>
          {Math.floor(
            (countCorrectAnswers(gameSt.answers) * 100) / gameSt.answers.length
          )}
          %
        </Text>
        <Text htmlElem="h5" type="primary" italic bold>
          Accuracy <br /> {countCorrectAnswers(gameSt.answers)} /{" "}
          {gameSt.answers.length}
        </Text>
        <Text htmlElem="p" type="primary-1" italic>
          Elapsed time <br /> {elapsedTime.toFixed(2)} secs
        </Text>
        <Text htmlElem="p" type="primary-1" italic>
          Time per entry <br />
          {(elapsedTime / gameSt.answers.length).toFixed(2)} secs
        </Text>
        <Text htmlElem="p" type="primary-1" italic>
          Time per key press <br />
          {(elapsedTime / getKeyPresses(gameSt.answers)).toFixed(3)} secs
        </Text>
      </div>
      <Text htmlElem="h6" type="primary" italic bold>
        Words | Typed
      </Text>
      {gameSt.answers.map((answer, i) => (
        <div key={i} className={classes.answer(answer[2])}>
          {`${answer[0]} | ${answer[1] || "-"}`}
        </div>
      ))}
    </>
  )
}

/**
 * Array of words to render when game is on.
 */
export const wordList = [
  "stapler",
  "desk",
  "pay cheque",
  "work computer",
  "fax machine",
  "phone",
  "paper",
  "light",
  "chair",
  "desk lamp",
  "notepad",
  "paper clips",
  "binder",
  "calculator",
  "sticky notes",
  "calendar",
  "pens",
  "pencils",
  "notebook",
  "book",
  "chairs",
  "coffee mug",
  "coffee cup",
  "thermos",
  "hot cup",
  "clipboard",
  "paperclips",
  "glue",
  "chocolate",
  "secretary",
  "work",
  "paperwork",
  "workload",
  "coffee",
  "employee",
  "boredom",
  "golf",
  "laptop",
  "sandcastle",
  "monday",
  "vanilla",
  "sneeze",
  "bamboo",
  "scratch",
  "celery",
  "hammer",
  "tennis",
  "hot dog",
  "frog",
  "pants",
  "bridge",
  "bubblegum",
  "candy bar",
  "bucket",
  "skiing",
  "sledding",
  "snowboarding",
  "polar bear",
  "snowman",
  "cream",
  "waffle",
  "pancakes",
  "ice cream",
  "sundae",
  "sunglasses",
  "beach",
  "surfboard",
  "watermelon",
  "baseball",
  "ball",
  "t-shirt",
  "bat",
  "kiss",
  "jellyfish",
  "jelly",
  "butterfly",
  "spider",
  "spiderweb",
  "broom",
  "mummy",
  "candy",
  "bats",
  "squirrels",
  "basketball",
  "water bottle",
  "dog leash",
  "newspaper",
  "hammock",
  "video camera",
  "money",
  "unicorn",
  "smiley face",
  "picnic basket",
  "umbrella",
  "teddy bear",
  "ancient",
  "egyptian",
  "pyramid",
  "ambulance",
  "bacteria",
  "goosebumps",
  "platypus",
  "tarantula",
  "pizza",
  "clam chowder",
  "goldfish bowl",
  "skull",
  "spider web",
  "smoke",
  "tree",
  "ice",
  "blanket",
  "seaweed",
  "flame",
  "bubble",
  "hair",
  "tooth",
  "leaf",
  "worm",
  "apple",
  "sky",
  "plane",
  "cow",
  "house",
  "dog",
  "car",
  "bed",
  "furniture",
  "train",
  "rainbow",
  "drawing",
  "plate",
  "cup",
  "paintings",
  "bowl",
  "cushion",
  "sofa",
  "sheet",
  "kitchen",
  "candle",
  "table",
  "shirt",
  "clothes",
  "dress",
  "pillow",
  "home",
  "toothpaste",
  "guitar",
  "schoolbag",
  "pencil case",
  "glasses",
  "towel",
  "watch",
  "piano",
  "pen",
  "hat",
  "shoes",
  "socks",
  "jeans",
  "hair gel",
  "keyboard",
  "bra",
  "jacket",
  "tie",
  "bandage",
  "scarf",
  "hair brush",
  "cell phone",
  "office supplies",
  "printer",
  "cork board",
  "paperweight",
  "letter opener",
  "post-it notes",
  "pen holder",
  "file cabinet",
  "boss",
  "water-cooler",
  "lunch break",
  "commute",
  "employer",
  "late",
  "passion",
  "ambition",
  "pay",
  "pride",
  "unemployment",
  "job",
  "hire",
  "worried",
  "lazy",
  "tired",
  "poverty",
  "olympics",
  "recycle",
  "black hole",
  "applause",
  "sunburn",
  "blizzard",
  "time machine",
  "lace",
  "atlantis",
  "swamp",
  "sunscreen",
  "dictionary",
  "century",
  "sculpture",
  "sneaker",
  "admiral",
  "water polo",
  "ninja",
  "snorkeling",
  "surfing",
  "volleyball",
  "swimsuit",
  "pitcher",
  "catcher",
  "home plate",
  "swing",
  "batter",
  "cheerleader",
  "pumpkin",
  "halloween",
  "ghost",
  "jack-o'-lantern",
  "spooky",
  "skeleton",
  "vampire",
  "scary",
  "witch",
  "noodles",
  "hula hoop",
  "unicycle",
  "whiteboard",
  "knitting",
  "thunderstorm",
  "thermometer",
  "skipping rope",
  "bubble wrap",
  "canned food",
  "chalkboard",
  "waffles",
  "home run",
  "snowball fight",
  "milkshake",
  "bug zapper",
  "pot of gold",
  "wind chimes",
  "musical instrument",
  "loudspeaker",
  "bookworm",
  "bird feeder",
  "wig",
  "houseplant",
  "monster truck",
  "pie chart",
  "s'mores",
  "water gun",
  "shopping cart",
  "knife and fork",
  "blue whale",
  "canary islands",
  "christmas tree",
  "earthquake",
  "daytime",
  "frog legs",
  "junkyard",
  "aardvark",
  "vomiting",
  "dolphin",
  "rainforest",
  "spiders web",
  "great wall",
  "vampire bat",
  "x-ray",
  "worms",
  "yawning",
  "daytime tv",
  "fireman's helmet",
  "hard hat",
  "frogs legs",
  "hospital gown",
  "invisible man",
  "long underwear",
  "quicksand",
  "stomach ache",
  "vacuum cleaner",
  "cream cheese",
  "pizza crust",
  "swiss cheese",
  "bruise",
  "crust",
  "battery",
  "fog",
  "cereal",
  "blood",
  "moss",
  "thorn",
  "algae",
  "slug",
  "antenna",
  "butterfly wing",
  "parasite",
  "asteroid",
  "family",
  "pollen",
  "painting",
  "wallpaper",
  "chandelier",
  "sketch",
  "ketchup",
  "plane ticket",
  "fruit juice",
  "slippers"
]
