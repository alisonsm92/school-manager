export default class ResourceNotFound extends Error {
  constructor (resource = 'Resource') {
    super(`${resource} not found`)
    this.name = 'ResourceNotFound'
  }
}
