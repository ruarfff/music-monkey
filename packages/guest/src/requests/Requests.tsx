import { AppBar, Divider, Tab, Tabs, Typography } from '@material-ui/core'
import { isEmpty, sortBy } from 'lodash'
import moment from 'moment'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import SwipeableViews from 'react-swipeable-views'
import IEvent from '../event/IEvent'
import EventPicker from '../finder/EventPicker'
import SelectedEvent from '../finder/SelectedEvent'
import IAction from '../IAction'
import ISuggestionState from '../suggestion/ISuggestionState'
import AcceptedTracks from '../trackView/AcceptedTracksContainer'
import MaybeTracks from '../trackView/MaybeTracksContainer'
import RejectedTracks from '../trackView/RejectedTracksContainer'
import IUser from '../user/IUser'
import './Requests.scss'

interface IRequestsProps extends RouteComponentProps<any> {
  event: IEvent
  events: IEvent[]
  user: IUser
  suggestion: ISuggestionState
  getUsersSuggestions(eventId: string): IAction
  deselectEvent(): IAction
  setEventId(eventId: string): IAction
}

class Requests extends React.Component<IRequestsProps> {
  public state = {
    value: 0
  }

  public componentDidMount() {
    this.props.setEventId(this.props.match.params.eventId)
    if (
      !isEmpty(this.props.event) &&
      !this.props.suggestion.fetchingSuggestions
    ) {
      this.props.getUsersSuggestions(this.props.event.eventId)
    }
  }

  public componentWillReceiveProps(newProps: IRequestsProps) {
    if (
      !isEmpty(newProps.event) &&
      newProps.event.eventId &&
      isEmpty(this.props.event)
    ) {
      this.props.getUsersSuggestions(newProps.event.eventId)
    }
  }

  public handleSuggestionNotification = () => {
    const eventId = this.props.event.eventId
    if (eventId && !this.props.suggestion.fetchingSuggestions) {
      this.props.getUsersSuggestions(eventId)
    }
  }

  public handleChange = (event: any, value: any) => {
    this.setState({ value })
  }

  public handleChangeIndex = (index: any) => {
    this.setState({ value: index })
  }

  public render() {
    const { value } = this.state
    const { suggestion, event, events, deselectEvent } = this.props

    const now = moment()

    let sortedEvents = [] as IEvent[]

    if (!isEmpty(events)) {
      const pastEvents = sortBy(
        events.filter(e => now.isAfter(e.endDateTime)),
        'endDateTime'
      ).reverse()

      const liveEvents = sortBy(
        events.filter(
          e => now.isAfter(e.startDateTime) && now.isBefore(e.endDateTime)
        ),
        'endDateTime'
      ).reverse()

      const upcomingEvents = sortBy(
        events.filter(e => now.isBefore(e.startDateTime)),
        'endDateTime'
      ).reverse()

      sortedEvents = upcomingEvents.concat(liveEvents, pastEvents)
    }

    let tabs = <div />

    if (!suggestion.fetchingSuggestions) {
      tabs = (
        <div>
          {isEmpty(event) && !isEmpty(sortedEvents) && (
            <EventPicker isFinder={false} events={sortedEvents} />
          )}
          {!isEmpty(event) && (
            <SelectedEvent event={event} deselectEvent={deselectEvent} />
          )}
          <Divider variant="inset" className="divider-account-search-block" />
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={this.handleChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="fullWidth"
              classes={{ indicator: 'indicator-color' }}
            >
              <Tab label="APPROVED" />
              <Tab label="MAYBE" />
              <Tab label="DECLINED" />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis="x"
            index={value}
            onChangeIndex={this.handleChangeIndex}
          >
            {value === 0 ? (
              <Typography component="div" dir="0">
                <AcceptedTracks />
              </Typography>
            ) : (
              <div />
            )}
            {value === 1 ? (
              <Typography component="div" dir="1">
                <MaybeTracks />
              </Typography>
            ) : (
              <div />
            )}
            {value === 2 ? (
              <Typography component="div" dir="2">
                <RejectedTracks />
              </Typography>
            ) : (
              <div />
            )}
          </SwipeableViews>
        </div>
      )
    }

    return tabs
  }
}

export default withRouter(Requests)
