import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { red } from '@material-ui/core/colors'
import backgroundImage from 'assets/music-monkey.jpg'
import { Event } from 'mm-shared'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      paddingLeft: '5%',
      paddingRight: '5%',
      background: 'rgba(255, 255, 255, 0.5)'
    },
    title: {
      textAlign: 'center'
    },
    media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    },
    avatar: {
      backgroundColor: red[500],
      width: theme.spacing(7),
      height: theme.spacing(7)
    },
    hostText: {
      color: 'black'
    }
  })
)

interface LoginInviteProps {
  event: Event
}

const LoginInvite: FC<LoginInviteProps> = ({ event }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.title}
        title={event.name}
        subheader={event.description}
      />
      <CardMedia
        className={classes.media}
        image={event.imageUrl || backgroundImage}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="div">
          <Grid container>
            <Grid item xs={6}>
              {!!event.hostData && (
                <Avatar
                  className={classes.avatar}
                  key={event.hostData.userId}
                  alt={event.hostData.displayName || 'H'}
                  src={event.hostData.image}
                >
                  {!event.hostData.image ? event.hostData.displayName : null}
                </Avatar>
              )}
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.hostText}>
                {event.hostData.displayName}
              </Typography>
              <Typography className={classes.hostText}>Host</Typography>
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default LoginInvite
