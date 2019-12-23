import IAction from '../IAction'
import IDecoratedSuggestion from './IDecoratedSuggestion'
import ISuggestion from './ISuggestion'
import ISuggestionState from './ISuggestionState'
import {
  CLEAR_STAGED_SUGGESTIONS,
  FETCH_SUGGESTIONS_FAILED,
  FETCH_SUGGESTIONS_INITIATED,
  FETCH_SUGGESTIONS_SUCCESS,
  REJECT_SUGGESTION,
  RESET_STAGED_SUGGESTIONS,
  STAGE_ALL_SUGGESTIONS,
  STAGE_MULTIPLE_SUGGESTIONS,
  STAGE_SUGGESTION
} from './suggestionActions'
import initialState from './suggestionInitialState'

export default function suggestion(
  state: ISuggestionState = initialState,
  { type, payload }: IAction
) {
  switch (type) {
    case FETCH_SUGGESTIONS_INITIATED:
      return { ...state, fetchingSuggestions: true } as ISuggestionState
    case FETCH_SUGGESTIONS_SUCCESS: {
      const suggestions = [...payload]

      const pendingSuggestions = suggestions.filter(
        (s: IDecoratedSuggestion) =>
          !s.suggestion.accepted && !s.suggestion.rejected
      )

      const rejectedSuggestions = suggestions.filter(
        (s: IDecoratedSuggestion) => s.suggestion.rejected
      )

      const acceptedSuggestions = suggestions.filter(
        (s: IDecoratedSuggestion) => s.suggestion.accepted
      )

      return {
        ...state,
        suggestions,
        fetchingSuggestions: false,
        pendingSuggestions,
        rejectedSuggestions,
        acceptedSuggestions
      } as ISuggestionState
    }
    case FETCH_SUGGESTIONS_FAILED:
      return {
        ...state,
        fetchingSuggestions: false,
        fetchingSuggestionsError: payload
      } as ISuggestionState
    case STAGE_SUGGESTION: {
      let suggestionToAccept = state.pendingSuggestions.find(
        s => s.suggestion.suggestionId === payload.suggestionId
      )

      let stagedSuggestions = !!suggestionToAccept
        ? [
            ...state.stagedSuggestions,
            {
              ...suggestionToAccept,
              suggestion: { ...suggestionToAccept.suggestion, staged: true }
            }
          ]
        : state.stagedSuggestions

      const pendingSuggestions = !!suggestionToAccept
        ? state.pendingSuggestions.filter(
            s => s.suggestion.suggestionId !== payload.suggestionId
          )
        : state.pendingSuggestions

      if (!suggestionToAccept) {
        suggestionToAccept = state.rejectedSuggestions.find(
          s => s.suggestion.suggestionId === payload.suggestionId
        )
        stagedSuggestions = !!suggestionToAccept
          ? [
              ...state.stagedSuggestions,
              {
                ...suggestionToAccept,
                suggestion: { ...suggestionToAccept.suggestion, staged: true }
              }
            ]
          : state.stagedSuggestions
      }

      const rejectedSuggestions = !!suggestionToAccept
        ? state.rejectedSuggestions.filter(
            s => s.suggestion.suggestionId !== payload.suggestionId
          )
        : state.rejectedSuggestions
      return {
        ...state,
        stagedSuggestions,
        pendingSuggestions,
        rejectedSuggestions
      }
    }
    case STAGE_MULTIPLE_SUGGESTIONS: {
      const suggestionsToAccept: ISuggestion[] = payload || []
      const pendingWithStagedSet = state.pendingSuggestions.map(ds => {
        if (
          suggestionsToAccept.find(
            s => s.suggestionId === ds.suggestion.suggestionId
          )
        ) {
          return {
            ...ds,
            suggestion: {
              ...ds.suggestion,
              staged: true
            }
          }
        } else {
          return ds
        }
      })

      return {
        ...state,
        pendingSuggestions: pendingWithStagedSet.filter(
          s => !s.suggestion.staged
        ),
        stagedSuggestions: [
          ...state.stagedSuggestions,
          ...pendingWithStagedSet.filter(s => s.suggestion.staged)
        ]
      }
    }
    case STAGE_ALL_SUGGESTIONS: {
      const pendingSetToStaged = payload.map(
        (decoratedSuggestion: IDecoratedSuggestion) => ({
          ...decoratedSuggestion,
          suggestion: { ...decoratedSuggestion.suggestion, staged: true }
        })
      )
      return {
        ...state,
        pendingSuggestions: [],
        stagedSuggestions: [...state.stagedSuggestions, ...pendingSetToStaged]
      }
    }
    case CLEAR_STAGED_SUGGESTIONS:
      return {
        ...state,
        stagedSuggestions: []
      }
    case RESET_STAGED_SUGGESTIONS: {
      const unStaged = state.stagedSuggestions.map(s => ({
        ...s,
        suggestion: { ...s.suggestion, staged: false }
      }))

      return {
        ...state,
        stagedSuggestions: [],
        pendingSuggestions: [...unStaged, ...state.pendingSuggestions]
      }
    }
    case REJECT_SUGGESTION: {
      const suggestionToReject = state.pendingSuggestions.find(
        s => s.suggestion.suggestionId === payload.suggestionId
      )
      const rejectedSuggestions = !!suggestionToReject
        ? [
            ...state.rejectedSuggestions,
            {
              ...suggestionToReject,
              suggestion: { ...suggestionToReject.suggestion, rejected: true }
            }
          ]
        : state.rejectedSuggestions
      const pendingSuggestions = !!suggestionToReject
        ? state.pendingSuggestions.filter(
            s => s.suggestion.suggestionId !== payload.suggestionId
          )
        : state.pendingSuggestions

      return {
        ...state,
        rejectedSuggestions,
        pendingSuggestions
      }
    }
    default:
      return state
  }
}
