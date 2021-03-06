import useToggle from "../useToggle"
import { CmpDescription, Container, Input, Button } from "hub"
import plainCode from "../utils/plain"
import { classes, descItems, metaTagsProps } from "./UseToggle.utils"

export default function UseToggle() {
  return (
    <>
      <CmpDescription
        {...{ descItems, plainCode, metaTagsProps }}
        classNames={classes.cmpDesc}
      />
      <CmpTest />
    </>
  )
}

function CmpTest() {
  const [isDisabled, toggleDisabled] = useToggle()

  return (
    <Container htmlElem="section" className={classes.container}>
      <Input.Styled
        label={`${isDisabled ? "Typing disabled" : "You can type here"}`}
        disabled={isDisabled}
      />
      <Button
        type={isDisabled ? "secondary" : "primary"}
        onClick={toggleDisabled}
      >
        {`${isDisabled ? "Enable" : "Disable"} typing`}
      </Button>
    </Container>
  )
}
