import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { fetchUsersEvents } from '../event/eventActions'
import { loadInviteId } from '../invite/inviteActions'
import IRootState from '../rootState'
import MainLayout from './MainLayout'

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  inviteId: state.invite.inviteId,
  inviteEvent: state.invite.event,
  events: state.event.events,
  inviteLoading: state.invite.loading
})

const mapDispatchToProps = {
  fetchUsersEvents,
  loadInviteId
}

const MainLayoutContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainLayout)
)

export default MainLayoutContainer
