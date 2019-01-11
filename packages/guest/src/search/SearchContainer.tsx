import { connect } from 'react-redux'
import IRootState from '../rootState'
import { clearSearch, searchTracks } from './searchActions'
import { selectTrack } from '../track/trackActions'
import Search from './Search'

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
