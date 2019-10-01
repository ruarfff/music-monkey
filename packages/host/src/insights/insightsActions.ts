import Action from 'IAction'
import { FILTER_BY_EVENT } from './insightsConstants'

export const filterByEventPick = (payload: any): Action => {
  return {
    type: FILTER_BY_EVENT,
    payload
  }
}
