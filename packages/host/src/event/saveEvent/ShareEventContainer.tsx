import { connect } from 'react-redux'
import IRootState from 'rootState'
import { shareByEmails } from 'event/shareEvent/shareActions'
import ShareEvent from './ShareEvent'

const mapStateToProps = (state: IRootState) => ({})

const mapDispatchToProps = { shareByEmails }

const ShareEventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareEvent)

export default ShareEventContainer
