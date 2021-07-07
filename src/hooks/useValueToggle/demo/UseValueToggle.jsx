import { useState } from "react"
import useValueToggle from "../useValueToggle"
import { CmpDescription, Text } from "hub"
import heart from "assets/icons/heart.svg"
import plainCode from "../utils/plain"
import { classes, descItems, metaTagsProps } from "./UseValueToggle.utils"

export default function UseCount() {
  return (
    <>
      <CmpDescription
        classNames={classes.cmpDesc}
        {...{ descItems, plainCode, metaTagsProps }}
      />
      <CmpTest />
    </>
  )
}

function CmpTest() {
  const [text, setText] = useState(
    "Once animation starts, it needs to finish to be re-triggered."
  )

  // "useValueToggle" for the animated text
  const [textCN, renderTextCN] = useValueToggle({
    on: classes.growText,
    off: "",
    timeout: 200
  })

  // "useValueToggle" for the heart image
  const [heartCN, renderHeartCN, isHeartCNActive] = useValueToggle({
    on: classes.heartbeat,
    off: "",
    timeout: 2500,
    onStart: () => {
      setText(`Started. Cannot trigger again until finished.`)
      renderTextCN()
    },
    onFinish: () => {
      setText("Finished. You can now trigger it again.")
      renderTextCN()
    }
  })

  return (
    <section className={classes.cmpTest} aria-label="component testing area">
      <Text
        htmlElem="h6"
        type={isHeartCNActive ? "primary-0" : "primary-2"}
        italic
        className={textCN}
      >
        {text}
      </Text>
      <img
        src={heart}
        alt={"❤️"}
        className={classes.heart + " " + heartCN}
        onClick={renderHeartCN}
      />
    </section>
  )
}
