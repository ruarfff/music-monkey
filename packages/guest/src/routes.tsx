import { push } from 'connected-react-router'
import { History } from 'history'
import * as React from 'react'
import { Route, Switch } from 'react-router'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import IRootState from './rootState'

import Account from './account/AccountContainer'
import Login from './auth/LoginContainer'
import SignUp from './auth/SignUpContainer'
import Event from './event/components/EventContainer'
import EventListView from './event/components/EventListViewContainer'
import Finder from './finder/FinderContainer'
import Invite from './invite/components/InviteContainer'
import MainLayout from './layout/MainLayoutContainer'
import PlaylistDetailed from './playlist/components/PlaylistDetailedContainer'
import PlaylistView from './playlist/components/PlaylistViewContainer'
import Requests from './requests/RequestsContainer'
import Stepper from './stepper/StepperContainer'

const locationHelper = locationHelperBuilder({})

const userIsNotAuthenticated = connectedRouterRedirect({
  allowRedirectBack: false,
  authenticatedSelector: (state: IRootState) => !state.auth.isAuthenticated,
  redirectPath: (state: IRootState, ownProps: any) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/',
  wrapperDisplayName: 'UserIsNotAuthenticated'
}) as any

const userIsAuthenticated = connectedRouterRedirect({
  authenticatedSelector: (state: IRootState) =>
    state.auth.isAuthenticated || state.auth.isAuthenticating,
  redirectAction: push,
  redirectPath: '/login',
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
    component: MainLayout,
    path: '/',
    routes: [
      {
        component: userIsAuthenticated(EventListView),
        path: '/',
        exact: true
      },
      {
        component: userIsAuthenticated(Event),
        path: '/events/:eventId',
        exact: true
      },
      {
        component: userIsAuthenticated(Account),
        path: '/account',
        exact: true
      },
      {
        component: userIsAuthenticated(Requests),
        path: '/requests',
        exact: true
      },
      {
        component: userIsAuthenticated(PlaylistView),
        path: '/playlists',
        exact: true
      },
      {
        component: userIsAuthenticated(PlaylistDetailed),
        path: '/playlist/:eventId',
        exact: true
      },
      {
        component: userIsAuthenticated(Finder),
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
  const fof = () => <div>404</div>
  return (
    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
      <Route render={fof} />
    </Switch>
  )
}
