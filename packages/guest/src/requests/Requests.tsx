import { AppBar, Divider, Tab, Tabs, Typography } from '@material-ui/core'
import { isEmpty } from 'lodash'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import SwipeableViews from 'react-swipeable-views'
import IEvent from '../event/IEvent'
import EventPicker from '../event/components/EventPickerContainer'
import SelectedEvent from '../finder/SelectedEvent'
import IAction from '../IAction'
import AcceptedTracks from './AcceptedTracksContainer'
import MaybeTracks from './MaybeTracksContainer'
import RejectedTracks from './RejectedTracksContainer'
import IUser from '../user/IUser'
import './Requests.scss'

interface IRequestsProps extends RouteComponentProps<any> {
  event: IEvent
  events: IEvent[]
  user: IUser
  fetchingSuggestions: boolean
  getSuggestions(eventId: string): IAction
  deselectEvent(): IAction
  setEventId(eventId: string): IAction
}

const Requests = ({
  event,
  deselectEvent,
  setEventId,
  fetchingSuggestions,
  getSuggestions,
  match
}: IRequestsProps) => {
  const [value, setValue] = useState(0)
  const eventId = match.params.eventId
  useEffect(() => {
    if (event.eventId !== eventId) {
      setEventId(eventId)
      if (!fetchingSuggestions) {
        getSuggestions(eventId)
      }
    }
  }, [event, eventId, fetchingSuggestions, getSuggestions, setEventId])

  const handleChange = (e: any, value: any) => {
    setValue(value)
  }

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
          onChange={handleChange}
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
      <SwipeableViews axis="x" index={value} onChangeIndex={setValue}>
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

export default Requests
