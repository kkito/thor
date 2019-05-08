import { Weblog, IHttpPost } from '../../src/weblog'
export const poster = {
  send(content: any): Promise<boolean> {
    return new Promise(resolve => {
      resolve(true)
    })
  }
}

// tslint:disable-next-line:no-unused-expression
const buildPoster = (callback:(data:any)=>void):any => {
  return {
    send(content: any): Promise<boolean> {
    return new Promise(resolve => {
      callback(content)
      resolve(true)
      })
    }
  }

}

class TestStorage implements Storage {
  [name: string]: any;
  length: number = 0;
  clear(): void {
    throw new Error("Method not implemented.");
  }
  key(index: number): string {
    throw new Error("Method not implemented.");
  }
  removeItem(key: string): void {
    throw new Error("Method not implemented.");
  }
  _data = {}

  getItem(k:string) :any {
    return this[k]
  }

  setItem(k:string,v:any):any {
    this[k]=v
    return v
  }
}

export const win: Window = { navigator: { userAgent: '' } , location: {href: ''}, localStorage: new TestStorage() as Storage} as Window
export const logger = new Weblog(win, poster, 'test')

test('init valid', async done => {
  const result = await logger.send({ ok: true })
  expect(result).toBeTruthy()
  done()
})

test('mergeParam', () => {
  const result = Weblog.mergeParam({ a: 1, b: 2 }, { b: 3, c: 3 })
  expect(result['b']).toBe(3)
  expect(result['c']).toBe(3)
  expect(result['a']).toBe(1)
})

test('event', () => {
    const logger = new Weblog(win, poster, 'test')
    logger.event('test')
    logger.event('test', {'dex': 2})
})

test('logError', async (done) => {
    const logger = new Weblog(win, buildPoster((data) => {
      done()
    }), 'test')
    // tslint:disable-next-line:no-empty
    // await logger.logError(new Error('test'))
    await logger.logError(new Error('test'), {'test':'33'})
})

describe('update params', () => {
  test('appendDefaultParam', () => {
    const logger = new Weblog(win, poster, 'test')
    logger.appendDefaultParam('a', 1)
    logger.appendDefaultParams({ b: 1 })
    let result = logger._getDefaultParam()
    expect(result['a']).toBe(1)
    expect(result['b']).toBe(1)

    logger.removeDefaultParam('b')
    result = logger._getDefaultParam()
    expect(result['a']).toBe(1)
    expect(result['b']).toBeUndefined()
  })
})

describe('send with params', () => {
  test('request content with url' , async (done) => {
    let guv:any = null
    const logger = new Weblog(win, buildPoster((data) => {
      data = data[0]
      expect(data['G_ua']).not.toBeUndefined()
      expect(data['G_UV']).not.toBeUndefined()
      if (!guv) {
        guv = data['G_UV']
      } else {
        expect(data['G_UV']).toEqual(guv)
      }
      // console.log(data)
    }), 'test')
    const result = await logger.send({ ok: true }, true)
    await logger.send({ ok: true }, true)
    await logger.send({ ok: true }, true)
    await logger.send({ ok: true }, true)
    done()
  })
})
