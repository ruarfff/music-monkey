import { shallow } from 'enzyme'
import * as React from 'react'
import EventInput from './EventInput'

describe('<EventInput />', () => {
  it('should render', () => {
    const dummyOnChange = jest.fn()
    const wrapper = shallow(
      <EventInput label={''} value={''} onChange={dummyOnChange} />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
