import {
  TOGGLE_SLOTS_ACTIVE,
  PROCESS_SLOTS_RESULTS,
  RESTART_GAME
} from "./slotsGame.action.types"

export function toggleSlotsActive(isActive) {
  return {
    type: TOGGLE_SLOTS_ACTIVE,
    payload: isActive
  }
}

export function processSlotsResults(slotName) {
  return {
    type: PROCESS_SLOTS_RESULTS,
    payload: slotName
  }
}

export function restartGame(reducerItems, lives) {
  return {
    type: RESTART_GAME,
    payload: { reducerItems, lives }
  }
}
