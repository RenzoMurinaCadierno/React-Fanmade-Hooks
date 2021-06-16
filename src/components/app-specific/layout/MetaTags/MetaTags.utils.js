import PropTypes from "prop-types"

export const defaultProps = {}

const validTagNames = [
  "title",
  "style",
  "base",
  "link",
  "meta",
  "script",
  "noscript"
]

export const propTypes = {
  portalNode: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    PropTypes.instanceOf(Element)
  ]),
  mountInHead: PropTypes.bool,
  tagsArray: PropTypes.arrayOf(
    PropTypes.shape({
      tag: PropTypes.oneOf(validTagNames)
    })
  ).isRequired
}
