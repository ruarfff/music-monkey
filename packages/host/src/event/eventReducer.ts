import { LOCATION_CHANGE } from 'connected-react-router'
import moment from 'moment'
import {
  DESELECT_EVENT_PLAYLIST,
  SET_EVENT_PLAYLIST
} from '../eventPlaylist/eventPlaylistActions'
import {
  EVENT_FETCHED_BY_ID,
  TOGGLE_AUTO_ACCEPT_SUGGESTIONS,
  TOGGLE_DYNAMIC_VOTING,
  TOGGLE_SUGGESTING_PLAYLISTS,
} from '../eventView/eventViewActions'
import Action from '../IAction'
import {
  CLEAR_MESSAGE,
  SHARE_EMAIL_FAILURE,
  SHARE_EMAIL_SUCCESS
} from '../shareEvent/shareActions'
import {
  CLEAR_SAVING_EVENT,
  CREATE_PLAYLIST_CLOSED,
  CREATE_PLAYLIST_SELECTED,
  EVENT_CONTENT_UPDATED,
  EVENT_CREATE_FORM_INITIALIZED,
  EVENT_EDIT_FAILURE,
  EVENT_EDIT_REQUEST,
  EVENT_EDIT_SUCCESS,
  EVENT_IMAGE_UPLOAD_ERROR,
  EVENT_IMAGE_UPLOADED,
  EVENT_LOCATION_CHANGED,
  EVENT_LOCATION_ERROR,
  EVENT_LOCATION_POPULATED,
  EVENT_PLAYLIST_CREATION_ERROR,
  EVENT_SAVE_ERROR,
  EVENT_SAVED,
  EVENT_SAVING_RESET,
  EVENTS_FETCH_ERROR,
  EVENTS_FETCH_INITIATED,
  EVENTS_FETCHED,
  PLAYLIST_NAME_INPUT_CHANGE,
  SELECT_EXISTING_PLAYLIST_CLOSED,
  SELECT_EXISTING_PLAYLIST_SELECTED,
  SET_CREATE_EVENT_STEP,
} from './eventActions'
import initialState from './eventInitialState'
import IEvent from './IEvent'
import IEventSettings from './IEventSettings'
import IEventState from './IEventState'

