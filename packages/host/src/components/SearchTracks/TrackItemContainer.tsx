import { connect } from 'react-redux'
import {
  addTrack
} from '../../playlist/playlistActions'
import IRootState from '../../rootState'
import TrackItem from './TrackItem'

const mapStateToProps = (state: IRootState) => ({
})

const mapDispatchToProps = {
  addTrack,
}

const TrackItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackItem)

export default TrackItemContainer
