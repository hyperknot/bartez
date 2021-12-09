import { action, makeObservable, observable } from 'mobx'
import axios from 'redaxios'
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
      const res = await axios.get(
        userStore.bcdAccountUrl + '/token_balances?size=50&offset=0&hide_empty=true'
      )
      this.loadFromBCD(res.data)
      this.setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  loadFromBCD(data) {
    for (const tokenData of data.balances) {
      if (!this.contracts.has(tokenData.contract)) {
        const contract = new Contract()
        contract.address = tokenData.contract
        contract.name = contract.address
        this.setContract(tokenData.contract, contract)
      }

      console.log(tokenData)
      const token = new Token()
      token.contractAddress = tokenData.contract
      token.tokenId = tokenData.token_id
      token.name = tokenData.name
      token.balance = parseInt(tokenData.balance, 10)
      if (tokenData.display_uri) {
        token.imageIpfs = tokenData.display_uri.slice(7)
      }
      this.contracts.get(tokenData.contract).tokens.push(token)
    }

    for (const contract of this.contracts.values()) {
      axios
        .get(`https://api.tzstats.com/explorer/contract/${contract.address}?meta=1`)
        .then(function (response) {
          const metadata = response.data.metadata[contract.address]
          if (metadata.alias.name) {
            contract.setName(metadata.alias.name)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
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
