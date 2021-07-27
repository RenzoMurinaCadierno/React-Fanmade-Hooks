const logs = {
  header: {
    msg: "React Fanmade Hooks",
    css: "font-size: 120%; font-weight: bold; font-style: italic; text-shadow: 0.25vw -0.25vw 0.4vw #92e0e9"
  },
  body: {
    msg: "Hey hey, welcome!\n\nThanks for giving this library a shot! Everything is open source, it's a modest contribution to the awesome React community and environment.\n\nYou can check the repo using the expandable icon in home page.\n\nHowever, if you intend on using anything, it would be great if you link us back. That simple thing means a lot to us all, let's spread the word!\n\nAnyway, hope you enjoy your stay! Do not hesitate to contact us for bug reports and/or feedback.",
    css: ""
  },
  footer: {
    msg: "Happy coding! ;)",
    css: "font-size: 105%; font-weight: bold; font-style: italic"
  },
  signature: {
    msg: "  - R.N.M.C.\n\n     mail: nmcadierno@gmail.com\n     Face: React Fanmade Hooks\n     Twitter: @fanmade_hooks",
    css: "font-size: 105%; font-style: italic; text-shadow: 0.2vw -0.2vw 0.3vw #d6851a"
  }
}

/**
 * Logs in console a welcome message with instructions and contact information.
 */
export function consoleLogWelcomeMessage() {
  if (window.console) {
    let msgString = ""
    let styles = []

    // append each message to the final string, with its `%c` modifier and two
    // newline char to separate paragraphs. Also, styles for each paragraph to
    // an array to later spread in `console.log`
    Object.values(logs).forEach((log) => {
      msgString += "%c" + log.msg + "\n\n"
      styles.push(log.css)
    })

    // add initial newline char and remove the extra trailing one
    msgString = "\n" + msgString.slice(0, -1)

    // log the processed string with each css
    window.console.log(msgString, ...styles)
  }
}
