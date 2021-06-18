import { classes, defaultProps, propTypes } from "./Spinner.utils"

export default function Spinner({ size, type, classNames }) {
  return (
    <div className={classes.container(size, classNames.container)}>
      <div className={classes.dot(type, classNames.dot)} />
      <div className={classes.dot(type, classNames.dot)} />
      <div className={classes.dot(type, classNames.dot)} />
      <div className={classes.dot(type, classNames.dot)} />
    </div>
  )
}

Spinner.defaultProps = defaultProps
Spinner.propTypes = propTypes
