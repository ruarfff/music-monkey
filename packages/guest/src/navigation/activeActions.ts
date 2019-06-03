import IAction from '../IAction'

export const SELECT_EVENT = 'SELECT_EVENT'
export const SELECT_PAGE = 'SELECT_PAGE'
export const SHOW_FINDER_MODAL_EVENT = 'showFinderModalEvent'

export const selectPage = (page: string): IAction => ({
  payload: page,
  type: SELECT_PAGE
})

export const showFinderModalEvent = (value: boolean): IAction => ({
  payload: value,
  type: SHOW_FINDER_MODAL_EVENT
})
