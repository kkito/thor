import { TimeConsume } from './time_consume'
import { Utils } from './utils';
export interface IHttpPost {
  send(content: any): Promise<Boolean>
}

export interface IAnyStringKeyObject {
  [key: string]: any
}

export class Weblog {
  protected poster: IHttpPost
  protected win: Window
  protected defaultParam: IAnyStringKeyObject
  protected cacheSendContents: IAnyStringKeyObject[] = []
  protected debounceTimer: any = null
  readonly guvKey = 'G_UV'

  constructor(
    win: Window,
    sender: IHttpPost,
    appName: string,
    defaultParams: IAnyStringKeyObject = {}
  ) {
    this.poster = sender
    this.win = win
    this.defaultParam = defaultParams
    this.appendDefaultParam('G_app_name', appName)
    this.appendDefaultParam('G_ua', win.navigator.userAgent)
  }

  event(eventName: string, eventParams: IAnyStringKeyObject = {}): void {
    this.eventImmediately(eventName, eventParams, false)
  }

  /**
   * 马上发布
   * @param eventName 事件名称
   * @param eventParams 事件参数
   */
  eventImmediately(eventName: string, eventParams: IAnyStringKeyObject = {}, immediately = true): void {
    eventParams['G_event'] = eventName
    this.send(eventParams, immediately)
  }

  /**
   * 详细的事件体系: event , eventId, eventStep
   * @param eventName 事件名称
   * @param eventId 时间ID
   * @param eventStep 时间步骤
   * @param immediately 是否立即发送
   */
  detailEvent(eventName:string , eventId?:string|number , eventStep?:string , immediately = false): void {
    const eventParams:any = {}
    if (eventId) {
      eventParams['G_event_id'] = eventId
    }
    if(eventStep) {
      eventParams['G_event_step'] = eventStep
    }
    this.eventImmediately(eventName, eventParams, immediately)
  }

  logError(error: Error, errorParams: IAnyStringKeyObject = {}): void {
    errorParams['G_event'] = 'Error'
    errorParams['message'] = error.message
    errorParams['stack'] = error.stack
    this.send(errorParams)
  }

  send(content: IAnyStringKeyObject, immediately = false): Promise<Boolean> {
    const sendContent = this.mergeDefaultParam(content)
    this.cacheSendContents.push(sendContent)
    if (immediately) {
      return this.poster.send(this.cacheSendContents)
    } else {
      this.debounceSend()
      return new Promise(resolve => {
        resolve(true)
      })
    }
  }

  /**
   * start a time consuming, usage
   * cosnt start = logger.startTimeCost({'url':'xxxx'})
   * // ...... request.then
   * // start.finish()
   *
   * @param params any object
   */
  startTimeCost(params: IAnyStringKeyObject = {}, timeout=5000): TimeConsume {
    return new TimeConsume(this, params, timeout)
  }

  /**
   * 延迟 300ms在发送, 期间holding住所有的数据
   */
  debounceSend() {
    if (!this.debounceTimer) {
      this.debounceTimer = setTimeout(() => {
        // TODO 发送出错如何处理
        if (this.cacheSendContents.length > 0) {
          this.poster.send(this.cacheSendContents)
          this.cacheSendContents = []
          this.debounceTimer = null
        }
      }, 300)
    }
  }

  clearDebounce() {
    if(this.debounceTimer) {
      clearTimeout(this.debounceTimer)
      this.debounceTimer = null
    }
  }

  /**
   * 给默认param增加新的一个key
   * @param key 新增加的key
   * @param value 新增加的value
   */
  appendDefaultParam(key: string, value: any): IAnyStringKeyObject {
    this.defaultParam[key] = value
    return this.defaultParam
  }

  /**
   * delete key from default params
   * @param key to delete key
   */
  removeDefaultParam(key: string): IAnyStringKeyObject {
    delete this.defaultParam[key]
    return this.defaultParam
  }

  /**
   * 增加一堆默认参数
   * @param appendParam
   */
  appendDefaultParams(appendParam: IAnyStringKeyObject): IAnyStringKeyObject {
    this.defaultParam = Weblog.mergeParam(this.defaultParam, appendParam)
    return this.defaultParam
  }

  public getGUV (): string {
    this.setUniqueKey()
    return this.defaultParam[this.guvKey]
  }

  _getDefaultParam(): IAnyStringKeyObject {
    return this.defaultParam
  }

  private mergeDefaultParam(param: IAnyStringKeyObject): IAnyStringKeyObject {
    this.setUniqueKey()
    const reuslt = Weblog.mergeParam(this.defaultParam, param)
    // 动态拼上一些数据
    reuslt['G_location_url'] = this.win.location.href
    reuslt['G_trigger_time'] = new Date().toISOString()
    return reuslt
  }

  private setUniqueKey():boolean {
    try {
      const key = this.guvKey
      if (this.defaultParam[key]) {
        return false
      } else {
        let storageValue = this.win.localStorage.getItem(key)
        if (!storageValue) {
          storageValue = Utils.buildUUID()
          this.win.localStorage.setItem(key, storageValue)
        }
        this.defaultParam[key] = storageValue
        return true
      }
    } catch (e) {
      return false
    }

  }

  static mergeParam(
    defaultParam: IAnyStringKeyObject,
    newParam: IAnyStringKeyObject
  ): IAnyStringKeyObject {
    const result: IAnyStringKeyObject = {}
    Object.keys(defaultParam).forEach(k => {
      result[k] = defaultParam[k]
    })
    Object.keys(newParam).forEach(k => {
      result[k] = newParam[k]
    })
    return result
  }
}
