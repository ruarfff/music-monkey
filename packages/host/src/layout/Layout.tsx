import React from 'react'
import isEmpty from 'lodash/isEmpty'
import { Route } from 'react-router'
import withSizes, { Sizes } from 'react-sizes'
import LoadingSpinner from 'loading/LoadingSpinner'
import IUser from 'user/IUser'
import LoginError from './LoginError'
import MobileMenu from './MobileMenu'
import DesktopLayout from './DesktopLayout'

interface ILayoutProps extends Sizes {
  routes: Route[]
  user: IUser
  userLoading: boolean
  userError: Error
  isDesktop: boolean
}

const Layout = ({
  user,
  userLoading,
  userError,
  routes,
  isDesktop
}: ILayoutProps) => {
  return (
    <div>
      {!isEmpty(user) &&
        (isDesktop ? <DesktopLayout routes={routes} /> : <MobileMenu />)}
      {userLoading && <LoadingSpinner />}
      {userError.message && <LoginError />}
    </div>
  )
}

const mapSizesToProps = ({ width, height }: Sizes) => ({
  isDesktop: width > 1024,
  width,
  height
})

export default withSizes<Sizes, ILayoutProps>(mapSizesToProps)(Layout)
