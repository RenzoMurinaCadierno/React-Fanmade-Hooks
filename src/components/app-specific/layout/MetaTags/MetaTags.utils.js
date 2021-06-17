import PropTypes from "prop-types"

export const defaultProps = {}

export const propTypes = {
  title: PropTypes.string,
  author: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.string.isRequired
}
