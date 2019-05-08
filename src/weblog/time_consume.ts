import { Weblog, IAnyStringKeyObject } from './index'
export class TimeConsume {
  protected logger: Weblog
  protected startTime: Date
  protected params: IAnyStringKeyObject
  protected timer: any = null

  constructor(logger: Weblog, params: IAnyStringKeyObject = {}, timeout = 5000) {
    this.logger = logger
    this.startTime = new Date()
    this.params = params
    this.timer = setTimeout(() => {
      this._auto_finish()
    }, timeout)
  }

  _auto_finish(): void {
    if (this.timer) {
      const cost = new Date().getTime() - this.startTime.getTime()
      this.params['G_time_consuming'] = cost
      this.params['G_status'] = -1
      this.logger.send({ G_time_cost: this.params })
    }
  }

  finish(status = 200): IAnyStringKeyObject {
    const cost = new Date().getTime() - this.startTime.getTime()
    this.params['G_time_consuming'] = cost
    this.params['G_status'] = status
    this.logger.send({ G_time_cost: this.params })
    if(this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = null
    return this.params
  }
}
