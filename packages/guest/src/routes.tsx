import { push } from 'connected-react-router'
import { History } from 'history'
import * as React from 'react'
import { Route } from 'react-router'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'

import Account from './account/AccountContainer'
import Login from './auth/LoginContainer'
import SignUp from './auth/SignUpContainer'
import Event from './event/components/EventContainer'
import EventListView from './event/components/EventListViewContainer'
import Finder from './finder/FinderContainer'
import Invite from './invite/InviteContainer'
import MainLayout from './layout/MainLayoutContainer'
import PlaylistDetailed from './playlist/components/PlaylistDetailedContainer'
import PlaylistView from './playlist/components/PlaylistViewContainer'
import Requests from './requests/RequestsContainer'
import IRootState from './rootState'
import Stepper from './stepper/StepperContainer'

const locationHelper = locationHelperBuilder({})

const userIsNotAuthenticated = connectedRouterRedirect({
  allowRedirectBack: false,
  authenticatedSelector: (state: IRootState) => !state.auth.isAuthenticated,
  redirectPath: (state: IRootState, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/events',
  wrapperDisplayName: 'UserIsNotAuthenticated'
}) as any

const userIsAuthenticated = connectedRouterRedirect({
  authenticatedSelector: (state: IRootState) =>
    state.auth.isAuthenticated || state.auth.isAuthenticating,
  redirectAction: push,
  redirectPath: '/about',
  wrapperDisplayName: 'UserIsAuthenticated'
}) as any

const routes = [
  {
    component: Invite,
    path: '/invite/:inviteId',
    exact: true
  },
  {
    component: userIsNotAuthenticated(Stepper),
    path: '/about',
    exact: true
  },
  {
    component: userIsNotAuthenticated(SignUp),
    path: '/signup',
    exact: true
  },
  {
    component: userIsNotAuthenticated(Login),
    path: '/login',
    exact: true
  },
  {
    component: userIsAuthenticated(MainLayout),
    path: '/',
    routes: [
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
        component: Requests,
        path: '/requests',
        exact: true
      },
      {
        component: PlaylistView,
        path: '/playlists',
        exact: true
      },
      {
        component: PlaylistDetailed,
        path: '/playlist/:eventId',
        exact: true
      },
      {
        component: Finder,
        path: '/finder',
        exact: true
      }
    ]
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
