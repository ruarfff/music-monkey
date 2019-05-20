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
import IEvent from '../event/IEvent'
import IAction from '../IAction'

interface ISubscriptionWrapper {
  event: IEvent
  children: any
  getEvent(eventId: string): IAction
  fetchEventVotes(eventId: string): IAction
}

export default ({
  event,
  children,
  getEvent,
  fetchEventVotes
}: ISubscriptionWrapper) => {
  useEffect(() => {
    const eventId = event ? event.eventId : ''
    const playlistId = event && event.playlist ? event.playlist.id : ''

    subscribeToSuggestionsModified(eventId, () => {
      getEvent(eventId)
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
  }, [event, fetchEventVotes, getEvent])

  return children
}
