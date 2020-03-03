import React, { useContext, Suspense, useEffect } from 'react'
import { Switch } from 'react-router'
import { RouteContext } from 'routes/RouteContext'
import { RouteWithSubRoutes } from 'routes/routes'
import { Action, Event, MarvinLoader } from 'mm-shared'
import isEmpty from 'lodash/isEmpty'

interface ContentProps {
  event: Event
  events: Event[]
  eventsLoading: boolean
  eventId: string
  eventLoading: boolean
  getEvents(): Action
  getEventById(eventId: string): Action
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
  getEventById,
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
        getEventById(eventId)
        getEventSuggestions(eventId)
        fetchEventVotes(eventId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId])
  if (eventsLoading) {
    return <MarvinLoader />
  }

  return (
    <Suspense fallback={<MarvinLoader />}>
      <Switch>
        {routes.map((route: any, i: number) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </Suspense>
  )
}

export default Content
