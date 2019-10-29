import React from 'react'
import { push } from 'connected-react-router'
import { Route } from 'react-router'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'

import IRootState from 'rootState'
import AccountView from 'accountView/AccountViewContainer'
import SaveEvent from 'event/saveEvent/SaveEventContainer'
import EventView from 'event/eventView/EventViewContainer'
import Insights from 'insights/InsightsContainer'
import CatalogueBrowser from 'catalogue/CatalogueBrowserContainer'

const locationHelper = locationHelperBuilder({})

export const userIsNotAuthenticated = connectedRouterRedirect({
  allowRedirectBack: false,
  authenticatedSelector: (state: IRootState) => !state.auth.isAuthenticated,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/',
  wrapperDisplayName: 'UserIsNotAuthenticated'
})

export const userIsAuthenticated = connectedRouterRedirect({
  authenticatedSelector: (state: IRootState) =>
    state.auth.isAuthenticated || state.auth.isAuthenticating,
  redirectAction: push,
  redirectPath: '/login',
  wrapperDisplayName: 'UserIsAuthenticated'
})

export const routes = [
  {
    component: SaveEvent,      
    path: '/create-event'
  },
  {
    component: EventView,
    exact: true,
    path: '/events/:eventId'
  },
  {
    component: SaveEvent,
    path: '/events/:eventId/edit'
  },
  {
    component: CatalogueBrowser,
    path: '/catalogue'
  },
  {
    component: AccountView,
    exact: true,
    path: '/account'
  },
  {
    component: Insights,
    exact: true,
    path: '/insights'
  }
]

const renderSubRoutes = (route: any) => (props: any) => (
  <route.component {...props} routes={route.routes} />
)

export const RouteWithSubRoutes = (route: any) => (
  <Route
    path={route.path}
    exact={route.exact}
    render={renderSubRoutes(route)}
  />
)
