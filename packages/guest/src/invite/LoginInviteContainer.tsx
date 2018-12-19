import { connect } from 'react-redux'
import { clearAuthError } from '../auth/authActions'
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
  fetchInvite
}

const LoginInviteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginInvite)

export default LoginInviteContainer
