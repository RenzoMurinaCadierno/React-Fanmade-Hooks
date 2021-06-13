import PropTypes from "prop-types"
import code from "assets/icons/code.svg"
import tick from "assets/icons/tick.svg"
import cross from "assets/icons/cross.svg"
import styles from "./CodeMenu.module.css"

export const classes = {
  codeMenu: (classNames) => ({
    ...classNames,
    container: styles.Container
  })
}

export const defaultProps = { anchor: "top-right" }

const iconPropsShape = PropTypes.shape({
  icon: PropTypes.element,
  content: PropTypes.any,
  toastProps: PropTypes.object
})

export const propTypes = {
  url: PropTypes.string,
  plainCode: PropTypes.string,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    mainIcon: PropTypes.object,
    listIcon: PropTypes.object
  }),
  expandableMenuProps: PropTypes.shape({
    menuIconProps: PropTypes.object,
    listIconsProps: PropTypes.object,
    anchor: PropTypes.string,
    spread: PropTypes.string,
    type: PropTypes.string,
    iconsProps: PropTypes.exact({
      main: iconPropsShape,
      list: PropTypes.arrayOf(iconPropsShape)
    }),
    listIconsExpandDirection: PropTypes.string
  })
}

function isNonEmptyString(str) {
  return str && typeof str === "string"
}

/**
 * Returns a valid object to pass to '*CodeMenu*' inner '*ExpandableMenu*'
 * `iconsProps`.
 *
 * If contains two keys:
 * > * "main" (object): Props to spread in '*ExpandableMenu.MainIcon*'.
 * > * "list" (array): Array of props objects to spread in each individual
 *     '*ExpandableMenu.ListIcon*'.
 *
 * @param {string} url Link to open in a new tab when tapping '*Toast*' content,
 *   inside 'go to code' '*ExpandableMenu.ListIcon*'.
 *
 * @param {string} plainCode The hook's whole code as a string, to be copied by
 *   'copy code' '*ExpandableMenu.ListIcon*'. This string in found in
 *   'PATH_TO_HOOK_FOLDER/utils/plain.js'.
 */
export function getIconsProps(url, plainCode) {
  return {
    main: { icon: <img src={code} alt="code" /> },
    list: [
      {
        icon: <img src={cross} alt="Go to code" />,
        content: "Go to code",
        toastProps: {
          timeout: 4000,
          children: "Tap here to open hook's code in a new tab",
          onClick: () => isNonEmptyString(url) && window.open(url, "_blank")
        }
      },
      {
        icon: <img src={tick} alt="Copy code" />,
        content: "Copy code",
        onContentClick: () =>
          navigator.clipboard.writeText(
            isNonEmptyString(plainCode)
              ? plainCode
              : "Error while copying. Sorry :("
          ),
        toastProps: {
          timeout: 4000,
          children:
            typeof plainCode === "string"
              ? "Copied! Paste it in a .js file and go nuts!"
              : "Error while copying. Sorry :("
        }
      }
    ]
  }
}
