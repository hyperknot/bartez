import { action, makeObservable, observable } from 'mobx'
import { getCached, getTokenMetadata } from '../utils'
import { userStore } from './userStore'

class ContractStore {
  contracts = observable.map()
  @observable loading = false

  constructor() {
    makeObservable(this)
  }

  async loadBalances() {
    try {
      this.setLoading(true)
      const res = await getCached(
        userStore.bcdAccountUrl + '/token_balances?size=50&offset=0&hide_empty=true'
      )
      this.loadFromBCD(res)
      this.setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  async loadFromBCD(data) {
    for (const tokenData of data.balances) {
      if (!this.contracts.has(tokenData.contract)) {
        const contract = new Contract()
        contract.address = tokenData.contract
        contract.name = contract.address
        this.setContract(tokenData.contract, contract)
      }

      const token = new Token()
      token.contractAddress = tokenData.contract
      token.tokenId = tokenData.token_id
      token.name = tokenData.name
      token.balance = parseInt(tokenData.balance, 10)

      const tokenMeta = await getTokenMetadata({
        contract: token.contractAddress,
        tokenId: token.tokenId,
      })
      if (tokenMeta.displayUri) {
        token.imageIpfs = tokenMeta.displayUri.slice(7)
      }
      if (tokenMeta.name) {
        token.name = tokenMeta.name
      }
      this.contracts.get(tokenData.contract).tokens.push(token)
    }

    for (const contract of this.contracts.values()) {
      // const res = await getCachedUrlAwait(
      //   `https://api.better-call.dev/v1/contract/${bcdNetworkStr}/${contract.address}`
      // )
      const res = await getCached(
        `https://api.tzstats.com/explorer/contract/${contract.address}?meta=1`
      )
      contract.setName(res.metadata[contract.address].alias.name)
    }
  }

  @action
  setLoading(value) {
    this.loading = value
  }

  @action
  setContract(address, contract) {
    this.contracts.set(address, contract)
  }
}

class Contract {
  @observable address
  @observable tokens = []
  @observable name

  constructor() {
    makeObservable(this)
  }

  @action
  setName(value) {
    if (!value) return
    this.name = value
  }
}

class Token {
  @observable contractAddress
  @observable tokenId
  @observable name
  @observable balance
  @observable imageIpfs

  constructor() {
    makeObservable(this)
  }
}

export const contractStore = new ContractStore()

window.contractStore = contractStore
