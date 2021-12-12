import { HttpRequest } from '../http/http-request'

export default interface Controller {
    handle(httpRequest: HttpRequest): Promise<unknown>
}
