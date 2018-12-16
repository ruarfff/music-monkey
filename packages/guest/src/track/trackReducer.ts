import IAction from '../IAction'
import ITrackState from './ITrackState'
import { TRACK_DESELECTED, TRACK_SELECTED } from './trackActions'
import initialState from './trackInitialState'

export default function track(
  state = initialState,
  { type, payload }: IAction
) {
  switch (type) {
    case TRACK_SELECTED:
      return { ...state, selectedTrack: payload } as ITrackState
    case TRACK_DESELECTED:
      return { ...state, selectedTrack: undefined } as ITrackState
    default:
      return state
  }
}
