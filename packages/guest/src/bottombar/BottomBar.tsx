import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EventIcon from '@material-ui/icons/Event'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'
import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import IEvent from '../event/IEvent'
import './BottomBar.scss'
import { FinderButton } from './FinderButton'

interface IBottomBar extends RouteComponentProps<any> {
  event: IEvent
}

const checkLocation = (location: string, path: string) => {
  return location === path ? 'highlighted' : ''
}

const BottomBar = (props: IBottomBar) => {
  const location = props.location.pathname
  return (
    <div className="BottomBar-navigation">
      <div className="BottomBar-navigation-left">
        <div
          className={`BottomBar-navigation-item
          ${checkLocation(location, '/')}`}
        >
          <Link to="/">
            <EventIcon />
            <span>Events</span>
          </Link>
        </div>

        <div
          className={`BottomBar-navigation-item
          ${checkLocation(location, '/playlists')}`}
        >
          <Link to="/playlists">
            <LibraryMusicIcon />
            <span>Playlists</span>
          </Link>
        </div>
      </div>

      <div className="BottomBar-finder-button">
        <FinderButton id={props.event && props.event.eventId} />
      </div>

      <div className="BottomBar-navigation-right">
        <div
          className={`BottomBar-navigation-item
          ${checkLocation(location, '/requests')}`}
        >
          <Link to={props.event && props.event.eventId ? `/requests/${props.event.eventId}` : '/requests'}>
            <FavoriteIcon />
            <span>Requests</span>
          </Link>
        </div>

        <div
          className={`BottomBar-navigation-item
          ${checkLocation(location, '/account')}`}
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

export default BottomBar
