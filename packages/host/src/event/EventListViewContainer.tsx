import { connect } from 'react-redux'
import IRootState from 'rootState'
import EventListView from './EventListView'

const mapStateToProps = ({ event }: IRootState) => ({
  events: event.events
})

const mapDispatchToProps = {}

const EventListViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventListView)

export default EventListViewContainer
