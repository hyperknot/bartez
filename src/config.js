import { NetworkType } from '@airgap/beacon-sdk'
import { BeaconWallet } from '@taquito/beacon-wallet'
import { TezosToolkit } from '@taquito/taquito'

const usingTestnet = false
export const ipfsGateway = 'https://ipfs.io/ipfs/'
// export const ipfsGateway = 'https://cloudflare-ipfs.com/ipfs/'

export const simulateAddress = null
// export const simulateAddress = 'tz1MPv764SZYPNAnCKvHdLEhjHUK5cMxBqU2'

export let rpcUrl, networkType, bcdNetworkStr

if (usingTestnet) {
  rpcUrl = 'https://rpc.hangzhounet.teztnets.xyz'
  networkType = NetworkType.HANGZHOUNET
  bcdNetworkStr = 'hangzhounet'
} else {
  rpcUrl = 'https://mainnet.api.tez.ie'
  networkType = NetworkType.MAINNET
  bcdNetworkStr = 'mainnet'
}

export const Tezos = new TezosToolkit(rpcUrl)
export const wallet = new BeaconWallet({ name: 'Bartez' })
Tezos.setWalletProvider(wallet)
