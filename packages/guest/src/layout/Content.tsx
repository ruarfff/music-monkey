import React, { useContext, useEffect, Suspense } from 'react'
import { RouteContext } from 'routes/RouteContext'
import { RouteWithSubRoutes } from 'routes/routes'
import { Action, Event, LoadingSpinner } from 'mm-shared'
import isEmpty from 'lodash/isEmpty'
import { Switch } from 'react-router'

interface ContentProps {
  event: Event
  events: Event[]
  eventsLoading: boolean
  eventId: string
  eventLoading: boolean
  getEvents(): Action
  getEvent(eventId: string): Action
  getEventSuggestions(eventId: string): Action
  fetchEventVotes(eventId: string): Action
}

const Content = ({
  event,
  events,
  eventsLoading,
  eventId,
  eventLoading,
  getEvents,
  getEvent,
  getEventSuggestions,
  fetchEventVotes
}: ContentProps) => {
  const routes = useContext(RouteContext)
  useEffect(() => {
    if (isEmpty(events) && !eventsLoading) {
      getEvents()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (eventId && !eventLoading) {
      if (isEmpty(event) || event.eventId !== eventId) {
        getEvent(eventId)
        getEventSuggestions(eventId)
        fetchEventVotes(eventId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId])
  if (eventsLoading) {
    return <LoadingSpinner />
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Switch>
        {routes.map((route: any, i: number) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </Suspense>
  )
}

export default Content
