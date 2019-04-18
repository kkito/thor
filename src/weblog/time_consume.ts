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
    this.params['G_time_consuming'] = cost
    this.params['G_status'] = status
    this.logger.send({'G_time_cost': this.params})
    return this.params
  }
}
