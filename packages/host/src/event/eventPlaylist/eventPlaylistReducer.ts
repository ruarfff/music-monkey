import cloneDeep from 'lodash/cloneDeep'
import IAction from 'IAction'
import IPlaylist from 'playlist/IPlaylist'
import {
  ADD_TRACK_SUCCESS,
  REMOVE_TRACK_SUCCESS
} from 'playlist/playlistActions'
import arrayMove from 'util/arrayMove'
import {
  DESELECT_EVENT_PLAYLIST,
  EVENT_PLAYLIST_FETCHED,
  MOVE_ITEM_IN_EVENT_PLAYLIST,
  PLAYLIST_SORTED_BY_VOTES_DESCENDING,
  SAVE_EVENT_PLAYLIST,
  SAVE_EVENT_PLAYLIST_ERROR,
  SAVE_EVENT_PLAYLIST_SUCCESS,
  SET_EVENT_PLAYLIST,
  UPDATE_PLAYLIST_AFTER_COPY
} from './eventPlaylistActions'
import initialState from './eventPlaylistInitialState'
import IEventPlaylistState from './IEventPlaylistState'

export default function eventPlaylist(
  state: IEventPlaylistState = initialState,
  { type, payload }: IAction
) {
  switch (type) {
    case DESELECT_EVENT_PLAYLIST:
      return {
        ...state,
        playlist: {} as IPlaylist
      }
    case UPDATE_PLAYLIST_AFTER_COPY:
      return {
        ...state,
        playlist: {
          ...state.playlist,
          id: payload.id,
          uri: payload.uri,
          name: payload.name,
          external_urls: payload.external_urls,
          href: payload.href
        }
      }
    case SET_EVENT_PLAYLIST:
      return {
        ...state,
        playlist: payload
      }
    case ADD_TRACK_SUCCESS:
      const newPlaylist = cloneDeep(state.playlist)
      newPlaylist.tracks.items.unshift({
        added_at: `${Date.now()}`,
        track: payload
      })
      return {
        ...state,
        playlist: newPlaylist
      }
    case SAVE_EVENT_PLAYLIST:
      return { ...state, savingEventPlaylist: true }
    case SAVE_EVENT_PLAYLIST_SUCCESS:
      return { ...state, savingEventPlaylist: false }
    case SAVE_EVENT_PLAYLIST_ERROR:
      return {
        ...state,
        savingEventPlaylist: false,
        saveEventPlaylistError: payload
      }
    case EVENT_PLAYLIST_FETCHED:
      return {
        ...state,
        playlist: payload
      }
    case REMOVE_TRACK_SUCCESS:
      return {
        ...state,
        playlist: payload
      }
    case MOVE_ITEM_IN_EVENT_PLAYLIST: {
      try {
        const { fromIndex, toIndex } = payload
        const playlist = { ...payload.playlist }
        const playlistItems = [...playlist.tracks.items]
        arrayMove(playlistItems, fromIndex, toIndex)
        return {
          ...state,
          playlist: {
            ...playlist,
            tracks: { ...playlist.tracks, items: playlistItems }
          }
        }
      } catch (err) {
        console.error(err)
        return state
      }
    }
    case PLAYLIST_SORTED_BY_VOTES_DESCENDING: {
      return {
        ...state,
        playlist: payload
      }
    }
    default:
      return state
  }
}
