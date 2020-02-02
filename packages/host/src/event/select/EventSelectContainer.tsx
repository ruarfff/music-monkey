import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { selectEvent } from 'event/eventActions'
import IRootState from 'rootState'
import { getRequestsByEventId } from 'requests/requestActions'
import { EventSelect, Action } from 'mm-shared'

const mapStateToProps = (state: IRootState) => ({
  events: state.event.events,
  event: state.event.event
})

const mapDispatchToProps = {
  selectEvent,
  setEventId: (): Action => {
    return {} as Action
  },
  getRequestsByEventId
}

const EventSelectContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventSelect)
)

export default EventSelectContainer
