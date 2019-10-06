import React from 'react'
import { List, Divider } from '@material-ui/core'
import EventIcon from 'assets/event-icon.svg'
import settingsIcon from 'assets/gear-icon.svg'
import HomeIcon from 'assets/home-icon.svg'
import insightsIcon from 'assets/insights-icon.svg'
import playlistIcon from 'assets/playlist-icon.svg'
import NavMenuItem from './NavMenuItem'
import './NavMenu.scss'

const NavMenu = () => {
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
    <List>
      <NavMenuItem text="Home" pathName="/" icon={HomeIcon} collapsed={false} />
      <NavMenuItem
        text="Events"
        icon={EventIcon}
        collapsed={true}
        collapsedList={eventsSubItems}
      />
      <NavMenuItem
        text="Playlists"
        icon={playlistIcon}
        collapsed={true}
        collapsedList={playlistSubItems}
      />
      <Divider />
      <NavMenuItem
        text="Account"
        pathName="/account"
        icon={settingsIcon}
        collapsed={false}
      />
      <NavMenuItem
        text="Insights"
        pathName="/insights"
        icon={insightsIcon}
        collapsed={false}
      />
    </List>
  )
}

export default NavMenu
