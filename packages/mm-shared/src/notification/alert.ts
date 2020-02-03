import { useSnackbar } from 'notistack'

export const useSnackbarAlert = () => {
  const { enqueueSnackbar } = useSnackbar()

  const showSuccess = (message: string) => {
    enqueueSnackbar(message, { variant: 'default' })
  }

  const showError = (message: string) => {
    enqueueSnackbar(message, { variant: 'error' })
  }

  return { showSuccess, showError }
}
