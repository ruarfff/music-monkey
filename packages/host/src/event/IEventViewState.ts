import IEvent from 'event/IEvent'
import IDecoratedSuggestion from 'suggestion/IDecoratedSuggestion'

export default interface IEventViewState {
  event: IEvent
  loading: boolean
  fetchError: Error
  deleteSelected: boolean
  deleteSucceeded: boolean
  deleteFailed: boolean
  editSuccess: boolean
  editFailure: boolean
  updateSucceeded: boolean
  updateFailed: boolean
  copiedToClipboard: boolean
  pendingSuggestions: IDecoratedSuggestion[]
  rejectedSuggestions: IDecoratedSuggestion[]
}
