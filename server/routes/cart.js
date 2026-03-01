import { Router } from 'express'
import pool from '../db.js'

const router = Router()

/* GET /api/cart — all cart items with product details */
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT ci.id, ci.quantity, ci.product_id,
             p.name, p.img, p.price, p.old_price, p.brand, p.category
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      ORDER BY ci.created_at DESC
    `)
        res.json(result.rows)
    } catch (err) {
        console.error('Cart fetch error:', err)
        res.status(500).json({ error: 'Failed to fetch cart' })
    }
})

/* POST /api/cart — add item to cart */
router.post('/', async (req, res) => {
    try {
        const { product_id, quantity = 1 } = req.body

        // Check if product already in cart
        const existing = await pool.query(
            'SELECT * FROM cart_items WHERE product_id = $1', [product_id]
        )

        if (existing.rows.length > 0) {
            // Update quantity
            const result = await pool.query(
                'UPDATE cart_items SET quantity = quantity + $1 WHERE product_id = $2 RETURNING *',
                [quantity, product_id]
            )
            return res.json(result.rows[0])
        }

        const result = await pool.query(
            'INSERT INTO cart_items (product_id, quantity) VALUES ($1, $2) RETURNING *',
            [product_id, quantity]
        )
        res.status(201).json(result.rows[0])
    } catch (err) {
        console.error('Cart add error:', err)
        res.status(500).json({ error: 'Failed to add to cart' })
    }
})

/* PUT /api/cart/:id — update quantity */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { quantity } = req.body

        if (quantity <= 0) {
            await pool.query('DELETE FROM cart_items WHERE id = $1', [id])
            return res.json({ deleted: true })
        }

        const result = await pool.query(
            'UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *',
            [quantity, id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Cart item not found' })
        }
        res.json(result.rows[0])
    } catch (err) {
        console.error('Cart update error:', err)
        res.status(500).json({ error: 'Failed to update cart' })
    }
})

/* DELETE /api/cart/:id — remove item */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await pool.query('DELETE FROM cart_items WHERE id = $1', [id])
        res.json({ deleted: true })
    } catch (err) {
        console.error('Cart delete error:', err)
        res.status(500).json({ error: 'Failed to remove from cart' })
    }
})

/* GET /api/cart/count — get just the count */
router.get('/count', async (req, res) => {
    try {
        const result = await pool.query('SELECT COALESCE(SUM(quantity), 0) as count FROM cart_items')
        res.json({ count: parseInt(result.rows[0].count) })
    } catch (err) {
        res.status(500).json({ error: 'Failed to get cart count' })
    }
})

export default router
