import { connect } from 'react-redux'
import IRootState from 'rootState'
import { shareByEmails } from 'event/shareEvent/shareActions'
import ShareEventByEmail from './ShareEventByEmail'

const mapStateToProps = (state: IRootState) => ({})

const mapDispatchToProps = { shareByEmails }

const EventsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareEventByEmail)

export default EventsContainer
