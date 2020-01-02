import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import IEvent from 'event/IEvent'
import { Action, User } from 'mm-shared'
import AccountDetails from './AccountDetails'
import MyEvents from './MyEvents'
import MyGuests from './MyGuests'
import MyPlaylists from './MyPlaylists'
import isEmpty from 'lodash/isEmpty'
import './AccountView.scss'

interface IAccountViewProps {
  user: User
  events: IEvent[]
  updateUserRequest(user: User): Action
  getEvents(): Action
}

function TabContainer({ children }: any) {
  return <div className="tab">{children}</div>
}

const AccountView = ({
  user,
  events,
  updateUserRequest,
  getEvents
}: IAccountViewProps) => {
  const [tabIndex, setTabIndex] = useState(0)

  useEffect(() => {
    if (isEmpty(events)) getEvents()
  }, [events, getEvents])

  const handleTabChange = (event: any, index: number) => {
    setTabIndex(index)
  }

  return (
    <Grid className="AccountView-root" container={true} spacing={3}>
      <Grid container={true} item={true} md={3}>
        <AccountDetails user={user} updateUserRequest={updateUserRequest} />
      </Grid>
      <Grid container={true} item={true} md={9}>
        <AppBar position="static" color="default" className="tab-bar">
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            TabIndicatorProps={{ className: 'tab-bar-item' }}
            centered={true}
            className="tab-bar-item"
            variant="fullWidth"
          >
            <Tab label="My events" />
            <Tab label="My playlists" />
            <Tab label="My guests" />
          </Tabs>
        </AppBar>
        {tabIndex === 0 && (
          <TabContainer>
            <MyEvents events={events} />
          </TabContainer>
        )}
        {tabIndex === 1 && (
          <TabContainer>
            <MyPlaylists events={events} />
          </TabContainer>
        )}
        {tabIndex === 2 && (
          <TabContainer>
            <MyGuests events={events} />
          </TabContainer>
        )}
      </Grid>
    </Grid>
  )
}

export default AccountView
