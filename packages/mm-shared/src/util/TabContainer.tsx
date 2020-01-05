import React from 'react'
import Typography from '@material-ui/core/Typography/Typography'

const TabContainer = ({ children, dir }: any) => {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  )
}

export default TabContainer
