import React from 'react'
import { shallow } from 'enzyme'
import EventInput from './EventInput'

describe('<EventInput />', () => {
  it('should render', () => {
    const dummyOnChange = jest.fn()
    const wrapper = shallow(
      <EventInput label={''} value={''} onChange={dummyOnChange} />
    )

    expect(wrapper).toBeDefined()
  })
})
