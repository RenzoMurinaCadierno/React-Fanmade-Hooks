import PropTypes from "prop-types"

export const propTypes = {
  portalNode: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    PropTypes.instanceOf(Element)
  ]),
  toastProps: PropTypes.object
}
