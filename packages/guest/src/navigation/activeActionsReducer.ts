import Action from '../IAction'
import {
  SELECT_EVENT,
  SELECT_PAGE,
  SHOW_FINDER_MODAL_EVENT
} from './activeActions'
import initialState from './activeActionsInitialState'
import IactiveActionsState from './IactiveActionsState'

export default function event(
  state: IactiveActionsState = initialState,
  { type, payload }: Action
) {
  switch (type) {
    case SELECT_EVENT:
      return {
        ...state,
        selectedEvent: payload
      } as IactiveActionsState
    case SELECT_PAGE:
      return {
        ...state,
        selectedPage: payload
      } as IactiveActionsState
    case SHOW_FINDER_MODAL_EVENT:
      return {
        ...state,
        showFinderModalEvent: payload
      } as IactiveActionsState
    default:
      return state
  }
}
