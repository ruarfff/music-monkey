import React from 'react'
import { Action, LoadingPage } from 'mm-shared'
import './Login.scss'

interface IAuthLoader {
  isAuthenticating: boolean
  login(): Action
}

class AuthLoader extends React.PureComponent<IAuthLoader> {
  public componentDidMount() {
    this.props.login()
  }

  public render() {
    const { isAuthenticating } = this.props
    if (isAuthenticating) {
      return <LoadingPage />
    }

    return this.props.children
  }
}

export default AuthLoader
