import { connect } from 'react-redux'
import IRootState from '../rootState'
import { selectTrack } from '../track/trackActions'
import Search from './Search'
import { clearSearch, searchTracks } from './searchActions'

const mapStateToProps = (state: IRootState) => ({
  tracks: state.search.tracks,
  searching: state.search.searching
})

const mapDispatchToProps = {
  searchTracks,
  clearSearch,
  selectTrack
}

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)

export default SearchContainer
