import { Text, useValueToggle } from "hub"
import { classes, defaultProps, propTypes } from "./TextWithAnimation.utils"

export default function TextWithAnimation({ children, configs, className, textProps }) {
  const [mountCN, triggerMountCN] = useValueToggle({ on: })
  return (
    <Text className={classes.container(className)} {...textProps}>
      {children}
    </Text>
  )
}

TextWithAnimation.defaultProps = defaultProps
TextWithAnimation.propTypes = propTypes
