import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'
import { withRouter } from 'react-router'
import { Event } from 'event'
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
  const requestsLink = eventId ? `/requests/${eventId}` : '/requests'
  const finderLink = eventId ? `/finder/${eventId}` : '/finder'
  const insightsLink = '/insights'
  const musicLink = '/music'

  return (
    <div className="BottomBar-navigation">
      <div className="BottomBar-navigation-left">
        <div
          className={`BottomBar-navigation-item
          ${checkLocation(pathname, eventsLink)}`}
        >
          <Link to={eventsLink}>
            <HomeIcon />
            <span>Parties</span>
          </Link>
        </div>
        <div
          className={`BottomBar-navigation-item
          ${checkLocation(pathname, requestsLink)}`}
        >
          <Link to={requestsLink}>
            <FavoriteIcon />
            <span>Requests</span>
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
          ${checkLocation(pathname, musicLink)}`}
        >
          <Link to={musicLink}>
            <LibraryMusicIcon />
            <span>Music</span>
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
