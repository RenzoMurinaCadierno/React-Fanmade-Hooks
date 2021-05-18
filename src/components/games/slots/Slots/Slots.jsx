import SlotsBadgeWithScoreAnimation from "../SlotsBadgeWithScoreAnimation/SlotsBadgeWithScoreAnimation"
import SlotsEffectBadgeContent from "../SlotsEffectBadgeContent/SlotsEffectBadgeContent"
import SlotsGameRootNode from "../SlotsGameRootNode/SlotsGameRootNode"
import SlotsResultItem from "../SlotsResultItem/SlotsResultItem"
import SlotsResultScreen from "../SlotsResultScreen/SlotsResultScreen"
import SlotsResultSection from "../SlotsResultSection/SlotsResultSection"
import SlotsScoreItem from "../SlotsScoreItem/SlotsScoreItem"
import SlotsScoreSide from "../SlotsScoreSide/SlotsScoreSide"
import SlotsSlotMachine from "../SlotsSlotMachine/SlotsSlotMachine"
import SlotsSpinningSlot from "../SlotsSpinningSlot/SlotsSpinningSlot"
import {
  slotsGameReducer,
  getReducerInitialState
} from "../store/slotsGame.reducer"
import * as actions from "../store/slotsGame.action.creators"

export default {
  Root: SlotsGameRootNode,
  ResultScreen: SlotsResultScreen,
  ResultSection: SlotsResultSection,
  ResultItem: SlotsResultItem,
  SlotMachine: SlotsSlotMachine,
  SpinningSlot: SlotsSpinningSlot,
  ScoreItem: SlotsScoreItem,
  ScoreSide: SlotsScoreSide,
  BadgeWithScoreAnimation: SlotsBadgeWithScoreAnimation,
  EffectBadgeContent: SlotsEffectBadgeContent,
  reducer: slotsGameReducer,
  getInitialState: getReducerInitialState,
  actions
}
