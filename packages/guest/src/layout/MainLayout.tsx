import { isEmpty } from 'lodash'
import { Route, RouteComponentProps } from 'react-router'
import BottomBar from '../bottombar/BottomBarContainer'
import IEvent from '../event/IEvent'
import IAction from '../IAction'
import { RouteWithSubRoutes } from '../routes'
import TopBar from '../topbar/TopBarContainer'

import './MainLayout.scss'

const React = require('react')
const { useEffect } = React

interface IMainLayoutProps extends RouteComponentProps<any> {
  routes: Route[]
  events: IEvent[]
  isAuthenticated: boolean
  fetchUsersEvents(): IAction
}

const MainLayout = ({
  routes,
  events,
  isAuthenticated,
  fetchUsersEvents
}: IMainLayoutProps) => {
  useEffect(
    () => {
      if (isEmpty(events) && isAuthenticated) {
        fetchUsersEvents()
      }
    },
    [isAuthenticated]
  )

  return (
    <div className="MainLayout-root">
      <TopBar />
      <main className="MainLayout-body">
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </main>
      <BottomBar />
    </div>
  )
}

export default MainLayout
