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
  subscribeToPlaylistModified
} from './pusherGateway'
import { Action, Event } from 'mm-shared'

interface ISubscriptionWrapper {
  event: Event
  children: any
  getEventByIdNoLoading(eventId: string): Action
  fetchEventVotes(eventId: string): Action
  getEventSuggestions(eventId: string): Action
}

const SubscriptionWrapper = ({
  event,
  children,
  getEventByIdNoLoading,
  fetchEventVotes,
  getEventSuggestions
}: ISubscriptionWrapper) => {
  useEffect(() => {
    const eventId = event && event.eventId ? event.eventId : ''
    const playlistId = event && event.playlist ? event.playlist.id : ''

    const autoAcceptSuggestionsEnabled =
      event && event.settings && event.settings.autoAcceptSuggestionsEnabled
    const dynamicVotingEnabled =
      event && event.settings && event.settings.dynamicVotingEnabled

    subscribeToSuggestionsModified(eventId, () => {
      if (autoAcceptSuggestionsEnabled) {
        getEventByIdNoLoading(eventId)
      } else {
        getEventSuggestions(eventId)
      }
    })

    subscribeToRSVPModified(eventId, () => {
      getEventByIdNoLoading(eventId)
    })

    subscribeToVotesModified(eventId, () => {
      fetchEventVotes(eventId)
      if (dynamicVotingEnabled) {
        getEventByIdNoLoading(eventId)
      }
    })

    subscribeToPlaylistModified(playlistId, () => {
      getEventByIdNoLoading(eventId)
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
