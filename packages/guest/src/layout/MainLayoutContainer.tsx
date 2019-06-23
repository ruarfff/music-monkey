import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { fetchUsersEvents, getEvent } from '../event/eventActions'
import { getSuggestions } from '../suggestion/suggestionActions'
import { fetchEventVotes } from '../vote/voteActions'
import IRootState from '../rootState'
import MainLayout from './MainLayout'

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  events: state.event.events,
  selectedEvent: state.event.selectedEvent,
  eventLoading: state.event.eventLoading,
  eventsLoading: state.event.eventsLoading,
  eventId: state.event.eventId
})

const mapDispatchToProps = {
  fetchUsersEvents,
  getEvent,
  getSuggestions,
  fetchEventVotes
}

const MainLayoutContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainLayout)
)

export default MainLayoutContainer
