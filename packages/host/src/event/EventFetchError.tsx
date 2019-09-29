import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import { Link } from 'react-router-dom'

interface IEventFetchErrorProps {
  onTryAgain(): void
}

const EventFetchError: React.FC<IEventFetchErrorProps> = ({ onTryAgain }) => (
  <Card>
    <CardContent>
      <Typography gutterBottom={true} variant="h5" component="h2">
        Could Not Get Event
      </Typography>
      <Typography component="p">
        Sorry! There was an error trying to retrieve this event.
      </Typography>
    </CardContent>
    <CardActions>
      <Link to="/">
        <Button size="small" color="secondary">
          Cancel
        </Button>
      </Link>
      <Button size="small" color="primary" onClick={onTryAgain}>
        Try Again
      </Button>
    </CardActions>
  </Card>
)

export default EventFetchError
