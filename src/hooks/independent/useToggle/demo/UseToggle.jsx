import useToggle from "../useToggle"
import { CmpDescription, Container, InputField, Button } from "hub"
import { classes, descItemsObject } from "./UseToggle.utils"

export default function UseToggle() {
  const [isDisabled, toggleDisabled] = useToggle()

  return (
    <>
      <CmpDescription
        descItems={descItemsObject}
        classNames={classes.cmpDesc}
      />
      <Container htmlElem="section" className={classes.container}>
        <InputField
          label={`${isDisabled ? "Typing disabled" : "You can type here"}`}
          disabled={isDisabled}
        />
        <Button type={isDisabled ? "secondary" : ""} onClick={toggleDisabled}>
          {`${isDisabled ? "Enable" : "Disable"} typing`}
        </Button>
      </Container>
    </>
  )
}
