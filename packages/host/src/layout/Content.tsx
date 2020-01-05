import React, { useContext, Suspense, useEffect } from 'react'
import { Route, Switch } from 'react-router'
import { RouteContext } from 'routes/RouteContext'
import { RouteWithSubRoutes } from 'routes/routes'
import EventListView from 'event/eventList/EventListViewContainer'
import isEmpty from 'lodash/isEmpty'
import { Action, Event, LoadingSpinner } from 'mm-shared'

interface ContentProps {
  events: Event[]
  eventsLoading: boolean
  getEvents(): Action
}

const Content = ({ events, eventsLoading, getEvents }: ContentProps) => {
  const routes = useContext(RouteContext)
  useEffect(() => {
    if (isEmpty(events) && !eventsLoading) {
      getEvents()
    }
  })
  if (eventsLoading) {
    return <LoadingSpinner />
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Switch>
        <Route exact={true} path="/" component={EventListView} />
        {routes.map((route: any, i: number) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </Suspense>
  )
}

export default Content
