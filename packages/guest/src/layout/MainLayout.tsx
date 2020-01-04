import React, { useEffect, Suspense } from 'react'
import { isEmpty, find } from 'lodash'
import { Route, RouteComponentProps } from 'react-router'
import BottomBar from 'layout/bottombar/BottomBarContainer'
import { Action, Event } from 'mm-shared'
import { RouteWithSubRoutes } from 'routes'
import TopBar from 'layout/topbar/TopBarContainer'
import LoadingSpinner from '../loading/LoadingSpinner'
import './MainLayout.scss'

interface IMainLayoutProps extends RouteComponentProps<any> {
  routes: Route[]
  events: Event[]
  eventId: string
  selectedEvent: Event
  isAuthenticated: boolean
  eventLoading: boolean
  eventsLoading: boolean
  inviteEvent: Event
  fetchingRsvp: boolean
  fetchUsersEvents(): Action
  getEvent(eventId: string): Action
  getSuggestions(eventId: string): Action
  fetchEventVotes(eventId: string): Action
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
  eventsLoading,
  getSuggestions,
  fetchEventVotes
}: IMainLayoutProps) => {
  useEffect(() => {
    if (isAuthenticated && !eventLoading && !eventsLoading) {
      if (
        isEmpty(events) ||
        (!isEmpty(selectedEvent) &&
          !find(events, e => e.eventId === selectedEvent.eventId))
      ) {
        fetchUsersEvents()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, eventLoading, selectedEvent])

  useEffect(() => {
    if (isAuthenticated && eventId && !eventLoading) {
      if (isEmpty(selectedEvent) || selectedEvent.eventId !== eventId) {
        getEvent(eventId)
        getSuggestions(eventId)
        fetchEventVotes(eventId)
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
