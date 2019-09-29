import IAction from 'IAction'
import IPlaylist from 'playlist/IPlaylist'
import IPlaylistItem from 'playlist/IPlaylistItem'
import IPlaylistTracks from 'playlist/IPlaylistTracks'
import {
  EVENT_PLAYLIST_FETCHED,
  moveItemInEventPlaylist,
  SAVE_EVENT_PLAYLIST,
  SAVE_EVENT_PLAYLIST_ERROR,
  SAVE_EVENT_PLAYLIST_SUCCESS
} from './eventPlaylistActions'
import initialState from './eventPlaylistInitialState'
import eventPlaylist from './eventPlaylistReducer'

describe('eventPlaylistReducer', () => {
  it('should return the initial state when no action matches', () => {
    expect(eventPlaylist(undefined, {} as IAction)).toEqual(initialState)
  })

  it('should handle SAVE_EVENT_PLAYLIST', () => {
    expect(
      eventPlaylist(initialState, {
        type: SAVE_EVENT_PLAYLIST
      })
    ).toEqual({
      ...initialState,
      savingEventPlaylist: true
    })
  })

  it('should handle SAVE_EVENT_PLAYLIST_SUCCESS', () => {
    expect(
      eventPlaylist(
        {
          ...initialState,
          savingEventPlaylist: true
        },
        {
          type: SAVE_EVENT_PLAYLIST_SUCCESS
        }
      )
    ).toEqual({
      ...initialState,
      savingEventPlaylist: false
    })
  })

  it('should handle SAVE_EVENT_PLAYLIST_ERROR', () => {
    expect(
      eventPlaylist(
        {
          ...initialState,
          savingEventPlaylist: true
        },
        {
          type: SAVE_EVENT_PLAYLIST_ERROR,
          payload: new Error('oh-the-humanity')
        }
      )
    ).toEqual({
      ...initialState,
      savingEventPlaylist: false,
      saveEventPlaylistError: new Error('oh-the-humanity')
    })
  })

  it('should handle EVENT_PLAYLIST_FETCHED', () => {
    const playlist = { id: 'playlist-id' } as IPlaylist
    expect(
      eventPlaylist(
        { ...initialState },
        { type: EVENT_PLAYLIST_FETCHED, payload: playlist }
      )
    ).toEqual({ ...initialState, playlist })
  })

  it('should handle MOVE_ITEM_IN_EVENT_PLAYLIST', () => {
    const item1 = { track: { uri: 'item:1' } } as IPlaylistItem
    const item2 = { track: { uri: 'item:2' } } as IPlaylistItem
    const item3 = { track: { uri: 'item:3' } } as IPlaylistItem

    const tracks = { items: [item1, item2, item3] } as IPlaylistTracks
    const originalPlaylist = { id: 'playlist-id', tracks } as IPlaylist
    const reOrderedTracks = { items: [item2, item1, item3] } as IPlaylistTracks
    const reOrderedPlaylist = {
      id: 'playlist-id',
      tracks: reOrderedTracks
    } as IPlaylist
    expect(
      eventPlaylist(
        { ...initialState, playlist: originalPlaylist },
        moveItemInEventPlaylist(originalPlaylist, 0, 1)
      )
    ).toEqual({ ...initialState, playlist: reOrderedPlaylist })
  })
})
