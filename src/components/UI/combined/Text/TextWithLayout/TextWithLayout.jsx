import { Text, Layout } from "hub"
import { classes, propTypes } from "./TextWithLayout.utils"

/**
 * Returns a '*Text*' with orientation and animation handled by '*Layout*'.
 *
 * @param {object} props
 *
 * `children` (React.Node): '*Text*' `children`. Preferrably a `string`.
 *
 * `className?` (string): className to attach to '*Text*'.
 * > **Note:** '*Layout*' respective classNames are passed in `animationProps`
 *   and `orientationProps`.
 *
 * `animationProps?` (object): Props to spread in '*Layout.Animation*'.
 *
 * `orientationProps?` (object): Props to spread in '*Layout.Orientation*'.
 *
 * `...otherProps?` (object): Props to spread in '*Text*'.
 */
export default function TextWithLayout({
  children,
  className,
  animationProps,
  orientationProps,
  ...otherProps
}) {
  return (
    // layout container. Handles animation and orientation
    <Layout animationProps={animationProps} orientationProps={orientationProps}>
      {/* '*Text*' */}
      <Text className={classes.text(className)} {...otherProps}>
        {children}
      </Text>
    </Layout>
  )
}

// TextWithLayout.defaultProps = defaultProps
TextWithLayout.propTypes = propTypes

test all combinations of orientation and animation vanilla, then add textwithlayout to home