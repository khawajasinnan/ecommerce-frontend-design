import { createContext, useState, useEffect, useCallback } from 'react'

export const CartContext = createContext()

/* Fallback: localStorage cart when API is unavailable */
const getLocalCart = () => {
    try {
        return JSON.parse(localStorage.getItem('ecom_cart') || '[]')
    } catch {
        return []
    }
}

const saveLocalCart = (items) => {
    localStorage.setItem('ecom_cart', JSON.stringify(items))
}

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [useApi, setUseApi] = useState(true)

    /* Fetch cart on mount */
    useEffect(() => {
        fetchCart()
    }, [])

    const fetchCart = async () => {
        if (useApi) {
            try {
                const res = await fetch('/api/cart')
                if (!res.ok) throw new Error('API unavailable')
                const data = await res.json()
                setCartItems(Array.isArray(data) ? data : [])
                const countRes = await fetch('/api/cart/count')
                if (countRes.ok) {
                    const countData = await countRes.json()
                    setCartCount(countData.count || 0)
                }
                return
            } catch {
                setUseApi(false)
            }
        }
        // Fallback to localStorage
        const items = getLocalCart()
        setCartItems(items)
        setCartCount(items.reduce((sum, item) => sum + item.quantity, 0))
    }

    const addToCart = async (productId, quantity = 1, productInfo = {}) => {
        if (useApi) {
            try {
                await fetch('/api/cart', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ product_id: productId, quantity }),
                })
                await fetchCart()
                return
            } catch {
                setUseApi(false)
            }
        }
        // localStorage fallback
        const items = getLocalCart()
        const existing = items.find(i => i.product_id === productId)
        if (existing) {
            existing.quantity += quantity
        } else {
            items.push({
                id: Date.now(),
                product_id: productId,
                quantity,
                name: productInfo.name || `Product #${productId}`,
                img: productInfo.img || '',
                price: productInfo.price || 0,
                brand: productInfo.brand || '',
                category: productInfo.category || '',
            })
        }
        saveLocalCart(items)
        setCartItems([...items])
        setCartCount(items.reduce((sum, i) => sum + i.quantity, 0))
    }

    const updateQuantity = async (cartItemId, quantity) => {
        if (useApi) {
            try {
                await fetch(`/api/cart/${cartItemId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ quantity }),
                })
                await fetchCart()
                return
            } catch {
                setUseApi(false)
            }
        }
        // localStorage fallback
        let items = getLocalCart()
        if (quantity <= 0) {
            items = items.filter(i => i.id !== cartItemId)
        } else {
            const item = items.find(i => i.id === cartItemId)
            if (item) item.quantity = quantity
        }
        saveLocalCart(items)
        setCartItems(items)
        setCartCount(items.reduce((sum, i) => sum + i.quantity, 0))
    }

    const removeFromCart = async (cartItemId) => {
        if (useApi) {
            try {
                await fetch(`/api/cart/${cartItemId}`, { method: 'DELETE' })
                await fetchCart()
                return
            } catch {
                setUseApi(false)
            }
        }
        // localStorage fallback
        const items = getLocalCart().filter(i => i.id !== cartItemId)
        saveLocalCart(items)
        setCartItems(items)
        setCartCount(items.reduce((sum, i) => sum + i.quantity, 0))
    }

    const clearCart = async () => {
        if (useApi) {
            try {
                for (const item of cartItems) {
                    await fetch(`/api/cart/${item.id}`, { method: 'DELETE' })
                }
            } catch {
                setUseApi(false)
            }
        }
        saveLocalCart([])
        setCartItems([])
        setCartCount(0)
    }

    return (
        <CartContext.Provider value={{
            cartItems,
            cartCount,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            fetchCart,
        }}>
            {children}
        </CartContext.Provider>
    )
}
