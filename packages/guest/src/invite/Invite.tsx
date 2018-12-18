import { isEmpty } from 'lodash'
import { Redirect, RouteComponentProps } from 'react-router'
import IEvent from '../event/IEvent'
import IAction from '../IAction'
import LoadingSpinner from '../loading/LoadingSpinnerContainer'
import IUser from '../user/IUser'

const React = require('react')
const { useEffect } = React

interface IInviteProps extends RouteComponentProps<any> {
  user: IUser
  inviteId: string
  event: IEvent
  authError: any
  loading: boolean
  fetchInvite(inviteId: string): IAction
  storeInviteId(inviteId: string): IAction
}

const Invite = ({
  user,
  inviteId,
  event,
  match,
  fetchInvite,
  authError,
  loading,
  storeInviteId
}: IInviteProps) => {
  const inviteIdFromUrl = match.params.inviteId
  useEffect(() => {
    if (isEmpty(user)) {
      storeInviteId(inviteIdFromUrl)
    }
    if ((isEmpty(event) || inviteIdFromUrl !== inviteId) && !loading) {
      fetchInvite(inviteIdFromUrl)
    }
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  if (authError) {
    return <Redirect to="/about" />
  } else if (!isEmpty(event)) {
    return <Redirect to={`/events/${event.eventId}`} />
  }

  return <LoadingSpinner />
}

export default Invite
