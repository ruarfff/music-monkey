import { isEmpty } from 'lodash'
import { Redirect, Route, RouteComponentProps } from 'react-router'
import BottomBar from '../bottombar/BottomBarContainer'
import IEvent from '../event/IEvent'
import IAction from '../IAction'
import { inviteIdKey } from '../invite/inviteConstants'
import { RouteWithSubRoutes } from '../routes'
import localStorage from '../storage/localStorage'
import TopBar from '../topbar/TopBarContainer'

import './MainLayout.scss'

const React = require('react')
const { useEffect, useState } = React

interface IMainLayoutProps extends RouteComponentProps<any> {
  routes: Route[]
  events: IEvent[]
  isAuthenticated: boolean
  inviteEvent: IEvent
  inviteLoading: boolean
  fetchUsersEvents(): IAction
}

const MainLayout = ({
  routes,
  events,
  inviteEvent,
  isAuthenticated,
  inviteLoading,
  fetchUsersEvents
}: IMainLayoutProps) => {
  const [inviteId, setInviteId] = useState('')
  useEffect(
    () => {
      if (!isEmpty(localStorage.get(inviteIdKey))) {
        setInviteId(localStorage.get(inviteIdKey))
      } else if (inviteId !== '') {
        setInviteId('')
      }
    },
    [inviteId]
  )

  useEffect(
    () => {
      if (isEmpty(events) && isAuthenticated) {
        fetchUsersEvents()
      }
    },
    [isAuthenticated]
  )

  if (!!inviteId && !inviteLoading && isEmpty(inviteEvent)) {
    return <Redirect to={`/invite/${inviteId}`} />
  }

  if (isAuthenticated) {
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
  } else {
    return null
  }
}

export default MainLayout
