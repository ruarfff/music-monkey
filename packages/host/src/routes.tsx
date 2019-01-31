import { push } from 'connected-react-router'
import { History } from 'history'
import * as React from 'react'
import { Route } from 'react-router'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'

import AccountViewContainer from './accountView/AccountViewContainer'
import Login from './auth/LoginContainer'
import CreateEvent from './eventCreation/CreateEventContainer'
import EventsContainer from './eventsView/EventsViewContainer'
import EventView from './eventView/EventViewContainer'
import Home from './home/HomeContainer'
import InsightsContainer from './insights/InsightsContainer'
import PlaylistsContainer from './playlistsView/PlaylistsViewContainer'
import IRootState from './rootState'

const locationHelper = locationHelperBuilder({})

const userIsNotAuthenticated = connectedRouterRedirect({
  allowRedirectBack: false,
  authenticatedSelector: (state: IRootState) => !state.auth.isAuthenticated,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/',
  wrapperDisplayName: 'UserIsNotAuthenticated'
})

const userIsAuthenticated = connectedRouterRedirect({
  authenticatedSelector: (state: IRootState) =>
    state.auth.isAuthenticated || state.auth.isAuthenticating,
  redirectAction: push,
  redirectPath: '/login',
  wrapperDisplayName: 'UserIsAuthenticated'
})

const routes = [
  {
    component: userIsAuthenticated(Home as any),
    path: '/',
    routes: [
      {
        component: CreateEvent,
        exact: true,
        path: '/create-event'
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
        component: EventsContainer,
        exact: true,
        path: '/all-events'
      },
      {
        component: EventsContainer,
        exact: true,
        path: '/upcoming-events'
      },
      {
        component: EventsContainer,
        exact: true,
        path: '/past-events'
      },
      {
        component: PlaylistsContainer,
        exact: true,
        path: '/all-playlists'
      },
      {
        component: PlaylistsContainer,
        exact: true,
        path: '/upcoming-playlists'
      },
      {
        component: PlaylistsContainer,
        exact: true,
        path: '/past-playlists'
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
  },
  {
    component: userIsNotAuthenticated(Login as any),
    path: '/login'
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

interface IRouterProps {
  history: History
}

export const Routes: React.SFC<IRouterProps> = ({ history }) => {
  return (
    <span>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </span>
  )
}
