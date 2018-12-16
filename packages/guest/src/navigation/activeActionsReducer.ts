import Action from '../IAction'
import {
  CLEAR_PLAYLIST,
  SELECT_EVENT,
  SELECT_PAGE,
  SELECT_PLAYLIST,
  SHOW_FINDER_MODAL_EVENT,
  SHOW_SPINNER
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
    case SELECT_PLAYLIST:
      return {
        ...state,
        selectedPlayList: payload
      } as IactiveActionsState
    case CLEAR_PLAYLIST:
      return {
        ...state,
        selectedPlayList: {}
      } as IactiveActionsState
    case SHOW_SPINNER:
      return {
        ...state,
        showSpinner: payload
      } as IactiveActionsState
    default:
      return state
  }
}
