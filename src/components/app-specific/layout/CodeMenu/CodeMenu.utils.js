import PropTypes from "prop-types"
import code from "assets/icons/code.svg"
import tick from "assets/icons/tick.svg"
import cross from "assets/icons/cross.svg"

export const classes = {
  codeMenu: (classNames) => classNames
}

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
    iconsProps: PropTypes.object,
    listIconsExpandDirection: PropTypes.string
  })
}

export function getIconsProps(url, plainCode) {
  return {
    main: {
      icon: <img src={code} alt="code" />
    },
    list: [
      {
        icon: <img src={cross} alt="Go to code" />,
        content: "Go to code",
        toastProps: {
          timeout: 3000,
          children: "Tap here to open hook's code in a new tab",
          onClick: () => url && window.open(url, "_blank")
        }
      },
      {
        icon: <img src={tick} alt="Copy code" />,
        content: "Copy code",
        onContentClick: () =>
          navigator.clipboard.writeText(
            typeof plainCode === "string"
              ? plainCode
              : "Error while copying. Sorry :("
          ),
        toastProps: {
          timeout: 3000,
          children:
            typeof plainCode === "string"
              ? "Copied! Paste it in a .js file and go nuts!"
              : "Error while copying. Sorry :("
        }
      }
    ]
  }
}
