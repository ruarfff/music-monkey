import IAction from '../IAction'
import {
  AVATAR_MENU_CLOSED,
  AVATAR_MENU_OPENED,
  SIDEBAR_CLOSED,
  SIDEBAR_OPENED
} from './homeActions'
import initialState from './homeInitialState'
import home from './homeReducer'

describe('homeReducer', () => {
  it('should return the initial state when no action matches', () => {
    expect(home(undefined, {} as IAction)).toEqual(initialState)
  })

  it('should handle SIDEBAR_OPENED', () => {
    expect(home(initialState, { type: SIDEBAR_OPENED })).toEqual({
      ...initialState,
      sidebarIsOpen: true
    })
  })

  it('should handle SIDEBAR_CLOSED', () => {
    expect(
      home({ ...initialState, sidebarIsOpen: true }, { type: SIDEBAR_CLOSED })
    ).toEqual({ ...initialState, sidebarIsOpen: false })
  })

  it('should handle AVATAR_MENU_OPENED', () => {
    expect(home(initialState, { type: AVATAR_MENU_OPENED })).toEqual({
      ...initialState,
      avatarMenuIsOpen: true
    })
  })

  it('should handle AVATAR_MENU_CLOSED', () => {
    expect(
      home(
        { ...initialState, avatarMenuIsOpen: true },
        { type: AVATAR_MENU_CLOSED }
      )
    ).toEqual({ ...initialState, avatarMenuIsOpen: false })
  })
})
