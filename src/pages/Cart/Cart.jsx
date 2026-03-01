import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import './Cart.css'

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext)
    const [coupon, setCoupon] = useState('')
    const [discount, setDiscount] = useState(0)

    const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
    const tax = subtotal * 0.05
    const total = subtotal - discount + tax

    const handleApplyCoupon = () => {
        if (coupon.toLowerCase() === 'save10') {
            setDiscount(subtotal * 0.10)
        } else if (coupon.toLowerCase() === 'save20') {
            setDiscount(subtotal * 0.20)
        } else {
            setDiscount(0)
        }
    }

    if (cartItems.length === 0) {
        return (
            <div className="cart">
                <div className="container">
                    <nav className="cart__breadcrumb">
                        <Link to="/">Home</Link>
                        <span className="cart__breadcrumb-sep">{'>'}</span>
                        <span>My cart</span>
                    </nav>
                    <div className="cart__empty">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#DEE2E7" strokeWidth="1">
                            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't added any items yet.</p>
                        <Link to="/products" className="cart__shop-btn">Start shopping</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="cart">
            <div className="container">
                <nav className="cart__breadcrumb">
                    <Link to="/">Home</Link>
                    <span className="cart__breadcrumb-sep">{'>'}</span>
                    <span>My cart</span>
                </nav>

                <h1 className="cart__heading">My cart ({cartItems.length})</h1>

                <div className="cart__layout">
                    {/* Items */}
                    <div className="cart__items">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart__item">
                                <Link to={`/products/${item.product_id}`} className="cart__item-img-link">
                                    <img src={item.img} alt={item.name} className="cart__item-img" />
                                </Link>
                                <div className="cart__item-details">
                                    <Link to={`/products/${item.product_id}`} className="cart__item-name">{item.name}</Link>
                                    <span className="cart__item-meta">{item.brand} • {item.category}</span>
                                    <div className="cart__item-actions">
                                        <button className="cart__remove-btn" onClick={() => removeFromCart(item.id)}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                            </svg>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <div className="cart__item-right">
                                    <span className="cart__item-price">${(Number(item.price) * item.quantity).toFixed(2)}</span>
                                    <div className="cart__item-qty">
                                        <button className="cart__qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                                        <span className="cart__qty-val">{item.quantity}</span>
                                        <button className="cart__qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <aside className="cart__summary">
                        <div className="cart__coupon">
                            <span className="cart__coupon-label">Have a coupon?</span>
                            <div className="cart__coupon-input-wrap">
                                <input
                                    type="text"
                                    className="cart__coupon-input"
                                    placeholder="Add coupon"
                                    value={coupon}
                                    onChange={e => setCoupon(e.target.value)}
                                />
                                <button className="cart__coupon-btn" onClick={handleApplyCoupon}>Apply</button>
                            </div>
                        </div>

                        <div className="cart__totals">
                            <div className="cart__total-row">
                                <span>Subtotal:</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            {discount > 0 && (
                                <div className="cart__total-row cart__total-row--discount">
                                    <span>Discount:</span>
                                    <span className="cart__discount-val">−${discount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="cart__total-row">
                                <span>Tax:</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="cart__total-row cart__total-row--final">
                                <span>Total:</span>
                                <span className="cart__total-val">${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <Link to="/checkout" className="cart__checkout-btn">Checkout</Link>

                        <Link to="/products" className="cart__continue-link">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            Continue shopping
                        </Link>
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default Cart
