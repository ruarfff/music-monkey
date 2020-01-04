import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import { isEmpty } from 'lodash'
import { Redirect } from 'react-router'
import { Action, Event, LoadingSpinner } from 'mm-shared'
import { inviteAnsweredKey, inviteIdKey } from 'invite/inviteConstants'
import localStorage from 'storage/localStorage'
import EventList from './EventList'
import sortEvents from '../sortEvents'

interface IEventListViewProps {
  selectedEvent: Event
  events: Event[]
  eventsLoading: boolean
  deselectEvent(): Action
}

const EventListView = ({
  selectedEvent,
  events,
  eventsLoading,
  deselectEvent
}: IEventListViewProps) => {
  const [redirect, setRedirect] = useState(false)
  const [inviteId, setInviteId] = useState('')
  const [inviteAnswered, setInviteAnswered] = useState(null)

  useEffect(() => {
    if (!isEmpty(selectedEvent)) {
      deselectEvent()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEvent])

  useEffect(() => {
    let storedInvite = localStorage.get(inviteIdKey, null)
    if (storedInvite === 'undefined') {
      storedInvite = null
    }
    setInviteId(storedInvite)
    setInviteAnswered(localStorage.get(inviteAnsweredKey, null))
  }, [])
  useEffect(() => {
    const shouldRedirect = !!(inviteId && inviteAnswered === 'false')
    if (shouldRedirect !== redirect) {
      setRedirect(shouldRedirect)
    }
  }, [inviteAnswered, inviteId, redirect])

  if (redirect && inviteId) {
    return <Redirect to={'/invite/' + inviteId} />
  }

  if (eventsLoading) {
    return <LoadingSpinner />
  }

  if (isEmpty(events)) {
    return (
      <div>
        <Typography align={'center'} variant={'h6'}>
          It looks like you don't have any events yet :(
        </Typography>
      </div>
    )
  }

  const { pastEvents, upcomingEvents, liveEvents } = sortEvents(events)

  return (
    <EventList
      pastEvents={pastEvents}
      upcomingEvents={upcomingEvents}
      liveEvents={liveEvents}
    />
  )
}

export default EventListView
