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

const checkLocation = (pathname: string, path: string) => {
  return pathname === path ? 'highlighted' : ''
}

const BottomBar = ({ location, event }: IBottomBar) => {
  const pathname = location.pathname
  const eventId = event && event.eventId ? event.eventId : null
  const eventsLink = eventId ? `/events/${eventId}` : '/'
  const playlistsLink = eventId ? `/playlists/${eventId}` : '/playlists'
  const requestsLink = eventId ? `/requests/${eventId}` : '/requests'
  const accountLink = '/account'

  return (
    <div className="BottomBar-navigation">
      <div className="BottomBar-navigation-left">
        <div
          className={`BottomBar-navigation-item
          ${checkLocation(pathname, eventsLink)}`}
        >
          <Link to={eventsLink}>
            <EventIcon />
            <span>Events</span>
          </Link>
        </div>

        <div
          className={`BottomBar-navigation-item
          ${checkLocation(pathname, playlistsLink)}`}
        >
          <Link to={playlistsLink}>
            <LibraryMusicIcon />
            <span>Playlists</span>
          </Link>
        </div>
      </div>

      <div className="BottomBar-finder-button">
        <FinderButton id={event && event.eventId} />
      </div>

      <div className="BottomBar-navigation-right">
        <div
          className={`BottomBar-navigation-item
          ${checkLocation(pathname, requestsLink)}`}
        >
          <Link to={requestsLink}>
            <FavoriteIcon />
            <span>Requests</span>
          </Link>
        </div>

        <div
          className={`BottomBar-navigation-item
          ${checkLocation(pathname, accountLink)}`}
        >
          <Link to={accountLink}>
            <AccountCircleIcon />
            <span>Account</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BottomBar
