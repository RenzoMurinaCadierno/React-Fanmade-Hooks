/**
 * Takes a string a returns it all of its words' first letter in uppercase
 * and the rest in lowercase
 *
 * @param {string} string The string to capitalize
 * @param {boolean} onlyFirstChar True capitalizes only the first character.
 *   The rest of the string remains intact. Defaults to false.
 */
export function capitalize(string, onlyFirstChar = false) {
  return string
    .split(/\s+/)
    .map(
      (word) =>
        word[0].toUpperCase() +
        (onlyFirstChar ? word.slice(1) : word.slice(1).toLowerCase())
    )
    .join(" ")
}

/**
 * Takes a string and replaces any instance of more than one continuous
 * space to only one
 * @param {string} string the target string
 */
export function shortenSpaces(string) {
  return string.replace(/\s{2,}/, " ")
}

/**
 * Takes a number and fixes it to the specified amount of decimals.
 *
 * Return type is float, so if extra trailing zeroes are attempted to be fixed,
 * they will be deleted. E.g.: fix(100.220, 2) results in 100.22
 * @param {number} num The number to fix
 * @param {number} toFixed Amount of decimals
 * @returns {number} The desired fixed number (float)
 */
export function fix(num, toFixed = 0) {
  const pow = Math.pow(10, toFixed)
  return Math.round(num * pow) / pow
}

/**
 * Takes a variable and returns a series of functions related to its type check
 * @param {any} variable
 */
export function typeOf(variable) {
  return {
    is: function (type) {
      return typeof variable === type
    },
    isNot: function (type) {
      return typeof variable !== type
    },
    isSome: function (...types) {
      return types.some((type) => typeof variable === type)
    },
    isNotSome: function (...types) {
      return types.some((type) => typeof variable !== type)
    },
    isEvery: function (...types) {
      return types.every((type) => typeof variable === type)
    },
    isNotEvery: function (...types) {
      return types.every((type) => typeof variable !== type)
    }
  }
}

// export function testRolls(max, qtyOfTests) {
//   const res = {}
//   for (let i = 0; i < qtyOfTests; i++) {
//     const currNo = Math.floor(Math.random() * max) + 1
//     if (!res[currNo]) res[currNo] = 1
//     else res[currNo]++
//   }
//   console.log(res)
// }

/**
 * Creates and returns a copy of `arr` with its elements shuffled.
 * @param {Array} arr array to shuffle
 */
export function copyAndShuffleArray(arr) {
  const arrCopy = [...arr]
  const newArr = []
  for (let i = 0; i < arr.length; i++) {
    const idx = Math.floor(Math.random() * arrCopy.length)
    newArr.push(arrCopy[idx])
    arrCopy.splice(idx, 1)
  }
  return newArr
}

/**
 * Takes a camel-or-pascal-cased string and returns its slug form
 * @param {sring} pathName string in camel or pascal case
 */
export function slugify(pathName) {
  let processedPath = ""
  for (let i = 0; i < pathName.length; i++) {
    processedPath +=
      /[A-Z]/.test(pathName[i]) && i
        ? "-" + pathName[i].toLowerCase()
        : pathName[i].toLowerCase()
  }
  return processedPath
}

/**
 * Returns the camelcased hook name from location.pathname, used
 * to complete the URL name for 'Icon.Expandable' in 'CmpDescription'
 * to create the link to hook's folder in Github repository
 * @param {string} pathName location.pathName (from React Router).
 *   Its slugified, format "/use-hook-name"
 */
export function getHookNameFromPathName(pathName) {
  return pathName
    .slice(1) // remove the '/'
    .split("-") // separate slug and get all words
    .map(
      // capitalize everything but first word ("use")
      (word, i) =>
        i ? word[0].toUpperCase() + word.slice(1).toLowerCase() : word
    )
    .join("") // join back
}

/**
 * Creates a closure that stores an array of hashes and returns handlers
 * to add new hashes and remove used ones.
 *
 * @returns {object} An object with two entries:
 *
 * `get` (function): creates, stores in the array and returns a hash of any
 *   given length (passed as a number argument).
 *
 * `remove` (function): removes the hash passed as argument from the array.
 */
export const hash = (function () {
  // characters used to create the hash
  const chars = "abcdefghijklmnopqrstuvw0123456789"
  // Set to store created hashes
  let usedHashes = new Set()
  /**
   * Hash generator function
   * @param {number} qtyOfChars the amount of random characters in the hash
   */
  function get(qtyOfChars = 5) {
    // base string for all hashes
    let hash = ""
    while (true) {
      // loop a number of times equal to qtyOfChars
      for (let i = 0; i < qtyOfChars; i++) {
        // get a random char from chars Set
        let nextChar = chars[Math.floor(Math.random() * chars.length)]
        // 50-50 chance to make it uppercase
        if (Math.random() < 0.5) nextChar = nextChar.toUpperCase()
        // append it to the hash string beinf formed
        hash += nextChar
      }
      // if the closure's Set of hashes does not include this one
      // we just created, push it and return it
      if (!usedHashes.has(hash)) {
        usedHashes.add(hash)
        return hash
      }
      // otherwise, restore to initial value and start again
      hash = ""
    }
  }
  /**
   * Removes the specified hash from the hash Set
   * @param {string} hash the hash string to remove
   */
  function remove(hash) {
    usedHashes.delete(hash)
    return hash
  }
  // the IIFE will create the array as closure, and return the hash
  // getter and remover functions
  return { get, remove }
})()
