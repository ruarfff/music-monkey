import { connect } from 'react-redux'
import IRootState from '../rootState'
import Invite from './Invite'
import { fetchInvite, storeInviteId } from './inviteActions'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  authError: state.auth.authError,
  inviteId: state.invite.inviteId,
  event: state.invite.event,
  loading: state.invite.loading
})

const mapDispatchToProps = { fetchInvite, storeInviteId }

const InviteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Invite)

export default InviteContainer
