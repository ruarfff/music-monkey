import { isEmpty } from 'lodash'
import * as React from 'react'
import { Route, RouteComponentProps } from 'react-router'
import MainAppLeftMenu from '../components/LeftMenu/MainAppLeftMenu'
import Events from '../event/EventsContainer'
import LoadingSpinner from '../loading/LoadingSpinner'
import { RouteWithSubRoutes } from '../routes'
import IUser from '../user/IUser'
import LoginError from './LoginError'
import MainAppBar from './MainAppBarContainer'

interface IHomeProps extends RouteComponentProps<any> {
  routes: Route[]
  user: IUser
  userLoading: boolean
  userError: Error
  locationPath: string
}

const Home = ({
  user,
  userLoading,
  userError,
  locationPath,
  routes
}: IHomeProps) => (
  <div className="Home-root">
    <MainAppLeftMenu path={locationPath} />
    <div className="Home-right-side">
      {!isEmpty(user) && (
        <React.Fragment>
          <MainAppBar />
          <main className="Home-content">
            <div className="Home-toolbar" />
            <Route exact={true} path="/" component={Events} />
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </main>
        </React.Fragment>
      )}

      {userLoading && <LoadingSpinner />}
      {userError.message && <LoginError />}
    </div>
  </div>
)

export default Home
