import { connect } from 'react-redux'
import IRootState from 'rootState'
import { getEvents } from 'event/eventActions'
import Content from './Content'

const mapStateToProps = ({ event }: IRootState) => ({
  events: event.events,
  eventsLoading: event.eventsLoading
})

const mapDispatchToProps = { getEvents }

const ContentContainer = connect(mapStateToProps, mapDispatchToProps)(Content)

export default ContentContainer
