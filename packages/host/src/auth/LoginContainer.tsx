import { connect } from 'react-redux'
import IRootState from 'rootState'
import { clearAuthError, login } from './authActions'
import Login from './Login'

const mapStateToProps = (state: IRootState) => ({
  auth: state.auth
})

const mapDispatchToProps = {
  clearAuthError,
  login
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginContainer
