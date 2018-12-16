import Typography from '@material-ui/core/Typography/Typography'
import * as React from 'react'

export const TabContainer = ({ children, dir }: any) => {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  )
}
