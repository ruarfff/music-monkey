import { connect } from 'react-redux'
import IRootState from 'rootState'
import { fetchInvite } from 'invite/inviteActions'
import { fetchOrCreateRsvp } from 'rsvp/rsvpActions'
import Invite from './Invite'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  isAuthenticated: state.auth.isAuthenticated,
  authError: state.auth.authError,
  inviteEvent: state.invite.event,
  loading: state.invite.loading,
  fetchingRsvp: state.rsvp.fetchingRsvp
})

const mapDispatchToProps = { fetchInvite, fetchOrCreateRsvp }

const InviteContainer = connect(mapStateToProps, mapDispatchToProps)(Invite)

export default InviteContainer
