import React, { lazy } from 'react'
import { push } from 'connected-react-router'
import { Route } from 'react-router'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import IRootState from 'rootState'

const MusicView = lazy(() => import('music/MusicViewContainer'))
const Account = lazy(() => import('account/AccountContainer'))
const Event = lazy(() => import('event/eventView/EventViewContainer'))
const EventListView = lazy(() =>
  import('event/eventList/EventListViewContainer')
)
const Marvin = lazy(() => import('finder/MarvinContainer'))
const Insights = lazy(() => import('insights/InsightsContainer'))

const RequestView = lazy(() => import('request/RequestViewContainer'))

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
    component: EventListView,
    path: '/',
    exact: true
  },
  {
    component: Event,
    path: '/events/:eventId',
    exact: true
  },
  {
    component: Account,
    path: '/account',
    exact: true
  },
  {
    component: RequestView,
    path: '/requests',
    exact: true
  },
  {
    component: RequestView,
    path: '/requests/:eventId',
    exact: true
  },
  {
    component: Marvin,
    path: '/finder',
    exact: true
  },
  {
    component: Marvin,
    path: '/finder/:eventId',
    exact: true
  },
  {
    component: Insights,
    exact: true,
    path: '/insights'
  },
  { component: MusicView, exact: true, path: '/music' }
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
