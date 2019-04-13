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

  constructor(win: Window, sender: IHttpPost, defaultParams: IAnyStringKeyObject = {}) {
    this.poster = sender
    this.win = win
    this.defaultParam = defaultParams
  }

  send(content: IAnyStringKeyObject): Promise<Boolean> {
    return this.poster.send(content)
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
  appendDefaultParams(appendParam:IAnyStringKeyObject):IAnyStringKeyObject {
    this.defaultParam = Weblog.mergeParam(this.defaultParam, appendParam)
    return this.defaultParam
  }

  _getDefaultParam(): IAnyStringKeyObject {
    return this.defaultParam
  }

  private mergeDefaultParam(param: IAnyStringKeyObject): IAnyStringKeyObject {
    return Weblog.mergeParam(this.defaultParam, param)
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
