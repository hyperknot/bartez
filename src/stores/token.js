import { action, makeObservable, observable } from 'mobx'

export class Token {
  @observable contractAddress
  @observable tokenId
  @observable name
  @observable balance
  @observable imageIpfs
  @observable showImage = false

  constructor() {
    makeObservable(this)
  }

  @action
  allowImage() {
    this.showImage = true
  }
}
