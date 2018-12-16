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
        backgroundColor: styles.secondaryLight,
      },
      colorSecondary: {
        color: 'white',
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
