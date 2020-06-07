import React, { FC, createContext, useReducer } from 'react'
import isEmpty from 'lodash/isEmpty'
//import uniqBy from 'lodash/uniqBy'

export interface NotificationState {
  acceptedTracks: string[]
  requestedTracks: string[]
}

export interface NotificationContext {
  notification: NotificationState
  setNotification(notification: any): void
}

const initialState: NotificationState = {
  acceptedTracks: [],
  requestedTracks: []
}
export const notificationContext = createContext<NotificationContext>({
  notification: initialState,
  setNotification: () => {}
})

let reducer = (
  state: NotificationState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case 'clear':
      if (!isEmpty(state.acceptedTracks) || !isEmpty(state.requestedTracks)) {
        return { acceptedTracks: [], requestedTracks: [] }
      }
      return state
    case 'accept':
      return {
        ...state,
        acceptedTracks: [...state.acceptedTracks, ...action.payload]
      }
    case 'request':
      return {
        ...state,
        requestedTracks: [...state.requestedTracks, ...action.payload]
      }
    case 'acceptRequest':
      return {
        ...state,
        requestedTracks: state.requestedTracks.filter(
          (t) => !action.payload.includes(t)
        )
      }
    case 'rejectRequest':
      return {
        ...state,
        requestedTracks: state.requestedTracks.filter(
          (t) => !action.payload.includes(t)
        )
      }
    default:
      return state
  }
}

interface NotificationContextProps {
  children: any
}

export const NotificationContextProvider: FC<NotificationContextProps> = ({
  children
}) => {
  const [notification, setNotification] = useReducer(reducer, initialState)
  return (
    <notificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </notificationContext.Provider>
  )
}
