import { connect } from 'react-redux'
import IRootState from '../rootState'
import RequestView from './RequestView'

const mapStateToProps = (state: IRootState) => ({})

const mapDispatchToProps = {}

const RequestViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestView)

export default RequestViewContainer
