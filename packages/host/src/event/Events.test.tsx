import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import IAction from 'IAction'
import IUserState from 'user/IUserState'
import Events from './Events'
import IEventState from './IEventState'

describe('<Events />', () => {
  it('should render without crashing', () => {
    const events = {} as IEventState
    const user = {} as IUserState
    const getEvents = () => ({} as IAction)
    const wrapper = render(
      <Events events={events} user={user} getEvents={getEvents} />,
      { wrapper: MemoryRouter }
    )

    expect(wrapper).toBeTruthy()
  })
})
