import React, { lazy } from 'react'
import { push } from 'connected-react-router'
import { Route } from 'react-router'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import IRootState from 'rootState'

const MusicView = lazy(() => import('music/MusicViewContainer'))
const AccountView = lazy(() => import('account/AccountContainer'))
const CreateEvent = lazy(() => import('event/saveEvent/CreateEventContainer'))
const Marvin = lazy(() => import('finder/MarvinContainer'))
const EventView = lazy(() => import('event/eventView/EventViewContainer'))
const Insights = lazy(() => import('insights/InsightsContainer'))
const RequestView = lazy(() => import('request/RequestViewContainer'))
const PlaylistListView = lazy(() =>
  import('playlist/PlaylistListViewContainer')
)

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
    path: '/create-event'
  },
  {
    component: EventView,
    path: '/events/:eventId'
  },

  {
    component: PlaylistListView,
    exact: true,
    path: '/playlists'
  },
  {
    component: AccountView,
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
  {
    component: Insights,
    exact: true,
    path: '/insights/:eventId'
  },
  { component: MusicView, exact: true, path: '/music' },
  { component: MusicView, exact: true, path: '/music/:eventId' }
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
