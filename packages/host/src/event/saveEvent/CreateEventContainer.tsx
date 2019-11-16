import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import IRootState from 'rootState'
import CreateEvent from './CreateEvent'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data
})

const mapDispatchToProps = {}

const CreateEventContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateEvent)
)

export default CreateEventContainer
