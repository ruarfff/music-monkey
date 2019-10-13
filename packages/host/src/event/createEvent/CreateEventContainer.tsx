import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import IRootState from 'rootState'
import CreateEvent from './CreateEvent'

const mapStateToProps = (state: IRootState) => ({})

const mapDispatchToProps = {}

const CreateEventContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateEvent)
)

export default CreateEventContainer
