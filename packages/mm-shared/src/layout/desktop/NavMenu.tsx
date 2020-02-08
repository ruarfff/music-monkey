import React, { FunctionComponent } from 'react'
import { List, Divider } from '@material-ui/core'
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

      <NavMenuItem text="Events" pathName="/" />
      <NavMenuItem text="Requests" pathName="/requests" />
      <Divider />
      <NavMenuItem text="Music" pathName="/music" />
      <NavMenuItem text="Insights" pathName="/insights" />
    </List>
  )
}

export default NavMenu
