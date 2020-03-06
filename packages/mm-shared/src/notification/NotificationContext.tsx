import React, { FC, createContext, useState } from 'react'

interface Notifications {
  acceptedTracks: string[]
  requestedTracks: string[]
  updateAcceptedTracks(tracks: string[]): void
  updateRequestedTracks(tracks: string[]): void
}

const initialState: Notifications = {
  acceptedTracks: [],
  requestedTracks: [],
  updateAcceptedTracks: (tracks: string[]) => {},
  updateRequestedTracks: (tracks: string[]) => {}
}
export const NotificationContext = createContext(initialState)

interface NotificationContextProps {
  children: any
}

export const NotificationContextProvider: FC<NotificationContextProps> = ({
  children
}) => {
  const updateAcceptedTracks = (tracks: string[]) => {
    setNotifications((prevState: Notifications) => {
      return {
        ...prevState,
        acceptedTracks: tracks
      }
    })
  }

  const updateRequestedTracks = (tracks: string[]) => {
    setNotifications((prevState: Notifications) => {
      return {
        ...prevState,
        requestedTracks: tracks
      }
    })
  }

  const notificationsState: Notifications = {
    ...initialState,
    updateAcceptedTracks,
    updateRequestedTracks
  }

  const [notifications, setNotifications] = useState<Notifications>(
    notificationsState
  )

  return (
    <NotificationContext.Provider value={notifications}>
      {children}
    </NotificationContext.Provider>
  )
}
