import { Weblog, IAnyStringKeyObject } from './index'
export class TimeConsume {
  protected logger: Weblog
  protected startTime:Date
  protected params:IAnyStringKeyObject


  constructor(logger: Weblog, params:IAnyStringKeyObject = {}) {
    this.logger = logger
    this.startTime = new Date()
    this.params = params
  }

  finish(status=200):IAnyStringKeyObject {
    const cost = new Date().getTime() - this.startTime.getTime()
    this.params['_time_consuming'] = cost
    this.params['_status'] = status
    this.logger.send(this.params)
    return this.params
  }
}
