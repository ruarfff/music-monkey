import React, { useState } from 'react'
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Tabs,
  Tab
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import Image from 'components/Image'
import backgroundImage from 'assets/music-monkey.jpg'
import IEvent from 'event/IEvent'
import './EventList.scss'
import TabPanel from './saveEvent/TabPanel'

interface IEventListProps {
  pastEvents: IEvent[]
  liveEvents: IEvent[]
  upcomingEvents: IEvent[]
}

function a11yProps(index: any) {
  return {
    id: `event-list-tab-${index}`,
    'aria-controls': `event-list-tabpanel-${index}`
  }
}

const renderEvents = (events: IEvent[], status: string) => {
  if (isEmpty(events)) return null

  const getItemText = (event: IEvent, status: string) => {
    if (status === 'live') return 'Happening Now'
    if (status === 'upcoming')
      return `Starts at ${event.startDateTime.format(' Do MMMM, YYYY')}`

    return `Finished at ${event.endDateTime.format(' Do MMMM, YYYY')}`
  }

  return (
    <>
      {events.map((event, index) => (
        <div className="EventList-root" key={index + status}>
          <ListItem
            button={true}
            component={Link}
            to={'/events/' + event.eventId}
            className="EventList-item"
          >
            <Image
              src={event.imageUrl || backgroundImage}
              alt="Event icon"
              fallbackSrc={backgroundImage}
              className="EventList-event-image"
            />

            <ListItemText
              primary={event.name}
              secondary={getItemText(event, status)}
              className="EventList-text"
            />
          </ListItem>
          <li>
            <Divider variant="inset" className="EventList-item-divider" />
          </li>
        </div>
      ))}
    </>
  )
}

const EventList = ({
  pastEvents,
  upcomingEvents,
  liveEvents
}: IEventListProps) => {
  const [tabIndex, setTabIndex] = useState(0)
  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue)
  }

  return (
    <List>
      <AppBar position="static" color="default">
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="event list"
        >
          <Tab label="Upcoming" {...a11yProps(0)} />
          <Tab label="Live" {...a11yProps(1)} />
          <Tab label="Past" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      {tabIndex === 0 && (
        <TabPanel value={tabIndex} index={0}>
          {renderEvents(upcomingEvents, 'upcoming')}
        </TabPanel>
      )}
      {tabIndex === 1 && (
        <TabPanel value={tabIndex} index={1}>
          {renderEvents(liveEvents, 'live')}
        </TabPanel>
      )}
      {tabIndex === 2 && (
        <TabPanel value={tabIndex} index={2}>
          {renderEvents(pastEvents, 'past')}
        </TabPanel>
      )}
    </List>
  )
}

export default EventList
