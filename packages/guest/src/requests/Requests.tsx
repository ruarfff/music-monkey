import React, { useEffect } from 'react'
import { AppBar, Divider, Tab, Tabs, Typography } from '@material-ui/core'
import { isEmpty } from 'lodash'
import { RouteComponentProps } from 'react-router'
import SwipeableViews from 'react-swipeable-views'
import { Action, Event } from 'mm-shared'
import EventPicker from 'event/components/EventPickerContainer'
import SelectedEvent from 'event/components/SelectedEvent'
import useSwipeTabsIndex from 'util/useSwipeTabsIndex'
import AcceptedTracks from './AcceptedTracksContainer'
import MaybeTracks from './MaybeTracksContainer'
import RejectedTracks from './RejectedTracksContainer'
import './Requests.scss'

interface IRequestsProps extends RouteComponentProps<any> {
  selectedEvent: Event
  deselectEvent(): Action
  setEventId(eventId: string): Action
}

const Requests = ({
  selectedEvent,
  deselectEvent,
  setEventId,
  match
}: IRequestsProps) => {
  const eventId = match.params.eventId
  useEffect(() => {
    const selectedEventId = selectedEvent ? selectedEvent.eventId : ''
    if (eventId && selectedEventId !== eventId) {
      setEventId(eventId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId])

  const [tabIndex, handleTabChange] = useSwipeTabsIndex()

  return (
    <div>
      {isEmpty(selectedEvent) && <EventPicker />}
      {!isEmpty(selectedEvent) && (
        <SelectedEvent event={selectedEvent} deselectEvent={deselectEvent} />
      )}
      <Divider variant="inset" className="Requests-divider" />
      <AppBar position="static" color="default">
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
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
      <SwipeableViews axis="x" index={tabIndex} onChangeIndex={handleTabChange}>
        {tabIndex === 0 ? (
          <Typography component="div" dir="0">
            <AcceptedTracks />
          </Typography>
        ) : (
          <div />
        )}
        {tabIndex === 1 ? (
          <Typography component="div" dir="1">
            <MaybeTracks />
          </Typography>
        ) : (
          <div />
        )}
        {tabIndex === 2 ? (
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
