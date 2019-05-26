import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from '@material-ui/core'
import { sortBy } from 'lodash'
import moment from 'moment'
import * as React from 'react'
import { Link } from 'react-router-dom'
import IAction from '../../IAction'
import IPlaylist from '../../playlist/IPlaylist'
import IEvent from '../IEvent'
import './EventList.scss'

interface IEventListProps {
  events: IEvent[]
  selectPlaylist(playlist: IPlaylist): IAction
}

export default class EventList extends React.PureComponent<IEventListProps> {
  public render() {
    const { events } = this.props

    if (!events || events.length < 1) {
      return (
        <Paper elevation={1} className="EventList-no-events-message">
          <Typography align="center" variant="h5" component="h3">
            No events to show yet
          </Typography>
        </Paper>
      )
    }

    const now = moment()

    const pastEvents = sortBy(
      events.filter(event => now.isAfter(event.endDateTime)),
      'endDateTime'
    ).reverse()

    const liveEvents = sortBy(
      events
        .filter(
          event =>
            now.isAfter(event.startDateTime) && now.isBefore(event.endDateTime),
          'endDateTime'
        )
        .reverse()
    )

    const upcomingEvents = sortBy(
      events
        .filter(event => now.isBefore(event.startDateTime), 'endDateTime')
        .reverse()
    )

    return (
      <List>
        {this.renderEvents(liveEvents, 'live')}
        {this.renderEvents(upcomingEvents, 'upcoming')}
        {this.renderEvents(pastEvents, 'past')}
      </List>
    )
  }

  private renderEvents = (events: IEvent[], status: string) => {
    const listLink = (to: string) => ({ innerRef, ...props }: any) => (
      <Link {...props} to={to} />
    )

    return (
      <React.Fragment>
        {events.map((event, index) => (
          <div className="EventList-item" key={index + status}>
            <ListItem component={listLink('/events/' + event.eventId)}>
              <img
                alt={event.name}
                src={event.imageUrl || '/img/partycover-sm.png'}
                className="EventList-event-image"
              />
              {status === 'live' && (
                <ListItemText
                  primary={event.name}
                  secondary={'Happening Now'}
                />
              )}
              {status === 'upcoming' && (
                <ListItemText
                  primary={event.name}
                  secondary={`Starts at ${event.startDateTime.format(
                    ' Do MMMM, YYYY'
                  )}`}
                />
              )}
              {status === 'past' && (
                <ListItemText
                  primary={event.name}
                  secondary={`Finished at ${event.endDateTime.format(
                    ' Do MMMM, YYYY'
                  )}`}
                />
              )}
            </ListItem>
            <li>
              <Divider variant="inset" className="EventList-item-divider" />
            </li>
          </div>
        ))}
      </React.Fragment>
    )
  }
}
