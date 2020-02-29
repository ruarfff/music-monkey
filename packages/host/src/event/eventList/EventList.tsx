import React from 'react'
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Tabs,
  Tab,
  Typography
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import Img from 'react-image'
import backgroundImage from 'assets/music-monkey.jpg'
import { Event, useSwipeTabsIndex } from 'mm-shared'
import NoEvents from './NoEvents'
import './EventList.scss'

interface IEventListProps {
  pastEvents: Event[]
  liveEvents: Event[]
  upcomingEvents: Event[]
}

function a11yProps(index: any) {
  return {
    id: `event-list-tab-${index}`,
    'aria-controls': `event-list-tabpanel-${index}`
  }
}

const renderEvents = (events: Event[], status: string) => {
  if (isEmpty(events)) return <NoEvents status={status} />

  const getItemText = (event: Event, status: string) => {
    if (status === 'live') return 'Happening Now'
    if (status === 'upcoming')
      return `Starts at ${event.startDateTime.format(' Do MMMM, YYYY')}`

    return `Finished at ${event.endDateTime.format(' Do MMMM, YYYY')}`
  }

  return (
    <List>
      {events.map((event, index) => (
        <React.Fragment key={index + status}>
          <ListItem
            button={true}
            component={Link}
            to={'/events/' + event.eventId}
            className="EventList-item"
          >
            <Img
              src={[event.imageUrl, backgroundImage]}
              alt="Event icon"
              className="EventList-event-image"
            />

            <ListItemText
              primary={event.name}
              secondary={getItemText(event, status)}
              className="EventList-text"
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  )
}

const EventList = ({
  pastEvents,
  upcomingEvents,
  liveEvents
}: IEventListProps) => {
  const [tabIndex, handleTabChange] = useSwipeTabsIndex()

  return (
    <div className="EventList-root">
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

      <Typography component="div" dir="0" hidden={tabIndex !== 0}>
        {renderEvents(upcomingEvents, 'upcoming')}
      </Typography>

      <Typography component="div" dir="1" hidden={tabIndex !== 1}>
        {renderEvents(liveEvents, 'live')}
      </Typography>

      <Typography component="div" dir="2" hidden={tabIndex !== 2}>
        {renderEvents(pastEvents, 'past')}
      </Typography>
    </div>
  )
}

export default EventList
