import Icon from "components/UI/independent/Icon/Icon"
import ExpandableIcon from "components/UI/combined/ExpandableIcon/ExpandableIcon"
import ExpandableIconWithAura from "components/UI/combined/ExpandableIcon/ExpandableIconWithAura/ExpandableIconWithAura"
import ExpandableIconWithToast from "components/UI/combined/ExpandableIcon/ExpandableIconWithToast/ExpandableIconWithToast"

const ComposedIcon = { ...Icon }

ComposedIcon.Expandable = ExpandableIcon
ComposedIcon.Expandable.WithAura = ExpandableIconWithAura
ComposedIcon.Expandable.WithToast = ExpandableIconWithToast

export default ComposedIcon
