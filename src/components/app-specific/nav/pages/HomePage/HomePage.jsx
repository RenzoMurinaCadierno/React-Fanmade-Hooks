import { useState, useCallback, useRef } from "react"
import { Text, ExpandableMenu, ToastWithPortal } from "hub"
import { classes, toastData } from "./HomePage.utils"
animate toggler with three colors and keep on ../././
// declared outside to avoid constructing a new object on each render
const menuIconProps = { aura: { size: "small", interval: "long" } }
const toastDefaultState = { id: "", show: false }

export default function HomePage() {
  // state to control '*Toast*' `show`, and `content` and `onClick` (via "id")
  const [toastSt, setToastSt] = useState(toastDefaultState)
  // would have loved to declare "listIconsProps" outside like "menuIconProps",
  // but we need "setToastState". The best we can do to keep it constant is
  // to insert it in a ref
  const listIconsProps = useRef({
    // "e.target" is '*ExpandableIcon*' inner 'content' '*div*', rendered by
    // each '*ExpandableMenuListIcon*'(s).
    onContentClick: (e) =>
      setToastSt({ id: e?.target?.dataset?.id ?? "noId", show: true })
  })
  // '*Toast*' state resetter
  const hideToast = useCallback(() => setToastSt(toastDefaultState), [])

  return (
    // wrapper container
    <main className={classes.container}>
      {/* title and subtitles '*Text*'s */}
      <Text htmlElem="h2" italic className={classes.title}>
        React Fanmade Hooks
      </Text>
      <Text
        htmlElem="h5"
        type="secondary-1"
        italic
        className={classes.subtitle}
      >
        Hooks for all needs made by React enthusiasts.
      </Text>
      <Text htmlElem="h6" type="secondary-2" className={classes.instructions}>
        Hit the toggler at the top-left of the screen and start exploring. Have
        fun! ;)
      </Text>
      {/* expandable menu with contact info and repository link */}
      <ExpandableMenu.Root
        menuIconProps={menuIconProps}
        listIconsProps={listIconsProps.current}
      />
      {/* '*Toast*' triggered by expandable menu's options */}
      <ToastWithPortal show={toastSt.show} timeout={4000} onClose={hideToast}>
        {/* '*Text*' as content to match styles and to add "onClick" handler */}
        <Text type="primary" onClick={toastData[toastSt.id]?.onClick}>
          {toastData[toastSt.id]?.content}
        </Text>
      </ToastWithPortal>
    </main>
  )
}
