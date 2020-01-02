import React from 'react'
import ReactDOM from 'react-dom'
import { Action } from 'mm-shared'
import IUserState from '../user/IUserState'
import User from './User'

describe('User component', () => {
  it('renders without crashing', () => {
    const fetchUser = () => ({} as Action)
    const user = {} as IUserState
    const div = document.createElement('div')
    ReactDOM.render(<User fetchUser={fetchUser} user={user} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
