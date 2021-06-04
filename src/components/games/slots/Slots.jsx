import SlotsBadgeWithScoreAnimation from "./SlotsBadgeWithScoreAnimation/SlotsBadgeWithScoreAnimation"
import SlotsEffectBadgeContent from "./SlotsEffectBadgeContent/SlotsEffectBadgeContent"
import SlotsGameRootNode from "./SlotsGameRootNode/SlotsGameRootNode"
import SlotsResultItem from "./SlotsResultItem/SlotsResultItem"
import SlotsResultScreen from "./SlotsResultScreen/SlotsResultScreen"
import SlotsResultSection from "./SlotsResultSection/SlotsResultSection"
import SlotsScoreItem from "./SlotsScoreItem/SlotsScoreItem"
import SlotsScoreSide from "./SlotsScoreSide/SlotsScoreSide"
import SlotsSlotMachine from "./SlotsSlotMachine/SlotsSlotMachine"
import SlotsSpinningSlot from "./SlotsSpinningSlot/SlotsSpinningSlot"
import {
  slotsGameReducer,
  getReducerInitialState
} from "./store/slotsGame.reducer"
import * as actions from "./store/slotsGame.action.creators"

function ComposedSlots(props) {
  return <SlotsGameRootNode {...props} />
}

ComposedSlots.Root = SlotsGameRootNode
ComposedSlots.ResultScreen = SlotsResultScreen
ComposedSlots.ResultSection = SlotsResultSection
ComposedSlots.ResultItem = SlotsResultItem
ComposedSlots.SlotMachine = SlotsSlotMachine
ComposedSlots.SpinningSlot = SlotsSpinningSlot
ComposedSlots.ScoreItem = SlotsScoreItem
ComposedSlots.ScoreSide = SlotsScoreSide
ComposedSlots.BadgeWithScoreAnimation = SlotsBadgeWithScoreAnimation
ComposedSlots.EffectBadgeContent = SlotsEffectBadgeContent
ComposedSlots.reducer = slotsGameReducer
ComposedSlots.getInitialState = getReducerInitialState
ComposedSlots.actions = actions

export default ComposedSlots
