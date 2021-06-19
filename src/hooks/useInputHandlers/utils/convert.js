const fs = require("fs")
const readline = require("readline")

// // Write plain words in array format into a new txt
//
// const readInterface = readline.createInterface({
//   input: fs.createReadStream("C:/Users/Renzo/Desktop/words.txt"),
//   output: process.stdout,
//   console: false
// })
//
//
// fs.writeFile("C:/Users/Renzo/Desktop/wordsReduced.txt", "", (err, data) => {
//   if (err) throw err
// })
//
// readInterface.on("line", (line) => {
//   if (!line) return
//   let filteredLine = line.replace(/\d+\.\s/g, "").toLowerCase()
//   filteredLine = `"${filteredLine}", `
//   fs.appendFile(
//     "C:/Users/Renzo/Desktop/wordsReduced.txt",
//     filteredLine,
//     (err) => {
//       if (err) throw err
//     }
//   )
// })

// // Count words' lengths for input maxLength validation
//
const readInterface = readline.createInterface({
  input: fs.createReadStream("C:/Users/Renzo/Desktop/words.txt")
  // output: process.stdout,
})

const wordsLengths = {}

readInterface.on("line", (line) => {
  if (!line) return
  const filteredLine = line.replace(/\d+\.\s/g, "")
  if (wordsLengths[filteredLine.length]) {
    wordsLengths[filteredLine.length][0]++
    wordsLengths[filteredLine.length][1].push(filteredLine)
  } else {
    wordsLengths[filteredLine.length] = [1, [filteredLine]]
  }
})

setTimeout(() => console.log(wordsLengths), 1000)
