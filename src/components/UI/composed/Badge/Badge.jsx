import Badge from "components/UI/independent/Badge/Badge"
import BadgeWithAnimatedNumber from "components/UI/combined/BadgeWithAnimatedNumber/BadgeWithAnimatedNumber"

function ComposedBadge(props) {
  return <Badge {...props} />
}

ComposedBadge.WithAnimatedNumber = BadgeWithAnimatedNumber

export default ComposedBadge
