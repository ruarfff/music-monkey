import IAction from '../IAction'
import IPlaylist from '../playlist/IPlaylist'
import IDecoratedSuggestion from '../suggestion/IDecoratedSuggestion'
import ITrackVoteStatus from '../vote/ITrackVoteStatus'

export const SAVE_EVENT_PLAYLIST = 'SAVE_EVENT_PLAYLIST'
export const SAVE_EVENT_PLAYLIST_SUCCESS = 'SAVE_EVENT_PLAYLIST_SUCCESS'
export const SAVE_EVENT_PLAYLIST_ERROR = 'SAVE_EVENT_PLAYLIST_ERROR'

export const EVENT_PLAYLIST_FETCHED = 'EVENT_PLAYLIST_FETCHED'

export const MOVE_ITEM_IN_EVENT_PLAYLIST = 'MOVE_ITEM_IN_EVENT_PLAYLIST'

export const SET_EVENT_PLAYLIST = 'SET_EVENT_PLAYLIST'
export const DESELECT_EVENT_PLAYLIST = 'DESELECT_EVENT_PLAYLIST'

export const SORT_PLAYLIST_BY_VOTES_DESCENDING =
  'SORT_PLAYLIST_BY_VOTES_DESCENDING'
export const PLAYLIST_SORTED_BY_VOTES_DESCENDING =
  'PLAYLIST_SORTED_BY_VOTES_DESCENDING'

export const deselectPlaylist = ():IAction => ({
  type: DESELECT_EVENT_PLAYLIST
})

export const setEventPlaylist = (playlist: IPlaylist): IAction => ({
  type: SET_EVENT_PLAYLIST,
  payload: playlist,
})

export const saveEventPlaylist = (
  eventId: string,
  playlist: IPlaylist,
  suggestions: Map<string, IDecoratedSuggestion>
): IAction => ({
  type: SAVE_EVENT_PLAYLIST,
  payload: { eventId, playlist, suggestions }
})

export const moveItemInEventPlaylist = (
  playlist: IPlaylist,
  fromIndex: number,
  toIndex: number
): IAction => ({
  type: MOVE_ITEM_IN_EVENT_PLAYLIST,
  payload: { playlist, fromIndex, toIndex }
})

export const sortPlaylistByVotesDescending = (
  playlist: IPlaylist,
  votes: Map<string, ITrackVoteStatus>
): IAction => ({
  type: SORT_PLAYLIST_BY_VOTES_DESCENDING,
  payload: { playlist, votes }
})
