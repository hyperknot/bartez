import axios from 'redaxios'

export async function getCachedUrlAwait(url) {
  const key = `cacheurl-${url}`
  const result = localStorage.getItem(key)
  if (result) return JSON.parse(result)

  const res = await axios.get(url)
  localStorage.setItem(key, JSON.stringify(res.data))
  return res.data
}

export function getCachedUrlPromise(url) {
  const key = `cacheurl-${url}`
  const result = localStorage.getItem(key)

  return axios.get(url)
}
