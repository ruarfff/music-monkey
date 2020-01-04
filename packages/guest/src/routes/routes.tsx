import React, { lazy, Suspense } from 'react'
import { push } from 'connected-react-router'
import { History } from 'history'
import { Route, Switch } from 'react-router'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import IRootState from '../rootState'
import LoadingPage from '../loading/LoadingPage'

const Account = lazy(() => import('account/AccountContainer'))
const Login = lazy(() => import('auth/LoginContainer'))
const SignUp = lazy(() => import('auth/SignUpContainer'))
const Event = lazy(() => import('event/components/EventViewContainer'))
const EventListView = lazy(() =>
  import('event/components/EventListViewContainer')
)
const Finder = lazy(() => import('../finder/FinderContainer'))
const Invite = lazy(() => import('../invite/components/InviteContainer'))
const Insights = lazy(() => import('insights/InsightsContainer'))
const MainLayout = lazy(() => import('../layout/MainLayoutContainer'))
const Playlist = lazy(() =>
  import('../playlist/components/PlaylistViewContainer')
)
const PlaylistListView = lazy(() =>
  import('../playlist/components/PlaylistListViewContainer')
)
const Requests = lazy(() => import('../requests/RequestsContainer'))
const Stepper = lazy(() => import('../stepper/StepperContainer'))

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

export const routes = [
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
        component: userIsAuthenticated(Requests),
        path: '/requests/:eventId',
        exact: true
      },
      {
        component: userIsAuthenticated(PlaylistListView),
        path: '/playlists',
        exact: true
      },
      {
        component: userIsAuthenticated(Playlist),
        path: '/playlists/:eventId',
        exact: true
      },
      {
        component: userIsAuthenticated(Finder),
        path: '/finder',
        exact: true
      },
      {
        component: userIsAuthenticated(Finder),
        path: '/finder/:eventId',
        exact: true
      },
      {
        component: Insights,
        exact: true,
        path: '/insights'
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