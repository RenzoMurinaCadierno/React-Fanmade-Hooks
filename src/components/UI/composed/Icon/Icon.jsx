import Icon from "components/UI/independent/Icon/Icon"
import IconExpandable from "components/UI/combined/Icon/IconExpandable/IconExpandable"
import IconWithToast from "components/UI/combined/Icon/IconWithToast/IconWithToast"
import IconWithAura from "components/UI/combined/Icon/IconWithAura/IconWithAura"

function ComposedIcon(props) {
  return <Icon {...props} />
}

function IconExpandableWithAura(props) {
  return <IconWithAura {...props} isExpandable />
}

function IconExpandableWithToast(props) {
  return <IconWithToast {...props} isExpandable />
}

ComposedIcon.WithAura = IconWithAura
ComposedIcon.WithToast = IconWithToast
ComposedIcon.Expandable = IconExpandable
ComposedIcon.Expandable.WithAura = IconExpandableWithAura
ComposedIcon.Expandable.WithToast = IconExpandableWithToast

export default ComposedIcon
