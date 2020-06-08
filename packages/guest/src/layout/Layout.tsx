import React, { useContext } from 'react'
import isEmpty from 'lodash/isEmpty'
import { Sizes } from 'react-sizes'
import {
  User,
  Event,
  DesktopLayout,
  MainLayout,
  MarvinLoader,
  notificationContext
} from 'mm-shared'
import LoginError from './LoginError'
import Content from './ContentContainer'

declare var FS: any

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
  const {
    notification: { acceptedTracks, requestedTracks }
  } = useContext(notificationContext)

  if (!isEmpty(user)) {
    try {
      FS.identify(user.userId, {
        displayName: user.displayName,
        email: user.email
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {!isEmpty(user) &&
        (isDesktop ? (
          <DesktopLayout
            event={event}
            user={user}
            logout={logout}
            isHost={false}
          >
            <Content />
          </DesktopLayout>
        ) : (
          <MainLayout
            event={event}
            user={user}
            logout={logout}
            isHost={false}
            hasPartyNotification={
              !isEmpty(acceptedTracks) || !isEmpty(requestedTracks)
            }
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
