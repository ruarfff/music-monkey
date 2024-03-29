import Typography from '@material-ui/core/Typography/Typography'
import * as React from 'react'
import { Link } from 'react-router-dom'

const LoginError = () => (
  <div>
    <Typography
      variant="h5"
      gutterBottom={true}
      align="center"
      paragraph={true}
    >
      There seems to have been an issue retrieving your account details. Please
      try to <Link to="/login">login again</Link>.
    </Typography>
  </div>
)

export default LoginError
