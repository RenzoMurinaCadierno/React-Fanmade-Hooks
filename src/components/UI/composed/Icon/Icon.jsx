import Icon from "components/UI/independent/Icon/Icon"
import ExpandableIcon from "components/UI/combined/ExpandableIcon/ExpandableIcon"
import IconWithToast from "components/UI/combined/Icon/IconWithToast/IconWithToast"
import IconWithAura from "components/UI/combined/Icon/IconWithAura/IconWithAura"

function ComposedIcon(props) {
  return <Icon {...props} />
}

function ExpandableIconWithAura(props) {
  return <IconWithAura {...props} isExpandable />
}

function ExpandableIconWithToast(props) {
  return <IconWithToast {...props} isExpandable />
}

ComposedIcon.WithAura = IconWithAura
ComposedIcon.WithToast = IconWithToast
ComposedIcon.Expandable = ExpandableIcon
ComposedIcon.Expandable.WithAura = ExpandableIconWithAura
ComposedIcon.Expandable.WithToast = ExpandableIconWithToast

export default ComposedIcon
