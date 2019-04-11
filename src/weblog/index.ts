export interface IHttpPost {
  post(content: any): Promise<Boolean>
}

export class Weblog {
  protected poster: IHttpPost
  constructor(poster: IHttpPost) {
    this.poster = poster
  }

  send(content: any): Promise<Boolean> {
    return this.poster.post(content)
  }
}
