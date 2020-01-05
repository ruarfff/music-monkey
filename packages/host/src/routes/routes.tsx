import React, { lazy } from 'react'
import { push } from 'connected-react-router'
import { Route } from 'react-router'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import IRootState from 'rootState'

const AccountView = lazy(() => import('account/AccountContainer'))
const CreateEvent = lazy(() => import('event/saveEvent/CreateEventContainer'))

const EventView = lazy(() => import('event/eventView/EventViewContainer'))
const Insights = lazy(() => import('insights/InsightsContainer'))
const Requests = lazy(() => import('requests/RequestsContainer'))
const PlaylistListView = lazy(() =>
  import('playlist/PlaylistListViewContainer')
)
const SaveEvent = lazy(() => import('event/saveEvent/SaveEventContainer'))

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
    exact: true,
    path: '/events/:eventId'
  },
  {
    component: SaveEvent,
    path: '/events/:eventId/edit'
  },
  {
    component: PlaylistListView,
    exact: true,
    path: '/playlists'
  },
  {
    component: EventView,
    exact: true,
    path: '/playlists/:eventId'
  },
  {
    component: AccountView,
    exact: true,
    path: '/account'
  },
  {
    component: Requests,
    exact: true,
    path: '/requests'
  },
  {
    component: Requests,
    exact: true,
    path: '/requests/:eventId'
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
