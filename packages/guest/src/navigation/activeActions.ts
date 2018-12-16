import IEvent from '../event/IEvent'
import IAction from '../IAction'
import IPlaylist from '../playlist/IPlaylist';

export const SELECT_EVENT = 'SELECT_EVENT'
export const SELECT_PAGE = 'SELECT_PAGE'
export const CLEAR_PLAYLIST = 'CLEAR_PLAYLIST'
export const SELECT_PLAYLIST = 'SELECT_PLAYLIST'
export const SHOW_SPINNER = 'SHOW_SPINNER'
export const SHOW_FINDER_MODAL_EVENT ='showFinderModalEvent'

export const selectEvent = (event: IEvent): IAction => ({
  payload: event,
  type: SELECT_EVENT
})

export const selectPage = (page: string): IAction => ({
  payload: page,
  type: SELECT_PAGE
})

export const selectPlaylist = (playlist: IPlaylist): IAction => ({
  payload: playlist,
  type: SELECT_PLAYLIST
})

export const clearPlaylist = (playlist: IPlaylist): IAction => ({
  payload: playlist,
  type: CLEAR_PLAYLIST
})

export const showSpinner = (value: boolean): IAction => ({
  payload: value,
  type: SHOW_SPINNER
})

export const showFinderModalEvent = (value: boolean): IAction => ({
  payload: value,
  type: SHOW_FINDER_MODAL_EVENT
})
