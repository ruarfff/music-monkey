import { connect } from 'react-redux'
import IRootState from '../../../rootState'
import { toggleAutoAcceptSuggestions, toggleDynamicVoting, toggleSuggestingPlaylists } from '../../eventViewActions'
import EventDetails from './EventDetails'

const mapStateToProps = (state: IRootState) => ({
  event: state.eventView.event
})

const mapDispatchToProps = { toggleDynamicVoting, toggleAutoAcceptSuggestions, toggleSuggestingPlaylists }

const EventDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetails)

export default EventDetailsContainer
