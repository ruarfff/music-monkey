import React, { useEffect } from 'react'
import { isEmpty } from 'lodash'
import { Redirect, RouteComponentProps, withRouter } from 'react-router'
import { Action, Event, User, LoadingSpinner, localStorage } from 'mm-shared'
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
  console.log('Heloooooooo!!!!!!!!!!')
  const inviteId = match.params.inviteId
  useEffect(() => {
    localStorage.set(inviteIdKey, inviteId)
    localStorage.set(inviteAnsweredKey, 'false')

    if (isEmpty(inviteEvent) && !loading) {
      fetchInvite(inviteId)
    }

    console.log('inviteEvent ' + JSON.stringify(inviteEvent))
    console.log('user ' + JSON.stringify(user))

    if (!isEmpty(inviteEvent) && !isEmpty(user)) {
      localStorage.set(inviteAnsweredKey, 'true')
      if (!fetchingRsvp) {
        console.log('fetchOrCreateRsvp')
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

export default withRouter(Invite)
