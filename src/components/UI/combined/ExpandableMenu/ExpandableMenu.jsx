import ExpandableMenuRoot from "./ExpandableMenuRoot/ExpandableMenuRoot"
import ExpandableMenuMainIcon from "./ExpandableMenuMainIcon/ExpandableMenuMainIcon"
import ExpandableMenuListIcon from "./ExpandableMenuListIcon/ExpandableMenuListIcon"
import ExpandableMenuListIconWithToast from "./ExpandableMenuListIconWithToast/ExpandableMenuListIconWithToast"

function ComposedExpandableMenu(props) {
  return <ExpandableMenuRoot {...props} />
}

ComposedExpandableMenu.MainIcon = ExpandableMenuMainIcon
ComposedExpandableMenu.ListIcon = ExpandableMenuListIcon
ComposedExpandableMenu.ListIcon.WithToast = ExpandableMenuListIconWithToast

export default ComposedExpandableMenu
