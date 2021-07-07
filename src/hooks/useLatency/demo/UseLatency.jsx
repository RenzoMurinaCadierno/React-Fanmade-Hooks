import { CmpDescription, Container, CodeRush } from "hub"
import plainCode from "../utils/plain"
import {
  classes,
  descItems,
  codeMenuProps,
  metaTagsProps
} from "./UseLatency.utils"

/**
 * Well, '*useLatency*' hook demo was was going to be a simple button with a
 * spinner, but good ol' myself could not kept from making a full game around
 * it.
 *
 * The hook's example is in '*CodeRush.TimerButton*'. Fully explained there too.
 */
export default function UseLatency() {
  return (
    <Container htmlElem="main" className={classes.container}>
      <CmpDescription
        isCodeMenuAnchorHandledByMediaQuery
        classNames={classes.cmpDesc}
        {...{ descItems, plainCode, codeMenuProps, metaTagsProps }}
      />
      <CodeRush classNames={classes.cmpTest} />
    </Container>
  )
}
