import IEvent from '../event/IEvent'
import IEventViewState from './IEventViewState'

export default {
  event: {} as IEvent,
  loading: false,
  fetchError: {} as Error,
  deleteSelected: false,
  copiedToClipboard: false
} as IEventViewState
