import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import IRootState from 'rootState'
import { getEvents } from 'event/eventActions'
import CatalogueBrowser from './CatalogueBrowser'

const mapStateToProps = (state: IRootState) => ({
  eventsLoading: state.event.eventsLoading,
  events: state.event.events
})

const mapDispatchToProps = { getEvents }

const CatalogueBrowserContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogueBrowser) as any)

export default CatalogueBrowserContainer
