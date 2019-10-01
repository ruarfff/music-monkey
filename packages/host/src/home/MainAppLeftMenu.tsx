import List from '@material-ui/core/List'
import * as React from 'react'
import { Link } from 'react-router-dom'
import EventIcon from 'assets/event-icon.svg'
import settingsIcon from 'assets/gear-icon.svg'
import HomeIcon from 'assets/home-icon.svg'
import insightsIcon from 'assets/insights-icon.svg'
import logo from 'assets/logo-home.png'
import playlistIcon from 'assets/playlist-icon.svg'
import LeftMenuItem from './LeftMenuItem'

interface IMainAppLeftMenuProps {
  path: string
}

class MainAppLeftMenu extends React.Component<IMainAppLeftMenuProps> {
  public render() {
    const { path } = this.props

    const eventsSubItems = [
      {
        text: 'Past Events',
        link: '/past-events'
      },
      {
        text: 'Upcoming Events',
        link: '/upcoming-events'
      },
      {
        text: 'All Events',
        link: '/all-events'
      },
      {
        text: 'Create New Event',
        link: '/create-event'
      }
    ]

    const playlistSubItems = [
      {
        text: 'All Playlists',
        link: '/all-playlists'
      },
      {
        text: 'Past Playlists',
        link: '/past-playlists'
      },
      {
        text: 'Upcoming Playlists',
        link: '/upcoming-playlists'
      }
    ]

    return (
      <div className="Home-left-menu-wrapper">
        <div className="Home-left-menu">
          <div className="Home-logo-container">
            <Link to={'/'}>
              <img src={logo} alt="" />
            </Link>
          </div>
          <List>
            <Link to={'/'}>
              <LeftMenuItem
                text={'Home'}
                pathName={'/'}
                currentPath={path}
                icon={HomeIcon}
                collapsed={false}
              />
            </Link>
            <LeftMenuItem
              text={'Events'}
              currentPath={path}
              icon={EventIcon}
              collapsed={true}
              collapsedList={eventsSubItems}
            />
            <LeftMenuItem
              text={'Playlists'}
              currentPath={path}
              icon={playlistIcon}
              collapsed={true}
              collapsedList={playlistSubItems}
            />
            <Link to={'/account'}>
              <LeftMenuItem
                text={'Account'}
                pathName={'/account'}
                currentPath={path}
                icon={settingsIcon}
                collapsed={false}
              />
            </Link>
            <Link to={'/insights'}>
              <LeftMenuItem
                text={'Insights'}
                pathName={'/insights'}
                currentPath={path}
                icon={insightsIcon}
                collapsed={false}
              />
            </Link>
          </List>
        </div>
      </div>
    )
  }
}

export default MainAppLeftMenu
