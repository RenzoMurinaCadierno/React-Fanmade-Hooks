import PropTypes from "prop-types"
import { urls } from "app.configs.json"
// import styles from "./CmpDescription.module.css"

export const classes = {
  codeIcon: (classNames) => classNames,
  container: (className) => className ?? "",
  title: (className) => className ?? "",
  description: (className) => className ?? ""
}

export const defaultProps = {
  descItems: {
    title: 'Set title as a string in "descItems.title" prop',
    paragraphs: [
      'Set paragraphs as an array of strings in "descItems.paragraphs" prop.',
      'Set paragraphs as an array of strings in "descItems.paragraphs" prop.'
    ]
  },
  iconUrl: urls.github.hooks,
  classNames: {},
  codeMenuProps: {},
  containerProps: {},
  titleProps: {},
  paragraphProps: {}
}

const codeIconPropTypes = PropTypes.exact({
  expandableIcon: PropTypes.exact({
    container: PropTypes.string,
    icon: PropTypes.string,
    content: PropTypes.string
  }),
  toast: PropTypes.exact({
    container: PropTypes.string,
    content: PropTypes.string,
    toggler: PropTypes.string
  })
})

export const propTypes = {
  descItems: PropTypes.exact({
    title: PropTypes.string.isRequired,
    paragraphs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  }),
  plainCode: PropTypes.string,
  iconUrl: PropTypes.string,
  classNames: PropTypes.exact({
    codeIcon: codeIconPropTypes,
    container: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    barrier: PropTypes.string
  }),
  codeMenuProps: PropTypes.object,
  containerProps: PropTypes.object,
  titleProps: PropTypes.object,
  paragraphProps: PropTypes.object
}

/**
 * Sets some props for `iconsProps.aura` in '*ExpandableMenu*' rendered by
 * '*CodeMenu*'.
 */
export const defaultMenuIconProps = {
  menuIconProps: { aura: { size: "small", interval: "long" } }
}
