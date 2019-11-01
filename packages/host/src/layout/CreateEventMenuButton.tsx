import React from 'react'
import Button from '@material-ui/core/Button'
import { Link, LinkProps } from 'react-router-dom'
import logo from 'assets/marvin.png'
import { withRouter, RouteComponentProps } from 'react-router'
import './CreateEventMenuButton.scss'

const Title = ({ location }: RouteComponentProps) => {
  const ButtonLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
    (props, ref) => <Link innerRef={ref} {...props} />
  )
  const path = location.pathname

  if (path === '/' || path.startsWith('/create-event')) {
    return null
  }

  return (
    <Button
      component={ButtonLink}
      to="/create-event"
      variant="contained"
      size="small"
      color="secondary"
      className="CreateEventMenuButton"
    >
      <img src={logo} alt="event icon" />
      Create new event
    </Button>
  )
}

export default withRouter(Title)
