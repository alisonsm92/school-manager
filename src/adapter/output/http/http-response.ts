export default class HttpResponse {
  status: number
  message: string

  constructor (status: number, message?: string) {
    this.status = status || 500
    this.message = message || 'Internal server error'
  }
}
