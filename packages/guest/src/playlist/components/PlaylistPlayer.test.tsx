import React from 'react'
import { shallow } from 'enzyme'
import PlaylistPlayer from './PlaylistPlayer'

it('renders without crashing', () => {
  shallow(<PlaylistPlayer />)
})
