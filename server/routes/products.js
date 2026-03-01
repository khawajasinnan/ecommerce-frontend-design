import { Router } from 'express'
import pool from '../db.js'

const router = Router()

/* GET /api/products — list with optional filters */
router.get('/', async (req, res) => {
    try {
        const { category, brand, features, minPrice, maxPrice, rating, condition, search, sort } = req.query

        let query = 'SELECT * FROM products WHERE 1=1'
        const params = []
        let idx = 1

        if (category) {
            query += ` AND category = $${idx++}`
            params.push(category)
        }
        if (brand) {
            const brands = brand.split(',')
            query += ` AND brand = ANY($${idx++})`
            params.push(brands)
        }
        if (features) {
            const feats = features.split(',')
            query += ` AND features @> $${idx++}`
            params.push(feats)
        }
        if (minPrice) {
            query += ` AND price >= $${idx++}`
            params.push(Number(minPrice))
        }
        if (maxPrice) {
            query += ` AND price <= $${idx++}`
            params.push(Number(maxPrice))
        }
        if (rating) {
            query += ` AND rating >= $${idx++}`
            params.push(Number(rating))
        }
        if (condition && condition !== 'Any') {
            query += ` AND condition = $${idx++}`
            params.push(condition)
        }
        if (search) {
            query += ` AND (LOWER(name) LIKE $${idx} OR LOWER(description) LIKE $${idx})`
            params.push(`%${search.toLowerCase()}%`)
            idx++
        }

        // Sort
        switch (sort) {
            case 'lowest': query += ' ORDER BY price ASC'; break
            case 'highest': query += ' ORDER BY price DESC'; break
            case 'rating': query += ' ORDER BY rating DESC'; break
            default: query += ' ORDER BY id ASC'
        }

        const result = await pool.query(query, params)
        res.json(result.rows)
    } catch (err) {
        console.error('Products fetch error:', err)
        res.status(500).json({ error: 'Failed to fetch products' })
    }
})

/* GET /api/products/:id — single product with reviews */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const productResult = await pool.query('SELECT * FROM products WHERE id = $1', [id])

        if (productResult.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' })
        }

        const reviewsResult = await pool.query(
            'SELECT * FROM reviews WHERE product_id = $1 ORDER BY created_at DESC',
            [id]
        )

        const product = productResult.rows[0]
        product.reviews = reviewsResult.rows

        res.json(product)
    } catch (err) {
        console.error('Product fetch error:', err)
        res.status(500).json({ error: 'Failed to fetch product' })
    }
})

/* GET /api/products/:id/related — related products (same category) */
router.get('/:id/related', async (req, res) => {
    try {
        const { id } = req.params
        const productResult = await pool.query('SELECT category FROM products WHERE id = $1', [id])

        if (productResult.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' })
        }

        const { category } = productResult.rows[0]
        const result = await pool.query(
            'SELECT * FROM products WHERE category = $1 AND id != $2 LIMIT 6',
            [category, id]
        )

        // If not enough results from same category, fill with other products
        if (result.rows.length < 6) {
            const moreResult = await pool.query(
                'SELECT * FROM products WHERE id != $1 AND id NOT IN (SELECT id FROM products WHERE category = $2) LIMIT $3',
                [id, category, 6 - result.rows.length]
            )
            result.rows.push(...moreResult.rows)
        }

        res.json(result.rows)
    } catch (err) {
        console.error('Related products error:', err)
        res.status(500).json({ error: 'Failed to fetch related products' })
    }
})

export default router
