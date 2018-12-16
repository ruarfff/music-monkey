import { FILTER_BY_EVENT } from './insightsConstants'
import initialState from './insightsInitialState'


export default function insights(state = initialState, action : any) {
  switch (action.type) {
    case FILTER_BY_EVENT:
      return {
        eventId: action.payload
      }
    default:
      return state
  }
}
