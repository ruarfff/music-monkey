import React, { FC, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import {
  Action,
  Event,
  EventPicker,
  SelectedEvent,
  checkEventIsLoaded
} from '../../'

interface EventSelectProps extends RouteComponentProps<any> {
  events: Event[]
  event: Event
  selectEvent(event: Event): Action
  setEventId(eventId: string): Action
  getRequestsByEventId(eventId: string): Action
}

const EventSelect: FC<EventSelectProps> = ({
  events,
  event,
  selectEvent,
  setEventId,
  getRequestsByEventId,
  match
}) => {
  const eventId = match.params.eventId
  const eventLoaded = checkEventIsLoaded(event)
  const [eventPickerOpen, setEventPickerOpen] = useState(false)
  useEffect(() => {
    const selectedEventId = event ? event.eventId : ''
    if (eventId && selectedEventId !== eventId) {
      setEventId(eventId)
      getRequestsByEventId(eventId)
    } else if (!eventLoaded) {
      setEventPickerOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId])

  return (
    <div>
      <EventPicker
        events={events}
        isOpen={eventPickerOpen}
        getRequestsByEventId={getRequestsByEventId}
        selectEvent={selectEvent}
        onClose={() => {
          setEventPickerOpen(false)
        }}
      />
      {eventLoaded && (
        <SelectedEvent
          event={event}
          onClick={() => {
            setEventPickerOpen(true)
          }}
        />
      )}
    </div>
  )
}

export default EventSelect
