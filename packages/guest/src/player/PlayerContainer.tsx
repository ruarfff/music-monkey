import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import IRootState from '../rootState'
import Player from './Player'

const mapStateToProps = (state: IRootState) => ({
    track: state.track.selectedTrack
})

const mapDispatchToProps = {
}

const PlayerContainer = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Player)
)

export default PlayerContainer
