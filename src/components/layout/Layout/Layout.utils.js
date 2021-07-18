import PropTypes from "prop-types"

export const defaultProps = { classNames: {} }

export const propTypes = {
  children: PropTypes.node.isRequired,
  anchor: PropTypes.oneOf(["center", "top", "right", "bottom", "left"]),
  rotate: PropTypes.oneOf(["forwards", "backwards"]),
  classNames: PropTypes.exact({
    orientation: PropTypes.string,
    animation: PropTypes.string
  }),
  textProps: PropTypes.object
}

export const constants = {
  animation: {
    types: {
      translate: {
        X: { FORWARDS: "FORWARDS", REVERSE: "REVERSE" },
        Y: { FORWARDS: "FORWARDS", REVERSE: "REVERSE" }
      },
      scale: { OSCILLATE: "OSCILLATE" },
      opacity: { IN: "IN", OUT: "OUT" }
    },
    timeouts: { ENTER: 250, EXIT: 250 },
    intervals: { IDLE: 350 }
  }
}
