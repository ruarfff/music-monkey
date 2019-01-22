import Button from '@material-ui/core/Button'
import * as React from 'react'
import IEvent from '../../event/IEvent'
import EventInput from '../EventInput/EventInput'
import './SharePopup.scss'

interface IShareEventByEmailProps {
  event: IEvent
  shareByEmails(emails: string[], emailText: string, event: IEvent): void
  togglePopup(): void
}

class ShareEventByEmail extends React.PureComponent<IShareEventByEmailProps> {
  public state = {
    emails: '',
    emailText: 'You are invited to a party!',
    validation: false
  }

  public render() {
    const { emails, validation, emailText } = this.state
    return (
      <div className='emailShareWrapper'>
        <EventInput
          value={emails}
          maxRows={4}
          label={'Email Input'}
          placeholder={'Somemail@gmail.com, example@gmail.com'}
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
          SHARE
        </Button>
      </div>
    )
  }

  private handleValidation = (emails: string) => {
    const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const emailsArr = emails.replace(' ', '').split(',')

    if (emailsArr.length > 1) {
      emailsArr.map(email => {
        this.setState({validation: reg.test(email)})
      })
    } else {
      this.setState({validation: reg.test(emails)})
    }
  }

  private handleEmailTextChange = (e: any) => {
    this.setState({
      emailText: e
    })
  }

  private handleEmailChange = (key: string) => (content: any) => {
    this.setState({[key]: content})
    this.handleValidation(content)
  }

  private handleSubmit = () => {
    const { event } = this.props
    const { emails, emailText } = this.state
    this.props.shareByEmails(emails.replace(' ', '').split(','), emailText, event)
    this.props.togglePopup()
  }
}

export default ShareEventByEmail