import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'
import * as React from 'react'
import IAction from '../../IAction'
import InviteLink from '../InviteLink/InviteLink'
import ShareEventByEmail from './ShareEventByEmailContainer'
import './SharePopup.scss'

interface ISharePopupProps {
  message: string
  inviteId: string
  onCopyEventInvite(): void
  clearMessage(): IAction
}

class SharePopup extends React.PureComponent<ISharePopupProps> {
  public state = {
    showPopup: false,
    showMessage: this.props.message !== ''
  }

  public componentDidUpdate() {
    this.setState({showMessage: this.props.message !== ''})
  }

  public render() {
    const { inviteId, onCopyEventInvite } = this.props
    const { showPopup, showMessage } = this.state
    return (
      <React.Fragment>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={showMessage}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.message}</span>}
          action={
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          }
        />
        <Button
          onClick={this.togglePopup}
          color='secondary'
          variant='contained'
        >
          SHARE EVENT
        </Button>
        {showPopup &&
          <div className='SharePopupWrapper' onClick={this.closePopup}>
            <div className='SharePopupContainer'>
              <ShareEventByEmail togglePopup={this.togglePopup}/>
              <InviteLink
                togglePopup={this.togglePopup}
                inviteId={inviteId}
                onCopyEventInvite={onCopyEventInvite}
              />
              <a
                id='fbLink'
                href={'https://www.facebook.com/sharer/sharer.php?u=guests.musicmonkey.io/invite/' + inviteId}
                target="_blank"
                className='shareFacebookBtn'
              >
                <Button
                  onClick={this.togglePopup}
                  variant='contained'
                  fullWidth={true}
                >
                  SHARE ON FACEBOOK
                </Button>
              </a>

            </div>
          </div>
        }
      </React.Fragment>
    )
  }

  private handleClose = () => {
    this.props.clearMessage()
  }

  private togglePopup = () => {
    this.setState({showPopup: !this.state.showPopup})
  }

  private closePopup = (e: any) => {
    if (e.target.classList.contains('SharePopupWrapper')) {
      this.setState({showPopup: false})
    }
  }
}

export default SharePopup
