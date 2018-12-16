import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EventIcon from '@material-ui/icons/Event'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'
import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import './BottomBar.scss'
import { FinderButton } from './FinderButton'

class BottomBar extends React.Component<RouteComponentProps<any>, any> {
  public render() {
    const location = this.props.location.pathname
    return (
      <div className="BottomBar-navigation">
        <div className="BottomBar-navigation-left">
          <div
            className={`BottomBar-navigation-item
            ${location === '/' ? 'highlighted' : ''}`}
          >
            <Link to="/">
              <EventIcon />
              <span>Events</span>
            </Link>
          </div>

          <div
            className={`BottomBar-navigation-item
            ${location === '/playlists' ? 'highlighted' : ''}`}
          >
            <Link to="/playlists">
              <LibraryMusicIcon />
              <span>Playlists</span>
            </Link>
          </div>
        </div>

        <div className="BottomBar-finder-button">
          <FinderButton />
        </div>

        <div className="BottomBar-navigation-right">
          <div
            className={`BottomBar-navigation-item
            ${location === '/requests' ? 'highlighted' : ''}`}
          >
            <Link to="/requests">
              <FavoriteIcon />
              <span>Requests</span>
            </Link>
          </div>

          <div
            className={`BottomBar-navigation-item
            ${location === '/account' ? 'highlighted' : ''}`}
          >
            <Link to="/account">
              <AccountCircleIcon />
              <span>Account</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default BottomBar
