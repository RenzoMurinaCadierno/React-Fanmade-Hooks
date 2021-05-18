import { Container } from "hub"
import { classes, btFieldPropTypes } from "./BTField.utils"

export default function BTField({
  children,
  type = "primary",
  className,
  ...otherProps
}) {
  return (
    <Container
      type={type}
      roundBorders
      className={classes.container(className)}
      {...otherProps}
    >
      {children}
    </Container>
  )
}

BTField.propTypes = btFieldPropTypes
