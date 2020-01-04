import React from 'react'
import isEmpty from 'lodash/isEmpty'
import { Sizes } from 'react-sizes'
import {
  User,
  Event,
  DesktopLayout,
  MainLayout,
  LoadingSpinner
} from 'mm-shared'
import LoginError from './LoginError'
import Content from './ContentContainer'

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
  return (
    <div>
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
          <MainLayout event={event} user={user} logout={logout} isHost={false}>
            <Content />
          </MainLayout>
        ))}
      {userLoading && <LoadingSpinner />}
      {userError.message && <LoginError />}
    </div>
  )
}

export default Layout