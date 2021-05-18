import { useCallback, useRef } from "react"
import useReRender from "../useReRender"
import { Toast, Container, CmpDescription, Button } from "hub"
import pointer from "assets/icons/pointer.svg"
import refresh from "assets/icons/refresh.svg"
import {
  classes,
  descItemsObject,
  directionStrings,
  toastTexts
} from "./UseReRender.utils"

export default function UseReRender() {
  const reRender = useReRender()
  // useRef instead of useState, as it does not re-render when changing.
  // That's the idea of this example. Re-render imperatively by the hook
  const toastPos = useRef("center")
  const openModal = useRef(false)

  const handleArrowClick = useCallback((e) => {
    toastPos.current = e.target.dataset.direction
  }, [])

  const handleCloseModal = useCallback(() => {
    toastPos.current = "center"
    openModal.current = false
    reRender()
  }, [reRender])

  const handleReRender = useCallback(() => {
    openModal.current = true
    reRender()
  }, [reRender])

  return (
    <>
      {/* '*Toast*' will show upon an imperative re-render by "useReRender" */}
      <Toast
        show={openModal.current}
        position={toastPos.current}
        timeout={1000}
        onClose={handleCloseModal}
      >
        {toastTexts[toastPos.current]}
      </Toast>
      <Container htmlElem="main" className={classes.container}>
        <CmpDescription
          descItems={descItemsObject}
          classNames={classes.cmpDesc}
        />
        <section
          className={classes.cmpTest}
          aria-label="component testing area"
        >
          {/* directional arrows to set '*Toast*'s orientation */}
          {directionStrings.map((direction) => (
            <img
              key={direction}
              data-direction={direction}
              src={pointer}
              alt={direction}
              disabled={openModal.current}
              onClick={handleArrowClick}
              className={classes.arrow(direction)}
            />
          ))}
          {/* imperative re-render button */}
          <Button
            className={classes.button}
            disabled={openModal.current}
            onClick={handleReRender}
          >
            <img src={refresh} alt="refresh" />
          </Button>
        </section>
      </Container>
    </>
  )
}
