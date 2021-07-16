import { Text } from "hub"
import {
  classes,
  defaultProps,
  propTypes,
  getContainerStyle
} from "./TextWtihLayout.utils"

export default function TextWithLayout({
  children,
  anchor,
  rotate,
  adjustTranslation,
  classNames,
  containerStyles,
  textProps,
  ...otherProps
}) {
  return (
    <div
      className={classes.container(anchor, classNames.container)}
      style={getContainerStyle(rotate, anchor, containerStyles)}
      {...otherProps}
    >
      <Text className={classes.text(classNames.text)} {...textProps}>
        {children}
      </Text>
    </div>
  )
}

TextWithLayout.defaultProps = defaultProps
TextWithLayout.propTypes = propTypes
