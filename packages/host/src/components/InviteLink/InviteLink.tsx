import Button from '@material-ui/core/Button'
import { isEmpty } from 'lodash'
import * as React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

interface IInviteLinkProps {
  inviteId: string
  togglePopup?(e: any): void
  onCopyEventInvite(): void
}

const InviteLink = (props: IInviteLinkProps) => {
  const { inviteId, togglePopup } = props
  if (isEmpty(inviteId)) {
    return <span />
  }
  const inviteLink = 'https://guests.musicmonkey.io/invite/' + inviteId

  return (
    <CopyToClipboard text={inviteLink} onCopy={props.onCopyEventInvite}>
      <Button
        id="invite-link"
        value={inviteLink}
        color={'primary'}
        variant={'contained'}
        onClick={togglePopup}
        fullWidth={true}
      >
        Copy Link
      </Button>
    </CopyToClipboard>
  )
}

export default InviteLink
