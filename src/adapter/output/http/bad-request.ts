import HttpResponse from './http-response'

export default class BadRequest extends HttpResponse {
  constructor (message?: string) {
    super(400, message)
  }
}
