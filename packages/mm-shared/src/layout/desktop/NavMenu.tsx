import React, { FunctionComponent } from 'react'
import { List, Divider } from '@material-ui/core'
import EventIcon from '../../assets/event-icon.svg'
import settingsIcon from '../../assets/gear-icon.svg'
import insightsIcon from '../../assets/insights-icon.svg'
import playlistIcon from '../../assets/playlist-icon.svg'
import NavMenuItem from './NavMenuItem'
import CreateEventMenuButton from './CreateEventMenuButton'
import FinderButton from './FinderButton'
import './NavMenu.scss'

interface NavMenuProps {
  isHost: boolean
}

const NavMenu: FunctionComponent<NavMenuProps> = ({ isHost }) => {
  return (
    <List>
      {isHost ? <CreateEventMenuButton /> : <FinderButton />}

      <NavMenuItem text="Events" icon={EventIcon} pathName="/" />
      <NavMenuItem text="Playlists" icon={playlistIcon} pathName="/playlists" />
      <Divider />
      <NavMenuItem text="Account" pathName="/account" icon={settingsIcon} />
      <NavMenuItem text="Insights" pathName="/insights" icon={insightsIcon} />
    </List>
  )
}

export default NavMenu
