import React from 'react'
import { push } from 'connected-react-router'
import { Route } from 'react-router'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'

import IRootState from 'rootState'
import AccountViewContainer from 'accountView/AccountViewContainer'
import CreateEvent from 'event/eventCreation/CreateEventContainer'
import SaveEvent from 'event/saveEvent/SaveEvent'
import EventView from 'event/eventView/EventViewContainer'
import InsightsContainer from 'insights/InsightsContainer'
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
    component: CreateEvent,
    exact: true,
    path: '/create-event'
  },
  {
    component: SaveEvent,
    path: '/save-event'
  },
  {
    component: EventView,
    exact: true,
    path: '/events/:eventId'
  },
  {
    component: CreateEvent,
    path: '/events/:eventId/edit'
  },
  {
    component: CatalogueBrowser,
    path: '/catalogue'
  },
  {
    component: AccountViewContainer,
    exact: true,
    path: '/account'
  },
  {
    component: InsightsContainer,
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
