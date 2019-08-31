import { push } from 'connected-react-router'
import { History } from 'history'
import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import IRootState from './rootState'
import LoadingPage from './loading/LoadingPage'

const AccountViewContainer = lazy(() =>
  import('./accountView/AccountViewContainer')
)
const Login = lazy(() => import('./auth/LoginContainer'))
const CreateEvent = lazy(() => import('./eventCreation/CreateEventContainer'))
const EventsContainer = lazy(() => import('./eventsView/EventsViewContainer'))
const EventView = lazy(() => import('./eventView/EventViewContainer'))
const Home = lazy(() => import('./home/HomeContainer'))
const InsightsContainer = lazy(() => import('./insights/InsightsContainer'))
const PlaylistsContainer = lazy(() =>
  import('./playlistsView/PlaylistsViewContainer')
)

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
  const fof = () => <div>404</div>
  return (
    <Suspense fallback={<LoadingPage />}>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
        <Route render={fof} />
      </Switch>
    </Suspense>
  )
}
