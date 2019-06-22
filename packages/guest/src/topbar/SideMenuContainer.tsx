import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import IRootState from '../rootState'
import SideMenu from './SideMenu'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  event: state.event.selectedEvent
})

const mapDispatchToProps = {}

const SideMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu)

export default withRouter(SideMenuContainer)
