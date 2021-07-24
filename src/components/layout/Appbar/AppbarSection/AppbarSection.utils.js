import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./AppbarSection.module.css"

export const classes = {
  container: (className, show) =>
    cnp.default(styles.Container, className) +
    cnp.if(show, styles.ShowContainer),
  title: (className) => cnp.default(styles.Title, className),
  content: (className, show) =>
    cnp.default(styles.Content, className) + cnp.if(show, styles.ShowContent)
}

export const defaultProps = { title: "Title", classNames: {} }

export const propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool,
  title: PropTypes.string.isRequired,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string
  })
}

/**
 * Creates a global index variable to share across all '*AppbarSection*'
 * instances. Each one will get the current index assigned to, and will
 * increase the index by 1 when instantiated.
 *
 * This index is to add to the timeout set for them to be rendered in UI,
 * making them appear one after the other.
 *
 * @returns {object} Object with two keys:
 * * "get" (function): returns next index.
 * * "reset" (function): resets index back to 0.
 */
export const index = (() => {
  let index = 0
  return {
    get: () => ++index,
    reset: () => (index = 0)
  }
})()
