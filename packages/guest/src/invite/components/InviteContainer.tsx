import { connect } from 'react-redux'
import IRootState from '../../rootState'
import { fetchInvite } from '../inviteActions'
import Invite from './Invite'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  isAuthenticated: state.auth.isAuthenticated,
  authError: state.auth.authError,
  inviteId: state.invite.inviteId,
  inviteEvent: state.invite.event,
  loading: state.invite.loading
})

const mapDispatchToProps = { fetchInvite }

const InviteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Invite)

export default InviteContainer
