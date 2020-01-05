/**
 * All subscriptions are setup here.
 * Subscriptions are listening for asynchronous events sent from the backend.
 * Actions are sent to here to update app state. No inner components are aware of this.
 */
import { useEffect } from 'react'
import {
  subscribeToSuggestionsModified,
  unSubscribeToSuggestionsModified,
  subscribeToRSVPModified,
  unSubscribeToRSVPModified,
  unSubscribeToVotesModified,
  subscribeToVotesModified,
  unSubscribeToPlaylistModified,
  unSubscribeToEventUpdated,
  subscribeToEventUpdated,
  subscribeToPlaylistModified
} from './pusherGateway'
import { Action, Event } from 'mm-shared'

interface ISubscriptionWrapper {
  event: Event
  children: any
  getEvent(eventId: string): Action
  fetchEventVotes(eventId: string): Action
  getEventSuggestions(eventId: string): Action
}

const SubscriptionWrapper = ({
  event,
  children,
  getEvent,
  fetchEventVotes,
  getEventSuggestions
}: ISubscriptionWrapper) => {
  useEffect(() => {
    const eventId = event ? event.eventId! : ''
    const playlistId = event && event.playlist ? event.playlist.id : ''

    subscribeToSuggestionsModified(eventId, () => {
      getEventSuggestions(eventId)
    })

    subscribeToRSVPModified(eventId, () => {
      getEvent(eventId)
    })

    subscribeToVotesModified(eventId, () => {
      fetchEventVotes(eventId)
    })

    subscribeToPlaylistModified(playlistId, () => {
      getEvent(eventId)
    })

    subscribeToEventUpdated(eventId, () => {
      getEvent(eventId)
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
