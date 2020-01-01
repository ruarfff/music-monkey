import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import isEqual from 'lodash/isEqual'
import omit from 'lodash/omit'
import * as React from 'react'
import emailIcon from '../assets/email-icon.svg'
import facebookIcon from '../assets/facebook.svg'
import instagramIcon from '../assets/instagram-icom.svg'
import phoneIcon from '../assets/phone-icon.svg'
import twitterIcon from '../assets/twitter.svg'
import { Action } from 'mm-shared'
import IUser from '../user/IUser'
import EventInput from './CustomInput'
import EditAvatar from './EditAvatar'
import './Account.scss'

interface IAccountDetailsProps {
  user: IUser
  updateUserRequest(user: IUser): Action
}

class AccountDetails extends React.Component<IAccountDetailsProps> {
  public state = {
    isEdit: false,
    showAvatarEditor: false,
    email: '',
    phone: '',
    facebookId: '',
    twitterId: '',
    instagramId: ''
  }

  public componentDidMount() {
    if (this.props.user) {
      this.setUser()
    }
  }

  public setUser = () => {
    this.setState({
      email: this.props.user.email,
      phone: this.props.user.phone,
      facebookId: this.props.user.facebookId,
      twitterId: this.props.user.twitterId,
      instagramId: this.props.user.instagramId
    })
  }

  public componentWillReceiveProps(newProps: IAccountDetailsProps) {
    if (isEqual(newProps.user, this.props.user)) {
      this.setUser()
    }
  }

  public toggleEditAvatarModal = () => {
    this.setState({ showAvatarEditor: !this.state.showAvatarEditor })
  }

  public render() {
    const { isEdit, showAvatarEditor } = this.state
    const { user } = this.props
    return (
      <React.Fragment>
        {showAvatarEditor && (
          <EditAvatar
            // uploadAvatar={uploadAvatar}
            toggleEditAvatarModal={this.toggleEditAvatarModal}
            url={user.image}
          />
        )}
        <Grid item={true} md={12} container={true}>
          <Grid
            item={true}
            className={'Account-avatar-block'}
            container={true}
            direction={'column'}
            alignItems={'center'}
          >
            {user.image ? (
              <Avatar
                onClick={this.toggleEditAvatarModal}
                className={'Account-avatar-img'}
                src={user.image}
              />
            ) : (
                <Avatar
                  onClick={this.toggleEditAvatarModal}
                  className={'Account-avatar-img'}
                >
                  <AccountCircle className={'Account-avatar-img'} />
                </Avatar>
              )}
            <Typography className={'Account-name'}>
              {user.displayName}
            </Typography>
          </Grid>
        </Grid>

        <Grid item={true} md={12} container={true} direction={'column'}>
          <Typography
            align={'center'}
            className={'Account-title'}
            variant={'h6'}
          >
            Contact Information
          </Typography>
          <Grid
            item={true}
            container={true}
            direction={'row'}
            alignItems={'center'}
            className={'Account-item-row'}
          >
            <Grid className={'Account-item'}>
              <Grid className={'Account-icon-wrapper'}>
                <img alt="email" src={emailIcon} />
              </Grid>
              <Grid className={'Account-input'}>
                {!isEdit ? (
                  user.email
                ) : (
                    <EventInput
                      value={this.state.email}
                      onChange={this.handleEdit('email')}
                    />
                  )}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item={true}
            container={true}
            direction={'row'}
            alignItems={'center'}
            className={'Account-item-row'}
          >
            <Grid className={'Account-item'}>
              <Grid className={'Account-icon-wrapper'}>
                <img alt="phone" src={phoneIcon} />
              </Grid>
              <Grid className={'Account-input'}>
                {!isEdit ? (
                  user.phone
                ) : (
                    <EventInput
                      value={this.state.phone}
                      onChange={this.handleEdit('phone')}
                    />
                  )}
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item={true}
            container={true}
            direction={'row'}
            alignItems={'center'}
            className={'Account-item-row'}
          >
            <Grid className={'Account-item'}>
              <Grid className={'Account-icon-wrapper'}>
                <img src={instagramIcon} alt="" />
              </Grid>
              <Grid className={'Account-input'}>
                {!isEdit ? (
                  user.instagramId
                ) : (
                    <EventInput
                      value={this.state.instagramId}
                      onChange={this.handleEdit('instagramId')}
                    />
                  )}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item={true}
            container={true}
            direction={'row'}
            alignItems={'center'}
            className={'Account-item-row'}
          >
            <Grid className={'Account-item'}>
              <Grid className={'Account-icon-wrapper'}>
                <img src={facebookIcon} alt="" />
              </Grid>
              <Grid className={'Account-input'}>
                {!isEdit ? (
                  user.facebookId
                ) : (
                    <EventInput
                      value={this.state.facebookId}
                      onChange={this.handleEdit('facebookId')}
                    />
                  )}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item={true}
            container={true}
            direction={'row'}
            alignItems={'center'}
            className={'Account-item-row'}
          >
            <Grid className={'Account-item'}>
              <Grid className={'Account-icon-wrapper'}>
                <img src={twitterIcon} alt="" />
              </Grid>
              <Grid className={'Account-input'}>
                {!isEdit ? (
                  user.twitterId
                ) : (
                    <EventInput
                      value={this.state.twitterId}
                      onChange={this.handleEdit('twitterId')}
                    />
                  )}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item={true}
            container={true}
            direction={'row'}
            alignItems={'center'}
            className={'Account-item-row'}
          >
            {!this.state.isEdit ? (
              <Button
                variant="contained"
                color="secondary"
                className={'Account-edit-button'}
                onClick={this.editDetails}
              >
                EDIT CONTACT DETAILS
              </Button>
            ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  className={'Account-edit-button'}
                  onClick={this.editDetails}
                >
                  SAVE
              </Button>
              )}
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }

  private editDetails = () => {
    if (this.state.isEdit) {
      const updatedUser = {
        ...this.props.user,
        ...omit(this.state, ['isEdit', 'showAvatarEditor'])
      }

      this.props.updateUserRequest(updatedUser)
    }

    this.setState({ isEdit: !this.state.isEdit })
  }

  private handleEdit = (key: string) => (content: any) => {
    const accountPart = {}
    accountPart[key] = content
    this.setState({ [key]: content })
  }
}

export default AccountDetails
