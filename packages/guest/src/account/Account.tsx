import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'
import { WithStyles } from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import * as _ from 'lodash'
import * as React from 'react'
import emailIcon from '../assets/email-icon.svg'
import facebookIcon from '../assets/facebook.svg'
import instagramIcon from '../assets/instagram-icom.svg'
import phoneIcon from '../assets/phone-icon.svg'
import twitterIcon from '../assets/twitter.svg'
import IAction from '../IAction'
import IUser from '../user/IUser'
import EventInput from './CustomInput'
import EditAvatar from './EditAvatar'

const decorate = withStyles(() => ({
  name: {
    fontSize: '24px',
    fontWight: '500'
  },
  avatarBlock: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  avatarImg: {
    width: '125px',
    height: '125px'
  },
  title: {
    fontSize: '26px',
    lineHeight: '20px'
  },
  description: {
    fontSize: '18px'
  },
  editButton: {
    color: 'white',
    maxWidth: '200px'
  },
  input: {
    width: '300px',
    maxHeight: '40px',
    marginTop: '0!important',
    marginLeft: '10px',
    fontSize: '24px'
  },
  iconWrapper: {
    height: '20px',
    width: '20px'
  },
  itemRow: {
    display: 'flex',
    paddingLeft: '30px',
    height: '60px',
    marginBottom: '0px',
    '&:last-child': {
      paddingLeft: '0',
      justifyContent: 'center'
    }
  },
  item: {
    minWidth: '200px',
    display: 'flex',
    alignItems: 'center'
  }
}))

interface IAccountDetailsProps {
  user: IUser
  updateUserRequest(user: IUser): IAction
}

class AccountDetails extends React.Component<
  IAccountDetailsProps & WithStyles
> {
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
    if (_.isEqual(newProps.user, this.props.user)) {
      this.setUser()
    }
  }

  public toggleEditAvatarModal = () => {
    this.setState({ showAvatarEditor: !this.state.showAvatarEditor })
  }

  public render() {
    const { isEdit, showAvatarEditor } = this.state
    const { user, classes } = this.props
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
            className={classes.avatarBlock}
            container={true}
            direction={'column'}
            alignItems={'center'}
          >
            {user.image ? (
              <Avatar
                onClick={this.toggleEditAvatarModal}
                className={classes.avatarImg}
                src={user.image}
              />
            ) : (
              <Avatar
                onClick={this.toggleEditAvatarModal}
                className={classes.avatarImg}
              >
                <AccountCircle className={classes.avatarImg} />
              </Avatar>
            )}
            <Typography className={classes.name}>{user.displayName}</Typography>
          </Grid>
        </Grid>

        <Grid item={true} md={12} container={true} direction={'column'}>
          <Typography align={'center'} className={classes.title} variant={'h6'}>
            Contact Information
          </Typography>
          <Grid
            item={true}
            container={true}
            direction={'row'}
            alignItems={'center'}
            className={classes.itemRow}
          >
            <Grid className={classes.item}>
              <Grid className={classes.iconWrapper}>
                <img src={emailIcon} />
              </Grid>
              <Grid className={classes.input}>
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
            className={classes.itemRow}
          >
            <Grid className={classes.item}>
              <Grid className={classes.iconWrapper}>
                <img src={phoneIcon} />
              </Grid>
              <Grid className={classes.input}>
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
            className={classes.itemRow}
          >
            <Grid className={classes.item}>
              <Grid className={classes.iconWrapper}>
                <img src={instagramIcon} alt="" />
              </Grid>
              <Grid className={classes.input}>
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
            className={classes.itemRow}
          >
            <Grid className={classes.item}>
              <Grid className={classes.iconWrapper}>
                <img src={facebookIcon} alt="" />
              </Grid>
              <Grid className={classes.input}>
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
            className={classes.itemRow}
          >
            <Grid className={classes.item}>
              <Grid className={classes.iconWrapper}>
                <img src={twitterIcon} alt="" />
              </Grid>
              <Grid className={classes.input}>
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
            className={classes.itemRow}
          >
            {!this.state.isEdit ? (
              <Button
                variant="contained"
                color="secondary"
                className={classes.editButton}
                onClick={this.editDetails}
              >
                EDIT CONTACT DETAILS
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                className={classes.editButton}
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
        ..._.omit(this.state, ['isEdit', 'showAvatarEditor'])
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

export default decorate(AccountDetails)
