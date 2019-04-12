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
