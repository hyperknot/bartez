import { makeObservable, observable } from 'mobx'

export class Token {
  @observable contractAddress
  @observable tokenId
  @observable name
  @observable balance

  constructor() {
    makeObservable(this)
  }
}

export const tokens = observable.array()
