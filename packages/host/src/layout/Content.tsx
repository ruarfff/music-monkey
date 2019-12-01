import React, { useContext, Suspense } from 'react'
import { Route, Switch } from 'react-router'
import { RouteContext } from 'routes/RouteContext'
import { RouteWithSubRoutes } from 'routes/routes'
import EventListView from 'event/EventListViewContainer'
import LoadingSpinner from 'loading/LoadingSpinner'

const Content = () => {
  const routes = useContext(RouteContext)

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
