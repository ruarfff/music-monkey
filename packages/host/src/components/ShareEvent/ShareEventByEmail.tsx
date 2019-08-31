import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'
import * as React from 'react'
import IEvent from '../../event/IEvent'
import EventInput from '../EventInput/EventInput'
import InviteLink from '../InviteLink/InviteLink'
import EmailPreview from './EmailPreview'
import './SharePopup.scss'

interface IShareEventByEmailProps {
  event: IEvent
  inviteId: string
  withPreview?: boolean
  shareByEmails(emails: string[], emailText: string, event: IEvent): void
  togglePopup?(): void
  onCopyEventInvite(): void
}

export default class ShareEventByEmail extends React.PureComponent<
  IShareEventByEmailProps
> {
  public state = {
    emails: '',
    emailText: 'You are invited to a party!',
    validation: false,
    showMessage: false
  }

  public renderPopupLayout = () => {
    const { togglePopup, inviteId, onCopyEventInvite } = this.props
    const { emails, emailText, validation, showMessage } = this.state

    return (
      <div className="emailShareWrapper">
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={showMessage}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id"></span>}
          action={
            <IconButton key="close" aria-label="Close" color="inherit">
              <CloseIcon />
            </IconButton>
          }
        />
        <EventInput
          value={emails}
          maxRows={4}
          label={'Email Input'}
          placeholder={'some_email@gmail.com, example@gmail.com'}
          onChange={this.handleEmailChange('emails')}
        />
        <EventInput
          value={emailText}
          maxRows={4}
          label={'Email text'}
          onChange={this.handleEmailTextChange}
        />
        <Button
          variant={'contained'}
          color={'secondary'}
          disabled={!validation}
          fullWidth={true}
          onClick={this.handleSubmit}
        >
          SEND INVITE
        </Button>
        <InviteLink
          togglePopup={togglePopup}
          inviteId={inviteId}
          onCopyEventInvite={onCopyEventInvite}
        />
        <a
          id="fbLink"
          href={
            'https://www.facebook.com/sharer/sharer.php?u=guests.musicmonkey.io/invite/' +
            inviteId
          }
          target="_blank"
          rel="noopener noreferrer"
          className="shareFacebookBtn"
        >
          <Button
            onClick={this.props.togglePopup}
            variant="contained"
            fullWidth={true}
          >
            SHARE ON FACEBOOK
          </Button>
        </a>
      </div>
    )
  }

  public renderPreviewLayout = () => {
    const { inviteId, onCopyEventInvite, event } = this.props
    const { emails, emailText, validation, showMessage } = this.state

    return (
      <Grid container={true} spacing={24}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={showMessage}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id"></span>}
          action={
            <IconButton key="close" aria-label="Close" color="inherit">
              <CloseIcon />
            </IconButton>
          }
        />
        <Grid item={true} md={6}>
          Invite Preview
          <EventInput
            value={emailText}
            maxRows={4}
            label={'Email text'}
            onChange={this.handleEmailTextChange}
          />
          <EmailPreview event={event} emailText={emailText} />
        </Grid>

        <Grid item={true} md={6}>
          Send Invite
          <EventInput
            value={emails}
            maxRows={4}
            label={'Email Input'}
            placeholder={'som-_email@gmail.com, example@gmail.com'}
            onChange={this.handleEmailChange('emails')}
          />
          <Button
            variant={'contained'}
            color={'secondary'}
            disabled={!validation}
            fullWidth={true}
            onClick={this.handleSubmit}
          >
            SEND INVITE
          </Button>
          <InviteLink
            inviteId={inviteId}
            onCopyEventInvite={onCopyEventInvite}
          />
          <a
            id="fbLink"
            href={
              'https://www.facebook.com/sharer/sharer.php?u=guests.musicmonkey.io/invite/' +
              inviteId
            }
            target="_blank"
            rel="noopener noreferrer"
            className="shareFacebookBtn"
          >
            <Button
              onClick={this.props.togglePopup}
              variant="contained"
              fullWidth={true}
            >
              SHARE ON FACEBOOK
            </Button>
          </a>
        </Grid>
      </Grid>
    )
  }

  public render() {
    return (
      <React.Fragment>
        {this.props.withPreview
          ? this.renderPreviewLayout()
          : this.renderPopupLayout()}
      </React.Fragment>
    )
  }

  private handleValidation = (emails: string) => {
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    let emailsArr = emails.split(',')
    emailsArr = emailsArr.map(email => email.replace(' ', ''))

    if (emailsArr.length > 1) {
      emailsArr.forEach(email => {
        this.setState({ validation: reg.test(email) })
      })
    } else {
      this.setState({ validation: reg.test(emails) })
    }
  }

  private handleEmailTextChange = (e: any) => {
    this.setState({
      emailText: e
    })
  }

  private handleEmailChange = (key: string) => (content: any) => {
    this.setState({ [key]: content })
    this.handleValidation(content)
  }

  private handleSubmit = () => {
    const { event, togglePopup, shareByEmails } = this.props
    const { emails, emailText } = this.state
    shareByEmails(emails.replace(' ', '').split(','), emailText, event)
    if (!!togglePopup) {
      togglePopup()
    }
  }
}
