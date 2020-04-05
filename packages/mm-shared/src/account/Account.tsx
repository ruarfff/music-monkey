import React, { FC, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import emailIcon from '../assets/email-icon.svg'
import facebookIcon from '../assets/facebook.svg'
import instagramIcon from '../assets/instagram-icom.svg'
import phoneIcon from '../assets/phone-icon.svg'
import twitterIcon from '../assets/twitter.svg'
import twitchIcon from '../assets/twitch.svg'
import { Action } from 'mm-shared'
import { User } from 'mm-shared'
import EventInput from './CustomInput'
import EditAvatar from './EditAvatar'
import './Account.scss'

interface AccountDetailsProps {
  user: User
  updateUserRequest(user: User): Action
}

const AccountDetails: FC<AccountDetailsProps> = ({
  user,
  updateUserRequest
}) => {
  const [editing, setEditing] = useState(false)
  const [showAvatarEditor, setShowAvatarEditor] = useState(false)
  const [userForm, setUserForm] = useState(user)

  const toggleAvatarEdit = () => {
    setShowAvatarEditor(!showAvatarEditor)
  }

  return (
    <>
      {showAvatarEditor && (
        <EditAvatar toggleEditAvatarModal={toggleAvatarEdit} url={user.image} />
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
              onClick={toggleAvatarEdit}
              className="Account-avatar-img"
              src={user.image}
            />
          ) : (
            <Avatar onClick={toggleAvatarEdit} className="Account-avatar-img">
              <AccountCircle className={'Account-avatar-img'} />
            </Avatar>
          )}
          <Typography className={'Account-name'}>{user.displayName}</Typography>
        </Grid>
      </Grid>

      <Grid item={true} md={12} container={true} direction={'column'}>
        <Typography align={'center'} className={'Account-title'} variant={'h6'}>
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
              {!editing ? (
                user.email
              ) : (
                <EventInput
                  value={userForm.email}
                  onChange={(email) => {
                    setUserForm({ ...userForm, email })
                  }}
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
              {!editing ? (
                userForm.phone
              ) : (
                <EventInput
                  value={userForm.phone}
                  onChange={(phone) => {
                    setUserForm({ ...userForm, phone })
                  }}
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
            <Grid className="Account-input">
              {!editing ? (
                userForm.instagramId
              ) : (
                <EventInput
                  value={userForm.instagramId}
                  onChange={(instagramId) => {
                    setUserForm({ ...userForm, instagramId })
                  }}
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
              {!editing ? (
                user.facebookId
              ) : (
                <EventInput
                  value={userForm.facebookId}
                  onChange={(facebookId) => {
                    setUserForm({ ...userForm, facebookId })
                  }}
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
              {!editing ? (
                userForm.twitterId
              ) : (
                <EventInput
                  value={userForm.twitterId}
                  onChange={(twitterId) => {
                    setUserForm({ ...userForm, twitterId })
                  }}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item={true}
          container={true}
          direction="row"
          alignItems="center"
          className="Account-item-row"
        >
          <Grid className="Account-item">
            <Grid className="Account-icon-wrapper">
              <img src={twitchIcon} alt="twitch" />
            </Grid>
            <Grid className="Account-input">
              {!editing ? (
                user.twitchId
              ) : (
                <EventInput
                  value={userForm.twitchId}
                  onChange={(twitchId) => {
                    setUserForm({ ...userForm, twitchId })
                  }}
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
          {!editing ? (
            <Button
              variant="contained"
              color="secondary"
              className={'Account-edit-button'}
              onClick={() => {
                setEditing(true)
              }}
            >
              EDIT CONTACT DETAILS
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              className={'Account-edit-button'}
              onClick={() => {
                updateUserRequest(userForm)
                setEditing(false)
              }}
            >
              SAVE
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default AccountDetails
