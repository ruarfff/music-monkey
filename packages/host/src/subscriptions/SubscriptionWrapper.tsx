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
  subscribeToVotesModified
} from './pusherGateway'
import IEvent from '../event/IEvent'
import IAction from '../IAction'

interface ISubscriptionWrapper {
  event: IEvent
  children: any
  getEventByIdNoLoading(eventId: string): IAction
  fetchEventVotes(eventId: string): IAction
  getEventSuggestions(eventId: string): IAction
}

export default ({
  event,
  children,
  getEventByIdNoLoading,
  fetchEventVotes,
  getEventSuggestions
}: ISubscriptionWrapper) => {
  useEffect(() => {
    const eventId = event && event.eventId ? event.eventId : ''
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

    return () => {
      unSubscribeToSuggestionsModified(eventId)
      unSubscribeToRSVPModified(eventId)
      unSubscribeToVotesModified(eventId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event])

  return children
}
