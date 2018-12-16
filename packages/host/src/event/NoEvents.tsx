import Button from '@material-ui/core/Button/Button'
import Tooltip from '@material-ui/core/Tooltip/Tooltip'
import AddIcon from '@material-ui/icons/Add'
import * as React from 'react'
import { Link } from 'react-router-dom'
import './NoEvent.scss'


const NoEvents: React.SFC = () => (
  <div className="eventsNoEventsMessage">
    <div>
      <h3>
        It looks like you have no upcoming events. Would you like to{' '}
        <Link to="/create-event">Create One</Link>?
      </h3>
    </div>
    <Link to="/create-event">
      <Tooltip id="tooltip-fab" title="Create Event">
        <Button variant="contained" color="secondary" aria-label="Create Event">
          <AddIcon />
        </Button>
      </Tooltip>
    </Link>
  </div>
)


export default NoEvents
