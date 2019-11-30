import React, { useContext, Suspense } from 'react'
import { Route, Switch } from 'react-router'
import { RouteWithSubRoutes } from 'routes/routes'

import Home from 'home/HomeContainer'
import { RouteContext } from 'routes/RouteContext'
import LoadingSpinner from 'loading/LoadingSpinner'

const Content = () => {
  const routes = useContext(RouteContext)

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Switch>
        <Route exact={true} path="/" component={Home} />
        {routes.map((route: any, i: number) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </Suspense>
  )
}

export default Content
