import React from 'react'
import { List, Divider } from '@material-ui/core'
import EventIcon from '../../assets/event-icon.svg'
import settingsIcon from '../../assets/gear-icon.svg'
import HomeIcon from '../../assets/home-icon.svg'
import insightsIcon from '../../assets/insights-icon.svg'
import playlistIcon from '../../assets/playlist-icon.svg'
import NavMenuItem from './NavMenuItem'
import './NavMenu.scss'

const NavMenu = () => {
  const eventsSubItems = [
    {
      text: 'All Events',
      link: '/catalogue/all-events'
    },
    {
      text: 'Upcoming Events',
      link: '/catalogue/upcoming-events'
    },
    {
      text: 'Past Events',
      link: '/catalogue/past-events'
    },
    {
      text: 'Create New Event',
      link: '/create-event'
    }
  ]

  const playlistSubItems = [
    {
      text: 'All Playlists',
      link: '/catalogue/all-playlists'
    },
    {
      text: 'Upcoming Playlists',
      link: '/catalogue/upcoming-playlists'
    },
    {
      text: 'Past Playlists',
      link: '/catalogue/past-playlists'
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
