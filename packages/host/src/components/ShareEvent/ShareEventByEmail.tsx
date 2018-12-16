import Button from '@material-ui/core/Button'
import * as React from 'react'
import EventInput from '../EventInput/EventInput'
import './SharePopup.scss'

interface IShareEventByEmailProps {
  shareByEmails(emails: string[]): void
  togglePopup(): void
}

class ShareEventByEmail extends React.PureComponent<IShareEventByEmailProps> {
  public state = {
    emails: '',
    validation: false
  }

  public render() {
    const { emails, validation } = this.state
    return (
      <div className='emailShareWrapper'>
        <EventInput
          value={emails}
          maxRows={2}
          label={'Email Input'}
          placeholder={'Somemail@gmail.com, example@gmail.com'}
          onChange={this.handleEmailChange('emails')}
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

  private handleEmailChange = (key: string) => (content: any) => {
    this.setState({[key]: content})
    this.handleValidation(content)
  }

  private handleSubmit = () => {
    this.props.shareByEmails(this.state.emails.replace(' ', '').split(','))
    this.props.togglePopup()
  }
}

export default ShareEventByEmail