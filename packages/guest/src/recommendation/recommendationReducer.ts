import { Action } from 'mm-shared'
import RecommendationState from './RecommendationState'
import {
  FETCH_RECOMMENDATIONS_SUCCESS,
  RECOMMENDATIONS_CLEAR
} from './recommendationActions'
import initialState from './recommendationInitialState'

export default function recommendation(
  state: RecommendationState = initialState,
  { type, payload }: Action
) {
  switch (type) {
    case FETCH_RECOMMENDATIONS_SUCCESS:
      return { ...state, tracks: payload }
    case RECOMMENDATIONS_CLEAR:
      return { ...state, tracks: [] }
    default:
      return state
  }
}
