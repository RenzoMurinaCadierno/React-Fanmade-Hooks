import PropTypes from "prop-types"
import heartSVG from "assets/icons/heart.svg"
import styles from "./CodeRushLives.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  text: (className) => className,
  livesContainer: (className) =>
    (className ?? "") + " " + styles.LivesContainer,
  life: (className) => (className ?? "") + " " + styles.Life
}

export const defaultProps = {
  imgSrc: heartSVG,
  imgAlt: "lives",
  maxLives: 3,
  livesLeft: 2,
  classNames: {}
}

export const propTypes = {
  classNames: PropTypes.exact({
    container: PropTypes.string,
    text: PropTypes.string,
    livesContainer: PropTypes.string,
    life: PropTypes.string
  })
}
