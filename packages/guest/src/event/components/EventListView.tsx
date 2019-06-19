import { Typography } from '@material-ui/core'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { inviteAnsweredKey, inviteIdKey } from '../../invite/inviteConstants'
import LoadingSpinner from '../../loading/LoadingSpinner'
import localStorage from '../../storage/localStorage'
import IUser from '../../user/IUser'
import IEvent from '../IEvent'
import EventList from './EventList'
import './EventListView.scss'
import React from 'react'
import IAction from '../../IAction'

interface IEventListViewProps {
  user: IUser
  events: IEvent[]
  pastEvents: IEvent[]
  liveEvents: IEvent[]
  upcomingEvents: IEvent[]
  eventsLoading: boolean
  selectEvent(event: IEvent): IAction
}

const EventListView = ({
  events,
  eventsLoading,
  pastEvents,
  liveEvents,
  upcomingEvents,
  selectEvent
}: IEventListViewProps) => {
  const [redirect, setRedirect] = useState(false)
  const [inviteId, setInviteId] = useState('')
  const [inviteAnswered, setInviteAnswered] = useState(null)

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

  return (
    <EventList
      pastEvents={pastEvents}
      upcomingEvents={upcomingEvents}
      liveEvents={liveEvents}
      onEventSelected={selectEvent}
    />
  )
}

export default EventListView
