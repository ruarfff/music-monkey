import { connect } from 'react-redux'
import {
  selectEvent,
  selectPage,
  selectPlaylist
} from '../../navigation/activeActions'
import IRootState from '../../rootState'
import EventListView from './EventListView'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  events: state.event.events,
  eventsLoading: state.event.eventsLoading,
  event: state.event.selectedEvent,
  selectedEvent: state.event.selectedEvent
})

const mapDispatchToProps = {
  selectPage,
  selectEvent,
  selectPlaylist
}

const EventListViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventListView)

export default EventListViewContainer
