import PropTypes from "prop-types"

export const defaultProps = {}

export const propTypes = {
  children: PropTypes.node.isRequired,
  portalNode: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    PropTypes.instanceOf(Element)
  ])
}
