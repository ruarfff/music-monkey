import { connect } from 'react-redux'
import IRootState from '../rootState'
import { clearAuthError, signUp } from './authActions'
import SignUp from './SignUp'

const mapStateToProps = (state: IRootState) => ({
  isAuthenticating: state.auth.isAuthenticating,
  authError: state.auth.authError
})

const mapDispatchToProps = {
  clearAuthError,
  signUp
}

const SignUpContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)

export default SignUpContainer
