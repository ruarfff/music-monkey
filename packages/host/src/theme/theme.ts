import { PaletteOptions } from '@material-ui/core/es/styles/createPalette'
import { createMuiTheme } from '@material-ui/core/styles'
import styles from './theme.module.scss'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        color: 'white',
      },
      containedSecondary: {
        color: 'white',
      }
    },
    MuiBadge: {
      colorPrimary: {
        color: 'white',
      },
      colorSecondary: {
        color: 'white',
        backgroundColor: styles.secondaryLight,
      },
    },
    MuiMenuItem: {
      gutters: {
        padding: '0 16px',
        height: '40px',
        display: 'flex!important',
        alignItems: 'center',
      },
    },
  },
  palette: {
    primary: {
      main: styles.primaryMain
    },
    secondary: {
      light: styles.secondaryLight,
      main: styles.secondaryMain
    }
  } as PaletteOptions
})

export default theme
