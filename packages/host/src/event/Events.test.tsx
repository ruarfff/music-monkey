import React from 'react'
import { shallow } from 'enzyme'
import IAction from '../IAction'
import IUserState from '../user/IUserState'
import Events from './Events'
import IEventState from './IEventState'

describe('<Events />', () => {
  it('should render without crashing', () => {
    const events = {} as IEventState
    const user = {} as IUserState
    const getEvents = () => ({} as IAction)
    const wrapper = shallow(
      <Events events={events} user={user} getEvents={getEvents} />
    )

    expect(wrapper).toBeTruthy()
  })
})
