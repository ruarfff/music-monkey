import React, { useContext, useEffect, Suspense } from 'react'
import { RouteContext } from 'routes/RouteContext'
import { RouteWithSubRoutes } from 'routes/routes'
import { Action, Event, LoadingSpinner } from 'mm-shared'
import isEmpty from 'lodash/isEmpty'
import { Switch } from 'react-router'

interface ContentProps {
  selectedEvent: Event
  events: Event[]
  eventsLoading: boolean
  eventId: string
  eventLoading: boolean
  getEvents(): Action
  getEvent(eventId: string): Action
  getSuggestions(eventId: string): Action
  fetchEventVotes(eventId: string): Action
}

const Content = ({
  selectedEvent,
  events,
  eventsLoading,
  eventId,
  eventLoading,
  getEvents,
  getEvent,
  getSuggestions,
  fetchEventVotes
}: ContentProps) => {
  const routes = useContext(RouteContext)
  useEffect(() => {
    if (isEmpty(events) && !eventsLoading) {
      getEvents()
    }
  })
  useEffect(() => {
    if (eventId && !eventLoading) {
      if (isEmpty(selectedEvent) || selectedEvent.eventId !== eventId) {
        getEvent(eventId)
        getSuggestions(eventId)
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