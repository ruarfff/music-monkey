import Button, { ButtonProps } from '@material-ui/core/Button/Button'
import * as React from 'react'
import { Link, LinkProps } from 'react-router-dom'

const LinkButton: React.SFC<ButtonProps & LinkProps> = (props: any) => (
  <Button component={Link} {...props} />
)

export default LinkButton
