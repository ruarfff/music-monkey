import IAction from '../IAction'
import IDecoratedSuggestion from './IDecoratedSuggestion'
import ISuggestion from './ISuggestion'
import ISuggestionState from './ISuggestionState'
import {
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
import suggestion from './suggestionReducer'

describe('suggestionReducer', () => {
  it('should return the initial state when no action matches', () => {
    expect(suggestion(undefined, {} as IAction)).toEqual(initialState)
  })

  it('should handle FETCH_SUGGESTIONS_INITIATED', () => {
    expect(
      suggestion(initialState, {
        type: FETCH_SUGGESTIONS_INITIATED
      })
    ).toEqual({
      ...initialState,
      fetchingSuggestions: true
    })
  })

  it('should handle FETCH_SUGGESTIONS_FAILED', () => {
    expect(
      suggestion(
        { ...initialState, fetchingSuggestions: true },
        { type: FETCH_SUGGESTIONS_FAILED, payload: new Error('terrible') }
      )
    ).toEqual({
      ...initialState,
      fetchingSuggestions: false,
      fetchingSuggestionsError: new Error('terrible')
    })
  })

  it('should handle FETCH_SUGGESTIONS_SUCCESS', () => {
    const suggestions = [
      {
        suggestion: { suggestionId: 'pending' } as ISuggestion
      } as IDecoratedSuggestion,
      {
        suggestion: {
          suggestionId: 'rejected',
          accepted: false,
          rejected: true
        } as ISuggestion
      } as IDecoratedSuggestion,
      {
        suggestion: {
          suggestionId: 'accepted',
          accepted: true,
          rejected: false
        } as ISuggestion
      } as IDecoratedSuggestion
    ]

    expect(
      suggestion(
        { ...initialState, fetchingSuggestions: true },
        { type: FETCH_SUGGESTIONS_SUCCESS, payload: suggestions }
      )
    ).toEqual({
      ...initialState,
      fetchingSuggestions: false,
      suggestions,
      pendingSuggestions: [suggestions[0]],
      rejectedSuggestions: [suggestions[1]],
      acceptedSuggestions: [suggestions[2]]
    })
  })

  it('should handle STAGE_SUGGESTION', () => {
    expect(
      suggestion(
        {
          ...initialState,
          pendingSuggestions: [
            {
              suggestion: { suggestionId: 'na' } as ISuggestion
            } as IDecoratedSuggestion,
            {
              suggestion: {
                suggestionId: '123',
                staged: false,
                rejected: false
              } as ISuggestion
            } as IDecoratedSuggestion
          ]
        },
        {
          type: STAGE_SUGGESTION,
          payload: {
            suggestionId: '123',
            staged: false,
            rejected: false
          } as ISuggestion
        }
      )
    ).toEqual({
      ...initialState,
      pendingSuggestions: [
        {
          suggestion: { suggestionId: 'na' } as ISuggestion
        } as IDecoratedSuggestion
      ],
      stagedSuggestions: [
        {
          suggestion: {
            suggestionId: '123',
            staged: true,
            rejected: false
          } as ISuggestion
        } as IDecoratedSuggestion
      ]
    } as ISuggestionState)
  })

  it('should handle STAGE_MULTIPLE_SUGGESTIONS', () => {
    const suggestions = [
      {
        suggestion: { suggestionId: '1' }
      } as IDecoratedSuggestion,
      {
        suggestion: { suggestionId: '2' }
      } as IDecoratedSuggestion
    ]

    expect(
      suggestion(
        {
          ...initialState,
          pendingSuggestions: suggestions
        },
        {
          type: STAGE_MULTIPLE_SUGGESTIONS,
          payload: suggestions.map(s => s.suggestion)
        }
      )
    ).toEqual({
      ...initialState,
      pendingSuggestions: [],
      stagedSuggestions: [
        {
          suggestion: { suggestionId: '1', staged: true }
        } as IDecoratedSuggestion,
        {
          suggestion: { suggestionId: '2', staged: true }
        } as IDecoratedSuggestion
      ]
    } as ISuggestionState)
  })

  it('should handle STAGE_ALL_SUGGESTIONS', () => {
    expect(
      suggestion(
        {
          ...initialState
        },
        {
          type: STAGE_ALL_SUGGESTIONS,
          payload: [
            {
              suggestion: { suggestionId: 'na' } as ISuggestion
            } as IDecoratedSuggestion,
            {
              suggestion: {
                suggestionId: '123',
                staged: false
              } as ISuggestion
            } as IDecoratedSuggestion
          ]
        }
      )
    ).toEqual({
      ...initialState,
      pendingSuggestions: [],
      stagedSuggestions: [
        {
          suggestion: { suggestionId: 'na', staged: true } as ISuggestion
        } as IDecoratedSuggestion,
        {
          suggestion: {
            suggestionId: '123',
            staged: true
          } as ISuggestion
        } as IDecoratedSuggestion
      ]
    } as ISuggestionState)
  })

  it('should handle RESET_STAGED_SUGGESTIONS', () => {
    const sampleSuggestion = {
      suggestion: {
        suggestionId: '123',
        staged: false
      } as ISuggestion
    } as IDecoratedSuggestion
    expect(
      suggestion(
        {
          ...initialState,
          stagedSuggestions: [sampleSuggestion],
          pendingSuggestions: []
        },
        {
          type: RESET_STAGED_SUGGESTIONS
        }
      )
    ).toEqual({
      ...initialState,
      pendingSuggestions: [
        {
          ...sampleSuggestion,
          suggestion: { ...sampleSuggestion.suggestion, staged: false }
        }
      ],
      stagedSuggestions: []
    } as ISuggestionState)
  })

  it('should handle REJECT_SUGGESTION', () => {
    const suggestionToReject = {
      suggestion: {
        suggestionId: '123',
        accepted: false,
        rejected: false
      } as ISuggestion
    } as IDecoratedSuggestion
    const pendingSuggestion = {
      suggestion: { suggestionId: 'na' } as ISuggestion
    } as IDecoratedSuggestion

    expect(
      suggestion(
        {
          ...initialState,
          pendingSuggestions: [pendingSuggestion, suggestionToReject]
        },
        { type: REJECT_SUGGESTION, payload: suggestionToReject.suggestion }
      )
    ).toEqual({
      ...initialState,
      pendingSuggestions: [pendingSuggestion],
      rejectedSuggestions: [
        {
          ...suggestionToReject,
          suggestion: { ...suggestionToReject.suggestion, rejected: true }
        }
      ]
    })
  })
})
