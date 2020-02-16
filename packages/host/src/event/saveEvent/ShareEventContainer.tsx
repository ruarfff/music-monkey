import { connect } from 'react-redux'
import IRootState from 'rootState'
import ShareEvent from './ShareEvent'

const mapStateToProps = (state: IRootState) => ({})

const mapDispatchToProps = {}

const ShareEventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareEvent)

export default ShareEventContainer
