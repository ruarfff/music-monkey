import { isEmpty } from 'lodash'
import { Redirect, RouteComponentProps } from 'react-router'
import IEvent from '../../event/IEvent'
import { Action } from 'mm-shared'
import LoadingSpinner from '../../loading/LoadingSpinner'
import localStorage from '../../storage/localStorage'
import { User } from 'mm-shared'
import { inviteAnsweredKey, inviteIdKey } from '../inviteConstants'
import React, { useEffect } from 'react'

interface IInviteProps extends RouteComponentProps<any> {
  user: User
  inviteEvent: IEvent
  authError: any
  loading: boolean
  isAuthenticated: boolean
  fetchingRsvp: boolean
  fetchInvite(inviteId: string): Action
  fetchOrCreateRsvp(inviteId: string, userId: string, eventId: string): Action
}

const Invite = ({
  user,
  inviteEvent,
  match,
  fetchInvite,
  authError,
  isAuthenticated,
  loading,
  fetchingRsvp,
  fetchOrCreateRsvp
}: IInviteProps) => {
  const inviteId = match.params.inviteId
  useEffect(() => {
    localStorage.set(inviteIdKey, inviteId)
    localStorage.set(inviteAnsweredKey, 'false')

    if (isEmpty(inviteEvent) && !loading) {
      fetchInvite(inviteId)
    }
    if (!isEmpty(inviteEvent) && !isEmpty(user)) {
      localStorage.set(inviteAnsweredKey, 'true')
      if (!fetchingRsvp) {
        fetchOrCreateRsvp(inviteId, user.userId, inviteEvent.eventId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inviteEvent, inviteId, loading, user])

  if (!isAuthenticated && isEmpty(user) && authError) {
    return <Redirect to={'/login?redirect=/invite/' + inviteId} />
  } else if (!isEmpty(inviteEvent)) {
    return <Redirect to={`/events/${inviteEvent.eventId}`} />
  }

  return <LoadingSpinner />
}

export default Invite
