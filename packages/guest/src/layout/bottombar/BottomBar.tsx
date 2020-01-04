import React from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EventIcon from '@material-ui/icons/Event'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Event } from 'mm-shared'
import Monkey from 'assets/finder-logo.png'
import './BottomBar.scss'

interface IBottomBar extends RouteComponentProps<any> {
  event: Event
}

const checkLocation = (pathname: string, path: string) => {
  return pathname === path ? 'highlighted' : ''
}

const BottomBar = ({ location, event }: IBottomBar) => {
  const { pathname } = location
  const eventId = event && event.eventId ? event.eventId : null
  const eventsLink = eventId ? `/events/${eventId}` : '/'
  const playlistsLink = eventId ? `/playlists/${eventId}` : '/playlists'
  const requestsLink = eventId ? `/requests/${eventId}` : '/requests'
  const finderLink = eventId ? `/finder/${eventId}` : '/finder'
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

      <div className="BottomBar-finder">
        <div className="BottomBar-finder-button">
          <Link to={finderLink} className="BottomBar-finder-button-link">
            <img alt="finder" src={Monkey} />
          </Link>
        </div>
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
