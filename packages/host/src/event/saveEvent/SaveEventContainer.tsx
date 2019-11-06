import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import IRootState from 'rootState'
import SaveEvent from './SaveEvent'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data
})

const mapDispatchToProps = {}

const SaveEventContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SaveEvent)
)

export default SaveEventContainer
