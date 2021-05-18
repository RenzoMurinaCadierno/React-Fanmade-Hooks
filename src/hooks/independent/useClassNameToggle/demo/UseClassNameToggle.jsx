import React, { useState } from "react"
import useClassNameToggle from "../useClassNameToggle"
import { CmpDescription, Text } from "../../../../hub"
import heart from "../../../../assets/icons/heart.svg"
import { descItemsObject } from "./UseClassNameToggle.utils"
import styles from "./UseClassNameToggle.module.css"

export default function UseCount() {
  const [text, setText] = useState(
    "Once animation starts, it needs to finish to be re-triggered"
  )

  const [textCN, activateTextCN] = useClassNameToggle({
    className: styles.GrowText,
    timeout: 200
  })

  const [heartCN, activateHeartCN, isHeartCNActive] = useClassNameToggle({
    className: styles.Heartbeat,
    timeout: 2500,
    onStart: () => {
      setText("Started. Cannot trigger again until finished")
      activateTextCN()
    },
    onFinish: () => {
      setText("Finished. You can now trigger it again")
      activateTextCN()
    }
  })

  return (
    <>
      <CmpDescription descItems={descItemsObject} />
      <section className={styles.Grid} aria-label="component testing area">
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
          onClick={activateHeartCN}
        />
      </section>
    </>
  )
}