export default function event(
  state: IEventState = initialState,
  { type, payload }: Action
) {
  switch (type) {
    case CLEAR_SAVING_EVENT:
      return {
        ...state,
        savingEvent: {
          ...initialState.savingEvent,
          organizer: state.savingEvent.organizer
        }
      }
    case TOGGLE_AUTO_ACCEPT_SUGGESTIONS:
      return {
        ...state,
        savingEvent: {
          ...state.savingEvent,
          settings: {
            ...state.savingEvent.settings,
            autoAcceptSuggestionsEnabled: !state.savingEvent
              .settings.autoAcceptSuggestionsEnabled
          } as IEventSettings
        }
      }
    case TOGGLE_DYNAMIC_VOTING:
      return {
        ...state,
        savingEvent: {
          ...state.savingEvent,
          settings: {
            ...state.savingEvent.settings,
            dynamicVotingEnabled: !state.savingEvent
              .settings.dynamicVotingEnabled
          } as IEventSettings
        }
      }
    case TOGGLE_SUGGESTING_PLAYLISTS:
      return {
        ...state,
        savingEvent: {
          ...state.savingEvent,
          settings: {
            ...state.savingEvent.settings,
            suggestingPlaylistsEnabled: !state.savingEvent
              .settings.suggestingPlaylistsEnabled
          } as IEventSettings
        }
      }
    case SET_CREATE_EVENT_STEP:
      return {
        ...state,
        createEventStep: payload,
      }
    case SET_EVENT_PLAYLIST:
      const eventName = state.isPlaylistNameInputEmpty ?
        payload.name : state.savingEvent.name
      return {
        ...state,
        savingEvent: {
          ...state.savingEvent,
          name: eventName,
        },
        playlistReselected: true
      }
    case DESELECT_EVENT_PLAYLIST:
      return {
        ...state,
        savingEvent: {
          ...state.savingEvent,
          playlistUrl: ''
        }
      }
    case CLEAR_MESSAGE:
      return {
        ...state,
        shareEventMessage: ''
      }
    case SHARE_EMAIL_SUCCESS:
      return {
        ...state,
        shareEventMessage: payload.data
      }
    case SHARE_EMAIL_FAILURE:
      return {
        ...state,
        shareEventMessage: payload.data
      }
    case EVENT_EDIT_REQUEST:
      return state

    case EVENT_EDIT_FAILURE:
      return state

    case EVENT_EDIT_SUCCESS:
      return state

    case EVENT_FETCHED_BY_ID:
      return {
        ...state,
        savingEvent: payload
      }

    case EVENT_LOCATION_CHANGED:
      return {
        ...state,
        errors: { ...state.errors, location: undefined },
        savingEvent: {
          ...state.savingEvent,
          location: { ...state.savingEvent.location, address: payload }
        }
      }
    case EVENT_LOCATION_POPULATED:
      return {
        ...state,
        savingEvent: {
          ...state.savingEvent,
          location: { ...state.savingEvent.location, ...payload }
        }
      }
    case EVENT_LOCATION_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          location: payload
        }
      }
    case PLAYLIST_NAME_INPUT_CHANGE:
      return {
        ...state,
        savingEvent: {
          ...state.savingEvent,
          name: payload
        },
        isPlaylistNameInputEmpty: !payload
      }
    case EVENT_CONTENT_UPDATED: {
      const savingEvent: IEvent = {
        ...state.savingEvent,
        ...payload
      }
      const startTime = moment(savingEvent.startDateTime)
      const endTime = moment(savingEvent.endDateTime)
      if (endTime < startTime) {
        savingEvent.endDateTime = startTime.add(2, 'hours')
      }
      return {
        ...state,
        savingEvent
      }
    }
    case EVENT_IMAGE_UPLOADED:
      return {
        ...state,
        savingEvent: {
          ...state.savingEvent,
          imageUrl: payload.imgUrl,
          dataUrl: payload.dataUrl
        }
      }
    case EVENT_IMAGE_UPLOAD_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          imageUpload: payload
        }
      }
    case EVENT_SAVING_RESET:
      return {
        ...state,
        savingEvent: {
          ...initialState.savingEvent
        },
        showSavedDialogue: false
      }
    case LOCATION_CHANGE:
      return {
        ...state,
        errors: {},
        createEventStep: 0,
        showSavedDialogue: false
      }
    case EVENT_SAVED:
      return {
        ...state,
        events: [...state.events, payload],
        savingEvent: payload,
        showSavedDialogue: true
      }
    case EVENT_SAVE_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          saving: payload
        }
      }
    case SELECT_EXISTING_PLAYLIST_SELECTED:
      return {
        ...state,
        playlistInput: {
          ...state.playlistInput,
          isSelectingExistingPlaylist: true
        }
      }
    case SELECT_EXISTING_PLAYLIST_CLOSED:
      return {
        ...state,
        playlistInput: {
          ...state.playlistInput,
          isSelectingExistingPlaylist: false
        }
      }
    case CREATE_PLAYLIST_SELECTED:
      return {
        ...state,
        playlistInput: {
          ...state.playlistInput,
          isCreatingNewPlaylist: true
        }
      }
    case CREATE_PLAYLIST_CLOSED:
      return {
        ...state,
        playlistInput: {
          ...state.playlistInput,
          isCreatingNewPlaylist: false
        }
      }
    case EVENT_PLAYLIST_CREATION_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          playlistCreation: payload
        }
      }
    case EVENT_CREATE_FORM_INITIALIZED:
      return {
        ...state,
        savingEvent: {
          ...payload.event,
          organizer: payload.user.displayName,
          userId: payload.user.userId
        }
      }
    case EVENTS_FETCH_INITIATED:
      return {
        ...state,
        eventsLoading: true
      }
    case EVENTS_FETCHED:
      return {
        ...state,
        events: payload,
        eventsLoading: false
      }
    case EVENTS_FETCH_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          fetchEvents: payload
        },
        eventsLoading: false
      }
    default:
      return state
  }
}
