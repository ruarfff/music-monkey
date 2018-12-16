import { connect } from 'react-redux'
import { clearAuthError, loginAsGuest } from '../auth/authActions'
import IRootState from '../rootState'
import { fetchInvite } from './inviteActions'
import LoginInvite from './LoginInvite'

const mapStateToProps = (state: IRootState) => ({
  auth: state.auth,
  inviteId: state.invite.inviteId,
  event: state.invite.event
})

const mapDispatchToProps = {
  clearAuthError,
  loginAsGuest,
  fetchInvite
}

const LoginInviteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginInvite)

export default LoginInviteContainer
