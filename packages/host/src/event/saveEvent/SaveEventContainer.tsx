import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import withSizes, { Sizes } from 'react-sizes'
import IRootState from 'rootState'
import { getEventById } from 'event/eventView/eventViewActions'
import SaveEvent from './SaveEvent'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.event.savingEvent
})

const mapDispatchToProps = { getEventById }

const mapSizesToProps = ({ width, height }: Sizes) => ({
  isDesktop: width > 1024,
  width,
  height
})

const SaveEventContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withSizes<Sizes, any>(mapSizesToProps)(SaveEvent))
)

export default SaveEventContainer