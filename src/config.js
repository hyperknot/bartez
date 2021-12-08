import { NetworkType } from '@airgap/beacon-sdk'
import { BeaconWallet } from '@taquito/beacon-wallet'
import { TezosToolkit } from '@taquito/taquito'

const usingTestnet = false

export let rpcUrl, networkType, networkBcd

if (usingTestnet) {
  rpcUrl = 'https://rpc.hangzhounet.teztnets.xyz'
  networkType = NetworkType.HANGZHOUNET
  networkBcd = 'hangzhounet'
} else {
  rpcUrl = 'https://mainnet.api.tez.ie'
  networkType = NetworkType.MAINNET
  networkBcd = 'mainnet'
}

export const Tezos = new TezosToolkit(rpcUrl)
export const wallet = new BeaconWallet({ name: 'Bartez' })
Tezos.setWalletProvider(wallet)
