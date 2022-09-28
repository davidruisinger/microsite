import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

export function createKey(query: Record<string, string | number | boolean>) {
  return crypto.createHash('md5').update(JSON.stringify(query)).digest('hex')
}

export function setData<T>(key: string, data: T) {
  const CACHE_PATH = path.join(__dirname, `.${key}`)
  try {
    fs.writeFileSync(CACHE_PATH, JSON.stringify(data), 'utf8')
  } catch (e) {
    // Nothing to do here
  }
}

export function getData<T>(key: string): T | null {
  const CACHE_PATH = path.join(__dirname, `.${key}`)

  // Try getting the data from cache
  try {
    const data = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'))
    return data
  } catch (error) {
    return null
  }
}
