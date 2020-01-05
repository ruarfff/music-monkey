import { Action, Event, Playlist, TrackVoteStatus } from 'mm-shared'
import IDecoratedSuggestion from 'requests/IDecoratedSuggestion'

export const DESELECT_EVENT = 'DESELECT_EVENT'
export const EVENT_SELECTED = 'EVENT_SELECTED'
export const EVENTS_FETCH_INITIATED = 'EVENTS_FETCH_INITIATED'
export const EVENTS_FETCHED = 'EVENTS_FETCHED'
export const EVENTS_FETCH_ERROR = 'EVENTS_FETCH_ERROR'

export const EVENT_FETCH_BY_ID_INITIATED = 'EVENT_FETCH_BY_ID_INITIATED'
export const EVENT_FETCH_BY_ID_NO_LOADING_INITIATED =
  'EVENT_FETCH_BY_ID_NO_LOADING_INITIATED'
export const EVENT_FETCHED_BY_ID = 'EVENT_FETCHED_BY_ID'
export const EVENT_FETCH_BY_ID_ERROR = 'EVENT_FETCH_BY_ID_ERROR'

export const EVENT_DELETE_INITIATED = 'EVENT_DELETE_INITIATED'
export const EVENT_DELETE_SUCCESSFUL = 'EVENT_DELETE_SUCCESSFUL'

export const EVENT_INVITE_COPIED = 'EVENT_INVITE_COPIED'
export const EVENT_INVITE_COPY_ACKNOWLEDGED = 'EVENT_INVITE_COPY_ACKNOWLEDGED'

export const TOGGLE_DYNAMIC_VOTING = 'TOGGLE_DYNAMIC_VOTING'
export const TOGGLE_DYNAMIC_VOTING_ERROR = 'TOGGLE_DYNAMIC_VOTING_ERROR'
export const TOGGLE_AUTO_ACCEPT_SUGGESTIONS = 'TOGGLE_AUTO_ACCEPT_SUGGESTIONS'
export const TOGGLE_AUTO_ACCEPT_SUGGESTIONS_ERROR =
  'TOGGLE_AUTO_ACCEPT_SUGGESTIONS_ERROR'
export const TOGGLE_SUGGESTING_PLAYLISTS = 'TOGGLE_SUGGESTING_PLAYLISTS'
export const TOGGLE_SUGGESTING_PLAYLISTS_ERROR =
  'TOGGLE_SUGGESTING_PLAYLISTS_ERROR'

export const SAVE_EVENT_PLAYLIST = 'SAVE_EVENT_PLAYLIST'
export const SAVE_EVENT_PLAYLIST_SUCCESS = 'SAVE_EVENT_PLAYLIST_SUCCESS'
export const SAVE_EVENT_PLAYLIST_ERROR = 'SAVE_EVENT_PLAYLIST_ERROR'

export const MOVE_ITEM_IN_EVENT_PLAYLIST = 'MOVE_ITEM_IN_EVENT_PLAYLIST'

export const SORT_PLAYLIST_BY_VOTES_DESCENDING =
  'SORT_PLAYLIST_BY_VOTES_DESCENDING'
export const PLAYLIST_SORTED_BY_VOTES_DESCENDING =
  'PLAYLIST_SORTED_BY_VOTES_DESCENDING'

export const selectEvent = (event: Event): Action => ({
  payload: event,
  type: EVENT_SELECTED
})

export const deselectEvent = (): Action => ({
  type: DESELECT_EVENT
})

export const getEventById = (eventId: string): Action => ({
  payload: eventId,
  type: EVENT_FETCH_BY_ID_INITIATED
})

export const getEventByIdNoLoading = (eventId: string): Action => ({
  payload: eventId,
  type: EVENT_FETCH_BY_ID_NO_LOADING_INITIATED
})

export const deleteEvent = (eventId: string): Action => ({
  type: EVENT_DELETE_INITIATED,
  payload: eventId
})

export const copyEventInvite = (): Action => ({
  type: EVENT_INVITE_COPIED
})

export const acknowledgeEventInviteCopied = (): Action => ({
  type: EVENT_INVITE_COPY_ACKNOWLEDGED
})

export const toggleDynamicVoting = (event: Event): Action => ({
  type: TOGGLE_DYNAMIC_VOTING,
  payload: event
})

export const toggleAutoAcceptSuggestions = (event: Event): Action => ({
  type: TOGGLE_AUTO_ACCEPT_SUGGESTIONS,
  payload: event
})

export const toggleSuggestingPlaylists = (event: Event): Action => ({
  type: TOGGLE_SUGGESTING_PLAYLISTS,
  payload: event
})

export const getEvents = (): Action => ({
  type: EVENTS_FETCH_INITIATED
})

export const saveEventPlaylist = (
  eventId: string,
  playlist: Playlist,
  suggestions: Map<string, IDecoratedSuggestion>
): Action => ({
  type: SAVE_EVENT_PLAYLIST,
  payload: { eventId, playlist, suggestions }
})

export const moveItemInEventPlaylist = (
  playlist: Playlist,
  fromIndex: number,
  toIndex: number
): Action => ({
  type: MOVE_ITEM_IN_EVENT_PLAYLIST,
  payload: { playlist, fromIndex, toIndex }
})

export const sortPlaylistByVotesDescending = (
  playlist: Playlist,
  votes: Map<string, TrackVoteStatus>
): Action => ({
  type: SORT_PLAYLIST_BY_VOTES_DESCENDING,
  payload: { playlist, votes }
})
