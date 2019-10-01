import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import EventInput from './EventInput'

describe('<EventInput />', () => {
  it('should render', () => {
    const dummyOnChange = jest.fn()
    const wrapper = render(
      <EventInput label={''} value={''} onChange={dummyOnChange} />,
      { wrapper: MemoryRouter }
    )

    expect(wrapper).toBeDefined()
  })
})
