import HttpResponse from './http-response'

export default class NotFound extends HttpResponse {
  constructor (message?: string) {
    super(404, message)
  }
}
