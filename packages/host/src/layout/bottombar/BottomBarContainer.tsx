import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import IRootState from 'rootState'
import BottomBar from './BottomBar'

const mapStateToProps = (state: IRootState) => ({
  event: state.eventView.event
})

const mapDispatchToProps = {}

const BottomBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomBar)

export default withRouter(BottomBarContainer)
