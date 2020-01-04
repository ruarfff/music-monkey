import React, { useEffect } from 'react'
import { isEmpty } from 'lodash'
import { Redirect, RouteComponentProps } from 'react-router'
import { Action, Event, User, LoadingSpinner } from 'mm-shared'
import localStorage from 'storage/localStorage'
import { inviteAnsweredKey, inviteIdKey } from 'invite/inviteConstants'

interface IInviteProps extends RouteComponentProps<any> {
  user: User
  inviteEvent: Event
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
        fetchOrCreateRsvp(inviteId, user.userId, inviteEvent.eventId!)
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
