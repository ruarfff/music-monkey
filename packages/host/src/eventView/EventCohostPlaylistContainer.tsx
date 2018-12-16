import { connect } from 'react-redux'
import IRootState from '../rootState'
import {
  stageSuggestion
} from '../suggestion/suggestionActions'
import EventCohostPlaylist from './EventCohostPlaylist'

const mapStateToProps = (state: IRootState) => ({
  suggestions: state.suggestion.rejectedSuggestions
})

const mapDispatchToProps = {
  stageSuggestion,
}

const EventCohostPlaylistContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventCohostPlaylist)

export default EventCohostPlaylistContainer
