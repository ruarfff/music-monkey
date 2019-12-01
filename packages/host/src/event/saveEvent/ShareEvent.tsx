import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IEvent from 'event/IEvent'
import IAction from 'IAction'
import InviteLink from 'components/InviteLink/InviteLink'
import EmailPreview from './EmailPreview'

interface IShareEventProps {
  event: IEvent
  inviteId: string
  message: string
  image: string
  shareByEmails(emails: string[], emailText: string, event: IEvent): void
  onCopyEventInvite(): void
  clearMessage(): IAction
}

const ShareEvent = ({
  inviteId,
  onCopyEventInvite,
  event,
  message,
  image
}: IShareEventProps) => {
  if (!event) {
    return null
  }
  return (
    <>
      <Grid item={true} xs={12}>
        <EmailPreview event={event} emailText={message} image={image} />
      </Grid>
      <Grid item={true} xs={12}>
        <InviteLink inviteId={inviteId} onCopyEventInvite={onCopyEventInvite} />
        <a
          id="fbLink"
          href={
            'https://www.facebook.com/sharer/sharer.php?u=guests.musicmonkey.io/invite/' +
            inviteId +
            '&t="' +
            event.name +
            '"'
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="contained" fullWidth>
            SHARE ON FACEBOOK
          </Button>
        </a>
      </Grid>
    </>
  )
}

export default ShareEvent
