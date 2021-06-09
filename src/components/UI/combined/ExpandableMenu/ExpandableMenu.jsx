import ExpandableMenuRoot from "./ExpandableMenuRoot/ExpandableMenuRoot"
import ExpandableMenuMainIcon from "./ExpandableMenuMainIcon/ExpandableMenuMainIcon"
import ExpandableMenuListIcon from "./ExpandableMenuListIcon/ExpandableMenuListIcon"

function ComposedExpandableMenu(props) {
  return <ExpandableMenuRoot {...props} />
}

ComposedExpandableMenu.MainIcon = ExpandableMenuMainIcon
ComposedExpandableMenu.ListIcon = ExpandableMenuListIcon

export default ComposedExpandableMenu
