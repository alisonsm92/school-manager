function formatErrorMessage (error) {
  return `
      ${error.code || error.response?.statusText}
      Request: ${error.config?.method.toUpperCase()} ${error.config?.url} ${error.config?.data}
      Response: ${error.response?.status} ${JSON.stringify(error.response?.data)}
      `
}

export function handleError (error) {
  if (error.isAxiosError) {
    error.message = formatErrorMessage(error)
  }
  throw error
}
