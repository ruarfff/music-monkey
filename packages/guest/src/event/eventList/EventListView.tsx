import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { Redirect } from 'react-router'
import {
  Action,
  Event,
  MarvinLoader,
  localStorage,
  sortEvents
} from 'mm-shared'
import { inviteAnsweredKey, inviteIdKey } from 'invite/inviteConstants'
import EventList from './EventList'
import './EventListView.scss'
import NoEvents from './NoEvents'

interface IEventListViewProps {
  event: Event
  events: Event[]
  eventsLoading: boolean
  deselectEvent(): Action
}

const EventListView = ({
  event,
  events,
  eventsLoading,
  deselectEvent
}: IEventListViewProps) => {
  const [redirect, setRedirect] = useState(false)
  const [inviteId, setInviteId] = useState('')
  const [inviteAnswered, setInviteAnswered] = useState(null)

  useEffect(() => {
    if (!isEmpty(event)) {
      deselectEvent()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event])

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
    return <MarvinLoader />
  }

  if (isEmpty(events)) {
    return <NoEvents />
  }

  const { pastEvents, upcomingEvents, liveEvents } = sortEvents(events)

  return (
    <div className="EventListView-root">
      <EventList
        pastEvents={pastEvents}
        upcomingEvents={upcomingEvents}
        liveEvents={liveEvents}
      />
    </div>
  )
}

export default EventListView
