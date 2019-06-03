import React from 'react'
import { shallow } from 'enzyme'
import MaybeTracks from './MaybeTracks'
import IEvent from '../../event/IEvent'
import IDecoratedSuggestion from '../../suggestion/IDecoratedSuggestion'

it('renders without crashing', () => {
  const suggestions = [] as IDecoratedSuggestion[]
  const selectedEvent = {} as IEvent

  shallow(
    <MaybeTracks suggestions={suggestions} selectedEvent={selectedEvent} />
  )
})
