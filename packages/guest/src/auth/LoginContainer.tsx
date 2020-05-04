import { connect } from 'react-redux'
import IRootState from '../rootState'
import { clearAuthError, loginAsGuest } from './authActions'
import Login from './Login'

const mapStateToProps = (state: IRootState) => ({
  authError: state.auth.authError,
  inviteEvent: state.invite.event
})

const mapDispatchToProps = {
  clearAuthError,
  loginAsGuest
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)

export default LoginContainer
