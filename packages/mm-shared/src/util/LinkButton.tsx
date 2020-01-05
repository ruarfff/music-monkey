import React from 'react'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import './LinkButton.scss'

const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(
  (props, ref) => <RouterLink innerRef={ref} {...props} />
)

export const LinkButton = (props: any) => {
  return <Button className="LinkButton-root" component={Link} {...props} />
}
