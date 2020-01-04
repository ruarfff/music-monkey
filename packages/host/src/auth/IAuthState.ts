export default interface IAuthState {
  authError?: any
  isAuthenticated: boolean
  isAuthenticating: boolean
  loginShowPassword: boolean
  loginEmail: string
  loginPassword: string
  firstAuthenticated: boolean
}
