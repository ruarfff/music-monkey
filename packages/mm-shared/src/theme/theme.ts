import { createMuiTheme } from '@material-ui/core/styles'
import styles from './theme.module.scss'

export const theme = createMuiTheme({
  spacing: 8,
  overrides: {
    MuiButton: {
      containedPrimary: {
        color: 'white'
      },
      containedSecondary: {
        color: 'white'
      }
    },
    MuiBadge: {
      colorPrimary: {
        color: 'white'
      },
      colorSecondary: {
        color: 'white',
        backgroundColor: styles.secondaryLight
      }
    },
    MuiMenuItem: {
      gutters: {
        padding: '0 16px',
        height: '40px',
        display: 'flex!important',
        alignItems: 'center'
      }
    }
  },
  palette: {
    primary: {
      main: styles.primaryMain
    },
    secondary: {
      light: styles.secondaryLight,
      main: styles.secondaryMain,
      contrastText: styles.mmWhite
    }
  }
})
