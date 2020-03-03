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
import { Action, Event, Suggestion } from 'mm-shared'
import { NotificationContext } from 'mm-shared'

interface ISubscriptionWrapper {
  event: Event
  children: any
  getEventById(eventId: string): Action
  fetchEventVotes(eventId: string): Action
  getEventSuggestions(eventId: string): Action
}

const SubscriptionWrapper = ({
  event,
  children,
  getEventById,
  fetchEventVotes,
  getEventSuggestions
}: ISubscriptionWrapper) => {
  const { acceptedTracks, updateAcceptedTracks } = useContext(
    NotificationContext
  )
  useEffect(() => {
    const eventId = event && event.eventId ? event.eventId : ''
    const playlistId = event && event.playlist ? event.playlist.id : ''

    subscribeToSuggestionsModified(
      eventId,
      (type: string, data: Suggestion[]) => {
        console.log('Get event suggestions on sub: ' + eventId)
        getEventSuggestions(eventId)
        if (
          type === 'accepted' &&
          event.settings.autoAcceptSuggestionsEnabled
        ) {
          updateAcceptedTracks([
            ...acceptedTracks,
            ...data.map(s => s.trackUri)
          ])
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
