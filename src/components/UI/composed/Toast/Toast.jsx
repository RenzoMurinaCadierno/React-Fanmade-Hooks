import Toast from "components/UI/independent/Toast/Toast"
import ToastWithPortal from "components/UI/combined/ToastWithPortal/ToastWithPortal"

function ComposedToast(props) {
  return <Toast {...props} />
}

ComposedToast.WithPortal = ToastWithPortal

export default ComposedToast
