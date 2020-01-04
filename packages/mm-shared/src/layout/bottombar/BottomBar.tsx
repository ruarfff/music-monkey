import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import EventIcon from '@material-ui/icons/Event'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'
import { withRouter } from 'react-router'
import { Event } from '../../event'
import Monkey from '../../assets/finder-logo.png'
import './BottomBar.scss'

interface IBottomBar extends RouteComponentProps<any> {
  event: Event
  isHost: boolean
}

const checkLocation = (pathname: string, path: string) => {
  return pathname === path ? 'highlighted' : ''
}

const BottomBar = ({ location, event, isHost }: IBottomBar) => {
  const { pathname } = location
  const eventId = event && event.eventId ? event.eventId : null
  const eventsLink = eventId ? `/events/${eventId}` : '/'
  const playlistsLink = eventId ? `/playlists/${eventId}` : '/playlists'
  const requestsLink = eventId ? `/requests/${eventId}` : '/requests'
  const finderLink = eventId ? `/finder/${eventId}` : '/finder'
  const createLink = '/create-event'
  const insightsLink = '/insights'

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
          <Link
            to={isHost ? createLink : finderLink}
            className="BottomBar-finder-button-link"
          >
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
          ${checkLocation(pathname, insightsLink)}`}
        >
          <Link to={insightsLink}>
            <ShowChartIcon />
            <span>Insights</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default withRouter(BottomBar)
