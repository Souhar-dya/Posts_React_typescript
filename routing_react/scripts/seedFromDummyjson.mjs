import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dbPath = path.resolve(__dirname, '../src/data/db.json')

const response = await fetch('https://dummyjson.com/products?limit=100')
if (!response.ok) {
  throw new Error(`Failed to fetch DummyJSON products: ${response.status}`)
}

const payload = await response.json()
const products = (payload.products ?? []).map((item) => ({
  id: item.id,
  title: item.title,
  description: item.description,
  price: item.price,
  discountPercentage: item.discountPercentage,
}))

const db = { products }
await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8')

console.log(`Seeded ${products.length} products into ${dbPath}`)
