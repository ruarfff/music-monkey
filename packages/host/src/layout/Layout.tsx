import React from 'react'
import isEmpty from 'lodash/isEmpty'
import { Sizes } from 'react-sizes'
import LoadingSpinner from 'loading/LoadingSpinner'
import IUser from 'user/IUser'
import LoginError from './LoginError'
import MobileMenu from './MobileLayout'
import DesktopLayout from './DesktopLayout'

interface ILayoutProps {
  user: IUser
  userLoading: boolean
  userError: Error
  isDesktop: boolean
}

const Layout = ({
  user,
  userLoading,
  userError,
  isDesktop
}: ILayoutProps & Sizes) => {
  return (
    <div>
      {!isEmpty(user) && (isDesktop ? <DesktopLayout /> : <MobileMenu />)}
      {userLoading && <LoadingSpinner />}
      {userError.message && <LoginError />}
    </div>
  )
}

export default Layout
