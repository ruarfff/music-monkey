import React from 'react'
import IEvent from 'event/IEvent'
import ShareEventByEmail from './ShareEventByEmailContainer'
import IAction from 'IAction'

interface SummaryProps {
  status: string
  event: IEvent
}

const Summary = ({ status, event }: SummaryProps) => {
  if (status === 'failure') {
    return <div>Oh shit</div>
  }

  return (
    <div>
      <ShareEventByEmail
        clearMessage={() => {
          console.log('Clear Message')
          return {} as IAction
        }}
        message="test message"
        withPreview={true}
        event={event}
        inviteId={event && event.invites ? event.invites[0] : ''}
        onCopyEventInvite={() => {
          console.log('event invite')
        }}
      />
    </div>
  )
}

export default Summary
