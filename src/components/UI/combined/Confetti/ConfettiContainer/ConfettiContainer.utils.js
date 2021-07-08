import PropTypes from "prop-types"
import styles from "./ConfettiContainer.module.css"

export const classes = {
  container: (absoluteFill, fullScreen, className) =>
    (className ?? "") +
    " " +
    (absoluteFill ? styles.AbsoluteFill : "") +
    " " +
    (fullScreen ? styles.FullScreen : "") +
    " " +
    styles.Container,
  guides: (classNames) => classNames
}

export const defaultProps = {
  // absoluteFill: true,
  fullScreen: true,
  classNames: {},
  guidesProps: {}
}

export const propTypes = {
  absoluteFill: PropTypes.bool,
  fullScreen: PropTypes.bool,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    guides: PropTypes.exact({
      container: PropTypes.string,
      guideX: PropTypes.string,
      guideY: PropTypes.string,
      glitter: PropTypes.string
    })
  }),
  guideXProps: PropTypes.object,
  guideYProps: PropTypes.object,
  glitterProps: PropTypes.object
}
