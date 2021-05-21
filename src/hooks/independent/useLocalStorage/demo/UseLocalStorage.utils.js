import styles from "./UseLocalStorage.module.css"

export const classes = {
  container: styles.Container,
  cmpDesc: {
    container: styles.CmpDescContainer,
    description: styles.CmpDescContent
  },
  cmpTest: styles.CmpTest
}

export const descItemsObject = {
  title: "useLocalStorage",
  paragraphs: [
    "Takes control of a local storage key, offering customizable get, set, del and reset handlers in return, as well as automatic state syncing.",
    "Open local storage in developer tools and track changes when you sign up, delete a user or modify its settings.",
    "Handlers control keys in local storage item, and user settings' state is synced (updates local storage automatically)."
  ]
}

/**
 * Language strings to display depending on currently loaded
 * "userSt.configs.lang"
 */
export const intl = {
  en: {
    toast: {
      loginSuccess: (username) => `Logged in as "${username}"`
    }
  },
  es: {
    toast: {
      loginSuccess: (username) => `Ingresaste como "${username}"`
    }
  }
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
  // array to store created hashes
  let usedHashes = []
  /**
   * Hash generator function
   * @param {number} qtyOfChars the amount of random characters the hash includes
   */
  function get(qtyOfChars = 5) {
    // base string for all hashes
    let hash = ""
    while (true) {
      // loop a number of times equal to qtyOfChars
      for (let i = 0; i < qtyOfChars; i++) {
        // get a random char from chars array
        let nextChar = chars[Math.floor(Math.random() * chars.length)]
        // 50-50 chance to make it uppercase
        if (Math.random() < 0.5) nextChar = nextChar.toUpperCase()
        // append it to the hash string beinf formed
        hash += nextChar
      }
      // if the closure's array of hashes does not include this one
      // we just created, push it and return it
      if (!usedHashes.includes(hash)) {
        usedHashes.push(hash)
        return hash
      }
      // otherwise, restore to initial value and start again
      hash = ""
    }
  }
  /**
   * Removes the specified hash from the hash array
   * @param {string} hash the hash string to remove
   */
  function remove(hash) {
    // get the hash's index inside the array
    const idxInArray = usedHashes.indexOf(hash)
    // if it exists, slice it out
    if (idxInArray !== -1) {
      usedHashes = [
        ...usedHashes.slice(0, idxInArray),
        ...usedHashes.slice(idxInArray + 1)
      ]
    }
  }
  // the IIFE will create the array as closure, and return the hash
  // getter and remover functions
  return { get, remove }
})()