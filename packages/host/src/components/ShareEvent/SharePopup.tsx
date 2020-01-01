import Button from '@material-ui/core/Button'
import * as React from 'react'
import { Action } from 'mm-shared'
import IEvent from 'event/IEvent'
import ShareEventByEmail from './ShareEventByEmailContainer'
import './SharePopup.scss'

interface ISharePopupProps {
  message: string
  inviteId: string
  event: IEvent
  onCopyEventInvite(): void
  clearMessage(): Action
}

class SharePopup extends React.PureComponent<ISharePopupProps> {
  public state = {
    showPopup: false
  }

  public render() {
    const {
      inviteId,
      event,
      onCopyEventInvite,
      clearMessage,
      message
    } = this.props
    const { showPopup } = this.state
    return (
      <React.Fragment>
        <Button
          onClick={this.togglePopup}
          color="secondary"
          variant="contained"
        >
          SHARE EVENT
        </Button>
        {showPopup && (
          <div className="SharePopupWrapper" onClick={this.closePopup}>
            <div className="SharePopupContainer">
              <ShareEventByEmail
                message={message}
                clearMessage={clearMessage}
                event={event}
                togglePopup={this.togglePopup}
                inviteId={inviteId}
                onCopyEventInvite={onCopyEventInvite}
              />
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }

  private togglePopup = () => {
    this.setState({ showPopup: !this.state.showPopup })
  }

  private closePopup = (e: any) => {
    if (e.target.classList.contains('SharePopupWrapper')) {
      this.setState({ showPopup: false })
    }
  }
}

export default SharePopup
