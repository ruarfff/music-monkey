import { AppBar, Divider, Tab, Tabs, Typography } from '@material-ui/core'
import { isEmpty } from 'lodash'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import SwipeableViews from 'react-swipeable-views'
import IEvent from '../event/IEvent'
import EventPicker from '../event/components/EventPickerContainer'
import SelectedEvent from '../finder/SelectedEvent'
import IAction from '../IAction'
import ISuggestionState from '../suggestion/ISuggestionState'
import AcceptedTracks from './AcceptedTracksContainer'
import MaybeTracks from './MaybeTracksContainer'
import RejectedTracks from './RejectedTracksContainer'
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

  public handleChange = (event: any, value: any) => {
    this.setState({ value })
  }

  public handleChangeIndex = (index: any) => {
    this.setState({ value: index })
  }

  public render() {
    const { value } = this.state
    const { event, deselectEvent } = this.props

    return (
      <div>
        {isEmpty(event) && <EventPicker />}
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
}

export default Requests
