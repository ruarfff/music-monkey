import React, { useEffect, Suspense } from 'react'
import { isEmpty, find } from 'lodash'
import { Route, RouteComponentProps } from 'react-router'
import { Action, Event, BottomBar, TopBar, User } from 'mm-shared'
import { RouteWithSubRoutes } from 'routes/routes'
import LoadingSpinner from '../loading/LoadingSpinner'
import './MainLayout.scss'

interface IMainLayoutProps extends RouteComponentProps<any> {
  user: User
  routes: Route[]
  events: Event[]
  eventId: string
  selectedEvent: Event
  isAuthenticated: boolean
  eventLoading: boolean
  eventsLoading: boolean
  inviteEvent: Event
  fetchingRsvp: boolean
  logout(): void
  fetchUsersEvents(): Action
  getEvent(eventId: string): Action
  getSuggestions(eventId: string): Action
  fetchEventVotes(eventId: string): Action
}

const MainLayout = ({
  user,
  routes,
  events,
  eventId,
  selectedEvent,
  isAuthenticated,
  logout,
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
      <TopBar logout={logout} event={selectedEvent} user={user} />
      <main className="MainLayout-body">
        <Suspense fallback={<LoadingSpinner />}>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Suspense>
      </main>
      <BottomBar event={selectedEvent} isHost={false} />
    </div>
  )
}

export default MainLayout
