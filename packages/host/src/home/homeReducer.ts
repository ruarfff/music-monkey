import { LOCATION_CHANGE } from 'connected-react-router'
import Action from '../IAction'
import {
  AVATAR_MENU_CLOSED,
  AVATAR_MENU_OPENED,
  SIDEBAR_CLOSED,
  SIDEBAR_OPENED
} from './homeActions'
import initialState from './homeInitialState'

export default function home(state = initialState, action: Action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        location: action.payload.location.pathname
      }
    case SIDEBAR_OPENED:
      return { ...state, sidebarIsOpen: true }
    case SIDEBAR_CLOSED:
      return { ...state, sidebarIsOpen: false }
    case AVATAR_MENU_OPENED: // TODO: This is not being used yet in MainAppBar. Got half way there but didn't finish.
      return { ...state, avatarMenuIsOpen: true }
    case AVATAR_MENU_CLOSED:
      return { ...state, avatarMenuIsOpen: false }
    default:
      return state
  }
}
