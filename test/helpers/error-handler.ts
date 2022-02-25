import { AxiosError } from 'axios'

function formatErrorMessage (error: AxiosError) {
  return `
      ${error.code || error.response?.statusText}
      Request: ${error.config?.method?.toUpperCase()} ${error.config?.url} ${error.config?.data}
      Response: ${error.response?.status} ${JSON.stringify(error.response?.data)}
      `
}

export function handleError (error: Error) {
  if ('isAxiosError' in error) {
    error.message = formatErrorMessage(error as AxiosError)
  }
}
