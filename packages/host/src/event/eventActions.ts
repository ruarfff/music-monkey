import Action from 'IAction'
import IEvent from './IEvent'
import IPlaylist from 'playlist/IPlaylist'
import IDecoratedSuggestion from 'suggestion/IDecoratedSuggestion'
import ITrackVoteStatus from 'vote/ITrackVoteStatus'

export const EVENTS_FETCH_INITIATED = 'EVENTS_FETCH_INITIATED'
export const EVENTS_FETCHED = 'EVENTS_FETCHED'
export const EVENTS_FETCH_ERROR = 'EVENTS_FETCH_ERROR'

export const EVENT_FETCH_BY_ID_INITIATED = 'EVENT_FETCH_BY_ID_INITIATED'
export const EVENT_FETCH_BY_ID_NO_LOADING_INITIATED =
  'EVENT_FETCH_BY_ID_NO_LOADING_INITIATED'
export const EVENT_FETCHED_BY_ID = 'EVENT_FETCHED_BY_ID'
export const EVENT_FETCH_BY_ID_ERROR = 'EVENT_FETCH_BY_ID_ERROR'
export const EVENT_DELETE_SELECTED = 'EVENT_DELETE_SELECTED'
export const EVENT_DELETE_CLOSED = 'EVENT_DELETE_CLOSED'
export const EVENT_DELETE_INITIATED = 'EVENT_DELETE_INITIATED'
export const EVENT_DELETE_SUCCESSFUL = 'EVENT_DELETE_SUCCESSFUL'
export const EVENT_DELETE_FAILED = 'EVENT_DELETE_FAILED'
export const EVENT_INVITE_COPIED = 'EVENT_INVITE_COPIED'
export const EVENT_INVITE_COPY_ACKNOWLEDGED = 'EVENT_INVITE_COPY_ACKNOWLEDGED'

export const REFRESH_EVENT_PLAYLIST = 'REFRESH_EVENT_PLAYLIST'
export const REFRESH_EVENT_PLAYLIST_SUCCESS = 'REFRESH_EVENT_PLAYLIST_SUCCESS'
export const REFRESH_EVENT_PLAYLIST_FAILED = 'REFRESH_EVENT_PLAYLIST_FAILED'

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

export const EVENT_PLAYLIST_FETCHED = 'EVENT_PLAYLIST_FETCHED'

export const MOVE_ITEM_IN_EVENT_PLAYLIST = 'MOVE_ITEM_IN_EVENT_PLAYLIST'

export const SET_EVENT_PLAYLIST = 'SET_EVENT_PLAYLIST'
export const UPDATE_PLAYLIST_AFTER_COPY = 'UPDATE_PLAYLIST_AFTER_COPY'
export const DESELECT_EVENT_PLAYLIST = 'DESELECT_EVENT_PLAYLIST'

export const SORT_PLAYLIST_BY_VOTES_DESCENDING =
  'SORT_PLAYLIST_BY_VOTES_DESCENDING'
export const PLAYLIST_SORTED_BY_VOTES_DESCENDING =
  'PLAYLIST_SORTED_BY_VOTES_DESCENDING'

export const getEventById = (eventId: string): Action => ({
  payload: eventId,
  type: EVENT_FETCH_BY_ID_INITIATED
})

export const getEventByIdNoLoading = (eventId: string): Action => ({
  payload: eventId,
  type: EVENT_FETCH_BY_ID_NO_LOADING_INITIATED
})

export const onEventDeleteSelected = (): Action => ({
  type: EVENT_DELETE_SELECTED
})

export const onEventDeleteClosed = (): Action => ({
  type: EVENT_DELETE_CLOSED
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

export const toggleDynamicVoting = (event: IEvent): Action => ({
  type: TOGGLE_DYNAMIC_VOTING,
  payload: event
})

export const toggleAutoAcceptSuggestions = (event: IEvent): Action => ({
  type: TOGGLE_AUTO_ACCEPT_SUGGESTIONS,
  payload: event
})

export const toggleSuggestingPlaylists = (event: IEvent): Action => ({
  type: TOGGLE_SUGGESTING_PLAYLISTS,
  payload: event
})

export const getEvents = (): Action => ({
  type: EVENTS_FETCH_INITIATED
})

export const updatePlaylistAfterCopy = (playlist: IPlaylist): Action => ({
  type: UPDATE_PLAYLIST_AFTER_COPY,
  payload: playlist
})

export const deselectPlaylist = (): Action => ({
  type: DESELECT_EVENT_PLAYLIST
})

export const setEventPlaylist = (playlist: IPlaylist): Action => ({
  type: SET_EVENT_PLAYLIST,
  payload: playlist
})

export const saveEventPlaylist = (
  eventId: string,
  playlist: IPlaylist,
  suggestions: Map<string, IDecoratedSuggestion>
): Action => ({
  type: SAVE_EVENT_PLAYLIST,
  payload: { eventId, playlist, suggestions }
})

export const moveItemInEventPlaylist = (
  playlist: IPlaylist,
  fromIndex: number,
  toIndex: number
): Action => ({
  type: MOVE_ITEM_IN_EVENT_PLAYLIST,
  payload: { playlist, fromIndex, toIndex }
})

export const sortPlaylistByVotesDescending = (
  playlist: IPlaylist,
  votes: Map<string, ITrackVoteStatus>
): Action => ({
  type: SORT_PLAYLIST_BY_VOTES_DESCENDING,
  payload: { playlist, votes }
})
