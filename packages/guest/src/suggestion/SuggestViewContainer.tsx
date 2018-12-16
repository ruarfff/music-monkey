import { connect } from 'react-redux'
import IRootState from '../rootState'
// import { deselectPlaylist } from '../../redux/actions/playlistActions'
// import {
//   fetchPlaylists,
//   onPlaylistSelected
// } from '../../redux/actions/playlistActions'
import { getSuggestions } from '../suggestion/suggestionActions'
// import { showSpinner } from '../../redux/actions/activeActions'
// import { deselectTrack, selectTrack } from '../../redux/actions/trackActions'
import SuggestView from './SuggestView'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.selectedEvent,
  suggestions: state.suggestion.suggestions
})

const mapDispatchToProps = {
  getSuggestions
  // showSpinner
}

const SuggestViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SuggestView as any)

export default SuggestViewContainer
