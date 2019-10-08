import React, { useContext } from 'react'
import { Route } from 'react-router'
import { RouteWithSubRoutes } from 'routes/routes'

import Home from 'home/HomeContainer'
import { RouteContext } from 'routes/RouteContext'

const Content = () => {
  const routes = useContext(RouteContext)

  return (
    <>
      <Route exact={true} path="/" component={Home} />
      {routes.map((route: any, i: number) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </>
  )
}

export default Content
