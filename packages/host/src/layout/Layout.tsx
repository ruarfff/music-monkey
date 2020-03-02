import React, { useContext } from 'react'
import isEmpty from 'lodash/isEmpty'
import { Sizes } from 'react-sizes'
import { User, Event, DesktopLayout, MainLayout, MarvinLoader } from 'mm-shared'
import LoginError from './LoginError'
import Content from './ContentContainer'
import { NotificationContext } from 'subscriptions/NotificationContext'

interface ILayoutProps {
  user: User
  userLoading: boolean
  userError: Error
  isDesktop: boolean
  event: Event
  logout(): void
}

const Layout = ({
  user,
  userLoading,
  userError,
  isDesktop,
  event,
  logout
}: ILayoutProps & Sizes) => {
  const { acceptedTracks } = useContext(NotificationContext)
  return (
    <>
      {!isEmpty(user) &&
        (isDesktop ? (
          <DesktopLayout
            event={event}
            user={user}
            logout={logout}
            isHost={true}
          >
            <Content />
          </DesktopLayout>
        ) : (
          <MainLayout
            event={event}
            user={user}
            logout={logout}
            isHost={true}
            hasPartyNotification={!isEmpty(acceptedTracks)}
          >
            <Content />
          </MainLayout>
        ))}
      {userLoading && <MarvinLoader />}
      {userError.message && <LoginError />}
    </>
  )
}

export default Layout
