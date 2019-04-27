import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Dispatch } from 'redux'
import IRootState from '../rootState'
import BottomBar from './BottomBar'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.selectedEvent,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

const BottomBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomBar)

export default withRouter(BottomBarContainer)
