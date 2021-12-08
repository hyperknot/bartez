import { NetworkType } from '@airgap/beacon-sdk'
import { BeaconWallet } from '@taquito/beacon-wallet'
import { TezosToolkit } from '@taquito/taquito'
import React from 'react'

const usingTestnet = false

export let rpcUrl, networkType

if (usingTestnet) {
  rpcUrl = 'https://rpc.hangzhounet.teztnets.xyz'
  networkType = NetworkType.HANGZHOUNET
} else {
  rpcUrl = 'https://mainnet.api.tez.ie'
  networkType = NetworkType.MAINNET
}

export const Tezos = new TezosToolkit(rpcUrl)
export const wallet = new BeaconWallet({ name: 'Bartez' })
Tezos.setWalletProvider(wallet)
