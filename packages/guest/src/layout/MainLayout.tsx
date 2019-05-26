import { isEmpty } from 'lodash'
import { Route, RouteComponentProps } from 'react-router'
import BottomBar from '../bottombar/BottomBarContainer'
import IEvent from '../event/IEvent'
import IAction from '../IAction'
import { RouteWithSubRoutes } from '../routes'
import TopBar from '../topbar/TopBarContainer'
import './MainLayout.scss'
import React, { useEffect } from 'react'

interface IMainLayoutProps extends RouteComponentProps<any> {
  routes: Route[]
  events: IEvent[]
  eventId: string
  selectedEvent: IEvent
  isAuthenticated: boolean
  eventLoading: boolean
  fetchUsersEvents(): IAction
  getEvent(eventId: string): IAction
}

const MainLayout = ({
  routes,
  events,
  eventId,
  selectedEvent,
  isAuthenticated,
  fetchUsersEvents,
  getEvent,
  eventLoading
}: IMainLayoutProps) => {
  useEffect(() => {
    if (isEmpty(events) && isAuthenticated) {
      fetchUsersEvents()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  useEffect(() => {
    console.log('EVENT_ID: ' + eventId)
    if (isAuthenticated && eventId && !eventLoading) {
      console.log('Got to getEvent 1: ' + eventId)
      if (isEmpty(selectedEvent) || selectedEvent.eventId !== eventId) {
        console.log('Got to getEvent 2: ' + eventId)
        getEvent(eventId)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, isAuthenticated])

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
