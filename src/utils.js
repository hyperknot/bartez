import axios from 'redaxios'
import { bcdNetworkStr, ipfsGateway } from './config'
import { getCachedLS, setCachedLS } from './cache'

export async function getCachedURL(url, expirySeconds, waitSeconds) {
  const cached = getCachedLS(url, expirySeconds)
  if (cached) return cached

  if (waitSeconds) {
    await sleep(waitSeconds)
  }

  const res = await axios.get(url)
  setCachedLS(url, res.data)
  return res.data
}

export async function getTokenMetadata({ contract, tokenId }) {
  const url = `https://api.better-call.dev/v1/contract/${bcdNetworkStr}/${contract}/tokens?token_id=${tokenId}`
  const res = await getCachedURL(url)

  try {
    const ipfs = res[0].extras['@@empty'].slice(7)
    return await getIpfsData(ipfs)
  } catch (error) {
    return {}
  }
}

export async function getIpfsData(ipfs) {
  return await getCachedURL(`${ipfsGateway}/${ipfs}`)
}

export async function lookupDomain(address) {
  if (!address) return null

  const key = `tezdomain-${address}`

  const cached = getCachedLS(key, 3600)
  if (cached) return cached

  const params = {
    query: `{reverseRecords(where: {address: {in: [${address}]}}) {items {domain: domain {name}}}}`,
  }

  let domain
  try {
    const res = await axios.post('https://api.tezos.domains/graphql', params)
    domain = res.data.data.reverseRecords.items[0].domain.name
  } catch (e) {
    domain = null
  }

  setCachedLS(key, domain)
  return domain
}

export function sleep(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000))
}
