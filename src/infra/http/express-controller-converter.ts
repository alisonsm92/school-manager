import { Request, Response } from 'express'
import Controller from '../../adapter/input/controllers/controller'

export default class ExpressControllerConverter {
    private readonly controller: Controller;

    constructor (controller: Controller) {
      this.controller = controller
    }

    get handler () {
      const controller = this.controller
      return async function (req: Request, res: Response) {
        try {
          const { params, body, headers } = req
          const response = await controller.handle({ params, body, headers })
          res.json(response)
        } catch (e) {
          if (e instanceof Error) {
            res.status(500)
            res.json({ message: e.message })
            return
          }
          throw e
        }
      }
    }
}
