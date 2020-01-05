import React from 'react'
import Button from '@material-ui/core/Button'
import { Link, LinkProps } from 'react-router-dom'
import logo from '../../assets/marvin.png'
import { withRouter, RouteComponentProps } from 'react-router'
import './FinderButton.scss'

const Title = ({ location }: RouteComponentProps) => {
  const ButtonLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
    (props, ref) => <Link innerRef={ref} {...props} />
  )

  return (
    <Button
      component={ButtonLink}
      to="/finder"
      variant="contained"
      size="small"
      color="secondary"
      className="FinderButton"
    >
      <img src={logo} alt="event icon" />
      Find Music
    </Button>
  )
}

export default withRouter(Title)
