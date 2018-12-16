import IAuthState from './IAuthState'

export default {
  authError: undefined,
  isAuthenticated: false,
  isAuthenticating: false,
  loginEmail: '',
  loginPassword: '',
  loginShowPassword: false,
  firstAuthenticated: true
} as IAuthState
