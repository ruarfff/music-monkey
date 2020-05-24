/**
 * All subscriptions are setup here.
 * Subscriptions are listening for asynchronous events sent from the backend.
 * Actions are sent to here to update app state. No inner components are aware of this.
 */
import { useEffect, useContext } from 'react'
import {
  subscribeToSuggestionsModified,
  unSubscribeToSuggestionsModified,
  subscribeToRSVPModified,
  unSubscribeToRSVPModified,
  unSubscribeToVotesModified,
  subscribeToVotesModified,
  unSubscribeToPlaylistModified,
  subscribeToEventUpdated,
  unSubscribeToEventUpdated,
  subscribeToPlaylistModified
} from './pusherGateway'
import {
  Action,
  Event,
  Suggestion,
  User,
  notificationContext,
  useSnackbarAlert
} from '../'

interface ISubscriptionWrapper {
  isHost: boolean
  user: User
  event: Event
  children: any
  getEventById(eventId: string): Action
  fetchEventVotes(eventId: string): Action
  getEventSuggestions(eventId: string): Action
}

const SubscriptionWrapper = ({
  isHost,
  user,
  event,
  children,
  getEventById,
  fetchEventVotes,
  getEventSuggestions
}: ISubscriptionWrapper) => {
  const { setNotification } = useContext(notificationContext)
  const { showError } = useSnackbarAlert()

  useEffect(() => {
    const eventId = event && event.eventId ? event.eventId : ''
    const playlistId = event && event.playlist ? event.playlist.id : ''

    subscribeToSuggestionsModified(
      eventId,
      (type: string, data: Suggestion[] = []) => {
        console.log('SUB WRAP')
        console.log(data)
        console.log('Get event suggestions on sub: ' + eventId)
        getEventSuggestions(eventId)
        try {
          const trackUris = data.map((s) => s.trackUri)
          if (type === 'accepted') {
            if (event.settings.autoAcceptSuggestionsEnabled) {
              setNotification({ type: 'accept', payload: trackUris })
            } else {
              console.log('Accept request')
              setNotification({ type: 'accept', payload: trackUris })
              setNotification({ type: 'acceptRequest', payload: trackUris })
            }
          } else if (
            type === 'requested' &&
            !event.settings.autoAcceptSuggestionsEnabled
          ) {
            setNotification({ type: 'request', payload: trackUris })
          } else if (type === 'rejected') {
            const rejectedTrack = data.find((a) => a.userId === user.userId)
            if (!isHost && rejectedTrack) {
              showError('Track Declined')
            }
            setNotification({ type: 'rejectRequest', payload: trackUris })
          }
        } catch (err) {
          console.error(err)
        }
      }
    )

    subscribeToRSVPModified(eventId, () => {
      console.log('Get event RSVP sub: ' + eventId)
      getEventById(eventId)
    })

    subscribeToVotesModified(eventId, () => {
      console.log('Get event Votes sub: ' + eventId)
      fetchEventVotes(eventId)
    })

    subscribeToPlaylistModified(playlistId, () => {
      console.log('Get event PlaylistMod sub: ' + eventId)
      getEventById(eventId)
    })

    subscribeToEventUpdated(eventId, () => {
      console.log('Get event EventUpdated sub: ' + eventId)
      getEventById(eventId)
    })

    return () => {
      unSubscribeToSuggestionsModified(eventId)
      unSubscribeToRSVPModified(eventId)
      unSubscribeToVotesModified(eventId)
      unSubscribeToPlaylistModified(playlistId)
      unSubscribeToEventUpdated(eventId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event])

  return children
}

export default SubscriptionWrapper
