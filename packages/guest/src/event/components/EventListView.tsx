import { Typography } from '@material-ui/core'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import IAction from '../../IAction'
import { inviteAnsweredKey, inviteIdKey } from '../../invite/inviteConstants'
import LoadingSpinner from '../../loading/LoadingSpinner'
import IPlaylist from '../../playlist/IPlaylist'
import localStorage from '../../storage/localStorage'
import IUser from '../../user/IUser'
import IEvent from '../IEvent'
import EventList from './EventList'
import './EventListView.scss'
import React from 'react'

interface IEventListViewProps {
  user: IUser
  events: IEvent[]
  eventsLoading: boolean
  selectPage(value: string): IAction
  selectPlaylist(playlist: IPlaylist): IAction
}

const EventListView = ({
  events,
  eventsLoading,
  selectPlaylist
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

    console.log('Invite Id', inviteId)
    console.log('Invite Answered', inviteAnswered)
    console.log(redirect)
  }, [inviteAnswered, inviteId, redirect])

  if (redirect && inviteId) {
    console.log('REDIRECTING')
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
    <div>
      <EventList selectPlaylist={selectPlaylist} events={events} />
    </div>
  )
}

export default EventListView
