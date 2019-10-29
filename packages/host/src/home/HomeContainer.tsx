import { connect } from 'react-redux'
import IRootState from 'rootState'
import { getEvents } from 'event/eventActions'
import Home from './Home'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  events: state.event.events,
  eventsLoading: state.event.eventsLoading
})

const mapDispatchToProps = {
  getEvents
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeContainer
