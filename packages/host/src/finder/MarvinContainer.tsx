import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import IRootState from 'rootState'
import Marvin from './Marvin'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.event.event
})

const mapDispatchToProps = {}

const MarvinContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Marvin)
)

export default MarvinContainer
