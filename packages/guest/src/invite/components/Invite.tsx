import { isEmpty } from 'lodash'
import { Redirect, RouteComponentProps } from 'react-router'
import IEvent from '../../event/IEvent'
import IAction from '../../IAction'
import LoadingSpinner from '../../loading/LoadingSpinner'
import localStorage from '../../storage/localStorage'
import IUser from '../../user/IUser'
import { inviteAnsweredKey, inviteIdKey } from '../inviteConstants'

const React = require('react')
const { useEffect } = React

interface IInviteProps extends RouteComponentProps<any> {
  user: IUser
  inviteId: string
  inviteEvent: IEvent
  authError: any
  loading: boolean
  isAuthenticated: boolean
  fetchInvite(inviteId: string): IAction
}

const Invite = ({
  user,
  inviteId,
  inviteEvent,
  match,
  fetchInvite,
  authError,
  isAuthenticated,
  loading
}: IInviteProps) => {
  const inviteIdFromUrl = match.params.inviteId
  useEffect(
    () => {
      localStorage.set(inviteIdKey, inviteIdFromUrl)
      localStorage.set(inviteAnsweredKey, 'false')
      console.log('Setting invite to ' + inviteIdFromUrl)

      if (isEmpty(inviteEvent) && !loading) {
        fetchInvite(inviteIdFromUrl)
      }
      if (!isEmpty(inviteEvent) && !isEmpty(user)) {
        localStorage.set(inviteAnsweredKey, 'true')
      }
    },
    [inviteIdFromUrl, loading]
  )

  if (!isAuthenticated && isEmpty(user) && authError) {
    return <Redirect to={'/login?redirect=/invite/' + inviteIdFromUrl} />
  } else if (!isEmpty(inviteEvent)) {
    return <Redirect to={`/events/${inviteEvent.eventId}`} />
  }

  return <LoadingSpinner />
}

export default Invite
