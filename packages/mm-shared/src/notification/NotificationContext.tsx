import React, { FC, createContext, useState } from 'react'

interface Notifications {
  acceptedTracks: string[]
  seenTracks: string[]
  updateAcceptedTracks(tracks: string[]): void
  updateSeenTracks(tracks: string[]): void
}

const initialState: Notifications = {
  acceptedTracks: [],
  seenTracks: [],
  updateAcceptedTracks: (tracks: string[]) => {},
  updateSeenTracks: (tracks: string[]) => {}
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

  const updateSeenTracks = (tracks: string[]) => {
    setNotifications((prevState: Notifications) => {
      return {
        ...prevState,
        seenTracks: tracks
      }
    })
  }

  const notificationsState: Notifications = {
    ...initialState,
    updateAcceptedTracks,
    updateSeenTracks
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
