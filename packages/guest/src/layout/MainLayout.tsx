import { isEmpty, find } from 'lodash'
import { Route, RouteComponentProps } from 'react-router'
import BottomBar from '../bottombar/BottomBarContainer'
import IEvent from '../event/IEvent'
import IAction from '../IAction'
import { RouteWithSubRoutes } from '../routes'
import TopBar from '../topbar/TopBarContainer'
import './MainLayout.scss'
import React, { useEffect, Suspense } from 'react'
import LoadingSpinner from '../loading/LoadingSpinner'

interface IMainLayoutProps extends RouteComponentProps<any> {
  routes: Route[]
  events: IEvent[]
  eventId: string
  selectedEvent: IEvent
  isAuthenticated: boolean
  eventLoading: boolean
  inviteEvent: IEvent
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
  eventLoading,
  inviteEvent
}: IMainLayoutProps) => {
  useEffect(() => {
    if (isAuthenticated) {
      if (
        isEmpty(events) ||
        (inviteEvent &&
          !find(events, event => event.eventId === inviteEvent.eventId))
      ) {
        fetchUsersEvents()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, inviteEvent])

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
        <Suspense fallback={<LoadingSpinner />}>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Suspense>
      </main>
      <BottomBar />
    </div>
  )
}

export default MainLayout
