import IEvent from 'event/IEvent'
import IEventSettings from 'event/IEventSettings'
import IEventViewState from './IEventViewState'

export default {
  event: {
    settings: {} as IEventSettings
  } as IEvent,
  loading: false,
  fetchError: {} as Error,
  deleteSelected: false,
  copiedToClipboard: false
} as IEventViewState
