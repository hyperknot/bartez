import { sum } from 'lodash'
import { action, computed, flow, makeObservable, observable } from 'mobx'
import { bcdNetworkStr, contractNames } from '../config'
import { getCachedURL, sleep } from '../utils'
import { Token } from './token'
import { userStore } from './userStore'

class ContractStore {
  contracts = observable.map()
  @observable loading = false
  @observable largeWallet = true

  constructor() {
    makeObservable(this)
  }

  @computed
  get totalTokens() {
    return sum(Array.from(this.contracts.values()).map((c) => c.tokens.length))
  }

  async loadBalances() {
    try {
      this.setLoading(true)
      let res = await getCachedURL(
        userStore.bcdAccountUrl + '/token_balances?size=50&offset=0&hide_empty=true',
        3600
      )
      this.loadFromBCD(res)
      await this.fillContractNames()

      console.log(`total: ${res.total}`)

      if (res.total <= 100) {
        this.setLargeWallet(false)
      }

      if (res.total > 50) {
        for (let offset = 50; offset <= res.total; offset += 50) {
          res = await getCachedURL(
            userStore.bcdAccountUrl + `/token_balances?size=50&offset=${offset}&hide_empty=true`,
            3600,
            3
          )
          this.loadFromBCD(res)
          console.log(offset)
        }
      }

      await this.fillContractNames()
      this.setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  @action
  loadFromBCD(data) {
    for (const tokenData of data.balances) {
      if (!this.contracts.has(tokenData.contract)) {
        const contract = new Contract()
        contract.address = tokenData.contract
        this.setContract(tokenData.contract, contract)
      }

      const token = new Token()
      token.contractAddress = tokenData.contract
      token.tokenId = tokenData.token_id
      token.name = tokenData.name
      token.balance = parseInt(tokenData.balance, 10)

      // if (token.tokenId === 566629) {
      // console.log(tokenData)
      // }

      const useDisplayUri = ['KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton'].includes(token.contractAddress)
      const imageKey = useDisplayUri ? 'display_uri' : 'thumbnail_uri'

      if (tokenData[imageKey]) {
        token.imageIpfs = tokenData[imageKey].slice(7)
      }

      // get from IPFS metadata
      // if (!token.name || !token.imageIpfs) {
      //   const tokenMeta = await getTokenMetadata({
      //     contract: token.contractAddress,
      //     tokenId: token.tokenId,
      //   })
      //
      //   console.log(tokenMeta)
      //
      //   if (tokenMeta.displayUri !== tokenData.display_uri) {
      //     console.log('displayUri', token.tokenId)
      //     console.log(tokenMeta.displayUri, tokenData.display_uri)
      //   }
      //
      //   if (tokenMeta.name !== tokenData.name) {
      //     console.log('name', token.tokenId)
      //     console.log(tokenMeta.name, tokenData.name)
      //   }
      // }

      this.contracts.get(tokenData.contract).addToken(token)
    }
  }

  @flow
  *fillContractNames() {
    for (const contract of this.contracts.values()) {
      if (contract.name) {
        continue
      }

      // prefer nice name
      if (contractNames[contract.address]) {
        contract.setName(contractNames[contract.address])
      }
      // over bcd
      else {
        const res = yield getCachedURL(
          `https://api.better-call.dev/v1/contract/${bcdNetworkStr}/${contract.address}`
        )
        contract.setName(res.alias)
      }

      // tzstats would need CORS whitelisting
      // const res = await getCachedURL(
      //   `https://api.tzstats.com/explorer/contract/${contract.address}?meta=1`
      // )
      // contract.setName(res.metadata[contract.address].alias.name)
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

  @action
  setLargeWallet(value) {
    this.largeWallet = value
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

  @action
  addToken(token) {
    this.tokens.push(token)
  }

  @computed
  get nameOrAddress() {
    return this.name || this.address
  }
}

export const contractStore = new ContractStore()

window.contractStore = contractStore
