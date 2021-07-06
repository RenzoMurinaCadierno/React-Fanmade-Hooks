import { useState } from "react"
import useValueToggle from "../useValueToggle"
import { CmpDescription, Text } from "hub"
import heart from "assets/icons/heart.svg"
import plainCode from "../utils/plain"
import { descItems, metaTagsProps } from "./useValueToggle.utils"
import styles from "./UseValueToggle.module.css"

export default function UseCount() {
  return (
    <>
      <CmpDescription {...{ descItems, plainCode, metaTagsProps }} />
      <CmpTest />
    </>
  )
}

function CmpTest() {
  const [text, setText] = useState(
    "Once animation starts, it needs to finish to be re-triggered"
  )
  // "useValueToggle" for the animated text
  const [textCN, renderTextCN] = useValueToggle({
    on: styles.GrowText,
    off: "",
    timeout: 200
  })
  // "useValueToggle" for the heart image
  const [heartCN, renderHeartCN, isHeartCNActive] = useValueToggle({
    on: styles.Heartbeat,
    off: "",
    timeout: 2500,
    onStart: () => {
      setText("Started. Cannot trigger again until finished")
      renderTextCN()
    },
    onFinish: () => {
      setText("Finished. You can now trigger it again")
      renderTextCN()
    }
  })

  return (
    <section className={styles.CmpTest} aria-label="component testing area">
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
        className={styles.Heart + " " + heartCN}
        onClick={renderHeartCN}
      />
    </section>
  )
}
