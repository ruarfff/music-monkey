import IAction from '../IAction'
import IRecommendationsState from './IRecommendationState'
import { FETCH_RECOMMENDATIONS_SUCCESS,RECOMMENDATIONS_CLEAR } from './recommendationActions'
import initialState from './recommendationsInitialState'

export default function recommendation(
  state: IRecommendationsState = initialState,
  { type, payload }: IAction
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
