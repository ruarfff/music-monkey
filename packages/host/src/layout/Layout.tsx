import React from 'react'
import isEmpty from 'lodash/isEmpty'
import { Sizes } from 'react-sizes'
import LoadingSpinner from 'loading/LoadingSpinner'
import { User, Event } from 'mm-shared'
import LoginError from './LoginError'
import MobileLayout from './MobileLayout'
import DesktopLayout from './DesktopLayout'

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
          <DesktopLayout />
        ) : (
          <MobileLayout event={event} user={user} logout={logout} />
        ))}
      {userLoading && <LoadingSpinner />}
      {userError.message && <LoginError />}
    </div>
  )
}

export default Layout
