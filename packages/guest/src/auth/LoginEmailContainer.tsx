import { connect } from 'react-redux'
import IRootState from '../rootState'
import { clearAuthError, loginWithPassword } from './authActions'
import LoginEmail from './LoginEmail'

const mapStateToProps = (state: IRootState) => ({
  isAuthenticating: state.auth.isAuthenticating,
  authError: state.auth.authError
})

const mapDispatchToProps = {
  clearAuthError,
  loginWithPassword
}

const LoginEmailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginEmail)

export default LoginEmailContainer
