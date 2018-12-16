import { connect } from 'react-redux'
import IRootState from '../rootState'
import { login } from './authActions'
import AuthLoader from './AuthLoader'

const mapStateToProps = (state: IRootState) => ({
  isAuthenticating: state.auth.isAuthenticating
})

const mapDispatchToProps = {
  login
}

const AuthLoaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoader)

export default AuthLoaderContainer
