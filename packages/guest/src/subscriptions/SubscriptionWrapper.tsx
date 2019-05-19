/**
 * All subscriptions are setup here.
 * Subscriptions are listening for asynchronous events sent from the backend.
 * Actions are sent to here to update app state. No inner components are aware of this.
 */
import { useEffect } from 'react'
import {
  subscribeToSuggestionsModified,
  unSubscribeToSuggestionsModified
} from '../notification'
import IEvent from '../event/IEvent'
import IAction from '../IAction'
import { getEvent } from '../event/eventActions'

interface ISubscriptionWrapper {
  event: IEvent
  children: any
  getEvent(eventId: string): IAction
}

const SubscriptionWrapper = ({ event, children }: ISubscriptionWrapper) => {
  useEffect(() => {
    const eventId = event ? event.eventId : ''
    subscribeToSuggestionsModified(eventId, () => {
      getEvent(eventId)
    })

    return () => {
      unSubscribeToSuggestionsModified(eventId)
    }
  }, [event])

  return children
}

export default SubscriptionWrapper
