import Badge from "components/UI/combined/Badge/Badge"
import BadgeWithAnimatedNumber from "components/UI/combined/BadgeWithAnimatedNumber/BadgeWithAnimatedNumber"

function ComposedBadge(props) {
  return <Badge {...props} />
}

ComposedBadge.WithAnimatedNumber = BadgeWithAnimatedNumber

export default ComposedBadge
