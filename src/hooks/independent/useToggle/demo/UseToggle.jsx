import useToggle from "../useToggle"
import { CmpDescription, Container, InputField, Button } from "hub"
import { classes, descItemsObject } from "./UseToggle.utils"

export default function UseToggle() {
  return (
    <>
      <CmpDescription
        descItems={descItemsObject}
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
      <InputField
        label={`${isDisabled ? "Typing disabled" : "You can type here"}`}
        disabled={isDisabled}
      />
      <Button type={isDisabled ? "secondary" : ""} onClick={toggleDisabled}>
        {`${isDisabled ? "Enable" : "Disable"} typing`}
      </Button>
    </Container>
  )
}
