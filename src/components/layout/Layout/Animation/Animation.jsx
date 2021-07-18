import { useState, useEffect } from "react"
import { useValueToggle } from "hub"
import { classes, defaultProps, propTypes } from "./Animation.utils"

export default function Animation({
  children,
  mount,
  idle,
  unmount,
  unmountTimeout = 2000,
  onMountStart,
  onMountEnd,
  onIdleStart,
  onUnmountStart,
  onUnmountEnd,
  className,
  ...otherProps
}) {
  const [show, setShow] = useState(false)

  const [mountCN, triggerMountCN, isMountTriggered] = useValueToggle({
    on: " " + classes.mount(mount),
    off: "",
    timeout: 250,
    onStart: () => {
      setShow(true)
      onMountStart?.()
    },
    onFinish: () => {
      triggerIdleCN()
      onMountEnd?.()
    }
  })

  const [idleCN, triggerIdleCN, isIdleTriggered] = useValueToggle({
    on: " " + classes.idle(idle),
    off: "",
    timeout: 9999999999999,
    onStart: () => {
      if (!Boolean(mount)) {
        setShow(true)
        onIdleStart?.()
      }
    }
  })

  const [unmountCN, triggerUnmountCN, isUnmountTriggered] = useValueToggle({
    on: " " + classes.unmount(unmount),
    off: "",
    timeout: 250,
    onStart: () => {
      if (!Boolean(mount) && !Boolean(idle)) {
        setShow(true)
        onUnmountStart?.()
      }
    },
    onFinish: () => {
      setShow(false)
      onUnmountEnd?.()
    }
  })

  useEffect(() => {
    let unmountTimeoutId

    if (Boolean(mount)) triggerMountCN()
    else if (Boolean(idle)) triggerIdleCN()
    else if (Boolean(unmount)) {
      unmountTimeoutId = setTimeout(triggerUnmountCN, 250 + unmountTimeout)
    }

    return () => clearTimeout(unmountTimeoutId)
  }, [])

  useEffect(() => {
    let unmountTimeoutId

    if (isMountTriggered || (mount && isIdleTriggered)) {
      unmountTimeoutId = setTimeout(triggerUnmountCN, 250 + unmountTimeout)
    }

    return () => clearTimeout(unmountTimeoutId)
  }, [isMountTriggered, isIdleTriggered])

  return (
    show && (
      <div
        className={
          classes.container(className) +
          (Boolean(mount) ? mountCN : "") +
          (Boolean(idle) && isUnmountTriggered ? "" : idleCN) +
          (Boolean(unmount) ? unmountCN : "")
        }
        {...otherProps}
      >
        {children}
      </div>
    )
  )
}

Animation.defaultProps = defaultProps
Animation.propTypes = propTypes
