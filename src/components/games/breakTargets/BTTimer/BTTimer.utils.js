import PropTypes from "prop-types"

const timeRelatedPropTypeCheck = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.shape({
    years: PropTypes.number,
    months: PropTypes.number,
    weeks: PropTypes.number,
    days: PropTypes.number,
    hs: PropTypes.number,
    mins: PropTypes.number,
    secs: PropTypes.number,
    ms: PropTypes.number
  })
])

export const defaultProps = { initialTime: 60000, tick: -250 }

export const propTypes = {
  initialTime: timeRelatedPropTypeCheck,
  tick: timeRelatedPropTypeCheck,
  isGameActive: PropTypes.bool.isRequired,
  bonusTime: timeRelatedPropTypeCheck,
  points: PropTypes.number,
  onGameReset: PropTypes.func
}
